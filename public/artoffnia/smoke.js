/* ── Test dymny: ładuje każdą stronę i sprawdza, czy realnie się wyrenderowała.
   Powstał, bo kontrola statyczna nie wykrywała stron, które ładowały się
   z pustą treścią — składnia była poprawna, a skrypt umierał w przeglądarce.

   Uruchomienie w konsoli przeglądarki na dowolnej stronie serwisu:
       fetch("smoke.js").then(r=>r.text()).then(eval).then(AFF_SMOKE)
   albo po prostu: AFF_SMOKE()  (gdy plik jest dołączony)
*/
window.AFF_SMOKE = async function () {
  "use strict";

  // adres → selektory, które MUSZĄ mieć niepustą treść po załadowaniu
  var KONTRAKT = [
    ["index.html",                     [".aff-cards > *", ".atf-door", ".atf-links a"]],
    ["zapisy.html",                    ["#ms-list > *", ".nav-links a", ".footer .col"]],
    ["cennik.html",                    [".nav-links a", ".footer .col"]],
    ["kontakt.html",                   [".mapa img", ".nav-links a"]],
    ["kadra.html",                     [".os h3", ".nav-links a"]],
    ["aktualnosci.html",               ["#lista article", "#lata button"]],
    ["galeria.html",                   ["#gal a"]],
    ["obozy.html",                     ["#arch a", "#typy button"]],
    ["fundacja.html",                  [".nav-links a", ".footer .col"]],
    ["statut.html",                    [".d-toc a", ".d-r"]],
    ["standardy.html",                 [".d-toc a", ".d-r"]],
    ["wspieraj.html",                  [".prose p"]],
    ["wynajem.html",                   [".nav-links a"]],
    ["mapa.html",                      [".tree .node", ".item"]],
    ["404.html",                       [".nav-links a"]],
    ["grupa.html?g=dzieci",            ["#g-media img", ".nav-links a"]],
    ["grupa.html?g=seniorzy",          ["#g-media img"]],
    ["zajecie.html?id=joga",           ["#z-nazwa", "#z-terminy > *", "#z-foto"]],
    ["zajecie.html?id=balet-open",     ["#z-nazwa", "#z-meta > *"]],
    ["album.html?id=sale",             ["#a-grid img"]],
    ["projekt.html?id=letni-obz-tanecznoartystyczny-wilimy-2026", ["#p-title", "#p-main p"]],
    ["news.html?id=2026-1-23-joga-z-asi-otysz-wraca-do-artoffni-start-4-lutego-2026", ["#n-title", "#n-body p"]]
  ];

  // elementy wspólne, wymagane wszędzie
  var GLOBALNE = [".footer .col", ".skip-link"];

  var wyniki = [], bledy = 0;

  for (var i = 0; i < KONTRAKT.length; i++) {
    var adres = KONTRAKT[i][0], selektory = KONTRAKT[i][1].concat(GLOBALNE);
    var ramka = document.createElement("iframe");
    ramka.style.cssText = "position:fixed;left:-9999px;width:1280px;height:900px;border:0";
    document.body.appendChild(ramka);
    ramka.src = adres + (adres.indexOf("?") > -1 ? "&" : "?") + "smoke=" + Date.now();

    await new Promise(function (r) { ramka.onload = r; setTimeout(r, 4000); });
    await new Promise(function (r) { setTimeout(r, 400); });

    var brakujace = [], tytul = "", tresc = 0;
    try {
      var d = ramka.contentDocument;
      tytul = d.title;
      tresc = (d.body.innerText || "").trim().length;
      selektory.forEach(function (s) {
        var el = d.querySelectorAll(s);
        if (!el.length) brakujace.push(s);
      });
      if (tresc < 400) brakujace.push("treść strony < 400 znaków");
      if (!tytul || tytul.length < 5) brakujace.push("brak tytułu");
    } catch (e) {
      brakujace.push("wyjątek: " + e);
    }
    ramka.remove();

    if (brakujace.length) bledy++;
    wyniki.push({ adres: adres, ok: !brakujace.length, znakow: tresc, brakuje: brakujace });
  }

  var raport = {
    sprawdzono: KONTRAKT.length,
    przeszlo: KONTRAKT.length - bledy,
    nieprzeszlo: bledy,
    szczegoly: wyniki.filter(function (w) { return !w.ok; })
  };
  console.log("SMOKE:", raport.przeszlo + "/" + raport.sprawdzono, raport.nieprzeszlo ? "— BŁĘDY" : "— OK");
  return raport;
};
