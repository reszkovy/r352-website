# Karta produktowa jako system — produktyzacja

Cel: jedna karta przestaje być projektem, staje się **wzorcem**, z którego renderuje się całe ~200+ SKU, a wzorzec można odsprzedać kolejnym klientom (fitness/retail). To przejście z liniowego projektu na powtarzalny produkt z marżą.

## 1. Model danych → komponent (mapowanie WooCommerce)

Każde pole karty pochodzi z jednego źródła w WooCommerce. Brak ręcznego składania kart.

| Element UI | Pole / źródło WooCommerce | Uwagi |
|---|---|---|
| Nazwa, opis | `post_title`, `post_content` | opis 1× — spójny z tabelką (walidacja) |
| Cena, warianty (waga) | `variations` + `price` | cena/100 g liczona automatycznie z gramatury |
| Subskrypcja −10% | atrybut `subscription` / WooCommerce Subscriptions | przelicznik w jednym miejscu |
| Tabelka kluczowa (profil, parzenie, palenie, kraj+region, rodzaj) | atrybuty produktu (`pa_*`) | każda wartość = link do `/tag-produktu/...` |
| Ikony profilu/metody | atrybuty `pa_nuty`, `pa_metoda` → mapa ikon | ikona dobierana po slug atrybutu |
| Paski intensywności | `acf: kwasowosc/slodycz/gorycz` (0–5) | |
| Pełna specyfikacja | atrybuty (region, odmiana, wysokość, obróbka, waga, forma) | |
| Skład % (mieszanki) | `acf: sklad[]` | sekcja pokazywana tylko gdy rodzaj = mieszanka |
| „Kawa z [kraju]" | `acf` per kraj (współdzielone) | unikalna treść na kraj, nie na SKU |
| Przechowywanie i świeżość | blok globalny (1×) | współdzielony — lepsze SEO, krótsza karta |
| Przepis parzenia | szablon zależny od `pa_palenie` + metody | parametry per metoda |
| Oceny i opinie | wtyczka opinii → `AggregateRating` | wpięte w JSON-LD |
| Akcesoria / zestaw | `cross_sells` / reguła (kawa + sprzęt do jej metody) | bundle −10% liczony automatycznie |
| Blog „Do poczytania" | reguła: posty z tagiem metody/pochodzenia | |

## 2. Tokeny (jedno źródło prawdy)

Kolory, typografia, radius, spacing w `:root` (jak w prototypie). Zmiana marki = zmiana tokenów, nie 200 kart.
- Marka **kanciasta** (radius 0) — wyjątek: interaktywne pille/chipy (waga, tagi, dropdown) są zaokrąglone (`999px`) jako świadomy akcent.
- Paleta wyekstrahowana z żywej strony: `--plum #73334D`, `--green #7CAE8E`, `--ink #1A1A1A`, tinty smaku (gold/clay/brick/moss).
- Typografia: Oswald (nagłówki) / Avenir → Nunito Sans (tekst).

## 3. Warstwa jakości (wbudowana w szablon, nie per karta)

- **SEO**: JSON-LD `Product` + `AggregateRating` + `Offer` + `BreadcrumbList` + `FAQPage` generowane z pól → gwiazdki i FAQ w Google na każdym SKU.
- **Dostępność (WCAG AA)**: dropdown i taby obsługiwane klawiaturą, `focus-visible`, ARIA — raz w komponencie, działa wszędzie.
- **Walidacja spójności**: opis vs tabelka (np. wysokość, kwasowość) — reguła blokująca rozjazd treści.

## 4. Dlaczego to dźwignia (nie estetyka)

- **Skala**: 1 wzorzec → 200+ kart bez ręcznej pracy. Nowe SKU = uzupełnienie pól.
- **KPI**: subskrypcja (LTV), cross-sell/bundle (AOV), JSON-LD (ruch organiczny), świeżość/wysyłka „do 13:00" (konwersja).
- **Powtarzalność**: ten sam silnik (tokeny + mapowanie pól + warstwa jakości) przenosisz na kolejnych multi-lokalizacyjnych klientów — to jest produkt, nie usługa.

## 5. Następne kroki wdrożeniowe

1. Eksport tokenów do `tokens.json` (źródło dla CSS + Figma).
2. Szablon WooCommerce (single-product) konsumujący pola wg tabeli z pkt 1.
3. Mapa ikon `slug atrybutu → ikona`.
4. Reguły: bundle, cross-sell, blog, sekcja składu (warunkowa).
5. Pilotaż na 5 SKU → pomiar KPI (konwersja, AOV, CTR z Google) → rollout na katalog.
