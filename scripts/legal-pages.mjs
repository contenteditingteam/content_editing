// Which legal pages go into the sitemap: none until every value in legal-config.mjs is filled.
import { LEGAL } from "./legal-config.mjs"
const need = ["businessName", "address", "email", "governingLaw", "retentionDays", "revisionDays", "refundDays"]
export const unresolved = need.filter((k) => LEGAL[k] == null || LEGAL[k] === "")
export const legalPages = unresolved.length ? [] : ["terms", "privacy", "refunds"]
