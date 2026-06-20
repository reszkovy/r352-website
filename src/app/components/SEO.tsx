import { Helmet } from "react-helmet-async";
import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  article?: { title: string; date: string; category: string };
}

export function SEO({
  title = "r352 — Move fast, steady cadence.",
  description = "Design, systems & AI — strategic design partner for multi-location organizations. Loop architecture for design ops, from strategy to rollout-ready delivery, powered by the r3loop methodology. Predictable quality and speed at scale.",
  path = "/",
  ogImage = "https://www.r352.com/og-image.png",
  article
}: SEOProps) {
  const baseUrl = "https://www.r352.com";
  const canonicalUrl = `${baseUrl}${path === "/" ? "" : path}`;

  useEffect(() => {
    const robotsMeta = document.querySelector('meta[name="robots"]');
    if (robotsMeta && robotsMeta.getAttribute("content")?.includes("noindex")) {
      robotsMeta.remove();
    }
  }, []);

  const isHomepage = path === "/";

  // Person schema — anchors Reszek as the named expert behind r352.
  // Critical for LLM entity recognition ("who is Reszek", "who founded r352").
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Przemyslaw Reszka",
    "alternateName": "Reszek",
    "url": "https://www.r352.com",
    "image": "https://www.r352.com/og-image.png",
    "jobTitle": "Founder, Strategic Design Partner",
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
      // TODO(reszek): dodać GitHub/X/inne profile dla grafu encji (entity graph) —
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
    "description": "Strategic design partner for multi-location organizations. Loop architecture for design ops — we build the operating system behind great design, from strategy to rollout-ready delivery, powered by the r3loop methodology.",
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
    "description": "Strategic design partner for multi-location brands. Loop architecture for design ops — the operating system behind great design.",
    "publisher": {
      "@type": "Organization",
      "name": "r352",
      "url": "https://www.r352.com"
    },
    "inLanguage": ["en"]
  };

  // FAQ schema — high-yield for LLM citations and Google's PAA / rich snippets.
  // Each Q maps to a real question a multi-location operator would ask.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is r3loop?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "r3loop is r352's 8-step operating methodology: Diagnose, Map, Standardize, Build, Govern, Ship, Measure, Iterate. Every engagement runs through this loop. Depth of each step scales with engagement size, but sequence stays constant — that's what makes the work predictable across 47 locations or 470."
        }
      },
      {
        "@type": "Question",
        "name": "Who does r352 work with?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Multi-location brands and scaling operators — typically 30–300+ location complexity. Fitness, wellness, health, retail, real estate. Past clients include Sonova (Geers), Benefit Systems (300+ wellness clubs), Archicom (multi-investment real estate), Kubota, DiscoBowl, UNIQA, and FIFA."
        }
      },
      {
        "@type": "Question",
        "name": "How is r352 different from a creative agency?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "r352 is positioned as an operator, not an agency. Agencies sell creative deliverables billed by the hour. r352 builds operational systems — design ops infrastructure, brief standardization, governance gates, AI-native production pipelines — sold as productized engagements with fixed scope and predictable outcomes. The deliverables are working tools your team uses after we're gone, not pitch decks."
        }
      },
      {
        "@type": "Question",
        "name": "What are r352's engagement models?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Five productized models. Diagnostic: 5-day operational audit, €2k fixed, 60-day money-back guarantee. Sprint: 4–6 week fixed-scope build, from €15k. Retainer: monthly engagement from €7k/mo with 30-day notice. Enterprise Sprint: 12–16 week multi-location rollout from €55k. Operating Partner: embedded role from €9.5k/mo with 12-month minimum."
        }
      },
      {
        "@type": "Question",
        "name": "Who is Reszek?",
        "acceptedAnswer": {
          "@type": "Answer",
          // TODO(reszek): potwierdź listę miast w bio — na razie ogólne "six years across European markets".
          // MUST stay byte-identical with FAQ_EN in src/app/pages/FAQ.tsx (schema/content parity).
          "text": "Przemyslaw Reszka (Reszek) is the founder of r352. Designer-operator with 15+ years of experience: started in UX at Deloitte, then spent six years across European markets building design operations for multi-location brands. Created the r3loop methodology. EU-based, remote-first."
        }
      }
    ]
  };

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "r352",
    "url": "https://www.r352.com",
    "description": "Strategic design + operations consulting for multi-location organizations. We build operating systems behind great design — brand strategy, workflow architecture, QA standards, AI-first execution. Delivered through the r3loop methodology (8-step framework).",
    "priceRange": "€€€",
    "areaServed": "Worldwide",
    "serviceType": [
      "Strategic Design Consulting",
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
        "reviewBody": "Consistent quality across every investment we launch. Communication is precise, deadlines hold — exactly what real estate campaigns need.",
        "reviewRating": { "@type": "Rating", "ratingValue": "5" }
      }
    ]
  };

  // Service schema — /services route only. Names the offering as a service
  // entity (provider r352, serviceType "Design operations consulting") so
  // search engines + LLMs classify the page as a service catalog, not prose.
  const isServicesPage = path === "/services";

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "r352 — Strategic design partner",
    "serviceType": "Design operations consulting",
    "description": "Loop architecture for design ops. Strategy, operating system, design & production, and build & optimize — delivered through the r3loop methodology as productized engagements (Diagnostic, Sprint, Retainer, Enterprise Sprint, Operating Partner).",
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
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Hreflang — only EN for now. PL is a state-based i18n toggle, not a
          separate URL set. Re-add hreflang="pl" once we ship real /pl routes. */}
      <link rel="alternate" hrefLang="en" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={isArticle ? "article" : "website"} />
      <meta property="og:site_name" content="r352" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data */}
      {/* Person + WebSite render on every page — anchors brand entity across the site.
          NOTE: react-helmet-async does NOT render children nested inside fragments —
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
      {isHomepage ? (
        <script type="application/ld+json">
          {JSON.stringify(reviewsSchema)}
        </script>
      ) : null}
      {isHomepage ? (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      ) : null}
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
