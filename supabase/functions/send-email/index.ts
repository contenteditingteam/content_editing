// Sends order emails through Resend. Called by a Supabase Database Webhook on the `orders` table.
// Secrets needed: RESEND_API_KEY, WEBHOOK_SECRET  (SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are provided automatically)
import { createClient } from "npm:@supabase/supabase-js@2"

const FROM = "Content Editing <no-reply@contentediting.online>"
const SITE = "https://contentediting.online"

const esc = (s: unknown) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!))

const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!)

async function send(to: string[], subject: string, body: string, replyTo?: string) {
  if (!to.length) return
  const html = `<div style="font-family:Segoe UI,Arial,sans-serif;max-width:560px;margin:auto;padding:24px;border:1px solid #e3e8f0;border-radius:12px">
    <h2 style="color:#0b3a7a;margin-top:0">${esc(subject)}</h2>${body}
    <p><a href="${SITE}/dashboard.html" style="display:inline-block;background:#0b3a7a;color:#fff;padding:10px 20px;border-radius:30px;text-decoration:none">Open dashboard</a></p>
    <p style="color:#8a94a6;font-size:12px">Content Editing</p></div>`
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, to, subject, html, ...(replyTo ? { reply_to: replyTo } : {}) }),
  })
  if (!res.ok) console.error("Resend error", res.status, await res.text())
}

const profile = async (id: string | null) =>
  id ? (await admin.from("profiles").select("email,full_name").eq("id", id).single()).data : null

Deno.serve(async (req) => {
  if (req.headers.get("x-webhook-secret") !== Deno.env.get("WEBHOOK_SECRET")) return new Response("Unauthorized", { status: 401 })
  const { type, table, record: o, old_record: old } = await req.json()
  if (!o) return new Response("ignored")

  // A new message from the website contact form: tell the staff (replying goes straight to the sender)
  if (table === "contact_messages") {
    if (type === "INSERT") {
      const { data: staff } = await admin.from("profiles").select("email").in("role", ["admin", "manager"])
      await send((staff ?? []).map((x) => x.email), "New website message from " + String(o.name).slice(0, 60),
        `<p><b>${esc(o.name)}</b> (${esc(o.email)})${o.topic ? " about <b>" + esc(o.topic) + "</b>" : ""} wrote:</p><p style="white-space:pre-wrap;background:#f4f8ff;padding:12px;border-radius:8px">${esc(o.message)}</p>`, o.email)
    }
    return new Response("ok")
  }

  const summary = `<p><b>Service:</b> ${esc(o.service)}<br><b>Words:</b> ${esc(o.word_count)}<br><b>Price:</b> $${Number(o.price ?? 0).toFixed(2)}</p>`

  if (type === "INSERT") {
    const customer = await profile(o.customer_id)
    if (customer) await send([customer.email], "We received your order", `<p>Hi ${esc(customer.full_name || "there")}, thanks for your order. Please complete the payment from your dashboard so we can start.</p>${summary}`)
  }

  if (type === "UPDATE") {
    if (o.payment_status === "paid" && old?.payment_status !== "paid") {
      const customer = await profile(o.customer_id)
      if (customer) await send([customer.email], "Payment received", `<p>Hi ${esc(customer.full_name || "there")}, we received your payment. An editor will be assigned shortly.</p>${summary}`)
      const { data: staff } = await admin.from("profiles").select("email").in("role", ["admin", "manager"])
      await send((staff ?? []).map((s) => s.email), "New paid order", `<p>${esc(customer?.full_name || customer?.email || "A customer")} paid for a new document. It is ready to assign.</p>${summary}`)
    }
    if (o.editor_id && o.editor_id !== old?.editor_id) {
      const editor = await profile(o.editor_id)
      if (editor) await send([editor.email], "A document was assigned to you", `<p>Hi ${esc(editor.full_name || "there")}, you have a new document to edit.</p>${summary}`)
    }
    if (o.status === "completed" && old?.status !== "completed") {
      const customer = await profile(o.customer_id)
      if (customer) await send([customer.email], "Your edited document is ready", `<p>Hi ${esc(customer.full_name || "there")}, your edited file is ready to download, along with your editing certificate, in your dashboard.</p>${summary}`)
    }
  }
  return new Response("ok")
})
