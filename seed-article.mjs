import { createClient } from '@sanity/client'

const PROJECT_ID = 'pi8mx0t0'
const DATASET = 'production'

// Token must be passed via env: SANITY_TOKEN=sk-...
const token = process.env.SANITY_TOKEN
if (!token) {
  console.error('❌ Missing SANITY_TOKEN env variable.')
  console.error('   Create a write token at: https://www.sanity.io/manage/project/pi8mx0t0/api#tokens')
  console.error('   Then run: SANITY_TOKEN=sk-... node seed-article.mjs')
  process.exit(1)
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

// Helper: create a Portable Text block
function block(text, style = 'normal', markDefs = [], children = null) {
  return {
    _type: 'block',
    _key: randomKey(),
    style,
    markDefs,
    children: children || [{ _type: 'span', _key: randomKey(), text, marks: [] }],
  }
}

function spanWithMark(text, markKey) {
  return { _type: 'span', _key: randomKey(), text, marks: [markKey] }
}

function plainSpan(text) {
  return { _type: 'span', _key: randomKey(), text, marks: [] }
}

function strongSpan(text) {
  return { _type: 'span', _key: randomKey(), text, marks: ['strong'] }
}

function emSpan(text) {
  return { _type: 'span', _key: randomKey(), text, marks: ['em'] }
}

function callout(text) {
  return {
    _type: 'callout',
    _key: randomKey(),
    text,
  }
}

let keyCounter = 0
function randomKey() {
  return `k${Date.now().toString(36)}${(keyCounter++).toString(36)}`
}

// ─── Article content as Portable Text ───

const content = [
  // Intro
  block("Here's a number that should make you uncomfortable."),
  block(
    '', 'normal', [],
    [
      plainSpan('85% of CMOs agree that investing in brand drives business results. That\'s according to Gartner\'s 2025 survey of 402 marketing leaders. '),
      emSpan('Almost universal consensus.'),
    ]
  ),
  block(
    '', 'normal', [],
    [
      plainSpan('And yet — 54% of them still prioritize performance marketing. Only 22% lead with brand.'),
    ]
  ),
  block('Everyone agrees brand matters. Almost nobody builds a system to run it.'),
  block(
    '', 'normal', [],
    [
      strongSpan('That gap is where most of the damage happens.'),
    ]
  ),

  // Section: It gets worse
  block('It gets worse the further down you go.', 'h2'),
  block(
    '', 'normal', [],
    [
      plainSpan('Forrester\'s 2025 field marketing research found that 79% of field marketers are responsible for account-based marketing and customer experience — the touchpoints where brand actually '),
      emSpan('lives or dies'),
      plainSpan(', every day, in every location.'),
    ]
  ),
  block('But 73% of them are measured on pipeline and revenue influenced. Only 6% on long-term customer value. Only 11% on retention.'),
  block(
    '', 'normal', [],
    [
      plainSpan('Think about what that means. The people delivering your brand are being told to chase leads, not quality. Not consistency. Not experience.'),
    ]
  ),
  block(
    '', 'normal', [],
    [
      strongSpan('The system is designed to produce misalignment.'),
    ]
  ),

  // Section: Financial cost
  block('The financial cost of that misalignment is now measurable.', 'h2'),

  // Stats as callouts
  callout('3.5x — Revenue growth for companies aligning brand promise with delivered experience. (Forrester, Total Experience Score, 2025)'),
  callout('2.3% — Share price increase per every 1% rise in brand\'s role in purchase decisions. (Interbrand, Best Global Brands, 2025)'),

  block(
    '', 'normal', [],
    [
      strongSpan('Brand is not a cost center. It\'s an asset that directly impacts valuation.'),
      plainSpan(' The CFO should care about this as much as the CMO.'),
    ]
  ),

  // Section: Perception gap
  block('The perception gap is real.', 'h2'),
  block('Forrester also launched the Brand Experience Index in 2025 — measuring how customers and non-customers perceive brands across three dimensions: salience, fit, and trust.'),
  block('Across 450+ brands in 13 countries, the gap between customer and non-customer perception ranges from 5 to 30 points.'),

  callout('Top 5% — Only 22 out of 450+ brands earned "elite" status on the BX Index. (Forrester, Brand Experience Index, 2025)'),

  block('For organizations with multiple locations, this gap multiplies. Every office, store, or clinic that operates slightly off-brand widens the distance between what you promise and what people experience.'),
  block(
    '', 'normal', [],
    [
      strongSpan('And that distance costs revenue.'),
    ]
  ),

  // Section: Brand is not a logo
  block('Brand is not a logo. It\'s an operating system.', 'h2'),
  block('This is the thesis at the heart of Motto\'s Future of Brand Report 2026. And it matches what I see working with multi-location organizations across fitness, wellness, health, and retail.'),
  block('When a company operates 10, 50, or 200 locations, brand stops being a visual identity exercise. It becomes an operational challenge.'),
  block('Every regional manager interprets the brand differently. Every local team builds their own materials. Every quarter, the distance between what headquarters promises and what customers experience grows wider.'),
  block('The fix is not another brand guidelines PDF that nobody reads. The fix is treating brand as a system — with standardized inputs, scalable workflows, and measurable outputs at every touchpoint.'),

  // Section: What the system looks like
  block('What that system looks like.', 'h2'),

  block('Brief Standardization', 'h3'),
  block('A single, structured brief template with built-in guardrails for brand, audience, and objectives. Removes 80% of inconsistency before any design work begins.'),

  block('Workflow Scalability', 'h3'),
  block('Consistent quality across 50 locations without 50x the effort. AI-supported workflows automate repetitive decisions so humans focus on strategic ones.'),

  block('Aligned Metrics', 'h3'),
  block('If field teams are responsible for brand but measured on pipeline, you get brand shortcuts. Aligning metrics with outcomes is a systems design issue.'),

  // Section: Clone wars
  block('The clone wars are coming.', 'h2'),
  block('Motto calls it "clone wars demand distinction." As AI makes content production nearly free, every brand\'s output starts looking the same.'),
  block(
    '', 'normal', [],
    [
      plainSpan('This changes what quality means. Quality is no longer about production value — AI handles that. Quality becomes about '),
      strongSpan('strategic coherence'),
      plainSpan(': does every touchpoint tell the same story, serve the same positioning, move the same metrics?'),
    ]
  ),
  block('That\'s a systems problem. Not a creative one.'),

  // Section: The opportunity
  block('The opportunity is clear.', 'h2'),
  block('3.5x revenue growth for companies that align promise with delivery. Only 5% of brands currently achieve elite alignment scores. Most leave that value on the table because they lack the systems to execute.'),
  block(
    '', 'normal', [],
    [
      plainSpan('The organizations that will win the next five years are not the ones with the best designers or the biggest budgets. They\'re the ones that '),
      strongSpan('treat brand as infrastructure'),
      plainSpan(' — as seriously as they treat finance, operations, or IT.'),
    ]
  ),
  block(
    '', 'normal', [],
    [
      emSpan('That is a problem worth solving. And it\'s exactly the kind of problem we work on.'),
    ]
  ),

  // Sources
  block('Sources', 'h3'),
  block('Forrester — Total Experience Score Rankings, 2025 · Forrester — Brand Experience Index (BX Index), 2025 · Forrester — Field Marketing in 2025: Time to Break the Cycle of Misalignment · Interbrand — Best Global Brands, 2025 · Gartner — Elevating Brand Awareness in the Age of Performance Marketing, 2025 · Motto — Future of Brand Report, 2026'),
]

// ─── Create the document ───

const doc = {
  _type: 'article',
  title: 'The 85% Problem: Everyone Agrees. Nobody Executes.',
  slug: { _type: 'slug', current: 'the-85-percent-problem' },
  date: '2026-04-09',
  category: 'Operating Model',
  excerpt:
    '85% of CMOs agree brand drives business results. Only 22% lead with brand. The gap between consensus and execution is where most organizations lose revenue — and the fix is treating brand as an operating system, not a logo.',
  content,
}

console.log('📝 Creating article in Sanity...')

try {
  const result = await client.create(doc)
  console.log(`✅ Article created: ${result._id}`)
  console.log(`   Title: ${result.title}`)
  console.log(`   Slug: the-85-percent-problem`)
  console.log('')
  console.log('🔗 View in Studio: https://r352.sanity.studio/structure/journal;the-85-percent-problem')
  console.log('🌐 View on site: https://r352.com/journal/the-85-percent-problem')
} catch (err) {
  console.error('❌ Failed to create article:', err.message)
  process.exit(1)
}
