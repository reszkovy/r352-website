import { Helmet } from "react-helmet-async";
import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
}

export function SEO({
  title = "r352 — Design-first partner for teams that ship.",
  description = "Design-first strategic partner for multi-location organizations. We diagnose delivery bottlenecks, build scalable design systems, and help teams ship faster.",
  path = "/",
  ogImage = "https://r352.com/og-image.png"
}: SEOProps) {
  const baseUrl = "https://r352.com";
  const canonicalUrl = `${baseUrl}${path === "/" ? "" : path}`;

  useEffect(() => {
    const robotsMeta = document.querySelector('meta[name="robots"]');
    if (robotsMeta && robotsMeta.getAttribute("content")?.includes("noindex")) {
      robotsMeta.remove();
    }
  }, []);

  const isHomepage = path === "/";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "r352",
    "url": "https://r352.com",
    "logo": "https://r352.com/og-image.png",
    "description": "Design-first strategic partner for multi-location organizations. We diagnose delivery bottlenecks, build scalable design systems, and help teams ship faster.",
    "email": "hello@r352.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mallorca",
      "addressRegion": "Baleares",
      "addressCountry": "ES"
    },
    "sameAs": [
      "https://www.instagram.com/r352.studio/",
      "https://www.linkedin.com/in/przemyslawreszka/",
      "https://www.youtube.com/@r352studio"
    ]
  };

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "r352",
    "url": "https://r352.com",
    "description": "Delivery system consulting for design teams: workflow audits, brand standards, intake processes, and QA frameworks for multi-location organizations.",
    "priceRange": "€€€",
    "areaServed": "Worldwide",
    "serviceType": [
      "Design Consulting",
      "Delivery System Design",
      "Brand Standards",
      "Workflow Optimization"
    ],
    "knowsAbout": [
      "Design Operations",
      "Brand Systems",
      "Campaign Toolkits",
      "Delivery Workflow Optimization"
    ]
  };

  const reviewsSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "r352",
    "url": "https://r352.com",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "5",
      "bestRating": "5"
    },
    "review": [
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Magdalena Rodak" },
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
        "author": { "@type": "Person", "name": "Alina Sztoch" },
        "reviewBody": "They are proactive, transparent, and truly care about the outcome. A reliable partner for any scale.",
        "reviewRating": { "@type": "Rating", "ratingValue": "5" }
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Marek Morisson" },
        "reviewBody": "They don't just execute tasks; they think along with us and bring solutions that drive real value.",
        "reviewRating": { "@type": "Rating", "ratingValue": "5" }
      }
    ]
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Hreflang */}
      <link rel="alternate" hrefLang="en" href={canonicalUrl} />
      <link rel="alternate" hrefLang="pl" href={`${baseUrl}/pl${path === "/" ? "" : path}`} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
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
      {isHomepage ? (
        <>
          <script type="application/ld+json">
            {JSON.stringify(organizationSchema)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(professionalServiceSchema)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(reviewsSchema)}
          </script>
        </>
      ) : (
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      )}
    </Helmet>
  );
}
