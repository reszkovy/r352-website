// ──────────────────────────────────────────────────────────────────────
// JOURNAL ARTICLE 11 — Brand Knowledge Hub w erze agentów AI
// Ready do dropu w src/app/data/journalArticles.ts jako nowy entry.
// Companion content do LinkedIn carousel "Geers Brand Hub" (June 2026).
// Cover: TODO — wygeneruj glass crystal hero w MJ albo użyj journal10 jako temp.
// ──────────────────────────────────────────────────────────────────────

// Import na górze pliku journalArticles.ts (jeśli nowy cover):
// import journal11Cover from "../../assets/journal-11-cover.png";

export const article11_knowledgeHub = {
  id: 11,
  published: true,
  title: "Brand knowledge hub:<br/>why your PDF won't survive AI agents",
  title_pl: "Brand knowledge hub:<br/>dlaczego PDF cię nie obroni przed agentami AI",
  date: "June 2026",
  dateISO: "2026-06-14",
  category: "Brand Operations",
  image: "journal11Cover", // replace with imported cover

  // ─── POLISH VERSION (primary, since LI audience is PL) ─────────────
  content_pl: `
    <p class="mb-6 text-xl leading-relaxed text-neutral-300">
      Brand book PDF który leży na firmowym dysku, otwierany raz na pół roku, ostatnio aktualizowany w 2023 — to <span class="text-white font-medium">firma bez CRM-a w 2010 roku</span>. Działa. Do czasu. Aż przyjdzie moment kiedy ktoś zauważy że konkurencja ma narzędzia które obsługują przypadki o których ty jeszcze nie pomyślałeś.
    </p>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      Ten moment dla brandu nastąpił w 2026, kiedy każdy zespół marketingowy zaczął używać Claude'a, ChatGPT i Midjourney przy każdym briefie. <span class="text-white">AI nie zastąpiło zespołu — stało się jego trzecim członkiem.</span> A trzeci członek zespołu nie wie czego nie wie. Jeśli nie ma curated źródła twojej marki, uczy się jej z internetu, ze strzępów blogów konkurencji, z LinkedIn-postów sprzed dwóch lat.
    </p>

    <h2 class="text-3xl font-bold text-white mt-16 mb-6">Nowa rzeczywistość: twój zespół już promptuje AI</h2>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      To się dzieje teraz, niezależnie od tego czy to akceptujesz. Junior copywriter w sobotę o 23:30 wpisuje do Claude'a "napisz post LinkedIn w tonie naszej marki — deadline poniedziałek". Designer prompts'uje Midjourney o "brand palette". Marketing produkuje 200 deliverables na kwartał i każdy lokalny zespół interpretuje brand book po swojemu.
    </p>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      Pytanie nie brzmi "czy używać AI". Pytanie brzmi: <span class="text-white">z czego AI uczy się twojej marki?</span> Bo jeśli nie z twojego curated źródła — to z przypadkowych miejsc w internecie. I każdy taki output dodaje drift do twojego systemu wizualnego i językowego.
    </p>

    <h2 class="text-3xl font-bold text-white mt-16 mb-6">Knowledge hub = 4-warstwowa architektura</h2>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      Brand knowledge hub nie jest brand bookiem 2.0. To <span class="text-white">całe operacje brandowe jako system</span>, podzielone na cztery warstwy które razem dają operacyjną przewagę:
    </p>
    <ul class="list-none mb-10 space-y-4 text-neutral-400 text-lg pl-4 border-l-2 border-[#D4FF00]/40">
      <li><span class="text-white font-medium">Warstwa wiedzy</span> — 23 moduły w 5 bucketach (strategia, język, visual, wykonanie, reference). Wszystko czego potrzebujesz żeby coś było on-brand.</li>
      <li><span class="text-white font-medium">Warstwa formatu</span> — ten sam content w dwóch formach: wizualny system dla ludzi + curated plik .md dla AI agentów. Jedno źródło prawdy, dwa renderowania.</li>
      <li><span class="text-white font-medium">Warstwa QA</span> — narzędzie które ocenia każdy nowy asset przed publikacją. Drop file → score + lista konkretnych fixów. Approval workflow przestaje być debate, staje się check'iem.</li>
      <li><span class="text-white font-medium">Warstwa produkcji</span> — biblioteka promptów + AI skills (Claude/ChatGPT) z auto-loadem brand contextu. Zespół promptuje normalnie, agent generuje on-brand bez prompt-engineering za każdym razem.</li>
    </ul>

    <h2 class="text-3xl font-bold text-white mt-16 mb-6">23 moduły w 5 bucketach</h2>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      Każda decyzja brandowa wpada w jeden z pięciu bucketów. Wszystkie są dostępne dla zespołu + AI w tej samej strukturze:
    </p>

    <h3 class="text-xl font-bold text-white mt-10 mb-4">01 · Strategia + voice (5 modułów)</h3>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      Pozycjonowanie, mission, 4 atrybuty marki, 3 tryby tonu, modulacja głosu per kanał. To DNA — wszystko inne buduje się na tym fundamencie.
    </p>

    <h3 class="text-xl font-bold text-white mt-10 mb-4">02 · Język (3 moduły)</h3>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      DO/DON'T dla copy i design. Lexicon — słowa zakazane i ich tłumaczenia. Reguły mówienia "po marce" w każdym kanale. Junior copywriter o 23:30 ma do czego się odwołać.
    </p>

    <h3 class="text-xl font-bold text-white mt-10 mb-4">03 · Visual (6 modułów)</h3>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      Logo rules, paleta kolorów (verified z live site, nie z PDF brand booka), typografia, oficjalne kształty, biblioteka ikon, fotografia z zasadą "zero stocku". Każdy designer wchodzi do hub'a i znajduje gotowe assets.
    </p>

    <h3 class="text-xl font-bold text-white mt-10 mb-4">04 · Wykonanie (6 modułów)</h3>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      Layout grid + tokens spacingu, interakcje (hover/focus/states), motion language (easing, reveals, transitions), stack techniczny, accessibility + performance budgets. <span class="text-white">To jest warstwa którą większość brand consultantów pomija</span> — bo wymaga rozumienia jak to się buduje w kodzie.
    </p>

    <h3 class="text-xl font-bold text-white mt-10 mb-4">05 · Reference (3 moduły)</h3>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      Real assets z produkcji jako wzorce do replikacji. Production patterns. Source pages — co jest źródłem prawdy. Zespół zawsze widzi przykłady tego co działa.
    </p>

    <h2 class="text-3xl font-bold text-white mt-16 mb-6">Case: Geers (Sonova PL) — 3 lata, 200+ deliverables/kwartał, zero drift</h2>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      Zbudowałem knowledge hub dla Geers — polskiej marki Sonova, lidera w branży audiologicznej. Multi-location (192 salony), regulowane środowisko (medyczne wyroby klasy IIa), zespół + agencje + freelancerzy wspólnie produkujący 200+ deliverables każdego kwartału.
    </p>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      Przez 3 lata produkcji <span class="text-white">zero drift wizualny i językowy</span>. Każdy nowy asset (kampania, social post, OOH, mailing, prezentacja B2B) przechodzi przez ten sam knowledge hub. Każdy vendor — agencja kreatywna, freelance designer, junior z zespołu — ma dostęp do tego samego curated źródła prawdy.
    </p>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      Mechanizm jest prosty: <span class="text-white">brand consistency nie wygrywa się brand bookiem w PDF. Wygrywa się knowledge hub'em, do którego dostęp ma zespół plus agenci AI których ten zespół używa codziennie.</span>
    </p>

    <h2 class="text-3xl font-bold text-white mt-16 mb-6">Architektura dual-format: wizualny dla ludzi, .md dla AI</h2>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      Najczęstszy błąd przy budowaniu knowledge hub'a: budujesz tylko dla ludzi. Czyli front-end który członek zespołu otworzy, przeczyta, zamknie. To 50% wartości.
    </p>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      Druga połowa wartości to <span class="text-white">curated plik .md gotowy do zassania przez agenta AI</span>. Strukturyzowany, LLM-friendly, z explicit rules i przykładami. Kiedy junior copywriter pyta Claude'a o tone marki, agent ma dostęp do tego pliku. Nie improwizuje na bazie strzępów z internetu — generuje on-brand bo wie czym ten brand jest.
    </p>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      Jeden hub, dwa formaty wyjścia. Single source of truth, dual rendering.
    </p>

    <h2 class="text-3xl font-bold text-white mt-16 mb-6">Active QA layer — koniec subiektywnych debat</h2>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      Najsłabszym ogniwem klasycznego brand bookiem PDF jest egzekucja. Brand manager dostaje asset od agencji, ma 30 minut na review, daje feedback "to nie czuję marki". Agencja iteruje, brand manager iteruje, deadline ucieka. Po trzech rundach decyzja zapada na "ok, ship it" — nie dlatego że on-brand, ale dlatego że nie ma czasu.
    </p>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      Active QA layer rozwiązuje to inaczej. <span class="text-white">Drop asset → system ocenia względem 23 modułów → zwraca score plus listę konkretnych fixów w 3 sekundy.</span> Zamiast 30-minutowych approval meetingów masz 3-sekundowy obiektywny check. Zamiast "to nie czuję marki" masz listę konkretnych rzeczy do naprawy.
    </p>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      Hub nie tylko trzyma brand. <span class="text-white">Egzekwuje go.</span>
    </p>

    <h2 class="text-3xl font-bold text-white mt-16 mb-6">Production layer — biblioteka promptów + AI skills</h2>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      Ostatnia warstwa zamyka pętlę. Zespół już używa AI codziennie — ale jeśli każdy member za każdym razem prompts'uje od zera, tracicie 80% potencjału. Curated biblioteka promptów rozwiązuje ten problem:
    </p>
    <ul class="list-none mb-10 space-y-4 text-neutral-400 text-lg pl-4 border-l-2 border-[#D4FF00]/40">
      <li><span class="text-white font-medium">Prompt library</span> — gotowe prompty dla powtarzalnych use case'ów (SoMe post w mode awareness, email do existing customers, copy rewrite pod brand voice). Wbudowany brand context. Zero prompt-engineering za każdym razem.</li>
      <li><span class="text-white font-medium">AI skills (.md)</span> — auto-loadowane do Claude/ChatGPT przy każdej rozmowie zespołu. Agent automatycznie zna lexicon, voice rules, layout patterns. Junior pisze "draft post" — agent generuje od razu on-brand.</li>
    </ul>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      Compounding effect: każdy nowy prompt który dodajesz do biblioteki, każdy nowy skill który deployujesz — <span class="text-white">wzmacnia twój moat</span>. Im więcej wiedzy wrzucasz, tym mocniejsza przewaga konkurencyjna.
    </p>

    <h2 class="text-3xl font-bold text-white mt-16 mb-6">Czy twoja marka jest na tyle duża, żeby tego potrzebować?</h2>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      Brand knowledge hub nie jest dla każdego. To infrastruktura — i jak każda infrastruktura, ma swój próg ROI.
    </p>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      Kiedy hub się opłaca:
    </p>
    <ul class="list-none mb-10 space-y-4 text-neutral-400 text-lg pl-4 border-l-2 border-[#D4FF00]/40">
      <li><span class="text-white">5+ lokalizacji albo oddziałów</span> generujących własne materiały marketingowe</li>
      <li><span class="text-white">3+ vendorów contentowych</span> (agencje, freelancerzy, in-house) pracujących równolegle</li>
      <li><span class="text-white">Multi-market roadmap</span> z lokalnymi adaptacjami</li>
      <li><span class="text-white">100+ deliverables na kwartał</span> z marketingu, sales, customer success</li>
      <li><span class="text-white">Zespół już używa AI codziennie</span> — Claude, ChatGPT, Midjourney, Copilot</li>
    </ul>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      Jeśli kiwasz głową przy więcej niż dwóch — knowledge hub to nie nice-to-have. To <span class="text-white">infrastruktura która oszczędza ci więcej godzin niż kosztuje</span>. W ciągu pierwszego kwartału.
    </p>

    <h2 class="text-3xl font-bold text-white mt-16 mb-6">Compounding moat — czemu czas teraz</h2>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      Knowledge hub to <span class="text-white">compounding asset</span>. Im wcześniej zaczniesz, tym więcej decyzji brandowych przejdzie przez system, tym bardziej hub staje się canonical reference. To efekt śnieżnej kuli — pierwsze 6 miesięcy jest najtrudniejsze, kolejne 30 miesięcy buduje przewagę której konkurent nie skopiuje w pół roku.
    </p>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      Marki które zbudują knowledge hub w 2026 zbiorą compounding advantage. Reszta będzie 5 lat za późno.
    </p>

    <div class="bg-white/[0.03] border-l-2 border-[#D4FF00] p-8 my-12">
      <p class="text-xl text-white font-medium leading-relaxed mb-3">
        Brand bez własnego knowledge huba w 2026 to firma bez CRM-a w 2010.
      </p>
      <p class="text-base text-neutral-400">
        Działa. Do czasu.
      </p>
    </div>

    <h2 class="text-3xl font-bold text-white mt-16 mb-6">Następny krok</h2>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      Jeśli ten artykuł zarezonował z twoją sytuacją — masz trzy ścieżki:
    </p>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      <span class="text-white font-medium">1. Zobacz pełną metodologię.</span> <a href="/process" class="text-[#D4FF00] border-b border-[#D4FF00]/40 hover:border-[#D4FF00]">/process</a> pokazuje 8-stopniowy framework r3loop którym buduje się takie systemy operacyjne — od diagnozy po wdrożenie + maintenance.
    </p>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      <span class="text-white font-medium">2. Zacznij od Diagnostic.</span> 5-dniowy fixed-scope audyt operacyjny — mapuje twoją obecną sytuację, identyfikuje 5-7 priorytetowych bottlenecks, daje 30/60/90-day roadmap. 60-day money-back guarantee jeśli rekomendacje nie są actionable. <a href="/brief" class="text-[#D4FF00] border-b border-[#D4FF00]/40 hover:border-[#D4FF00]">/brief</a> — krótki formularz, pierwsza odpowiedź w 48 godzin.
    </p>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      <span class="text-white font-medium">3. Zobacz jak to wygląda w praktyce.</span> Case studies <a href="/work/geers" class="text-[#D4FF00] border-b border-[#D4FF00]/40 hover:border-[#D4FF00]">Geers (Sonova PL)</a> i <a href="/work/benefit-systems" class="text-[#D4FF00] border-b border-[#D4FF00]/40 hover:border-[#D4FF00]">Benefit Systems</a> pokazują knowledge hub'y w działaniu — multi-location, multi-vendor, multi-market.
    </p>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      Albo po prostu <a href="mailto:hello@r352.com" class="text-[#D4FF00] border-b border-[#D4FF00]/40 hover:border-[#D4FF00]">napisz</a>. DM też otwarte.
    </p>
  `,

  // ─── ENGLISH VERSION ──────────────────────────────────────────────────
  content: `
    <p class="mb-6 text-xl leading-relaxed text-neutral-300">
      A PDF brand book sitting on a company drive, opened once every six months, last updated in 2023 — that's <span class="text-white font-medium">a company without a CRM in 2010</span>. It works. Until it doesn't. Until someone notices that the competition has tools handling cases you haven't even thought about yet.
    </p>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      That moment came for brand operations in 2026, when every marketing team started using Claude, ChatGPT, and Midjourney on every brief. <span class="text-white">AI didn't replace the team — it became its third member.</span> And a third team member doesn't know what they don't know. If there's no curated source for your brand, they learn it from the internet — from competitor blog fragments, from two-year-old LinkedIn posts.
    </p>

    <h2 class="text-3xl font-bold text-white mt-16 mb-6">The new reality: your team is already prompting AI</h2>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      This is happening now, whether you accept it or not. A junior copywriter on Saturday at 11:30 PM types into Claude: "write a LinkedIn post in our brand voice — deadline Monday." A designer prompts Midjourney for "brand palette." Marketing produces 200+ deliverables per quarter and each local team interprets the brand book their own way.
    </p>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      The question isn't "should we use AI." The question is: <span class="text-white">what is the AI learning your brand from?</span> Because if not from your curated source — then from random places on the internet. And every such output adds drift to your visual and verbal system.
    </p>

    <h2 class="text-3xl font-bold text-white mt-16 mb-6">Knowledge hub = 4-layer architecture</h2>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      A brand knowledge hub is not a brand book 2.0. It's <span class="text-white">entire brand operations as a system</span>, split into four layers that together create operational leverage:
    </p>
    <ul class="list-none mb-10 space-y-4 text-neutral-400 text-lg pl-4 border-l-2 border-[#D4FF00]/40">
      <li><span class="text-white font-medium">Knowledge layer</span> — 23 modules across 5 buckets (strategy, language, visual, execution, reference). Everything you need to make something on-brand.</li>
      <li><span class="text-white font-medium">Format layer</span> — same content in two forms: visual system for humans + curated .md file for AI agents. Single source of truth, dual rendering.</li>
      <li><span class="text-white font-medium">QA layer</span> — a tool that scores every new asset before publication. Drop file → score + specific fix list. Approval workflow stops being debate, becomes a check.</li>
      <li><span class="text-white font-medium">Production layer</span> — prompt library + AI skills (Claude/ChatGPT) with auto-loaded brand context. Team prompts normally, agent generates on-brand without prompt-engineering every time.</li>
    </ul>

    <h2 class="text-3xl font-bold text-white mt-16 mb-6">23 modules in 5 buckets</h2>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      Every brand decision falls into one of five buckets. All available to team + AI in the same structure:
    </p>

    <h3 class="text-xl font-bold text-white mt-10 mb-4">01 · Strategy + voice (5 modules)</h3>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      Positioning, mission, 4 brand attributes, 3 tone modes, voice modulation per channel. The DNA — everything else builds on this foundation.
    </p>

    <h3 class="text-xl font-bold text-white mt-10 mb-4">02 · Language (3 modules)</h3>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      DO/DON'T for copy and design. Lexicon — banned words and their translations. Rules for speaking "in brand" across every channel. The junior copywriter at 11:30 PM has something to anchor to.
    </p>

    <h3 class="text-xl font-bold text-white mt-10 mb-4">03 · Visual (6 modules)</h3>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      Logo rules, color palette (verified from live site, not from PDF), typography, official shapes, icon library, photography with "zero stock" rule. Every designer enters the hub and finds ready assets.
    </p>

    <h3 class="text-xl font-bold text-white mt-10 mb-4">04 · Execution (6 modules)</h3>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      Layout grid + spacing tokens, interactions (hover/focus/states), motion language (easing, reveals, transitions), tech stack, accessibility + performance budgets. <span class="text-white">This is the layer most brand consultants skip</span> — because it requires understanding how it's built in code.
    </p>

    <h3 class="text-xl font-bold text-white mt-10 mb-4">05 · Reference (3 modules)</h3>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      Real production assets as replication templates. Production patterns. Source pages — what is the source of truth. Team always sees examples of what works.
    </p>

    <h2 class="text-3xl font-bold text-white mt-16 mb-6">Case: Geers (Sonova PL) — 3 years, 200+ deliverables/quarter, zero drift</h2>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      I built a knowledge hub for Geers — Sonova's Polish brand, leader in audiology. Multi-location (192 stores), regulated environment (Class IIa medical devices), team + agencies + freelancers jointly producing 200+ deliverables every quarter.
    </p>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      Through 3 years of production: <span class="text-white">zero visual and verbal drift</span>. Every new asset (campaign, social post, OOH, mailing, B2B presentation) goes through the same knowledge hub. Every vendor — creative agency, freelance designer, junior on the team — has access to the same curated source of truth.
    </p>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      The mechanism is simple: <span class="text-white">brand consistency isn't won by a PDF brand book. It's won by a knowledge hub accessible to the team plus the AI agents that team uses daily.</span>
    </p>

    <h2 class="text-3xl font-bold text-white mt-16 mb-6">Dual-format architecture: visual for humans, .md for AI</h2>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      Most common mistake when building a knowledge hub: building only for humans. A front-end a team member opens, reads, closes. That's 50% of the value.
    </p>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      The other 50% is <span class="text-white">a curated .md file ready to be consumed by an AI agent</span>. Structured, LLM-friendly, with explicit rules and examples. When the junior copywriter asks Claude about brand tone, the agent has access to this file. It doesn't improvise from internet fragments — it generates on-brand because it knows what the brand is.
    </p>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      One hub, two output formats. Single source of truth, dual rendering.
    </p>

    <h2 class="text-3xl font-bold text-white mt-16 mb-6">Active QA layer — end of subjective debate</h2>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      The weakest link in a classic PDF brand book is enforcement. Brand manager receives an asset from the agency, has 30 minutes for review, gives feedback "I don't feel the brand." Agency iterates, brand manager iterates, deadline slips. After three rounds the decision lands on "ok, ship it" — not because on-brand, but because there's no time.
    </p>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      Active QA layer solves this differently. <span class="text-white">Drop asset → system scores against 23 modules → returns score plus specific fix list in 3 seconds.</span> Instead of 30-minute approval meetings you have a 3-second objective check. Instead of "I don't feel the brand" you have a list of specific things to fix.
    </p>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      The hub doesn't just hold the brand. <span class="text-white">It enforces it.</span>
    </p>

    <h2 class="text-3xl font-bold text-white mt-16 mb-6">Production layer — prompt library + AI skills</h2>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      The last layer closes the loop. The team already uses AI daily — but if each member prompts from scratch every time, you lose 80% of the potential. A curated prompt library solves this:
    </p>
    <ul class="list-none mb-10 space-y-4 text-neutral-400 text-lg pl-4 border-l-2 border-[#D4FF00]/40">
      <li><span class="text-white font-medium">Prompt library</span> — ready prompts for repeatable use cases (SoMe post in awareness mode, email to existing customers, copy rewrite for brand voice). Built-in brand context. Zero prompt-engineering every time.</li>
      <li><span class="text-white font-medium">AI skills (.md)</span> — auto-loaded into Claude/ChatGPT for every team conversation. Agent automatically knows lexicon, voice rules, layout patterns. Junior types "draft post" — agent generates on-brand immediately.</li>
    </ul>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      Compounding effect: every new prompt you add to the library, every new skill you deploy — <span class="text-white">strengthens your moat</span>. The more knowledge you feed in, the bigger the competitive advantage.
    </p>

    <h2 class="text-3xl font-bold text-white mt-16 mb-6">Is your brand big enough to need this?</h2>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      A brand knowledge hub isn't for everyone. It's infrastructure — and like any infrastructure, has an ROI threshold.
    </p>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      When the hub pays off:
    </p>
    <ul class="list-none mb-10 space-y-4 text-neutral-400 text-lg pl-4 border-l-2 border-[#D4FF00]/40">
      <li><span class="text-white">5+ locations or branches</span> generating their own marketing materials</li>
      <li><span class="text-white">3+ content vendors</span> (agencies, freelancers, in-house) working in parallel</li>
      <li><span class="text-white">Multi-market roadmap</span> with local adaptations</li>
      <li><span class="text-white">100+ deliverables per quarter</span> across marketing, sales, customer success</li>
      <li><span class="text-white">Team already uses AI daily</span> — Claude, ChatGPT, Midjourney, Copilot</li>
    </ul>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      If you're nodding at more than two — a knowledge hub isn't nice-to-have. It's <span class="text-white">infrastructure that saves you more hours than it costs</span>. Within the first quarter.
    </p>

    <h2 class="text-3xl font-bold text-white mt-16 mb-6">Compounding moat — why the time is now</h2>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      A knowledge hub is a <span class="text-white">compounding asset</span>. The earlier you start, the more brand decisions pass through the system, the more the hub becomes canonical reference. It's a snowball effect — the first 6 months are hardest, the next 30 months build an advantage a competitor can't copy in six.
    </p>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      Brands that build a knowledge hub in 2026 will collect compounding advantage. The rest will be 5 years late.
    </p>

    <div class="bg-white/[0.03] border-l-2 border-[#D4FF00] p-8 my-12">
      <p class="text-xl text-white font-medium leading-relaxed mb-3">
        A brand without its own knowledge hub in 2026 is a company without a CRM in 2010.
      </p>
      <p class="text-base text-neutral-400">
        It works. Until it doesn't.
      </p>
    </div>

    <h2 class="text-3xl font-bold text-white mt-16 mb-6">Next step</h2>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      If this article resonated with your situation — you have three paths:
    </p>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      <span class="text-white font-medium">1. See the full methodology.</span> <a href="/process" class="text-[#D4FF00] border-b border-[#D4FF00]/40 hover:border-[#D4FF00]">/process</a> shows the 8-step r3loop framework used to build such operational systems — from diagnosis to implementation + maintenance.
    </p>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      <span class="text-white font-medium">2. Start with the Diagnostic.</span> 5-day fixed-scope operational audit — maps your current situation, identifies 5-7 priority bottlenecks, delivers a 30/60/90-day roadmap. 60-day money-back guarantee if recommendations aren't actionable. <a href="/brief" class="text-[#D4FF00] border-b border-[#D4FF00]/40 hover:border-[#D4FF00]">/brief</a> — short form, first response within 48 hours.
    </p>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      <span class="text-white font-medium">3. See it in practice.</span> Case studies <a href="/work/geers" class="text-[#D4FF00] border-b border-[#D4FF00]/40 hover:border-[#D4FF00]">Geers (Sonova PL)</a> and <a href="/work/benefit-systems" class="text-[#D4FF00] border-b border-[#D4FF00]/40 hover:border-[#D4FF00]">Benefit Systems</a> show knowledge hubs in action — multi-location, multi-vendor, multi-market.
    </p>
    <p class="mb-6 text-lg leading-relaxed text-neutral-400">
      Or just <a href="mailto:hello@r352.com" class="text-[#D4FF00] border-b border-[#D4FF00]/40 hover:border-[#D4FF00]">write</a>. DMs open.
    </p>
  `,
};

// ──────────────────────────────────────────────────────────────────────
// INTEGRATION INSTRUCTIONS
// ──────────────────────────────────────────────────────────────────────
//
// 1. Generate cover image (Midjourney prompt — glass closed codex per
//    earlier brand spec). Save as src/assets/journal-11-cover.png
//
// 2. In src/app/data/journalArticles.ts:
//    a) Add import at top: import journal11Cover from "../../assets/journal-11-cover.png";
//    b) Replace "journal11Cover" string above with the imported binding
//    c) Insert this object at the TOP of the journalArticles array
//       (newest first, before id: 10)
//
// 3. Update src/sitemap.xml (or src/data/sitemap source) to include
//    /journal/11 with current lastmod date
//
// 4. Update prerender routes config to include /journal/11
//
// 5. Test locally: npm run dev → navigate to /journal → click article
//    → verify both PL + EN render, all internal links work, cover loads
//
// 6. Build + deploy: npm run build → push to main → Vercel auto-deploys
//
// 7. After deploy: share on LinkedIn with carousel + caption:
//    "Pełen deep-dive na blogu r352.com/journal/11 ↓"
//
// ──────────────────────────────────────────────────────────────────────
