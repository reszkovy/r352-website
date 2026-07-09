import { Helmet } from "react-helmet-async";

/**
 * Estymacja907 - standalone client estimate page for Osada Orle (Góry Izerskie).
 * Rendered as a full-viewport overlay so it fully covers the r352 chrome; its own
 * Osada Orle brand system (paper #F0ECE4, ink #2B2B2B, brass #B87333, bronze
 * #735831, stone #8A8279; Fraunces + Work Sans). Not in nav, noindex. The r352
 * first-load splash is suppressed for this route in index.html.
 */
const ZAKRES: {
  name: string;
  desc: string;
  price: string;
  sub?: { desc: string; price: string }[];
}[] = [
  {
    name: "Brand overview + wytyczenie kierunku kreatywnego",
    desc: "Analiza marki, określenie kierunku wizualnego i rekomendacje.",
    price: "800 PLN",
  },
  {
    name: "Prezentacja",
    desc: "Standardowe slajdy.",
    price: "50 PLN / slajd",
    sub: [
      {
        desc: "Bardziej złożone slajdy (infografiki, autorskie layouty, bardziej pracochłonne).",
        price: "100 PLN / slajd",
      },
    ],
  },
  {
    name: "Kontenerek + pliki produkcyjne",
    desc: "Przygotowanie finalnych plików zgodnie ze specyfikacją.",
    price: "800–1 500 PLN",
  },
  {
    name: "Tablice (3 szt.)",
    desc: "Projekt + przygotowanie plików produkcyjnych.",
    price: "900–1 500 PLN",
  },
];

const PODSUMOWANIE: { pos: string; amount: string }[] = [
  { pos: "Brand overview", amount: "800 PLN" },
  { pos: "Prezentacja (ok. 40 slajdów)", amount: "2 000–2 400 PLN" },
  { pos: "Kontenerek", amount: "800–1 500 PLN" },
  { pos: "Tablice (3 szt.)", amount: "900–1 500 PLN" },
];

const UWAGI: string[] = [
  "Wycena ma charakter orientacyjny.",
  "Ostateczna cena zostanie doprecyzowana po zatwierdzeniu zakresu projektu.",
  "Wycena obejmuje przygotowanie plików produkcyjnych tam, gdzie zostało to wskazane.",
  "Dodatkowe iteracje lub rozszerzenie zakresu prac mogą wpłynąć na końcową wycenę.",
];

const serif = { fontFamily: '"Fraunces", Georgia, serif' } as const;

export function Estymacja907() {
  return (
    <>
      <Helmet>
        <title>Estymacja 907 · Osada Orle</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Work+Sans:wght@400;450;500;600&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <div
        className="fixed inset-0 z-[100000] overflow-y-auto bg-[#F0ECE4] text-[#2B2B2B] antialiased"
        style={{ fontFamily: '"Work Sans", system-ui, sans-serif' }}
      >
        <div className="mx-auto max-w-3xl px-6 py-16 md:px-8 md:py-24">
          {/* Header - seal + wordmark + estimate codename */}
          <header className="text-center">
            <img
              src="/osada/osada-orle-bronze.svg"
              alt="Osada Orle"
              className="mx-auto w-[172px] md:w-[208px] h-auto select-none"
              draggable={false}
            />
            <p className="mt-9 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#B87333]">
              Estymacja 907
            </p>
            <h1 style={serif} className="mt-3 text-3xl md:text-5xl font-medium leading-[1.05]">
              Szacunkowa wycena projektu
            </h1>
            <span className="mt-8 inline-block h-px w-14 bg-[#B87333]/70" aria-hidden="true" />
          </header>

          {/* Zakres prac */}
          <section className="mt-16 md:mt-20">
            <h2 style={serif} className="text-xl md:text-2xl font-medium">
              Zakres prac
            </h2>
            <div className="mt-6 border-t border-[#2B2B2B]/12">
              {ZAKRES.map((item, i) => (
                <div key={i} className="border-b border-[#2B2B2B]/12 py-6">
                  <div className="flex items-start justify-between gap-6">
                    <div className="max-w-[70%]">
                      <p style={serif} className="text-lg md:text-xl leading-snug">
                        {item.name}
                      </p>
                      <p className="mt-1.5 text-sm md:text-[15px] leading-relaxed text-[#8A8279]">
                        {item.desc}
                      </p>
                    </div>
                    <p className="shrink-0 whitespace-nowrap pt-1 text-right text-base md:text-lg font-semibold text-[#B87333] tabular-nums">
                      {item.price}
                    </p>
                  </div>
                  {item.sub?.map((s, j) => (
                    <div
                      key={j}
                      className="mt-4 flex items-start justify-between gap-6 border-l-2 border-[#B87333]/35 pl-4"
                    >
                      <p className="max-w-[70%] text-sm md:text-[15px] leading-relaxed text-[#8A8279]">
                        {s.desc}
                      </p>
                      <p className="shrink-0 whitespace-nowrap text-right text-base md:text-lg font-semibold text-[#B87333] tabular-nums">
                        {s.price}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>

          {/* Szacunkowe podsumowanie */}
          <section className="mt-16 md:mt-20">
            <h2 style={serif} className="text-xl md:text-2xl font-medium">
              Szacunkowe podsumowanie
            </h2>
            <div className="mt-6 rounded-[4px] border border-[#2B2B2B]/12 bg-[#E8E4DD]/50">
              {PODSUMOWANIE.map((row, i) => (
                <div
                  key={i}
                  className="flex items-baseline justify-between gap-6 border-b border-[#2B2B2B]/10 px-5 py-4 md:px-7"
                >
                  <p className="text-[15px] md:text-base">{row.pos}</p>
                  <p className="whitespace-nowrap text-right text-[15px] md:text-base font-semibold tabular-nums">
                    {row.amount}
                  </p>
                </div>
              ))}
              <div className="flex items-baseline justify-between gap-6 px-5 py-6 md:px-7">
                <p style={serif} className="text-lg md:text-xl font-medium">
                  Łącznie
                </p>
                <p
                  style={serif}
                  className="whitespace-nowrap text-right text-xl md:text-2xl font-semibold text-[#B87333] tabular-nums"
                >
                  4 500–6 200 PLN
                </p>
              </div>
            </div>
          </section>

          {/* Uwagi */}
          <section className="mt-16 md:mt-20">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8A8279]">
              Uwagi
            </h3>
            <ul className="mt-5 space-y-3">
              {UWAGI.map((u, i) => (
                <li key={i} className="flex gap-3 text-sm md:text-[15px] leading-relaxed text-[#5f5b54]">
                  <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-[#B87333]" aria-hidden="true" />
                  <span>{u}</span>
                </li>
              ))}
            </ul>
          </section>

          <footer className="mt-20 border-t border-[#2B2B2B]/12 pt-8 text-center">
            <p style={serif} className="text-sm tracking-wide text-[#8A8279]">
              Osada Orle · Góry Izerskie · 825 m n.p.m.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
