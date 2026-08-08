/* ARToffNIA — mega menu (współdzielony komponent; wstrzykuje własny CSS i markup)
   Linki zajęć = deep-linki do katalogu (?zaj= / ?kto=), docelowo podmienialne na podstrony zajęć. */
(function(){
"use strict";
var CSS = `
.mm-btn{background:var(--ink);color:var(--bg);border:none;border-radius:999px;padding:.6rem 1.35rem;font-family:inherit;font-size:.78rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;margin-left:1.4rem;transition:opacity .15s}
.mm-btn:hover{opacity:.75}
.mm{position:fixed;inset:0;background:#E9E9E3;z-index:999;overflow-y:auto;overflow-x:hidden;opacity:0;visibility:hidden;transform:translateY(-10px);transition:opacity .28s ease,transform .32s cubic-bezier(.22,.8,.3,1),visibility 0s linear .32s}
.mm.open{opacity:1;visibility:visible;transform:none;transition:opacity .28s ease,transform .32s cubic-bezier(.22,.8,.3,1)}
.mm-grid>div{opacity:0;transform:translateY(16px);transition:opacity .4s ease,transform .45s cubic-bezier(.22,.8,.3,1)}
.mm.open .mm-grid>div{opacity:1;transform:none}
.mm.open .mm-grid>div:nth-child(1){transition-delay:.08s}
.mm.open .mm-grid>div:nth-child(2){transition-delay:.15s}
.mm.open .mm-grid>div:nth-child(3){transition-delay:.22s}
.mm.open .mm-grid>div:nth-child(4){transition-delay:.29s}
.mm-cta{opacity:0;transform:translateY(10px);transition:opacity .4s ease .38s,transform .45s cubic-bezier(.22,.8,.3,1) .38s}
.mm.open .mm-cta{opacity:1;transform:none}
.mm-top{opacity:0;transition:opacity .3s ease .04s}
.mm.open .mm-top{opacity:1}
@media (prefers-reduced-motion:reduce){.mm,.mm-grid>div,.mm-cta,.mm-top{transition:none!important;transform:none!important}}
.mm-in{max-width:1240px;margin:0 auto;padding:0 1.5rem 1.6rem;min-height:100vh;display:flex;flex-direction:column}
.mm-top{display:flex;justify-content:space-between;align-items:center;gap:1.4rem;padding:1.1rem 0;border-bottom:1px solid var(--ink);flex:none}
.mm .mm-actions{display:flex;align-items:center;gap:1.2rem}
.mm .mm-tel{display:flex;flex-direction:row;align-items:baseline;gap:.6rem;white-space:nowrap;text-decoration:none;color:var(--ink);font-size:.95rem}
.mm .mm-tel b{font-weight:800;font-size:1.05rem;letter-spacing:.01em}
.mm .mm-tel span{font-size:.7rem;color:#5F5F5A;letter-spacing:.08em;text-transform:uppercase}
.mm .mm-go{background:var(--ink);color:#E9E9E3;border-radius:999px;padding:.75rem 1.5rem;font-size:.76rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;text-decoration:none;white-space:nowrap;transition:opacity .15s}
.mm .mm-go:hover{opacity:.75}
@media (max-width:640px){.mm .mm-tel{display:none}.mm .mm-go{padding:.65rem 1.1rem;font-size:.7rem}.mm .mm-actions{gap:.7rem}}
.mm-phone-mob{display:none}
@media (max-width:640px){.mm-phone-mob{display:flex;align-items:center;gap:.6rem;padding:.75rem 0;font-size:.9rem;color:var(--ink);border-bottom:1px solid #D6D6CE}.mm-phone-mob svg{flex:none;width:16px;height:16px}.mm-phone-mob a{color:var(--ink);text-decoration:none;font-weight:800;font-size:1rem;letter-spacing:.01em}.mm-phone-mob .sub{font-size:.68rem;color:#5F5F5A;letter-spacing:.08em;text-transform:uppercase;margin-left:.5rem}}
.mm-top img{height:34px;width:auto;display:block}
.mm-logo{font-weight:800;font-size:1rem;letter-spacing:.02em}
.mm-close{background:none;border:1px solid var(--ink);border-radius:999px;width:42px;height:42px;font-size:1.05rem;cursor:pointer;line-height:1}
.mm-close{transition:background .15s,color .15s,transform .25s}
.mm-close:hover{background:var(--ink);color:var(--bg);transform:rotate(90deg)}
.mm-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.8rem 2.2rem;padding-top:1.6rem;flex:1;align-content:start}
@media (max-width:900px){.mm-grid{grid-template-columns:repeat(2,1fr)}}
@media (max-width:560px){.mm-grid{grid-template-columns:1fr}}
.mm-h{font-size:.62rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#5F5F5A;padding-bottom:.5rem;border-bottom:1px solid #D6D6CE;margin-bottom:.5rem}
.mm-h + .mm-h{margin-top:1.3rem}
.mm ul{list-style:none;margin:0 0 1rem;padding:0}
.mm li{margin:0}
.mm a{display:block;color:var(--ink);text-decoration:none;font-size:.85rem;font-weight:500;padding:.2rem 0;letter-spacing:-.005em;line-height:1.35}
.mm a:hover{font-weight:800}
.mm a.big{font-size:1rem;font-weight:700;padding:.28rem 0}
.mm a.big:hover{font-weight:800}
.mm .dot{display:inline-block;width:.6rem;height:.6rem;border-radius:50%;margin-right:.55rem;vertical-align:baseline}
.mm-cta{display:flex;gap:1.2rem;align-items:center;flex-wrap:wrap;margin-top:1.4rem;padding-top:1.8rem;border-top:1px solid var(--ink)}
.mm-cta .btnx{display:inline-block;background:var(--ink);color:var(--bg);padding:.85rem 1.8rem;font-weight:700;font-size:.8rem;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;border-radius:999px}
.mm-cta .tel{font-size:.9rem;color:var(--mid)}
.mm-cta .tel a{color:var(--ink);font-weight:700;text-decoration:none}

.fab{position:fixed;right:1.5rem;bottom:1.5rem;z-index:900;display:flex;gap:.6rem;align-items:center;
 opacity:0;visibility:hidden;transform:translateY(14px);transition:opacity .25s ease,transform .3s cubic-bezier(.22,.8,.3,1),visibility 0s linear .3s}
.fab.on{opacity:1;visibility:visible;transform:none;transition:opacity .25s ease,transform .3s cubic-bezier(.22,.8,.3,1)}
.fab a{display:inline-flex;align-items:center;gap:.5rem;text-decoration:none;border-radius:999px;font-weight:700;
 letter-spacing:.1em;text-transform:uppercase;font-size:.76rem;box-shadow:0 10px 30px -12px rgba(17,17,16,.5);transition:transform .12s,opacity .15s}
.fab a:hover{transform:translateY(-2px)}
.fab .f-cta{background:var(--ink);color:var(--bg);padding:.95rem 1.6rem}
@media (max-width:640px){
  .fab{left:1rem;right:1rem;bottom:1rem}
  .fab a{justify-content:center;padding:.9rem .8rem;font-size:.72rem}
}
@media print{.fab{display:none!important}}
@media (max-width:780px){
  .fab{left:.6rem;right:.6rem;bottom:.6rem}
  .fab .f-cta{justify-content:center;text-align:center;padding:.7rem .6rem;font-size:.68rem;letter-spacing:.08em}
  body.fab-on{padding-bottom:4.6rem}
}
body.mm-lock{overflow:hidden}
`;

/* zaj = filtr po nazwie w katalogu; docelowo: href podstrony zajęć */
function zaj(label,q){ return '<li><a href="index.html?zaj='+encodeURIComponent(q||label)+'#zajecia">'+label+'</a></li>'; }
function zajS(label,slug){ return '<li><a href="zajecie.html?id='+slug+'">'+label+'</a></li>'; }
function kto(label,key,color){ return '<li><a class="big" href="grupa.html?g='+key+'"><span class="dot" style="background:var(--g-'+key+')"></span>'+label+'</a></li>'; }

var HTML = `
<div class="mm" id="mm" role="dialog" aria-modal="true" aria-hidden="true" aria-label="Menu serwisu">
  <div class="mm-in">
    <div class="mm-top">
      <a href="index.html"><img src="logo-artoffnia.svg" alt="ARToffNIA — Fundacja Tańca i Sztuki"></a>
      <div class="mm-actions">
        <a class="mm-tel" href="tel:+48604110894">☎ <b>604 110 894</b><span>pn–pt 9:00–17:00</span></a>
        <a class="mm-go" href="zapisy.html">Zapisz się</a>
        <button type="button" class="mm-close" aria-label="Zamknij menu">✕</button>
      </div>
    </div>
    <div class="mm-phone-mob"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0 1 22 16.92z"/></svg><a href="tel:+48604110894">604 110 894</a><span class="sub">pn–pt 9:00–17:00</span></div>
    <div class="mm-grid">
      <div>
        <div class="mm-h">Taniec</div>
        <ul>
          ${zaj('Zespół Pryzmat','Pryzmat')}
          ${zaj('Disco Dance · Dance It Out','Disco Dance')}
          ${zajS('Mix Dance 7+','mix-dance-7')}
          ${zajS('Balet OPEN','balet-open')}
          ${zajS('Jazz OPEN','jazz-open')}
          ${zajS('Taniec współczesny 13+','taniec-wspolczesny-open-13')}
          ${zaj('Hip-hop','Hip-hop')}
          ${zajS('Breakdance 7+','breakdance-7')}
          ${zaj('Popping')}
          ${zajS('Street dance 30+','street-dance-30-poczatkujaca')}
          ${zajS('High Heels','high-heels')}
          ${zajS('Flamenco','flamenco')}
          ${zajS('Improwizacja taneczna','improwizacja-taneczna-16')}
          ${zajS('Lekcje indywidualne','lekcje-indywidualne-tanca')}
        </ul>
      </div>
      <div>
        <div class="mm-h">Ruch i forma</div>
        <ul>
          ${zaj('Akrobatyka i tricking','Akrobatyka')}
          ${zajS('Fitness dla dorosłych','fitness-dla-doroslych')}
          ${zajS('Body Balance','body-balance')}
          ${zajS('Pilates','pilates')}
          ${zaj('Joga','Joga')}
          ${zajS('ZOGA Movement','zoga-movement')}
          ${zajS('Salsation','salsation')}
          ${zajS('Latina Power','latina-power')}
          ${zajS('Gimnastyka słowiańska','gimnastyka-slowianska-dla-kobiet')}
          ${zaj('Gimnastyka dla seniorów 60+','seniorów 60+')}
        </ul>
        <div class="mm-h">Teatr i aktorstwo</div>
        <ul>
          ${zajS('Aktorskie dla młodzieży','aktorskie-dla-mlodziezy-11')}
          ${zajS('Aktorskie dla dorosłych','aktorskie-dla-doroslych')}
          ${zajS('Przygotowanie do szkół teatralnych','przygotowanie-do-szkol-teatralnych')}
        </ul>
      </div>
      <div>
        <div class="mm-h">Dla kogo</div>
        <ul>
          ${kto('Dzieci 4–12','dzieci')}
          ${kto('Nastolatki 13–17','nastolatki')}
          ${kto('Dorośli 18+','dorosli')}
          ${kto('Seniorzy 60+','seniorzy')}
        </ul>
        <div class="mm-h">Ferie i wakacje</div>
        <ul>
          <li><a class="big" href="obozy.html">Obozy i ferie 2026</a></li>
        </ul>
      </div>
      <div>
        <div class="mm-h">Informacje</div>
        <ul>
          <li><a href="cennik.html">Cennik 2025/26</a></li>
          <li><a href="zapisy.html">Zapisy</a></li>
          <li><a href="fundacja.html">Fundacja</a></li>
          <li><a href="kadra.html">Kadra — 20 osób</a></li>
          <li><a href="wynajem.html">Wynajem sal</a></li>
          <li><a href="galeria.html">Galeria</a></li>
          <li><a href="aktualnosci.html">Aktualności</a></li>
          <li><a href="kontakt.html">Kontakt</a></li>
        </ul>
        <div class="mm-h">Dokumenty</div>
        <ul>
          <li><a href="statut.html">Statut</a></li>
          <li><a href="regulamin-2025-26.pdf" target="_blank" rel="noopener">Regulamin 2025/26 (PDF)</a></li>
          <li><a href="standardy.html">Standardy ochrony małoletnich</a></li>
          <li><a href="wspieraj.html">Wspieraj kulturę</a></li>
        </ul>
      </div>
    </div>
  </div>`;

var st=document.createElement('style'); st.textContent=CSS; document.head.appendChild(st);
var wrap=document.createElement('div'); wrap.innerHTML=HTML; document.body.appendChild(wrap.firstElementChild);
var mm=document.getElementById('mm');
var btn=document.createElement('button'); btn.type='button'; btn.className='mm-btn'; btn.textContent='Menu'; btn.setAttribute('aria-haspopup','dialog'); btn.setAttribute('aria-expanded','false');
function zamontujPrzycisk(){
  if(btn.parentNode) return true;
  var nav=document.querySelector('.nav-links')||document.querySelector('.atf-links');
  if(!nav) return false;
  nav.parentNode.appendChild(btn); return true;
}
/* nawigacja pochodzi z layout.js i może pojawić się po tym skrypcie */
if(!zamontujPrzycisk()) document.addEventListener('aff:layout', zamontujPrzycisk);
var ostatniFokus=null;
function fokusowalne(){
  return [].slice.call(mm.querySelectorAll('a[href],button:not([disabled])'))
           .filter(function(e){ return e.offsetParent!==null; });
}
function pulapkaFokusu(e){
  if(e.key!=='Tab' || !mm.classList.contains('open')) return;
  var f=fokusowalne(); if(!f.length) return;
  var pierwszy=f[0], ostatni=f[f.length-1];
  if(e.shiftKey && document.activeElement===pierwszy){ e.preventDefault(); ostatni.focus(); }
  else if(!e.shiftKey && document.activeElement===ostatni){ e.preventDefault(); pierwszy.focus(); }
}
function open(){
  ostatniFokus=document.activeElement;
  mm.classList.add('open'); document.body.classList.add('mm-lock');
  mm.setAttribute('aria-hidden','false'); btn.setAttribute('aria-expanded','true');
  var f=fokusowalne(); if(f.length) setTimeout(function(){ f[0].focus(); },60);
  document.addEventListener('keydown', pulapkaFokusu);
}
function close(){
  mm.classList.remove('open'); document.body.classList.remove('mm-lock');
  mm.setAttribute('aria-hidden','true'); btn.setAttribute('aria-expanded','false');
  document.removeEventListener('keydown', pulapkaFokusu);
  if(ostatniFokus && ostatniFokus.focus) ostatniFokus.focus();
}
btn.addEventListener('click', open);
mm.querySelector('.mm-close').addEventListener('click', close);
document.addEventListener('keydown', function(e){ if(e.key==='Escape') close(); });
mm.addEventListener('click', function(e){ if(e.target.tagName==='A') close(); });
})();

/* ── pływające CTA: telefon + wejście do wyszukiwarki zajęć ── */
(function(){
  var onIndex=/index\.html$|\/$/.test(location.pathname);
  var target=onIndex?"#zajecia":"index.html#zajecia";
  var f=document.createElement("div");
  f.className="fab";
  f.innerHTML='<a class="f-cta" href="'+target+'">Znajdź zajęcia</a>';
  document.body.appendChild(f);
  var cta=f.querySelector(".f-cta");
  if(onIndex){
    cta.addEventListener("click",function(e){
      e.preventDefault();
      var el=document.getElementById("aff-offer")||document.getElementById("zajecia");
      if(el)el.scrollIntoView({behavior:"smooth",block:"start"});
    });
  }
  /* pomiar */
  f.addEventListener("click",function(e){
    var a=e.target.closest("a"); if(!a)return;
    window.dataLayer=window.dataLayer||[];
    window.dataLayer.push({event:"fab_szukaj_zajec",miejsce:"pływające CTA"});
  });
  /* pokaż po przewinięciu; schowaj przy stopce i przy otwartym menu */
  var foot=document.querySelector(".footer");
  function upd(){
    if(document.getElementById("mm")&&document.getElementById("mm").classList.contains("open")){f.classList.remove("on");return;}
    var y=window.scrollY||document.documentElement.scrollTop;
    var nearFoot=foot? (foot.getBoundingClientRect().top < window.innerHeight-40) : false;
    var wid = y>420 && !nearFoot;
    f.classList.toggle("on", wid);
    document.body.classList.toggle("fab-on", wid);
  }
  window.addEventListener("scroll",upd,{passive:true});
  window.addEventListener("resize",upd);
  setTimeout(upd,300);
  document.addEventListener("click",function(){setTimeout(upd,60);});
})();
