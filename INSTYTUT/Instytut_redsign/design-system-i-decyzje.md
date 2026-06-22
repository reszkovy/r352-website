# Karta produktowa Instytut Kawy — design system + decyzje

Prototyp: `karta-produktowa-instytut-kawy.html` (otwórz w przeglądarce, zmień szerokość okna → widok mobilny). Pojedynczy plik HTML/CSS/JS, gotowy jako referencja dla developera.

## Design system (wyekstrahowany z instytutkawy.pl)

Tokeny pobrane z żywej strony, nie wymyślone — zachowują spójność wizualną.

| Token | Wartość | Zastosowanie |
|---|---|---|
| `--plum` | `#73334D` | Nagłówki (Oswald), główny kolor marki |
| `--green` / `--green-700` | `#7CAE8E` / `#4C7A5F` | Akcent, linki, paski, ramki aktywne |
| `--ink` | `#1A1A1A` | Tekst, przycisk CTA |
| `--ink-soft` | `#6B655F` | Tekst drugorzędny |
| `--cream` / `--cream-2` | `#FAF6EF` / `#F4EEE3` | Ciepłe panele, tło zdjęcia |
| `--line` | `#E8E2D9` | Obrysy |
| Tinty smaku | gold `#DFC33E`, clay `#B4665B`, brick `#C44A3D`, moss `#6B7A59` | Kropki/kategorie nut smakowych (te same, których strona używa dziś) |

**Typografia:** nagłówki `Oswald` 700 (uppercase, jak na stronie) · tekst `Avenir` → fallback `Nunito Sans`.
**Przycisk:** czarny, prostokątny — tak jak obecne „Dodaj do koszyka" na stronie (hover → plum).
**Skala:** radius 6/10/16 px, spacing 8-pkt, 3 poziomy cienia.

## Mapowanie briefu → realizacja

**Część 1 — układ:**
- Zdjęcie po lewej, blok zakupowy po prawej (desktop) → na mobile pionowo. ✓
- Krótka tabelka parametrów **przy cenie, zostaje też na mobile** (jest w bloku zakupowym, nie ucieka w dół). ✓
- Tabelka zawiera: nuty, sposób parzenia, **stopień palenia (nowe)**, **kraj (nowe) + region**, **rodzaj (nowe)** — wartości są linkami do tagów. ✓
- Ikony profilu smakowego + metody parzenia, klikalne → tagi. ✓
- Opis raz, **ujednolicony z tabelką** (poprawione: 1200–1800 m + średnia kwasowość, zamiast sprzecznych 1600 m / niska). ✓
- Pełna specyfikacja w sekcji rozwijanej + **skład % dla mieszanek** (pasek). ✓
- „Kawa z Kostaryki" — unikalna treść zostaje. ✓
- „Przechowywanie i świeżość" schowane w rozwijanej sekcji (de-duplikacja → lepsze SEO). ✓

**Część 2 — priorytety wdrożenia:**
- Oceny i opinie klientów (ocena, rozkład gwiazdek, recenzje). ✓
- Profil smakowy + metody jako ikony na górze. ✓
- Wyraźna wysyłka „zamów do 13:00 — wyślemy dziś" + koszt przy cenie. ✓
- Jedna sekcja polecanych akcesoriów (kawa + sprzęt do jej parzenia). ✓

**Nice-to-have (zrobione):** linki do bloga, przepis parzenia (taby zależne od metody), paski intensywności (kwasowość/słodycz/gorycz).

## Dobre praktyki przeniesione z naszych projektów
- Tokenizacja kolorów/typografii w `:root` (jak Design System v2.0 w DailyFruits) — jeden punkt zmiany.
- Inline SVG zamiast plików ikon — ostre, lekkie, jeden plik.
- Mobile-first sticky bar z ceną + CTA (nowoczesny e-commerce).
- Progressive disclosure: powtarzalne treści w `<details>` (krótsza karta, czystsze SEO).

## Decyzje do potwierdzenia
- **CTA:** zostawiłem czerń marki. Alternatywa: zielony `--green-700` (mocniejszy w e-commerce). Do A/B.
- **Stopień palenia** Kostaryki ustawiłem demonstracyjnie na „jasny" (strona dziś tego nie podaje) — do uzupełnienia w danych produktu.
- Dane opinii/akcesoriów/przepisów są przykładowe — do podpięcia pod realne źródła (recenzje + dane dla Google).
