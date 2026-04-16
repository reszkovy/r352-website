import { Link, useLocation } from "wouter";
import { PageTransition } from "@/app/components/ui/PageTransition";
import { Reveal } from "@/app/components/ui/Reveal";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { projects } from "@/app/data/projects";
import { useLanguage } from "@/app/context/LanguageContext";
import { useLenis } from "lenis/react";
import { ImageHover } from "@/app/components/ui/ImageHover";

function LockIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function NdaGate({ project, language, onUnlock }: { project: any; language: string; onUnlock: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === project.ndaPassword) {
      onUnlock();
    } else {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      setTimeout(() => setError(false), 2000);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 -mt-16">
      <Reveal>
        <div className="flex flex-col items-center gap-8 max-w-md text-center">
          <div className="text-neutral-500">
            <LockIcon size={48} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
            {project.client}
          </h2>
          <p className="text-neutral-400 text-lg leading-relaxed">
            {language === 'pl'
              ? 'To case study jest objęte umową NDA. Skontaktuj się z nami, aby uzyskać hasło dostępu.'
              : 'This case study is under NDA. Contact us to get the access password.'}
          </p>
          <form onSubmit={handleSubmit} className="w-full max-w-sm mt-4">
            <div className={`relative ${shaking ? 'animate-shake' : ''}`}>
              <input
                ref={inputRef}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={language === 'pl' ? 'Wpisz hasło...' : 'Enter password...'}
                className={`w-full bg-white/5 border ${error ? 'border-red-500/50' : 'border-white/10'} rounded-none px-6 py-4 text-white text-sm tracking-wider placeholder:text-neutral-600 focus:outline-none focus:border-[#D4FF00]/50 transition-colors duration-300`}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-display uppercase tracking-widest text-neutral-500 hover:text-[#D4FF00] transition-colors px-3 py-2"
              >
                →
              </button>
            </div>
            {error && (
              <p className="text-red-400/70 text-xs mt-3 tracking-wider">
                {language === 'pl' ? 'Nieprawidłowe hasło' : 'Invalid password'}
              </p>
            )}
          </form>
          <Link
            href="/contact"
            className="text-xs font-display uppercase tracking-widest text-[#D4FF00]/70 hover:text-[#D4FF00] transition-colors mt-4"
          >
            {language === 'pl' ? 'Skontaktuj się po dostęp →' : 'Contact for access →'}
          </Link>
        </div>
      </Reveal>
    </div>
  );
}

export function ProjectDetails({ params }: { params?: { id: string } }) {
  const project = projects.find(p => p.id === params?.id);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();
  const lenis = useLenis();
  const [, setLocation] = useLocation();
  const [ndaUnlocked, setNdaUnlocked] = useState(false);

  // @ts-ignore
  const isNDA = project?.isNDA;

  // Determine next project for the footer link
  const currentIndex = projects.findIndex(p => p.id === params?.id);
  const nextProjectIndex = currentIndex !== -1 ? (currentIndex + 1) % projects.length : 0;
  const nextProject = projects[nextProjectIndex];

  // Scroll to top on mount
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [params?.id, lenis]);

  // Reset NDA state when switching projects
  useEffect(() => {
    setNdaUnlocked(false);
  }, [params?.id]);

  if (!project) return null;

  // Show NDA gate if project is protected and not yet unlocked
  if (isNDA && !ndaUnlocked) {
    return (
      <PageTransition className="min-h-screen bg-background text-white selection:bg-[#D4FF00] selection:text-black">
        {/* Navigation */}
        <div className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 flex justify-between items-center mix-blend-difference pointer-events-none">
          <Link href="/work" className="pointer-events-auto inline-flex items-center gap-2 text-xs font-display uppercase tracking-widest text-white/50 hover:text-[#D4FF00] transition-colors duration-300">
            ← {t("work.index")}
          </Link>
        </div>
        <div className="pt-32">
          <NdaGate project={project} language={language} onUnlock={() => setNdaUnlocked(true)} />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="min-h-screen bg-background text-white selection:bg-[#D4FF00] selection:text-black">
      
      {/* Navigation - Fixed or Absolute Top */}
      <div className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 flex justify-between items-center mix-blend-difference pointer-events-none">
         <Link href="/work" className="pointer-events-auto inline-flex items-center gap-2 text-xs font-display uppercase tracking-widest text-white/50 hover:text-[#D4FF00] transition-colors duration-300">
            ← {t("work.index")}
         </Link>
      </div>

      <div className="pt-32 pb-20 px-6 md:px-12 max-w-[1920px] mx-auto">
        
        {/* Header Section */}
        <header className="mb-12 md:mb-24">
          <Reveal>
             <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white break-words">
                {project.client}
             </h1>
          </Reveal>
          <Reveal delay={0.2}>
             <div className="mt-6 flex flex-col md:flex-row md:items-end justify-between gap-6 border-t border-white/10 pt-6">
                <h2 className="text-xl md:text-3xl text-neutral-400 max-w-2xl">
                   {project.title}
                </h2>
                <span className="text-xs font-display uppercase tracking-widest text-[#D4FF00]">
                   {/* @ts-ignore */}
                   {project.year} - {project.category[language]}
                </span>
             </div>
          </Reveal>
        </header>

        {/* Cover Image */}
        <Reveal width="100%" className="mb-32">
          <ImageHover
            className="w-full aspect-[16/9] md:aspect-[21/9] bg-neutral-900 rounded-sm"
            tiltMax={2}
            glowIntensity={0.1}
          >
            <div className="w-full h-full group">
              {/* @ts-ignore */}
              {project.coverComponent ? (
                <div className="w-full h-full group-hover:scale-105 transition-transform duration-[2s] ease-in-out">
                  {/* @ts-ignore */}
                  {project.coverComponent}
                </div>
              ) : (
                <ImageWithFallback
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-[2s] ease-in-out group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
            </div>
          </ImageHover>
        </Reveal>

        {/* Impact Metrics Banner */}
        {project.stats && (
          <Reveal>
            <div className="mb-32 py-16 border-y border-white/10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                {project.stats.map((stat, i) => (
                  <div key={typeof stat.label === 'string' ? stat.label : stat.label['en']} className="text-center md:text-left">
                    <div className="text-4xl md:text-6xl font-bold text-[#D4FF00] tracking-tighter mb-2">{stat.value}</div>
                    <div className="text-xs text-neutral-500 uppercase tracking-widest">
                      {/* @ts-ignore */}
                      {typeof stat.label === 'string' ? stat.label : stat.label[language]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-32">
          
          {/* Sticky Sidebar: Metadata & Services */}
          <aside className="lg:col-span-3">
             <div className="sticky top-32 space-y-10">
                <Reveal delay={0.1}>
                   <div className="space-y-3">
                      <span className="block text-xs font-display uppercase tracking-widest text-neutral-500">{t("work.services")}</span>
                      <ul className="space-y-1.5">
                         {/* @ts-ignore */}
                         {project.services[language].map(s => (
                            <li key={s} className="text-sm md:text-base text-neutral-300 border-b border-white/5 pb-1.5 last:border-0">{s}</li>
                         ))}
                      </ul>
                   </div>
                </Reveal>

                {project.stats && (
                   <Reveal delay={0.2}>
                      <div className="space-y-4">
                         <span className="block text-xs font-display uppercase tracking-widest text-neutral-500">{t("work.impact")}</span>
                         <div className="grid grid-cols-1 gap-4">
                            {project.stats.map(stat => (
                               <div key={typeof stat.label === 'string' ? stat.label : stat.label['en']}>
                                  <div className="text-2xl font-bold text-white tracking-tight">{stat.value}</div>
                                  <div className="text-[10px] text-neutral-500 uppercase tracking-widest mt-0.5">
                                     {/* @ts-ignore */}
                                     {typeof stat.label === 'string' ? stat.label : stat.label[language]}
                                  </div>
                               </div>
                            ))}
                         </div>
                      </div>
                   </Reveal>
                )}
             </div>
          </aside>

          {/* Narrative Column */}
          <div className="lg:col-span-8 lg:col-start-5 space-y-20">
             
             {/* 1. Context */}
             <Reveal>
                <div className="space-y-6">
                    <span className="text-xs font-display uppercase tracking-widest text-neutral-500 block">{t("work.context")}</span>
                    <p className="text-2xl md:text-4xl leading-relaxed text-neutral-200">
                    {/* @ts-ignore */}
                    {project.description[language]}
                    </p>
                </div>
             </Reveal>

             {/* 2. Tension */}
             <Reveal delay={0.1}>
                <div className="bg-white/5 p-8 md:p-12 border-l-2 border-[#D4FF00] backdrop-blur-sm">
                   <h3 className="text-xs font-display uppercase tracking-widest text-[#D4FF00] mb-6">{t("work.tension")}</h3>
                   <p className="text-lg md:text-xl text-neutral-300 leading-relaxed">
                      {/* @ts-ignore */}
                      {project.challenge[language]}
                   </p>
                </div>
             </Reveal>

             {/* 3 & 4. Decisions & Approach */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                {/* @ts-ignore */}
                {project.decisions && (
                    <Reveal delay={0.2}>
                        <div className="space-y-6">
                            <h3 className="text-xs font-display uppercase tracking-widest text-neutral-500">{t("work.decisions")}</h3>
                            <p className="text-lg text-neutral-300 leading-relaxed">
                                {/* @ts-ignore */}
                                {project.decisions[language]}
                            </p>
                        </div>
                    </Reveal>
                )}

                {/* @ts-ignore */}
                {project.approach && (
                    <Reveal delay={0.3}>
                        <div className="space-y-6">
                            <h3 className="text-xs font-display uppercase tracking-widest text-neutral-500">{t("work.approach")}</h3>
                            <p className="text-lg text-neutral-300 leading-relaxed">
                                {/* @ts-ignore */}
                                {project.approach[language]}
                            </p>
                        </div>
                    </Reveal>
                )}
             </div>

             {/* Quote */}
             <Reveal delay={0.2}>
                <blockquote className="relative py-12">
                   <span className="absolute top-0 left-0 text-6xl text-[#D4FF00] font-serif opacity-50">"</span>
                   <p className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-white relative z-10 px-8">
                      {/* @ts-ignore */}
                      {project.quote[language]}
                   </p>
                </blockquote>
             </Reveal>

             {/* 5. Outcome */}
             <Reveal delay={0.3}>
                <div className="bg-neutral-900/50 p-8 md:p-12 border border-white/10">
                   <h3 className="text-xs font-display uppercase tracking-widest text-neutral-500 mb-6">{t("work.outcome")}</h3>
                   <p className="text-lg md:text-xl text-neutral-300 leading-relaxed">
                      {/* @ts-ignore */}
                      {project.outcome[language]}
                   </p>
                </div>
             </Reveal>

             {/* 6. Reflection */}
             {/* @ts-ignore */}
             {project.reflection && (
                <Reveal delay={0.4}>
                    <div className="border-l border-white/20 pl-6 md:pl-12 py-2">
                        <h3 className="text-xs font-display uppercase tracking-widest text-neutral-500 mb-4">{t("work.reflection")}</h3>
                        <p className="text-lg md:text-xl text-neutral-400 italic font-serif leading-relaxed">
                            {/* @ts-ignore */}
                            {project.reflection[language]}
                        </p>
                    </div>
                </Reveal>
             )}

          </div>
        </div>

        {/* Gallery Section - Editorial Grid */}
        <section className="mb-40" ref={containerRef}>
           <div className="flex items-end justify-between mb-24 px-4">
              <Reveal>
                 <h3 className="text-[8vw] md:text-[5vw] font-bold tracking-tighter leading-none text-neutral-800">
                    {t("work.visuals")}
                 </h3>
              </Reveal>
              <Reveal delay={0.2}>
                 <span className="hidden md:block text-xs font-display uppercase tracking-widest text-neutral-500 mb-2">
                    {t("work.gallery")}
                 </span>
              </Reveal>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-y-32">
             {project.images.map((image, i) => {
               // Layout Logic
               const isFullWidth = i % 4 === 0;
               const isLeft = i % 4 === 1;
               const isRight = i % 4 === 2;
               const isCentered = i % 4 === 3;
               
               let gridClass = "md:col-span-12";
               if (isLeft) gridClass = "md:col-span-5 md:col-start-1";
               if (isRight) gridClass = "md:col-span-6 md:col-start-7 md:mt-32"; // Offset right column
               if (isCentered) gridClass = "md:col-span-8 md:col-start-3";

               return (
                 <div key={i} className={`${gridClass} relative group`}>
                   <Reveal width="100%" delay={i * 0.1}>
                     <div className="relative">
                        {/* Decorative elements for specific items */}
                        {isCentered && (
                           <div className="absolute -inset-4 bg-gradient-to-r from-[#D4FF00]/20 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        )}

                        <ImageHover
                           className={`
                              w-full bg-[#0A0A0A] border border-white/5 rounded-sm
                              ${isFullWidth ? 'aspect-[16/9]' : 'aspect-[4/3]'}
                              transition-all duration-700 hover:border-white/20
                           `}
                           tiltMax={isCentered ? 3 : 5}
                           glowIntensity={0.12}
                        >
                           {/* Glassmorphism Background for translucent UI */}
                           <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-50" />

                           {/* Image Container */}
                           <div className="w-full h-full p-6 md:p-12 flex items-center justify-center">
                              <img
                                src={image}
                                alt={`${project.client} visual ${i + 1}`}
                                className="w-full h-full object-contain drop-shadow-2xl"
                              />
                           </div>
                        </ImageHover>

                        {/* Caption */}
                        <div className="mt-4 flex justify-between items-center opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                           <span className="text-[10px] font-display uppercase tracking-widest text-neutral-400">
                              Fig. 0{i + 1}
                           </span>
                           <span className="h-px w-12 bg-neutral-700" />
                        </div>
                     </div>
                   </Reveal>
                 </div>
               );
             })}
           </div>
        </section>

        {/* Contact CTA */}
        <Reveal>
          <div className="mb-24 py-16 px-8 md:px-12 bg-white/[0.03] border border-white/10 text-center relative z-50 pointer-events-auto">
            <span className="block text-xs font-display uppercase tracking-widest text-neutral-500 mb-6">
              {language === 'pl' ? "Potrzebujesz podobnych rezultatów?" : "Need results like these?"}
            </span>
            <Link
              href="/contact"
              className="group relative inline-block cursor-pointer pointer-events-auto"
            >
              <span className="text-3xl md:text-5xl font-bold tracking-tighter text-white transition-colors duration-300 group-hover:text-[#D4FF00]">
                {language === 'pl' ? "Porozmawiajmy" : "Let's talk"}
              </span>
            </Link>
          </div>
        </Reveal>

        {/* Next Project Footer */}
        <div className="border-t border-black/10 dark:border-white/10 pt-24 pb-12 relative z-50 pointer-events-auto">
           <Reveal>
             <div className="flex flex-col items-center justify-center text-center gap-8">
               <span className="text-xs font-display uppercase tracking-widest text-neutral-500">{t("work.ready")}</span>
               <a 
                  onClick={(e) => {
                     e.preventDefault();
                     setLocation(`/work/${nextProject.id}`);
                  }}
                  href={`/work/${nextProject.id}`}
                  className="group relative inline-block cursor-pointer pointer-events-auto"
               >
                  <span className="text-5xl md:text-8xl font-bold tracking-tighter text-black dark:text-white transition-colors duration-300 group-hover:text-transparent group-hover:text-stroke-black dark:group-hover:text-stroke-white group-hover:text-stroke-1">
                     {nextProject.client}
                  </span>
                  <span className="absolute inset-0 text-5xl md:text-8xl font-bold tracking-tighter text-[#D4FF00] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-sm">
                     {nextProject.client}
                  </span>
                  <span className="absolute inset-0 text-5xl md:text-8xl font-bold tracking-tighter text-[#D4FF00] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                     {nextProject.client}
                  </span>
               </a>
             </div>
           </Reveal>
        </div>

      </div>
    </PageTransition>
  );
}
// Force re-render