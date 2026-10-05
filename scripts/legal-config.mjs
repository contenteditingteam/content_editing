// Fill these in, then run:  node scripts/build-legal.mjs && node scripts/build-blog.mjs
// Anything left as null shows as a yellow "[add: ...]" note on the legal pages, and the pages stay hidden from Google until every value is filled.
export const LEGAL = {
  businessName: null,      // e.g. "Content Editing" or your registered company name
  address: null,           // registered / postal address
  email: null,             // real contact email at contentediting.online
  gst: "",                 // GST or tax number; use "" if you have none (the line is then left out)
  governingLaw: null,      // e.g. "India" (a lawyer should confirm)
  retentionDays: null,     // days we keep uploaded and edited files after an order completes, e.g. 30
  revisionDays: null,      // days a customer has to ask for a free revision after delivery, e.g. 7
  refundDays: null,        // days a customer has to ask for a refund after delivery, e.g. 7
  updated: "2026-10-05",   // date shown as "Last updated"
}
