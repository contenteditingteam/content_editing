// Builds terms.html, privacy.html and refunds.html from the text below + scripts/legal-config.mjs.
// These are DRAFTS written for review by a lawyer. They are not legal advice.
import { writeFileSync } from "node:fs"
import { SITE } from "./blog-posts.mjs"
import { footer } from "./footer.mjs"
import { LEGAL } from "./legal-config.mjs"
import { unresolved } from "./legal-pages.mjs"

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
const v = (k, label) => (LEGAL[k] == null || LEGAL[k] === "" ? `<span class="todo">[add: ${label}]</span>` : esc(LEGAL[k]))
const NAME = () => v("businessName", "business name")
const EMAIL = () => (LEGAL.email ? `<a href="mailto:${esc(LEGAL.email)}">${esc(LEGAL.email)}</a>` : v("email", "contact email"))
const noindex = unresolved.length ? '<meta name="robots" content="noindex">' : ""

const HEADER = `<header><div class="container nav">
  <a href="/index.html" class="logo"><img src="/images/logo-sm.webp" width="150" height="50" alt="Content Editing logo"></a>
  <button class="menu-btn" aria-label="Menu">☰</button>
  <ul>
    <li><a href="/index.html">Home</a></li><li><a href="/services.html">Services</a></li><li><a href="/pricing.html">Pricing</a></li><li><a href="/blog.html">Blog</a></li><li><a href="/about.html">About</a></li><li><a href="/contact.html">Contact</a></li>
    <li><a class="btn btn-primary" href="/login.html">Submit Document</a></li>
  </ul>
</div></header>`

const page = (slug, title, description, body) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)} | Content Editing</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${SITE}/${slug}">
${noindex}
<meta property="og:type" content="website">
<meta property="og:site_name" content="Content Editing">
<meta property="og:title" content="${esc(title)} | Content Editing">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${SITE}/${slug}">
<meta property="og:image" content="${SITE}/images/logo.webp">
<meta name="twitter:card" content="summary">
<script src="/consent.js" defer></script><link rel="icon" href="/images/logo-sm.webp"><link rel="stylesheet" href="/styles.css">
</head>
<body>
${HEADER}
<div class="page-hero"><div class="container"><h1>${esc(title)}</h1><p>Last updated ${esc(LEGAL.updated)}</p></div></div>
<section><div class="container legal">
${unresolved.length ? `<div class="draft-note"><b>Draft.</b> Items highlighted in yellow still need real details, and this page is hidden from search engines until they are filled in.</div>` : ""}
${body}
</div></section>
${footer("/")}
<script src="/script.js"></script>
</body>
</html>
`

const terms = `
<p>These terms are between you and ${NAME()} ("we", "us") for the editing, proofreading and related services on contentediting.online. By creating an account or placing an order you agree to them.</p>
<h2>1. Our service</h2>
<p>We edit and proofread the documents you upload. Every edit is made by a human editor. We do not use AI tools to rewrite your document. The service you choose (for example academic editing or proofreading), the turnaround and the price are shown when you request a quote.</p>
<h2>2. Your account</h2>
<ul><li>You must give a real email address and keep your password private.</li><li>You are responsible for what happens under your account.</li><li>We may close accounts that are used to abuse the service or break the law.</li></ul>
<h2>3. Orders and prices</h2>
<ul><li>The word count is taken from your uploaded file. The price is shown before you pay, in US dollars or Indian rupees, and the order starts after payment.</li><li>If our check of your file finds a different word count or service level from the one you entered, we will show the corrected price before you pay.</li><li>Payments are handled by Razorpay. We do not see or store your card details.</li></ul>
<h2>4. Your document and your rights</h2>
<p>You keep all rights to your document and the edited version. You confirm that you have the right to send us the document. We use it only to deliver your order. See our <a href="/privacy.html">Privacy policy</a> for how files are stored and deleted.</p>
<h2>5. Your responsibilities</h2>
<ul><li>You decide which suggested changes to accept. Editing improves language and clarity, but you remain responsible for the content, facts, citations and for following your institution's or publisher's rules.</li><li>Do not upload unlawful material or documents you are not allowed to share.</li></ul>
<h2>6. Delivery, revisions and refunds</h2>
<p>Turnaround times begin when payment is confirmed. Free revisions and refunds are covered in our <a href="/refunds.html">Refunds &amp; revisions policy</a>.</p>
<h2>7. Editing certificates</h2>
<p>A certificate confirms that a document was edited through our service on the date shown. It is not a guarantee of grades, acceptance or originality, and it can be checked on our <a href="/verify.html">verification page</a>.</p>
<h2>8. Our responsibility</h2>
<p>We take care with every document, but we cannot promise a particular result such as a grade, publication or approval. To the extent the law allows, our total responsibility for any order is limited to the amount you paid for it.</p>
<h2>9. Changes to these terms</h2>
<p>If we change these terms we will update the date at the top of this page. Orders you have already paid for stay under the terms in force when you paid.</p>
<h2>10. Law and contact</h2>
<p>These terms are governed by the laws of ${v("governingLaw", "governing law / country")}. Questions: ${EMAIL()}.</p>
<p>${NAME()}${LEGAL.gst ? `, tax number ${esc(LEGAL.gst)}` : ""}<br>${v("address", "business address")}</p>`

const privacy = `
<p>${NAME()} ("we") runs contentediting.online. This page explains what personal information we collect, why, and the choices you have.</p>
<h2>What we collect</h2>
<ul><li><b>Account details:</b> your name, email address and password (the password is stored in a protected form we cannot read).</li><li><b>Your orders:</b> the documents you upload, instructions, word count, price, payment status and the edited file.</li><li><b>Payments:</b> handled by Razorpay. We receive the payment status and an order reference, not your card number.</li><li><b>Messages:</b> what you send through the contact form.</li><li><b>Reviews:</b> the rating and text you choose to publish, shown with the name you give.</li></ul>
<h2>Why we use it</h2>
<ul><li>To deliver your order and give you access to the edited file.</li><li>To send you emails about your account and orders, such as confirmation and "your edit is ready".</li><li>To answer your messages and keep the service safe.</li></ul>
<p>We do not sell your personal information and we do not use your documents to train AI systems.</p>
<h2 id="files">How we protect and delete your files</h2>
<ul><li>Uploaded and edited files are kept in private storage. Only you, the editor assigned to your order and our managers can open them.</li><li>Editors are only given access after your order is paid.</li><li>We delete your uploaded and edited files ${v("retentionDays", "number of days")} days after your order is completed. You can ask us to delete them sooner at ${EMAIL()}.</li></ul>
<h2>Who we share it with</h2>
<p>Only the services we need to run the site: Supabase (hosting, database and file storage), Razorpay (payments), Resend (email), Netlify (website hosting), and Google Analytics if you accept analytics cookies. We may share information if the law requires it.</p>
<h2 id="cookies">Cookies and analytics</h2>
<ul><li>The site stores your login session and your currency choice in your browser. These are needed for the site to work.</li><li>Google Analytics cookies are used only if you press <b>Accept</b> on the cookie bar. If you decline or do not answer, they are not loaded. You can change your choice at any time with <a href="#" data-cookie-settings>Cookie settings</a>.</li></ul>
<h2>Your choices</h2>
<p>You can ask to see, correct or delete the information we hold about you, or to close your account, by writing to ${EMAIL()}. We will reply within a reasonable time.</p>
<h2>Children</h2>
<p>The service is not meant for children under 13, and we do not knowingly collect their information.</p>
<h2>Changes and contact</h2>
<p>If we change this policy we will update the date at the top. Contact: ${EMAIL()}.</p>
<p>${NAME()}<br>${v("address", "business address")}</p>`

const refunds = `
<p>We want you to be happy with your edit. This page explains free revisions and refunds. It forms part of our <a href="/terms.html">Terms of service</a>.</p>
<h2>Free revisions</h2>
<p>If something in your edited document does not match your instructions, tell us within ${v("revisionDays", "number of days")} days of delivery and an editor will correct it at no extra cost. Please say exactly what you would like changed.</p>
<p>A revision covers fixing the work against your original instructions. Sending a new or much longer document, or changing the service level, is a new order.</p>
<h2>Refunds</h2>
<ul><li><b>Before an editor starts:</b> if you cancel before your order is assigned to an editor, you get a full refund.</li><li><b>After delivery:</b> if we cannot fix a genuine problem through revisions, contact us within ${v("refundDays", "number of days")} days of delivery and we will review a full or partial refund.</li><li><b>Not eligible:</b> refunds are not given because a grade, review or decision turned out differently, or because of changes to the content made after delivery.</li></ul>
<h2>Late delivery</h2>
<p>If we miss the turnaround time we quoted, tell us and we will review the order and, where appropriate, refund the rush surcharge or part of the price.</p>
<h2>How refunds are paid</h2>
<p>Approved refunds go back to the original payment method through Razorpay. Banks usually take several working days to show the money.</p>
<h2>How to ask</h2>
<p>Email ${EMAIL()} or use the <a href="/contact.html">contact form</a>, and include your order date and the email you signed up with.</p>`

const pages = [
  ["terms", "Terms of service", "The terms for using Content Editing: orders, prices, your rights to your document and our responsibilities.", terms],
  ["privacy", "Privacy policy", "What personal information Content Editing collects, how your files are protected and deleted, and the choices you have.", privacy],
  ["refunds", "Refunds and revisions", "How free revisions and refunds work at Content Editing.", refunds],
]
for (const [slug, t, d, b] of pages) writeFileSync(`${slug}.html`, page(slug, t, d, b))
console.log(unresolved.length ? `built 3 legal pages (DRAFT, noindex). Still to fill in legal-config.mjs: ${unresolved.join(", ")}` : "built 3 legal pages (complete)")
