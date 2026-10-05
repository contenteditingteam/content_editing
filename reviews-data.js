// Turn this on (true) AFTER you have run supabase/phase4.sql and supabase/phase5.sql in Supabase.
// While it is false the site does not ask the database for reviews, so the browser shows no error.
window.DB_REVIEWS = false;

// REAL reviews you have permission to show.
// Add one object per review, then save. They appear on the home page and the Reviews page (up to 15 on the home page).
// Only add words a real customer actually wrote and agreed to share.
window.REAL_REVIEWS = [
  // { name: "Priya S.", rating: 5, text: "Exactly what the customer wrote.", date: "2026-10-01", verified: true },
];

// Placeholder cards for testing the layout. They are shown ONLY when you open the site on your own computer
// (localhost / 127.0.0.1) and carry a "SAMPLE" label. They are never shown on the live website.
(function () {
  const texts = [
    "SAMPLE: This is placeholder text that shows how a short review looks inside a card.",
    "SAMPLE: This placeholder is a little longer, so you can see how the card grows when a customer writes two or three sentences about their experience.",
    "SAMPLE: A medium placeholder review used only for checking spacing, line breaks and the star row.",
    "SAMPLE: Placeholder text used to test a long review. It keeps going so you can check that cards of different heights still line up neatly in the moving row and in the grid on the Reviews page, including on small phone screens.",
  ];
  window.SAMPLE_REVIEWS = Array.from({ length: 15 }, (_, i) => ({
    name: "Sample name " + (i + 1), rating: i % 5 === 4 ? 4 : 5, text: texts[i % texts.length], date: "2026-01-01",
  }));
})();
