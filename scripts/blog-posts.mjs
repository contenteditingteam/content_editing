// Blog posts. To add a post: copy one object, change the fields, then run:  node scripts/build-blog.mjs
// `body` is plain HTML. Keep one <h2> per section. Internal links should start with "/".
export const SITE = "https://contentediting.online"
export const DATE = "2026-10-05"

export const posts = [
  {
    slug: "proofreading-vs-editing",
    title: "Proofreading vs Editing: Which Do You Need?",
    description: "Proofreading and editing sound alike but do different jobs. Learn the difference, when to choose each, and how to avoid paying for the wrong one.",
    category: "Guides",
    minutes: 5,
    body: `
<p>Writers often ask for “proofreading” when they actually need editing, or pay for a full edit when a light proofread would have done. The two services overlap, but they solve different problems. Here is how to tell them apart.</p>

<h2>What proofreading does</h2>
<p>Proofreading is the last check before a document goes out. A proofreader looks for mistakes that slipped through earlier drafts:</p>
<ul>
<li>Spelling errors and typos</li>
<li>Grammar and punctuation slips</li>
<li>Inconsistent capitalisation, spacing or number formats</li>
<li>Small formatting problems such as stray fonts or broken numbering</li>
</ul>
<p>A proofreader does not rewrite your sentences or reorganise your sections. The text stays yours.</p>

<h2>What editing does</h2>
<p>Editing goes deeper. An editor improves how the writing works, not only whether it is correct. Depending on the level, that can include:</p>
<ul>
<li>Rewording unclear or clumsy sentences</li>
<li>Tightening long paragraphs and cutting repetition</li>
<li>Improving the order of ideas and the links between sections</li>
<li>Making the tone consistent and suitable for the reader</li>
</ul>
<p>Editors usually leave comments explaining larger changes, so you can decide what to accept.</p>

<h2>How to choose</h2>
<p>Ask yourself one question: <strong>is the writing already clear?</strong></p>
<ul>
<li><strong>Clear and well organised, but you want a safety net:</strong> choose proofreading.</li>
<li><strong>Some sentences feel awkward, or a reader might get lost:</strong> choose editing.</li>
<li><strong>English is not your first language:</strong> choose editing, because phrasing matters as much as grammar.</li>
<li><strong>The document is very important, such as a thesis or journal submission:</strong> many writers choose editing first, then a proofread of the final version.</li>
</ul>

<h2>The best order</h2>
<p>If you want both, edit first and proofread last. Editing changes the text, and every change can introduce a new typo, so the proofread should always come after the final edit.</p>

<h2>Cost and time</h2>
<p>Proofreading is faster and cheaper because it is a lighter pass. Editing takes longer and costs more per word. You can compare our rates on the <a href="/pricing.html">pricing page</a> and see exactly what each option includes on our <a href="/services.html">services page</a>.</p>

<h2>Not sure? Start with a quote</h2>
<p>Upload your document and you will see the price and delivery time before you pay. If you are unsure which level you need, <a href="/contact.html">contact us</a> and we will point you in the right direction.</p>`,
  },
  {
    slug: "thesis-editing-checklist",
    title: "Thesis Editing Checklist: 12 Things to Check Before You Submit",
    description: "A practical checklist for editing your thesis or dissertation yourself before a professional edit, covering structure, consistency, citations and formatting.",
    category: "Academic writing",
    minutes: 6,
    body: `
<p>A thesis can run to tens of thousands of words, written over months or years. Small inconsistencies creep in. Use this checklist to catch the most common ones before you submit, or before you send the document to an editor.</p>

<h2>Structure and argument</h2>
<ol>
<li><strong>Your research question is clear.</strong> A reader should find it within the first few pages.</li>
<li><strong>Each chapter has a purpose.</strong> Start and end each chapter with a short note on what it covered and why it matters.</li>
<li><strong>Your conclusion answers the question.</strong> Check that it matches what you promised in the introduction.</li>
</ol>

<h2>Consistency</h2>
<ol start="4">
<li><strong>Spelling variety.</strong> Pick British or American English and use it everywhere.</li>
<li><strong>Terminology.</strong> If you call something a “participant” in chapter two, do not call it a “subject” in chapter five.</li>
<li><strong>Numbers and units.</strong> Decide how to write numbers, percentages and units, and apply the rule throughout.</li>
<li><strong>Headings.</strong> Use the same capitalisation and numbering style for every heading level.</li>
</ol>

<h2>Citations and references</h2>
<ol start="8">
<li><strong>Every in-text citation has a reference.</strong> Check both directions: no citation without an entry, and no entry without a citation.</li>
<li><strong>One citation style.</strong> Follow your university’s guide exactly, including punctuation and italics.</li>
</ol>

<h2>Tables, figures and layout</h2>
<ol start="10">
<li><strong>Captions and numbering.</strong> Tables and figures should be numbered in order and mentioned in the text.</li>
<li><strong>Front matter.</strong> Update the table of contents and lists of figures and tables after your final changes.</li>
<li><strong>University formatting rules.</strong> Margins, line spacing, fonts and page numbers are often checked before a thesis is accepted.</li>
</ol>

<h2>When to get a professional edit</h2>
<p>A checklist catches mistakes, but it cannot tell you that a paragraph is hard to follow. A professional editor reads with fresh eyes and flags unclear sentences, weak transitions and repeated points. Our <a href="/services.html#thesis">thesis and dissertation editing</a> covers language, structure and consistency across the whole document, and you can see your price before you pay by uploading your file on the <a href="/login.html">order page</a>.</p>

<h2>A final tip</h2>
<p>Print a chapter or read it aloud. Both slow you down enough to notice errors that your eyes skip on screen.</p>`,
  },
  {
    slug: "common-grammar-mistakes-academic-writing",
    title: "10 Common Grammar Mistakes in Academic Writing (and How to Fix Them)",
    description: "The grammar and style errors editors fix most often in research papers and theses, with simple examples and quick fixes you can apply today.",
    category: "Academic writing",
    minutes: 6,
    body: `
<p>Academic writing has its own habits, and some of them lead to the same mistakes again and again. These ten come up constantly in research papers, essays and theses.</p>

<h2>1. Subject and verb that do not agree</h2>
<p><em>The results of the three experiments <strong>was</strong> consistent.</em> The subject is “results”, so use <strong>were</strong>. Ignore the words that sit between the subject and the verb.</p>

<h2>2. Mixing up “affect” and “effect”</h2>
<p>“Affect” is usually a verb (<em>stress affects sleep</em>). “Effect” is usually a noun (<em>the effect of stress</em>).</p>

<h2>3. Dangling modifiers</h2>
<p><em>After analysing the data, the hypothesis was rejected.</em> Who analysed it? Write <em>After analysing the data, we rejected the hypothesis.</em></p>

<h2>4. Overlong sentences</h2>
<p>If a sentence runs to four lines, split it. One main idea per sentence keeps your reader with you.</p>

<h2>5. Inconsistent tense</h2>
<p>Use the past tense for what you did and found (<em>we measured</em>), and the present tense for established facts and for your paper’s own structure (<em>Section 3 describes</em>). Do not switch without a reason.</p>

<h2>6. Missing or extra articles</h2>
<p>Many writers whose first language does not use “a”, “an” or “the” drop them or add them in the wrong place. <em>We conducted survey</em> needs <em>a survey</em>.</p>

<h2>7. Unclear “this”</h2>
<p><em>This shows that…</em> What is “this”? Add the noun: <em>This difference shows that…</em></p>

<h2>8. Wrong comma use after linking words</h2>
<p>Words such as “however” and “therefore” need correct punctuation. <em>The test was short, however it was reliable</em> should be <em>The test was short; however, it was reliable.</em></p>

<h2>9. Vague quantities</h2>
<p><em>Many participants improved</em> is weaker than <em>Twenty-three of 30 participants improved.</em> Be specific where you can.</p>

<h2>10. Repeating the same word</h2>
<p>If “significant” appears six times in one paragraph, the reader stops noticing it. Vary your wording, but do not swap in a synonym that changes your meaning.</p>

<h2>Want a second pair of eyes?</h2>
<p>Editors spot these patterns quickly, and tracked changes show you exactly what was fixed so you learn for next time. Learn more about <a href="/services.html#academic">academic editing</a>, or read about the difference between <a href="/blog/proofreading-vs-editing">proofreading and editing</a>.</p>`,
  },
  {
    slug: "what-is-an-editing-certificate",
    title: "What Is an Editing Certificate and Do You Need One?",
    description: "Some journals and universities ask for proof that a paper was professionally edited. Learn what an editing certificate is, when it is requested, and how to check one.",
    category: "Publishing",
    minutes: 4,
    body: `
<p>When you submit a paper to a journal or a thesis to a university, you may be asked to show that the English has been checked. An editing certificate is a simple way to do that.</p>

<h2>What an editing certificate is</h2>
<p>An editing certificate is a document, issued by an editing service, that confirms a particular document was professionally edited. It usually shows the document title, the name of the person it was issued to, the type of service, the date, and a unique number.</p>

<h2>Who asks for one</h2>
<ul>
<li>Some journals, especially when the authors are not native English speakers, ask for evidence of language editing.</li>
<li>Some universities and funding bodies request it with thesis or grant submissions.</li>
<li>Authors sometimes include it voluntarily to show the language has been checked.</li>
</ul>
<p>It is not required everywhere. <strong>Always read the author guidelines for your target journal or institution</strong> to see what they accept.</p>

<h2>What a certificate does not do</h2>
<p>A certificate shows that editing happened. It does not guarantee that a paper will be accepted. Journals decide on the strength of the research, and editing simply removes language problems that could distract reviewers.</p>

<h2>How to check a certificate is genuine</h2>
<p>A trustworthy certificate can be verified. Ours carries a unique certificate number and a QR code. Anyone can scan the code or enter the verification code on our <a href="/verify.html">verification page</a> to confirm the certificate is real and see the document it was issued for.</p>

<h2>How to get one</h2>
<p>An editing certificate is issued automatically when your order is completed. You can open it from your dashboard and save it as a PDF. See our <a href="/services.html">services</a> or <a href="/login.html">place an order</a> to get started.</p>`,
  },
  {
    slug: "how-much-does-editing-cost",
    title: "How Much Does Editing Cost? A Simple Guide to Per-Word Pricing",
    description: "Editing is usually priced per word. See what affects the price, how to estimate your cost in advance, and how to avoid paying for more than you need.",
    category: "Pricing",
    minutes: 5,
    body: `
<p>Most editing services charge per word, because it is the fairest way to price documents of very different lengths. Here is how it works and what makes the price go up or down.</p>

<h2>How per-word pricing works</h2>
<p>The price is the number of words multiplied by the rate for your service and deadline. For example, a 10,000-word document at $0.03 per word costs $300. Because the rate is fixed, you can calculate the cost before you commit.</p>

<h2>What changes the rate</h2>
<ul>
<li><strong>The level of editing.</strong> Proofreading costs less than a full edit because it is a lighter pass.</li>
<li><strong>Turnaround time.</strong> The faster you need it, the higher the rate, because the editor has to make other work wait.</li>
<li><strong>Type of document.</strong> Highly technical documents may need an editor with subject knowledge.</li>
<li><strong>Rush delivery.</strong> Urgent same-day work is priced at a premium.</li>
</ul>

<h2>How to get an exact price</h2>
<p>You do not need to guess the word count. When you upload your document on our <a href="/login.html">order page</a>, the word count is worked out automatically and your price and delivery time appear straight away. You can also try the instant calculator on our <a href="/index.html#quote">home page</a>, and switch between US dollars and Indian rupees.</p>

<h2>Tips to keep the cost sensible</h2>
<ol>
<li><strong>Finish your own revision first.</strong> The cleaner the draft, the less work for the editor.</li>
<li><strong>Remove what you do not need to be edited.</strong> Long reference lists and appendices can often be excluded; check what your service counts.</li>
<li><strong>Allow more time.</strong> Standard turnaround is much cheaper than rush.</li>
<li><strong>Pick the right level.</strong> Read our guide on <a href="/blog/proofreading-vs-editing">proofreading vs editing</a> so you do not pay for more than you need.</li>
</ol>

<h2>Is it worth it?</h2>
<p>For a thesis, a journal submission or an important business document, a few cents per word is a small price compared with the cost of a rejected paper or an unclear report. See the full list of rates on the <a href="/pricing.html">pricing page</a>.</p>`,
  },
  {
    slug: "esl-writers-natural-english",
    title: "Writing in English as a Second Language: 8 Tips for a More Natural Style",
    description: "Practical tips for non-native English writers to make research papers, essays and reports read naturally, from article use to sentence length.",
    category: "ESL writing",
    minutes: 5,
    body: `
<p>Writing well in a second language is hard, and academic English is hard even for native speakers. These eight tips help your writing sound natural without losing your own voice.</p>

<h2>1. Keep sentences short and direct</h2>
<p>Long sentences with many clauses are where most errors hide. Aim for one idea per sentence, then join related ideas with simple linking words.</p>

<h2>2. Learn the articles</h2>
<p>“A”, “an” and “the” cause more mistakes than almost anything else. As a rule, use “the” for something specific both you and the reader know about, and “a” or “an” when introducing something new. Many nouns for materials and ideas need no article at all.</p>

<h2>3. Prefer active voice</h2>
<p><em>We collected the samples</em> is clearer than <em>The samples were collected by us.</em> Use the passive when the doer does not matter, such as <em>The samples were stored at −20 °C.</em></p>

<h2>4. Watch your prepositions</h2>
<p>Prepositions rarely translate word for word. Keep a short list of the ones you get wrong (<em>depend on</em>, <em>different from</em>, <em>interested in</em>) and check them when you edit.</p>

<h2>5. Use common words</h2>
<p>You do not need rare words to sound academic. Clear, familiar vocabulary is easier to read. <em>Use</em> is almost always better than <em>utilise</em>.</p>

<h2>6. Read in your field</h2>
<p>Notice how published papers in your area start sentences, introduce results and express caution. Borrow the patterns (not the exact sentences) for your own work.</p>

<h2>7. Read your draft aloud</h2>
<p>If a sentence is hard to say, it is usually hard to read. Rewrite anything that makes you stumble.</p>

<h2>8. Get a human editor</h2>
<p>Software can fix grammar, but it cannot always tell whether a sentence sounds natural to a native reader. An ESL editor improves word choice, flow and sentence structure while keeping your meaning. See how our <a href="/services.html#esl">ESL editing</a> works, or <a href="/login.html">get an instant quote</a> by uploading your file.</p>`,
  },
]
