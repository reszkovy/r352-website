import { useEffect, useState } from "react";
import { PageTransition } from "@/app/components/ui/PageTransition";
import { Reveal } from "@/app/components/ui/Reveal";
import { useLanguage } from "@/app/context/LanguageContext";
import { useConsent } from "@/app/context/ConsentContext";

/**
 * Cookies preferences page.
 *
 * Three categories, only one of which is currently controllable:
 *   - Necessary  → always on, locked
 *   - Analytics  → maps directly to ConsentContext (accept / deny)
 *   - Marketing  → placeholder toggle (we run no marketing tags today,
 *                  but exposing the control sets expectations for future)
 *
 * "Save" button commits the analytics toggle to ConsentContext.
 * "Reset" wipes the stored choice → banner reappears on next load.
 *
 * Copy is DRAFT — same legal-review caveat as /privacy.
 */
export function Cookies() {
  const { t } = useLanguage();
  const { status, accept, deny, reset } = useConsent();

  const [analyticsOn, setAnalyticsOn] = useState(status === "accepted");
  const [marketingOn, setMarketingOn] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setAnalyticsOn(status === "accepted");
  }, [status]);

  const handleSave = () => {
    if (analyticsOn) accept();
    else deny();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    reset();
    setAnalyticsOn(false);
    setMarketingOn(false);
    setSaved(false);
  };

  type CategoryKey = "necessary" | "analytics" | "marketing";
  const categories: {
    key: CategoryKey;
    locked: boolean;
    value: boolean;
    onChange: (v: boolean) => void;
  }[] = [
    { key: "necessary", locked: true, value: true, onChange: () => {} },
    { key: "analytics", locked: false, value: analyticsOn, onChange: setAnalyticsOn },
    { key: "marketing", locked: false, value: marketingOn, onChange: setMarketingOn },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#0A0A0A] text-white pt-32 md:pt-40 pb-24 px-6 md:px-12">
        <div className="max-w-[920px] mx-auto">
          <Reveal>
            <div className="mb-12 px-5 py-4 border border-[#D4FF00]/40 bg-[#D4FF00]/[0.04] text-[#D4FF00] text-xs md:text-sm font-display uppercase tracking-widest">
              {t("cookies.draftBanner")}
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="text-xs md:text-sm font-display uppercase tracking-widest text-neutral-500 mb-4">
              {t("cookies.label")}
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans font-medium tracking-tight mb-6">
              {t("cookies.title")}
            </h1>
            <p className="text-sm text-neutral-500 mb-10">{t("cookies.lastUpdated")}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-lg md:text-xl text-neutral-300 leading-relaxed mb-16 max-w-[760px]">
              {t("cookies.intro")}
            </p>
          </Reveal>

          <div className="space-y-6 mb-12">
            {categories.map((cat, idx) => (
              <Reveal key={cat.key} delay={0.05 + idx * 0.05}>
                <div className="border border-white/10 hover:border-white/20 transition-colors duration-300 p-6 md:p-8 flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl md:text-2xl font-sans font-medium tracking-tight">
                        {t(`cookies.categories.${cat.key}.title`)}
                      </h2>
                      {cat.locked && (
                        <span className="text-[10px] font-display uppercase tracking-widest text-[#D4FF00] border border-[#D4FF00]/40 px-2 py-0.5">
                          {t("cookies.alwaysOn")}
                        </span>
                      )}
                    </div>
                    <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
                      {t(`cookies.categories.${cat.key}.body`)}
                    </p>
                  </div>

                  <div className="shrink-0">
                    <button
                      type="button"
                      role="switch"
                      aria-checked={cat.value}
                      aria-label={t(`cookies.categories.${cat.key}.title`)}
                      disabled={cat.locked}
                      onClick={() => !cat.locked && cat.onChange(!cat.value)}
                      className={`relative inline-flex h-7 w-14 items-center transition-colors duration-300 ${
                        cat.value ? "bg-[#D4FF00]" : "bg-white/15"
                      } ${cat.locked ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:opacity-90"}`}
                    >
                      <span
                        className={`inline-block h-5 w-5 bg-black transition-transform duration-300 ${
                          cat.value ? "translate-x-8" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <button
                type="button"
                onClick={handleSave}
                className="group relative inline-flex items-center justify-center px-8 py-3 bg-[#D4FF00] text-black hover:bg-white transition-all duration-300 ease-out cursor-pointer whitespace-nowrap"
              >
                <span className="text-xs md:text-sm font-display uppercase tracking-widest font-medium">
                  {t("cookies.save")}
                </span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="group relative inline-flex items-center justify-center px-8 py-3 bg-transparent text-white border border-white/30 hover:border-white/70 hover:bg-white/[0.04] transition-all duration-300 ease-out cursor-pointer whitespace-nowrap"
              >
                <span className="text-xs md:text-sm font-display uppercase tracking-widest">
                  {t("cookies.reset")}
                </span>
              </button>

              {saved && (
                <span className="text-sm text-[#D4FF00] font-display uppercase tracking-widest">
                  {t("cookies.savedConfirm")}
                </span>
              )}
            </div>

            <p className="mt-8 text-xs text-neutral-500 max-w-[640px] leading-relaxed">
              {t("cookies.footerNote")}
            </p>
          </Reveal>
        </div>
      </div>
    </PageTransition>
  );
}
