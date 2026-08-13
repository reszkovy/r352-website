# Specyfikacja: polskie adresy `/pl/` - osobne wdrożenie

Status: **do decyzji**. Nie zaczynać przed akceptacją listy tras (sekcja 2).
Zasada nadrzędna: **nie kopiujemy automatycznie 34 tras.** Wchodzą tylko strony,
które mają realne znaczenie sprzedażowe na rynku polskim.

---

## 1. Dlaczego to jest największa dźwignia

Fakt: cała polska treść **już istnieje** (pełne drzewo `pl:` w `i18n/translations.ts`),
ale nie ma własnych adresów - siedzi za przełącznikiem po stronie klienta, pod tym
samym URL-em co angielska.

Konsekwencja techniczna: Google renderuje JS i widzi polski tekst, ale **nie może
niezależnie zaindeksować i pozycjonować dwóch wersji językowych pod jednym adresem**.
Jedna z nich zawsze przegrywa - dziś polska, bo `title`, `description` i
`WebSite.inLanguage` są angielskie.

Konsekwencja biznesowa: klienci to Benefit, Archicom, Zdrofit, Sonova PL, Kubota,
Podsiadło, Orlen. ICP to polskie firmy 50-500 osób. Kupujący (CMO) szuka po polsku.
Nie mamy czego pokazać na polskie zapytanie.

## 2. Zakres - które trasy wchodzą (do akceptacji)

Kryterium: strona odpowiada na polską intencję zakupową ALBO jest dowodem
potrzebnym w decyzji. Reszta zostaje wyłącznie po angielsku.

### Faza 1 - rdzeń sprzedażowy (rekomendacja: 8 tras)

| Trasa PL | Intencja, którą obsługuje |
|---|---|
| `/pl/` | marka + kategoria; wejście z zapytań brandowych |
| `/pl/uslugi` | „kto to zrobi", porównanie modeli współpracy |
| `/pl/proces` | „jak wygląda współpraca", redukcja ryzyka |
| `/pl/realizacje` | dowód - najczęściej odwiedzane przed kontaktem |
| `/pl/kontakt` | intencja transakcyjna |
| `/pl/brief` | konwersja (płatne wejście) |
| `/pl/branze/fitness-wellness` | sieci klubów - najsilniejszy dowód (Benefit, Zdrofit) |
| `/pl/branze/nieruchomosci` | deweloperzy - drugi filar (Archicom) |

### Faza 2 - warunkowo, po danych z GSC

`/pl/branze/retail-franczyza`, `/pl/branze/siec-placowek-medycznych`,
2-3 case studies o największym potencjale dowodowym (Benefit, Sonova, Archicom).

### Świadomie POZA zakresem

`/pl/journal/*` (treść ekspercka pisana pod EN i Medium), `/pl/glossary`,
`/pl/careers`, `/pl/ai-runners`, `/pl/philosophy`, strony prawne (dopóki draft),
case'y shadow i NDA. Tłumaczenie ich = koszt bez intencji zakupowej.

## 3. Mapa intencji - czego szuka polski kupujący

Do potwierdzenia danymi (GSC / narzędzie słów kluczowych) PRZED pisaniem nagłówków.
Hipotezy robocze, nie fakty:

- „spójność marki w wielu lokalizacjach", „identyfikacja wizualna sieci"
- „produkcja materiałów marketingowych dla sieci"
- „za długie akceptacje kreacji", „chaos w briefach marketingowych"
- „system zarządzania marką", „brand book online", „design system marki"
- „agencja / partner do obsługi marketingu sieci placówek"

Uwaga: „design operations" po polsku ma prawdopodobnie znikomy wolumen. To
**hipoteza**, nie fakt - do sprawdzenia. Polskie nagłówki mają mówić językiem
problemu, nie nazwą kategorii.

## 4. Rozwiązania techniczne

### Routing
- Prefiks `/pl/*`; EN zostaje na obecnych adresach (bez `/en/`), żeby nie
  przekierowywać i nie tracić istniejących sygnałów.
- Slugi **polskie** (`/pl/uslugi`, nie `/pl/services`) - zgodność z zapytaniem.
- Wejście na `/pl/*` ustawia język; przełącznik języka na stronie z parą
  prowadzi na odpowiednik, a nie przeładowuje tę samą treść.

### Canonical i hreflang
- Każdy adres kanonicznie wskazuje **sam siebie** (bez cross-canonical PL→EN).
- Pary `hreflang` wyłącznie tam, gdzie **istnieją oba adresy**:
  `hreflang="en"` → EN, `hreflang="pl"` → PL, wzajemnie zwrotne.
- `x-default` → wersja EN.
- Strona bez odpowiednika **nie dostaje** `hreflang` (zakaz fikcyjnych par).

### Metadane
- `route-meta.mjs` rozszerzone o `titlePl` / `descriptionPl` **tylko dla tras z fazy 1**.
- `WebSite.inLanguage` i `og:locale` zgodne z wersją strony.
- `<html lang>` już działa (naprawione).

### Sitemap i prerender
- Generator ([`scripts/generate-sitemap.mjs`](../scripts/generate-sitemap.mjs)) rozszerzony
  o trasy PL - te same reguły wykluczeń.
- Trasy PL dopisane do listy prerenderu (inaczej bot bez JS dostanie shell).
- Crawler ([`scripts/audit-crawl.mjs`](../scripts/audit-crawl.mjs)) rozszerzony o kontrolę
  wzajemności `hreflang` (para musi wskazywać na siebie z obu stron).

## 5. Koszt i ryzyko

| Pozycja | Szacunek |
|---|---|
| Routing + przełącznik + canonical/hreflang | 0,5 dnia |
| PL meta dla 8 tras (do Twojej akceptacji copy) | 0,25 dnia |
| Sitemap + prerender + testy crawlera | 0,25 dnia |
| Weryfikacja slugów pod realne zapytania | zależne od danych GSC |
| **Razem faza 1** | **~1 dzień roboczy** |

Ryzyka:
- **Duplikacja treści**, jeśli `hreflang` będzie niepełny lub niezwrotny - dlatego
  kontrola w crawlerze jest częścią zakresu, nie dodatkiem.
- **Rozjazd tłumaczeń** - PL i EN mogą się rozjechać przy kolejnych zmianach copy.
- Slugi zmienione po publikacji = przekierowania. Ustalić je raz, na starcie.

## 6. Kolejność wykonania

1. Akceptacja listy tras (sekcja 2) i slugów.
2. Dane z GSC - potwierdzenie/odrzucenie hipotez intencji (sekcja 3).
3. Implementacja techniczna (routing, hreflang, meta, sitemap, prerender).
4. Crawler zielony lokalnie → wdrożenie.
5. GSC: przesłanie sitemapy, inspekcja 8 polskich adresów.
6. Po 4-6 tygodniach: decyzja o fazie 2 na podstawie danych, nie przeczuć.
