import { Reveal } from "@/app/components/ui/Reveal";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { ImageHover } from "@/app/components/ui/ImageHover";
import { useLanguage } from "@/app/context/LanguageContext";

import imgGreen from "../../../imports/0_2.jpeg";
import imgGray from "../../../imports/0_3.webp";
import imgBlack from "../../../imports/0_2.webp";

export function HomePrinciples() {
  const { t, language } = useLanguage();

  const principles = [
    {
      title: language === 'pl' ? "Systemy ponad jednorazowe akcje." : "Systems over one-offs.",
      description: language === 'pl' ? "Nie projektujemy rzeczy — projektujemy sposób ich projektowania. Standardy, szablony, QA. Kiedy je wdrożymy, Twój zespół poradzi sobie bez nas." : "We don't design things — we design how things get designed. Standards, templates, QA. Once built, your team runs it without us.",
      image: imgBlack
    },
    {
      title: language === 'pl' ? "Szybkość wynika ze struktury." : "Speed comes from structure.",
      description: language === 'pl' ? "Najszybsze zespoły nie są największe. Mają jasne wytyczne, mniej pętli akceptacji i tempo dostarczania niezależne od pojedynczej osoby." : "The fastest teams aren't the biggest. They have clear briefs, fewer approval loops, and delivery cadence that doesn't depend on a single person.",
      image: imgGray
    },
    {
      title: language === 'pl' ? "Mierzymy w rezultatach." : "We measure in outcomes.",
      description: language === 'pl' ? "Czas do wdrożenia, cykle akceptacji, spójność rezultatów. Jeśli coś nie poprawia wskaźników, nie ma miejsca w systemie." : "Time-to-ship, approval cycles, output consistency. If it doesn't move a metric, it doesn't belong in the system.",
      image: imgGreen
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-background text-white border-t border-white/10">
      <div className="max-w-[1800px] mx-auto px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {principles.map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="flex flex-col h-full gap-8">
                {/* Image Placeholder */}
                <ImageHover className="aspect-[4/3] bg-white/5" tiltMax={6} glowIntensity={0.15}>
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </ImageHover>
                
                {/* Content */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white break-words [word-break:break-word] hyphens-auto text-balance">
                    {item.title}
                  </h3>
                  <p className="text-lg text-neutral-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
