// Lets a CUSTOMER delete their own account and files. Keep "Verify JWT" ON.
// Refuses while an order is being edited. Staff accounts are removed by an admin, not here.
// Removes: their uploaded and edited files, then the login (orders, reviews and messages go with it).
// Secrets: SUPABASE_URL, SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY are provided automatically.
import { createClient } from "npm:@supabase/supabase-js@2"

const CUST = "Customer file uploading"
const EDIT = "Editor file uploading"
const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } })

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors })
  const auth = req.headers.get("Authorization") ?? ""
  const asUser = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, { global: { headers: { Authorization: auth } } })
  const { data: u } = await asUser.auth.getUser()
  if (!u?.user) return json({ error: "Please log in again." }, 401)

  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!)
  const id = u.user.id
  const { data: me } = await admin.from("profiles").select("role").eq("id", id).single()
  if (me?.role !== "customer") return json({ error: "Staff accounts are removed by an admin. Please ask your admin." }, 403)

  const { data: orders } = await admin.from("orders").select("status,file_path,file_paths,result_path").eq("customer_id", id)
  if ((orders ?? []).some((o) => o.status === "assigned" || o.status === "in_progress")) {
    return json({ error: "An order is being edited right now. You can delete your account after it is delivered." }, 409)
  }

  const mine = (orders ?? []).flatMap((o) => [...(o.file_paths ?? []), o.file_path].filter(Boolean)) as string[]
  const results = (orders ?? []).map((o) => o.result_path).filter(Boolean) as string[]
  if (mine.length) await admin.storage.from(CUST).remove([...new Set(mine)])
  if (results.length) await admin.storage.from(EDIT).remove(results)

  const { error } = await admin.auth.admin.deleteUser(id)
  if (error) return json({ error: "Could not delete the account. Please contact us." }, 500)
  return json({ ok: true })
})
