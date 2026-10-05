// Razorpay payments for orders. Called from the dashboard by the signed-in customer (keep "Verify JWT" ON).
//   { action: "create",  order_id }                                   -> creates a Razorpay order for the VERIFIED price
//   { action: "confirm", order_id, razorpay_payment_id, razorpay_order_id, razorpay_signature } -> verifies the payment, marks the order paid
// Secrets to add: RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET
import { createClient } from "npm:@supabase/supabase-js@2"

const KEY_ID = Deno.env.get("RAZORPAY_KEY_ID") ?? ""
const KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET") ?? ""
const RZP = "https://api.razorpay.com/v1"
const basic = "Basic " + btoa(`${KEY_ID}:${KEY_SECRET}`)

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } })

async function hmacHex(secret: string, message: string) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"])
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message))
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("")
}
function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}
const rzp = async (path: string, init?: RequestInit) => {
  const res = await fetch(RZP + path, { ...init, headers: { Authorization: basic, "Content-Type": "application/json" } })
  const data = await res.json()
  if (!res.ok) throw new Error(data?.error?.description ?? "Razorpay error " + res.status)
  return data
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors })
  try {
    if (!KEY_ID || !KEY_SECRET) return json({ error: "Payments are not configured yet." }, 503)
    const url = Deno.env.get("SUPABASE_URL")!
    const userClient = createClient(url, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: req.headers.get("Authorization") ?? "" } },
    })
    const { data: { user } } = await userClient.auth.getUser()
    if (!user) return json({ error: "Not signed in" }, 401)

    const body = await req.json()
    const admin = createClient(url, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!)
    const { data: order } = await admin.from("orders").select("*").eq("id", body.order_id).single()
    if (!order || order.customer_id !== user.id) return json({ error: "Order not found" }, 404)
    if (order.payment_status === "paid") return json({ paid: true })
    if (!order.verified_at) return json({ error: "Your word count is still being checked. Please try again shortly." }, 409)

    const amount = Math.round(Number(order.price) * 100) // paise / cents
    const currency = order.currency === "INR" ? "INR" : "USD"

    if (body.action === "create") {
      const rp = await rzp("/orders", {
        method: "POST",
        body: JSON.stringify({ amount, currency, receipt: String(order.id).slice(0, 40), notes: { order_id: order.id } }),
      })
      await admin.from("orders").update({ razorpay_order_id: rp.id }).eq("id", order.id)
      return json({ key_id: KEY_ID, razorpay_order_id: rp.id, amount, currency, description: order.service })
    }

    if (body.action === "confirm") {
      const { razorpay_payment_id: pid, razorpay_order_id: oid, razorpay_signature: sig } = body
      if (!pid || !oid || !sig) return json({ error: "Missing payment details" }, 400)
      const expected = await hmacHex(KEY_SECRET, `${oid}|${pid}`)
      if (!safeEqual(expected, String(sig))) return json({ error: "Payment signature is invalid" }, 400)

      // Never trust the browser's amount: check with Razorpay that this payment really covers this order.
      const [rpOrder, payment] = await Promise.all([rzp(`/orders/${oid}`), rzp(`/payments/${pid}`)])
      const ok = rpOrder.notes?.order_id === order.id && rpOrder.amount === amount && rpOrder.currency === currency &&
        payment.order_id === oid && payment.amount === amount && payment.currency === currency && payment.status === "captured"
      if (!ok) return json({ error: "Payment could not be matched to this order" }, 400)

      await admin.from("orders")
        .update({ payment_status: "paid", razorpay_payment_id: pid, razorpay_order_id: oid, paid_at: new Date().toISOString() })
        .eq("id", order.id).neq("payment_status", "paid")
      return json({ paid: true })
    }
    return json({ error: "Unknown action" }, 400)
  } catch (e) {
    console.error(e)
    return json({ error: (e as Error).message || "Payment failed" }, 500)
  }
})
