// Counts the words in an order's uploaded files ON THE SERVER and sets the official price.
// Called from the dashboard right after an order is submitted (signed-in users only: keep "Verify JWT" ON).
// Secrets: SUPABASE_URL, SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY are provided automatically.
import { createClient } from "npm:@supabase/supabase-js@2"
import JSZip from "npm:jszip@3"
import { extractText, getDocumentProxy } from "npm:unpdf@0.12"

// Keep these in sync with `rates` in script.js and PRICING in dashboard.html.
const RATES: Record<string, number> = {
  "academic-5": 0.024, "academic-2": 0.035, "academic-1": 0.045,
  "proof-5": 0.018, "proof-2": 0.028, "proof-1": 0.038,
  "business-3": 0.026, "business-1": 0.040,
  "rush-4h": 0.065, "rush-2h": 0.080,
  "dev-14": 0.035, "rewrite-3": 0.050,
}
const RUSH_MULT = 2
const INR_RATE = 85
const BUCKET = "Customer file uploading"

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } })

async function countFile(bytes: Uint8Array, path: string): Promise<number> {
  const ext = path.split(".").pop()!.toLowerCase()
  let text = ""
  if (ext === "txt" || ext === "md") {
    text = new TextDecoder().decode(bytes)
  } else if (ext === "docx") {
    const zip = await JSZip.loadAsync(bytes)
    const xml = await zip.file("word/document.xml")!.async("string")
    text = xml
      .replace(/<w:del[ >][\s\S]*?<\/w:del>/g, "") // ignore tracked deletions
      .replace(/<w:tab\/>|<w:br\/>|<\/w:p>/g, " ")
      .replace(/<[^>]+>/g, "")
  } else if (ext === "pdf") {
    const pdf = await getDocumentProxy(bytes)
    text = (await extractText(pdf, { mergePages: true })).text
  } else {
    throw new Error("unsupported file type ." + ext)
  }
  return text.split(/\s+/).filter(Boolean).length
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors })
  try {
    const url = Deno.env.get("SUPABASE_URL")!
    const userClient = createClient(url, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: req.headers.get("Authorization") ?? "" } },
    })
    const { data: { user } } = await userClient.auth.getUser()
    if (!user) return json({ error: "Not signed in" }, 401)

    const { order_id } = await req.json()
    const admin = createClient(url, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!)
    const { data: order } = await admin.from("orders").select("*").eq("id", order_id).single()
    if (!order) return json({ error: "Order not found" }, 404)

    if (order.customer_id !== user.id) {
      const { data: me } = await admin.from("profiles").select("role").eq("id", user.id).single()
      if (!me || !["admin", "manager"].includes(me.role)) return json({ error: "Forbidden" }, 403)
    }

    const fail = async (note: string) => {
      await admin.from("orders").update({ verify_note: note }).eq("id", order_id)
      return json({ error: "We could not count your files automatically. Our team will confirm your price." }, 422)
    }

    const rate = RATES[order.plan ?? ""]
    if (!rate) return await fail("Unknown plan: " + order.plan)

    const paths: string[] = order.file_paths?.length ? order.file_paths : [order.file_path]
    let words = 0
    try {
      for (const p of paths) {
        const { data, error } = await admin.storage.from(BUCKET).download(p)
        if (error || !data) throw new Error(error?.message ?? "download failed")
        words += await countFile(new Uint8Array(await data.arrayBuffer()), p)
      }
    } catch (e) {
      return await fail("Count failed: " + (e as Error).message)
    }
    if (words < 1) return await fail("No text found in the files")

    const rushOn = order.rush && !String(order.plan).startsWith("rush-")
    const usd = words * rate * (rushOn ? RUSH_MULT : 1)
    const currency = order.currency === "INR" ? "INR" : "USD"
    const price = currency === "INR" ? Math.round(usd * INR_RATE) : Math.round(usd * 100) / 100

    const { error: upErr } = await admin.from("orders")
      .update({ word_count: words, price, verified_at: new Date().toISOString(), verify_note: null })
      .eq("id", order_id)
    if (upErr) throw upErr

    return json({ words, price, currency, claimed_words: order.claimed_words })
  } catch (e) {
    console.error(e)
    return json({ error: "Verification failed" }, 500)
  }
})
