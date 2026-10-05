// Shared review loading + card drawing for the home page and the Reviews page.
// Needs config.js and reviews-data.js loaded first.
(function () {
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const isPreview = ["localhost", "127.0.0.1"].includes(location.hostname);
  const stars = (n) => "★".repeat(n) + "☆".repeat(5 - n);

  const rpc = (fn, body) => fetch(window.SUPABASE_URL + "/rest/v1/rpc/" + fn, {
    method: "POST",
    headers: { apikey: window.SUPABASE_ANON_KEY, Authorization: "Bearer " + window.SUPABASE_ANON_KEY, "Content-Type": "application/json" },
    body: JSON.stringify(body || {}),
  }).then((r) => (r.ok ? r.json() : Promise.reject(r.status)));

  // Real reviews = approved reviews from the database + the ones listed in reviews-data.js.
  // Sample cards are added only when previewing locally, and are always labelled.
  async function loadReviews(limit) {
    const list = [];
    (window.REAL_REVIEWS || []).filter((r) => r.verified).forEach((r) =>
      list.push({ name: r.name, rating: r.rating, text: r.text, date: r.date, badge: "Customer review" }));
    if (window.DB_REVIEWS) {
      try {
        (await rpc("public_reviews", { p_limit: limit })).forEach((r) =>
          list.push({ name: r.display_name, rating: r.rating, text: r.body, date: r.created_at, badge: "Verified customer" }));
      } catch (e) { /* the database part is optional */ }
    }
    const real = list.slice(0, limit);
    const shown = real.slice();
    if (isPreview) (window.SAMPLE_REVIEWS || []).slice(0, Math.max(0, limit - shown.length)).forEach((s) => shown.push({ ...s, sample: true }));
    return { real, shown };
  }

  const card = (r) => `<div class="rv-card${r.sample ? " is-sample" : ""}"><div class="stars">${stars(r.rating)}</div><p>${esc(r.text)}</p>
    <small><b>${esc(r.name)}</b> · ${r.sample ? '<span class="rv-sample">SAMPLE · preview only</span>' : esc(r.badge)}</small></div>`;

  window.CEReviews = { loadReviews, card, esc, stars, isPreview };
})();
