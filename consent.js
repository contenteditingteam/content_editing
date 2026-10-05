/* Cookie choice + Google Analytics.
   Analytics (Google tag) is loaded ONLY after the visitor presses Accept. Decline or no answer = no tracking.
   The choice is kept in this browser (localStorage 'ce_consent' = 'yes' | 'no'); the "Cookie settings" link in the footer reopens the banner. */
(function () {
  var GA_ID = "G-SMDSWJ5T0V", KEY = "ce_consent";
  var get = function () { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
  var put = function (v) { try { localStorage.setItem(KEY, v); } catch (e) {} };

  function loadAnalytics() {
    if (window.__ga) return; window.__ga = 1;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag("js", new Date()); gtag("config", GA_ID, { anonymize_ip: true });
    var s = document.createElement("script"); s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID; document.head.appendChild(s);
  }

  function close(el) { if (el && el.parentNode) el.parentNode.removeChild(el); }

  function banner() {
    if (document.getElementById("cookie-bar")) return;
    var b = document.createElement("div");
    b.id = "cookie-bar"; b.setAttribute("role", "region"); b.setAttribute("aria-label", "Cookie choice");
    b.innerHTML = '<p>We use Google Analytics cookies to see which pages help visitors. They are off unless you accept. ' +
      '<a href="/privacy.html#cookies">Read how we use cookies</a>.</p>' +
      '<div><button type="button" class="btn btn-ghost" data-c="no">Decline</button>' +
      '<button type="button" class="btn btn-primary" data-c="yes">Accept</button></div>';
    b.addEventListener("click", function (e) {
      var c = e.target.getAttribute && e.target.getAttribute("data-c"); if (!c) return;
      put(c); close(b);
      if (c === "yes") loadAnalytics();
      else if (window.__ga) location.reload(); // switching off after accepting: reload so the tracker stops
    });
    document.body.appendChild(b);
  }

  function init() {
    var c = get();
    if (c === "yes") loadAnalytics();
    else if (c !== "no") banner();
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("[data-cookie-settings]");
      if (a) { e.preventDefault(); banner(); }
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
