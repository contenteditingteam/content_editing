// Backup for payments: Razorpay calls this when a payment is captured, even if the customer closed the browser.
// Deploy with "Verify JWT" OFF (Razorpay is not a signed-in user; the request is checked with the webhook signature instead).
// Secrets to add: RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, RAZORPAY_WEBHOOK_SECRET
import { createClient } from "npm:@supabase/supabase-js@2"

const KEY_ID = Deno.env.get("RAZORPAY_KEY_ID") ?? ""
const KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET") ?? ""
const WEBHOOK_SECRET = Deno.env.get("RAZORPAY_WEBHOOK_SECRET") ?? ""
const basic = "Basic " + btoa(`${KEY_ID}:${KEY_SECRET}`)

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

Deno.serve(async (req) => {
  const raw = await req.text()
  if (!WEBHOOK_SECRET || !safeEqual(await hmacHex(WEBHOOK_SECRET, raw), req.headers.get("x-razorpay-signature") ?? "")) {
    return new Response("Invalid signature", { status: 401 })
  }
  const event = JSON.parse(raw)
  if (event.event !== "payment.captured") return new Response("ignored")

  const payment = event.payload?.payment?.entity
  if (!payment?.order_id) return new Response("ignored")

  const res = await fetch(`https://api.razorpay.com/v1/orders/${payment.order_id}`, { headers: { Authorization: basic } })
  if (!res.ok) return new Response("order lookup failed", { status: 502 })
  const rpOrder = await res.json()
  const orderId = rpOrder.notes?.order_id
  if (!orderId) return new Response("ignored")

  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!)
  const { data: order } = await admin.from("orders").select("id,price,currency,payment_status").eq("id", orderId).single()
  if (!order) return new Response("unknown order")
  const amount = Math.round(Number(order.price) * 100)
  const currency = order.currency === "INR" ? "INR" : "USD"
  if (payment.amount !== amount || payment.currency !== currency) {
    console.error("Amount mismatch for order", orderId, payment.amount, amount)
    return new Response("amount mismatch", { status: 200 })
  }
  await admin.from("orders")
    .update({ payment_status: "paid", razorpay_payment_id: payment.id, razorpay_order_id: payment.order_id, paid_at: new Date().toISOString() })
    .eq("id", orderId).neq("payment_status", "paid")
  return new Response("ok")
})
