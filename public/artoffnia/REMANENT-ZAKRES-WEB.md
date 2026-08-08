# ARToffNIA — remanent zakresu WEB (26.07.2026)

## A. Szablony do zaprojektowania: 17 · **ZROBIONE: 17** · zostały: 0
> Aktualizacja 26.07 wieczór — sprint domknął wszystkie brakujące szablony.

| # | Szablon | Status | Instancji na produkcji |
|---|---|---|---|
| 1 | Strona główna (ATF + katalog: lista + kalendarz tygodnia) | ✅ demo | 1 |
| 2 | Landing grupy wiekowej | ✅ demo | 4 |
| 3 | Landing zajęć (z rezerwacją) | ✅ demo | **43** |
| 4 | Obozy i ferie — lista | ✅ demo | 1 |
| 5 | Projekt/obóz — podstrona edycji (`projekt.html?id=`) | ✅ demo (5 projektów) | ~6 aktywnych + archiwum |
| 6 | Cennik | ✅ demo | 1 |
| 7 | Zapisy (formularz z preselekcją) | ✅ demo | 1 |
| 8 | Fundacja (misja + liczby + pracownie) | ✅ demo | 1 |
| 9 | Kadra — pełne biogramy (`kadra.html`) | ✅ demo (20 osób) | 1 (~15 osób) |
| 10 | Kontakt | ✅ demo | 1 |
| 11 | Wynajem sal | ✅ demo | 1 |
| 12 | Aktualności — lista | ✅ demo | 1 |
| 13 | Wpis aktualności (`news.html?id=`) | ✅ demo (4 wpisy) | bieżące, ~20/rok |
| 14 | Galeria — lista fotorelacji | ✅ demo | 1 |
| 15 | Album galerii + lightbox (`album.html?id=`) | ✅ demo (6 albumów, 48 zdjęć) | ~60 w archiwum od 2016 |
| 16 | Strona dokumentu (statut/standardy/wspieraj) | ✅ demo | 3 + PDF-y |
| 17 | 404 | ✅ demo | 2 |

**Komponenty współdzielone (zrobione):** mega menu z animacją, stopka 5-kolumnowa, kalendarz tygodnia, system pigułek/filtrów, karty zajęć, baza `zajecia.js` (jedno źródło), sygnet+favicon.

## B. Skala serwisu na produkcji
Stara strona: ~95 podstron (mirror w `materialy-stara-strona/`). Nowy serwis: **~110–150 URL-i**, w tym 43 landingi zajęć i 4 landingi grup generowane z szablonów + decyzyjne archiwum (projekty 2018–2025 i galerie: przenosić w szablon czy zostawić jako archiwum linkowane).

## C. Zakres prac poza projektowaniem szablonów
1. **Treści** — migracja z mirrora: opisy 43 zajęć → landingi (teksty SĄ w mirrorze), biogramy kadry, opisy 6 projektów 2026, dokumenty; selekcja zdjęć z ~85 katalogów.
2. **Integracje** — wysyłka formularzy (mail do biura + kopia), ActiveNow (poz. 1: linki per grupa → poz. 2: embed formularzy i lekcje próbne → poz. 3: API/synchronizacja grafiku), GA4+GTM (eventy już wbudowane), mapy dojazdu.
3. **SEO/tech** — mapa przekierowań 301 ze ~95 starych URL-i (krytyczne przy zmianie struktury!), sitemap, meta per szablon, wydajność (lazy-loading zdjęć), audyt dostępności (kontrasty, aria dla kalendarza).
4. **Edytowalność** — decyzja klienta: prosty CMS (wzorzec r352-deploy) vs statyczna + opieka sezonowa.
5. **Szkolenie + przekazanie** — instrukcja aktualizacji `zajecia.js`/treści, mini-księga systemu (logo, kolory grup, pigułki, foto).

## D. Estymata od stanu demo do produkcji
| Etap | Dni robocze |
|---|---|
| ~~4 brakujące szablony + 404~~ ✅ zrobione w sprincie 26.07 | 0 |
| Build produkcyjny + edytowalność (CMS-lite) | 4–6 |
| Migracja treści i zdjęć | 3–4 |
| Integracje (formularze, ActiveNow 1–2, GA4) | 2–3 |
| SEO: przekierowania 301, sitemap, meta | 1–2 |
| QA, dostępność, testy mobile | 2 |
| **Razem** | **12–17 dni** (było 14–19; sprint zdjął 2 dni) |

## E. Decyzje po stronie fundacji (blokujące)
1. Archiwum projektów/galerii: migracja czy link do archiwum? (wpływ ±3 dni)
2. CMS czy opieka sezonowa? 3. Zakres integracji ActiveNow (plan/API). 4. Materiały: wideo hero, zdjęcia z galerii, potwierdzenie grafiku 2026/27. 5. Wersja EN — rekomendacja: nie (stara też nie ma).


---
## F. Zrobione w sprincie 26.07 (wieczór)
- **17/17 szablonów** — dołożone: projekt/obóz, kadra (20 biogramów), wpis aktualności, album z lightboxem, 404.
- **Treść:** 43/43 opisów zajęć wlanych z mirrora do `zajecia.js` (koniec zaślepek na landingach).
- **Zdjęcia:** 22 w `foto/` + 48 w `foto/albumy/` — galeria, obozy, fundacja, wynajem, aktualności i landingi grup mają prawdziwe zdjęcia zamiast placeholderów.
- **Multiselekt zapisów + kalkulator rabatu** — wybór wielu zajęć, na żywo liczona kwota z rabatami −20%/−50% i kwotą oszczędności (np. 3 zajęcia: 494 zł zamiast 620 zł).
- **Kampanijne spoty** dla 4 grup w konwencji hero (płaskie figury sygnetu, przezroczyste tło, zero liter).
- **Korekta danych 1:1:** grafik seniorów na Sybiraków (pon + czw, było tylko czw).
