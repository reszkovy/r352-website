/* ── Globalne komponenty układu: nawigacja, stopka, metadane ──────────────
   Jedno źródło prawdy. Wcześniej nawigacja i stopka były skopiowane
   w każdym pliku HTML, przez co rozjechały się na 7 i 5 wariantów.

   Użycie: <script src="layout.js"></script> w <head> (defer nie jest
   potrzebne — skrypt sam czeka na DOM). Punkty montażu w HTML:
       <div data-aff-nav></div>
       <div data-aff-footer></div>
   Opcjonalnie: <div data-aff-footer data-extra="Dokumenty|remanent.html:Remanent">
*/
(function () {
  "use strict";

  var POZYCJE = [
    { t: "Zajęcia",       h: "index.html#zajecia", m: ["index.html", "zajecie.html", "grupa.html"] },
    { t: "Obozy i ferie", h: "obozy.html",         m: ["obozy.html", "projekt.html"] },
    { t: "Cennik",        h: "cennik.html",        m: ["cennik.html"] },
    { t: "Zapisy",        h: "zapisy.html",        m: ["zapisy.html"] },
    { t: "Fundacja",      h: "fundacja.html",      m: ["fundacja.html", "kadra.html", "statut.html", "standardy.html", "wspieraj.html"] },
    { t: "Kontakt",       h: "kontakt.html",       m: ["kontakt.html", "wynajem.html"] }
  ];

  var KOLUMNY = [
    ["ARToffNIA Sybiraków", "al. Sybiraków 2, Olsztyn (Zatorze)"],
    ["ARToffNIA Smętka",    "ul. Smętka 28a, Olsztyn (Centrum)"],
    ["Kontakt",             '<a href="tel:+48604110894">604 110 894</a><br><a href="mailto:biuro@artoffnia.pl">biuro@artoffnia.pl</a>'],
    ["Na skróty",           '<a href="wynajem.html">Wynajem sal</a><br><a href="obozy.html">Obozy i ferie</a><br><a href="galeria.html">Galeria</a><br><a href="aktualnosci.html">Aktualności</a><br><span>Olsztyński Teatr Tańca — ott.olsztyn.pl</span>'],
    ["Dla uczestników",     '<a href="regulamin-2025-26.pdf" target="_blank" rel="noopener">Regulamin 2025/26</a><br><a href="cennik.html">Cennik</a><br><a href="zapisy.html">Zapisy</a><br><a href="index.html#zajecia">Grafik zajęć</a>'],
    ["Śledź nas",           '<a href="https://www.facebook.com/ARToffNIA" target="_blank" rel="noopener">Facebook</a><br><a href="https://instagram.com/artoffnia_" target="_blank" rel="noopener">Instagram</a><br><a href="https://www.facebook.com/PracowniaTancaPryzmat" target="_blank" rel="noopener">Pracownia Tańca Pryzmat</a>']
  ];

  function biezaca() {
    var p = location.pathname.split("/").pop();
    return p || "index.html";
  }

  function nawigacja(styl) {
    var teraz = biezaca();
    var linki = POZYCJE.map(function (x) {
      var akt = x.m.indexOf(teraz) > -1 ? ' class="act"' : "";
      var aria = akt ? ' aria-current="page"' : "";
      return '<a href="' + x.h + '"' + akt + aria + ">" + x.t + "</a>";
    }).join("\n      ");
    return '<nav class="nav"' + (styl ? ' style="' + styl + '"' : "") + ' aria-label="Nawigacja główna">\n' +
      '    <a class="nav-logo" href="index.html"><img src="logo-artoffnia.svg" alt="ARToffNIA — Fundacja Tańca i Sztuki"></a>\n' +
      '    <div class="nav-links">\n      ' + linki + "\n    </div>\n  </nav>";
  }

  function stopka(extra) {
    var kol = KOLUMNY.slice();
    if (extra) {
      // format: "Nagłówek|adres.html:Etykieta,adres2.html:Etykieta2"
      var cz = extra.split("|");
      var tresc = (cz[1] || "").split(",").map(function (p) {
        var d = p.split(":");
        return '<a href="' + d[0] + '">' + (d[1] || d[0]) + "</a>";
      }).join("<br>");
      kol = kol.slice(0, 3).concat([[cz[0], tresc]]);
    }
    return '<footer class="footer">\n    ' + kol.map(function (k) {
      return '<div class="col"><b>' + k[0] + "</b>" + k[1] + "</div>";
    }).join("\n    ") + "\n  </footer>";
  }

  function montuj() {
    var n = document.querySelector("[data-aff-nav]");
    if (n) n.outerHTML = nawigacja(n.getAttribute("data-styl"));
    var f = document.querySelector("[data-aff-footer]");
    if (f) f.outerHTML = stopka(f.getAttribute("data-extra"));
    document.dispatchEvent(new CustomEvent("aff:layout"));
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", montuj);
  else montuj();

  /* Metadane dla szablonów sterowanych parametrem URL — bez tego wszystkie
     instancje szablonu wskazywałyby jeden adres kanoniczny. */
  window.AFF_META = function (sciezka, tytul, opis, obraz) {
    var B = "https://artoffnia.pl/", U = B + sciezka;
    document.title = tytul;
    function set(sel, attr, val) { var e = document.querySelector(sel); if (e && val) e.setAttribute(attr, val); }
    set('link[rel="canonical"]', "href", U);
    set('meta[name="description"]', "content", opis);
    set('meta[property="og:title"]', "content", tytul);
    set('meta[property="og:description"]', "content", opis);
    set('meta[property="og:url"]', "content", U);
    if (obraz) set('meta[property="og:image"]', "content", B + obraz);
  };
})();
