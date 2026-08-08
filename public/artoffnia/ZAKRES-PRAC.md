# Zakres prac — serwis Fundacji Tańca i Sztuki ARToffNIA

Dokument opisuje przedmiot zlecenia: architekturę adresów, szablony do zaprojektowania, funkcje do wykonania, treści do przeniesienia oraz warstwę techniczną wdrożenia. Liczby wynikają z inwentaryzacji dotychczasowego serwisu i oferty fundacji.

| | |
|---|---|
| Szablonów do zaprojektowania | **20** |
| Adresów docelowych | **201** |
| Rekordów treści do migracji | **163** |
| Funkcji interaktywnych | **12** |
| Przekierowań do zmapowania | **197** |

## A. Architektura adresów

Serwis oparty na szablonach zasilanych jedną bazą danych. Trzy z nich wygenerują 183 z 201 adresów, dzięki czemu podstron nie projektuje się i nie utrzymuje pojedynczo.

| Szablon | Adres | Instancji | Zakres |
|---|---|---|---|
| **Strona główna** | `index.html` | 1 | Nagłówek z zapowiedzią oferty, katalog wszystkich zajęć z filtrami, kalendarz tygodnia, wejścia do grup wiekowych |
| **Landingi grup wiekowych** | `grupa.html?g=` | 4 | Dzieci 4–12 · Nastolatki 13–17 · Dorośli 18+ · Seniorzy 60+ — osobne strony docelowe dla kampanii reklamowych |
| **Landingi zajęć** | `zajecie.html?id=` | 52 | Taniec 35 · Ruch 13 · Teatr 4 — opis, terminy, lokalizacja, prowadzący, cena, zdjęcie, rezerwacja miejsca |
| **Zapisy** | `zapisy.html` | 1 | Wybór wielu zajęć naraz, kalkulator rabatu za drugie i kolejne zajęcia, wskazanie kogo dotyczy zgłoszenie |
| **Cennik** | `cennik.html` | 1 | Stawki miesięczne, zasady rabatowe, opłaty dodatkowe |
| **Aktualności — lista** | `aktualnosci.html` | 1 | Lista wpisów z filtrem po roku i doładowywaniem |
| **Aktualności — wpis** | `news.html?id=` | 78 | Archiwum 2019–2026: warsztaty, spektakle, turnieje, nabory, komunikaty |
| **Obozy i ferie — lista** | `obozy.html` | 1 | Aktualne edycje oraz archiwum z filtrem typu |
| **Projekt, obóz, półkolonia** | `projekt.html?id=` | 32 | Lato w mieście 11 · Ferie 10 · Obozy wyjazdowe 8 · Projekty artystyczne 3 — program, terminy, kadra, warunki |
| **Galeria — lista** | `galeria.html` | 1 | Siatka wszystkich fotorelacji z okładkami |
| **Album** | `album.html?id=` | 53 | 874 zdjęcia, powiększanie na pełny ekran, nawigacja klawiaturą, ładowanie na żądanie |
| **Fundacja** | `fundacja.html` | 1 | Misja, liczby, pracownie, skrót kadry, formalności i dokumenty |
| **Kadra** | `kadra.html` | 1 | Pełne biogramy pedagogów, choreografów i tancerzy |
| **Kontakt** | `kontakt.html` | 1 | Dane biura, dwie lokalizacje z mapami w stylistyce marki, nawigacja dojazdu |
| **Wynajem sal** | `wynajem.html` | 1 | Opis sal, warunki wynajmu, zapytanie |
| **Dokumenty** | `statut.html · standardy.html · wspieraj.html` | 3 | Statut (7 działów, 29 paragrafów) i Standardy ochrony małoletnich (14 rozdziałów, 49 paragrafów) ze spisem treści i kotwicami; strona mecenatu |
| **Strona błędu** | `404.html` | 1 | Przekierowanie użytkownika do katalogu zajęć |

## B. Funkcje do wykonania


### Wyszukiwanie i wybór zajęć

**B1. Katalog z filtrami wielokrotnymi** — Filtrowanie po grupie wiekowej, kategorii, lokalizacji i porze dnia. Filtry łączą się ze sobą, a stan wyboru zapisuje się w adresie strony, dzięki czemu wynik wyszukiwania można wysłać linkiem.

**B2. Kalendarz tygodnia** — Widok grafiku w układzie dni i godzin, z obsługą zajęć nakładających się w czasie. Alternatywa dla listy, przeznaczona dla osób planujących tydzień.

**B3. Wejścia dla grup wiekowych** — Ścieżka prowadząca od pytania „czego szukam i dla kogo” do listy pasujących zajęć, bez konieczności znajomości nazw zajęć.


### Zapisy

**B4. Zapis na wiele zajęć jednocześnie** — Wybór dowolnej liczby zajęć z wyszukiwarką, podglądem wybranych pozycji i sumą do zapłaty aktualizowaną na bieżąco.

**B5. Kalkulator rabatu** — Automatyczne naliczanie zniżki za drugie i kolejne zajęcia zgodnie z cennikiem, z pokazaniem kwoty oszczędności. Zajęcia rozliczane bezpośrednio u prowadzącego wyłączone z rabatu.

**B6. Rezerwacja z poziomu strony zajęć** — Formularz dostosowany do trybu naboru: zapis otwarty, zgłoszenie na audycję albo kontakt bezpośrednio do prowadzącego.

**B7. Propozycje alternatywne** — Przy grupach zamkniętych serwis podpowiada zajęcia z tej samej kategorii, dopasowane wiekiem, żeby ścieżka użytkownika nie kończyła się ślepo.


### Nawigacja i kontakt

**B8. Mega menu** — Pełna mapa oferty w jednym otwarciu: zajęcia pogrupowane kategoriami, wejścia wiekowe, obozy, informacje i dokumenty. Numer telefonu i przycisk zapisu w pasku górnym.

**B9. Stały dostęp do kontaktu** — Pływający numer telefonu oraz przejście do wyszukiwarki zajęć, obecne na każdej podstronie.

**B10. Mapy lokalizacji** — Dwie mapy w kolorystyce marki, oparte na rzeczywistych danych kartograficznych, z pinezką na dokładnych współrzędnych i przejściem do nawigacji.


### Treść

**B11. Archiwum z filtrami** — Aktualności filtrowane rokiem, projekty typem wydarzenia, galerie w jednej siatce. Treść wpisów ładowana dopiero przy wejściu na podstronę.

**B12. Przeglądarka zdjęć** — Powiększanie na pełny ekran, przechodzenie strzałkami, licznik pozycji, zamykanie klawiszem Escape.

## C. Migracja treści

Materiał z dotychczasowego serwisu fundacji do przeniesienia bez zmian merytorycznych.

| Rodzaj | Zakres | Rekordów |
|---|---|---|
| **Opisy zajęć** | opis, grupa wiekowa, terminy, lokalizacja, prowadzący, cena, tryb naboru | 52 |
| **Aktualności** | archiwum 2019–2026 z zachowaniem formatowania i odnośników | 78 |
| **Fotorelacje** | spektakle, turnieje, obozy, wnętrza pracowni | 53 |
| **Projekty, obozy, ferie** | programy edycji 2018–2026 wraz z kadrą i warunkami | 32 |
| **Biogramy kadry** | pełne noty pedagogów i choreografów | 20 |
| **Dokumenty** | statut, standardy ochrony małoletnich, regulamin | 3 |
| **Zdjęcia** | selekcja, kadrowanie i optymalizacja materiału z archiwum | 1046 |

## D. Warstwa techniczna

| Element | Zakres |
|---|---|
| **Przekierowania 301** | zmapowanie 197 adresów dotychczasowego serwisu na odpowiedniki w nowym, w formacie właściwym dla wybranego hostingu |
| **Mapa witryny** | 201 adresów, generowana z bazy danych serwisu |
| **Metadane** | tytuł, opis, adres kanoniczny i podgląd w mediach społecznościowych dla każdego szablonu; szablony parametryczne ustawiają je osobno dla każdej instancji |
| **Obrazy** | konwersja do formatu WebP, wymiary dopasowane do miejsca użycia, ładowanie na żądanie |
| **Wydajność** | docelowo poniżej 100 kB transferu na wejściu |
| **Analityka** | zdarzenia na całej ścieżce zapisu: wejście na landing grupy, kliknięcie zapisu, wysłanie zgłoszenia, kliknięcie telefonu |
| **Zapisy** | integracja z systemem ActiveNow używanym przez fundację, konfigurowana w jednym miejscu |
| **Dostępność** | kontrasty, opisy elementów sterujących, nawigacja klawiaturą |
| **Kontrola jakości** | skrypt sprawdzający odnośniki, kompletność zdjęć, metadane, składnię i spójność danych |

## E. Materiały i decyzje po stronie fundacji

| Element | Przeznaczenie |
|---|---|
| **Wideo** | nagłówek strony głównej |
| **Portrety kadry** | strona kadry i skrót na stronie fundacji |
| **Grafik na sezon** | terminy zajęć w katalogu i kalendarzu |
| **Dostęp do ActiveNow** | uruchomienie zapisów |
| **Identyfikator analityki** | pomiar skuteczności kampanii |
| **Decyzja o edytowalności** | panel do samodzielnej aktualizacji treści albo opieka sezonowa |
| **Decyzja o zakresie archiwum** | ile materiału z lat 2018–2026 trafia do nowego serwisu, a ile pozostaje archiwum |

> **Zasada redakcyjna.** Treści merytoryczne — opisy zajęć, ceny, terminy, biogramy i dokumenty — przenoszone są bez zmian. Teksty tworzone na potrzeby nowego serwisu ograniczają się do nagłówków i elementów nawigacyjnych i prowadzone są w osobnym rejestrze, tak aby w każdej chwili dało się wskazać, co pochodzi od fundacji, a co powstało w projekcie.

---

## Załącznik: pełna lista adresów

### Strony stałe (16)

- `/index.html`
- `/zapisy.html`
- `/cennik.html`
- `/aktualnosci.html`
- `/obozy.html`
- `/galeria.html`
- `/fundacja.html`
- `/kadra.html`
- `/kontakt.html`
- `/wynajem.html`
- `/statut.html`
- `/standardy.html`
- `/wspieraj.html`
- `/404.html`
- `/sitemap.xml`
- `/robots.txt`

### Landingi grup wiekowych (4)

- `/grupa.html?g=dzieci` — Dzieci 4–12
- `/grupa.html?g=nastolatki` — Nastolatki 13–17
- `/grupa.html?g=dorosli` — Dorośli 18+
- `/grupa.html?g=seniorzy` — Seniorzy 60+

### Landingi zajęć (52)


**Taniec (35)**

- `/zajecie.html?id=pryzmat-p1-rytmiczno-taneczne` — Pryzmat P1 · rytmiczno-taneczne
- `/zajecie.html?id=pryzmat-p2-rytmiczno-taneczne` — Pryzmat P2 · rytmiczno-taneczne
- `/zajecie.html?id=pryzmat-p3-rytmika-i-klasyka` — Pryzmat P3 · rytmika i klasyka
- `/zajecie.html?id=pryzmat-p5-technika-akrobatyka` — Pryzmat P5 · technika + akrobatyka
- `/zajecie.html?id=pryzmat-p6-technika-i-klasyka` — Pryzmat P6 · technika i klasyka
- `/zajecie.html?id=pryzmat-p7-klasyka-i-repertuar` — Pryzmat P7 · klasyka i repertuar
- `/zajecie.html?id=pryzmat-p8-technika-i-klasyka` — Pryzmat P8 · technika i klasyka
- `/zajecie.html?id=pryzmat-prepiko-klasyka-i-repertuar` — Pryzmat prePIKO · klasyka i repertuar
- `/zajecie.html?id=pryzmat-mikro-grupa-reprezentacyjna` — Pryzmat MIKRO · grupa reprezentacyjna
- `/zajecie.html?id=pryzmat-mini-grupa-reprezentacyjna` — Pryzmat MINI · grupa reprezentacyjna
- `/zajecie.html?id=pryzmat-mini-2-grupa-reprezentacyjna` — Pryzmat MINI 2 · grupa reprezentacyjna
- `/zajecie.html?id=pryzmat-prejunior` — Pryzmat preJUNIOR
- `/zajecie.html?id=pryzmat-junior-grupa-reprezentacyjna` — Pryzmat JUNIOR · grupa reprezentacyjna
- `/zajecie.html?id=pryzmat-junior-2-grupa-reprezentacyjna` — Pryzmat JUNIOR 2 · grupa reprezentacyjna
- `/zajecie.html?id=pryzmat-dinozaury-30-wspolczesny` — Pryzmat Dinozaury 30+ · współczesny
- `/zajecie.html?id=pryzmat-dinozaury-40-wspolczesny` — Pryzmat Dinozaury 40+ · współczesny
- `/zajecie.html?id=mix-dance-7` — MIX DANCE 7+
- `/zajecie.html?id=balet-open` — Balet OPEN
- `/zajecie.html?id=jazz-open` — Jazz OPEN
- `/zajecie.html?id=taniec-wspolczesny-open-13` — Taniec współczesny OPEN 13+
- `/zajecie.html?id=flamenco` — Flamenco
- `/zajecie.html?id=hip-hop-popping-podstawowa` — Hip-hop / Popping · podstawowa
- `/zajecie.html?id=hip-hop-sredniozaawansowana` — Hip-hop · średniozaawansowana
- `/zajecie.html?id=hip-hop-zaawansowana` — Hip-hop · zaawansowana
- `/zajecie.html?id=hip-hop-dorosli` — Hip-hop dorośli
- `/zajecie.html?id=street-dance-30-poczatkujaca` — Street dance 30+ · początkująca
- `/zajecie.html?id=breakdance-7` — Breakdance 7+
- `/zajecie.html?id=popping-basic` — Popping basic
- `/zajecie.html?id=popping-pro` — Popping pro
- `/zajecie.html?id=high-heels` — High Heels
- `/zajecie.html?id=improwizacja-taneczna-16` — Improwizacja taneczna 16+
- `/zajecie.html?id=disco-dance-dio-kids` — Disco Dance · DIO Kids
- `/zajecie.html?id=disco-dance-dio-stars` — Disco Dance · DIO Stars
- `/zajecie.html?id=disco-dance-dio-young-stars` — Disco Dance · DIO Young Stars
- `/zajecie.html?id=lekcje-indywidualne-tanca` — Lekcje indywidualne tańca

**Ruch (13)**

- `/zajecie.html?id=akrobatyka-i-tricking-5` — Akrobatyka i tricking 5+
- `/zajecie.html?id=akrobatyka-i-tricking-11` — Akrobatyka i tricking 11+
- `/zajecie.html?id=salsation` — Salsation®
- `/zajecie.html?id=latina-power` — Latina Power
- `/zajecie.html?id=body-balance` — Body Balance
- `/zajecie.html?id=joga` — Joga
- `/zajecie.html?id=joga-kundalini-poranna` — Joga Kundalini · poranna
- `/zajecie.html?id=zoga-movement` — ZOGA Movement
- `/zajecie.html?id=pilates` — Pilates
- `/zajecie.html?id=fitness-dla-doroslych` — Fitness dla dorosłych
- `/zajecie.html?id=gimnastyka-dla-seniorow-60-sybirakow` — Gimnastyka dla seniorów 60+ · Sybiraków
- `/zajecie.html?id=gimnastyka-dla-seniorow-60-smetka` — Gimnastyka dla seniorów 60+ · Smętka
- `/zajecie.html?id=gimnastyka-slowianska-dla-kobiet` — Gimnastyka słowiańska dla kobiet

**Teatr (4)**

- `/zajecie.html?id=aktorskie-dla-mlodziezy-11` — Aktorskie dla młodzieży 11+
- `/zajecie.html?id=aktorskie-dla-doroslych` — Aktorskie dla dorosłych
- `/zajecie.html?id=przygotowanie-do-szkol-teatralnych` — Przygotowanie do szkół teatralnych
- `/zajecie.html?id=aktorskie-indywidualne-dzieci-i-mlodziez` — Aktorskie indywidualne · dzieci i młodzież

### Projekty, obozy i ferie (32)

- `/projekt.html?id=aktorskie-lato-w-miecie-2026` — Aktorskie LATO w mieście 2026
- `/projekt.html?id=zimowy-tydzie-w-artoffni-taniec-zabawa-edukacja` — FERIE ZIMOWE 2026 - zimowy tydzień w ARToffNI - taniec, zabawa, edukacja
- `/projekt.html?id=ferie-przez-pryzmat-taca-2026` — Ferie przez PRYZMAT TAŃCA 2026
- `/projekt.html?id=letni-obz-tanecznoartystyczny-wilimy-2026` — LETNI OBÓZ TANECZNO-ARTYSTYCZNY WILIMY 2026
- `/projekt.html?id=taneczne-lato-w-miecie-2026` — Taneczne LATO w mieście 2026
- `/projekt.html?id=ferie-przez-pryzmat-taca-2025` — Ferie przez PRYZMAT TAŃCA 2025
- `/projekt.html?id=letni-obz-tanecznoartystyczny-wilimy-2025` — LETNI OBÓZ TANECZNO-ARTYSTYCZNY WILIMY 2025
- `/projekt.html?id=taneczne-lato-w-miescie-2025` — Taneczne LATO w mieście 2025
- `/projekt.html?id=ferie-przez-pryzmat-taca-2024` — FERIE przez PRYZMAT TAŃCA 2024
- `/projekt.html?id=letni-oboz-taneczno-artystyczny-kretowiny-2024` — LETNI OBÓZ TANECZNO-ARTYSTYCZNY KRETOWINY 2024
- `/projekt.html?id=ferie-przez-pryzmat-tanca-2023` — FERIE przez PRYZMAT TAŃCA 2023
- `/projekt.html?id=letni-oboz-taneczno-artystyczny-kretowiny2023` — LETNI OBÓZ TANECZNO-ARTYSTYCZNY KRETOWINY 2023
- `/projekt.html?id=letni-stacjonarny-projekt-artystyczny-naturalnie-sztuka` — Letni stacjonarny projekt artystyczny natura(lnie) sztuka 2023
- `/projekt.html?id=ferie-przez-pryzmat-taca-2801-2022019` — FERIE PRZEZ PRYZMAT TAŃCA 27.01. - 01.02.2020
- `/projekt.html?id=ferie-przez-pryzmat-tanca-2022` — FERIE przez PRYZMAT TAŃCA 31.01 - 05.02.2022
- `/projekt.html?id=obz-taneczny-jantar-2022` — OBÓZ TANECZNY JANTAR 2022
- `/projekt.html?id=lato-przez-pryzmat-sztuk-ulicznych-2021` — LATO PRZEZ PRYZMAT SZTUK ULICZNYCH 2021
- `/projekt.html?id=lato-przez-pryzmat-taca-i-sztuk-roznych-2021` — LATO PRZEZ PRYZMAT TAŃCA I SZTUK RÓŻNYCH 2021
- `/projekt.html?id=obz-taneczny-mierki-2021` — OBÓZ TANECZNY MIERKI 2021
- `/projekt.html?id=projekt-przez-pryzmat-taca-2021` — PROJEKT PRZEZ PRYZMAT TAŃCA 11-16 stycznia 2021
- `/projekt.html?id=ferie-przez-pryzmat-sztuk-ronych-21-25012019` — FERIE PRZEZ PRYZMAT SZTUK RÓŻNYCH 20-24.01.2020
- `/projekt.html?id=ferie-przez-pryzmat-sztuk-ronych-2019` — FERIE PRZEZ PRYZMAT SZTUK RÓŻNYCH 21-25.01.2019
- `/projekt.html?id=ferie-przez-pryzmat-taca-2019` — FERIE PRZEZ PRYZMAT TAŃCA 28.01-2.02.2019
- `/projekt.html?id=c1-lato-przez-pryzmat-taca-i-sztuk-ulicznych-2019` — LATO PRZEZ PRYZMAT SZTUK ULICZNYCH 2019
- `/projekt.html?id=lato-przez-pryzmat-taca-i-sztuk-roznych-2019` — LATO PRZEZ PRYZMAT TAŃCA I SZTUK RÓŻNYCH 2019
- `/projekt.html?id=oboz-taneczny-mierki-2019` — OBÓZ TANECZNY MIERKI 2019
- `/projekt.html?id=lato-przez-pryzmat-taca-i-sztuk-rnych-2018` — Lato przez Pryzmat Tańca i Sztuk Różnych 2018
- `/projekt.html?id=obz-taneczny-mierki-2018-1` — OBÓZ TANECZNY MIERKI 2018
- `/projekt.html?id=inkubator-taca` — Inkubator Tańca
- `/projekt.html?id=wakacyjna-artoffnia-w-tancu-i-ruchu` — WAKACYJNA ARToffNIA w tańcu i ruchu
- `/projekt.html?id=wakacyjna-artoffnia-w-tacu-i-ruchu-copy` — WAKACYJNA ARToffNIA w tańcu i ruchu (Copy)
- `/projekt.html?id=wakacyjne-zajcia-w-artoffni` — WAKACYJNE ZAJĘCIA W ARToffNI

### Galerie (53)

- `/album.html?id=alicja` — „To nie ta bajka, Alicjo (chyba)” (9 zdjęć)
- `/album.html?id=verymerry` — Turniej Very Merry DANCEfloor 2024 (9 zdjęć)
- `/album.html?id=raj` — „Zróbmy sobie RAJ” (9 zdjęć)
- `/album.html?id=granice` — „Granice” (9 zdjęć)
- `/album.html?id=jantar` — Obóz taneczny JANTAR 2022 (9 zdjęć)
- `/album.html?id=sale` — Nasze sale · Sybiraków i Smętka (6 zdjęć)
- `/album.html?id=aktorskie-lato-w-miecie-2026` — Aktorskie LATO w mieście 2026 (8 zdjęć)
- `/album.html?id=aktualnosci-2026-1-19-nowy-rok-nowy-semestr-nowe-moliwoci-za` — Nowy rok, nowy semestr, nowe możliwości - taniec / ruch / sztuka (9 zdjęć)
- `/album.html?id=ferie-przez-pryzmat-sztuk-rnych-2018-1` — Ferie przez PRYZMAT SZTUK RÓŻNYCH 2018 (20 zdjęć)
- `/album.html?id=ferie-przez-pryzmat-taca-2019` — FERIE PRZEZ PRYZMAT TAŃCA 28.01-2.02.2019 (13 zdjęć)
- `/album.html?id=ferie-przez-pryzmat-taca-2023` — FERIE przez PRYZMAT TAŃCA 2023 (20 zdjęć)
- `/album.html?id=ferie-przez-pryzmat-taca-2024` — FERIE przez PRYZMAT TAŃCA 2024 (20 zdjęć)
- `/album.html?id=ferie-przez-pryzmat-taca-2025` — Ferie przez PRYZMAT TAŃCA 2025 (10 zdjęć)
- `/album.html?id=ferie-przez-pryzmat-taca-2801-2022019` — FERIE PRZEZ PRYZMAT TAŃCA 27.01. - 01.02.2020 (20 zdjęć)
- `/album.html?id=ferie-przez-pryzmat-tanca-2022` — FERIE przez PRYZMAT TAŃCA 31.01 - 05.02.2022 (20 zdjęć)
- `/album.html?id=ferie-przez-pryzmat-tanca-2023` — FERIE przez PRYZMAT TAŃCA 2023 (20 zdjęć)
- `/album.html?id=funny-bunny-dancefloor-2503-cz2` — Funny Bunny DANCEfloor 25.03 cz.2 (20 zdjęć)
- `/album.html?id=funny-bunny-dancefloor-250323` — Funny Bunny DANCEfloor 2023 cz.1 (20 zdjęć)
- `/album.html?id=granice-zakoczenie-roku-artystycznego-artoffni-2023` — "Granice" zakończenie roku artystycznego ARToffNI 2023 (20 zdjęć)
- `/album.html?id=jantar-2022-letni-obz-taneczny` — JANTAR 2022 - Letni obóz taneczny (20 zdjęć)
- `/album.html?id=lato-przez-pryzmat-sztuk-ulicznych-2021` — LATO PRZEZ PRYZMAT SZTUK ULICZNYCH 2021 (9 zdjęć)
- `/album.html?id=lato-przez-pryzmat-taca-i-sztuk-rnych-2018` — Lato przez Pryzmat Tańca i Sztuk Różnych 2018 (8 zdjęć)
- `/album.html?id=letni-oboz-taneczno-artystyczny-kretowiny-2024` — LETNI OBÓZ TANECZNO-ARTYSTYCZNY KRETOWINY 2024 (15 zdjęć)
- `/album.html?id=letni-oboz-taneczno-artystyczny-kretowiny2023` — LETNI OBÓZ TANECZNO-ARTYSTYCZNY KRETOWINY 2023 (20 zdjęć)
- `/album.html?id=letni-obz-tanecznoartystyczny-wilimy-2026` — LETNI OBÓZ TANECZNO-ARTYSTYCZNY WILIMY 2026 (19 zdjęć)
- `/album.html?id=oboz-taneczny-mierki-2019` — OBÓZ TANECZNY MIERKI 2019 (20 zdjęć)
- `/album.html?id=obz-mierki-2017` — Obóz MIERKI 2017 (20 zdjęć)
- `/album.html?id=obz-taneczny-jantar-2022` — OBÓZ TANECZNY JANTAR 2022 (20 zdjęć)
- `/album.html?id=obz-taneczny-mierki-2018-1` — OBÓZ TANECZNY MIERKI 2018 (20 zdjęć)
- `/album.html?id=obz-taneczny-mierki-2021` — OBÓZ TANECZNY MIERKI 2021 (19 zdjęć)
- `/album.html?id=od-nowa-zakoczenie-roku-artystycznego-2022-cz-2` — Od-NOWA" zakończenie roku artystycznego 2022 cz. II (20 zdjęć)
- `/album.html?id=odnowa-zakoczenie-roku-artystycznego-2022-cz-1` — "Od-NOWA" zakończenie roku artystycznego 2022 cz. I (20 zdjęć)
- `/album.html?id=projekt-prze-pryzmat-taca-2021` — Projekt przez PRYZMAT TAŃCA 2021 (20 zdjęć)
- `/album.html?id=projekt-przez-pryzmat-taca-2021` — PROJEKT PRZEZ PRYZMAT TAŃCA 11-16 stycznia 2021 (13 zdjęć)
- `/album.html?id=przygotowaniedoegzaminow` — Przygotowanie do egzaminów (8 zdjęć)
- `/album.html?id=reporta-z-zakoczenia-roku-adam-radek-cz-1` — Reportaż z zakończenia roku 2016 (20 zdjęć)
- `/album.html?id=spotkanie-witeczne-2017-cz1` — Spotkanie Świąteczne 2017 (20 zdjęć)
- `/album.html?id=taneczne-lato-w-miescie-2025` — Taneczne LATO w mieście 2025 (11 zdjęć)
- `/album.html?id=the-best-of-queen` — The best of Queen 2015 (20 zdjęć)
- `/album.html?id=to-nie-ta-bajka-alicjo-chyba-zakoczenie-roku-2026-cz-1` — "To nie ta bajka Alicjo (chyba)" zakończenie roku 2026 - cz. 1 (20 zdjęć)
- `/album.html?id=to-nie-ta-bajka-alicjo-chyba-zakoczenie-roku-2026-cz-3` — "To nie ta bajka Alicjo (chyba) - zakończenie roku 2026 cz. 3 (20 zdjęć)
- `/album.html?id=to-nie-ta-bajka-alicjo-chyba-zakoczenie-roku-2026-cz2` — "To nie ta bajka Alicjo (chyba) - zakończenie roku 2026 cz.2 (20 zdjęć)
- `/album.html?id=turniej-taneczny-very-merry-dancefloor-21223-cz-1` — Turniej taneczny Very Merry DANCEfloor 2.12.23_część_1 (20 zdjęć)
- `/album.html?id=turniej-taneczny-very-merry-dancefloor-212-cz-2` — Turniej taneczny Very Merry DANCEfloor_2.12_część_2 (20 zdjęć)
- `/album.html?id=turniej-very-merry-dancefloor-2017` — Turniej Very Merry Dancefloor 2017 (20 zdjęć)
- `/album.html?id=very-merry-2024-cz-i` — Very Merry 2024 - Cz. I (20 zdjęć)
- `/album.html?id=very-merry-2024-cz-ii` — Very Merry 2024 Cz. II - fot. Lidia Dzwolak (20 zdjęć)
- `/album.html?id=wakacyjna-artoffnia-w-tancu-i-ruchu` — WAKACYJNA ARToffNIA w tańcu i ruchu (13 zdjęć)
- `/album.html?id=wszyscy-jestemy-poczeni-zakoczenie-roku-20202021` — Wszyscy jesteśmy połączeni -zakończenie roku 2020/2021 (20 zdjęć)
- `/album.html?id=zimowy-tydzie-w-artoffni-taniec-zabawa-edukacja` — FERIE ZIMOWE 2026 - zimowy tydzień w ARToffNI - taniec, zabawa, edukacja (8 zdjęć)
- `/album.html?id=zrbmy-sobie-raj-zakoczenie-20232024-za-kulisami` — "Zróbmy sobie RAJ". zakończenie 2023/2024 - za kulisami (20 zdjęć)
- `/album.html?id=zrbmy-sobie-raj-zakoczenie-roku-20232024-obsada-1` — "Zróbmy sobie RAJ" - zakończenie roku 2023/2024 - obsada 1 (20 zdjęć)
- `/album.html?id=zrbmy-sobie-raj-zakoczenie-roku-20232024-obsada-2` — "Zróbmy sobie RAJ" - zakończenie roku 2023/2024 - obsada 2 (20 zdjęć)

### Aktualności (78)

- `/news.html?id=2026-6-18-wakacyjne-warsztaty-z-korneli-hauszk-taniec-klasyczny-modern` — Wakacyjne warsztaty z Kornelią Hałuszką - taniec klasyczny + modern jazz 11 lipca 2026 (18 czerwca 2026)
- `/news.html?id=2026-6-10-audycja-do-grup-reprezentacyjnych-pracowni-taca-pryzmat` — AUDYCJA DO GRUP REPREZENTACYJNYCH PRACOWNI TAŃCA PRYZMAT (10 czerwca 2026)
- `/news.html?id=2026-6-2-projekt-taneczny-w-gosowaniu-w-olsztyskim-budecie-obywatelski` — PROJEKTY TANECZNE w GŁOSOWANIU w Olsztyńskim Budżecie Obywatelskim! (2 czerwca 2026)
- `/news.html?id=2026-5-28-wynajmij-sal-na-swoje-zajcia-lub-nawi-sta-wspprac-z-artoffni` — Nawiąż stałą współpracę z ARToffNIĄ jako instrutor lub wynajmij salę na swoje zajęcia! (28 maja 2026)
- `/news.html?id=2026-5-7-cinema-paradiso-w-olsztynie-artoffnia-czci-wyjtkowego-wieczor` — „Cinema Paradiso” w Olsztynie — ARToffNIA częścią wyjątkowego wieczoru (7 maja 2026)
- `/news.html?id=2026-5-5-widowisko-taneczne-to-nie-ta-bajka-alicjo-chyba-w-filharmonii` — Widowisko taneczne „TO NIE TA BAJKA ALICJO (CHYBA)” w Filharmonii Warmińsko-Mazurskiej w Olsztynie 5-6 czerwca 2026 (5 maja 2026)
- `/news.html?id=2026-4-27-praca-w-artoffni` — PRACA w ARToffNI (27 kwietnia 2026)
- `/news.html?id=2026-4-10-flashmob-roztaczmy-olsztyn-vol-2` — FLASHMOB – ROZTAŃCZMY OLSZTYN! Vol. 2 (10 kwietnia 2026)
- `/news.html?id=2026-2-9-otwarte-warsztaty-modern-jazz-z-ann-beker-na-dzie-kobiet-8-ma` — WARSZTATY modern jazz z ANNĄ BEKER - 8 marca 2026 (9 lutego 2026)
- `/news.html?id=2026-2-5-miosny-tydzie-w-artoffni-o-bliskoci-uwanoci-i-byciu-razem` — Miłosny tydzień w ARToffNI - o bliskości, uważności i byciu razem (5 lutego 2026)
- `/news.html?id=2026-1-23-joga-z-asi-otysz-wraca-do-artoffni-start-4-lutego-2026` — Joga z Asią Łotysz wraca do ARToffNI - start 4 lutego 2026 (23 stycznia 2026)
- `/news.html?id=2026-1-22-wystp-taneczny-podczas-finau-wop` — Występ taneczny podczas finału WOŚP (22 stycznia 2026)
- `/news.html?id=2026-1-19-nowy-rok-nowy-semestr-nowe-moliwoci-zacznij-taczy-z-artoffni` — Nowy rok, nowy semestr, nowe możliwości - taniec / ruch / sztuka (21 stycznia 2026)
- `/news.html?id=2026-1-21-nowo-grupowe-zajcia-aktorskie-dla-dorosych-z-ann-mari-kosik` — NOWOŚĆ - GRUPOWE ZAJĘCIA AKTORSKIE DLA DOROSŁYCH z Anną Marią Kosik (21 stycznia 2026)
- `/news.html?id=2026-1-16-grafik-specjalny-grup-pryzmatu-i-artoffni-w-dniach-1901-3001` — Grafik specjalny grup Pryzmatu i ARToffNI w dniach 19.01 - 30.01.26 (16 stycznia 2026)
- `/news.html?id=2025-12-22-przerwa-witeczna-wracamy-7-stycznia` — Przerwa świąteczna w ARToffNI - wracamy 7 stycznia 2026 (22 grudnia 2025)
- `/news.html?id=2025-12-16-dzielnia-w-szkoach-projekt-wspfinansowany-ze-rodkw-samorzdu` — "Dzielnia" w szkołach - projekt współfinansowany ze środków Samorządu Województwa Warmińsko-Mazurskiego (16 grudnia 2025)
- `/news.html?id=2018-11-23-akcja-podziel-si-witeczn-radoci-j64yl-ahylr` — Wielka akcja charytatywna w ARToffNI (1 grudnia 2025)
- `/news.html?id=2025-11-19-sukcesy-tanecznych-ekip-artottni-na-turniejach-i-festiwalac` — Sukcesy tanecznych ekip ARToffNI na turniejach i festiwalach (19 listopada 2025)
- `/news.html?id=2025-11-5-taneczny-weekend-doroli-30-na-warmii-9-11-stycznia-2026` — Taneczny weekend - DOROŚLI 30+ na WARMII (6 listopada 2025)
- `/news.html?id=2025-11-6-dance-it-out-olsztyn-na-mistrzostwach-wiata` — Dance It Out na Mistrzostwach Świata! (6 listopada 2025)
- `/news.html?id=2025-6-5-czas-na-dziaanie` — CZAS na DZIAŁANIE! (5 czerwca 2025)
- `/news.html?id=2025-5-27-teatr-taca-na-osiedlach-2-projekty-do-gosowania-w-ramach-ols` — TEATR TAŃCA NA OSIEDLACH - 2 projekty do głosowania w ramach Olsztyńskiego Budżetu Obywatelskiego (27 maja 2025)
- `/news.html?id=2025-5-23-gdzie-kamstwa-rosn-spektakl-taneczny-fundacji-taca-i-sztuki-` — „GDZIE KŁAMSTWA ROSNĄ?” Spektakl Taneczny Fundacji Tańca i Sztuki ARToffNIA - 22.06.2025 w Filharmonii Warmińsko-Mazurskiej w Olsztynie (23 maja 2025)
- `/news.html?id=2025-5-23-gdzie-kamstwa-rosn-widowisko-taneczne-fundacji-taca-i-sztuki` — „GDZIE KŁAMSTWA ROSNĄ” Widowisko Taneczne Fundacji Tańca i Sztuki ARToffNIA 20-21.06.2025 w Filharmonii Warmińsko-Mazurskiej w Olsztynie (23 maja 2025)
- `/news.html?id=2025-5-22-dni-afryki-na-uniwersytecie-warmisko-mazurskim-z-iwon-i-aish` — Dni Afryki na Uniwersytecie Warmińsko-Mazurskim z Iwoną i Aishą Ndiaye (22 maja 2025)
- `/news.html?id=2025-4-29-roztaczmy-olsztyn-midzynarodowy-dzie-taca-2025` — Roztańczmy Olsztyn - Międzynarodowy Dzień Tańca 2025 (29 kwietnia 2025)
- `/news.html?id=2025-4-17-majweczka-z-oshitem-4-maja-2025-warsztaty-hip-hop-freestyle` — Majóweczka z Oshitem - 4 maja 2025 - warsztaty hip-hop freestyle (17 kwietnia 2025)
- `/news.html?id=2025-otwarte-warsztaty-tanca-wspolczesnego-ze-stefano-silvino-89pkl-ac` — Otwarte warsztaty TAŃCA WSPÓŁCZESNEGO ze STEFANO SILVINO (15 kwietnia 2025)
- `/news.html?id=2025-specjalistyczne-warsztaty-dla-instruktorow-tanca-bezpiecne-zajeci` — SPECJALISTYCZNE SZKOLENIE dla INSTRUKTORÓW - „BEZPIECZNE ZAJĘCIA TANECZNE cz. 1” z ANNĄ AFELTOWICZ (9 kwietnia 2025)
- `/news.html?id=2025-4-4-flashmob-roztaczmy-olsztyn` — FLASHMOB – ROZTAŃCZMY OLSZTYN! (4 kwietnia 2025)
- `/news.html?id=2025-3-27-akcja-charytatywna-w-artoffni` — Akcja charytatywna w ARToffNI (27 marca 2025)
- `/news.html?id=2025-3-11-high-heels-w-artoffni-nowo` — High Heels - NOWOŚĆ w ARToffNI! (11 marca 2025)
- `/news.html?id=2024-3-7-otwarte-warsztaty-hip-hop-z-pawem-sokoowskim-vel-sok-djp6e` — Otwarte warsztaty HIP-HOP z Pawłem Sokołowskim zwanym SOKOŁEM i Nikolą Suchocką vel NICOLE (25 lutego 2025)
- `/news.html?id=2025-2-3-tydzie-otwartych-otwartych-drzwi-w-artoffni` — TYDZIEŃ OTWARTYCH OTWARTYCH DRZWI w ARToffNI (3 lutego 2025)
- `/news.html?id=2025-1-25-grafik-specjalny-grup-pryzmatu-i-artoffnii-na-okres-2701-070` — Grafik specjalny grup PRYZMATU i ARToffNI w okresie 27.01 - 07.02.2025 (25 stycznia 2025)
- `/news.html?id=2025-1-14-artystyczna-karta-upominkowa-artoffni` — ARTystyczna kARTa upominkowa ARToffNI (14 stycznia 2025)
- `/news.html?id=2024-12-6-mikoajkowa-skrzyneczka-w-fundacji-taca-i-sztuki-artoffnia-sp` — „Mikołajkowa Skrzyneczka” w Fundacji Tańca i Sztuki ARToffNIA – Spełnij swoje taneczne marzenia! (6 grudnia 2024)
- `/news.html?id=2024-11-28-sztuka-przeciwko-przemocy-gosy-dwiki-obrazy-taniec` — "Sztuka Przeciwko Przemocy - głosy, dźwięki, obrazy, taniec!" (28 listopada 2024)
- `/news.html?id=2024-11-20-otwarte-warsztaty-taca-jazzowego-z-kamilem-zdakowskim-15-gr` — Otwarte warsztaty tańca jazzowego z KAMILEM ZDAŃKOWSKIM 15 grudnia 2024 (21 listopada 2024)
- `/news.html?id=2024-10-7-regionalny-turniej-taneczny-very-merry-dancefloor-15-grudnia` — REGIONALNY TURNIEJ TANECZNY "Very Merry DANCEfloor" - 15 grudnia 2024! (7 października 2024)
- `/news.html?id=2024-9-17-otwarte-warsztaty-gaga-z-gosi-mielech-5-padziernika-2024` — Otwarte warsztaty GAGA z Gosią Mielech - 5 października 2024 (17 września 2024)
- `/news.html?id=2024-9-17-wsparcie-dla-powodzian` — Wsparcie dla ludzi i zwierząt, które ucierpiały w wyniku powodzi (17 września 2024)
- `/news.html?id=2024-7-26-nkpegv7j0cg8sgrmhe5jbb8kztbwqc` — Zgłoszenia na zajęcia w ARToffNI w nowym roku ARTystycznym 2024/2025 (26 lipca 2024)
- `/news.html?id=2024-6-20-wakacyjna-artoffnia-w-tacu-i-ruchu` — WAKACYJNA ARToffNIA w TAŃCU i RUCHU - warsztaty dla dzieci, młodzieży i dorosłyc (20 czerwca 2024)
- `/news.html?id=2024-5-30-owarte-warsztaty-z-jogi-twarzy-i-gimnastyki-sowiaskiej-dla-k` — Owarte warsztaty z jogi twarzy i gimnastyki słowiańskiej dla kobiet (30 maja 2024)
- `/news.html?id=2024-5-15-sukcesy-tancerzy-pracowni-taca-pryzmat-na-turniejach-taneczn` — Sukcesy tancerzy Pracowni Tańca Pryzmat na turniejach tanecznych w Mrągowie i Bartoszycach (15 maja 2024)
- `/news.html?id=2024-5-10-zrbmy-sobie-raj-widowisko-taneczne-w-filarmonii-warmisko-maz` — "Zróbmy sobie RAJ" widowisko taneczne w Filarmonii Warmińsko Mazurskiej w Olsztynie, 31.05 - 02.06.2024 (10 maja 2024)
- `/news.html?id=2024-3-1-otwarte-warsztaty-tanca-wspolczesnego-ze-stefano-silvino` — Otwarte warsztaty TAŃCA WSPÓŁCZESNEGO ze Stefano Silvino (30 kwietnia 2024)
- `/news.html?id=2024-3-7-otwarte-warsztaty-hip-hop-z-pawem-sokoowskim-vel-sok` — Otwarte warsztaty HIP-HOP z Pawłem Sokołowskim vel SOKÓŁ (7 marca 2024)
- `/news.html?id=2024-3-1-otwarte-warsztaty-broadway-jazz-z-jackiem-wazelinem` — Otwarte warsztaty BROADWAY JAZZ z Jackiem Wazelinem (1 marca 2024)
- `/news.html?id=2021-3-3-eco-marzec-w-artoffni` — EKO - MARZEC w ARToffNI (3 marca 2021)
- `/news.html?id=2021-2-8-luty-miesicem-penym-mioci-w-artoffni` — LUTY - MIESIĄCEM PEŁNYM MIŁOŚCI w ARToffNI (8 lutego 2021)
- `/news.html?id=2021-1-21-nowy-semestr-w-artoffni` — NOWY SEMESTR w ARToffNI (21 stycznia 2021)
- `/news.html?id=2021-1-4-6-stycznia-2021-dzie-wolny-w-artoffni` — 6 stycznia 2021 - dzień wolny w ARToffNI (4 stycznia 2021)
- `/news.html?id=2021-1-4-zbirka-na-rzecz-wielkiej-orkiestry-witecznej-pomocy-w-artoffn` — Zbiórka na rzecz Wielkiej Orkiestry Świątecznej Pomocy w ARToffNI (4 stycznia 2021)
- `/news.html?id=2020-12-30-fundusz-wsparcia-kultury` — Fundusz Wsparcia Kultury (30 grudnia 2020)
- `/news.html?id=2020-12-30-specjalny-grafik-podczas-drugiego-tygodnia-ferii-11-1502202` — SPECJALNY GRAFIK PODCZAS DRUGIEGO TYGODNIA FERII 11 - 17.02.2021 (30 grudnia 2020)
- `/news.html?id=2020-12-21-przerwa-witeczno-noworoczna-w-artoffni` — Przerwa świąteczno - noworoczna w ARToffNI (21 grudnia 2020)
- `/news.html?id=2020-12-6-witeczne-lekcje-pokazowe-w-artoffni-online` — Świąteczne lekcje pokazowe w ARToffNI ONLINE (6 grudnia 2020)
- `/news.html?id=2017-11-27-turniejtaneczny2020` — IV ŚWIĄTECZNY TURNIEJ TAŃCA "VERY MERRY DANCE FLOOR" ONLINE (1 grudnia 2020)
- `/news.html?id=2020-11-17-julia-drygas-uhonorowana-tytuem-talent-roku-2020` — Julia Drygas uhonorowana tytułem Talent Roku 2020 (17 listopada 2020)
- `/news.html?id=2020-11-9-11-listopada-dzie-wolny-dla-wszystkich-artystw-artoffni` — 11 listopada - dzień wolny dla wszystkich artystów ARToffNI (10 listopada 2020)
- `/news.html?id=2020-11-6-spotkania-artystyczne-w-artoffni` — Spotkania artystyczne w ARToffNI (6 listopada 2020)
- `/news.html?id=2020-10-26-czerwona-strefa-zasady-bezpieczestwa` — Zasady bezpieczeństwa (26 października 2020)
- `/news.html?id=2020-10-22-hybrydowe-spotkania-w-artoffni` — Hybrydowe spotkania w ARToffNI (22 października 2020)
- `/news.html?id=2020-10-22-wrki-duszki-jednoroce-czyli-kostiumowy-tydzie-w-artoffni` — WRÓŻKI, DUSZKI, JEDNOROŻCE, czyli kostiumowy tydzień w ARToffNI! (22 października 2020)
- `/news.html?id=2020-10-12-dziaania-artoffni-w-tej-strefie` — Działania ARToffNI w żółtej strefie (13 października 2020)
- `/news.html?id=2020-6-8-przerwa-w-zajciach` — Przerwa w zajęciach 11 - 14 czerwca 2020 (8 czerwca 2020)
- `/news.html?id=2020-6-2-zakoczenie-roku-artystycznego-artoffni-i-pryzmatu` — ZAKOŃCZENIE ROKU ARTYSTYCZNEGO ARToffNI I PRYZMATU (4 czerwca 2020)
- `/news.html?id=2020-3-27-cennik-zaj-online-obowizujcy-od-30032020-do-odwoania` — CENNIK zajęć ONLINE obowiązujący od 30.03.2020 do ODWOŁANIA (27 marca 2020)
- `/news.html?id=2020-3-27-grafik-zaj-online-od-30032020r-do-odwoania` — GRAFIK zajęć ONLINE obowiązujący od 30.03.2020r. do ODWOŁANIA (27 marca 2020)
- `/news.html?id=2020-3-27-krtki-przewodnik-jak-skorzysta-z-pryzmatowych-i-artoffniowyc` — KRÓTKI PRZEWODNIK - jak skorzystać z PRYZMATOWYCH i ARToffNIOWYCH zajęć ONLINE? (27 marca 2020)
- `/news.html?id=2020-3-20-pierwsze-prbne-pryzmatowe-zajcia-online` — Pierwsze pokazowe pryzmatowe i artoffniowe :) zajęcia online (20 marca 2020)
- `/news.html?id=2020-3-11-odwoanie-zaj-i-dziaa-fundacji-taca-i-sztuki-artoffnia` — Zawieszenie zajęć i działań Fundacji Tańca i Sztuki ARToffNIA (11 marca 2020)
- `/news.html?id=2020-1-31-wane-terminy-ii-semestr` — WAŻNE TERMINY - II SEMESTR (31 stycznia 2020)
- `/news.html?id=2020-1-14-grafik-zaj-podczas-ferii-2020` — GRAFIK ZAJĘĆ PODCZAS FERII 2020 (14 stycznia 2020)
- `/news.html?id=2019-12-21-przerwa-witeczna` — Przerwa świąteczna (21 grudnia 2019)
