/* ── Konfiguracja zapisów (ActiveNow) ─────────────────────────────────────
   Fundacja prowadzi zapisy w ActiveNow. Identyfikatory odczytane z jej
   obecnego serwisu (mirror), a przeznaczenie formularzy ustalone na
   podstawie tego, na jakich podstronach są osadzone:

     41911 — warsztaty otwarte i wydarzenia jednorazowe   (19 podstron)
     41910 — obozy wyjazdowe, ferie i półkolonie          (10 podstron)
     41909 — zajęcia wakacyjne                            (3 podstrony)
     72711 — turnieje taneczne Very Merry DANCEfloor      (2 podstrony)

   UWAGA: dla zapisów na zajęcia całoroczne fundacja nie osadzała formularza
   na stronie — trzeba potwierdzić, czy ma powstać nowy, czy używamy 41911.

   URUCHOMIENIE: ustawić AKTYWNE na true po zatwierdzeniu przez fundację.
   Do tego czasu formularze zbierają dane i kierują do biura.
*/
window.AFF_ZAPISY = {
  AKTYWNE: false,

  AN: {
    host: "https://app.activenow.io",
    school_id: "7230",
    code: "tkXw4zqEHVerAvL1",
    kalendarz: "https://app.activenow.io/external/calendar/7230?code=tkXw4zqEHVerAvL1"
  },

  /* formularz według kontekstu zgłoszenia */
  FORMULARZE: {
    zajecia:   "41911",   // do potwierdzenia: całoroczne zajęcia
    warsztaty: "41911",
    oboz:      "41910",
    ferie:     "41910",
    wakacje:   "41909",
    turniej:   "72711"
  },

  /* nadpisanie per konkretne zajęcia: z.id → signup_form_id */
  PER_ZAJECIA: {},

  link: function (id, kontekst) {
    if (!this.AKTYWNE) return null;              // tryb offline: kierujemy do biura
    var a = this.AN;
    var fid = this.PER_ZAJECIA[id] || this.FORMULARZE[kontekst || "zajecia"] || this.FORMULARZE.zajecia;
    return a.host + "/external/signup_form/load_by_js?school_id=" + a.school_id +
           "&code=" + a.code + "&signup_form_id=" + fid;
  },

  aktywne: function () { return this.AKTYWNE === true; }
};
