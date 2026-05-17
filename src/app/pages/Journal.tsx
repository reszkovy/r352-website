import { PageTransition } from "@/app/components/ui/PageTransition";
import { Reveal } from "@/app/components/ui/Reveal";
import { useLanguage } from "@/app/context/LanguageContext";
import { motion } from "motion/react";
import { Link } from "wouter";
import { journalArticles } from "@/app/data/journalArticles";

// Header motion preset — gentle slide + fade + blur on mount (bypasses useInView
// because header sits in top 10% of viewport which is OUTSIDE Reveal's trigger zone).
const headerMotion = {
  initial: { opacity: 0, y: 30, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] as const },
};

export function Journal() {
  const { t, language } = useLanguage();

  return (
    <PageTransition className="pt-20 min-h-screen bg-background">
      
      {/* Header — exceptionally compact for /journal: one-line title + tight padding,
          so article tiles surface ABOVE THE FOLD (different from other pages where header is full-height).
          Motion: direct motion.div with mount-triggered animation because the header sits in top 10%
          of viewport — OUTSIDE Reveal's useInView trigger zone (margin: "-10% 0px -10% 0px").
          Without this, the blur+y entrance was silently failing. */}
      <div className="pt-12 pb-8 md:pt-16 md:pb-10 px-8 md:px-12 border-b border-white/10">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            {...headerMotion}
            className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-3 md:gap-8"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white leading-[0.95] whitespace-nowrap">
              Insights from the studio.
            </h1>
            <span className="text-xs font-display uppercase tracking-[0.2em] text-[#D4FF00] md:shrink-0">
              {t('nav.journal')}
            </span>
          </motion.div>
        </div>
      </div>

      <div className="px-8 md:px-12 py-12 md:py-16 max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {journalArticles.filter(a => a.published !== false).map((article, i) => (
            <Reveal key={article.id} delay={i * 0.1}>
              <Link href={`/journal/${article.id}`} className="group block cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900 mb-8 rounded-sm">
                  <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
                  <motion.img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover relative z-10 transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  
                   {/* Hover Overlay with "Read" indicator */}
                   <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/20">
                      <div className="w-20 h-20 rounded-full bg-[#D4FF00] flex items-center justify-center backdrop-blur-md transform scale-50 group-hover:scale-100 transition-transform duration-500 ease-out">
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black rotate-45">
                            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                         </svg>
                      </div>
                   </div>
                </div>

                <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
                  <span className="text-xs font-display uppercase tracking-widest text-neutral-500 group-hover:text-[#D4FF00] transition-colors">
                    {article.category}
                  </span>
                  <span className="text-xs font-mono text-neutral-600">
                    {article.date}
                  </span>
                </div>

                <h3
                  className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight group-hover:text-[#D4FF00] transition-colors duration-300 break-words [word-break:break-word] hyphens-auto text-balance"
                  dangerouslySetInnerHTML={{ __html: (language === 'pl' && article.title_pl) ? article.title_pl : article.title }}
                />
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Cross-Link CTA */}
        <div className="border-t border-black/10 dark:border-white/10 pt-24 mt-24 pb-12 relative z-50 pointer-events-auto">
           <Reveal>
             <div className="flex flex-col items-center justify-center text-center gap-8">
               <span className="text-xs font-display uppercase tracking-widest text-neutral-500">
                  {language === 'pl' ? "Gotowy przejść od czytania do działania?" : "Ready to move from reading to action?"}
               </span>
               <Link 
                  href="/services"
                  className="group relative inline-block cursor-pointer pointer-events-auto"
               >
                  <span className="text-5xl md:text-8xl font-bold tracking-tighter text-black dark:text-white transition-colors duration-300 group-hover:text-transparent group-hover:text-stroke-black dark:group-hover:text-stroke-white group-hover:text-stroke-1">
                     {language === 'pl' ? "Nasze Usługi" : "Our Services"}
                  </span>
                  <span className="absolute inset-0 text-5xl md:text-8xl font-bold tracking-tighter text-[#D4FF00] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-sm">
                     {language === 'pl' ? "Nasze Usługi" : "Our Services"}
                  </span>
                  <span className="absolute inset-0 text-5xl md:text-8xl font-bold tracking-tighter text-[#D4FF00] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                     {language === 'pl' ? "Nasze Usługi" : "Our Services"}
                  </span>
               </Link>
             </div>
           </Reveal>
        </div>
      </div>
    </PageTransition>
  );
}
