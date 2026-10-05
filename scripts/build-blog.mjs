// Builds blog/*.html, blog.html, sitemap.xml and robots.txt from scripts/blog-posts.mjs.
// Run:  node scripts/build-blog.mjs
import { mkdirSync, writeFileSync } from "node:fs"
import { posts, SITE, DATE } from "./blog-posts.mjs"

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
const GTAG = `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","G-SMDSWJ5T0V");(function(){var d=0;function l(){if(d)return;d=1;var s=document.createElement("script");s.async=true;s.src="https://www.googletagmanager.com/gtag/js?id=G-SMDSWJ5T0V";document.head.appendChild(s)}["scroll","click","touchstart","keydown"].forEach(function(e){addEventListener(e,l,{once:true,passive:true})});addEventListener("load",function(){setTimeout(l,3000)})})();</script>`
const HEADER = `<header><div class="container nav">
  <a href="/index.html" class="logo"><img src="/images/logo-sm.webp" width="150" height="50" alt="Content Editing logo"></a>
  <button class="menu-btn" aria-label="Menu">☰</button>
  <ul>
    <li><a href="/index.html">Home</a></li><li><a href="/services.html">Services</a></li><li><a href="/pricing.html">Pricing</a></li><li><a href="/blog.html">Blog</a></li><li><a href="/about.html">About</a></li><li><a href="/contact.html">Contact</a></li>
    <li><a class="btn btn-primary" href="/login.html">Submit Document</a></li>
  </ul>
</div></header>`
const FOOTER = `<footer><div class="container"><div class="copy" style="border:0;margin:0">© 2026 Content Editing. All rights reserved. · <a href="/blog.html">Blog</a> · <a href="/reviews.html">Customer reviews</a></div></div></footer>
<script src="/script.js"></script>`

const head = ({ title, description, url, type = "website", extra = "" }) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="${type}">
<meta property="og:site_name" content="Content Editing">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}/images/logo.webp">
<meta name="twitter:card" content="summary">
${extra}
${GTAG}<link rel="icon" href="/images/logo-sm.webp"><link rel="stylesheet" href="/styles.css">
</head>`

mkdirSync("blog", { recursive: true })

// ---- posts ----
for (const p of posts) {
  const url = `${SITE}/blog/${p.slug}`
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting", headline: p.title, description: p.description,
        datePublished: DATE, dateModified: DATE, mainEntityOfPage: url,
        image: `${SITE}/images/logo.webp`, articleSection: p.category,
        author: { "@type": "Organization", name: "Content Editing", url: SITE },
        publisher: { "@type": "Organization", name: "Content Editing", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/images/logo.webp` } },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
          { "@type": "ListItem", position: 2, name: "Blog", item: SITE + "/blog" },
          { "@type": "ListItem", position: 3, name: p.title, item: url },
        ],
      },
    ],
  }
  const related = posts.filter((x) => x.slug !== p.slug).slice(0, 3)
    .map((x) => `<a class="card" href="/blog/${x.slug}"><span class="chip">${esc(x.category)}</span><h3 style="margin-top:10px">${esc(x.title)}</h3><p>${esc(x.description)}</p></a>`).join("")
  writeFileSync(`blog/${p.slug}.html`, `${head({ title: `${p.title} | Content Editing`, description: p.description, url, type: "article",
    extra: `<script type="application/ld+json">${JSON.stringify(ld)}</script>` })}
<body>
${HEADER}
<div class="page-hero"><div class="container">
  <p style="margin:0 0 8px"><a href="/blog.html" style="color:#cfdcf5">← All articles</a></p>
  <h1 style="font-size:clamp(1.8rem,4.2vw,2.8rem)">${esc(p.title)}</h1>
  <p>${esc(p.category)} · ${p.minutes} min read · <time datetime="${DATE}">5 October 2026</time></p>
</div></div>
<article class="post"><div class="container">
${p.body}
<div class="post-cta"><h3>Ready to polish your writing?</h3><p>Upload your document, see your price and delivery time instantly, and get it back edited by a human editor.</p><a class="btn btn-primary" href="/login.html">Get an instant quote</a></div>
</div></article>
<section class="alt"><div class="container"><div class="section-head"><h2>More articles</h2></div><div class="grid g3">${related}</div></div></section>
${FOOTER}
</body>
</html>
`)
}

// ---- blog index ----
const cards = posts.map((p) => `<a class="card" href="/blog/${p.slug}"><span class="chip">${esc(p.category)}</span><h3 style="margin-top:10px">${esc(p.title)}</h3><p>${esc(p.description)}</p><span class="more">Read article · ${p.minutes} min →</span></a>`).join("\n    ")
const indexLd = { "@context": "https://schema.org", "@type": "Blog", name: "Content Editing Blog", url: `${SITE}/blog`,
  blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${SITE}/blog/${p.slug}`, datePublished: DATE })) }
writeFileSync("blog.html", `${head({ title: "Editing & Academic Writing Blog | Content Editing",
  description: "Practical guides on proofreading, editing, thesis writing, grammar and publishing from the Content Editing team.", url: `${SITE}/blog`,
  extra: `<script type="application/ld+json">${JSON.stringify(indexLd)}</script>` })}
<body>
${HEADER}
<div class="page-hero"><div class="container"><h1>The Content Editing Blog</h1><p>Practical guides on editing, proofreading, academic writing and publishing.</p></div></div>
<section><div class="container"><h2 class="sr-only">Latest articles</h2><div class="grid g3">
    ${cards}
</div></div></section>
${FOOTER}
</body>
</html>
`)

// ---- sitemap + robots ----
const pages = ["", "services", "pricing", "about", "contact", "blog", "reviews", "verify", ...posts.map((p) => `blog/${p.slug}`)]
writeFileSync("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((u) => `  <url><loc>${SITE}/${u}</loc><lastmod>${DATE}</lastmod></url>`).join("\n")}
</urlset>
`)
writeFileSync("robots.txt", `User-agent: *
Allow: /
Disallow: /dashboard
Disallow: /certificate

Sitemap: ${SITE}/sitemap.xml
`)
console.log(`built ${posts.length} posts + blog index + sitemap + robots`)
