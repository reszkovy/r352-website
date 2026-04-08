import { PageTransition } from "@/app/components/ui/PageTransition";
import { Reveal } from "@/app/components/ui/Reveal";
import { Link } from "wouter";
import { journalArticles } from "@/app/data/journalArticles";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

export function JournalArticle({ params }: { params?: { id: string } }) {
  const { language } = useLanguage();
  const id = params?.id ? parseInt(params.id) : null;
  const articleIndex = journalArticles.findIndex((a) => a.id === id);
  const article = journalArticles[articleIndex];
  
  const nextArticleIndex = (articleIndex + 1) % journalArticles.length;
  const nextArticle = journalArticles[nextArticleIndex];

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-black dark:text-white">
        <div className="text-center">
          <h1 className="text-4xl font-display mb-4">Article Not Found</h1>
          <Link href="/journal" className="text-[#D4FF00] hover:underline uppercase tracking-widest font-display text-sm">
            Back to Journal
          </Link>
        </div>
      </div>
    );
  }

  return (
    <PageTransition className="min-h-screen bg-background text-black dark:text-white w-full overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative min-h-[85vh] md:min-h-[70vh] w-full overflow-hidden flex-shrink-0" ref={containerRef}>
        <motion.div style={{ y }} className="absolute inset-0">
             <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </motion.div>

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 pb-20 md:pb-32 z-10">
           <div className="max-w-[1200px] mx-auto">
             <Reveal>
                <div className="flex items-center gap-4 mb-6">
                    <Link href="/journal" className="group flex items-center gap-2 text-sm font-display uppercase tracking-widest text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
                        <span className="group-hover:-translate-x-1 transition-transform">←</span>
                        Back
                    </Link>
                    <span className="w-px h-4 bg-neutral-700"></span>
                    <span className="text-sm font-display uppercase tracking-widest text-[#D4FF00]">
                        {article.category}
                    </span>
                     <span className="w-px h-4 bg-neutral-700"></span>
                    <span className="text-sm font-mono text-neutral-400">
                        {article.date}
                    </span>
                </div>
             </Reveal>
             
             <Reveal delay={0.1}>
                <h1 
                    className="text-5xl md:text-7xl font-bold tracking-tighter text-black dark:text-white leading-[1.05] max-w-4xl break-words [word-break:break-word] hyphens-auto text-balance"
                    dangerouslySetInnerHTML={{ __html: article.title }}
                />
             </Reveal>
           </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-8 md:px-12 py-20 bg-background relative z-20">
        <div className="max-w-[800px] mx-auto">
             <Reveal delay={0.2}>
                <div 
                    className="prose prose-invert prose-lg md:prose-xl max-w-none"
                    dangerouslySetInnerHTML={{ __html: article.content }} 
                />
             </Reveal>

             {/* Cross-Link CTA */}
             <Reveal delay={0.25}>
                <div className="mt-[60px] border-t border-black/10 dark:border-white/10 pt-[60px] pb-[40px] flex flex-col items-center justify-center text-center gap-8 relative z-50 pointer-events-auto">
                   <span className="text-xs font-display uppercase tracking-widest text-neutral-500">
                     {language === 'pl' ? "Gotowy rozpocząć projekt?" : "Ready to start a project?"}
                   </span>
                   <Link 
                      href="/contact"
                      className="group relative inline-block cursor-pointer pointer-events-auto"
                   >
                      <span className="text-4xl md:text-6xl font-bold tracking-tighter text-black dark:text-white transition-colors duration-300 group-hover:text-transparent group-hover:text-stroke-black dark:group-hover:text-stroke-white group-hover:text-stroke-1">
                         {language === 'pl' ? "Zacznij z nami" : "Start with us"}
                      </span>
                      <span className="absolute inset-0 text-4xl md:text-6xl font-bold tracking-tighter text-[#D4FF00] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-sm">
                         {language === 'pl' ? "Zacznij z nami" : "Start with us"}
                      </span>
                      <span className="absolute inset-0 text-4xl md:text-6xl font-bold tracking-tighter text-[#D4FF00] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                         {language === 'pl' ? "Zacznij z nami" : "Start with us"}
                      </span>
                   </Link>
                </div>
             </Reveal>

             <Reveal delay={0.3}>
                <div className="mt-24 pt-10 border-t border-white/10">
                    <div className="flex justify-between items-center mb-16">
                        <Link href="/journal" className="text-sm font-display uppercase tracking-widest text-neutral-500 hover:text-black dark:hover:text-white transition-colors">
                            ← Back to Journal
                        </Link>
                    </div>

                    <Link href={`/journal/${nextArticle.id}`} className="group block relative aspect-[21/9] overflow-hidden w-full">
                         <div className="absolute inset-0 bg-neutral-900">
                           <img 
                             src={nextArticle.image} 
                             alt={nextArticle.title} 
                             className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000 ease-out"
                           />
                           <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />
                         </div>
                         
                         <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-center z-10">
                            <span className="text-sm font-display uppercase tracking-widest text-[#D4FF00] mb-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                Read Next
                            </span>
                            <h2 
                                className="text-3xl md:text-5xl font-bold tracking-tighter text-white max-w-4xl leading-tight group-hover:-translate-y-2 transition-transform duration-500 break-words [word-break:break-word] hyphens-auto text-balance"
                                dangerouslySetInnerHTML={{ __html: nextArticle.title }}
                            />
                            <div className="mt-8 flex items-center gap-2 text-sm font-mono text-neutral-400 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                                <span>{nextArticle.category}</span>
                                <span className="w-1 h-1 bg-current rounded-full" />
                                <span>{nextArticle.date}</span>
                            </div>
                         </div>
                    </Link>
                </div>
             </Reveal>
        </div>
      </div>
    </PageTransition>
  );
}
