# Dokumenty prawne - punkty do potwierdzenia przed publikacją

Dotyczy: `/privacy` i `/cookies`.
Stan: **draft**, bramka `LEGAL_APPROVED = false` w `src/app/config/legal.ts`.

Dopóki flaga jest `false`:
- na obu stronach wyświetla się baner `[DRAFT - needs legal review before publication]`,
- obie strony mają `noindex, follow` (nie wchodzą do wyników wyszukiwania),
- strony pozostają dostępne pod swoimi adresami (linki w stopce działają).

Po Twoim potwierdzeniu punktów poniżej wystarczy zmienić flagę na `true` - baner i `noindex`
znikną jednocześnie. Nic więcej nie trzeba ruszać.

---

## Czego NIE uzupełniałem

Żaden zapis prawny nie został przeze mnie wymyślony ani zmieniony. Poniżej wyłącznie
lista miejsc, w których dokument stawia twierdzenie wymagające Twojej weryfikacji
(albo weryfikacji prawnika). Wartości zostawiam puste celowo.

## 1. Podmiot i rola administratora

- [ ] Dokument mówi, że administratorem danych jest **r352 prowadzone przez Przemysława Reszkę,
      Santa Catalina, Mallorca (Baleares, Hiszpania)**. Potwierdź, czy to prawidłowe oznaczenie
      podmiotu (nazwa działalności / forma prawna / kraj rejestracji).
- [ ] Czy podawać pełny adres rejestrowy i numer identyfikacji podatkowej? Obecnie jest tylko
      miejscowość i e-mail kontaktowy `hello@r352.com`.
- [ ] Dokument deklaruje stosowanie **RODO i hiszpańskiej LOPDGDD**. Wymaga potwierdzenia w
      kontekście Twojej rezydencji podatkowej i miejsca prowadzenia działalności
      (temat otwarty niezależnie od strony).

## 2. Procesorzy i odbiorcy danych

- [ ] Dokument wymienia **Google Tag Manager / Google Analytics** jako narzędzia analityczne.
      Potwierdź, czy lista jest kompletna. Faktycznie w serwisie działają lub mogą działać także:
      hosting (Vercel), poczta/formularze, Calendly (rezerwacja rozmowy), Usercentrics (CMP).
- [ ] Czy potrzebne jest wskazanie transferu danych poza EOG (Google, Vercel, Calendly = USA)
      i podstawy tego transferu.
- [ ] Brak listy podprocesorów - do decyzji, czy publikować.

## 3. Okresy retencji

- [ ] Dokument zapowiada w intro, że wyjaśnia **„jak długo przechowujemy dane"**.
      Konkretne okresy wymagają Twojej decyzji, osobno dla:
      - zgłoszeń z formularza kontaktowego,
      - briefów wypełnionych w kreatorze,
      - danych analitycznych,
      - korespondencji e-mail.

## 4. Podstawy prawne przetwarzania

- [ ] Analityka opisana jako **działająca wyłącznie po zgodzie** - potwierdź, że tak jest
      w praktyce (Consent Mode: tagi nie ładują się przed akceptacją).
- [ ] Formularze: potwierdź podstawę (zgoda / czynności przed zawarciem umowy / uzasadniony interes).

## 5. Prawa użytkownika i procedura

- [ ] Potwierdź kanał realizacji praw (dostęp, sprostowanie, usunięcie, sprzeciw, przenoszenie)
      - obecnie wskazany jest wyłącznie e-mail.
- [ ] Termin odpowiedzi na żądanie - do ustalenia.
- [ ] Informacja o prawie skargi do organu nadzorczego (AEPD w Hiszpanii / UODO w Polsce)
      - do potwierdzenia, który organ wskazać.

## 6. Cookies

- [ ] Potwierdź, że tabela kategorii cookies odpowiada rzeczywistości po stronie CMP
      (kategorie, nazwy, czasy życia, dostawcy).
- [ ] Data `Last updated: 2026-06-05` - zaktualizować przy publikacji.

---

## Po zatwierdzeniu

1. Uzupełnij zatwierdzone treści w `src/app/i18n/translations.ts` (klucze `privacy.*`, `cookies.*`).
2. Ustaw `LEGAL_APPROVED = true` w `src/app/config/legal.ts`.
3. `npm run build && node scripts/audit-crawl.mjs` - crawler potwierdzi zniknięcie banera
   i przejście stron na `index, follow`.
