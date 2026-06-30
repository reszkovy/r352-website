/**
 * route-meta.mjs - static per-route SEO metadata for the browserless meta
 * injector (scripts/inject-meta.mjs).
 *
 * WHY THIS EXISTS: the puppeteer prerender (scripts/prerender.mjs) skips on
 * Vercel when Chromium isn't available, so no per-route HTML is written - and
 * vercel.json's SPA catch-all rewrite then serves /index.html (the home shell,
 * with the home <title>) for every route. inject-meta.mjs writes a real
 * dist/{route}/index.html for each route below so Vercel serves route-correct
 * <title>/description/canonical/OG in the raw HTML, browser or not.
 *
 * KEEP IN SYNC with getPageSEO() in src/app/App.tsx - this mirrors the static
 * (non-parameterised) routes. Dynamic routes (/work/:id, /journal/:id) are
 * intentionally omitted; they hydrate client-side via react-helmet-async.
 */

export const SITE = "https://www.r352.com";
const OG = (name) => `${SITE}/og/${name}.png`;
const DEFAULT_OG = `${SITE}/og-image.png`;

export const ROUTE_META = {
  "/": {
    title: "r352 - Design operations for brands and agencies.",
    description:
      "Design operations for brands and agencies delivering at scale. From strategy to rollout-ready delivery, powered by the r3loop methodology - predictable quality and speed at scale.",
    ogImage: OG("home"),
  },
  "/work": {
    title: "Work - r352 | Selected projects & case studies",
    description:
      "See how marketing teams and agencies ship faster with scalable design systems and delivery workflows. Case studies: Sonova, Benefit Systems, Kubota.",
    ogImage: OG("work"),
  },
  "/services": {
    title: "Services - r352 | Strategy, design and delivery",
    description:
      "Five engagement models, from a €2k five-day diagnostic to an embedded operating partner. Strategy to delivery, run through the r3loop methodology.",
    ogImage: OG("services"),
  },
  "/process": {
    title: "r3loop - r352 | The 8-step design ops methodology",
    description:
      "r3loop is r352's 8-step methodology: Diagnose, Map, Standardize, Build, Govern, Ship, Measure, Iterate. Same sequence every project, scaled in depth.",
    ogImage: OG("process"),
  },
  "/glossary": {
    title: "Glossary - r352 | Design ops terminology defined",
    description:
      "Design ops terminology defined: r3loop, master/variant gates, brief volume, decision velocity, operator vs agency - the vocabulary r352 operates with.",
    ogImage: OG("glossary"),
  },
  "/faq": {
    title: "FAQ - r352 | Common questions answered",
    description:
      "What is r3loop? Who does r352 work with? How is r352 different from a creative agency? Engagement models, founder background - answered.",
    ogImage: OG("faq"),
  },
  "/privacy": {
    title: "Privacy Policy - r352 | How we handle your data",
    description:
      "How r352 handles your data - GDPR + LOPDGDD compliant, strict opt-in analytics, no third-party advertisers, your rights and how to exercise them.",
  },
  "/cookies": {
    title: "Cookie Preferences - r352 | Manage your consent",
    description:
      "Manage which cookies r352 uses. Necessary cookies always on; analytics and marketing fully under your control. Strict opt-in by default.",
  },
  "/industries": {
    title: "Industries - r352 | Multi-location brand operations",
    description:
      "Operating systems behind brand and design delivery for fitness networks, real estate developers, retail franchises, and health service networks.",
    ogImage: OG("industries"),
  },
  "/industries/fitness-wellness": {
    title: "Fitness & Wellness - r352 | Design ops for club networks",
    description:
      "r352 helps fitness and wellness networks turn campaign production into a repeatable operating system. Central brand standards, local execution speed.",
    ogImage: OG("industry-fitness-wellness"),
  },
  "/industries/real-estate": {
    title: "Real Estate - r352 | Campaign systems for developers",
    description:
      "r352 helps real estate teams turn investment launch campaigns into a repeatable operating system. Templates, QA gates, rollout-ready delivery.",
    ogImage: OG("industry-real-estate"),
  },
  "/industries/retail-franchise": {
    title: "Retail & Franchise - r352 | Brand consistency at scale",
    description:
      "r352 helps retail chains and franchise networks balance central brand governance with local execution. Templates, approval gates, governance system.",
    ogImage: OG("industry-retail-franchise"),
  },
  "/industries/health-service-networks": {
    title: "Health & Service Networks - r352 | Brand delivery systems",
    description:
      "r352 helps health and service networks deliver consistent customer-facing communication across local markets. Standards, templates, scale.",
    ogImage: OG("industry-health-service-networks"),
  },
  "/philosophy": {
    title: "Philosophy - r352 | Operator, not agency",
    description:
      "Operator, not agency. Why r352 builds working systems instead of selling billable hours - process over aesthetics, systems over one-offs.",
  },
  "/deliverables": {
    title: "Deliverables - r352 | What you actually get",
    description:
      "Brand guidelines, campaign toolkits, QA checklists, production templates - concrete deliverables that your team can use from day one.",
  },
  "/journal": {
    title: "Journal - r352 | Insights on design operations & delivery",
    description:
      "Articles on design operations, delivery workflows and brand systems - how marketing teams and agencies scale their creative output predictably.",
    ogImage: OG("journal"),
  },
  "/contact": {
    title: "Contact - r352 | Brief, call, or write directly",
    description:
      "Start with a structured brief (48h response), book a 30-minute call, or write to hello@r352.com. For teams ready to systemize their design operations.",
    ogImage: OG("contact"),
  },
  "/brief": {
    title: "Brief - r352 | Structured project intake",
    description:
      "Start your project with a structured brief: 8 sections, ~26 questions, about 10 minutes. First response with engagement model and scope within 48 hours.",
  },
  "/for-agencies": {
    title: "For Agencies - r352 | White-label, end-to-end delivery",
    description:
      "White-label, end-to-end delivery for agencies. Strategy, creative and execution as one team under your name - you lead the relationship and keep the credit.",
    ogImage: OG("for-agencies"),
  },
  "/ai-runners": {
    title: "Same scene, ten AI models - r352",
    description:
      "One running scene rendered by ten different AI image and video models. Same prompt, very different results - an interactive side-by-side gallery.",
    ogImage: OG("ai-runners"),
  },
  "/product-design": {
    title: "Product Design - r352 | Brand, CX, UI, UX",
    description:
      "Product design at r352 - Brand, CX, UI, UX. Products people understand, use, and come back to, with the component systems that let them scale and hold up.",
  },
};

export { DEFAULT_OG };
