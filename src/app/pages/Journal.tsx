import { PageTransition } from "@/app/components/ui/PageTransition";
import { Reveal } from "@/app/components/ui/Reveal";
import { useLanguage } from "@/app/context/LanguageContext";
import { motion } from "motion/react";
import { Link } from "wouter";
import { useArticles, resolveImage } from "@/app/hooks/useSanity";

export function Journal() {
  const { t, language } = useLanguage();
  const { data: articles, loading } = useArticles();

  return (
    <PageTransition className="pt-20 min-h-screen bg-background">
      
      {/* Header */}
      <div className="py-32 px-8 md:px-12 border-b border-white/10">
        <div className="max-w-[1800px] mx-auto">
          <Reveal>
            <div className="max-w-4xl">
              <span className="block text-xs font-display uppercase tracking-[0.2em] text-[#D4FF00] mb-8">
                {t('nav.journal')}
              </span>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-12 leading-[0.9]">
                Insights from<br className="hidden md:block" /> the studio.
              </h1>
              {/* Optional Intro Text - Empty for now as original had none, but kept structure */}
            </div>
          </Reveal>
        </div>
      </div>

      <div className="px-8 md:px-12 py-24 md:py-32 max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {articles.map((article, i) => {
            const imageUrl = resolveImage(article.image, article._staticImage, { width: 800, quality: 80 });
            return (
            <Reveal key={article._id} delay={i * 0.1}>
              <Link href={`/journal/${article.slug}`} className="group block cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900 mb-8 rounded-sm">
                  <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
                  <motion.img
                    src={imageUrl}
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
                  dangerouslySetInnerHTML={{ __html: article.title }}
                />
              </Link>
            </Reveal>
          );
          })}
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
