import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { LEGAL_APPROVED, LEGAL_ROUTES } from "@/app/config/legal";
import { isPlPath, twinOf, normalizePath } from "@/app/config/plRoutes";

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  article?: { title: string; date: string; category: string };
  /** Force `noindex, follow` - used for NDA case studies with no public detail. */
  noindex?: boolean;
  /** Error document: emit no canonical and no hreflang (it represents no URL). */
  notFound?: boolean;
}

export function SEO({
  title = "r352 - Design operations for brands and agencies.",
  description = "Design operations for brands and agencies delivering at scale. Strategy to rollout-ready delivery, run through the r3loop methodology.",
  path = "/",
  ogImage = "https://www.r352.com/og-image.png?v=2",
  article,
  noindex = false,
  notFound = false
}: SEOProps) {
  const baseUrl = "https://www.r352.com";
  const canonicalUrl = `${baseUrl}${path === "/" ? "" : normalizePath(path)}`;

  // ── Language layer ────────────────────────────────────────────────────────
  // The URL decides the language of the document, so every language-dependent
  // tag below is derived from the path, never from React state - a crawler that
  // does not run our JS must still get a coherent, self-consistent page.
  const isPl = isPlPath(path);
  const htmlLang = isPl ? "pl" : "en";
  const ogLocale = isPl ? "pl_PL" : "en_US";
  // hreflang is only emitted for a pair that ACTUALLY EXISTS in both languages.
  // Claiming an alternate that 404s is worse than claiming none: Google drops
  // the whole annotation set for the page. Most routes are English-only and are
  // meant to stay that way, so most pages get no pair at all.
  const twin = notFound ? null : twinOf(path);
  const twinUrl = twin ? `${baseUrl}${twin === "/" ? "" : twin}` : null;
  const enUrl = isPl ? twinUrl : canonicalUrl;
  const plUrl = isPl ? canonicalUrl : twinUrl;

  // ── Indexability, derived from the route (single source of truth) ──────────
  // Three cases must stay OUT of the index until they carry real public content:
  //   1. /privacy + /cookies - copy is an unreviewed draft (see config/legal.ts).
  //   2. /product-design      - every entry is a "Coming soon" teaser, no material.
  //   3. NDA case studies     - thin pages by design; caller passes noindex.
  // "follow" is kept everywhere so link equity still flows and the pages stay
  // reachable from the portfolio.
  const legalNotApproved = !LEGAL_APPROVED && (LEGAL_ROUTES as readonly string[]).includes(path);
  const isNoindex = noindex || notFound || legalNotApproved || path === "/product-design";

  useEffect(() => {
    // Strip a STATIC noindex left in the HTML shell (e.g. a build-time
    // placeholder) so it cannot suppress an indexable route.
    // IMPORTANT: never touch helmet's own tag (data-rh) - since this component
    // now emits a deliberate `noindex, follow` for draft-legal / teaser /
    // NDA routes, removing that would silently re-index them.
    document
      .querySelectorAll('meta[name="robots"]:not([data-rh])')
      .forEach((el) => {
        if (el.getAttribute("content")?.includes("noindex")) el.remove();
      });
  }, []);

  const isHomepage = path === "/";

  // Person schema - anchors Reszek as the named expert behind r352.
  // Critical for LLM entity recognition ("who is Reszek", "who founded r352").
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Przemyslaw Reszka",
    "alternateName": "Reszek",
    "url": "https://www.r352.com",
    "image": "https://www.r352.com/og-image.png",
    "jobTitle": "Founder, Design Operations",
    "description": "Designer-operator with 15+ years of experience across UX, brand operations, and AI-native production systems. Founder of r352 and creator of the r3loop methodology for multi-location brand operations.",
    "worksFor": {
      "@type": "Organization",
      "name": "r352",
      "url": "https://www.r352.com"
    },
    "alumniOf": {
      "@type": "Organization",
      "name": "Deloitte Digital"
    },
    "knowsAbout": [
      "Design Operations",
      "Multi-location Brand Operations",
      "r3loop Methodology",
      "Creative Operating Systems",
      "AI-Native Production Workflows",
      "Brand Standards at Scale",
      "Design Governance"
    ],
    "sameAs": [
      // TODO(reszek): dodać GitHub/X/inne profile dla grafu encji (entity graph) -
      // każdy dodatkowy zweryfikowany profil wzmacnia rozpoznanie Person w LLM/Knowledge Graph.
      "https://www.linkedin.com/in/przemyslawreszka/"
    ]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "r352",
    "url": "https://www.r352.com",
    "logo": "https://www.r352.com/logo.svg",
    "description": "Design operations for brands and agencies. Loop architecture for design ops - we build the operating system behind great design, from strategy to rollout-ready delivery, powered by the r3loop methodology.",
    "email": "hello@r352.com",
    "founder": {
      "@type": "Person",
      "name": "Przemyslaw Reszka",
      "alternateName": "Reszek",
      "url": "https://www.linkedin.com/in/przemyslawreszka/"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "ES"
    },
    "sameAs": [
      "https://www.linkedin.com/in/przemyslawreszka/"
    ]
  };

  // WebSite schema with SearchAction enables Google's sitelinks search box
  // and signals that r352.com is a primary entity for the brand name.
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "r352",
    "url": "https://www.r352.com",
    "description": "Design operations for brands and agencies. Loop architecture for design ops - the operating system behind great design.",
    "publisher": {
      "@type": "Organization",
      "name": "r352",
      "url": "https://www.r352.com"
    },
    "inLanguage": [htmlLang]
  };

  // FAQ schema - high-yield for LLM citations and Google's PAA / rich snippets.
  // Each Q maps to a real question a multi-location operator would ask.
  // USUNIETE 2026-08: staly faqSchema. FAQPage zniknelo ze strony glownej
  // (patrz komentarz przy renderze), wiec ta stala byla martwym kodem trzymajacym
  // nieaktualna kopie odpowiedzi - jedyne zrodlo prawdy to pages/FAQ.tsx.

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "r352",
    "url": "https://www.r352.com",
    "description": "Design operations for brands and agencies delivering at scale. We build the operating system behind great design - strategy, UX/UI, AI workflows, brand systems, creative production. Delivered through the r3loop methodology (8-step framework).",
    "priceRange": "€€€",
    "areaServed": "Worldwide",
    "serviceType": [
      "Design Operations",
      "Brand Strategy",
      "Creative Operating System",
      "Workflow Architecture",
      "AI-First Execution"
    ],
    "knowsAbout": [
      "Design Operations",
      "Brand Systems",
      "Multi-location Brand Management",
      "Creative Workflow Optimization",
      "r3loop Methodology",
      "AI Brief Automation"
    ]
  };

  const reviewsSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "r352",
    "url": "https://www.r352.com",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "6",
      "bestRating": "5"
    },
    "review": [
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Alina Sztoch" },
        "reviewBody": "The communication is seamless, and their commitment to quality translates directly into our business results.",
        "reviewRating": { "@type": "Rating", "ratingValue": "5" }
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Filip Mazurkiewicz" },
        "reviewBody": "They understand the business context and deliver work that actually moves the needle.",
        "reviewRating": { "@type": "Rating", "ratingValue": "5" }
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Lidia Kolucka" },
        "reviewBody": "It feels like they are part of our internal team. Flexible, responsive, and always focused on delivering the best possible impact.",
        "reviewRating": { "@type": "Rating", "ratingValue": "5" }
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Magdalena Rodak" },
        "reviewBody": "They are proactive, transparent, and truly care about the outcome. A reliable partner for any scale.",
        "reviewRating": { "@type": "Rating", "ratingValue": "5" }
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Marek Morisson" },
        "reviewBody": "They don't just execute tasks; they think along with us and bring solutions that drive real value.",
        "reviewRating": { "@type": "Rating", "ratingValue": "5" }
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Michalina Piątkowska" },
        "reviewBody": "Consistent quality across every investment we launch. Communication is precise, deadlines hold - exactly what real estate campaigns need.",
        "reviewRating": { "@type": "Rating", "ratingValue": "5" }
      }
    ]
  };

  // Service schema - /services route only. Names the offering as a service
  // entity (provider r352, serviceType "Design operations consulting") so
  // search engines + LLMs classify the page as a service catalog, not prose.
  const isServicesPage = path === "/services";

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "r352 - Design operations",
    "serviceType": "Design operations consulting",
    "description": "Loop architecture for design ops. Strategy, operating system, design & production, and build & optimize - delivered through the r3loop methodology as productized engagements (Diagnostic, Sprint, Retainer, Enterprise Sprint, Operating Partner).",
    "url": "https://www.r352.com/services",
    "provider": {
      "@type": "Organization",
      "name": "r352",
      "url": "https://www.r352.com"
    },
    "areaServed": "Worldwide",
    "audience": {
      "@type": "BusinessAudience",
      "name": "Multi-location brands and scaling operators (30-300+ locations)"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Engagement models",
      "itemListElement": [
        { "@type": "Offer", "name": "Diagnostic", "description": "5-day operational audit, €2k fixed, 60-day money-back guarantee." },
        { "@type": "Offer", "name": "Sprint", "description": "4-6 week fixed-scope build, from €15k." },
        { "@type": "Offer", "name": "Retainer", "description": "Monthly engagement from €7k/mo, 30-day notice." },
        { "@type": "Offer", "name": "Enterprise Sprint", "description": "12-16 week multi-location rollout, from €55k." },
        { "@type": "Offer", "name": "Operating Partner", "description": "Embedded role from €9.5k/mo, 12-month minimum." }
      ]
    }
  };

  const isArticle = !!article;

  const blogPostingSchema = article ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title.replace(/<br\s*\/?>/g, ' '),
    "datePublished": article.date,
    "dateModified": article.date,
    "author": {
      "@type": "Person",
      "name": "Przemyslaw Reszka",
      "alternateName": "Reszek",
      "url": "https://www.r352.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "r352",
      "url": "https://www.r352.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.r352.com/og-image.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "articleSection": article.category,
    "image": ogImage,
    "url": canonicalUrl
  } : null;

  return (
    <Helmet htmlAttributes={{ lang: htmlLang }}>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={isNoindex
        ? "noindex, follow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
      {/* An error document does not represent a URL, so it gets neither a
          canonical nor hreflang. Emitting canonical="/" here (the old behaviour)
          actively told Google that every unknown URL was a duplicate of the
          homepage. */}
      {!notFound && <link rel="canonical" href={canonicalUrl} />}

      {/* Hreflang. Reciprocity is mandatory and machine-checked in
          scripts/audit-crawl.mjs: if /pl/uslugi names /services as its English
          alternate, /services must name /pl/uslugi back, or Google ignores both.
          x-default points at English - it is the version for everyone whose
          language we have not explicitly served. */}
      {!notFound && enUrl && <link rel="alternate" hrefLang="en" href={enUrl} />}
      {!notFound && plUrl && <link rel="alternate" hrefLang="pl" href={plUrl} />}
      {!notFound && enUrl && <link rel="alternate" hrefLang="x-default" href={enUrl} />}

      {/* Open Graph */}
      <meta property="og:type" content={isArticle ? "article" : "website"} />
      <meta property="og:site_name" content="r352" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={ogLocale} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data */}
      {/* Person + WebSite render on every page - anchors brand entity across the site.
          NOTE: react-helmet-async does NOT render children nested inside fragments -
          every <script> below must be a DIRECT child expression of <Helmet>. */}
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      {isHomepage ? (
        <script type="application/ld+json">
          {JSON.stringify(professionalServiceSchema)}
        </script>
      ) : null}
      {/* USUNIETE 2026-08: Organization + aggregateRating 5/5 z wlasnymi opiniami.
          Google nie kwalifikuje self-serving reviews (opinii o firmie zebranych
          i publikowanych przez te firme na wlasnej stronie) do rich resultow -
          to naruszenie zasad structured data, a nie brakujaca funkcja. Same
          referencje zostaja WIDOCZNE na stronie (prawdziwe osoby, prawdziwe
          firmy) - znika tylko znacznik roszczacy sobie gwiazdki w wynikach. */}
      {/* USUNIETE 2026-08: FAQPage na stronie glownej. Structured data musi
          odpowiadac tresci WIDOCZNEJ na tej stronie, a homepage nie wyswietla
          tych pytan - one zyja na /faq, ktore ma juz wlasny, poprawny FAQPage
          (pages/FAQ.tsx). Duplikat na home byl niezgodny z zasadami i mogl
          uniewaznic ten prawidlowy. */}
      {isArticle && blogPostingSchema ? (
        <script type="application/ld+json">
          {JSON.stringify(blogPostingSchema)}
        </script>
      ) : null}
      {isServicesPage ? (
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      ) : null}
    </Helmet>
  );
}
