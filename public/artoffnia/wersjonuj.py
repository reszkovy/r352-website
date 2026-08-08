#!/usr/bin/env python3
"""Bump ?v= na podstawie skrótu treści pliku. Uruchamiać po edycji menu.js/zajecia.js/styles.css."""
import re, glob, hashlib, os
w={a:hashlib.md5(open(a,'rb').read()).hexdigest()[:8] for a in ("menu.js","layout.js","zajecia.js","styles.css") if os.path.exists(a)}
n=0
for f in sorted(glob.glob("*.html")):
    s=open(f,encoding="utf-8").read(); o=s
    for a,h in w.items():
        s=re.sub(r'(src|href)="'+re.escape(a)+r'(\?v=[^"]*)?"', r'\1="'+a+'?v='+h+'"', s)
    if s!=o: open(f,"w",encoding="utf-8").write(s); n+=1
print("zbumpowano:",n,"stron ·",w)
