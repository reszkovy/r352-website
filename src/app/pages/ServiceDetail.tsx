import { Link } from "wouter";
import { Reveal } from "@/app/components/ui/Reveal";
import { useLanguage } from "@/app/context/LanguageContext";
import { PageTransition } from "@/app/components/ui/PageTransition";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function ServiceDetail({ params }: { params?: { slug: string } }) {
  const { t, language } = useLanguage();
  const currentSlug = params?.slug || "operating-system";

  // Data structure matching the new positioning
  const servicesData = {
    "operating-system": {
      id: "01",
      key: "operating_system",
      title: "Operating System",
      description: "We structure intake, roles, and feedback so work moves fast with minimal friction — and standards stay high.",
      subServices: [
        {
          title: "Briefing & Intake Structure",
          description: "Standardized templates and workflows to ensure every project starts with clear requirements and zero ambiguity."
        },
        {
          title: "Stakeholder Alignment",
          description: "Facilitated sessions and decision frameworks to align goals, remove bottlenecks, and speed up approvals."
        },
        {
          title: "Templates, Playbooks, SOPs",
          description: "Reusable components, guidelines, and standard operating procedures to accelerate production without sacrificing quality."
        },
        {
          title: "QA Standards & Checks",
          description: "Rigorous, multi-step quality assurance processes to ensure zero-defect delivery and visual consistency."
        },
        {
          title: "Delivery Cadence",
          description: "Predictable weekly sprints and shipping rhythms that keep momentum high and progress visible."
        },
        {
          title: "Asset Governance",
          description: "Centralized libraries and clear ownership structures ensuring everyone uses the right files, every time."
        }
      ]
    },
    "design-production": {
      id: "02",
      key: "design_production",
      title: "Design & Production",
      description: "Senior-level craft across UX/UI and communication assets — designed to perform, built to stay consistent.",
      subServices: [
        {
          title: "Product UX/UI",
          description: "User-centric interfaces (flows, screens, usability) designed for clarity, conversion, and scalability."
        },
        {
          title: "UI Systems & Libraries",
          description: "Scalable component libraries and design systems that ensure consistent product experiences across all touchpoints."
        },
        {
          title: "Conversion-first Landing Pages",
          description: "High-performance marketing pages designed to turn visitors into customers through psychological triggers and clear paths."
        },
        {
          title: "Campaign Toolkits",
          description: "Comprehensive multi-channel asset sets (digital + retail-ready) prepared for global rollout and localization."
        },
        {
          title: "Social Content Systems",
          description: "Templates and workflows for high-volume content creation that maintains brand equity while moving at the speed of social."
        },
        {
          title: "Sales & Presentation Materials",
          description: "High-polish decks and assets that help you close deals and communicate value to stakeholders."
        }
      ]
    },
    "build-optimize": {
      id: "03",
      key: "build_optimize",
      title: "Build & Optimize",
      description: "When needed, we ship the work — or manage shipping — with clean implementation and measurable performance.",
      subServices: [
        {
          title: "Implementation",
          description: "Pixel-perfect frontend development for web and product user interfaces, ensuring design intent is preserved."
        },
        {
          title: "Performance Optimization",
          description: "Technical tuning for speed, Core Web Vitals, SEO foundations, and accessibility compliance."
        },
        {
          title: "CMS & Content Workflows",
          description: "Structured content management system setups that give you control and flexibility over your publishing."
        },
        {
          title: "Analytics-ready Setups",
          description: "Basic tracking and data layer implementation to measure success and inform future iterations."
        },
        {
          title: "Handoff to Dev Teams",
          description: "Detailed specifications, assets, and support for your internal engineering teams to ensure smooth implementation."
        }
      ]
    }
  };

  const activeService = servicesData[currentSlug as keyof typeof servicesData] || servicesData["operating-system"];

  const navItems = [
    { slug: "operating-system", label: servicesData["operating-system"].title, id: "01" },
    { slug: "design-production", label: servicesData["design-production"].title, id: "02" },
    { slug: "build-optimize", label: servicesData["build-optimize"].title, id: "03" },
  ];

  return (
    <PageTransition className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-[1800px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        
        {/* Sidebar Menu */}
        <div className="lg:col-span-3 lg:sticky lg:top-32 h-fit">
          <Reveal>
             <h2 className="text-xs font-display uppercase tracking-widest text-[#D4FF00] mb-12 hidden lg:block">
               {language === 'pl' ? "Usługi" : "Services"}
             </h2>
          </Reveal>
          
          <nav className="flex flex-col space-y-2">
            {navItems.map((item, index) => {
               const isActive = item.slug === currentSlug;
               return (
                 <Reveal key={item.slug} delay={index * 0.1}>
                   <Link href={`/services/${item.slug}`}>
                     <div className={`group cursor-pointer flex items-center justify-between py-4 border-b border-white/10 hover:border-[#D4FF00] transition-colors duration-300 ${isActive ? 'border-[#D4FF00]' : ''}`}>
                       <span className={`text-xl font-medium transition-colors duration-300 ${isActive ? 'text-white' : 'text-neutral-500 group-hover:text-white'}`}>
                         {item.label}
                       </span>
                       <span className={`text-xs font-mono transition-colors duration-300 ${isActive ? 'text-[#D4FF00]' : 'text-neutral-600 group-hover:text-[#D4FF00]'}`}>
                         {item.id}
                       </span>
                     </div>
                   </Link>
                 </Reveal>
               );
            })}
          </nav>

          <Reveal delay={0.4}>
            <div className="mt-16 p-6 border border-white/10 bg-white/[0.02] backdrop-blur-sm hidden lg:block">
              <span className="text-[10px] font-display font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2 block">
                {language === 'pl' ? "Podejście" : "Approach"}
              </span>
              <p className="text-sm text-neutral-400 leading-relaxed font-mono">
                {t("services_list.note_body")}
              </p>
            </div>
          </Reveal>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="mb-24">
                 <Reveal key={`header-${currentSlug}`}>
                   <span className="text-xs font-display uppercase tracking-widest text-[#D4FF00] mb-6 block lg:hidden">
                     {activeService.id} — {activeService.title}
                   </span>
                   <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[0.9] mb-8">
                     {activeService.title}
                   </h1>
                 </Reveal>
                 <Reveal key={`desc-${currentSlug}`} delay={0.1}>
                   <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed max-w-2xl text-balance font-display uppercase tracking-wide">
                     {activeService.description}
                   </p>
                 </Reveal>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-1 gap-12">
                 <div className="space-y-px bg-white/10 border border-white/10">
                   {activeService.subServices.map((sub, index) => (
                     <Reveal key={`${currentSlug}-sub-${index}`} delay={0.2 + (index * 0.1)} width="100%">
                       <div className="bg-[#0A0A0A] p-8 md:p-12 hover:bg-[#151515] transition-colors duration-500 group">
                          <div className="md:flex justify-between items-start gap-8">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-0 shrink-0 md:w-1/3 group-hover:text-[#D4FF00] transition-colors">
                              {sub.title}
                            </h3>
                            <div className="md:w-2/3">
                              <p className="text-lg text-neutral-400 leading-relaxed max-w-xl group-hover:text-neutral-300 transition-colors">
                                {sub.description}
                              </p>
                            </div>
                          </div>
                       </div>
                     </Reveal>
                   ))}
                 </div>
              </div>

              <Reveal key={`cta-${currentSlug}`} delay={0.6}>
                 <div className="mt-24 pt-24 pb-12 border-t border-black/10 dark:border-white/10 flex flex-col items-center justify-center text-center gap-8 relative z-50 pointer-events-auto">
                   <span className="text-xs font-display uppercase tracking-widest text-neutral-500">
                     {language === 'pl' ? "Gotowy rozpocząć projekt?" : "Ready to start a project?"}
                   </span>
                   <Link 
                      href="/contact"
                      className="group relative inline-block cursor-pointer pointer-events-auto"
                   >
                      <span className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-black dark:text-white transition-colors duration-300 group-hover:text-transparent group-hover:text-stroke-black dark:group-hover:text-stroke-white group-hover:text-stroke-1">
                         {language === 'pl' ? "Rozpocznij rozmowę" : "Start conversation"}
                      </span>
                      <span className="absolute inset-0 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-[#D4FF00] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-sm">
                         {language === 'pl' ? "Rozpocznij rozmowę" : "Start conversation"}
                      </span>
                      <span className="absolute inset-0 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-[#D4FF00] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                         {language === 'pl' ? "Rozpocznij rozmowę" : "Start conversation"}
                      </span>
                   </Link>
                 </div>
              </Reveal>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
