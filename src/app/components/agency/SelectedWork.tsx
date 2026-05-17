import { Link, useLocation } from "wouter";
import { Reveal } from "@/app/components/ui/Reveal";
import { PlaceholderArt } from "@/app/components/agency/PlaceholderArt";
import { projects } from "@/app/data/projects";
import { HoverVideoImage } from "@/app/components/ui/HoverVideoImage";
import { useLanguage } from "@/app/context/LanguageContext";
import { MagneticButton } from "@/app/components/ui/MagneticButton";

export function SelectedWork() {
  const { t, language } = useLanguage();
  const [, setLocation] = useLocation();
  // Explicit IDs — full control over which 3 cases appear on Home (rest visible on /work only)
  const HOMEPAGE_PROJECT_IDS = ["benefit-systems", "sonova", "dawid-podsiadlo"];
  const selectedProjects = HOMEPAGE_PROJECT_IDS
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  return (
    <section className="py-32 bg-transparent relative z-10">
      <div className="max-w-[1800px] mx-auto px-8 md:px-12">
        {/* Header — 12-col 9+3 (title left dominant, view-all right) */}
        <div className="grid grid-cols-12 gap-6 md:gap-8 items-end mb-16">
           <Reveal className="col-span-12 md:col-span-9">
             <div>
               <span className="type-sub-base mb-4 block">
                 {t("work.proof")}
               </span>
               <h2 className="type-h2">{t("work.selected_work")}</h2>
             </div>
           </Reveal>
           <Reveal delay={0.2} className="col-span-12 md:col-span-3 md:justify-self-end">
             <div className="md:text-right">
               <MagneticButton
                 onClick={() => setLocation("/work")}
                 className="bg-transparent border-[#D4FF00]/20 text-[#D4FF00] hover:bg-[#D4FF00] hover:text-black"
                 glowColor="rgba(212, 255, 0, 0.2)"
               >
                 <span className="invisible text-lg font-display uppercase tracking-[0.25em] absolute">{t("work.view_all")}</span>
                 <span className="text-lg font-display uppercase tracking-wide group-hover:tracking-[0.25em] transition-all duration-500 ease-out">{t("work.view_all")}</span>
               </MagneticButton>
             </div>
           </Reveal>
        </div>

        {/* Project cards — 12-col 6+6, third project full-width col-12 */}
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {selectedProjects.map((project, index) => (
            <Reveal key={project.id} delay={0.3 + (index * 0.1)} className={index === 2 ? "col-span-12" : "col-span-12 md:col-span-6"}>
              <Link href={`/work/${project.id}`} className="block group cursor-pointer relative">
                   <div className="aspect-[16/9] w-full bg-[#111] relative overflow-hidden transition-all duration-[1.5s]">
                     <HoverVideoImage
                        src={project.coverImage}
                        videoSrc={(project as any).hoverVideo}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-1000"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-1000 z-10 pointer-events-none" />
                     
                     <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 z-20 pointer-events-none overflow-hidden">
                        <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                          <h3 className="type-h3 mb-1 text-white group-hover:text-[#D4FF00] transition-colors duration-500">{project.client}</h3>
                          
                          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                            <div className="overflow-hidden">
                              <div className="pt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 ease-out flex flex-col items-start gap-4">
                                <span className="block text-sm text-neutral-300 max-w-lg leading-relaxed line-clamp-2">
                                  {/* @ts-ignore - Localized data */}
                                  {project.description[language]}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                     </div>
                   </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}