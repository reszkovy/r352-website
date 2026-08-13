import { Philosophy as PhilosophySection } from "@/app/components/agency/Philosophy";
import { PageTransition } from "@/app/components/ui/PageTransition";
import { useLanguage } from "@/app/context/LanguageContext";

export function Philosophy() {
  const { t } = useLanguage();

  return (
    <PageTransition>
      {/* The page's ONE semantic h1. The visual hero headline lives inside
          PhilosophySection, overlaid on ScrollSequence - and ScrollSequence
          renders through createPortal onto <body>, which the prerender strips.
          That left /philosophy with zero h1 in its static HTML. This heading is
          in #root (so it survives the snapshot) and visually hidden (so nothing
          on screen changes); the hero block is marked aria-hidden to keep
          exactly one heading exposed to assistive tech. */}
      <h1 className="sr-only">
        {`${t("philosophy_page.title_line1")} ${t("philosophy_page.title_line2")}`}
      </h1>
      <PhilosophySection />
    </PageTransition>
  );
}
