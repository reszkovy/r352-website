import { Route, Switch, useLocation } from "wouter";
import { AgencyHeader } from "@/app/components/agency/AgencyHeader";
import { Footer } from "@/app/components/Footer";
import { AnimatePresence } from "motion/react";
import { useEffect, lazy, Suspense } from "react";
import { SmoothScroll } from "@/app/components/ui/SmoothScroll";
import { HelmetProvider } from "react-helmet-async";
import { SEO } from "@/app/components/SEO";
import { GTM } from "@/app/components/GTM";
import { journalArticles } from "@/app/data/journalArticles";
import { projects } from "@/app/data/projects";

// Non-lazy (always needed)
// NoiseBackground (animated full-screen canvas, per-frame ImageData) replaced by
// GrainOverlay - static SVG-noise tile, zero per-frame cost, sits above content.
import { PersistentBackground } from "@/app/components/ui/PersistentBackground";
import { EffectBackdrop } from "@/app/components/ui/EffectBackdrop";

// 404 = lost in hyperspace (Warp backdrop). EASY REVERT: flip to false.
const NOTFOUND_WARP = true;

// Lazy-loaded pages (code splitting)
const Home = lazy(() => import("@/app/pages/Home").then(m => ({ default: m.Home })));
const Work = lazy(() => import("@/app/pages/Work").then(m => ({ default: m.Work })));
const ProjectDetails = lazy(() => import("@/app/pages/ProjectDetails").then(m => ({ default: m.ProjectDetails })));
const Philosophy = lazy(() => import("@/app/pages/Philosophy").then(m => ({ default: m.Philosophy })));
const Services = lazy(() => import("@/app/pages/Services").then(m => ({ default: m.Services })));
const ServiceDetail = lazy(() => import("@/app/pages/ServiceDetail").then(m => ({ default: m.ServiceDetail })));
const Deliverables = lazy(() => import("@/app/pages/Deliverables").then(m => ({ default: m.Deliverables })));
const Contact = lazy(() => import("@/app/pages/Contact").then(m => ({ default: m.Contact })));
const Journal = lazy(() => import("@/app/pages/Journal").then(m => ({ default: m.Journal })));
const JournalArticle = lazy(() => import("@/app/pages/JournalArticle").then(m => ({ default: m.JournalArticle })));
const BriefAccess = lazy(() => import("@/app/pages/BriefAccess").then(m => ({ default: m.BriefAccess })));
const Pricing = lazy(() => import("@/app/pages/Pricing").then(m => ({ default: m.Pricing })));
const LimitedAccess2 = lazy(() => import("@/app/pages/LimitedAccess2").then(m => ({ default: m.LimitedAccess2 })));
const LimitedAccess3 = lazy(() => import("@/app/pages/LimitedAccess3").then(m => ({ default: m.LimitedAccess3 })));
const LimitedAccess5 = lazy(() => import("@/app/pages/LimitedAccess5").then(m => ({ default: m.LimitedAccess5 })));
const LimitedAccess5Meeting = lazy(() => import("@/app/pages/LimitedAccess5Meeting").then(m => ({ default: m.LimitedAccess5Meeting })));
const LimitedAccess5Pricing = lazy(() => import("@/app/pages/LimitedAccess5Pricing").then(m => ({ default: m.LimitedAccess5Pricing })));
const Process = lazy(() => import("@/app/pages/Process").then(m => ({ default: m.Process })));
const Glossary = lazy(() => import("@/app/pages/Glossary").then(m => ({ default: m.Glossary })));
const FAQ = lazy(() => import("@/app/pages/FAQ").then(m => ({ default: m.FAQ })));
const Privacy = lazy(() => import("@/app/pages/Privacy").then(m => ({ default: m.Privacy })));
const Cookies = lazy(() => import("@/app/pages/Cookies").then(m => ({ default: m.Cookies })));
const Industries = lazy(() => import("@/app/pages/Industries").then(m => ({ default: m.Industries })));
const IndustryDetail = lazy(() => import("@/app/pages/IndustryDetail").then(m => ({ default: m.IndustryDetail })));
const Brief = lazy(() => import("@/app/pages/Diagnostic").then(m => ({ default: m.Brief })));
const ForAgencies = lazy(() => import("@/app/pages/ForAgencies").then(m => ({ default: m.ForAgencies })));
const AiRunners = lazy(() => import("@/app/pages/AiRunners").then(m => ({ default: m.AiRunners })));
const ProductDesign = lazy(() => import("@/app/pages/ProductDesign").then(m => ({ default: m.ProductDesign })));
const WebGLExperiment = lazy(() => import("@/app/pages/WebGLExperiment").then(m => ({ default: m.WebGLExperiment })));
const Estymacja907 = lazy(() => import("@/app/pages/Estymacja907").then(m => ({ default: m.Estymacja907 })));
const Careers = lazy(() => import("@/app/pages/Careers").then(m => ({ default: m.Careers })));
import { useLenis } from "lenis/react";

function ScrollToTop() {
  const [pathname] = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
        requestAnimationFrame(() => {
          lenis.resize();
        });
      }
    }, 700);

    return () => clearTimeout(timer);
  }, [pathname, lenis]);

  return null;
}

/**
 * Focus the <main> element after each route change. Critical for keyboard
 * and screen-reader users - without this, focus stays on the link they
 * clicked (now off-screen on the old page) and they have no idea the page
 * has changed. Coupled with #main tabIndex=-1 to make it programmatically
 * focusable without entering the tab order.
 */
function FocusMainOnRouteChange() {
  const [pathname] = useLocation();

  useEffect(() => {
    // Wait for PageTransition entry animation to complete (~700ms) before
    // moving focus, so the focus ring doesn't flash mid-sweep.
    const timer = setTimeout(() => {
      const main = document.getElementById("main");
      if (main) {
        main.focus({ preventScroll: true });
      }
    }, 750);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

import { CursorGlow } from "@/app/components/ui/CursorGlow";
import { VersionLabel } from "@/app/components/ui/VersionLabel";
import { FloatingBriefCTA } from "@/app/components/ui/FloatingBriefCTA";
import { ScrollThread } from "@/app/components/ui/ScrollThread";
import { BottomGradient } from "@/app/components/ui/BottomGradient";
import { LanguageProvider } from "@/app/context/LanguageContext";
import { ThemeProvider, useTheme } from "@/app/context/ThemeContext";
import { Toaster } from "sonner";
import { CustomCursor } from "@/app/components/ui/CustomCursor";
import { Chatbot } from "@/app/components/Chatbot";
import { useTransitionRoll } from "@/app/utils/transitionDirection";
import { ConsentProvider } from "@/app/context/ConsentContext";
import { ConsentBanner } from "@/app/components/ConsentBanner";
import { AudioProvider } from "@/app/context/AudioContext";
import { useCTAHoverMusicTrigger } from "@/app/hooks/useCTAHoverMusicTrigger";

// ─── Favicon ──────────────────────
// The favicon family is declared statically in index.html and the artwork lives
// in public/favicon.svg. A runtime hook used to inject an inline data-URI copy
// of the logo here; it was removed because it (a) duplicated the path data in a
// second place that silently drifted, and (b) overrode the file on every mount
// with a version whose ring touched the canvas edge - so Google's circular
// favicon crop cut the R off in search results.

function AppContent() {
  const [location] = useLocation();
  const { theme } = useTheme();
  useTransitionRoll(); // advances deterministic sweep direction on every navigation
  useCTAHoverMusicTrigger(); // first CTA hover triggers ambient Planet Rock (Instrumental) playback

  // Prerender signal - Puppeteer-based prerender script (scripts/prerender.mjs)
  // waits for window.__PRERENDER_READY__ before snapshotting the route's HTML.
  // We set it 1.5s after mount so initial animations / Suspense fallbacks
  // resolve before capture. Timeout fallback in the prerender script catches
  // any route that fails to set this signal.
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        (window as { __PRERENDER_READY__?: boolean }).__PRERENDER_READY__ = true;
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [location]);

  const getPageKey = (path: string) => {
    if (path.startsWith("/services/") && path !== "/services") return "/services/detail";
    return path;
  };

  /**
   * Trim a generated meta description to <=160 characters on a word boundary.
   * Titles feed into these strings, so long ones silently produced 170-180 char
   * descriptions that search engines truncate mid-sentence.
   */
  const clampMeta = (text: string, max = 160): string => {
    if (text.length <= max) return text;
    const cut = text.slice(0, max - 1);
    const lastSpace = cut.lastIndexOf(" ");
    return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,.;:-]+$/, "") + ".";
  };

  const getPageSEO = (path: string): { title: string; description: string; ogImage?: string; article?: { title: string; date: string; category: string }; noindex?: boolean; notFound?: boolean } => {
    // Error document (prerendered to dist/404.html and served for every unknown
    // URL). Own title, noindex, and no canonical - see SEO.tsx notFound.
    // ── Polskie adresy ────────────────────────────────────────────────────
    // Copy pisany pod polska intencje zakupowa, nie tlumaczony z angielskiego.
    // Nagłówki mowia jezykiem problemu ("spojnosc marki w wielu lokalizacjach"),
    // a nie nazwa kategorii - "design operations" po polsku praktycznie nie jest
    // wyszukiwane, wiec tytul zbudowany wokol tej frazy nie ma na czym wylądować.
    const PL_SEO: Record<string, { title: string; description: string }> = {
      "/pl": {
        title: "r352 - system produkcji materiałów dla marek wielolokalizacyjnych",
        description: "Porządkujemy produkcję materiałów marketingowych w sieciach: mniej wersji, krótsze akceptacje, spójna marka w każdej lokalizacji. Benefit, Archicom, Geers.",
      },
      "/pl/uslugi": {
        title: "Usługi - r352 | Strategia, design i wdrożenie dla sieci",
        description: "Pięć modeli współpracy z jawną ceną: audyt operacyjny, sprint, retainer, rollout wielolokalizacyjny, partner operacyjny. Wycena przed rozmową.",
      },
      "/pl/proces": {
        title: "Jak pracujemy - r352 | Osiem kroków od briefu do wdrożenia",
        description: "r3loop: osiem kroków, przez które przechodzi każda współpraca. Ta sama kolejność przy 47 i przy 470 lokalizacjach, więc praca jest przewidywalna.",
      },
      "/pl/realizacje": {
        title: "Realizacje - r352 | Projekty dla sieci i marek",
        description: "Case studies: Benefit Systems (300+ klubów), Sonova, Archicom, Kubota, UNIQA. Co było problemem, co zbudowaliśmy, co zostało po projekcie.",
      },
      "/pl/kontakt": {
        title: "Kontakt - r352 | Napisz, zadzwoń albo wyślij brief",
        description: "Porozmawiajmy o produkcji materiałów w Twojej sieci. Mail, rozmowa 30 minut albo ustrukturyzowany brief - wybierz, co szybsze.",
      },
      "/pl/brief": {
        title: "Brief - r352 | Ustrukturyzowane zgłoszenie projektu",
        description: "Opisz potrzebę, zakres, termin i budżet w jednym formularzu. Odpowiadamy konkretem, nie prezentacją o nas.",
      },
      "/pl/branze/fitness-wellness": {
        title: "Sieci klubów fitness - r352 | Spójna marka w każdym klubie",
        description: "Materiały dla sieci klubów: jeden system zamiast osobnej produkcji dla każdej lokalizacji. Doświadczenie z Benefit Systems i Zdrofit.",
      },
      "/pl/branze/nieruchomosci": {
        title: "Deweloperzy - r352 | Komunikacja wielu inwestycji naraz",
        description: "Systemy komunikacji dla deweloperów prowadzących kilka inwestycji jednocześnie: wspólne zasady, osobne charaktery, jedna produkcja. Case: Archicom.",
      },
    };
    if (PL_SEO[path]) return PL_SEO[path];

    if (path === "/__404") return {
      title: "Page not found - r352",
      description: "This page does not exist. Browse the work, the r3loop process, or start a project brief.",
      noindex: true,
      notFound: true,
    };
    if (path === "/work") return {
      title: "Work - r352 | Selected projects & case studies",
      description: "See how marketing teams and agencies ship faster with scalable design systems and delivery workflows. Case studies: Sonova, Benefit Systems, Kubota.",
      ogImage: "https://www.r352.com/og/work.png"
    };
    if (path.startsWith("/work/")) {
      const projectId = path.replace("/work/", "");
      const project = projects.find(p => p.id === projectId);
      if (project) return {
        title: `${project.client}: ${project.title} - r352 Case Study`,
        description: project.description?.en?.substring(0, 155) || `How r352 helped ${project.client} build scalable design systems and delivery workflows.`,
        ogImage: `https://www.r352.com/og/case-${projectId}.png`,
        // NDA cases (fifa, uniqa) are thin by contract - there is no public detail
        // to rank. Keep them out of the index but reachable from the portfolio,
        // and keep `follow` so their outbound links still count.
        // Shadow cases are deliberately unlinked from every listing. Leaving them
        // indexable was an inconsistent half-state (hidden from users, visible in
        // search) - notably wrong for the 18+ alcohol brand. Unlisted => noindex
        // and out of the sitemap; flip isShadow off to publish.
        noindex: Boolean((project as any).isNDA || (project as any).isShadow)
      };
      return {
        title: "Case Study - r352 | Project Details",
        description: "Deep dive into how r352 solved delivery bottlenecks and built scalable brand systems for this client."
      };
    }
    if (path === "/services") return {
      title: "Services - r352 | Strategy, design and delivery",
      description: "Five engagement models, from a €2k five-day diagnostic to an embedded operating partner. Strategy to delivery, run through the r3loop methodology.",
      ogImage: "https://www.r352.com/og/services.png"
    };
    if (path === "/services/operating-system") return {
      title: "Operating System - r352 | Brand Standards & Delivery Infrastructure",
      description: "We audit your delivery workflow, define brand standards, and build intake processes that eliminate chaos and scale across locations."
    };
    if (path === "/services/design-production") return {
      title: "Design Production - r352 | Campaign Toolkits & Assets at Scale",
      description: "Scalable campaign toolkits, templates, and production workflows that maintain brand consistency across every touchpoint."
    };
    if (path === "/services/build-optimize") return {
      title: "Build & Optimize - r352 | UX/UI & Digital Products",
      description: "We design and build digital products, landing pages, and interfaces that convert - grounded in data and user research."
    };
    if (path === "/process") return {
      title: "r3loop - r352 | The 8-step design ops methodology",
      description: "r3loop is r352's 8-step methodology: Diagnose, Map, Standardize, Build, Govern, Ship, Measure, Iterate. Same sequence every project, scaled in depth.",
      ogImage: "https://www.r352.com/og/process.png"
    };
    if (path === "/glossary") return {
      title: "Glossary - r352 | Design ops terminology defined",
      description: "Design ops terminology defined: r3loop, master/variant gates, brief volume, decision velocity, operator vs agency - the vocabulary r352 operates with.",
      ogImage: "https://www.r352.com/og/glossary.png"
    };
    // /framework SEO entry removed - page deleted, route 301-redirected to /process
    // via vercel.json. r3loop on /process is now the single methodology page.
    if (path === "/faq") return {
      title: "FAQ - r352 | Common questions answered",
      description: "What is r3loop? Who does r352 work with? How is r352 different from a creative agency? Engagement models, founder background - answered.",
      ogImage: "https://www.r352.com/og/faq.png"
    };
    if (path === "/careers") return {
      title: "Careers - r352 | Join the design operations team",
      description: "Open roles at r352: fractional CMO partnership, marketing and performance, brand and creative design. Remote-first, EU-anchored.",
      ogImage: "https://www.r352.com/og-image.png?v=2"
    };
    if (path === "/privacy") return {
      title: "Privacy Policy - r352 | How we handle your data",
      description: "How r352 handles your data - GDPR + LOPDGDD compliant, strict opt-in analytics, no third-party advertisers, your rights and how to exercise them."
    };
    if (path === "/cookies") return {
      title: "Cookie Preferences - r352 | Manage your consent",
      description: "Manage which cookies r352 uses. Necessary cookies always on; analytics and marketing fully under your control. Strict opt-in by default."
    };
    if (path === "/industries") return {
      title: "Industries - r352 | Multi-location brand operations",
      description: "Operating systems behind brand and design delivery for fitness networks, real estate developers, retail franchises, and health service networks.",
      ogImage: "https://www.r352.com/og/industries.png"
    };
    if (path === "/industries/fitness-wellness") return {
      title: "Fitness & Wellness - r352 | Design ops for club networks",
      description: "r352 helps fitness and wellness networks turn campaign production into a repeatable operating system. Central brand standards, local execution speed.",
      ogImage: "https://www.r352.com/og/industry-fitness-wellness.png"
    };
    if (path === "/industries/real-estate") return {
      title: "Real Estate - r352 | Campaign systems for developers",
      description: "r352 helps real estate teams turn investment launch campaigns into a repeatable operating system. Templates, QA gates, rollout-ready delivery.",
      ogImage: "https://www.r352.com/og/industry-real-estate.png"
    };
    if (path === "/industries/retail-franchise") return {
      title: "Retail & Franchise - r352 | Brand consistency at scale",
      description: "r352 helps retail chains and franchise networks balance central brand governance with local execution. Templates, approval gates, governance system.",
      ogImage: "https://www.r352.com/og/industry-retail-franchise.png"
    };
    if (path === "/industries/health-service-networks") return {
      title: "Health & Service Networks - r352 | Brand delivery systems",
      description: "r352 helps health and service networks deliver consistent customer-facing communication across local markets. Standards, templates, scale.",
      ogImage: "https://www.r352.com/og/industry-health-service-networks.png"
    };
    if (path === "/philosophy") return {
      title: "Philosophy - r352 | Operator, not agency",
      description: "Operator, not agency. Why r352 builds working systems instead of selling billable hours - process over aesthetics, systems over one-offs."
    };
    if (path === "/deliverables") return {
      title: "Deliverables - r352 | What you actually get",
      description: "Brand guidelines, campaign toolkits, QA checklists, production templates - concrete deliverables that your team can use from day one."
    };
    if (path === "/journal") return {
      title: "Journal - r352 | Insights on design operations & delivery",
      description: "Articles on design operations, delivery workflows and brand systems - how marketing teams and agencies scale their creative output predictably.",
      ogImage: "https://www.r352.com/og/journal.png"
    };
    if (path.startsWith("/journal/")) {
      const articleId = parseInt(path.replace("/journal/", ""));
      // Match JournalArticle's guard: never emit article SEO meta for unpublished ids
      const article = journalArticles.find(a => a.id === articleId && a.published !== false);
      if (article) {
        const cleanTitle = article.title.replace(/<br\s*\/?>/g, ' ');
        return {
          title: `${cleanTitle} - r352 Journal`,
          // Trimmed to <=160 chars on a word boundary: long article titles pushed
          // the generated description past the length search engines display.
          description: clampMeta(
            `r352 Journal: ${cleanTitle}. Insights on design operations, delivery systems and scaling creative output for multi-location organizations.`
          ),
          ogImage: `https://www.r352.com/og/article-${article.id}.png`,
          article: { title: article.title, date: article.date, category: article.category }
        };
      }
      return {
        title: "Article - r352 Journal",
        description: "Read this article on design operations, delivery systems, and scaling creative output for multi-location organizations."
      };
    }
    if (path === "/contact") return {
      title: "Contact - r352 | Brief, call, or write directly",
      description: "Start with a structured brief (48h response), book a 30-minute call, or write to hello@r352.com. For teams ready to systemize their design operations.",
      ogImage: "https://www.r352.com/og/contact.png"
    };
    // /brief - previously fell through to the default site-wide description.
    if (path === "/brief") return {
      title: "Brief - r352 | Structured project intake",
      description: "Start your project with a structured brief: 8 sections, ~26 questions, about 12 minutes. First response with engagement model and scope within 48 hours."
    };
    if (path === "/for-agencies") return {
      title: "For Agencies - r352 | White-label, end-to-end delivery",
      description: "White-label, end-to-end delivery for agencies. Strategy, creative and execution as one team under your name - you lead the relationship and keep the credit."
    };
    if (path === "/ai-runners") return {
      title: "Same scene, ten AI models - r352",
      description: "One running scene rendered by ten different AI image and video models. Same prompt, very different results - an interactive side-by-side gallery.",
      ogImage: "https://www.r352.com/og/ai-runners.png"
    };
    if (path === "/product-design") return {
      title: "Product Design - r352 | Brand, CX, UI, UX",
      description: "Product design at r352 - Brand, CX, UI, UX. Products people understand, use, and come back to, with the component systems that let them scale and hold up."
    };
    return {
      title: "r352 - Design operations for brands and agencies.",
      description: "Design operations for brands and agencies delivering at scale. Strategy to rollout-ready delivery, run through the r3loop methodology.",
      ogImage: "https://www.r352.com/og/home.png?v=2"
    };
  };

  useEffect(() => {
    if (location !== "/") {
      // Not on home page, reset lime-theme so it falls back to default backgrounds
      document.body.classList.remove("lime-theme");
    }
  }, [location]);

  return (
    <>
      <GTM />
      {(() => { const seo = getPageSEO(location); return <SEO path={location} title={seo.title} description={seo.description} ogImage={seo.ogImage} article={seo.article} noindex={seo.noindex} notFound={seo.notFound} />; })()}
      <SmoothScroll>
      {/* overflow-x-clip (NOT -hidden): overflow-x-hidden makes this div a scroll
          container, which becomes the sticky scrollport for every descendant -
          position:sticky binds to this non-scrolling div and never pins (the
          KineticManifesto/LoopPath scenes scrolled away leaving blank viewports).
          clip clips horizontal overflow identically without creating a scroller. */}
      <div className={`${theme === 'dark' ? 'dark' : ''} bg-background min-h-screen w-full overflow-x-clip text-foreground font-sans selection:bg-white selection:text-black relative transition-colors duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)]`}>
      <PersistentBackground />
      <CursorGlow />
      <CustomCursor />

      <ScrollToTop />
      <FocusMainOnRouteChange />

      {/* Skip-to-content link - first focusable element. Hidden until focused
          via keyboard (Tab). Lets keyboard / screen-reader users bypass the
          header navigation and jump straight to the page content. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10001] focus:bg-[#D4FF00] focus:text-black focus:px-5 focus:py-3 focus:font-display focus:text-sm focus:tracking-wide focus:uppercase focus:outline-2 focus:outline-offset-2 focus:outline-black"
      >
        Skip to content
      </a>

      <AgencyHeader />

      <main id="main" tabIndex={-1} className="relative min-h-screen focus:outline-none">
        <Suspense fallback={null}>
          <AnimatePresence mode="wait">
            <Switch location={location} key={getPageKey(location)}>
              <Route path="/" component={Home} />
              {/* ── Polska warstwa adresowa (config/plRoutes.ts) ──────────────────
                  Te same komponenty pod polskimi adresami. Jezyk bierze sie z
                  URL-a (LanguageContext), wiec nie ma tu zadnej logiki jezykowej -
                  komponent renderuje po polsku, bo adres zaczyna sie od /pl. */}
              <Route path="/pl" component={Home} />
              <Route path="/pl/uslugi" component={Services} />
              <Route path="/pl/proces" component={Process} />
              <Route path="/pl/realizacje" component={Work} />
              <Route path="/pl/kontakt" component={Contact} />
              <Route path="/pl/brief" component={Brief} />
              <Route path="/pl/branze/fitness-wellness" component={IndustryDetail} />
              <Route path="/pl/branze/nieruchomosci" component={IndustryDetail} />
              <Route path="/webgl" component={WebGLExperiment} />
              <Route path="/estymacja907" component={Estymacja907} />
              <Route path="/careers" component={Careers} />
              <Route path="/work" component={Work} />
              <Route path="/work/:id" component={ProjectDetails} />
              <Route path="/philosophy" component={Philosophy} />
              <Route path="/services" component={Services} />
              <Route path="/services/:slug" component={ServiceDetail} />
              <Route path="/process" component={Process} />
              <Route path="/glossary" component={Glossary} />
              <Route path="/faq" component={FAQ} />
              <Route path="/privacy" component={Privacy} />
              <Route path="/cookies" component={Cookies} />
              <Route path="/industries" component={Industries} />
              <Route path="/industries/:slug" component={IndustryDetail} />
              <Route path="/brief" component={Brief} />
              <Route path="/for-agencies" component={ForAgencies} />
              <Route path="/ai-runners" component={AiRunners} />
              <Route path="/product-design" component={ProductDesign} />
              <Route path="/deliverables" component={Deliverables} />
              <Route path="/journal" component={Journal} />
              <Route path="/journal/:id" component={JournalArticle} />
              <Route path="/contact" component={Contact} />
              <Route path="/brief-access" component={BriefAccess} />
              <Route path="/limitedaccess" component={Pricing} />
              <Route path="/limitedaccess2" component={LimitedAccess2} />
              <Route path="/limitedaccess3" component={LimitedAccess3} />
              <Route path="/limitedaccess5" component={LimitedAccess5} />
              <Route path="/limitedaccess5/spotkanie" component={LimitedAccess5Meeting} />
              <Route path="/limitedaccess5/wycena" component={LimitedAccess5Pricing} />
              <Route>{() => (
                <div className="relative isolate pt-32 min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
                  {NOTFOUND_WARP && <EffectBackdrop effect="warp" scrim={false} className="-z-10" />}
                  <div className="max-w-xl mx-auto space-y-8">
                    <h1 className="text-8xl md:text-[12rem] font-bold tracking-tighter text-white leading-none">404</h1>
                    <p className="text-xl text-neutral-400">This page doesn't exist.</p>
                    <a href="/" className="inline-flex items-center justify-center px-8 py-4 bg-[#D4FF00] text-black font-display uppercase tracking-widest text-sm hover:bg-white transition-colors duration-300">
                      Back to homepage
                    </a>
                    <p className="text-xs font-display uppercase tracking-[0.2em] text-neutral-500">
                      <a href="/brief" className="hover:text-[#D4FF00] transition-colors duration-300">
                        Or start the 48-hour diagnostic →
                      </a>
                    </p>
                  </div>
                </div>
              )}</Route>
            </Switch>
          </AnimatePresence>
        </Suspense>
      </main>
      
      {/* /webgl is an immersive gallery with a scroll-driven journey (R3loop) -
          the footer would surface at the end of its scroll track */}
      {location !== "/webgl" && <Footer />}
      <Chatbot />
    </div>
    <Toaster
      theme={theme === 'dark' ? 'dark' : 'light'}
      position="bottom-right"
      toastOptions={{
        style: theme === 'dark' ? {
          background: '#1a1a1a',
          border: '1px solid rgba(255,255,255,0.1)',
          color: '#fff',
        } : {
          background: '#ffffff',
          border: '1px solid rgba(0,0,0,0.1)',
          color: '#111',
        },
      }}
    />
  </SmoothScroll>
  </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <ConsentProvider>
        <LanguageProvider>
          <ThemeProvider>
            <AudioProvider>
              <AppContent />
              <ScrollThread />
              <BottomGradient />
              <FloatingBriefCTA />
              <VersionLabel />
              <ConsentBanner />
            </AudioProvider>
          </ThemeProvider>
        </LanguageProvider>
      </ConsentProvider>
    </HelmetProvider>
  );
}