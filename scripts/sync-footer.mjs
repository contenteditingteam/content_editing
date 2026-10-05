// Puts the shared footer (scripts/footer.mjs) into every root page. Blog pages get it from build-blog.mjs.
import { readFileSync, writeFileSync, readdirSync } from "node:fs"
import { footer } from "./footer.mjs"
let n = 0
for (const f of readdirSync(".").filter((x) => x.endsWith(".html") && x !== "certificate.html")) {
  const s = readFileSync(f, "utf8")
  const root = f === "404.html" ? "/" : ""
  const out = s.replace(/<footer>[\s\S]*?<\/footer>/, () => footer(root))
  if (out !== s) { writeFileSync(f, out); n++ }
}
console.log("footer updated on", n, "pages")
