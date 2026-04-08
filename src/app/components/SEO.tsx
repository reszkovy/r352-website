import { Helmet } from "react-helmet-async";
import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
}

export function SEO({ 
  title = "Design-first partner for teams that ship.", 
  description = "Minimalistyczne portfolio agencji r352. Budujemy i skalujemy spójne systemy marek. Skalujcie system, nie chaos.", 
  path = "/" 
}: SEOProps) {
  const baseUrl = "https://r352.com";
  const canonicalUrl = `${baseUrl}${path === "/" ? "" : path}`;

  // Usunięcie ewentualnych tagów noindex z głównego dokumentu HTML
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
    "logo": "https://r352.com/logo.png",
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
    "@type": "LocalBusiness",
    "name": "r352",
    "url": "https://r352.com",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "5",
      "bestRating": "5"
    }
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      
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
