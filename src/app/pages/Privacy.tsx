import { PageTransition } from "@/app/components/ui/PageTransition";
import { Reveal } from "@/app/components/ui/Reveal";
import { useLanguage } from "@/app/context/LanguageContext";

/**
 * Privacy Policy page.
 *
 * IMPORTANT: Copy is DRAFT — flagged with a banner at the top of the page.
 * Needs review by Spanish/EU legal counsel before public publication.
 *
 * Jurisdiction: Spain (Mallorca) → GDPR + LOPDGDD apply.
 * Supervisory authority: AEPD (Agencia Española de Protección de Datos).
 */
export function Privacy() {
  const { t } = useLanguage();

  const sectionKeys = [
    'whoWeAre',
    'whatWeCollect',
    'whyWeCollect',
    'retention',
    'sharing',
    'rights',
    'contact',
    'changes',
  ] as const;

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#0A0A0A] text-white pt-32 md:pt-40 pb-24 px-6 md:px-12">
        <div className="max-w-[920px] mx-auto">
          <Reveal>
            {/* Draft banner — remove after legal review */}
            <div className="mb-12 px-5 py-4 border border-[#D4FF00]/40 bg-[#D4FF00]/[0.04] text-[#D4FF00] text-xs md:text-sm font-display uppercase tracking-widest">
              {t('privacy.draftBanner')}
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="text-xs md:text-sm font-display uppercase tracking-widest text-neutral-500 mb-4">
              {t('privacy.label')}
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans font-medium tracking-tight mb-6">
              {t('privacy.title')}
            </h1>
            <p className="text-sm text-neutral-500 mb-12">{t('privacy.lastUpdated')}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-lg md:text-xl text-neutral-300 leading-relaxed mb-16 max-w-[760px]">
              {t('privacy.intro')}
            </p>
          </Reveal>

          <div className="space-y-16">
            {sectionKeys.map((key, idx) => {
              const num = String(idx + 1).padStart(2, '0');
              const body = t(`privacy.sections.${key}.body`);
              const bodyText = typeof body === 'string' ? body : '';
              const paragraphs = bodyText.split('\n\n');

              return (
                <Reveal key={key} delay={0.05 + idx * 0.03}>
                  <section>
                    <p className="text-xs font-display uppercase tracking-widest text-[#D4FF00] mb-3">
                      {num}
                    </p>
                    <h2 className="text-2xl md:text-3xl font-sans font-medium tracking-tight mb-6">
                      {t(`privacy.sections.${key}.title`)}
                    </h2>
                    <div className="space-y-4 text-base md:text-lg text-neutral-300 leading-relaxed">
                      {paragraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </section>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-24 pt-12 border-t border-white/10 text-sm text-neutral-500">
              <p className="mb-2">{t('privacy.footerNote')}</p>
              <p>
                <a
                  href="mailto:hello@r352.com?subject=r352%20—%20privacy%20question"
                  className="text-neutral-300 hover:text-[#D4FF00] transition-colors duration-300"
                >
                  hello@r352.com
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </PageTransition>
  );
}
