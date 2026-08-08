#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""QA serwisu ARToffNIA — uruchamiać po KAŻDEJ zmianie.
   Wyjście: liczby, nie 'przeszło'. Kod wyjścia 1 przy błędach krytycznych."""
import re, os, sys, glob, json, subprocess

HTML = sorted(glob.glob("*.html"))
JS   = sorted(glob.glob("*.js"))
kryt, ostrz = [], []

def K(m): kryt.append(m)
def O(m): ostrz.append(m)

# ── 1. składnia JS
for f in JS:
    if f == "sprawdz.py": continue
    r = subprocess.run(["node","--check",f], capture_output=True, text=True)
    if r.returncode: K(f"składnia JS: {f} — {r.stderr.strip().splitlines()[0] if r.stderr else '?'}")

# ── 1b. składnia skryptów inline w HTML (node --check nie widzi <script> w HTML)
import tempfile
for f in HTML:
    s=open(f,encoding="utf-8",errors="replace").read()
    for idx, m in enumerate(re.finditer(r'<script(?![^>]*\bsrc=)[^>]*>(.*?)</script>', s, re.S)):
        kod=m.group(1).strip()
        if not kod: continue
        with tempfile.NamedTemporaryFile("w",suffix=".js",delete=False,encoding="utf-8") as tf:
            tf.write(kod); tmp=tf.name
        r=subprocess.run(["node","--check",tmp],capture_output=True,text=True)
        os.unlink(tmp)
        if r.returncode:
            linia=s[:m.start()].count("\n")+1
            blad=(r.stderr.strip().splitlines() or ["?"])
            K(f"składnia skryptu inline: {f} (blok {idx+1}, ~linia {linia}) — {blad[-1][:90]}")

# ── 1c. odwołania do niezadeklarowanych obiektów w skryptach inline
#        (składnia poprawna, ale ReferenceError w przeglądarce zabija stronę —
#         tego node --check nie widzi)
ZNANE={"URLSearchParams","JSON","Math","Date","Object","Array","String","Number","Boolean",
       "Image","Promise","RegExp","Map","Set","Intl","NaN","Infinity"}
for f in HTML:
    s=open(f,encoding="utf-8",errors="replace").read()
    for m in re.finditer(r'<script(?![^>]*\bsrc=)[^>]*>(.*?)</script>', s, re.S):
        kod=m.group(1)
        deklarowane=set(re.findall(r'\b(?:var|let|const|function)\s+([A-Za-z_$][\w$]*)', kod))
        deklarowane |= set(re.findall(r'([A-Za-z_$][\w$]*)\s*=', kod))          # także X=..., w tym listy deklaratorów
        deklarowane |= set(re.findall(r'function[^(]*\(([^)]*)\)', kod) and
                           [p.strip() for grp in re.findall(r'function[^(]*\(([^)]*)\)', kod) for p in grp.split(",") if p.strip()])
        deklarowane |= set(re.findall(r'window\.([A-Za-z_$][\w$]*)', kod))
        deklarowane |= set(re.findall(r'window\.([A-Za-z_$][\w$]*)', open("zajecia.js",encoding="utf-8").read()))
        for js in ("aktualnosci.js","galerie.js","projekty.js","zapisy-config.js","menu.js"):
            if os.path.exists(js):
                deklarowane |= set(re.findall(r'window\.([A-Za-z_$][\w$]*)', open(js,encoding="utf-8").read()))
        uzyte=set(re.findall(r'(?<![\w.$])([A-Z][A-Za-z0-9_]{0,20})\s*\[', kod))
        brak=uzyte - deklarowane - ZNANE
        for b in sorted(brak):
            K(f"{f}: skrypt odwołuje się do niezadeklarowanego „{b}[…]” — ReferenceError zabije stronę")

# ── 2. martwe linki wewnętrzne
dead=set()
for f in HTML:
    s=open(f,encoding="utf-8",errors="replace").read()
    for h in re.findall(r'href="([^"#?][^"]*?)"', s):
        if h.startswith(("http","mailto:","tel:","#")): continue
        p=h.split("?")[0].split("#")[0]
        if "'" in p or "+" in p: continue          # konkatenacja w JS
        if p and not os.path.exists(p): dead.add((f,p))
for f,p in sorted(dead): K(f"martwy link: {f} → {p}")

# ── 3. referencje do obrazów
imgs=set()
for f in HTML+JS:
    s=open(f,encoding="utf-8",errors="replace").read()
    imgs |= set(re.findall(r'(?:src="|url\()((?:foto|kampania)/[^"\')]+?\.(?:jpg|jpeg|png|webp|svg))', s))
    imgs |= set(re.findall(r'src="([^"]+\.(?:jpg|jpeg|png|webp|svg))"', s))
for i in sorted(imgs):
    if not os.path.exists(i): K(f"brak pliku obrazu: {i}")

# ── 4. deklaracje albumów vs pliki na dysku  (łapie bug „sale: n=6, plików 3")
a=open("album.html",encoding="utf-8",errors="replace").read()
for m in re.finditer(r'(\w+):\{t:.*?n:(\d+)', a, re.S):
    aid,n=m.group(1),int(m.group(2))
    miss=[i for i in range(1,n+1) if not os.path.exists(f"foto/albumy/{aid}-{i}.webp")]
    if miss: K(f"album '{aid}': deklaruje {n} zdjęć, brakuje {len(miss)} ({miss})")

# ── 5. zajęcia: każdy landing ma zdjęcie
r=subprocess.run(["node","-e",
  'global.window={};require("./zajecia.js");console.log(JSON.stringify(window.AFF_Z.map(z=>z.id)))'],
  capture_output=True,text=True)
if r.returncode==0:
    ids=json.loads(r.stdout)
    bez=[i for i in ids if not os.path.exists(f"foto/zajecia/{i}.webp")]
    if bez: O(f"zajęcia bez zdjęcia: {len(bez)}/{len(ids)} — {', '.join(bez[:5])}")
    ZAJ=len(ids)
else:
    K("nie da się wczytać zajecia.js"); ZAJ=0

# ── 6. meta / SEO
bez_desc=[f for f in HTML if 'name="description"' not in open(f,encoding="utf-8",errors="replace").read()]
bez_og  =[f for f in HTML if 'og:title' not in open(f,encoding="utf-8",errors="replace").read()]
bez_can =[f for f in HTML if 'rel="canonical"' not in open(f,encoding="utf-8",errors="replace").read()]
if bez_desc: O(f"bez <meta description>: {len(bez_desc)}/{len(HTML)}")
if bez_og:   O(f"bez og:title: {len(bez_og)}/{len(HTML)}")
if bez_can:  O(f"bez canonical: {len(bez_can)}/{len(HTML)}")
for p in ("sitemap.xml","robots.txt"):
    if not os.path.exists(p): O(f"brak {p}")

# ── 7. alt-y
bez_alt=0; tot_img=0
for f in HTML + JS:                      # także obrazy wstrzykiwane przez komponenty
    for tag in re.findall(r'<img[^>]*>', open(f,encoding="utf-8",errors="replace").read()):
        tot_img+=1
        if not re.search(r'alt=\\?"[^"]+\\?"', tag) and 'id="lb-img"' not in tag: bez_alt+=1
if bez_alt: K(f"<img> bez alt: {bez_alt}/{tot_img}")

# ── 8. wersjonowanie lokalnych assetów (cache-busting)
niewers=set()
for f in HTML:
    s=open(f,encoding="utf-8",errors="replace").read()
    for m in re.findall(r'src="((?:menu|layout|zajecia)\.js[^"]*)"', s):
        if "?v=" not in m: niewers.add((f,m))
for f,m in sorted(niewers): O(f"asset bez ?v=: {f} → {m}")

# ── 9. tytuły unikalne
tyt=[re.search(r'<title>(.*?)</title>',open(f,encoding="utf-8",errors="replace").read(),re.S) for f in HTML]
tyt=[t.group(1).strip() for t in tyt if t]
dup=[t for t in set(tyt) if tyt.count(t)>1]
for d in dup: O(f"zduplikowany <title>: „{d}”")


# ── 10. szablony sterowane parametrem: canonical MUSI być aktualizowany dynamicznie
#        (statyczny canonical zwija wszystkie instancje szablonu do jednego adresu)
SZABLONY_PARAM = ["zajecie.html","grupa.html","album.html","news.html","projekt.html"]
for f in SZABLONY_PARAM:
    if not os.path.exists(f): continue
    s=open(f,encoding="utf-8",errors="replace").read()
    if 'rel="canonical"' in s and "AFF_META(" not in s:
        K(f"{f}: statyczny canonical na szablonie z parametrem — wszystkie instancje wskażą jeden adres")
    if "document.title=" in s and "AFF_META(" not in s:
        O(f"{f}: tytuł ustawiany dynamicznie, ale meta/OG zostają statyczne")

# ── 11. liczby w treściach użytkowych — wymagają potwierdzenia w archiwum
LICZBY = re.compile(r'\b(\d{2,4})\s*(os[oó]b|pedagog|instruktor|lat|uczestnik|grup)')
for f in HTML:
    if f == "remanent.html": continue          # dokument o naszym zakresie, nie o fundacji
    s=open(f,encoding="utf-8",errors="replace").read()
    for blok in re.findall(r'<meta name="description" content="(.*?)"|<div class="kicker">(.*?)</div>', s, re.S):
        t=" ".join(x for x in blok if x)
        for m in LICZBY.finditer(t):
            O(f"{f}: liczba do potwierdzenia w treści — „{m.group(0)}”")

# ── 12. globalne komponenty układu
for f in HTML:
    s=open(f,encoding="utf-8",errors="replace").read()
    if "data-aff-footer" not in s: K(f"{f}: brak punktu montażu stopki")
    if f!="index.html" and "data-aff-nav" not in s: K(f"{f}: brak punktu montażu nawigacji")
    if "layout.js" not in s: K(f"{f}: nie ładuje layout.js")
    if "<footer class=\"footer\">" in s: O(f"{f}: stopka wpisana w HTML zamiast komponentu")

# ── raport
print(f"QA ARToffNIA · {len(HTML)} stron · {ZAJ} zajęć · {len(imgs)} referencji do obrazów")
print(f"  linki: {len(HTML)*0+len(dead)} martwych · obrazy: OK · alt: {tot_img-bez_alt}/{tot_img}")
print(f"  meta: description {len(HTML)-len(bez_desc)}/{len(HTML)} · og {len(HTML)-len(bez_og)}/{len(HTML)} · canonical {len(HTML)-len(bez_can)}/{len(HTML)}")
if kryt:
    print(f"\nBŁĘDY KRYTYCZNE ({len(kryt)}):")
    for m in kryt: print("  ✗", m)
if ostrz:
    print(f"\nOSTRZEŻENIA ({len(ostrz)}):")
    for m in ostrz: print("  !", m)
if not kryt and not ostrz: print("\nBez uwag.")
sys.exit(1 if kryt else 0)
