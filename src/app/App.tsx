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
import { NoiseBackground } from "@/app/components/ui/NoiseBackground";
import { PersistentBackground } from "@/app/components/ui/PersistentBackground";

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

import { CursorGlow } from "@/app/components/ui/CursorGlow";
import { LanguageProvider } from "@/app/context/LanguageContext";
import { ThemeProvider, useTheme } from "@/app/context/ThemeContext";
import { ThemeToggle } from "@/app/components/ui/ThemeToggle";
import { Toaster } from "sonner";
import { CustomCursor } from "@/app/components/ui/CustomCursor";
import { Chatbot } from "@/app/components/Chatbot";
import { Preloader } from "@/app/components/ui/Preloader";

// ─── Dynamic Favicon ──────────────────────
function useFavicon() {
  useEffect(() => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 658 676" width="64" height="64">
      <rect x="-20" y="-20" width="698" height="716" rx="100" fill="#0A0A0A"/>
      <path d="M0 337.632C0 136.127 154.934 0 328.676 0C502.418 0 657.352 136.127 657.352 337.632C657.352 539.136 502.418 675.264 328.676 675.264C154.934 675.264 0 539.136 0 337.632ZM78.8106 337.632C78.8106 492.566 189.862 601.827 328.676 601.827C465.699 601.827 578.541 492.566 578.541 337.632C578.541 182.697 465.699 73.4372 328.676 73.4372C189.862 73.4372 78.8106 182.697 78.8106 337.632Z" fill="#DAFF45"/>
      <path d="M468.492 402.837C474.353 406.798 478.709 412.183 481.56 418.994C484.411 425.806 485.282 432.617 484.174 439.428C483.065 446.239 480.055 452.496 475.145 458.199C470.393 463.743 464.769 467.544 458.275 469.604C455.424 470.237 452.414 470.633 449.246 470.792C446.078 470.95 441.88 470.792 436.653 470.316C431.584 469.841 428.575 469.445 427.624 469.128C412.418 468.495 396.499 465.089 379.866 458.912C363.393 452.734 349.137 445.843 337.098 438.24C325.06 430.479 313.338 422.004 301.933 412.817C290.687 403.63 282.45 396.422 277.222 391.195C271.995 385.968 268.114 381.77 265.58 378.602L260.59 373.137L261.066 395.472C261.382 422.4 261.699 440.141 262.016 448.695C262.333 460.416 259.323 469.92 252.987 477.207C246.176 484.969 237.543 489.404 227.088 490.513C216 491.463 206.417 488.533 198.339 481.721C189.627 474.276 185.112 465.644 184.795 455.823C184.795 447.111 184.479 429.132 183.845 401.887C183.528 372.741 183.211 353.258 182.895 343.437C181.944 314.291 180.598 282.69 178.855 248.634C178.222 237.229 181.311 227.646 188.122 219.884C194.616 212.439 202.932 208.083 213.07 206.816H214.02L214.496 206.341C219.089 203.49 225.267 200.559 233.029 197.55C272.312 181.709 311.199 173.393 349.691 172.601C362.363 172.285 372.738 174.74 380.817 179.967C390.479 186.145 397.132 195.886 400.775 209.192C407.587 235.803 401.251 262.256 381.767 288.551C377.807 293.778 371.63 301.223 363.234 310.886C358.324 316.746 354.601 321.102 352.067 323.954C349.849 327.122 349.374 330.211 350.641 333.22C355.552 342.566 361.809 351.04 369.412 358.644C377.015 366.088 384.539 371.791 391.984 375.751C399.429 379.553 406.636 382.879 413.606 385.73C420.576 388.423 426.199 390.086 430.476 390.72L436.891 392.145C443.702 393.413 448.85 394.521 452.335 395.472C458.829 397.531 464.215 399.986 468.492 402.837ZM309.299 262.652C310.883 255.524 308.586 250.535 302.408 247.684C298.765 246.1 293.934 246.1 287.915 247.684C283.321 248.951 274.688 251.881 262.016 256.475C258.848 257.425 257.422 259.484 257.739 262.652L259.64 307.084C259.64 309.935 261.066 311.836 263.917 312.786C266.926 313.737 269.382 313.103 271.282 310.886C279.994 299.798 286.172 292.511 289.815 289.026C295.359 282.849 299.399 278.334 301.933 275.483C306.21 270.573 308.665 266.296 309.299 262.652Z" fill="#DAFF45"/>
    </svg>`;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.type = "image/svg+xml";
    link.href = url;

    return () => URL.revokeObjectURL(url);
  }, []);
}

function AppContent() {
  const [location] = useLocation();
  const { theme } = useTheme();
  useFavicon();

  const getPageKey = (path: string) => {
    if (path.startsWith("/services/") && path !== "/services") return "/services/detail";
    return path;
  };

  const getPageSEO = (path: string): { title: string; description: string; article?: { title: string; date: string; category: string } } => {
    if (path === "/work") return {
      title: "Work — r352 | Selected projects & case studies",
      description: "See how we help multi-location brands like Sonova, Benefit Systems, and Kubota ship faster with scalable design systems and delivery workflows."
    };
    if (path.startsWith("/work/")) {
      const projectId = path.replace("/work/", "");
      const project = projects.find(p => p.id === projectId);
      if (project) return {
        title: `${project.client}: ${project.title} — r352 Case Study`,
        description: project.description?.en?.substring(0, 155) || `How r352 helped ${project.client} build scalable design systems and delivery workflows.`
      };
      return {
        title: "Case Study — r352 | Project Details",
        description: "Deep dive into how r352 solved delivery bottlenecks and built scalable brand systems for this client."
      };
    }
    if (path === "/services") return {
      title: "Services — r352 | Design Operations & Delivery Systems",
      description: "From brand operating systems to design production and optimization — we build the infrastructure that lets multi-location teams ship consistently."
    };
    if (path === "/services/operating-system") return {
      title: "Operating System — r352 | Brand Standards & Delivery Infrastructure",
      description: "We audit your delivery workflow, define brand standards, and build intake processes that eliminate chaos and scale across locations."
    };
    if (path === "/services/design-production") return {
      title: "Design Production — r352 | Campaign Toolkits & Assets at Scale",
      description: "Scalable campaign toolkits, templates, and production workflows that maintain brand consistency across every touchpoint."
    };
    if (path === "/services/build-optimize") return {
      title: "Build & Optimize — r352 | UX/UI & Digital Products",
      description: "We design and build digital products, landing pages, and interfaces that convert — grounded in data and user research."
    };
    if (path === "/philosophy") return {
      title: "Philosophy — r352 | How we think about design & delivery",
      description: "Process over aesthetics. Systems over one-offs. Learn how r352 approaches design as a delivery discipline, not a creative exercise."
    };
    if (path === "/deliverables") return {
      title: "Deliverables — r352 | What you actually get",
      description: "Brand guidelines, campaign toolkits, QA checklists, production templates — concrete deliverables that your team can use from day one."
    };
    if (path === "/journal") return {
      title: "Journal — r352 | Insights on design operations & delivery",
      description: "Articles on design operations, delivery workflows, brand systems, and how multi-location organizations can scale their creative output."
    };
    if (path.startsWith("/journal/")) {
      const articleId = parseInt(path.replace("/journal/", ""));
      const article = journalArticles.find(a => a.id === articleId);
      if (article) {
        const cleanTitle = article.title.replace(/<br\s*\/?>/g, ' ');
        return {
          title: `${cleanTitle} — r352 Journal`,
          description: `r352 Journal: ${cleanTitle}. Insights on design operations, delivery systems, and scaling creative output for multi-location organizations.`,
          article: { title: article.title, date: article.date, category: article.category }
        };
      }
      return {
        title: "Article — r352 Journal",
        description: "Read this article on design operations, delivery systems, and scaling creative output for multi-location organizations."
      };
    }
    if (path === "/contact") return {
      title: "Contact — r352 | Let's shape the path forward",
      description: "Ready to fix your delivery bottlenecks? Get in touch — we work with teams that are serious about scaling their design operations."
    };
    return {
      title: "r352 — Design-first partner for teams that ship.",
      description: "Design-first strategic partner for multi-location organizations. We diagnose delivery bottlenecks, build scalable design systems, and help teams ship faster."
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
      <Preloader />
      <SEO path={location} title={getPageSEO(location).title} description={getPageSEO(location).description} article={getPageSEO(location).article} />
      <SmoothScroll>
      <div className={`${theme === 'dark' ? 'dark' : ''} bg-background min-h-screen w-full overflow-x-hidden text-foreground font-sans selection:bg-white selection:text-black relative transition-colors duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)]`}>
      <NoiseBackground />
      <PersistentBackground />
      <CursorGlow />
      <CustomCursor />
      <ThemeToggle />
      
      <ScrollToTop />
      <AgencyHeader />
      
      <main className="relative min-h-screen">
        <Suspense fallback={null}>
          <AnimatePresence mode="wait">
            <Switch location={location} key={getPageKey(location)}>
              <Route path="/" component={Home} />
              <Route path="/work" component={Work} />
              <Route path="/work/:id" component={ProjectDetails} />
              <Route path="/philosophy" component={Philosophy} />
              <Route path="/services" component={Services} />
              <Route path="/services/:slug" component={ServiceDetail} />
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
              <Route>404: No such page!</Route>
            </Switch>
          </AnimatePresence>
        </Suspense>
      </main>
      
      <Footer />
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
      <LanguageProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
}