const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/app/i18n/translations.ts');
let content = fs.readFileSync(filePath, 'utf-8');

const enCards = `[
        {
          title: "Brand System",
          description: "A clear brand foundation built to stay consistent across teams and channels.",
          output: "Brand rules + usable templates. Your team ships on-brand without checking with you first.",
          includes: [
            "Visual identity + core rules",
            "Typography + layout system",
            "Color system (digital + print)",
            "Photography & illustration guidelines",
            "Template set (social, ads, deck, email)",
            "Icon set in brand style"
          ],
          whats_inside: [
            "Brand Guidelines Document (PDF)",
            "Logo package — all versions, all formats (SVG, PNG, EPS)",
            "Typography hierarchy per medium (web, print, social)",
            "Color palette with HEX, RGB, CMYK, Pantone codes",
            "Layout grid system per format",
            "Template files — social posts, stories, covers, ads, deck, email header",
            "Photography mood & direction guide",
            "Do's & don'ts reference sheet"
          ],
          best_for: "Companies launching, rebranding, or scaling across new markets and channels."
        },
        {
          title: "Campaign Toolkit",
          description: "A modular campaign asset set designed to scale beyond one-off visuals.",
          output: "Publish-ready KV + variants + templates. One concept, every channel, zero rework.",
          includes: [
            "Concept + messaging structure",
            "Key Visual + modular layout templates",
            "Social + performance ad variants",
            "Motion package (video, GIF, animation)",
            "Print adaptations (poster, flyer, POS)",
            "Copy matrix per format and audience"
          ],
          whats_inside: [
            "Key Visual in master resolution + adaptation guide",
            "Modular layout templates for self-assembly",
            "Social media variants — posts, stories, reels covers (FB, IG, LinkedIn, TikTok)",
            "Performance ad formats — GDN, Meta, LinkedIn sizes",
            "Motion assets — 15s, 30s, GIF loops",
            "CMYK print files — posters, flyers, rollups, POS materials",
            "Headline/subhead/CTA variants per segment",
            "Campaign asset checklist — full format inventory"
          ],
          best_for: "Marketing teams running multi-channel campaigns with tight deadlines and high volume."
        },
        {
          title: "Always-On Communication",
          description: "Ongoing communication support delivered in a predictable rhythm.",
          output: "Consistent weekly/monthly drops. Your channels stay active without internal production overhead.",
          includes: [
            "Monthly/weekly content plan",
            "Production + iterations",
            "QA + consistency control",
            "Performance notes + optimization",
            "Steady delivery cadence"
          ],
          whats_inside: [
            "Content calendar with topics, formats, channels",
            "Reusable content templates per format (post, story, newsletter, blog)",
            "Production queue with statuses and deadlines",
            "QA report before every publish cycle",
            "Iteration log — what changed, why",
            "Performance notes — what worked, what to adjust next",
            "Monthly/weekly drops on schedule, no delays"
          ],
          best_for: "Teams that need steady content output but don't have the bandwidth to manage production in-house."
        },
        {
          title: "Website Launch",
          description: "A premium website built for clarity, conversion, and maintainability.",
          output: "Launch-ready site + handoff. Your team edits content, adds pages, and tracks performance without calling us.",
          includes: [
            "Structure + UX",
            "UI design + component system",
            "Build + CMS setup",
            "SEO baseline + performance audit",
            "Launch support + handoff"
          ],
          whats_inside: [
            "Sitemap + information architecture",
            "Wireframes — per page type",
            "UI design — pixel-perfect per breakpoint (desktop, tablet, mobile)",
            "Component library in Figma",
            "Interactive prototype of key flows",
            "Frontend build (Next.js / Webflow / custom CMS)",
            "CMS with editable content fields",
            "SEO setup — meta, OG images, sitemap.xml, robots.txt",
            "Performance audit — Lighthouse, Core Web Vitals",
            "Launch checklist — redirects, analytics, tracking, forms",
            "Handoff documentation — how your team edits content independently"
          ],
          best_for: "Companies that need a website that performs, converts, and doesn't require a developer for every content update."
        },
        {
          title: "Digital Product UX",
          description: "End-to-end UX/UI from problem framing to dev-ready delivery.",
          output: "Prototype + UI system + specs. Your dev team builds from a single source of truth, not loose mockups.",
          includes: [
            "Flow + architecture",
            "UI system + prototype",
            "Dev-ready specs + QA",
            "Component documentation",
            "User research synthesis"
          ],
          whats_inside: [
            "User research synthesis — personas, journey map, pain points",
            "Information architecture + flow diagrams",
            "Wireframes (low & mid fidelity) — key screens and flows",
            "UI design system — components, tokens, spacing, color, type",
            "High-fidelity clickable prototype in Figma",
            "Dev-ready specs — redlines, spacing, all states (hover, active, disabled, error, loading)",
            "Asset export + component documentation",
            "QA checklist per screen"
          ],
          best_for: "Product teams building or redesigning digital products that need to move fast without accumulating design debt."
        },
        {
          title: "Multi-Location Asset System",
          description: "A scalable kit for brands with many locations and constant asset requests.",
          output: "Central standards + local templates. 50 locations ship on-brand without 50 briefs hitting your desk.",
          includes: [
            "Central vs. local rules",
            "Reusable templates + variants",
            "Handoff packs for local teams",
            "Asset request workflow",
            "Quality control protocol"
          ],
          whats_inside: [
            "Central vs. local rules document — what's locked, what's editable",
            "Master template set with editable zones per format",
            "Location variant guide — how locals adapt (photos, copy, prices, addresses)",
            "Asset request flow — form, approval path, timeline",
            "Self-service template library (Canva / Figma / custom tool)",
            "Quality control protocol — how HQ monitors local output",
            "Rollout pack per location — starter kit for every new site",
            "Training materials — video/PDF on how to use the template system"
          ],
          best_for: "Franchise networks, retail chains, and multi-location brands that need consistency at scale without a central bottleneck."
        }
      ]`;

const plCards = `[
        {
          title: "System Marki",
          description: "Jasny fundament marki zbudowany, by zachować spójność w zespołach i kanałach.",
          output: "Zasady marki + szablony. Twój zespół wdraża markę bez pytania o zgodę na każdym kroku.",
          includes: [
            "Identyfikacja wizualna + zasady",
            "Typografia + system layoutów",
            "System kolorów (digital + druk)",
            "Wytyczne fotografii i ilustracji",
            "Zestaw szablonów (social, ads, prezk, email)",
            "Zestaw ikon w stylu marki"
          ],
          whats_inside: [
            "Brand Book (PDF)",
            "Paczka logo — wszystkie wersje i formaty (SVG, PNG, EPS)",
            "Hierarchia typografii dla mediów (web, print, social)",
            "Paleta kolorów z kodami HEX, RGB, CMYK, Pantone",
            "System siatek dla różnych formatów",
            "Pliki szablonów — posty, stories, okładki, reklamy, prezentacje, nagłówki email",
            "Przewodnik po stylu zdjęć (moodboard & kierunek)",
            "Arkusz referencyjny Do's & don'ts"
          ],
          best_for: "Firmy uruchamiające nową markę, rebrandujące się lub wchodzące na nowe rynki i kanały."
        },
        {
          title: "Toolkit Kampanijny",
          description: "Modułowy zestaw zasobów kampanijnych zaprojektowany do skalowania poza jednorazowe wizualizacje.",
          output: "Gotowy do publikacji KV + warianty + szablony. Jeden koncept, każdy kanał, zero powtórek.",
          includes: [
            "Koncept + struktura przekazu",
            "Key Visual + szablony modułowe",
            "Warianty social + performance",
            "Paczka motion (wideo, GIF, animacja)",
            "Adaptacje do druku (plakat, ulotka, POS)",
            "Matryca tekstów dla formatów i grup docelowych"
          ],
          whats_inside: [
            "Key Visual w najwyższej rozdzielczości + przewodnik adaptacji",
            "Modułowe szablony układów do samodzielnego montażu",
            "Warianty social media — posty, stories, okładki reels (FB, IG, LinkedIn, TikTok)",
            "Formaty reklam performance — GDN, Meta, LinkedIn",
            "Zasoby motion — 15s, 30s, zapętlone GIFy",
            "Pliki do druku CMYK — plakaty, ulotki, rollupy, POS",
            "Warianty nagłówków/podtytułów/CTA dla segmentów",
            "Checklista zasobów kampanii — pełna inwentaryzacja"
          ],
          best_for: "Zespoły marketingowe prowadzące wielokanałowe kampanie z krótkimi terminami i dużym wolumenem."
        },
        {
          title: "Komunikacja Always-On",
          description: "Ciągłe wsparcie komunikacyjne dostarczane w przewidywalnym rytmie.",
          output: "Spójne zrzuty cotygodniowe/miesięczne. Twoje kanały są aktywne bez obciążeń wewnętrznych.",
          includes: [
            "Miesięczny/tygodniowy plan treści",
            "Produkcja + iteracje",
            "QA + kontrola spójności",
            "Analiza wyników + optymalizacja",
            "Stałe tempo dostarczania"
          ],
          whats_inside: [
            "Kalendarz treści z tematami, formatami i kanałami",
            "Szablony wielokrotnego użytku dla formatów (post, story, newsletter, blog)",
            "Kolejka produkcji ze statusem i terminami",
            "Raport QA przed każdym cyklem publikacji",
            "Dziennik iteracji — co się zmieniło i dlaczego",
            "Notatki z wyników — co zadziałało, co poprawić",
            "Miesięczne/tygodniowe paczki na czas, bez opóźnień"
          ],
          best_for: "Zespoły potrzebujące stałego dopływu treści, nie mające jednak mocy przerobowych na zarządzanie produkcją in-house."
        },
        {
          title: "Start Strony WWW",
          description: "Strona premium zbudowana dla jasności, konwersji i łatwego utrzymania.",
          output: "Gotowa strona + przekazanie. Twój zespół edytuje treści bez dzwonienia do nas.",
          includes: [
            "Struktura + UX",
            "Projekt UI + system komponentów",
            "Budowa + konfiguracja CMS",
            "Baza SEO + audyt wydajności",
            "Wsparcie startu + przekazanie"
          ],
          whats_inside: [
            "Sitemap + architektura informacji",
            "Makiety (wireframes) dla poszczególnych podstron",
            "Projekt UI — dopracowany dla każdego punktu (desktop, tablet, mobile)",
            "Biblioteka komponentów w Figma",
            "Interaktywny prototyp kluczowych ścieżek",
            "Budowa frontendu (Next.js / Webflow / dedykowany CMS)",
            "CMS z edytowalnymi polami treści",
            "Konfiguracja SEO — meta, OG, sitemap.xml, robots.txt",
            "Audyt wydajności — Lighthouse, Core Web Vitals",
            "Checklista wdrożeniowa — przekierowania, analityka, trackowanie, formularze",
            "Dokumentacja wdrożeniowa — jak zespół samodzielnie zarządza treścią"
          ],
          best_for: "Firmy, które potrzebują wydajnej, konwertującej strony niewymagającej developera przy każdej zmianie tekstu."
        },
        {
          title: "UX Produktu Cyfrowego",
          description: "Kompleksowy UX/UI od zdefiniowania problemu do gotowego projektu dla dev.",
          output: "Prototyp + system UI + specyfikacja. Dev ma jedno źródło prawdy, nie luźne makiety.",
          includes: [
            "Flow + architektura",
            "System UI + prototyp",
            "Specyfikacja dev-ready + QA",
            "Dokumentacja komponentów",
            "Synteza badań z użytkownikami"
          ],
          whats_inside: [
            "Synteza badań — persony, mapy podróży, pain points",
            "Architektura informacji + diagramy flow",
            "Makiety (low/mid-fi) — kluczowe ekrany",
            "Design system UI — komponenty, tokeny, odstępy, kolor, typografia",
            "Klikalny prototyp hi-fi w Figmie",
            "Specyfikacja dla programistów — redlines, stany (hover, aktywne, błędy)",
            "Eksport zasobów + dokumentacja komponentów",
            "Checklista QA dla każdego ekranu"
          ],
          best_for: "Zespoły produktowe budujące lub odświeżające aplikacje, chcące działać szybko bez długu technologicznego."
        },
        {
          title: "System Zasobów Multi-Location",
          description: "Skalowalny zestaw dla marek z wieloma lokalizacjami i ciągłymi potrzebami.",
          output: "Standard centralny + szablony lokalne. 50 punktów dostarcza w marce, 0 briefów na biurku centrali.",
          includes: [
            "Zasady lokalne vs centralne",
            "Szablony wielokrotnego użytku",
            "Paczki dla lokalnych zespołów",
            "Workflow zamawiania assetów",
            "Protokół kontroli jakości"
          ],
          whats_inside: [
            "Dokument z zasadami centrala/lokalne — co edytowalne",
            "Główny zestaw szablonów ze strefami do edycji",
            "Przewodnik wariantów lokalnych (zdjęcia, teksty, ceny, adresy)",
            "Flow zamawiania — formularz, ścieżka akceptacji",
            "Samoobsługowa biblioteka szablonów (Canva / Figma)",
            "Protokół kontroli jakości — jak centrala monitoruje materiały",
            "Paczka wdrożeniowa — zestaw startowy dla nowych punktów",
            "Materiały szkoleniowe — wideo/PDF jak używać systemu"
          ],
          best_for: "Sieci franczyzowe, retail i organizacje, które muszą skalować komunikację bez tworzenia centralnego wąskiego gardła."
        }
      ]`;

// We need to replace the cards arrays in both en and pl objects
const regexEn = /cards:\s*\[[\s\S]*?\](?=\s*,\s*how_we_deliver)/;
const regexPl = /cards:\s*\[[\s\S]*?\](?=\s*,\s*how_we_deliver)/g; // We have two of these, one in en and one in pl

let matchCount = 0;
content = content.replace(regexPl, (match) => {
  if (matchCount === 0) {
    matchCount++;
    return 'cards: ' + enCards;
  } else {
    return 'cards: ' + plCards;
  }
});

fs.writeFileSync(filePath, content);
console.log('Translations updated successfully');
