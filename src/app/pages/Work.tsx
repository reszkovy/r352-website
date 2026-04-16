import { PageTransition } from "@/app/components/ui/PageTransition";
import { Reveal } from "@/app/components/ui/Reveal";
import { Link } from "wouter";
import { projects } from "@/app/data/projects";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { useLanguage } from "@/app/context/LanguageContext";

function LockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export function Work() {
  const { t, language } = useLanguage();
  
  return (
    <PageTransition className="pt-20 min-h-screen">
      
      {/* Header */}
      <div className="py-32 px-8 md:px-12 border-b border-white/10">
        <div className="max-w-[1800px] mx-auto">
          <Reveal>
            <div className="max-w-4xl">
              <span className="block text-xs font-display uppercase tracking-[0.2em] text-[#D4FF00] mb-8">
                {t("nav.work")}
              </span>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-black dark:text-white mb-12 leading-[0.9]">
                {t("work.title")}
              </h1>
              <div className="text-xl md:text-2xl text-neutral-400 leading-relaxed max-w-2xl">
                <p>
                  {t("work.subtitle")}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="px-8 md:px-12 py-24 md:py-32 max-w-[1800px] mx-auto">
        {/* Regular projects — full-width stacked */}
        <div className="space-y-32">
          {projects.filter((p: any) => !p.isNDA).map((project) => (
            <Reveal key={project.id} className="group cursor-pointer">
              <Link href={`/work/${project.id}`} className="block">
                  <div className="w-full aspect-[16/9] bg-neutral-100 dark:bg-neutral-900 overflow-hidden mb-8 relative">
                    <div className="absolute inset-0 bg-black/0 dark:bg-white/0 group-hover:bg-black/5 dark:group-hover:bg-white/5 transition-colors z-10 duration-500" />
                    <ImageWithFallback
                      src={project.coverImage}
                      alt={project.client}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-[1.5s] ease-out"
                    />
                  </div>

                  <div className="flex justify-between items-start border-t border-black/10 dark:border-white/10 pt-6">
                    <div>
                      <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-black dark:text-white mb-2 group-hover:text-black/80 dark:group-hover:text-white/80 transition-colors">
                        {project.client}
                      </h2>
                      <span className="text-xs font-display uppercase tracking-widest text-[#D4FF00]">
                        {/* @ts-ignore - Localized data */}
                        {project.category[language]}
                      </span>
                    </div>
                    <span className="text-xs font-display uppercase tracking-widest text-neutral-600">
                      {project.year}
                    </span>
                  </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* NDA projects — 2 columns, smaller */}
        {projects.some((p: any) => p.isNDA) && (
          <div className="mt-32">
            <Reveal>
              <div className="border-t border-white/10 pt-12 mb-12">
                <span className="text-xs font-display uppercase tracking-[0.2em] text-neutral-500">
                  {language === 'pl' ? 'Case studies pod NDA' : 'Protected case studies'}
                </span>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {projects.filter((p: any) => p.isNDA).map((project, index) => (
                <Reveal key={project.id} delay={index * 0.1} className="group cursor-pointer">
                  <Link href={`/work/${project.id}`} className="block">
                    <div className="w-full aspect-[16/9] bg-neutral-900 overflow-hidden mb-6 relative">
                      {/* @ts-ignore */}
                      {project.coverComponent ? (
                        <div className="w-full h-full blur-[2px] grayscale group-hover:blur-[1px] group-hover:grayscale-[0.5] scale-100 group-hover:scale-105 transition-all duration-[1.5s] ease-out">
                          {/* @ts-ignore */}
                          {project.coverComponent}
                        </div>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900" />
                      )}
                      {/* NDA overlay */}
                      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-black/30">
                        <div className="text-white/40 group-hover:text-white/60 transition-colors duration-500">
                          <LockIcon />
                        </div>
                        <span className="text-[10px] font-display uppercase tracking-[0.3em] text-white/40 group-hover:text-white/60 transition-colors duration-500">
                          {language === 'pl' ? 'Pod NDA' : 'Under NDA'}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-start border-t border-white/10 pt-4">
                      <div>
                        <h2 className="text-2xl md:text-3xl font-semibold tracking-tighter text-white mb-1 group-hover:text-white/80 transition-colors">
                          {project.client}
                        </h2>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-display uppercase tracking-widest text-[#D4FF00]">
                            {/* @ts-ignore */}
                            {project.category[language]}
                          </span>
                          <span className="text-[9px] font-display uppercase tracking-widest text-neutral-500 border border-neutral-700 px-2 py-0.5 rounded-full">
                            NDA
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-display uppercase tracking-widest text-neutral-600">
                        {project.year}
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* Cross-Link CTA */}
        <Reveal>
           <div className="mt-[80px] border-t border-black/10 dark:border-white/10 pt-[80px] pb-[40px] flex flex-col items-center justify-center text-center gap-8 relative z-50 pointer-events-auto">
             <span className="text-xs font-display uppercase tracking-widest text-neutral-500">
               {language === 'pl' ? "Podoba Ci się to co widzisz?" : "Like what you see?"}
             </span>
             <Link 
                href="/contact"
                className="group relative inline-block cursor-pointer pointer-events-auto"
             >
                <span className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-black dark:text-white transition-colors duration-300 group-hover:text-transparent group-hover:text-stroke-black dark:group-hover:text-stroke-white group-hover:text-stroke-1">
                   {language === 'pl' ? "Zacznijmy projekt" : "Start a project"}
                </span>
                <span className="absolute inset-0 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-[#D4FF00] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-sm">
                   {language === 'pl' ? "Zacznijmy projekt" : "Start a project"}
                </span>
                <span className="absolute inset-0 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-[#D4FF00] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                   {language === 'pl' ? "Zacznijmy projekt" : "Start a project"}
                </span>
             </Link>
           </div>
        </Reveal>
      </div>

    </PageTransition>
  );
}
