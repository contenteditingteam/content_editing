// SEO/AEO extras per blog post, keyed by slug: `answer` is a direct 40-60 word answer shown at the top,
// `faqs` become a visible FAQ section and FAQPage schema. Plain text only (no HTML).
export const seo = {
  "proofreading-vs-editing": {
    answer: "Editing improves how your writing works: clarity, flow, structure and tone. Proofreading is the final check for typos, grammar, punctuation and formatting slips. Choose editing if sentences feel awkward or English is your second language, and proofreading if the writing is already clear. If you need both, edit first and proofread last.",
    faqs: [
      ["What is the main difference between proofreading and editing?", "Editing changes the text to make it clearer and better organised, while proofreading only corrects surface errors such as spelling, punctuation and formatting in a document that is already finished."],
      ["Should I edit or proofread first?", "Always edit first and proofread last. Editing changes the text, and every change can introduce a new typo, so the proofread must come after the final edit."],
      ["Do I need both editing and proofreading?", "For important documents such as a thesis or journal submission, many writers choose editing first and then a proofread of the final version. For clear, well-organised writing, a proofread alone is often enough."],
      ["Which is cheaper, proofreading or editing?", "Proofreading is cheaper and faster because it is a lighter pass. Editing takes longer and costs more per word."],
    ],
  },
  "thesis-editing-checklist": {
    answer: "Before submitting your thesis, check that your argument and chapters are consistent, that terms, numbers and spelling are uniform, that every citation matches the reference list, and that headings, figures and page numbers follow your university's rules. Read it aloud or print it, then have a professional editor do a final pass.",
    faqs: [
      ["What should I check before submitting my thesis?", "Check structure and argument, consistent terminology and spelling, citations against the reference list, figure and table numbering, headings and page formatting, and finally grammar and typos."],
      ["Should I edit my thesis myself first?", "Yes. Finishing your own revision first means a professional editor can spend their time improving clarity and polish instead of fixing basic errors."],
      ["How long does it take to have a thesis edited?", "It depends on length and the turnaround you choose. A standard turnaround costs less than a rush, so plan ahead and allow several days for a full thesis."],
      ["Does a thesis editor change my research or argument?", "No. A language editor improves wording, clarity and consistency but leaves your ideas, data and conclusions as they are."],
    ],
  },
  "common-grammar-mistakes-academic-writing": {
    answer: "The most common grammar mistakes in academic writing are subject-verb disagreement, misplaced modifiers, inconsistent tense, missing or wrong articles, run-on sentences, vague pronouns and unclear passive voice. Fix them by reading each sentence for its subject and verb, keeping tense consistent within a section, and having an editor check the final draft.",
    faqs: [
      ["What are the most common grammar mistakes in academic papers?", "Subject-verb disagreement, inconsistent tense, misused articles, run-on sentences, misplaced modifiers and unclear pronoun references are the errors editors fix most often."],
      ["Is passive voice wrong in academic writing?", "No. Passive voice is acceptable and common in research writing, but overusing it can make sentences vague and heavy. Use active voice when the actor matters."],
      ["Can grammar-checking software replace an editor?", "Software catches many simple errors, but it often misses context, meaning and natural phrasing. A human editor also explains changes so you learn from them."],
      ["How can I avoid grammar mistakes in my thesis or paper?", "Revise in separate passes, read your text aloud, keep a list of your own recurring errors, and have a professional proofread the final version."],
    ],
  },
  "what-is-an-editing-certificate": {
    answer: "An editing certificate is a document from an editing service confirming that a specific document was professionally edited. It usually shows the document title, service type, date and a unique verification number. Some journals and universities ask for one, but it does not guarantee acceptance. Always check your target's author guidelines.",
    faqs: [
      ["What is an editing certificate?", "It is a document issued by an editing service that confirms a particular document was professionally edited, usually with the title, service, date and a unique certificate number."],
      ["Do I need an editing certificate to publish a paper?", "Not everywhere. Some journals and universities, especially for non-native English authors, ask for proof of language editing. Check the author guidelines of your target journal or institution."],
      ["Does an editing certificate guarantee my paper will be accepted?", "No. It only shows that the language was professionally edited. Journals decide on the strength of the research."],
      ["How can I verify an editing certificate is genuine?", "A genuine certificate carries a unique number or QR code. Content Editing certificates can be verified on the verification page at contentediting.online/verify."],
      ["Is the editing certificate free?", "At Content Editing, a certificate is issued automatically when your order is completed, and you can download it from your dashboard as a PDF."],
    ],
  },
  "how-much-does-editing-cost": {
    answer: "Most editors charge per word, typically a few cents. Multiply your word count by the rate for your service and deadline: a 10,000-word document at $0.03 per word costs $300. Proofreading costs less than full editing, and faster turnaround costs more. Uploading your file gives you an exact price before you pay.",
    faqs: [
      ["How much does editing cost per word?", "Rates vary by service level and deadline, but are usually a few cents per word. Proofreading is cheapest, full editing costs more, and rush or same-day work carries a premium."],
      ["How do I calculate the cost of editing my document?", "Multiply your word count by the per-word rate for your service and turnaround. For example, 10,000 words at $0.03 per word is $300."],
      ["Why does faster turnaround cost more?", "A faster deadline means the editor has to move other work aside, so rush delivery is priced at a higher per-word rate."],
      ["How can I reduce the cost of editing?", "Finish your own revision first, exclude parts that do not need editing, allow more time for a standard turnaround, and choose the right service level."],
      ["Is professional editing worth the cost?", "For a thesis, journal submission or important business document, a few cents per word is small compared with the cost of a rejection or an unclear report."],
    ],
  },
  "esl-writers-natural-english": {
    answer: "To sound more natural in English as a second language, use articles carefully, prefer shorter sentences, choose precise common verbs, avoid direct translation of idioms from your first language, and read your text aloud. An ESL editor can then fix phrasing that grammar software misses, while keeping your meaning.",
    faqs: [
      ["How can non-native speakers make their English sound more natural?", "Use shorter sentences, choose common precise verbs, learn how articles work, avoid literal translations of phrases, and read your writing aloud."],
      ["Why is ESL editing different from proofreading?", "ESL editing improves word choice, flow and sentence structure so the text reads naturally to native readers, rather than only correcting typos and grammar."],
      ["Can grammar software fix ESL writing?", "It fixes many grammar errors, but it cannot always tell whether a sentence sounds natural. A human editor catches awkward phrasing and unnatural word choices."],
      ["Will an editor change the meaning of my research?", "No. An ESL editor improves the language and leaves your meaning, data and conclusions unchanged, and flags anything unclear with comments."],
    ],
  },
}

// <meta name="keywords"> per post (from docs/seo-keywords.md). Low ranking value, but kept for completeness.
export const keywords = {
  "proofreading-vs-editing": "proofreading vs editing, academic proofreading and editing, professional proofreading, manuscript proofreading, editing tips, comprehensive editing",
  "thesis-editing-checklist": "thesis editing, thesis proofreading, dissertation editing, graduate thesis editing, academic writing help, editing tips",
  "common-grammar-mistakes-academic-writing": "grammar check, error correction, academic writing, research writing, academic English, paper proofreading, editing tips",
  "what-is-an-editing-certificate": "editing certificate, English editing certificate, proofreading certificate, QR code verification, professional editing proof, journal submission editing",
  "how-much-does-editing-cost": "editing prices, manuscript editing cost, thesis editing price, proofreading cost, proofreading rates, academic editing rates, transparent pricing",
  "esl-writers-natural-english": "ESL editing, English language editing service, language editing, academic English, research paper editing services in India, academic writing help",
}

// Search-result title/description overrides (title ≤ ~60 characters, description ≤ ~155). The on-page H1 keeps the full post title.
export const serp = {
  "proofreading-vs-editing": { title: "Proofreading vs Editing: Which Do You Need?" },
  "thesis-editing-checklist": { title: "Thesis Editing Checklist: 12 Things to Check", description: "A practical checklist for editing your thesis or dissertation yourself before a professional edit: structure, consistency, citations and formatting." },
  "common-grammar-mistakes-academic-writing": { title: "10 Common Grammar Mistakes in Academic Writing" },
  "what-is-an-editing-certificate": { title: "What Is an Editing Certificate? Do You Need One?", description: "Some journals and universities ask for proof of professional editing. Learn what an editing certificate is, when it is requested and how to verify one." },
  "how-much-does-editing-cost": { title: "How Much Does Editing Cost? Per-Word Pricing Guide" },
  "esl-writers-natural-english": { title: "ESL Writing: 8 Tips for a More Natural Style" },
}
