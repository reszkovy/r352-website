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
import { YouTubeEmbed } from "@/app/components/ui/YouTubeEmbed";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/app/components/ui/MagneticButton";

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
    <div className="min-h-[calc(100vh-8rem)] w-full flex items-center justify-center px-6 md:px-12 py-20">
      <div className="w-full max-w-lg mx-auto">
        <Reveal>
          <div className="flex flex-col items-center gap-8 md:gap-10 w-full text-center">
            {/* Lime label — same pattern as Philosophy / Process / Brief section headers */}
            <span className="block text-xs font-display uppercase tracking-[0.25em] text-[#D4FF00]">
              {language === 'pl' ? 'Pod NDA' : 'Under NDA'}
            </span>

            {/* Client name as hero — editorial scale matching site h1 pattern */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-neutral-900 dark:text-white leading-[0.95]">
              {project.client}
            </h1>

            {/* Lock icon — smaller, subtle, between title and copy */}
            <div className="text-neutral-400 dark:text-neutral-600 opacity-60">
              <LockIcon size={28} />
            </div>

            {/* Description — editorial body weight, lighter color */}
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal max-w-md mx-auto">
              {language === 'pl'
                ? 'To case study jest objęte umową NDA. Skontaktuj się z nami, aby uzyskać hasło dostępu.'
                : 'This case study is under NDA. Contact us to get the access password.'}
            </p>

            {/* Password input + submit — shade-based elevation, no cheap border */}
            <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
              <div className={`relative ${shaking ? 'animate-shake' : ''}`}>
                <input
                  ref={inputRef}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={language === 'pl' ? 'Wpisz hasło' : 'Enter password'}
                  className={`w-full bg-neutral-100 dark:bg-white/[0.04] rounded-none px-5 py-4 pr-14 text-neutral-900 dark:text-white text-sm tracking-wide placeholder:text-neutral-500 dark:placeholder:text-neutral-600 focus:outline-none transition-all duration-300 text-center ${
                    error
                      ? 'ring-1 ring-red-500/40'
                      : 'focus:bg-neutral-200 dark:focus:bg-white/[0.07]'
                  }`}
                />
                <button
                  type="submit"
                  aria-label={language === 'pl' ? 'Zatwierdź hasło' : 'Submit password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-neutral-500 hover:text-[#D4FF00] transition-colors duration-300 group"
                >
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                </button>
              </div>
              {error && (
                <p className="text-red-500/80 dark:text-red-400/70 text-xs mt-3 tracking-wider text-center">
                  {language === 'pl' ? 'Nieprawidłowe hasło' : 'Invalid password'}
                </p>
              )}
            </form>

            {/* CTA stack — two arrow-links, stacked, centered */}
            <div className="flex flex-col items-center gap-4 mt-2">
              {/* Primary — Contact for access */}
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-xs font-display uppercase tracking-[0.2em] text-[#D4FF00] hover:text-neutral-900 dark:hover:text-white transition-colors duration-300"
              >
                <span>{language === 'pl' ? 'Skontaktuj się po dostęp' : 'Contact for access'}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
              </Link>

              {/* Secondary — Continue exploring (back to /work) */}
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 text-xs font-display uppercase tracking-[0.2em] text-neutral-500 hover:text-[#D4FF00] transition-colors duration-300"
              >
                <ArrowRight className="w-3.5 h-3.5 rotate-180 transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={1.5} />
                <span>{language === 'pl' ? 'Wróć do projektów' : 'Continue exploring'}</span>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
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
        <NdaGate project={project} language={language} onUnlock={() => setNdaUnlocked(true)} />
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

        {/* Inline animation — auto-playing kinetic teaser right after the hero.
            Optional field per project. Full-width 16:9, muted+loop+playsinline. No controls — feels editorial. */}
        {(project as any).inlineAnimation && (
          <Reveal width="100%" className="mb-32 -mt-16 md:-mt-24">
            <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-neutral-900 rounded-sm overflow-hidden">
              <video
                src={(project as any).inlineAnimation}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
                aria-hidden="true"
              />
            </div>
          </Reveal>
        )}

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

             {/* 5. Outcome — editorial pattern (no box, no border, hair-line divider above).
                  Bigger type than other sections, signals "this is the resolution of the story".
                  Replaces the previous bg-neutral-900/50 framed container that read as generic. */}
             <Reveal delay={0.3}>
                <div className="pt-12 md:pt-16 border-t border-white/10">
                   <h3 className="text-xs font-display uppercase tracking-[0.25em] text-neutral-500 mb-6">{t("work.outcome")}</h3>
                   <p className="text-2xl md:text-3xl text-white font-normal tracking-tight leading-tight text-balance">
                      {/* @ts-ignore */}
                      {project.outcome[language]}
                   </p>
                </div>
             </Reveal>

             {/* 6. Reflection — quiet strategic afterthought (italic serif, subtle left border).
                  Different visual register from Outcome above and Testimonial below — gives the
                  page a rhythm of LOUD outcome → SOFT reflection → CLIENT VOICE closing. */}
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

             {/* 7. Testimonial — moved to BOTTOM as the closing emotional moment of the case.
                  Client voice validates everything above. Full-width editorial treatment with
                  oversized lime cudzysłów + author + role. Last thing visitor reads before CTA. */}
             {/* @ts-ignore */}
             {project.testimonial && (
                <Reveal delay={0.5}>
                    <figure className="relative pt-12 md:pt-16 border-t border-white/10">
                       <span className="absolute top-8 md:top-10 left-0 text-7xl md:text-8xl text-[#D4FF00] font-serif opacity-40 leading-none">"</span>
                       <blockquote className="pl-12 md:pl-20">
                          <p className="text-xl md:text-2xl text-white font-medium tracking-tight leading-snug text-balance">
                             {/* @ts-ignore */}
                             {project.testimonial.quote[language]}
                          </p>
                          <figcaption className="mt-8 flex flex-col gap-1">
                             <span className="text-base md:text-lg font-semibold text-white">
                                {/* @ts-ignore */}
                                {project.testimonial.author}
                             </span>
                             <span className="text-xs md:text-sm font-display uppercase tracking-[0.2em] text-[#D4FF00]">
                                {/* @ts-ignore */}
                                {project.testimonial.role[language]}
                             </span>
                          </figcaption>
                       </blockquote>
                    </figure>
                </Reveal>
             )}

          </div>
        </div>

        {/* Video Section — premium click-to-play YouTube embed (if project has videoUrl) */}
        {(project as any).videoUrl && (
          <section className="mb-40">
            <Reveal>
              <YouTubeEmbed
                url={(project as any).videoUrl}
                title={`${project.client} — case study video`}
              />
            </Reveal>
          </section>
        )}

        {/* Gallery Section - Editorial Grid (only renders if project has images) */}
        {project.images.length > 0 && (
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

           <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-y-24">
             {project.images.map((image, i) => {
               // Per-project layout override — uniform large (full-width 16:9 slabs) for these projects
               const useUniformLarge = ["kubota", "archicom", "discobowl"].includes(project.id);

               // Caterelo — bespoke rhythm: maps stay monumental, single-metric screens go half-width staggered.
               // Layout: 2 full-width maps, then 2 staggered pairs of half-width detail shots.
               const useCathereloRhythm = project.id === "caterelo";

               // regional.fit (formerly Opening Engine) — bespoke rhythm: master dashboards full-width,
               // detail/form/map as varied pairs. Mix of wide horizontal (2.4–2.66 ratio), 4:3 map, portrait form,
               // near-square detail → needs custom layout. Keep until dedicated regional.fit assets replace placeholders.
               const useOpeningEngineRhythm = project.id === "regional-fit";

               // Default editorial rhythm (full / left / right / centered) for other projects
               const isFullWidth = i % 4 === 0;
               const isLeft = i % 4 === 1;
               const isRight = i % 4 === 2;
               const isCentered = i % 4 === 3;

               // Caterelo per-image mapping: indices 0–1 = maps (full 16:9), 2–5 = detail (half-width pairs)
               // 2 left, 3 right + offset, 4 left, 5 right + offset
               const isCathereloFull = useCathereloRhythm && (i === 0 || i === 1);
               const isCathereloLeft = useCathereloRhythm && (i === 2 || i === 4);
               const isCathereloRight = useCathereloRhythm && (i === 3 || i === 5);

               // regional.fit per-image mapping (5 frames, marketing hero is cover not gallery):
               // 0 process flow  (4288×1050, 4.08 ULTRA-wide) → full-width 40:10 panoramic strip
               // 1 Poland map    (1998×1490, 1.34 ≈ 4:3)      → half-width LEFT (col-span-6, 4:3)
               // 2 mobile demo   (~portrait)                  → half-width RIGHT (col-span-4, 3:4 portrait, offset)
               // 3 brief detail  (2004×1976, ~1.01 square)    → centered narrower (col-span-8, 1:1)
               // 4 users + roles (2002×996, 2.01 wide)        → full-width 2:1 panoramic
               const isOpeningEnginePanoramic = useOpeningEngineRhythm && i === 0; // ultra-wide 4:1 hero
               const isOpeningEngineMapLeft = useOpeningEngineRhythm && i === 1;
               const isOpeningEngineMobileRight = useOpeningEngineRhythm && i === 2;
               const isOpeningEngineSquareCenter = useOpeningEngineRhythm && i === 3;
               const isOpeningEngineWide2to1 = useOpeningEngineRhythm && i === 4;
               const isOpeningEngineHeroFull = false; // no 16:9 hero in gallery — marketing splash lives on cover

               // Legacy aliases — kept for downstream conditions below
               const isOpeningEngineFull = isOpeningEnginePanoramic || isOpeningEngineWide2to1;
               const isOpeningEngineLeft = isOpeningEngineMapLeft;
               const isOpeningEngineRight = isOpeningEngineMobileRight;
               const isOpeningEngineCentered = isOpeningEngineSquareCenter;

               let gridClass = "md:col-span-12";
               if (useUniformLarge) {
                 gridClass = "md:col-span-12";
               } else if (isCathereloFull) {
                 gridClass = "md:col-span-12";
               } else if (isCathereloLeft) {
                 gridClass = "md:col-span-6 md:col-start-1";
               } else if (isCathereloRight) {
                 gridClass = "md:col-span-6 md:col-start-7 md:mt-24";
               } else if (isOpeningEngineFull) {
                 // All full-width frames: hero (0), panoramic process flow (1), 2:1 users table (5)
                 gridClass = "md:col-span-12";
               } else if (isOpeningEngineLeft) {
                 // Poland map (4:3) — half-width LEFT, paired with mobile portrait on right
                 gridClass = "md:col-span-6 md:col-start-1";
               } else if (isOpeningEngineRight) {
                 // Mobile demo (3:4 portrait) — narrow column on RIGHT, offset down for editorial rhythm
                 gridClass = "md:col-span-4 md:col-start-8 md:mt-16";
               } else if (isOpeningEngineCentered) {
                 // Square brief detail — centered editorial moment, narrower so content stays readable
                 gridClass = "md:col-span-8 md:col-start-3";
               } else if (isLeft) {
                 gridClass = "md:col-span-5 md:col-start-1";
               } else if (isRight) {
                 gridClass = "md:col-span-6 md:col-start-7 md:mt-32";
               } else if (isCentered) {
                 gridClass = "md:col-span-8 md:col-start-3";
               }

               // Aspect ratios for regional.fit gallery:
               // - 0 marketing hero    → 16:9 (matches ~1.98 source)
               // - 1 process flow      → 40:10 panoramic strip (matches ~4.08 ultra-wide source)
               // - 2 Poland map        → 4:3 (matches ~1.34 source)
               // - 3 mobile demo       → 3:4 portrait
               // - 4 brief detail      → 1:1 square (source is ~1.01)
               // - 5 users + roles     → 2:1 panoramic
               const isOpeningEngineHero = isOpeningEngineHeroFull;
               const useLargeAspect = useUniformLarge || isFullWidth || isCathereloFull || isOpeningEngineHero;

               return (
                 <div key={i} className={`${gridClass} relative group`}>
                   <Reveal width="100%" delay={i * 0.1}>
                     <div className="relative">
                        {/* Decorative elements for specific items (skip for uniform-large mode) */}
                        {isCentered && !useUniformLarge && (
                           <div className="absolute -inset-4 bg-gradient-to-r from-[#D4FF00]/20 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        )}

                        {/* Aspect ratio routing — regional.fit gets per-frame ratios matching source content;
                            others fall through to the default useLargeAspect / portrait / 4:3 ladder. */}
                        <ImageHover
                           className={`
                              w-full bg-[#0A0A0A] border border-white/5 rounded-sm
                              ${
                                isOpeningEnginePanoramic ? 'aspect-[40/10]' :
                                isOpeningEngineHeroFull ? 'aspect-[16/9]' :
                                isOpeningEngineMapLeft ? 'aspect-[4/3]' :
                                isOpeningEngineMobileRight ? 'aspect-[3/4]' :
                                isOpeningEngineSquareCenter ? 'aspect-square' :
                                isOpeningEngineWide2to1 ? 'aspect-[2/1]' :
                                useLargeAspect ? 'aspect-[16/9]' : 'aspect-[4/3]'
                              }
                              transition-all duration-700 hover:border-white/20
                           `}
                           tiltMax={useUniformLarge ? 3 : (isCentered ? 3 : 5)}
                           glowIntensity={useUniformLarge ? 0.08 : 0.12}
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
        )}

        {/* Contact CTA — editorial pattern matching AgencyHero ATF.
            No box, no border, no background fill. Just a hair-line divider above,
            asymmetric layout (eyebrow + editorial headline LEFT / dual MagneticButton CTAs + mailto RIGHT),
            generous breathing room. Consistent with hero CTA stack across the site. */}
        <Reveal>
          <div className="mb-24 pt-24 md:pt-32 pb-12 border-t border-white/10 relative z-50 pointer-events-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 md:gap-16">
              {/* LEFT — eyebrow + headline */}
              <div className="max-w-2xl">
                <span className="block text-xs font-display uppercase tracking-[0.25em] text-neutral-500 mb-6">
                  {language === 'pl' ? "Potrzebujesz podobnych rezultatów?" : "Need results like these?"}
                </span>
                <h2 className="type-h2 text-balance">
                  {language === 'pl' ? "Porozmawiajmy." : "Let's talk."}
                </h2>
              </div>

              {/* RIGHT — dual CTAs + mailto, mirrors hero AgencyHero pattern */}
              <div className="flex flex-col gap-6 md:items-end shrink-0">
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* PRIMARY — Brief funnel */}
                  <MagneticButton
                    onClick={() => setLocation("/brief")}
                    className="bg-[#D4FF00] text-black border-none hover:bg-[#D4FF00]/90 rounded-none"
                    glowColor="rgba(0, 0, 0, 0.15)"
                  >
                    <span className="invisible text-lg font-display uppercase tracking-widest absolute">Start a brief</span>
                    <span className="text-lg font-display uppercase tracking-widest group-hover:tracking-normal transition-all duration-500 ease-out">
                      {language === "pl" ? "Wypełnij brief" : "Start a brief"}
                    </span>
                  </MagneticButton>

                  {/* SECONDARY — Calendly direct */}
                  <MagneticButton
                    onClick={() => {
                      try { (window as any).plausible?.("calendly_clicked", { props: { source: `case-${project.id}` } }); } catch { /* noop */ }
                      window.open("https://calendly.com/p-reszkovy/30min", "_blank", "noopener,noreferrer");
                    }}
                    className="bg-white/[0.04] text-white border-transparent hover:bg-white/[0.08] rounded-none"
                    glowColor="rgba(212, 255, 0, 0.2)"
                  >
                    <span className="invisible text-lg font-display uppercase tracking-[0.25em] absolute">{language === "pl" ? "Umów rozmowę" : "Book a call"}</span>
                    <span className="text-lg font-display uppercase tracking-wide group-hover:tracking-[0.25em] transition-all duration-500 ease-out">
                      {language === "pl" ? "Umów rozmowę" : "Book a call"}
                    </span>
                  </MagneticButton>
                </div>

                {/* Tertiary — direct mail for warm leads */}
                <a
                  href="mailto:hello@r352.com?subject=r352%20—%20hello"
                  onClick={() => {
                    try { (window as any).plausible?.("mail_clicked", { props: { source: `case-${project.id}` } }); } catch { /* noop */ }
                  }}
                  className="self-start md:self-end group inline-flex items-center gap-3 text-xs font-display uppercase tracking-[0.2em] text-neutral-400 hover:text-[#D4FF00] transition-colors duration-500 cursor-pointer"
                >
                  <span className="w-6 h-px bg-neutral-600 group-hover:bg-[#D4FF00] group-hover:w-10 transition-all duration-500" />
                  <span>{language === "pl" ? "Albo napisz bezpośrednio" : "Or write directly"} · hello@r352.com</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                </a>
              </div>
            </div>
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