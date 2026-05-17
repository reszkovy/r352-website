const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Home-BW6RKQUf.js","assets/vendor-motion-LQBLsruA.js","assets/Reveal-BjUhwwaj.js","assets/vendor-lenis-C3aE2Jwu.js","assets/MagneticButton-C_NlXL5B.js","assets/HoverVideoImage-shFwA7_E.js","assets/ImageWithFallback-bMGDum2d.js","assets/ImageHover-CSTrz1zo.js","assets/PageTransition-D9bvwlrB.js","assets/vendor-react-C0Qg7kAU.js","assets/Home-2d6kTBOk.css","assets/Work-CuNdHcf7.js","assets/ProjectDetails-BBJuS3Z-.js","assets/Philosophy-exljSPg3.js","assets/Services-Db_AzQaH.js","assets/ServiceDetail-CFNbVxrU.js","assets/Deliverables-P_81tytd.js","assets/chevron-down-y-lDLGaB.js","assets/Contact-BiBT-GPb.js","assets/Journal-67yNi5ed.js","assets/JournalArticle-Bn7VvbK8.js","assets/BriefAccess-IIecGFzB.js","assets/Pricing-DLmLzmgY.js","assets/lock-D4QaNKzK.js","assets/LimitedAccess2-BEI34oom.js","assets/jspdf.es.min-Cu14cU1W.js","assets/loader-circle-BfmOuGS5.js","assets/zap-6mV-aKSe.js","assets/mail-wtliZ0Er.js","assets/LimitedAccess3-BAi73Rtf.js","assets/layers-B1qAw-pD.js","assets/LimitedAccess5-C0-t045_.js","assets/chevron-right-B25Ny4gB.js","assets/external-link-D5wqnfgG.js","assets/LimitedAccess5Meeting-DhSTK9SX.js","assets/html2canvas.esm-QH1iLAAe.js","assets/target-wJhLeVcj.js","assets/LimitedAccess5Pricing-DMLv0bsx.js","assets/Process-CgKJm35G.js","assets/Diagnostic-CHbjC4cG.js"])))=>i.map(i=>d[i]);
var Fs=Object.defineProperty;var Ds=(e,t,a)=>t in e?Fs(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a;var he=(e,t,a)=>Ds(e,typeof t!="symbol"?t+"":t,a);import{a as Ss,r as y,R as Ts,j as n,A as ve,m as C,u as be,b as Oe,g as nt,c as u}from"./vendor-motion-LQBLsruA.js";import{r as _a}from"./vendor-react-C0Qg7kAU.js";import{u as st,R as As}from"./vendor-lenis-C3aE2Jwu.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function a(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=a(i);fetch(i.href,o)}})();var Ye={},Qt;function Cs(){if(Qt)return Ye;Qt=1;var e=_a();return Ye.createRoot=e.createRoot,Ye.hydrateRoot=e.hydrateRoot,Ye}var Ps=Cs();const Is="modulepreload",Es=function(e){return"/"+e},ea={},K=function(t,a,s){let i=Promise.resolve();if(a&&a.length>0){let l=function(c){return Promise.all(c.map(m=>Promise.resolve(m).then(r=>({status:"fulfilled",value:r}),r=>({status:"rejected",reason:r}))))};document.getElementsByTagName("link");const d=document.querySelector("meta[property=csp-nonce]"),p=(d==null?void 0:d.nonce)||(d==null?void 0:d.getAttribute("nonce"));i=l(a.map(c=>{if(c=Es(c),c in ea)return;ea[c]=!0;const m=c.endsWith(".css"),r=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${r}`))return;const h=document.createElement("link");if(h.rel=m?"stylesheet":Is,m||(h.as="script"),h.crossOrigin="",h.href=c,p&&h.setAttribute("nonce",p),document.head.appendChild(h),m)return new Promise((g,w)=>{h.addEventListener("load",g),h.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${c}`)))})}))}function o(l){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=l,window.dispatchEvent(d),!d.defaultPrevented)throw l}return i.then(l=>{for(const d of l||[])d.status==="rejected"&&o(d.reason);return t().catch(o)})};function Ns(e,t){if(e instanceof RegExp)return{keys:!1,pattern:e};var a,s,i,o,l=[],d="",p=e.split("/");for(p[0]||p.shift();i=p.shift();)a=i[0],a==="*"?(l.push(a),d+=i[1]==="?"?"(?:/(.*))?":"/(.*)"):a===":"?(s=i.indexOf("?",1),o=i.indexOf(".",1),l.push(i.substring(1,~s?s:~o?o:i.length)),d+=~s&&!~o?"(?:/([^/]+?))?":"/([^/]+?)",~o&&(d+=(~s?"?":"")+"\\"+i.substring(o))):d+="/"+i;return{keys:l,pattern:new RegExp("^"+d+(t?"(?=$|/)":"/?$"),"i")}}var ut={exports:{}},yt={};/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ta;function Ms(){if(ta)return yt;ta=1;var e=Ss();function t(r,h){return r===h&&(r!==0||1/r===1/h)||r!==r&&h!==h}var a=typeof Object.is=="function"?Object.is:t,s=e.useState,i=e.useEffect,o=e.useLayoutEffect,l=e.useDebugValue;function d(r,h){var g=h(),w=s({inst:{value:g,getSnapshot:h}}),j=w[0].inst,k=w[1];return o(function(){j.value=g,j.getSnapshot=h,p(j)&&k({inst:j})},[r,g,h]),i(function(){return p(j)&&k({inst:j}),r(function(){p(j)&&k({inst:j})})},[r]),l(g),g}function p(r){var h=r.getSnapshot;r=r.value;try{var g=h();return!a(r,g)}catch{return!0}}function c(r,h){return h()}var m=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?c:d;return yt.useSyncExternalStore=e.useSyncExternalStore!==void 0?e.useSyncExternalStore:m,yt}var aa;function _s(){return aa||(aa=1,ut.exports=Ms()),ut.exports}var Rs=_s();const Os=Ts.useInsertionEffect,Ws=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",Bs=Ws?y.useLayoutEffect:y.useEffect,Ls=Os||Bs,Ra=e=>{const t=y.useRef([e,(...a)=>t[0](...a)]).current;return Ls(()=>{t[0]=e}),t[1]},qs="popstate",Wt="pushState",Bt="replaceState",Ks="hashchange",sa=[qs,Wt,Bt,Ks],Us=e=>{for(const t of sa)addEventListener(t,e);return()=>{for(const t of sa)removeEventListener(t,e)}},Oa=(e,t)=>Rs.useSyncExternalStore(Us,e,t),na=()=>location.search,Hs=({ssrSearch:e}={})=>Oa(na,e!=null?()=>e:na),ia=()=>location.pathname,Zs=({ssrPath:e}={})=>Oa(ia,e!=null?()=>e:ia),Gs=(e,{replace:t=!1,state:a=null}={})=>history[t?Bt:Wt](a,"",e),Vs=(e={})=>[Zs(e),Gs],oa=Symbol.for("wouter_v3");if(typeof history<"u"&&typeof window[oa]>"u"){for(const e of[Wt,Bt]){const t=history[e];history[e]=function(){const a=t.apply(this,arguments),s=new Event(e);return s.arguments=arguments,dispatchEvent(s),a}}Object.defineProperty(window,oa,{value:!0})}const $s=(e,t)=>t.toLowerCase().indexOf(e.toLowerCase())?"~"+t:t.slice(e.length)||"/",Wa=(e="")=>e==="/"?"":e,Ys=(e,t)=>e[0]==="~"?e.slice(1):Wa(t)+e,Js=(e="",t)=>$s(ra(Wa(e)),ra(t)),ra=e=>{try{return decodeURI(e)}catch{return e}},Ba={hook:Vs,searchHook:Hs,parser:Ns,base:"",ssrPath:void 0,ssrSearch:void 0,ssrContext:void 0,hrefs:e=>e,aroundNav:(e,t,a)=>e(t,a)},La=y.createContext(Ba),Ze=()=>y.useContext(La),qa={},Ka=y.createContext(qa),Xs=()=>y.useContext(Ka),it=e=>{const[t,a]=e.hook(e);return[Js(e.base,t),Ra((s,i)=>e.aroundNav(a,Ys(s,e.base),i))]},Ce=()=>it(Ze()),Ua=(e,t,a,s)=>{const{pattern:i,keys:o}=t instanceof RegExp?{keys:!1,pattern:t}:e(t||"*",s),l=i.exec(a)||[],[d,...p]=l;return d!==void 0?[!0,(()=>{const c=o!==!1?Object.fromEntries(o.map((r,h)=>[r,p[h]])):l.groups;let m={...p};return c&&Object.assign(m,c),m})(),...s?[d]:[]]:[!1,null]},Qs=({children:e,...t})=>{var m,r,h;const a=Ze(),s=t.hook?Ba:a;let i=s;const[o,l=t.ssrSearch??""]=((m=t.ssrPath)==null?void 0:m.split("?"))??[];o&&(t.ssrSearch=l,t.ssrPath=o),t.hrefs=t.hrefs??((r=t.hook)==null?void 0:r.hrefs),t.searchHook=t.searchHook??((h=t.hook)==null?void 0:h.searchHook);let d=y.useRef({}),p=d.current,c=p;for(let g in s){const w=g==="base"?s[g]+(t[g]??""):t[g]??s[g];p===c&&w!==c[g]&&(d.current=c={...c}),c[g]=w,(w!==s[g]||w!==i[g])&&(i=c)}return y.createElement(La.Provider,{value:i,children:e})},la=({children:e,component:t},a)=>t?y.createElement(t,{params:a}):typeof e=="function"?e(a):e,en=e=>{let t=y.useRef(qa);const a=t.current;return t.current=Object.keys(e).length!==Object.keys(a).length||Object.entries(e).some(([s,i])=>i!==a[s])?e:a},O=({path:e,nest:t,match:a,...s})=>{const i=Ze(),[o]=it(i),[l,d,p]=a??Ua(i.parser,e,o,t),c=en({...Xs(),...d});if(!l)return null;const m=p?y.createElement(Qs,{base:p},la(s,c)):la(s,c);return y.createElement(Ka.Provider,{value:c,children:m})},we=y.forwardRef((e,t)=>{const a=Ze(),[s,i]=it(a),{to:o="",href:l=o,onClick:d,asChild:p,children:c,className:m,replace:r,state:h,transition:g,...w}=e,j=Ra(F=>{F.ctrlKey||F.metaKey||F.altKey||F.shiftKey||F.button!==0||(d==null||d(F),F.defaultPrevented||(F.preventDefault(),i(l,e)))}),k=a.hrefs(l[0]==="~"?l.slice(1):a.base+l,a);return p&&y.isValidElement(c)?y.cloneElement(c,{onClick:j,href:k}):y.createElement("a",{...w,onClick:j,href:k,className:m!=null&&m.call?m(s===l):m,children:c,ref:t})}),Ha=e=>Array.isArray(e)?e.flatMap(t=>Ha(t&&t.type===y.Fragment?t.props.children:t)):[e],tn=({children:e,location:t})=>{const a=Ze(),[s]=it(a);for(const i of Ha(e)){let o=0;if(y.isValidElement(i)&&(o=Ua(a.parser,i.props.path,t||s,i.props.nest))[0])return y.cloneElement(i,{match:o})}return null};function Za(e){var t,a,s="";if(typeof e=="string"||typeof e=="number")s+=e;else if(typeof e=="object")if(Array.isArray(e)){var i=e.length;for(t=0;t<i;t++)e[t]&&(a=Za(e[t]))&&(s&&(s+=" "),s+=a)}else for(a in e)e[a]&&(s&&(s+=" "),s+=a);return s}function an(){for(var e,t,a=0,s="",i=arguments.length;a<i;a++)(e=arguments[a])&&(t=Za(e))&&(s&&(s+=" "),s+=t);return s}const Lt="-",sn=e=>{const t=on(e),{conflictingClassGroups:a,conflictingClassGroupModifiers:s}=e;return{getClassGroupId:l=>{const d=l.split(Lt);return d[0]===""&&d.length!==1&&d.shift(),Ga(d,t)||nn(l)},getConflictingClassGroupIds:(l,d)=>{const p=a[l]||[];return d&&s[l]?[...p,...s[l]]:p}}},Ga=(e,t)=>{var l;if(e.length===0)return t.classGroupId;const a=e[0],s=t.nextPart.get(a),i=s?Ga(e.slice(1),s):void 0;if(i)return i;if(t.validators.length===0)return;const o=e.join(Lt);return(l=t.validators.find(({validator:d})=>d(o)))==null?void 0:l.classGroupId},ca=/^\[(.+)\]$/,nn=e=>{if(ca.test(e)){const t=ca.exec(e)[1],a=t==null?void 0:t.substring(0,t.indexOf(":"));if(a)return"arbitrary.."+a}},on=e=>{const{theme:t,classGroups:a}=e,s={nextPart:new Map,validators:[]};for(const i in a)Dt(a[i],s,i,t);return s},Dt=(e,t,a,s)=>{e.forEach(i=>{if(typeof i=="string"){const o=i===""?t:da(t,i);o.classGroupId=a;return}if(typeof i=="function"){if(rn(i)){Dt(i(s),t,a,s);return}t.validators.push({validator:i,classGroupId:a});return}Object.entries(i).forEach(([o,l])=>{Dt(l,da(t,o),a,s)})})},da=(e,t)=>{let a=e;return t.split(Lt).forEach(s=>{a.nextPart.has(s)||a.nextPart.set(s,{nextPart:new Map,validators:[]}),a=a.nextPart.get(s)}),a},rn=e=>e.isThemeGetter,ln=e=>{if(e<1)return{get:()=>{},set:()=>{}};let t=0,a=new Map,s=new Map;const i=(o,l)=>{a.set(o,l),t++,t>e&&(t=0,s=a,a=new Map)};return{get(o){let l=a.get(o);if(l!==void 0)return l;if((l=s.get(o))!==void 0)return i(o,l),l},set(o,l){a.has(o)?a.set(o,l):i(o,l)}}},St="!",Tt=":",cn=Tt.length,dn=e=>{const{prefix:t,experimentalParseClassName:a}=e;let s=i=>{const o=[];let l=0,d=0,p=0,c;for(let w=0;w<i.length;w++){let j=i[w];if(l===0&&d===0){if(j===Tt){o.push(i.slice(p,w)),p=w+cn;continue}if(j==="/"){c=w;continue}}j==="["?l++:j==="]"?l--:j==="("?d++:j===")"&&d--}const m=o.length===0?i:i.substring(p),r=pn(m),h=r!==m,g=c&&c>p?c-p:void 0;return{modifiers:o,hasImportantModifier:h,baseClassName:r,maybePostfixModifierPosition:g}};if(t){const i=t+Tt,o=s;s=l=>l.startsWith(i)?o(l.substring(i.length)):{isExternal:!0,modifiers:[],hasImportantModifier:!1,baseClassName:l,maybePostfixModifierPosition:void 0}}if(a){const i=s;s=o=>a({className:o,parseClassName:i})}return s},pn=e=>e.endsWith(St)?e.substring(0,e.length-1):e.startsWith(St)?e.substring(1):e,mn=e=>{const t=Object.fromEntries(e.orderSensitiveModifiers.map(s=>[s,!0]));return s=>{if(s.length<=1)return s;const i=[];let o=[];return s.forEach(l=>{l[0]==="["||t[l]?(i.push(...o.sort(),l),o=[]):o.push(l)}),i.push(...o.sort()),i}},un=e=>({cache:ln(e.cacheSize),parseClassName:dn(e),sortModifiers:mn(e),...sn(e)}),yn=/\s+/,hn=(e,t)=>{const{parseClassName:a,getClassGroupId:s,getConflictingClassGroupIds:i,sortModifiers:o}=t,l=[],d=e.trim().split(yn);let p="";for(let c=d.length-1;c>=0;c-=1){const m=d[c],{isExternal:r,modifiers:h,hasImportantModifier:g,baseClassName:w,maybePostfixModifierPosition:j}=a(m);if(r){p=m+(p.length>0?" "+p:p);continue}let k=!!j,F=s(k?w.substring(0,j):w);if(!F){if(!k){p=m+(p.length>0?" "+p:p);continue}if(F=s(w),!F){p=m+(p.length>0?" "+p:p);continue}k=!1}const U=o(h).join(":"),R=g?U+St:U,B=R+F;if(l.includes(B))continue;l.push(B);const v=i(F,k);for(let _=0;_<v.length;++_){const Q=v[_];l.push(R+Q)}p=m+(p.length>0?" "+p:p)}return p};function gn(){let e=0,t,a,s="";for(;e<arguments.length;)(t=arguments[e++])&&(a=Va(t))&&(s&&(s+=" "),s+=a);return s}const Va=e=>{if(typeof e=="string")return e;let t,a="";for(let s=0;s<e.length;s++)e[s]&&(t=Va(e[s]))&&(a&&(a+=" "),a+=t);return a};function wn(e,...t){let a,s,i,o=l;function l(p){const c=t.reduce((m,r)=>r(m),e());return a=un(c),s=a.cache.get,i=a.cache.set,o=d,d(p)}function d(p){const c=s(p);if(c)return c;const m=hn(p,a);return i(p,m),m}return function(){return o(gn.apply(null,arguments))}}const q=e=>{const t=a=>a[e]||[];return t.isThemeGetter=!0,t},$a=/^\[(?:(\w[\w-]*):)?(.+)\]$/i,Ya=/^\((?:(\w[\w-]*):)?(.+)\)$/i,bn=/^\d+\/\d+$/,xn=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,fn=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,kn=/^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,zn=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,vn=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,Ne=e=>bn.test(e),A=e=>!!e&&!Number.isNaN(Number(e)),ze=e=>!!e&&Number.isInteger(Number(e)),ht=e=>e.endsWith("%")&&A(e.slice(0,-1)),ge=e=>xn.test(e),jn=()=>!0,Fn=e=>fn.test(e)&&!kn.test(e),Ja=()=>!1,Dn=e=>zn.test(e),Sn=e=>vn.test(e),Tn=e=>!b(e)&&!x(e),An=e=>We(e,es,Ja),b=e=>$a.test(e),Se=e=>We(e,ts,Fn),gt=e=>We(e,Nn,A),pa=e=>We(e,Xa,Ja),Cn=e=>We(e,Qa,Sn),Je=e=>We(e,as,Dn),x=e=>Ya.test(e),Ke=e=>Be(e,ts),Pn=e=>Be(e,Mn),ma=e=>Be(e,Xa),In=e=>Be(e,es),En=e=>Be(e,Qa),Xe=e=>Be(e,as,!0),We=(e,t,a)=>{const s=$a.exec(e);return s?s[1]?t(s[1]):a(s[2]):!1},Be=(e,t,a=!1)=>{const s=Ya.exec(e);return s?s[1]?t(s[1]):a:!1},Xa=e=>e==="position"||e==="percentage",Qa=e=>e==="image"||e==="url",es=e=>e==="length"||e==="size"||e==="bg-size",ts=e=>e==="length",Nn=e=>e==="number",Mn=e=>e==="family-name",as=e=>e==="shadow",_n=()=>{const e=q("color"),t=q("font"),a=q("text"),s=q("font-weight"),i=q("tracking"),o=q("leading"),l=q("breakpoint"),d=q("container"),p=q("spacing"),c=q("radius"),m=q("shadow"),r=q("inset-shadow"),h=q("text-shadow"),g=q("drop-shadow"),w=q("blur"),j=q("perspective"),k=q("aspect"),F=q("ease"),U=q("animate"),R=()=>["auto","avoid","all","avoid-page","page","left","right","column"],B=()=>["center","top","bottom","left","right","top-left","left-top","top-right","right-top","bottom-right","right-bottom","bottom-left","left-bottom"],v=()=>[...B(),x,b],_=()=>["auto","hidden","clip","visible","scroll"],Q=()=>["auto","contain","none"],z=()=>[x,b,p],V=()=>[Ne,"full","auto",...z()],me=()=>[ze,"none","subgrid",x,b],Y=()=>["auto",{span:["full",ze,x,b]},ze,x,b],ie=()=>[ze,"auto",x,b],xe=()=>["auto","min","max","fr",x,b],je=()=>["start","end","center","between","around","evenly","stretch","baseline","center-safe","end-safe"],Z=()=>["start","end","center","stretch","center-safe","end-safe"],D=()=>["auto",...z()],L=()=>[Ne,"auto","full","dvw","dvh","lvw","lvh","svw","svh","min","max","fit",...z()],f=()=>[e,x,b],J=()=>[...B(),ma,pa,{position:[x,b]}],fe=()=>["no-repeat",{repeat:["","x","y","space","round"]}],P=()=>["auto","cover","contain",In,An,{size:[x,b]}],I=()=>[ht,Ke,Se],S=()=>["","none","full",c,x,b],E=()=>["",A,Ke,Se],ae=()=>["solid","dashed","dotted","double"],N=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],M=()=>[A,ht,ma,pa],ue=()=>["","none",w,x,b],ce=()=>["none",A,x,b],de=()=>["none",A,x,b],Le=()=>[A,x,b],Fe=()=>[Ne,"full",...z()];return{cacheSize:500,theme:{animate:["spin","ping","pulse","bounce"],aspect:["video"],blur:[ge],breakpoint:[ge],color:[jn],container:[ge],"drop-shadow":[ge],ease:["in","out","in-out"],font:[Tn],"font-weight":["thin","extralight","light","normal","medium","semibold","bold","extrabold","black"],"inset-shadow":[ge],leading:["none","tight","snug","normal","relaxed","loose"],perspective:["dramatic","near","normal","midrange","distant","none"],radius:[ge],shadow:[ge],spacing:["px",A],text:[ge],"text-shadow":[ge],tracking:["tighter","tight","normal","wide","wider","widest"]},classGroups:{aspect:[{aspect:["auto","square",Ne,b,x,k]}],container:["container"],columns:[{columns:[A,b,x,d]}],"break-after":[{"break-after":R()}],"break-before":[{"break-before":R()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],sr:["sr-only","not-sr-only"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:v()}],overflow:[{overflow:_()}],"overflow-x":[{"overflow-x":_()}],"overflow-y":[{"overflow-y":_()}],overscroll:[{overscroll:Q()}],"overscroll-x":[{"overscroll-x":Q()}],"overscroll-y":[{"overscroll-y":Q()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:V()}],"inset-x":[{"inset-x":V()}],"inset-y":[{"inset-y":V()}],start:[{start:V()}],end:[{end:V()}],top:[{top:V()}],right:[{right:V()}],bottom:[{bottom:V()}],left:[{left:V()}],visibility:["visible","invisible","collapse"],z:[{z:[ze,"auto",x,b]}],basis:[{basis:[Ne,"full","auto",d,...z()]}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["nowrap","wrap","wrap-reverse"]}],flex:[{flex:[A,Ne,"auto","initial","none",b]}],grow:[{grow:["",A,x,b]}],shrink:[{shrink:["",A,x,b]}],order:[{order:[ze,"first","last","none",x,b]}],"grid-cols":[{"grid-cols":me()}],"col-start-end":[{col:Y()}],"col-start":[{"col-start":ie()}],"col-end":[{"col-end":ie()}],"grid-rows":[{"grid-rows":me()}],"row-start-end":[{row:Y()}],"row-start":[{"row-start":ie()}],"row-end":[{"row-end":ie()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":xe()}],"auto-rows":[{"auto-rows":xe()}],gap:[{gap:z()}],"gap-x":[{"gap-x":z()}],"gap-y":[{"gap-y":z()}],"justify-content":[{justify:[...je(),"normal"]}],"justify-items":[{"justify-items":[...Z(),"normal"]}],"justify-self":[{"justify-self":["auto",...Z()]}],"align-content":[{content:["normal",...je()]}],"align-items":[{items:[...Z(),{baseline:["","last"]}]}],"align-self":[{self:["auto",...Z(),{baseline:["","last"]}]}],"place-content":[{"place-content":je()}],"place-items":[{"place-items":[...Z(),"baseline"]}],"place-self":[{"place-self":["auto",...Z()]}],p:[{p:z()}],px:[{px:z()}],py:[{py:z()}],ps:[{ps:z()}],pe:[{pe:z()}],pt:[{pt:z()}],pr:[{pr:z()}],pb:[{pb:z()}],pl:[{pl:z()}],m:[{m:D()}],mx:[{mx:D()}],my:[{my:D()}],ms:[{ms:D()}],me:[{me:D()}],mt:[{mt:D()}],mr:[{mr:D()}],mb:[{mb:D()}],ml:[{ml:D()}],"space-x":[{"space-x":z()}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":z()}],"space-y-reverse":["space-y-reverse"],size:[{size:L()}],w:[{w:[d,"screen",...L()]}],"min-w":[{"min-w":[d,"screen","none",...L()]}],"max-w":[{"max-w":[d,"screen","none","prose",{screen:[l]},...L()]}],h:[{h:["screen",...L()]}],"min-h":[{"min-h":["screen","none",...L()]}],"max-h":[{"max-h":["screen",...L()]}],"font-size":[{text:["base",a,Ke,Se]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:[s,x,gt]}],"font-stretch":[{"font-stretch":["ultra-condensed","extra-condensed","condensed","semi-condensed","normal","semi-expanded","expanded","extra-expanded","ultra-expanded",ht,b]}],"font-family":[{font:[Pn,b,t]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:[i,x,b]}],"line-clamp":[{"line-clamp":[A,"none",x,gt]}],leading:[{leading:[o,...z()]}],"list-image":[{"list-image":["none",x,b]}],"list-style-position":[{list:["inside","outside"]}],"list-style-type":[{list:["disc","decimal","none",x,b]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"placeholder-color":[{placeholder:f()}],"text-color":[{text:f()}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...ae(),"wavy"]}],"text-decoration-thickness":[{decoration:[A,"from-font","auto",x,Se]}],"text-decoration-color":[{decoration:f()}],"underline-offset":[{"underline-offset":[A,"auto",x,b]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:z()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",x,b]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],wrap:[{wrap:["break-word","anywhere","normal"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",x,b]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:J()}],"bg-repeat":[{bg:fe()}],"bg-size":[{bg:P()}],"bg-image":[{bg:["none",{linear:[{to:["t","tr","r","br","b","bl","l","tl"]},ze,x,b],radial:["",x,b],conic:[ze,x,b]},En,Cn]}],"bg-color":[{bg:f()}],"gradient-from-pos":[{from:I()}],"gradient-via-pos":[{via:I()}],"gradient-to-pos":[{to:I()}],"gradient-from":[{from:f()}],"gradient-via":[{via:f()}],"gradient-to":[{to:f()}],rounded:[{rounded:S()}],"rounded-s":[{"rounded-s":S()}],"rounded-e":[{"rounded-e":S()}],"rounded-t":[{"rounded-t":S()}],"rounded-r":[{"rounded-r":S()}],"rounded-b":[{"rounded-b":S()}],"rounded-l":[{"rounded-l":S()}],"rounded-ss":[{"rounded-ss":S()}],"rounded-se":[{"rounded-se":S()}],"rounded-ee":[{"rounded-ee":S()}],"rounded-es":[{"rounded-es":S()}],"rounded-tl":[{"rounded-tl":S()}],"rounded-tr":[{"rounded-tr":S()}],"rounded-br":[{"rounded-br":S()}],"rounded-bl":[{"rounded-bl":S()}],"border-w":[{border:E()}],"border-w-x":[{"border-x":E()}],"border-w-y":[{"border-y":E()}],"border-w-s":[{"border-s":E()}],"border-w-e":[{"border-e":E()}],"border-w-t":[{"border-t":E()}],"border-w-r":[{"border-r":E()}],"border-w-b":[{"border-b":E()}],"border-w-l":[{"border-l":E()}],"divide-x":[{"divide-x":E()}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":E()}],"divide-y-reverse":["divide-y-reverse"],"border-style":[{border:[...ae(),"hidden","none"]}],"divide-style":[{divide:[...ae(),"hidden","none"]}],"border-color":[{border:f()}],"border-color-x":[{"border-x":f()}],"border-color-y":[{"border-y":f()}],"border-color-s":[{"border-s":f()}],"border-color-e":[{"border-e":f()}],"border-color-t":[{"border-t":f()}],"border-color-r":[{"border-r":f()}],"border-color-b":[{"border-b":f()}],"border-color-l":[{"border-l":f()}],"divide-color":[{divide:f()}],"outline-style":[{outline:[...ae(),"none","hidden"]}],"outline-offset":[{"outline-offset":[A,x,b]}],"outline-w":[{outline:["",A,Ke,Se]}],"outline-color":[{outline:f()}],shadow:[{shadow:["","none",m,Xe,Je]}],"shadow-color":[{shadow:f()}],"inset-shadow":[{"inset-shadow":["none",r,Xe,Je]}],"inset-shadow-color":[{"inset-shadow":f()}],"ring-w":[{ring:E()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:f()}],"ring-offset-w":[{"ring-offset":[A,Se]}],"ring-offset-color":[{"ring-offset":f()}],"inset-ring-w":[{"inset-ring":E()}],"inset-ring-color":[{"inset-ring":f()}],"text-shadow":[{"text-shadow":["none",h,Xe,Je]}],"text-shadow-color":[{"text-shadow":f()}],opacity:[{opacity:[A,x,b]}],"mix-blend":[{"mix-blend":[...N(),"plus-darker","plus-lighter"]}],"bg-blend":[{"bg-blend":N()}],"mask-clip":[{"mask-clip":["border","padding","content","fill","stroke","view"]},"mask-no-clip"],"mask-composite":[{mask:["add","subtract","intersect","exclude"]}],"mask-image-linear-pos":[{"mask-linear":[A]}],"mask-image-linear-from-pos":[{"mask-linear-from":M()}],"mask-image-linear-to-pos":[{"mask-linear-to":M()}],"mask-image-linear-from-color":[{"mask-linear-from":f()}],"mask-image-linear-to-color":[{"mask-linear-to":f()}],"mask-image-t-from-pos":[{"mask-t-from":M()}],"mask-image-t-to-pos":[{"mask-t-to":M()}],"mask-image-t-from-color":[{"mask-t-from":f()}],"mask-image-t-to-color":[{"mask-t-to":f()}],"mask-image-r-from-pos":[{"mask-r-from":M()}],"mask-image-r-to-pos":[{"mask-r-to":M()}],"mask-image-r-from-color":[{"mask-r-from":f()}],"mask-image-r-to-color":[{"mask-r-to":f()}],"mask-image-b-from-pos":[{"mask-b-from":M()}],"mask-image-b-to-pos":[{"mask-b-to":M()}],"mask-image-b-from-color":[{"mask-b-from":f()}],"mask-image-b-to-color":[{"mask-b-to":f()}],"mask-image-l-from-pos":[{"mask-l-from":M()}],"mask-image-l-to-pos":[{"mask-l-to":M()}],"mask-image-l-from-color":[{"mask-l-from":f()}],"mask-image-l-to-color":[{"mask-l-to":f()}],"mask-image-x-from-pos":[{"mask-x-from":M()}],"mask-image-x-to-pos":[{"mask-x-to":M()}],"mask-image-x-from-color":[{"mask-x-from":f()}],"mask-image-x-to-color":[{"mask-x-to":f()}],"mask-image-y-from-pos":[{"mask-y-from":M()}],"mask-image-y-to-pos":[{"mask-y-to":M()}],"mask-image-y-from-color":[{"mask-y-from":f()}],"mask-image-y-to-color":[{"mask-y-to":f()}],"mask-image-radial":[{"mask-radial":[x,b]}],"mask-image-radial-from-pos":[{"mask-radial-from":M()}],"mask-image-radial-to-pos":[{"mask-radial-to":M()}],"mask-image-radial-from-color":[{"mask-radial-from":f()}],"mask-image-radial-to-color":[{"mask-radial-to":f()}],"mask-image-radial-shape":[{"mask-radial":["circle","ellipse"]}],"mask-image-radial-size":[{"mask-radial":[{closest:["side","corner"],farthest:["side","corner"]}]}],"mask-image-radial-pos":[{"mask-radial-at":B()}],"mask-image-conic-pos":[{"mask-conic":[A]}],"mask-image-conic-from-pos":[{"mask-conic-from":M()}],"mask-image-conic-to-pos":[{"mask-conic-to":M()}],"mask-image-conic-from-color":[{"mask-conic-from":f()}],"mask-image-conic-to-color":[{"mask-conic-to":f()}],"mask-mode":[{mask:["alpha","luminance","match"]}],"mask-origin":[{"mask-origin":["border","padding","content","fill","stroke","view"]}],"mask-position":[{mask:J()}],"mask-repeat":[{mask:fe()}],"mask-size":[{mask:P()}],"mask-type":[{"mask-type":["alpha","luminance"]}],"mask-image":[{mask:["none",x,b]}],filter:[{filter:["","none",x,b]}],blur:[{blur:ue()}],brightness:[{brightness:[A,x,b]}],contrast:[{contrast:[A,x,b]}],"drop-shadow":[{"drop-shadow":["","none",g,Xe,Je]}],"drop-shadow-color":[{"drop-shadow":f()}],grayscale:[{grayscale:["",A,x,b]}],"hue-rotate":[{"hue-rotate":[A,x,b]}],invert:[{invert:["",A,x,b]}],saturate:[{saturate:[A,x,b]}],sepia:[{sepia:["",A,x,b]}],"backdrop-filter":[{"backdrop-filter":["","none",x,b]}],"backdrop-blur":[{"backdrop-blur":ue()}],"backdrop-brightness":[{"backdrop-brightness":[A,x,b]}],"backdrop-contrast":[{"backdrop-contrast":[A,x,b]}],"backdrop-grayscale":[{"backdrop-grayscale":["",A,x,b]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[A,x,b]}],"backdrop-invert":[{"backdrop-invert":["",A,x,b]}],"backdrop-opacity":[{"backdrop-opacity":[A,x,b]}],"backdrop-saturate":[{"backdrop-saturate":[A,x,b]}],"backdrop-sepia":[{"backdrop-sepia":["",A,x,b]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":z()}],"border-spacing-x":[{"border-spacing-x":z()}],"border-spacing-y":[{"border-spacing-y":z()}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["","all","colors","opacity","shadow","transform","none",x,b]}],"transition-behavior":[{transition:["normal","discrete"]}],duration:[{duration:[A,"initial",x,b]}],ease:[{ease:["linear","initial",F,x,b]}],delay:[{delay:[A,x,b]}],animate:[{animate:["none",U,x,b]}],backface:[{backface:["hidden","visible"]}],perspective:[{perspective:[j,x,b]}],"perspective-origin":[{"perspective-origin":v()}],rotate:[{rotate:ce()}],"rotate-x":[{"rotate-x":ce()}],"rotate-y":[{"rotate-y":ce()}],"rotate-z":[{"rotate-z":ce()}],scale:[{scale:de()}],"scale-x":[{"scale-x":de()}],"scale-y":[{"scale-y":de()}],"scale-z":[{"scale-z":de()}],"scale-3d":["scale-3d"],skew:[{skew:Le()}],"skew-x":[{"skew-x":Le()}],"skew-y":[{"skew-y":Le()}],transform:[{transform:[x,b,"","none","gpu","cpu"]}],"transform-origin":[{origin:v()}],"transform-style":[{transform:["3d","flat"]}],translate:[{translate:Fe()}],"translate-x":[{"translate-x":Fe()}],"translate-y":[{"translate-y":Fe()}],"translate-z":[{"translate-z":Fe()}],"translate-none":["translate-none"],accent:[{accent:f()}],appearance:[{appearance:["none","auto"]}],"caret-color":[{caret:f()}],"color-scheme":[{scheme:["normal","dark","light","light-dark","only-dark","only-light"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",x,b]}],"field-sizing":[{"field-sizing":["fixed","content"]}],"pointer-events":[{"pointer-events":["auto","none"]}],resize:[{resize:["none","","y","x"]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":z()}],"scroll-mx":[{"scroll-mx":z()}],"scroll-my":[{"scroll-my":z()}],"scroll-ms":[{"scroll-ms":z()}],"scroll-me":[{"scroll-me":z()}],"scroll-mt":[{"scroll-mt":z()}],"scroll-mr":[{"scroll-mr":z()}],"scroll-mb":[{"scroll-mb":z()}],"scroll-ml":[{"scroll-ml":z()}],"scroll-p":[{"scroll-p":z()}],"scroll-px":[{"scroll-px":z()}],"scroll-py":[{"scroll-py":z()}],"scroll-ps":[{"scroll-ps":z()}],"scroll-pe":[{"scroll-pe":z()}],"scroll-pt":[{"scroll-pt":z()}],"scroll-pr":[{"scroll-pr":z()}],"scroll-pb":[{"scroll-pb":z()}],"scroll-pl":[{"scroll-pl":z()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",x,b]}],fill:[{fill:["none",...f()]}],"stroke-w":[{stroke:[A,Ke,Se,gt]}],stroke:[{stroke:["none",...f()]}],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-x","border-w-y","border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-x","border-color-y","border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],translate:["translate-x","translate-y","translate-none"],"translate-none":["translate","translate-x","translate-y","translate-z"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]},orderSensitiveModifiers:["*","**","after","backdrop","before","details-content","file","first-letter","first-line","marker","placeholder","selection"]}},Rn=wn(_n);function W(...e){return Rn(an(e))}const ua={p3111bb80:"M468.492 402.837C474.353 406.798 478.709 412.183 481.56 418.994C484.411 425.806 485.282 432.617 484.174 439.428C483.065 446.239 480.055 452.496 475.145 458.199C470.393 463.743 464.769 467.544 458.275 469.604C455.424 470.237 452.414 470.633 449.246 470.792C446.078 470.95 441.88 470.792 436.653 470.316C431.584 469.841 428.575 469.445 427.624 469.128C412.418 468.495 396.499 465.089 379.866 458.912C363.393 452.734 349.137 445.843 337.098 438.24C325.06 430.479 313.338 422.004 301.933 412.817C290.687 403.63 282.45 396.422 277.222 391.195C271.995 385.968 268.114 381.77 265.58 378.602L260.59 373.137L261.066 395.472C261.382 422.4 261.699 440.141 262.016 448.695C262.333 460.416 259.323 469.92 252.987 477.207C246.176 484.969 237.543 489.404 227.088 490.513C216 491.463 206.417 488.533 198.339 481.721C189.627 474.276 185.112 465.644 184.795 455.823C184.795 447.111 184.479 429.132 183.845 401.887C183.528 372.741 183.211 353.258 182.895 343.437C181.944 314.291 180.598 282.69 178.855 248.634C178.222 237.229 181.311 227.646 188.122 219.884C194.616 212.439 202.932 208.083 213.07 206.816H214.02L214.496 206.341C219.089 203.49 225.267 200.559 233.029 197.55C272.312 181.709 311.199 173.393 349.691 172.601C362.363 172.285 372.738 174.74 380.817 179.967C390.479 186.145 397.132 195.886 400.775 209.192C407.587 235.803 401.251 262.256 381.767 288.551C377.807 293.778 371.63 301.223 363.234 310.886C358.324 316.746 354.601 321.102 352.067 323.954C349.849 327.122 349.374 330.211 350.641 333.22C355.552 342.566 361.809 351.04 369.412 358.644C377.015 366.088 384.539 371.791 391.984 375.751C399.429 379.553 406.636 382.879 413.606 385.73C420.576 388.423 426.199 390.086 430.476 390.72L436.891 392.145C443.702 393.413 448.85 394.521 452.335 395.472C458.829 397.531 464.215 399.986 468.492 402.837ZM309.299 262.652C310.883 255.524 308.586 250.535 302.408 247.684C298.765 246.1 293.934 246.1 287.915 247.684C283.321 248.951 274.688 251.881 262.016 256.475C258.848 257.425 257.422 259.484 257.739 262.652L259.64 307.084C259.64 309.935 261.066 311.836 263.917 312.786C266.926 313.737 269.382 313.103 271.282 310.886C279.994 299.798 286.172 292.511 289.815 289.026C295.359 282.849 299.399 278.334 301.933 275.483C306.21 270.573 308.665 266.296 309.299 262.652Z",p37835f00:"M0 337.632C0 136.127 154.934 0 328.676 0C502.418 0 657.352 136.127 657.352 337.632C657.352 539.136 502.418 675.264 328.676 675.264C154.934 675.264 0 539.136 0 337.632ZM78.8106 337.632C78.8106 492.566 189.862 601.827 328.676 601.827C465.699 601.827 578.541 492.566 578.541 337.632C578.541 182.697 465.699 73.4372 328.676 73.4372C189.862 73.4372 78.8106 182.697 78.8106 337.632Z"},wt={p18f5d700:"M384.68 0C429.239 1.34289e-05 452.953 24.2341 452.953 58.8916C452.953 85.4712 439.662 101.368 416.21 119.869L404.17 129.37C397.153 134.907 401.068 146.188 410.006 146.188H444.312C449.516 146.188 453.734 150.406 453.734 155.609V174.551C453.734 179.754 449.516 183.973 444.312 183.973H324.786C319.583 183.973 315.364 179.754 315.364 174.551V153.824C315.364 150.973 316.655 148.275 318.876 146.486L383.638 94.3311C399.012 82.0838 406.568 72.7026 406.568 60.7158C406.568 45.6021 396.927 38.0449 384.419 38.0449C370.347 38.045 360.185 48.2084 360.185 64.8857C360.184 66.3247 359.018 67.4911 357.579 67.4912H319.013C316.134 67.4912 313.801 65.1576 313.801 62.2793C313.801 27.6218 340.641 0 384.68 0Z",p37c6300:"M284.428 1.56348C289.631 1.56364 293.849 5.78201 293.849 10.9854V29.9268C293.848 35.13 289.631 39.3485 284.428 39.3486H218.976C213.926 39.3486 209.774 43.329 209.561 48.374L209.535 49.0186C209.192 57.1999 219.48 62.6203 227.393 60.5127C231.901 59.3118 236.98 58.6319 242.774 58.6318C279.777 58.6318 304.794 83.9079 304.794 121.692C304.794 164.428 272.481 185.536 232.872 185.536C193.784 185.536 167.675 163.62 162.045 134.016C161.046 128.766 165.393 124.299 170.736 124.299H198.274C203.009 124.299 206.846 127.896 208.535 132.319C212.32 142.236 220.695 149.054 233.393 149.054C246.162 149.054 258.67 139.933 258.67 121.692C258.67 105.276 248.507 93.8105 232.872 93.8105C224.761 93.8106 216.651 96.9457 210.867 104.922C208.754 107.835 205.574 109.967 201.976 109.967H173.135C167.771 109.967 163.49 105.496 163.722 100.138L167.597 10.5781C167.815 5.53781 171.965 1.56349 177.01 1.56348H284.428Z",pbe454f0:"M74.5273 0C117.523 8.22167e-05 142.279 19.2833 142.279 49.7715C142.279 55.4679 141.279 60.5718 139.472 65.0879C135.791 74.2831 136.951 101.811 141.291 110.714C144.098 116.471 145.667 123.46 145.667 131.855C145.667 163.647 118.045 185.536 73.2245 185.536C31.7576 185.536 4.62142 167.016 0.537033 132.409C-0.0728369 127.242 4.21835 122.996 9.4218 122.996H36.4384C41.54 122.996 45.5161 127.145 46.9628 132.037C50.6834 144.618 61.5844 150.617 75.3085 150.617C88.3377 150.617 99.0214 143.061 99.0214 128.989C99.0214 117.263 90.9438 109.706 74.0058 109.706H63.8837C58.6803 109.706 54.4618 105.488 54.4618 100.284V83.167C54.4618 77.9636 58.6803 73.7451 63.8837 73.7451H71.4003C87.8168 73.745 96.1551 65.6672 96.1552 53.4199C96.1552 40.6513 85.7318 34.918 73.4843 34.918C61.8026 34.9181 52.8614 40.7211 49.1952 50.4248C47.4242 55.1124 43.4982 59.1523 38.4872 59.1523H12.4277C7.17002 59.1523 2.84452 54.8198 3.73235 49.6377C8.89026 19.533 36.4501 0 74.5273 0Z"};function ot({className:e,color:t="#DAFF45"}){return n.jsx("svg",{viewBox:"0 0 658 676",className:W("block select-none overflow-visible",e),fill:"none",preserveAspectRatio:"xMidYMid meet",xmlns:"http://www.w3.org/2000/svg",children:n.jsxs("g",{id:"Symbol",children:[n.jsx("path",{d:ua.p37835f00,fill:t,className:"transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-0 group-hover:scale-95 origin-center"}),n.jsx("path",{d:ua.p3111bb80,fill:t,className:"transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[150px]"})]})})}function On({className:e,color:t="#DAFF45"}){return n.jsx("svg",{viewBox:"0 0 460 373",className:W("block select-none",e),fill:"none",preserveAspectRatio:"xMidYMid meet",xmlns:"http://www.w3.org/2000/svg",children:n.jsx("g",{transform:"translate(0 93.61)",className:"transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-[10px]",children:n.jsxs("g",{id:"Text",children:[n.jsx("path",{d:wt.p18f5d700,fill:t}),n.jsx("path",{d:wt.p37c6300,fill:t}),n.jsx("path",{d:wt.pbe454f0,fill:t})]})})})}const At={en:{nav:{work:"Work",philosophy:"Philosophy",services:"Services",contact:"Contact",schedule:"Schedule a call",process:"Process",journal:"Journal",detailed_brief:"Detailed Brief",pricing:"Limited Access",tagline:"YOUR AGILE DESIGN PARTNER"},hero:{title:"The system<br/>behind great design.",title_mobile:"The system<br/>behind<br/>great design.",description_title:"Strategic design partner for those who scale — operator for those who build.",description_body:"Retainer for the steady. Project for the sharp. Same r3loop — applied to both, and to our own products in production.",quote:"Design begins with a decision, not a tool.",micro_1:"80%+ briefs ready first round.",micro_2:"Approval cycles cut 3×.",micro_3:"Weekly shipping cadence.",cta_start:"Start a brief",cta_work:"Book a call"},references:{title:"References",subheader:"Trusted by teams shipping at scale.",testimonials:[{quote:"Working with r352 is a pleasure. They are proactive, transparent, and truly care about the outcome. A reliable partner for any scale.",author:"Alina Sztoch",role:"Chief Executive Officer",company:"Kubota Store"},{quote:"Their attitude distinguishes them. They don't just execute tasks; they think along with us and bring solutions that drive real value.",author:"Marek Morisson",role:"Managing Director",company:"Muzk Management"},{quote:"A partner you can trust. The communication is seamless, and their commitment to quality translates directly into our business results.",author:"Magdalena Rodak",role:"Marketing Director",company:"Benefit Systems"},{quote:"Professionalism and great energy. They understand the business context and deliver work that actually moves the needle.",author:"Filip Mazurkiewicz",role:"Marketing Manager",company:"Sonova Group"},{quote:"It feels like they are part of our internal team. Flexible, responsive, and always focused on delivering the best possible impact.",author:"Lidia Kołucka",role:"Marketing Director",company:"Orlen / ex. Pelion"},{quote:"Consistent quality across every investment we launch. Communication is precise, deadlines hold — exactly what real estate campaigns need.",author:"Michalina Piątkowska",role:"Marketing Coordinator",company:"Archicom"}]},services:{title:"Our expertise",description:"Premium quality. Systemized execution. Fast delivery.",list:{operating_system:{title:"Operating System",items:["Briefing & intake structure","Stakeholder alignment","Templates & SOPs","QA standards"]},design_production:{title:"Design & Production",items:["Product UX/UI","UI systems","Campaign toolkits","Social content systems"]},build_optimize:{title:"Build & Optimize",items:["Implementation","Performance optimization","SEO foundations","CMS workflows"]}}},services_list:{heading:"How we deliver",narrative:"Backed by structured processes. Elevated by AI tools.",narrative_process:"Backed by structured processes",narrative_ai:"Elevated by AI-powered execution",note_title:"Approach",note_body:"We build a delivery system that makes quality and speed predictable — then use it to ship product UX and communication assets.",items:{"01":{title:"Operating System",description:"Delivery, Intake, QA Standards, Governance",output:"You get: delivery playbook, brief templates, approval workflow, QA checklist, naming & file conventions, onboarding guide for new team members"},"02":{title:"Design & Production",description:"Product UX/UI, Campaign Toolkits, Motion, Art Direction",output:"You get: campaign creatives, social media templates, landing pages, email templates, brand guidelines, packaging, print assets, motion graphics, ad formats across channels"},"03":{title:"Build & Optimize",description:"Implementation, Performance, CMS, Handoff",output:"You get: live website, CMS setup with editable content, performance dashboard, analytics integration, handoff documentation, iteration based on real data"}}},services_page:{title:"Services",deliverables:{label:"Deliverables",heading:"What we ship",includes_label:"Includes",output_label:"Output"},intro:`We turn messy requests into ready-to-publish output — through a repeatable delivery system and a senior quality bar.
End-to-end: alignment → design → production → handoff.`,micro:"",hero_title:"What we ship",hero_subtitle:"Brand, campaigns, and web - delivered with a quality bar, QA, and a steady cadence.",cards:[{title:"Brand System",description:"A clear brand foundation built to stay consistent across teams and channels.",output:"Brand rules + usable templates. Your team ships on-brand without checking with you first.",best_for:"Companies launching, rebranding, or scaling across new markets and channels.",includes:["Visual identity + core rules","Typography + layout system","Color system (digital + print)","Photography & illustration guidelines","Template set (social, ads, deck, email)","Icon set in brand style"],whats_inside:["Brand Guidelines Document (PDF)","Logo package — all versions, all formats (SVG, PNG, EPS)","Typography hierarchy per medium (web, print, social)","Color palette with HEX, RGB, CMYK, Pantone codes","Layout grid system per format","Template files — social posts, stories, covers, ads, deck, email header","Photography mood & direction guide","Do's & don'ts reference sheet"]},{title:"Campaign Toolkit",description:"A modular campaign asset set designed to scale beyond one-off visuals.",output:"Publish-ready KV + variants + templates. One concept, every channel, zero rework.",best_for:"Marketing teams running multi-channel campaigns with tight deadlines and high volume.",includes:["Concept + messaging structure","Key Visual + modular layout templates","Social + performance ad variants","Motion package (video, GIF, animation)","Print adaptations (poster, flyer, POS)","Copy matrix per format and audience"],whats_inside:["Key Visual in master resolution + adaptation guide","Modular layout templates for self-assembly","Social media variants — posts, stories, reels covers (FB, IG, LinkedIn, TikTok)","Performance ad formats — GDN, Meta, LinkedIn sizes","Motion assets — 15s, 30s, GIF loops","CMYK print files — posters, flyers, rollups, POS materials","Headline/subhead/CTA variants per segment","Campaign asset checklist — full format inventory"]},{title:"Always-On Communication",description:"Ongoing communication support delivered in a predictable rhythm.",output:"Consistent weekly/monthly drops. Your channels stay active without internal production overhead.",best_for:"Teams that need steady content output but don't have the bandwidth to manage production in-house.",includes:["Monthly/weekly content plan","Production + iterations","QA + consistency control","Performance notes + optimization","Steady delivery cadence"],whats_inside:["Content calendar with topics, formats, channels","Reusable content templates per format (post, story, newsletter, blog)","Production queue with statuses and deadlines","QA report before every publish cycle","Iteration log — what changed, why","Performance notes — what worked, what to adjust next","Monthly/weekly drops on schedule, no delays"]},{title:"Website Launch",description:"A premium website built for clarity, conversion, and maintainability.",output:"Launch-ready site + handoff. Your team edits content, adds pages, and tracks performance without calling us.",best_for:"Companies that need a website that performs, converts, and doesn't require a developer for every content update.",includes:["Structure + UX","UI design + component system","Build + CMS setup","SEO baseline + performance audit","Launch support + handoff"],whats_inside:["Sitemap + information architecture","Wireframes — per page type","UI design — pixel-perfect per breakpoint (desktop, tablet, mobile)","Component library in Figma","Interactive prototype of key flows","Frontend build (Next.js / Webflow / custom CMS)","CMS with editable content fields","SEO setup — meta, OG images, sitemap.xml, robots.txt","Performance audit — Lighthouse, Core Web Vitals","Launch checklist — redirects, analytics, tracking, forms","Handoff documentation — how your team edits content independently"]},{title:"Digital Product UX",description:"End-to-end UX/UI from problem framing to dev-ready delivery.",output:"Prototype + UI system + specs. Your dev team builds from a single source of truth, not loose mockups.",best_for:"Product teams building or redesigning digital products that need to move fast without accumulating design debt.",includes:["Flow + architecture","UI system + prototype","Dev-ready specs + QA","Component documentation","User research synthesis"],whats_inside:["User research synthesis — personas, journey map, pain points","Information architecture + flow diagrams","Wireframes (low & mid fidelity) — key screens and flows","UI design system — components, tokens, spacing, color, type","High-fidelity clickable prototype in Figma","Dev-ready specs — redlines, spacing, all states (hover, active, disabled, error, loading)","Asset export + component documentation","QA checklist per screen"]},{title:"AI Development & Automation",description:"We take the system we've built and operationalize it — wired into your existing tools, accelerated by AI workflows.",output:"Brief intake, scoring, quality review and asset routing running as a live system — not a deck. Your team brief, we triage, AI accelerates, output ships.",best_for:"Teams that already have standards but execution still depends on heroics — intake by email, manual scoring, QA in DMs. Ready to ship the operating layer that turns standards into automated workflow.",includes:["AI brief assistant tailored to your standards","Workflow integration (Asana / Notion / Figma / Slack)","Quality review automation per asset type","Routing & ownership engine","Operating dashboards + monthly review rhythm"],whats_inside:["AI brief assistant — custom prompts trained on your readiness checklist and brand voice","Tool integrations — intake, scoring and routing wired into your existing stack (Asana, Notion, Figma, Slack, email)","Quality review automation — checklists run automatically per asset type, surfacing exceptions to humans","Approval ownership engine — who decides what, escalation paths, conflict resolution rules in the system, not in DMs","Workflow performance dashboard — cycle time, revision rates, brief quality, recurring bottlenecks","Monthly review rhythm — operating cadence with the team, not just a one-off launch","Team coaching — how to operate the system, when to override, when to trust automation","90-day adoption plan with checkpoint reviews"]}],delivery_os:{title:"Your Delivery Operating System",subtitle:"Every engagement follows the same proven structure — so quality, speed, and sanity scale together.",phases:[{label:"01 — Diagnose",title:"Diagnose",docs:[{name:"Diagnostic Report",desc:"We map your current delivery flow, find bottlenecks, and define what to fix first."},{name:"Operating Agreement",desc:"Rules of engagement: cadence, decision owners, feedback protocol, definition of done."}]},{label:"02 — Deliver",title:"Deliver",docs:[{name:"Brief Template",desc:"Standardized format: goal, audience, constraints, examples, done criteria. One path. Always."},{name:"Weekly Delivery Pack",desc:"Publish-ready output every week: files, naming, variants, specs, handoff notes."},{name:"Decision Log",desc:"What was decided, when, by whom. Closes loops. Kills 'but I thought we agreed…'"}]},{label:"03 — Scale",title:"Scale",docs:[{name:"System Documentation",desc:"Templates, components, checklists, QA gates, naming rules — everything your team needs to run without us."},{name:"Impact Summary",desc:"Before vs after: what changed, what improved, what's next. Your case for continuing or scaling."}]}]},best_fit:{title:"Best fit",items:["Multi-team orgs with constant requests and high standards","Multi-location brands that need consistency at scale","Teams that value responsiveness and fewer feedback loops"]},engagement:{label:"Engagement",heading:"How we work",cta:"Let's build your delivery system ��� and ship.",models:{sprint:{type:"Fixed scope",title:"Sprint",desc:"A defined scope delivered fast. Ideal for launches, redesigns, and campaign toolkits."},retainer:{type:"Ongoing",title:"Operating Partner",desc:"Systemized, senior-level delivery with a predictable cadence — responsive, consistent, always launch-ready."},embedded:{type:"Embedded",title:"Embedded Design Partner",desc:"We plug into your team to accelerate decisions, improve the workflow, and raise quality across output."}}}},work:{title:"Selected Work",subtitle:"Recent projects that define our approach",view_all:"View all projects",selected_work:"Selected Work",role:"Role",year:"Year",client:"Client",visit_site:"Visit Website",next_project:"Next Project",ready:"WORK.READY",next:"work.next",back_to_work:"Back to Work",cta_work:"See selected work"},philosophy:{teaser:{title:"Beautiful work is the baseline.<br />The system behind it is the advantage.",description:`We craft premium design. But craft alone doesn't scale.
A delivery system does.`,cta:"Read our philosophy"}},philosophy_page:{label:"Philosophy",title_line1:"Beautiful work",title_line2:"is the baseline.",subtitle:"The system behind it is the advantage.",intro_col1:"We craft premium design. But craft alone doesn't scale. A delivery system does.",intro_col2:"This is what we believe, how we operate, and why it matters for every team we work with.",beliefs:{"01":{title:`Craft is the foundation.
System is the multiplier.`,description:"We obsess over every pixel — that's non-negotiable. But pixels alone don't scale. We build operating systems for design delivery — intake paths, brief standards, feedback protocols, packaging rules, shipping cadence — so that premium quality repeats itself without heroics."},"02":{title:`Cadence beats urgency.
Every time.`,description:`"ASAP" is a signal there's no system. We replace fire drills with weekly rhythm — predictable load, predictable output, predictable quality. When there's cadence, "urgent" goes back to being an exception.`},"03":{title:`Premium is a standard,
not a personality trait.`,description:"Quality doesn't drop because people lack skill. It drops because everything becomes ad hoc. We build the templates, checklists, components, and handoff packs that make premium repeatable — across every team, every project."},"04":{title:`Calm execution is
the real competitive advantage.`,description:`Teams don't want "fast". They want fast without chaos — where approvals don't turn into drama, standards stay consistent, and nothing depends on panic and heroics. Calm is engineered, not wished for.`},"05":{title:`Close loops. Early.
Every time.`,description:`Open loops are the hidden tax of modern work: briefs without success criteria, feedback that's just a feeling, "final" that never becomes final. Speed without burnout comes from closing loops — on purpose, every time.`},"06":{title:`Structure creates freedom.
Not the other way around.`,description:"Remote work isn't the problem. Lack of structure is. When intake, decisions, feedback, and shipping have clear rules, creative energy goes into the work — not into coordination overhead."}},contrasts:[{old:"We'll make it look good this time.",new:"We'll build the system that makes it look good every time — across every team, every launch."},{old:"Send me the brief whenever.",new:"One intake path. One brief format. One decision owner. Always."},{old:"We're flexible and available.",new:"We ship every week. Feedback has windows. Cadence is non-negotiable."},{old:"We'll handle whatever you need.",new:"We diagnose your delivery bottleneck first, then build the system that removes it."},{old:"We move fast and break things.",new:"We move at a sustainable rhythm and ship things that hold."},{old:"Here's a beautiful deck. Good luck scaling it.",new:"Here's the design and the operating system — so it scales itself."}],nonneg_label:"Non-Negotiables",nonneg:[{title:"Every engagement starts with a diagnostic.",desc:"We don't guess. We map your current delivery flow, find the bottleneck, and build from there."},{title:"One decision owner per workstream.",desc:"If nobody can say yes or no, feedback never ends. We require clarity before we start."},{title:"Weekly shipping cadence.",desc:`Every week, something real goes out. Not "progress". Output. Publish-ready, packaged, named, spec'd.`},{title:"Feedback has structure.",desc:"Feedback happens in windows, with criteria, in a format. Not as a constant stream of feelings across DMs."},{title:"We build systems, not dependencies.",desc:"When we leave, the operating model stays. Templates, components, checklists, quality rules — all yours."},{title:"Responsiveness ≠ availability.",desc:"We clarify fast, align decisions fast, deliver the next usable step fast. We don't sit online 12 hours."}],promise:"Your design pipeline should run like infrastructure — not depend on heroics.",promise_sub:"We work with organizations that need design delivery which scales without losing quality, speed, or sanity.",note:{title:"A note on craft",p1:"In the era of AI output, craft matters more.",p2:`Typography. Spacing. Hierarchy. Micro-decisions.
Details are not decoration.
They are signals of discipline.`,p3:`Systems create structure.
Craft protects standards.`},cta:{title:"Let's build your delivery system — and ship.",body:`Not just a campaign.
Not just a redesign.
A repeatable way to produce high-quality work at scale.`,start:"Start a project",explore:"Schedule a call"}},contact:{title:"Let's talk",subtitle:"Tell us about your project",label:"Contact",title_line1:"Let's diagnose",title_line2:"what's slowing you down.",intro:"Tell us about your current stage and what you're building. Whether you need a clearer direction, a scalable design system, or an ongoing partnership, we'll help you shape the path forward.",sidebar:{email_label:"Email us",text:"We respond to all inquiries within 24 hours."},form:{name:"Name",name_placeholder:"John Doe",email:"Email",email_placeholder:"john@example.com",company:"Company",company_placeholder:"Company Name",context_label:"Tell us about your project",context_placeholder:"Project goals, challenges, timeline...",stage_label:"Project Stage",support_label:"How can we help?",support_hint:"Select up to 3",budget_label:"Budget Range (EUR)",timeline_label:"Timeline",message:"Message",submit:"Send Message",sending:"Sending...",footer_text_1:"By submitting this form, you agree to our privacy policy.",footer_text_2:"We respect your privacy and will never share your data."},errors:{required:"This field is required",email:"Please enter a valid email",select_one:"Please select one option"},success:{title:"Message Sent",body:"Thank you for reaching out. We'll get back to you shortly."},info:{email:"Email us",social:"Follow us",address:"Address",address_value:"Mallorca, Baleares, Santa Catalina (remote)",time:"Local time",availability:"Availability",available:"Accepting new projects"},detailed_brief:{label:"Detailed Brief",title:"Know exactly what you need?",description:"Skip the intro call and provide us with structured project details directly.",cta:"I want to fill detailed brief"}},engagement:{title:"Scale system<br/>not chaos",subtitle:"Three phases. One delivery system.",models:{project:{subtitle:"FIND THE BOTTLENECK",title:"DIAGNOSE",description:"We look at how your team briefs, approves, and ships - then show you exactly where the time and quality get lost.",features:["Delivery workflow audit","Bottleneck map with root causes","Actionable plan in under 2 weeks"]},retainer:{subtitle:"BUILD THE SYSTEM",title:"BUILD",description:"We design the standards, templates, and delivery process your team needs - so output stays consistent no matter who's executing.",features:["Brand standard templates","Intake process and QA checkpoints","Delivery cadence that ships"]},augmentation:{subtitle:"MAKE IT STICK",title:"SCALE",description:"We hand off everything your team needs to run the system on their own - with guardrails that keep quality consistent.",features:["Full handoff with team training","Built-in guardrails that flag drift","Scales quality without adding headcount"]}}},closing:{title1:"Design begins with a decision,",title2:"not a tool.",body1:"",body2:"",cta_start:"Start a project",cta_work:"Schedule a call"},footer:{idea:"Let's build your delivery system — and ship.",bold_ideas:"Bold ideas",shaped:"shaped with care.",cta:"Start a project",studio:"Studio",sitemap:"Sitemap",social:"Social",local_time:"Local Time",back_to_top:"Back to Top",rights:"All rights reserved.",privacy:"Privacy Policy",terms:"Terms of Service"},index:"Index",marquee:{text:"DIAGNOSE · BUILD · SCALE"}},pl:{nav:{work:"Prace",philosophy:"Filozofia",services:"Usługi",contact:"Kontakt",schedule:"Umów rozmowę",process:"Proces",journal:"Dziennik",detailed_brief:"Szczegółowy Brief",pricing:"Dostęp ograniczony",tagline:"TWÓJ SPRAWNY PARTNER DESIGNOWY"},hero:{title:"System<br/>za świetnym designem.",title_mobile:"System<br/>za świetnym<br/>designem.",description_title:"Strategiczny design partner dla tych, którzy skalują — operator dla tych, którzy budują.",description_body:"Retainer dla stabilnych. Projekt dla ostrych. To samo r3loop — zastosowane do obu, i do naszych własnych produktów w produkcji.",quote:"Projektowanie zaczyna się od decyzji, nie od narzędzia.",micro_1:"80%+ briefów gotowych za pierwszym razem.",micro_2:"Cykle akceptacji 3× szybsze.",micro_3:"Tygodniowy rytm dostaw.",cta_start:"Wypełnij brief",cta_work:"Umów rozmowę"},references:{title:"Referencje",subheader:"Zaufali nam liderzy skalujący biznes.",testimonials:[{quote:"Współpraca z r352 to czysta przyjemność. Są proaktywni, transparentni i naprawdę dbają o rezultat. Niezawodny partner na każdą skalę.",author:"Alina Sztoch",role:"Chief Executive Officer",company:"Kubota Store"},{quote:"Ich podejście ich wyróżnia. Nie tylko wykonują zadania, ale myślą razem z nami i przynoszą rozwiązania, które budują realną wartość.",author:"Marek Morisson",role:"Managing Director",company:"Muzk Management"},{quote:"Partner, któremu można zaufać. Komunikacja jest bezproblemowa, a ich zaangażowanie w jakość przekłada się bezpośrednio na nasze wyniki biznesowe.",author:"Magdalena Rodak",role:"Marketing Director",company:"Benefit Systems"},{quote:"Pełen profesjonalizm i świetna energia. Rozumieją kontekst biznesowy i dostarczają rozwiązania, które faktycznie robią różnicę.",author:"Filip Mazurkiewicz",role:"Marketing Manager",company:"Sonova Group"},{quote:"Czujemy, jakby byli częścią naszego wewnętrznego zespołu. Elastyczni, responsywni i zawsze skupieni na dowiezieniu najlepszego możliwego wpływu.",author:"Lidia Kołucka",role:"Marketing Director",company:"Orlen / ex. Pelion"},{quote:"Spójna jakość przy każdej inwestycji, którą uruchamiamy. Komunikacja precyzyjna, deadliny dotrzymywane — dokładnie tego potrzebują kampanie w real estate.",author:"Michalina Piątkowska",role:"Marketing Coordinator",company:"Archicom"}]},services:{title:"Nasza ekspertyza",description:"Najwyższa jakość. Systemowe wykonanie. Szybkie dostarczanie.",list:{operating_system:{title:"System Operacyjny",items:["Struktura briefingu i intake","Alignment interesariuszy","Szablony i SOP","Standardy QA"]},design_production:{title:"Design i Produkcja",items:["UX/UI produktu","Systemy UI","Toolkity kampanijne","Systemy contentu social"]},build_optimize:{title:"Budowa i Optymalizacja",items:["Wdrożenie","Optymalizacja wydajności","Fundamenty SEO","Workflow CMS"]}}},services_list:{heading:"Jak dostarczamy",narrative:"Wspierane ustrukturyzowanymi procesami. Wzmocnione narzędziami AI.",narrative_process:"Ustrukturyzowane procesy",narrative_ai:"Egzekucja wzmocniona AI",note_title:"Podejście",note_body:"Budujemy system dostarczania, który sprawia, że jakość i szybkość są przewidywalne — następnie używamy go do dostarczania UX produktu i zasobów komunikacyjnych.",items:{"01":{title:"System Operacyjny",description:"Dostarczanie, Intake, Standardy QA, Governance",output:"Otrzymujesz: delivery playbook, szablony briefów, ścieżki akceptacji, checklistę QA, konwencje nazewnictwa, onboarding guide"},"02":{title:"Design i Produkcja",description:"UX/UI Produktu, Toolkity Kampanijne, Motion, Art Direction",output:"Otrzymujesz: kreacje do kampanii, szablony social media, landing pages, szablony email, wytyczne marki, motion, formaty reklamowe cross-channel"},"03":{title:"Budowa i Optymalizacja",description:"Wdrożenie, Wydajność, CMS, Handoff",output:"Otrzymujesz: gotową stronę www, CMS z edytowalną treścią, panel wydajności, integrację analityki, dokumentację handoff, iteracje oparte na danych"}}},services_page:{title:"Services",deliverables:{label:"Produkty",heading:"Co dostarczamy",includes_label:"Zawiera",output_label:"Wynik"},intro:`Zamieniamy chaotyczne zlecenia w gotowe do publikacji efekty — dzięki powtarzalnemu systemowi dostarczania i wysokim standardom jakości.
Od początku do końca: wdrożenie → projekt → produkcja → przekazanie.`,micro:"",hero_title:"Co dostarczamy",hero_subtitle:"Branding, kampanie i strony www - dostarczane z jakością, QA i stałym rytmem.",cards:[{title:"System Marki",description:"Jasny fundament marki zbudowany, by zachować spójność w zespołach i kanałach.",output:"Zasady marki + szablony. Twój zespół wdraża markę bez pytania o zgodę na każdym kroku.",best_for:"Firmy uruchamiające nową markę, rebrandujące się lub wchodzące na nowe rynki i kanały.",includes:["Identyfikacja wizualna + zasady","Typografia + system layoutów","System kolorów (digital + druk)","Wytyczne fotografii i ilustracji","Zestaw szablonów (social, ads, prezk, email)","Zestaw ikon w stylu marki"],whats_inside:["Brand Book (PDF)","Paczka logo — wszystkie wersje i formaty (SVG, PNG, EPS)","Hierarchia typografii dla mediów (web, print, social)","Paleta kolorów z kodami HEX, RGB, CMYK, Pantone","System siatek dla różnych formatów","Pliki szablonów — posty, stories, okładki, reklamy, prezentacje, nagłówki email","Przewodnik po stylu zdjęć (moodboard & kierunek)","Arkusz referencyjny Do's & don'ts"]},{title:"Toolkit Kampanijny",description:"Modułowy zestaw zasobów kampanijnych zaprojektowany do skalowania poza jednorazowe wizualizacje.",output:"Gotowy do publikacji KV + warianty + szablony. Jeden koncept, każdy kanał, zero powtórek.",best_for:"Zespoły marketingowe prowadzące wielokanałowe kampanie z krótkimi terminami i dużym wolumenem.",includes:["Koncept + struktura przekazu","Key Visual + szablony modułowe","Warianty social + performance","Paczka motion (wideo, GIF, animacja)","Adaptacje do druku (plakat, ulotka, POS)","Matryca tekstów dla formatów i grup docelowych"],whats_inside:["Key Visual w najwyższej rozdzielczości + przewodnik adaptacji","Modułowe szablony układów do samodzielnego montażu","Warianty social media — posty, stories, okładki reels (FB, IG, LinkedIn, TikTok)","Formaty reklam performance — GDN, Meta, LinkedIn","Zasoby motion — 15s, 30s, zapętlone GIFy","Pliki do druku CMYK — plakaty, ulotki, rollupy, POS","Warianty nagłówków/podtytułów/CTA dla segmentów","Checklista zasobów kampanii — pełna inwentaryzacja"]},{title:"Komunikacja Always-On",description:"Ciągłe wsparcie komunikacyjne dostarczane w przewidywalnym rytmie.",output:"Spójne zrzuty cotygodniowe/miesięczne. Twoje kanały są aktywne bez obciążeń wewnętrznych.",best_for:"Zespoły potrzebujące stałego dopływu treści, nie mające jednak mocy przerobowych na zarządzanie produkcją in-house.",includes:["Miesięczny/tygodniowy plan treści","Produkcja + iteracje","QA + kontrola spójności","Analiza wyników + optymalizacja","Stałe tempo dostarczania"],whats_inside:["Kalendarz treści z tematami, formatami i kanałami","Szablony wielokrotnego użytku dla formatów (post, story, newsletter, blog)","Kolejka produkcji ze statusem i terminami","Raport QA przed każdym cyklem publikacji","Dziennik iteracji — co się zmieniło i dlaczego","Notatki z wyników — co zadziałało, co poprawić","Miesięczne/tygodniowe paczki na czas, bez opóźnień"]},{title:"Start Strony WWW",description:"Strona premium zbudowana dla jasności, konwersji i łatwego utrzymania.",output:"Gotowa strona + przekazanie. Twój zespół edytuje treści bez dzwonienia do nas.",best_for:"Firmy, które potrzebują wydajnej, konwertującej strony niewymagającej developera przy każdej zmianie tekstu.",includes:["Struktura + UX","Projekt UI + system komponentów","Budowa + konfiguracja CMS","Baza SEO + audyt wydajności","Wsparcie startu + przekazanie"],whats_inside:["Sitemap + architektura informacji","Makiety (wireframes) dla poszczególnych podstron","Projekt UI — dopracowany dla każdego punktu (desktop, tablet, mobile)","Biblioteka komponentów w Figma","Interaktywny prototyp kluczowych ścieżek","Budowa frontendu (Next.js / Webflow / dedykowany CMS)","CMS z edytowalnymi polami treści","Konfiguracja SEO — meta, OG, sitemap.xml, robots.txt","Audyt wydajności — Lighthouse, Core Web Vitals","Checklista wdrożeniowa — przekierowania, analityka, trackowanie, formularze","Dokumentacja wdrożeniowa — jak zespół samodzielnie zarządza treścią"]},{title:"UX Produktu Cyfrowego",description:"Kompleksowy UX/UI od zdefiniowania problemu do gotowego projektu.",output:"Prototyp + system UI + specyfikacja. Dev ma jedno źródło prawdy, nie luźne makiety.",best_for:"Zespoły produktowe budujące lub odświeżające aplikacje, chcące działać szybko bez długu technologicznego.",includes:["Flow + architektura","System UI + prototyp","Specyfikacja dev-ready + QA","Dokumentacja komponentów","Synteza badań z użytkownikami"],whats_inside:["Synteza badań — persony, mapy podróży, pain points","Architektura informacji + diagramy flow","Makiety (low/mid-fi) — kluczowe ekrany","Design system UI — komponenty, tokeny, odstępy, kolor, typografia","Klikalny prototyp hi-fi w Figmie","Specyfikacja dla programistów — redlines, stany (hover, aktywne, błędy)","Eksport zasobów + dokumentacja komponentów","Checklista QA dla każdego ekranu"]},{title:"AI Development & Automation",description:"Bierzemy system który zbudowaliśmy i operacjonalizujemy go — wpięty w Wasze istniejące narzędzia, przyspieszony przez workflow AI.",output:"Brief intake, scoring, quality review i routing assetów działają jako żywy system — nie deck. Zespół briefuje, my triagujemy, AI przyspiesza, output idzie.",best_for:"Zespoły które mają już standardy ale egzekucja wciąż zależy od heroizmu — intake przez email, manualny scoring, QA w DM-ach. Gotowe wdrożyć warstwę operacyjną, która zamienia standardy w zautomatyzowany workflow.",includes:["AI brief assistant dopasowany do Waszych standardów","Integracja workflow (Asana / Notion / Figma / Slack)","Automatyzacja quality review per typ assetu","Engine routingu i ownership decyzji","Dashboardy operacyjne + miesięczny rytm review"],whats_inside:["AI brief assistant — custom prompty trenowane na Waszej liście gotowości i tone of voice","Integracje narzędziowe — intake, scoring i routing wpięte w istniejący stack (Asana, Notion, Figma, Slack, email)","Automatyzacja quality review — checklisty uruchamiają się automatycznie per typ assetu, eskalując wyjątki do ludzi","Engine ownership akceptacji — kto decyduje o czym, ścieżki eskalacji, zasady rozwiązywania konfliktów w systemie, nie w DM-ach","Workflow performance dashboard — cycle time, wskaźniki poprawek, jakość briefów, powtarzające się wąskie gardła","Miesięczny rytm review — kadencja operacyjna z zespołem, nie jednorazowy launch","Coaching zespołu — jak operować systemem, kiedy nadpisać, kiedy zaufać automatyzacji","90-dniowy plan adopcji z checkpoint reviews"]}],delivery_os:{title:"Twój System Operacyjny Dostarczania",subtitle:"Każdy engagement przebiega według tej samej sprawdzonej struktury — tak, by jakość, szybkość i zdrowie psychiczne skalowały się razem.",phases:[{label:"01 — Diagnoza",title:"Diagnoza",docs:[{name:"Raport Diagnostyczny",desc:"Mapujemy obecny flow dostarczania, znajdujemy bottlenecki i definiujemy co naprawić najpierw."},{name:"Umowa Operacyjna",desc:"Reguły gry: kadencja, decydenci, protokół feedbacku, definicja gotowości."}]},{label:"02 — Dostarczanie",title:"Dostarczanie",docs:[{name:"Szablon Briefu",desc:"Standaryzowany format: cel, audience, ograniczenia, przykłady, kryteria done. Jedna ścieżka. Zawsze."},{name:"Cotygodniowa Paczka",desc:"Gotowy do publikacji output co tydzień: pliki, nazewnictwo, warianty, specyfikacje, notatki handoff."},{name:"Log Decyzji",desc:"Co zostało zdecydowane, kiedy, przez kogo. Zamyka pętle. Zabija 'ale myślałem, że się zgodziliśmy…'"}]},{label:"03 — Skala",title:"Skala",docs:[{name:"Dokumentacja Systemu",desc:"Szablony, komponenty, checklisty, bramki QA, reguły nazewnictwa — wszystko, czego Twój zespół potrzebuje, by działać bez nas."},{name:"Podsumowanie Wpływu",desc:"Przed vs po: co się zmieniło, co się poprawiło, co dalej. Twój argument za kontynuacją lub skalowaniem."}]}]},best_fit:{title:"Dla kogo",items:["Organizacje wielozespołowe z ciągłymi zleceniami i wysokimi standardami","Marki wielolokalizacyjne potrzebujące spójności przy dużej skali","Zespoły ceniące responsywność i mniejszą liczbę pętli feedbackowych"]},engagement:{label:"Współpraca",heading:"Modele współpracy",cta:"Zbudujmy Twój system dostarczania — i zacznijmy wysyłać.",models:{sprint:{type:"Stały zakres",title:"Sprint",desc:"Zdefiniowany zakres dostarczony szybko. Idealny dla startów, redesignów i toolkitów kampanijnych."},retainer:{type:"Ciągły",title:"Partner Operacyjny",desc:"Systemowe dostarczanie na poziomie senior z przewidywalnym rytmem — responsywne, spójne, zawsze gotowe do publikacji."},embedded:{type:"Embedded",title:"Embedded Design Partner",desc:"Dołączamy do Twojego zespołu, by przyspieszyć decyzje, usprawnić workflow i podnieść jakość."}}}},work:{title:"Wybrane prace",subtitle:"Ostatnie projekty definiujące nasze podejście",view_all:"Zobacz wszystkie projekty",selected_work:"Wybrane Prace",role:"Rola",year:"Rok",client:"Klient",visit_site:"Odwiedź stronę",next_project:"Następny Projekt",ready:"GOTOWY.NA.WIĘCEJ",next:"następny.projekt",back_to_work:"Powrót do prac",cta_work:"Zobacz wybrane prace"},philosophy_page:{label:"Filozofia",title_line1:"Piękna praca",title_line2:"to baseline.",subtitle:"System za nią to przewaga.",intro_col1:"Tworzymy premium design. Ale sam craft się nie skaluje. System dostarczania — tak.",intro_col2:"To jest to, w co wierzymy, jak działamy i dlaczego to ma znaczenie dla każdego zespołu, z którym pracujemy.",beliefs:{"01":{title:`Craft to fundament.
System to mnożnik.`,description:"Dbamy o każdy piksel — to nienegocjowalne. Ale piksele same się nie skalują. Budujemy systemy operacyjne dostarczania designu — ścieżki intake, standardy briefów, protokoły feedbacku, reguły pakowania, kadencja wysyłki — tak, by premium jakość powtarzała się bez heroizmu."},"02":{title:`Kadencja bije pilność.
Za każdym razem.`,description:'"ASAP" to sygnał, że nie ma systemu. Zastępujemy gaszenie pożarów cotygodniowym rytmem — przewidywalne obciążenie, przewidywalny output, przewidywalna jakość.'},"03":{title:`Premium to standard,
nie cecha osobowości.`,description:"Jakość nie spada, bo ludziom brakuje umiejętności. Spada, bo wszystko staje się ad hoc. Budujemy szablony, checklisty, komponenty i paczki handoff, które czynią premium powtarzalnym."},"04":{title:`Spokojna realizacja to
prawdziwa przewaga.`,description:'Zespoły nie chcą tylko "szybko". Chcą szybko bez chaosu — gdzie zatwierdzenia nie zamieniają się w dramat, standardy pozostają spójne, i nic nie zależy od paniki i heroizmu.'},"05":{title:`Zamykaj pętle. Wcześnie.
Za każdym razem.`,description:'Otwarte pętle to ukryty podatek nowoczesnej pracy: briefy bez kryteriów sukcesu, feedback który jest tylko uczuciem, "finalne" które nigdy nie staje się finalne.'},"06":{title:`Struktura tworzy wolność.
Nie odwrotnie.`,description:"Praca zdalna nie jest problemem. Brak struktury jest. Gdy intake, decyzje, feedback i wysyłka mają jasne reguły, energia kreatywna idzie w pracę — nie w koordynację."}},contrasts:[{old:"Zrobimy, żeby ładnie wyglądało tym razem.",new:"Zbudujemy system, w którym wygląda ładnie za każdym razem — w każdym zespole, przy każdym launchu."},{old:"Przyślij brief kiedy chcesz.",new:"Jedna ścieżka intake. Jeden format briefu. Jeden decydent. Zawsze."},{old:"Jesteśmy elastyczni i dostępni.",new:"Wysyłamy co tydzień. Feedback ma okna. Kadencja jest nienegocjowalna."},{old:"Zajmiemy się czymkolwiek potrzebujesz.",new:"Najpierw diagnozujemy bottleneck, potem budujemy system, który go usuwa."},{old:"Działamy szybko i łamiemy rzeczy.",new:"Działamy w zrównoważonym rytmie i wysyłamy rzeczy, które się trzymają."},{old:"Oto piękny deck. Powodzenia w skalowaniu.",new:"Oto design i system operacyjny — żeby skalował się sam."}],nonneg_label:"Nienegocjowalne",nonneg:[{title:"Każdy engagement zaczyna się od diagnostyki.",desc:"Nie zgadujemy. Mapujemy obecny flow dostarczania, znajdujemy bottleneck i budujemy od tego miejsca."},{title:"Jeden decydent na workstream.",desc:"Jeśli nikt nie może powiedzieć tak lub nie, feedback nigdy się nie kończy. Wymagamy jasności przed startem."},{title:"Cotygodniowa kadencja wysyłki.",desc:'Co tydzień wychodzi coś rzeczywistego. Nie "postęp". Output. Gotowy do publikacji, spakowany, nazwany, wyspecyfikowany.'},{title:"Feedback ma strukturę.",desc:"Feedback dzieje się w oknach, z kryteriami, w formacie. Nie jako ciągły strumień odczuć na DM-ach."},{title:"Budujemy systemy, nie zależności.",desc:"Gdy odchodzimy, model operacyjny zostaje. Szablony, komponenty, checklisty, reguły jakości — wszystko Twoje."},{title:"Responsywność ≠ dostępność.",desc:"Wyjaśniamy szybko, wyrównujemy decyzje szybko, dostarczamy następny krok szybko. Nie siedzimy online 12 godzin."}],promise:"Twój pipeline designu powinien działać jak infrastruktura — nie zależeć od heroizmu.",promise_sub:"Pracujemy z organizacjami, które potrzebują dostarczania designu skalującego się bez utraty jakości, szybkości i zdrowia psychicznego.",note:{title:"Notatka o rzemiośle",p1:"W erze efektów AI, rzemiosło liczy się bardziej.",p2:`Typografia. Odstępy. Hierarchia. Mikro-decyzje.
Detale nie są dekoracją.
Są sygnałami dyscypliny.`,p3:`Systemy tworzą strukturę.
Rzemiosło chroni standardy.`},cta:{title:"Zbudujmy Twój system dostarczania — i zacznijmy wysyłać.",body:`Nie tylko kampania.
Nie tylko redesign.
Powtarzalny sposób na wysoką jakość na skalę.`,start:"Rozpocznij projekt",explore:"Umów rozmowę"}},contact:{title:"Porozmawiajmy",subtitle:"Opowiedz nam o swoim projekcie",label:"Kontakt",title_line1:"Zdiagnozujmy,",title_line2:"co Cię spowalnia.",intro:"Opowiedz nam o obecnym etapie projektu i tym, co budujesz. Niezależnie od tego, czy potrzebujesz jasnego kierunku, skalowalnego systemu designu, czy stałego partnerstwa – pomożemy Ci obrać właściwą ścieżkę.",sidebar:{email_label:"Napisz do nas",text:"Odpowiadamy na wszystkie zapytania w ciągu 24 godzin."},form:{name:"Imię",name_placeholder:"Jan Kowalski",email:"Email",email_placeholder:"jan@przyklad.pl",company:"Firma",company_placeholder:"Nazwa Firmy",context_label:"Opowiedz nam o projekcie",context_placeholder:"Cele projektu, wyzwania, harmonogram...",stage_label:"Etap Projektu",support_label:"W czym możemy pomóc?",support_hint:"Wybierz max 3",budget_label:"Budżet (EUR)",timeline_label:"Harmonogram",message:"Wiadomość",submit:"Wyślij wiadomość",sending:"Wysyłanie...",footer_text_1:"Wysyłając ten formularz, akceptujesz naszą politykę prywatności.",footer_text_2:"Szanujemy Twoją prywatność i nigdy nie udostępnimy Twoich danych."},errors:{required:"To pole jest wymagane",email:"Wprowadź poprawny email",select_one:"Wybierz jedną opcję"},success:{title:"Wiadomość Wysłana",body:"Dziękujemy za kontakt. Odezwiemy się wkrótce."},info:{email:"Napisz do nas",social:"Śledź nas",address:"Adres",address_value:"Mallorca, Baleares, Santa Catalina (remote)",time:"Czas lokalny",availability:"Dostępność",available:"Przyjmujemy nowe projekty"},detailed_brief:{label:"Szczegółowy Brief",title:"Wiesz dokładnie czego szukasz?",description:"Pomiń wstępną rozmowę i przekaż nam ustrukturyzowane szczegóły projektu.",cta:"Chcę wypełnić szczegółowy brief"}},engagement:{title:"Skalujcie system,<br/>nie chaos",subtitle:"Trzy etapy. Jeden system dostarczania.",models:{project:{subtitle:"ZNAJDŹ WĄSKIE GARDŁO",title:"DIAGNOZA",description:"Sprawdzamy, jak wasz zespół tworzy wytyczne, akceptuje i wdraża projekty - następnie pokazujemy wam dokładnie, gdzie ucieka czas i jakość.",features:["Audyt procesu dostarczania","Mapa wąskich gardeł z ich przyczynami","Plan działania w niespełna 2 tygodnie"]},retainer:{subtitle:"ZBUDUJ SYSTEM",title:"BUDOWA",description:"Projektujemy standardy, szablony i proces dostarczania, jakich potrzebuje wasz zespół - aby efekty były spójne, niezależnie od tego, kto je realizuje.",features:["Szablony standardów marki","Proces przyjmowania zleceń i kontrola jakości","Rytm pracy z dostarczaniem"]},augmentation:{subtitle:"UTRWAL EFEKTY",title:"SKALOWANIE",description:"Przekazujemy wam wszystko, czego wasz zespół potrzebuje, by samodzielnie prowadzić system - wraz z zabezpieczeniami, które utrzymują stałą jakość.",features:["Pełne przekazanie systemu ze szkoleniem zespołu","Wbudowane zabezpieczenia wykrywające odchylenia","Skalowanie jakości"]}}},closing:{title1:"Design begins with a decision,",title2:"not a tool.",body1:"",body2:"",cta_start:"Rozpocznij rozmowę",cta_work:"Zobacz prace"},footer:{idea:"Zbudujmy Twój system dostarczania — i zacznijmy wysyłać.",bold_ideas:"Odważne pomysły",shaped:"z precyzją i troską.",cta:"Rozpocznij projekt",studio:"Studio",sitemap:"Mapa strony",social:"Social Media",local_time:"Czas lokalny",back_to_top:"Wróć na górę",rights:"Wszelkie prawa zastrzeżone.",privacy:"Polityka Prywatności",terms:"Regulamin"},index:"Index",philosophy:{teaser:{title:"Piękna praca to baseline.<br />System za nią to przewaga.",description:`Tworzymy premium design. Ale sam craft się nie skaluje.
System dostarczania — tak.`,cta:"Poznaj naszą filozofię"}},marquee:{text:"DIAGNOZA · BUDOWA · SKALA"}}},ss=y.createContext(void 0);function Ct(e,t){return e&&t.split(".").reduce((a,s)=>a?a[s]:null,e)||t}function Wn({children:e}){const[t,a]=y.useState("en"),s=i=>{const o=Ct(At[t],i);return o==null||o===i?Ct(At.en,i):o};return n.jsx(ss.Provider,{value:{language:t,setLanguage:a,t:s},children:e})}const Bn={language:"en",setLanguage:()=>console.warn("setLanguage called outside of LanguageProvider"),t:e=>Ct(At.en,e)||e};function rt(){const e=y.useContext(ss);return e===void 0?Bn:e}const ns=y.createContext(void 0);function Ln({children:e}){const[t,a]=y.useState("dark"),[s,i]=y.useState(!1),[o,l]=y.useState(null),d=()=>{if(s)return;const p=t==="dark"?"light":"dark";l(p),i(!0),setTimeout(()=>{a(p)},700),setTimeout(()=>{i(!1),l(null)},1500)};return y.useEffect(()=>{t==="light"?document.body.classList.add("global-light-mode"):document.body.classList.remove("global-light-mode")},[t]),n.jsxs(ns.Provider,{value:{theme:t,toggleTheme:d,isTransitioning:s},children:[e,n.jsx(ve,{children:s&&n.jsxs(n.Fragment,{children:[n.jsx(C.div,{className:"fixed top-0 left-0 w-full h-[100vh] bg-[#D4FF00]/90 backdrop-blur-2xl z-[99998] pointer-events-none",initial:{y:"100%"},animate:{y:"0%",transition:{duration:.8,ease:[.76,0,.24,1]}},exit:{y:"-100%",transition:{duration:.7,ease:[.76,0,.24,1],delay:.15}}}),n.jsx(C.div,{className:`fixed top-0 left-0 w-full h-[100vh] ${o==="dark"?"bg-[#0A0A0A]/90":"bg-[#D0DBE1]/90"} backdrop-blur-3xl z-[99999] pointer-events-none`,initial:{y:"100%"},animate:{y:"0%",transition:{duration:.8,ease:[.76,0,.24,1],delay:.1}},exit:{y:"-100%",transition:{duration:.7,ease:[.76,0,.24,1],delay:.05}}}),n.jsx(C.div,{className:"fixed inset-0 z-[100000] pointer-events-none flex items-center justify-center",initial:{clipPath:"inset(100% 0 0 0)"},animate:{clipPath:"inset(0 0 0 0)",transition:{duration:.8,ease:[.76,0,.24,1],delay:.1}},exit:{clipPath:"inset(0 0 100% 0)",transition:{duration:.7,ease:[.76,0,.24,1],delay:.05}},children:n.jsxs("div",{className:"flex flex-col items-center gap-5",children:[n.jsx(ot,{className:"w-7 h-7 md:w-9 md:h-9",color:"#D4FF00"}),n.jsx("span",{className:`text-[11px] md:text-sm font-display uppercase tracking-[0.3em] ${o==="dark"?"text-[#D4FF00]/80":"text-[#000000]/50"}`,children:"your design partner"})]})})]})})]})}const qn={theme:"dark",toggleTheme:()=>console.warn("toggleTheme called outside of ThemeProvider"),isTransitioning:!1};function qt(){const e=y.useContext(ns);return e===void 0?qn:e}/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kn=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Un=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,a,s)=>s?s.toUpperCase():a.toLowerCase()),ya=e=>{const t=Un(e);return t.charAt(0).toUpperCase()+t.slice(1)},is=(...e)=>e.filter((t,a,s)=>!!t&&t.trim()!==""&&s.indexOf(t)===a).join(" ").trim();/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Hn={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zn=y.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:a=2,absoluteStrokeWidth:s,className:i="",children:o,iconNode:l,...d},p)=>y.createElement("svg",{ref:p,...Hn,width:t,height:t,stroke:e,strokeWidth:s?Number(a)*24/Number(t):a,className:is("lucide",i),...d},[...l.map(([c,m])=>y.createElement(c,m)),...Array.isArray(o)?o:[o]]));/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lt=(e,t)=>{const a=y.forwardRef(({className:s,...i},o)=>y.createElement(Zn,{ref:o,iconNode:t,className:is(`lucide-${Kn(ya(e))}`,`lucide-${e}`,s),...i}));return a.displayName=ya(e),a};/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gn=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],Vn=lt("arrow-right",Gn);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $n=[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]],Yn=lt("moon",$n);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jn=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],Xn=lt("sun",Jn);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qn=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],ha=lt("x",Qn);function ei(){const{theme:e,toggleTheme:t}=qt();return n.jsx("button",{onClick:t,"aria-label":e==="dark"?"Switch to light mode":"Switch to dark mode",className:"ml-3 inline-flex items-center justify-center w-7 h-7 text-neutral-500 hover:text-[#D4FF00] transition-colors duration-300",children:e==="dark"?n.jsx(Xn,{className:"w-4 h-4"}):n.jsx(Yn,{className:"w-4 h-4"})})}function ti(){const[e]=Ce(),[t,a]=y.useState(!1),[s,i]=y.useState(!1),[o,l]=y.useState(!1),[d,p]=y.useState(!1),{language:c,setLanguage:m,t:r}=rt(),{theme:h,toggleTheme:g}=qt(),w=st();st(v=>{a(v.scroll>150)}),y.useEffect(()=>{const v=()=>{window.scrollY>150?a(!0):a(!1)};return window.addEventListener("scroll",v,{passive:!0}),()=>window.removeEventListener("scroll",v)},[]),y.useEffect(()=>{const v=new MutationObserver(()=>{p(document.body.classList.contains("lime-theme"))});return v.observe(document.body,{attributes:!0,attributeFilter:["class"]}),()=>v.disconnect()},[]),y.useEffect(()=>{i(!1)},[e]),y.useEffect(()=>{w&&(s?w.stop():w.start())},[s,w]);const j=[{href:"/work",label:r("nav.work")},{href:"/process",label:r("nav.process")},{href:"/philosophy",label:r("nav.philosophy")},{href:"/services",label:r("nav.services")},{href:"/journal",label:r("nav.journal")}],k={href:"/contact",label:r("nav.contact")},F={href:"https://calendly.com/p-reszkovy/30min",label:r("nav.schedule")},U=()=>{m(c==="en"?"pl":"en")},B=r("nav.tagline").split(" ");return n.jsxs(n.Fragment,{children:[n.jsxs("header",{className:W("fixed top-0 w-full z-[999] transition-all duration-700",t?"pointer-events-auto is-scrolled":"pointer-events-none",d?"text-black py-4 md:py-6":W("text-white transition-all duration-700",t?"py-4 md:py-6":"mix-blend-difference py-6 md:py-8")),children:[n.jsx("div",{className:W("absolute inset-0 -z-10 bg-gradient-to-b from-[#050505]/95 via-[#050505]/70 to-transparent pointer-events-none transition-all duration-700 h-[160%]",t&&h==="dark"&&!d?"opacity-100":"opacity-0")}),n.jsx("div",{className:W("absolute inset-0 -z-10 pointer-events-none transition-all duration-700 h-[160%]",t&&(h==="light"||d)?"opacity-100 backdrop-blur-md":"opacity-0"),style:{backgroundColor:"rgba(255, 255, 255, 0.75)",maskImage:"linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)",WebkitMaskImage:"linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)"}}),n.jsxs("div",{className:"px-8 md:px-12 flex justify-between items-center w-full relative z-10",children:[n.jsxs(we,{href:"/",className:"pointer-events-auto cursor-pointer group relative flex items-center z-[1000] gap-[5px]",onMouseEnter:()=>l(!0),onMouseLeave:()=>l(!1),children:[n.jsx(ot,{className:"h-10 w-auto text-[#DAFF45]",color:"currentColor"}),n.jsx(ve,{children:!t&&n.jsxs(C.div,{initial:{opacity:0,width:0,x:-10},animate:{opacity:1,width:"auto",x:0},exit:{opacity:0,width:0,x:-10},transition:{duration:.4,ease:[.22,1,.36,1]},className:"overflow-hidden flex items-center",children:[n.jsx("div",{children:n.jsx(On,{className:"h-9 w-auto text-[#DAFF45]",color:"currentColor"})}),n.jsx(C.div,{initial:{width:0,opacity:0},animate:{width:o?"auto":0,opacity:o?1:0},transition:{duration:.8,ease:[.22,1,.36,1],delay:o?0:.2},className:"overflow-hidden flex items-center h-9",children:n.jsx("div",{className:"pl-4 flex gap-[0.3em] overflow-hidden",children:B.map((v,_)=>n.jsx(C.span,{className:"font-display text-white text-[13px] tracking-widest whitespace-nowrap leading-none pt-1",initial:{y:15,opacity:0,rotateX:90},animate:{y:o?0:15,opacity:o?1:0,rotateX:o?0:90},transition:{duration:.6,delay:o?.2+_*.04:0,ease:[.22,1,.36,1]},children:v},_))})})]})})]}),n.jsxs("nav",{className:"pointer-events-auto hidden md:flex gap-4 text-base font-sans font-medium lowercase tracking-normal items-center pt-1",children:[j.map(v=>n.jsxs(we,{href:v.href,className:W("group relative px-2 py-1 transition-colors duration-300 hover:text-[#D4FF00]",(e===v.href,"text-white")),children:[n.jsxs("div",{className:"relative overflow-hidden flex flex-col items-center justify-center",children:[n.jsx("span",{className:"font-medium tracking-[0.15em] opacity-0 invisible select-none","aria-hidden":"true",children:v.label}),n.jsx("span",{className:W("absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out","font-normal tracking-normal group-hover:font-medium group-hover:tracking-[0.15em]",e===v.href&&"font-medium tracking-normal"),children:v.label})]}),e===v.href&&n.jsx(C.div,{layoutId:"active-dot",className:"absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#D4FF00] rounded-full",transition:{type:"spring",stiffness:350,damping:30}})]},v.href)),n.jsxs("div",{className:"flex gap-2 ml-4",children:[n.jsx("a",{href:F.href,target:"_blank",rel:"noopener noreferrer",className:"group relative px-2 py-1 overflow-hidden",children:n.jsxs("div",{className:"relative z-10 font-sans font-medium text-sm lowercase tracking-normal",children:[n.jsx("span",{className:"block text-[#D4FF00] group-hover:-translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)]",children:F.label}),n.jsx("span",{className:"absolute inset-0 block text-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)]",children:F.label})]})}),n.jsx(we,{href:k.href,className:"group relative px-2 py-1 overflow-hidden",children:n.jsxs("div",{className:"relative z-10 font-sans font-medium text-sm lowercase tracking-normal",children:[n.jsx("span",{className:"block text-[#D4FF00] group-hover:-translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)]",children:k.label}),n.jsx("span",{className:"absolute inset-0 block text-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)]",children:k.label})]})})]}),n.jsxs("button",{onClick:U,"aria-label":c==="en"?"Switch to Polish":"Przełącz na angielski",className:"ml-4 text-sm font-display uppercase tracking-widest text-neutral-500 hover:text-white transition-colors",children:[n.jsx("span",{className:W(c==="en"&&"text-[#D4FF00]"),children:"EN"}),n.jsx("span",{className:"mx-2",children:"/"}),n.jsx("span",{className:W(c==="pl"&&"text-[#D4FF00]"),children:"PL"})]}),n.jsx(ei,{})]}),n.jsxs(C.button,{onClick:()=>i(!s),className:"pointer-events-auto md:hidden group flex flex-col justify-center items-center w-12 h-12 gap-1.5 cursor-pointer z-[1000] rounded-none backdrop-blur-sm outline-none focus:outline-none",animate:{backgroundColor:"rgba(212, 255, 0, 0)"},transition:{duration:.3},"aria-label":"Toggle menu",children:[n.jsx(C.div,{className:"w-6 h-[3px] rounded-none origin-center",animate:{backgroundColor:h==="light"||d?"#000000":"#D4FF00",rotate:s?45:0,y:s?4.5:0},transition:{duration:.5,ease:[.76,0,.24,1]}}),n.jsx(C.div,{className:"w-6 h-[3px] rounded-none origin-center",initial:{width:16},animate:{backgroundColor:h==="light"||d?"#000000":"#D4FF00",rotate:s?-45:0,y:s?-4.5:0,width:s?24:16},transition:{duration:.5,ease:[.76,0,.24,1]}})]})]})]}),n.jsx(ve,{children:s&&n.jsxs(C.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.6,ease:[.22,1,.36,1]},className:"fixed inset-0 bg-[#050505] z-[995] flex flex-col justify-center px-8 md:hidden",children:[n.jsxs("nav",{className:"flex flex-col gap-2",children:[j.map((v,_)=>n.jsx(C.div,{initial:{opacity:0,y:40,filter:"blur(10px)"},animate:{opacity:1,y:0,filter:"blur(0px)"},exit:{opacity:0,y:20,filter:"blur(5px)"},transition:{duration:.8,delay:.2+_*.1,ease:[.22,1,.36,1]},children:n.jsx(we,{href:v.href,className:W("text-3xl font-sans font-normal lowercase tracking-normal text-white transition-all duration-500",e===v.href?"text-[#D4FF00] font-medium":"opacity-60 hover:opacity-100 hover:text-[#D4FF00] hover:tracking-[0.1em]"),children:v.label})},v.href)),n.jsx(C.div,{initial:{opacity:0,y:40,filter:"blur(10px)"},animate:{opacity:1,y:0,filter:"blur(0px)"},exit:{opacity:0,y:20,filter:"blur(5px)"},transition:{duration:.8,delay:.2+j.length*.1,ease:[.22,1,.36,1]},children:n.jsx(we,{href:k.href,className:W("text-3xl font-sans font-normal lowercase tracking-normal text-white transition-all duration-500",e===k.href?"text-[#D4FF00] font-medium":"opacity-60 hover:opacity-100 hover:text-[#D4FF00] hover:tracking-[0.1em]"),children:k.label})}),n.jsx(C.div,{initial:{opacity:0,y:40,filter:"blur(10px)"},animate:{opacity:1,y:0,filter:"blur(0px)"},exit:{opacity:0,y:20,filter:"blur(5px)"},transition:{duration:.8,delay:.2+(j.length+1)*.1,ease:[.22,1,.36,1]},children:n.jsx("a",{href:F.href,target:"_blank",rel:"noopener noreferrer",className:"text-3xl font-sans font-normal lowercase tracking-normal text-[#D4FF00] transition-all duration-500 hover:tracking-[0.1em]",children:F.label})})]}),n.jsxs(C.div,{initial:{opacity:0},animate:{opacity:1},transition:{delay:.8,duration:1},className:"mt-12 flex gap-8 items-center",children:[n.jsxs("button",{onClick:U,"aria-label":c==="en"?"Switch to Polish":"Przełącz na angielski",className:"text-lg font-display uppercase tracking-widest text-neutral-500 hover:text-white transition-colors",children:[n.jsx("span",{className:W(c==="en"&&"text-[#D4FF00]"),children:"EN"}),n.jsx("span",{className:"mx-2",children:"/"}),n.jsx("span",{className:W(c==="pl"&&"text-[#D4FF00]"),children:"PL"})]}),n.jsxs("button",{onClick:g,"aria-label":h==="dark"?"Switch to light mode":"Switch to dark mode",className:"text-lg font-display uppercase tracking-widest text-neutral-500 hover:text-white transition-colors",children:[n.jsx("span",{className:W(h==="light"&&"text-[#D4FF00]"),children:"LIGHT"}),n.jsx("span",{className:"mx-2",children:"/"}),n.jsx("span",{className:W(h==="dark"&&"text-[#D4FF00]"),children:"DARK"})]})]})]})})]})}const ai={p24c9d700:"M34.1338 0C49.3944 8.5768e-05 61.7656 12.3712 61.7656 27.6318C61.7655 35.1604 64.9463 43.8454 69.7104 49.6748C73.4886 54.2977 75.7549 60.2044 75.7549 66.6406C75.7547 81.4582 63.7425 93.4707 48.9248 93.4707H10.0615C4.50494 93.4707 0.000133808 88.9657 0 83.4092V8.20312C0 3.67264 3.67265 6.6025e-05 8.20312 0H34.1338Z"},si=ai.p24c9d700;function ni({mouseX:e,mouseY:t,scrollTrigger:a,fillColor:s="#111",isMobile:i}){const o=y.useRef(null),l=be(0),d=be(0),p=i?{damping:40,stiffness:150,mass:1}:{damping:20,stiffness:300,mass:.5},c=Oe(l,p),m=Oe(d,p);return y.useEffect(()=>{const r=()=>{if(!o.current)return;const j=e.get(),k=t.get(),F=o.current.getBoundingClientRect(),U=F.left+F.width/2,R=F.top+F.height/2,B=j-U,v=k-R,_=Math.sqrt(B*B+v*v),Q=i?500:400;if(_<Q){const z=(Q-_)/Q,V=i?.15:.2,me=B*z*V,Y=v*z*V;l.set(me),d.set(Y)}else l.set(0),d.set(0)},h=e.on("change",r),g=t.on("change",r),w=a.on("change",r);return()=>{h(),g(),w()}},[e,t,a,l,d,i]),n.jsx("div",{ref:o,className:"flex items-center justify-center p-4",children:n.jsx(C.div,{style:{x:c,y:m},className:"w-16 h-16 relative",children:n.jsx("svg",{viewBox:"0 0 76 94",className:W("magnet-shape-svg w-full h-full rotate-90 transition-all duration-700",i&&"blur-[1px]"),style:{fill:s},children:n.jsx("path",{d:si})})})})}function ii({className:e,fillColor:t="#111",gradientOverlay:a=!0,opacity:s=.2}){const i=y.useRef(null),o=be(0),l=be(0),d=be(0),[p,c]=y.useState(!1);y.useEffect(()=>{const r=()=>{c(window.innerWidth<768),window.innerWidth<768&&(o.set(window.innerWidth/2),l.set(window.innerHeight/2))};r(),window.addEventListener("resize",r);const h=w=>{window.innerWidth>=768&&(o.set(w.clientX),l.set(w.clientY))},g=()=>{d.set(window.scrollY)};return window.addEventListener("mousemove",h),window.addEventListener("scroll",g,{passive:!0}),()=>{window.removeEventListener("resize",r),window.removeEventListener("mousemove",h),window.removeEventListener("scroll",g)}},[o,l,d]);const m=Array.from({length:64},(r,h)=>h);return n.jsxs("div",{ref:i,className:W("absolute inset-0 overflow-hidden pointer-events-none",e),children:[n.jsx("div",{className:"absolute inset-0",style:{opacity:p?.3:s},children:n.jsx("div",{className:"grid grid-cols-6 md:grid-cols-8 gap-8 w-full h-full content-center justify-center scale-110",children:m.map(r=>n.jsx(ni,{mouseX:o,mouseY:l,scrollTrigger:d,fillColor:t,isMobile:p},r))})}),a&&n.jsx("div",{className:"absolute inset-0 bg-gradient-to-b from-[#080808] via-transparent to-[#080808] pointer-events-none"})]})}function oi({size:e="md",tm:t=!1,variant:a="outline",className:s=""}){const i={sm:"px-3 py-1 text-[11px] gap-0.5",md:"px-4 py-1.5 text-sm gap-0.5",lg:"px-5 py-2 text-base gap-1"},o={outline:"border-2 border-[#D4FF00] text-[#D4FF00] bg-transparent hover:bg-[#D4FF00]/10",solid:"border-2 border-[#D4FF00] text-black bg-[#D4FF00] hover:bg-[#D4FF00]/90"};return n.jsxs("span",{className:["inline-flex items-center justify-center","font-display tracking-[0.15em] uppercase leading-none","rounded-full transition-colors duration-300 cursor-default select-none",i[e],o[a],s].join(" "),"aria-label":"R3LOOP methodology",children:[n.jsx("span",{children:"R3LOOP"}),t&&n.jsx("sup",{className:"text-[0.55em] tracking-normal -mt-1",children:"™"})]})}function ri(){const{t:e}=rt(),t=st(),[a]=Ce(),s=()=>{t?t.scrollTo(0,{duration:1.5}):window.scrollTo({top:0,behavior:"smooth"})},i=()=>{t?t.scrollTo(0,{immediate:!0}):window.scrollTo(0,0)},o=[{label:e("work.selected_work"),href:"/work"},{label:e("nav.philosophy"),href:"/philosophy"},{label:e("nav.services"),href:"/services"},{label:e("services_page.deliverables.label"),href:"/deliverables"},{label:e("nav.journal"),href:"/journal"},{label:"Start a brief — 48h response",href:"/brief"},{label:e("nav.contact")||"Kontakt",href:"/contact"}],l=[{label:"Instagram",href:"https://www.instagram.com/r352.studio/"},{label:"LinkedIn",href:"https://www.linkedin.com/in/przemyslawreszka/"},{label:"YouTube",href:"https://www.youtube.com/@r352studio"}];return n.jsxs("footer",{className:"text-white relative overflow-hidden border-t border-white/10","data-no-cursor-fx":"true",children:[n.jsx("div",{className:"bg-[#151515] pt-32 pb-32 px-8 md:px-12 relative overflow-hidden",children:n.jsx("div",{className:"max-w-[1800px] mx-auto relative",children:n.jsxs("div",{className:"relative",children:[n.jsxs("div",{className:"absolute inset-0 -mx-32 -my-32",children:[n.jsx(ii,{fillColor:"#000000",gradientOverlay:!1,opacity:1}),n.jsx("div",{className:"absolute inset-0 bg-gradient-to-b from-[#151515] via-transparent to-[#151515]"}),n.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-[#151515] via-transparent to-[#151515]"})]}),n.jsxs("div",{className:"relative z-10",children:[n.jsx("p",{className:"text-[#D4FF00] font-display uppercase tracking-widest text-sm mb-8",children:e("footer.idea")}),n.jsxs("div",{className:"flex flex-col items-start gap-12",children:[n.jsxs(we,{href:"/contact",onClick:i,className:"group inline-flex flex-col",children:[n.jsx("span",{className:"text-6xl md:text-8xl lg:text-9xl font-sans font-medium tracking-normal text-white group-hover:text-white/50 transition-colors duration-500",children:e("footer.bold_ideas")}),n.jsx("span",{className:"text-6xl md:text-8xl lg:text-9xl font-sans font-medium tracking-normal text-white group-hover:text-[#D4FF00] transition-colors duration-500 flex items-center gap-4",children:e("footer.shaped")})]}),n.jsxs("div",{className:"flex flex-col sm:flex-row gap-6 w-full sm:w-auto",children:[n.jsxs(we,{href:"/contact",onClick:i,className:"group relative inline-flex items-center justify-center px-12 py-4 bg-[#D4FF00] text-black transition-all duration-500 ease-out cursor-pointer overflow-hidden whitespace-nowrap w-full sm:w-auto",children:[n.jsx("div",{className:"absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"}),n.jsxs("span",{className:"flex items-center justify-center relative",children:[n.jsx("span",{className:"invisible text-lg font-display uppercase tracking-widest",children:e("footer.cta")}),n.jsx("span",{className:"absolute text-lg font-display uppercase tracking-widest group-hover:tracking-normal transition-all duration-500 ease-out",children:e("footer.cta")})]})]}),n.jsx("a",{href:"https://calendly.com/p-reszkovy/30min",target:"_blank",rel:"noopener noreferrer",className:"group relative inline-flex items-center justify-center px-12 py-4 bg-black/[0.05] dark:bg-white/[0.06] text-white transition-all duration-500 ease-out cursor-pointer overflow-hidden whitespace-nowrap w-full sm:w-auto hover:bg-white hover:text-black",children:n.jsxs("span",{className:"flex items-center justify-center relative",children:[n.jsx("span",{className:"invisible text-lg font-display uppercase tracking-widest",children:e("nav.schedule")}),n.jsx("span",{className:"absolute text-lg font-display uppercase tracking-widest group-hover:tracking-normal transition-all duration-500 ease-out",children:e("nav.schedule")})]})})]})]})]})]})})}),n.jsx("div",{className:"bg-[#0a0a0a] px-8 md:px-12 pt-16 pb-12",children:n.jsxs("div",{className:"max-w-[1800px] mx-auto",children:[n.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 border-t border-white/10 pt-16 mb-24",children:[n.jsxs("div",{className:"md:col-span-1",children:[n.jsx("span",{className:"block text-xs font-display uppercase tracking-widest text-neutral-500 mb-6",children:e("footer.studio")}),n.jsxs("p",{className:"text-lg text-neutral-300 leading-relaxed",children:["Mallorca, Baleares",n.jsx("br",{}),"Santa Catalina",n.jsx("br",{}),"(remote)"]}),n.jsx("a",{href:"mailto:hello@r352.com?subject=r352%20—%20hello",className:"block text-lg text-neutral-300 mt-6 hover:text-[#D4FF00] transition-colors duration-500 w-fit",children:"hello@r352.com"}),n.jsxs("a",{href:"https://www.linkedin.com/in/przemyslawreszka/",target:"_blank",rel:"noopener noreferrer",className:"group inline-flex items-center gap-2 text-sm text-neutral-400 mt-3 hover:text-[#D4FF00] transition-colors duration-300 w-fit",children:[n.jsx("span",{children:"Founded by Reszek · LinkedIn"}),n.jsx("span",{className:"inline-block transition-transform duration-300 group-hover:translate-x-1",children:"↗"})]})]}),n.jsxs("div",{className:"md:col-span-1",children:[n.jsx("span",{className:"block text-xs font-display uppercase tracking-widest text-neutral-500 mb-6",children:e("footer.sitemap")}),n.jsx("ul",{className:"flex flex-col gap-3 items-start",children:o.map(d=>n.jsx("li",{children:n.jsx(we,{href:d.href,className:W("group relative inline-flex py-1 transition-colors duration-300 hover:text-[#D4FF00]",a===d.href?"text-[#D4FF00]":"text-neutral-300"),children:n.jsxs("div",{className:"relative overflow-hidden flex flex-col items-start justify-center",children:[n.jsx("span",{className:"font-medium tracking-[0.15em] opacity-0 invisible select-none text-lg","aria-hidden":"true",children:d.label}),n.jsx("span",{className:W("absolute inset-0 flex items-center justify-start transition-all duration-300 ease-out text-lg","font-normal tracking-normal group-hover:font-medium group-hover:tracking-[0.15em]",a===d.href&&"font-medium tracking-normal"),children:d.label})]})})},d.label))})]}),n.jsxs("div",{className:"md:col-span-1",children:[n.jsx("span",{className:"block text-xs font-display uppercase tracking-widest text-neutral-500 mb-6",children:e("footer.social")}),n.jsx("ul",{className:"flex flex-col gap-3 items-start",children:l.map(d=>n.jsx("li",{children:n.jsx("a",{href:d.href,target:"_blank",rel:"noopener noreferrer",className:"group relative inline-flex py-1 transition-colors duration-300 text-neutral-300 hover:text-[#D4FF00]",children:n.jsxs("div",{className:"relative overflow-hidden flex flex-col items-start justify-center",children:[n.jsx("span",{className:"font-medium tracking-[0.15em] opacity-0 invisible select-none text-lg","aria-hidden":"true",children:d.label}),n.jsx("span",{className:"absolute inset-0 flex items-center justify-start transition-all duration-300 ease-out font-normal tracking-normal group-hover:font-medium group-hover:tracking-[0.15em] text-lg",children:d.label})]})})},d.label))})]}),n.jsx("div",{className:"md:col-span-1 flex flex-col justify-between",children:n.jsxs("div",{children:[n.jsx("span",{className:"block text-xs font-display uppercase tracking-widest text-neutral-500 mb-6",children:e("footer.local_time")}),n.jsxs("p",{className:"text-lg text-neutral-300",children:["Mallorca ",new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",timeZone:"Europe/Madrid"})," CET"]})]})})]}),n.jsxs("div",{className:"flex flex-wrap items-center gap-6 md:gap-8 border-t border-white/10 pt-12 pb-4",children:[n.jsxs("div",{className:"flex items-center gap-4",children:[n.jsx(ot,{className:"w-8 h-8 opacity-50"}),n.jsx("p",{className:"text-xs font-display uppercase tracking-widest text-neutral-600",children:"© 2026 r352"}),n.jsx(we,{href:"/process",className:"opacity-70 hover:opacity-100 transition-opacity duration-300",children:n.jsx(oi,{size:"sm"})})]}),n.jsx("button",{onClick:s,className:"group flex items-center gap-2 text-xs font-display uppercase tracking-widest hover:tracking-[0.25em] text-neutral-500 hover:text-[#D4FF00] transition-all duration-500 ease-out",children:e("footer.back_to_top")})]})]})})]})}function li({children:e}){return n.jsx(As,{root:!0,options:{lerp:.1,duration:1.5,smoothWheel:!0,autoResize:!0,syncTouch:!1},children:e})}var bt,ga;function ci(){if(ga)return bt;ga=1;var e=typeof Element<"u",t=typeof Map=="function",a=typeof Set=="function",s=typeof ArrayBuffer=="function"&&!!ArrayBuffer.isView;function i(o,l){if(o===l)return!0;if(o&&l&&typeof o=="object"&&typeof l=="object"){if(o.constructor!==l.constructor)return!1;var d,p,c;if(Array.isArray(o)){if(d=o.length,d!=l.length)return!1;for(p=d;p--!==0;)if(!i(o[p],l[p]))return!1;return!0}var m;if(t&&o instanceof Map&&l instanceof Map){if(o.size!==l.size)return!1;for(m=o.entries();!(p=m.next()).done;)if(!l.has(p.value[0]))return!1;for(m=o.entries();!(p=m.next()).done;)if(!i(p.value[1],l.get(p.value[0])))return!1;return!0}if(a&&o instanceof Set&&l instanceof Set){if(o.size!==l.size)return!1;for(m=o.entries();!(p=m.next()).done;)if(!l.has(p.value[0]))return!1;return!0}if(s&&ArrayBuffer.isView(o)&&ArrayBuffer.isView(l)){if(d=o.length,d!=l.length)return!1;for(p=d;p--!==0;)if(o[p]!==l[p])return!1;return!0}if(o.constructor===RegExp)return o.source===l.source&&o.flags===l.flags;if(o.valueOf!==Object.prototype.valueOf&&typeof o.valueOf=="function"&&typeof l.valueOf=="function")return o.valueOf()===l.valueOf();if(o.toString!==Object.prototype.toString&&typeof o.toString=="function"&&typeof l.toString=="function")return o.toString()===l.toString();if(c=Object.keys(o),d=c.length,d!==Object.keys(l).length)return!1;for(p=d;p--!==0;)if(!Object.prototype.hasOwnProperty.call(l,c[p]))return!1;if(e&&o instanceof Element)return!1;for(p=d;p--!==0;)if(!((c[p]==="_owner"||c[p]==="__v"||c[p]==="__o")&&o.$$typeof)&&!i(o[c[p]],l[c[p]]))return!1;return!0}return o!==o&&l!==l}return bt=function(l,d){try{return i(l,d)}catch(p){if((p.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw p}},bt}var di=ci();const pi=nt(di);var xt,wa;function mi(){if(wa)return xt;wa=1;var e=function(t,a,s,i,o,l,d,p){if(!t){var c;if(a===void 0)c=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var m=[s,i,o,l,d,p],r=0;c=new Error(a.replace(/%s/g,function(){return m[r++]})),c.name="Invariant Violation"}throw c.framesToPop=1,c}};return xt=e,xt}var ui=mi();const ba=nt(ui);var ft,xa;function yi(){return xa||(xa=1,ft=function(t,a,s,i){var o=s?s.call(i,t,a):void 0;if(o!==void 0)return!!o;if(t===a)return!0;if(typeof t!="object"||!t||typeof a!="object"||!a)return!1;var l=Object.keys(t),d=Object.keys(a);if(l.length!==d.length)return!1;for(var p=Object.prototype.hasOwnProperty.bind(a),c=0;c<l.length;c++){var m=l[c];if(!p(m))return!1;var r=t[m],h=a[m];if(o=s?s.call(i,r,h,m):void 0,o===!1||o===void 0&&r!==h)return!1}return!0}),ft}var hi=yi();const gi=nt(hi);var os=(e=>(e.BASE="base",e.BODY="body",e.HEAD="head",e.HTML="html",e.LINK="link",e.META="meta",e.NOSCRIPT="noscript",e.SCRIPT="script",e.STYLE="style",e.TITLE="title",e.FRAGMENT="Symbol(react.fragment)",e))(os||{}),kt={link:{rel:["amphtml","canonical","alternate"]},script:{type:["application/ld+json"]},meta:{charset:"",name:["generator","robots","description"],property:["og:type","og:title","og:url","og:image","og:image:alt","og:description","twitter:url","twitter:title","twitter:description","twitter:image","twitter:image:alt","twitter:card","twitter:site"]}},fa=Object.values(os),ct={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},rs=Object.entries(ct).reduce((e,[t,a])=>(e[a]=t,e),{}),le="data-rh",_e={DEFAULT_TITLE:"defaultTitle",DEFER:"defer",ENCODE_SPECIAL_CHARACTERS:"encodeSpecialCharacters",ON_CHANGE_CLIENT_STATE:"onChangeClientState",TITLE_TEMPLATE:"titleTemplate",PRIORITIZE_SEO_TAGS:"prioritizeSeoTags"},Re=(e,t)=>{for(let a=e.length-1;a>=0;a-=1){const s=e[a];if(Object.prototype.hasOwnProperty.call(s,t))return s[t]}return null},wi=e=>{let t=Re(e,"title");const a=Re(e,_e.TITLE_TEMPLATE);if(Array.isArray(t)&&(t=t.join("")),a&&t)return a.replace(/%s/g,()=>t);const s=Re(e,_e.DEFAULT_TITLE);return t||s||void 0},bi=e=>Re(e,_e.ON_CHANGE_CLIENT_STATE)||(()=>{}),zt=(e,t)=>t.filter(a=>typeof a[e]<"u").map(a=>a[e]).reduce((a,s)=>({...a,...s}),{}),xi=(e,t)=>t.filter(a=>typeof a.base<"u").map(a=>a.base).reverse().reduce((a,s)=>{if(!a.length){const i=Object.keys(s);for(let o=0;o<i.length;o+=1){const d=i[o].toLowerCase();if(e.indexOf(d)!==-1&&s[d])return a.concat(s)}}return a},[]),fi=e=>console&&typeof console.warn=="function"&&console.warn(e),Ue=(e,t,a)=>{const s={};return a.filter(i=>Array.isArray(i[e])?!0:(typeof i[e]<"u"&&fi(`Helmet: ${e} should be of type "Array". Instead found type "${typeof i[e]}"`),!1)).map(i=>i[e]).reverse().reduce((i,o)=>{const l={};o.filter(p=>{let c;const m=Object.keys(p);for(let h=0;h<m.length;h+=1){const g=m[h],w=g.toLowerCase();t.indexOf(w)!==-1&&!(c==="rel"&&p[c].toLowerCase()==="canonical")&&!(w==="rel"&&p[w].toLowerCase()==="stylesheet")&&(c=w),t.indexOf(g)!==-1&&(g==="innerHTML"||g==="cssText"||g==="itemprop")&&(c=g)}if(!c||!p[c])return!1;const r=p[c].toLowerCase();return s[c]||(s[c]={}),l[c]||(l[c]={}),s[c][r]?!1:(l[c][r]=!0,!0)}).reverse().forEach(p=>i.push(p));const d=Object.keys(l);for(let p=0;p<d.length;p+=1){const c=d[p],m={...s[c],...l[c]};s[c]=m}return i},[]).reverse()},ki=(e,t)=>{if(Array.isArray(e)&&e.length){for(let a=0;a<e.length;a+=1)if(e[a][t])return!0}return!1},zi=e=>({baseTag:xi(["href"],e),bodyAttributes:zt("bodyAttributes",e),defer:Re(e,_e.DEFER),encode:Re(e,_e.ENCODE_SPECIAL_CHARACTERS),htmlAttributes:zt("htmlAttributes",e),linkTags:Ue("link",["rel","href"],e),metaTags:Ue("meta",["name","charset","http-equiv","property","itemprop"],e),noscriptTags:Ue("noscript",["innerHTML"],e),onChangeClientState:bi(e),scriptTags:Ue("script",["src","innerHTML"],e),styleTags:Ue("style",["cssText"],e),title:wi(e),titleAttributes:zt("titleAttributes",e),prioritizeSeoTags:ki(e,_e.PRIORITIZE_SEO_TAGS)}),ls=e=>Array.isArray(e)?e.join(""):e,vi=(e,t)=>{const a=Object.keys(e);for(let s=0;s<a.length;s+=1)if(t[a[s]]&&t[a[s]].includes(e[a[s]]))return!0;return!1},vt=(e,t)=>Array.isArray(e)?e.reduce((a,s)=>(vi(s,t)?a.priority.push(s):a.default.push(s),a),{priority:[],default:[]}):{default:e,priority:[]},ka=(e,t)=>({...e,[t]:void 0}),ji=["noscript","script","style"],Pt=(e,t=!0)=>t===!1?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;"),cs=e=>Object.keys(e).reduce((t,a)=>{const s=typeof e[a]<"u"?`${a}="${e[a]}"`:`${a}`;return t?`${t} ${s}`:s},""),Fi=(e,t,a,s)=>{const i=cs(a),o=ls(t);return i?`<${e} ${le}="true" ${i}>${Pt(o,s)}</${e}>`:`<${e} ${le}="true">${Pt(o,s)}</${e}>`},Di=(e,t,a=!0)=>t.reduce((s,i)=>{const o=i,l=Object.keys(o).filter(c=>!(c==="innerHTML"||c==="cssText")).reduce((c,m)=>{const r=typeof o[m]>"u"?m:`${m}="${Pt(o[m],a)}"`;return c?`${c} ${r}`:r},""),d=o.innerHTML||o.cssText||"",p=ji.indexOf(e)===-1;return`${s}<${e} ${le}="true" ${l}${p?"/>":`>${d}</${e}>`}`},""),ds=(e,t={})=>Object.keys(e).reduce((a,s)=>{const i=ct[s];return a[i||s]=e[s],a},t),Si=(e,t,a)=>{const s={key:t,[le]:!0},i=ds(a,s);return[u.createElement("title",i,t)]},tt=(e,t)=>t.map((a,s)=>{const i={key:s,[le]:!0};return Object.keys(a).forEach(o=>{const d=ct[o]||o;if(d==="innerHTML"||d==="cssText"){const p=a.innerHTML||a.cssText;i.dangerouslySetInnerHTML={__html:p}}else i[d]=a[o]}),u.createElement(e,i)}),ne=(e,t,a=!0)=>{switch(e){case"title":return{toComponent:()=>Si(e,t.title,t.titleAttributes),toString:()=>Fi(e,t.title,t.titleAttributes,a)};case"bodyAttributes":case"htmlAttributes":return{toComponent:()=>ds(t),toString:()=>cs(t)};default:return{toComponent:()=>tt(e,t),toString:()=>Di(e,t,a)}}},Ti=({metaTags:e,linkTags:t,scriptTags:a,encode:s})=>{const i=vt(e,kt.meta),o=vt(t,kt.link),l=vt(a,kt.script);return{priorityMethods:{toComponent:()=>[...tt("meta",i.priority),...tt("link",o.priority),...tt("script",l.priority)],toString:()=>`${ne("meta",i.priority,s)} ${ne("link",o.priority,s)} ${ne("script",l.priority,s)}`},metaTags:i.default,linkTags:o.default,scriptTags:l.default}},Ai=e=>{const{baseTag:t,bodyAttributes:a,encode:s=!0,htmlAttributes:i,noscriptTags:o,styleTags:l,title:d="",titleAttributes:p,prioritizeSeoTags:c}=e;let{linkTags:m,metaTags:r,scriptTags:h}=e,g={toComponent:()=>[],toString:()=>""};return c&&({priorityMethods:g,linkTags:m,metaTags:r,scriptTags:h}=Ti(e)),{priority:g,base:ne("base",t,s),bodyAttributes:ne("bodyAttributes",a,s),htmlAttributes:ne("htmlAttributes",i,s),link:ne("link",m,s),meta:ne("meta",r,s),noscript:ne("noscript",o,s),script:ne("script",h,s),style:ne("style",l,s),title:ne("title",{title:d,titleAttributes:p},s)}},It=Ai,Qe=[],Kt=!!(typeof window<"u"&&window.document&&window.document.createElement),Et=class{constructor(e,t){he(this,"instances",[]);he(this,"canUseDOM",Kt);he(this,"context");he(this,"value",{setHelmet:e=>{this.context.helmet=e},helmetInstances:{get:()=>this.canUseDOM?Qe:this.instances,add:e=>{(this.canUseDOM?Qe:this.instances).push(e)},remove:e=>{const t=(this.canUseDOM?Qe:this.instances).indexOf(e);(this.canUseDOM?Qe:this.instances).splice(t,1)}}});this.context=e,this.canUseDOM=t||!1,t||(e.helmet=It({baseTag:[],bodyAttributes:{},htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}}))}},Ci=parseInt(u.version.split(".")[0],10),Nt=Ci>=19,Pi={},ps=u.createContext(Pi),Ae,ms=(Ae=class extends y.Component{constructor(a){super(a);he(this,"helmetData");Nt?this.helmetData=null:this.helmetData=new Et(this.props.context||{},Ae.canUseDOM)}render(){return Nt?u.createElement(u.Fragment,null,this.props.children):u.createElement(ps.Provider,{value:this.helmetData.value},this.props.children)}},he(Ae,"canUseDOM",Kt),Ae),Me=(e,t)=>{const a=document.head||document.querySelector("head"),s=a.querySelectorAll(`${e}[${le}]`),i=[].slice.call(s),o=[];let l;return t&&t.length&&t.forEach(d=>{const p=document.createElement(e);for(const c in d)if(Object.prototype.hasOwnProperty.call(d,c))if(c==="innerHTML")p.innerHTML=d.innerHTML;else if(c==="cssText"){const m=d.cssText;p.appendChild(document.createTextNode(m))}else{const m=c,r=typeof d[m]>"u"?"":d[m];p.setAttribute(c,r)}p.setAttribute(le,"true"),i.some((c,m)=>(l=m,p.isEqualNode(c)))?i.splice(l,1):o.push(p)}),i.forEach(d=>{var p;return(p=d.parentNode)==null?void 0:p.removeChild(d)}),o.forEach(d=>a.appendChild(d)),{oldTags:i,newTags:o}},Mt=(e,t)=>{const a=document.getElementsByTagName(e)[0];if(!a)return;const s=a.getAttribute(le),i=s?s.split(","):[],o=[...i],l=Object.keys(t);for(const d of l){const p=t[d]||"";a.getAttribute(d)!==p&&a.setAttribute(d,p),i.indexOf(d)===-1&&i.push(d);const c=o.indexOf(d);c!==-1&&o.splice(c,1)}for(let d=o.length-1;d>=0;d-=1)a.removeAttribute(o[d]);i.length===o.length?a.removeAttribute(le):a.getAttribute(le)!==l.join(",")&&a.setAttribute(le,l.join(","))},Ii=(e,t)=>{typeof e<"u"&&document.title!==e&&(document.title=ls(e)),Mt("title",t)},za=(e,t)=>{const{baseTag:a,bodyAttributes:s,htmlAttributes:i,linkTags:o,metaTags:l,noscriptTags:d,onChangeClientState:p,scriptTags:c,styleTags:m,title:r,titleAttributes:h}=e;Mt("body",s),Mt("html",i),Ii(r,h);const g={baseTag:Me("base",a),linkTags:Me("link",o),metaTags:Me("meta",l),noscriptTags:Me("noscript",d),scriptTags:Me("script",c),styleTags:Me("style",m)},w={},j={};Object.keys(g).forEach(k=>{const{newTags:F,oldTags:U}=g[k];F.length&&(w[k]=F),U.length&&(j[k]=g[k].oldTags)}),t&&t(),p(e,w,j)},He=null,Ei=e=>{He&&cancelAnimationFrame(He),e.defer?He=requestAnimationFrame(()=>{za(e,()=>{He=null})}):(za(e),He=null)},Ni=Ei,va=class extends y.Component{constructor(){super(...arguments);he(this,"rendered",!1)}shouldComponentUpdate(t){return!gi(t,this.props)}componentDidUpdate(){this.emitChange()}componentWillUnmount(){const{helmetInstances:t}=this.props.context;t.remove(this),this.emitChange()}emitChange(){const{helmetInstances:t,setHelmet:a}=this.props.context;let s=null;const i=zi(t.get().map(o=>{const{context:l,...d}=o.props;return d}));ms.canUseDOM?Ni(i):It&&(s=It(i)),a(s)}init(){if(this.rendered)return;this.rendered=!0;const{helmetInstances:t}=this.props.context;t.add(this),this.emitChange()}render(){return this.init(),null}},at=[],ja=e=>{const t={};for(const a of Object.keys(e))t[rs[a]||a]=e[a];return t},Te=e=>{const t={};for(const a of Object.keys(e)){const s=ct[a];t[s||a]=e[a]}return t},Fa=(e,t)=>{if(!Kt)return;const a=document.getElementsByTagName(e)[0];if(!a)return;const s="data-rh-managed",i=a.getAttribute(s),o=i?i.split(","):[],l=Object.keys(t);for(const d of o)l.includes(d)||a.removeAttribute(d);for(const d of l){const p=t[d];p==null||p===!1?a.removeAttribute(d):p===!0?a.setAttribute(d,""):a.setAttribute(d,String(p))}l.length>0?a.setAttribute(s,l.join(",")):a.removeAttribute(s)},jt=()=>{const e={},t={};for(const a of at){const{htmlAttributes:s,bodyAttributes:i}=a.props;s&&Object.assign(e,ja(s)),i&&Object.assign(t,ja(i))}Fa("html",e),Fa("body",t)},Mi=class extends y.Component{componentDidMount(){at.push(this),jt()}componentDidUpdate(){jt()}componentWillUnmount(){const e=at.indexOf(this);e!==-1&&at.splice(e,1),jt()}resolveTitle(){const{title:e,titleTemplate:t,defaultTitle:a}=this.props;return e&&t?t.replace(/%s/g,()=>Array.isArray(e)?e.join(""):e):e||a||void 0}renderTitle(){const e=this.resolveTitle();if(e===void 0)return null;const t=this.props.titleAttributes||{};return u.createElement("title",Te(t),e)}renderBase(){const{base:e}=this.props;return e?u.createElement("base",Te(e)):null}renderMeta(){const{meta:e}=this.props;return!e||!Array.isArray(e)?null:e.map((t,a)=>u.createElement("meta",{key:a,...Te(t)}))}renderLink(){const{link:e}=this.props;return!e||!Array.isArray(e)?null:e.map((t,a)=>u.createElement("link",{key:a,...Te(t)}))}renderScript(){const{script:e}=this.props;return!e||!Array.isArray(e)?null:e.map((t,a)=>{const{innerHTML:s,...i}=t,o=Te(i);return s&&(o.dangerouslySetInnerHTML={__html:s}),u.createElement("script",{key:a,...o})})}renderStyle(){const{style:e}=this.props;return!e||!Array.isArray(e)?null:e.map((t,a)=>{const{cssText:s,...i}=t,o=Te(i);return s&&(o.dangerouslySetInnerHTML={__html:s}),u.createElement("style",{key:a,...o})})}renderNoscript(){const{noscript:e}=this.props;return!e||!Array.isArray(e)?null:e.map((t,a)=>{const{innerHTML:s,...i}=t,o=Te(i);return s&&(o.dangerouslySetInnerHTML={__html:s}),u.createElement("noscript",{key:a,...o})})}render(){return u.createElement(u.Fragment,null,this.renderTitle(),this.renderBase(),this.renderMeta(),this.renderLink(),this.renderScript(),this.renderStyle(),this.renderNoscript())}},Ft,_i=(Ft=class extends y.Component{shouldComponentUpdate(e){return!pi(ka(this.props,"helmetData"),ka(e,"helmetData"))}mapNestedChildrenToProps(e,t){if(!t)return null;switch(e.type){case"script":case"noscript":return{innerHTML:t};case"style":return{cssText:t};default:throw new Error(`<${e.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`)}}flattenArrayTypeChildren(e,t,a,s){return{...t,[e.type]:[...t[e.type]||[],{...a,...this.mapNestedChildrenToProps(e,s)}]}}mapObjectTypeChildren(e,t,a,s){switch(e.type){case"title":return{...t,[e.type]:s,titleAttributes:{...a}};case"body":return{...t,bodyAttributes:{...a}};case"html":return{...t,htmlAttributes:{...a}};default:return{...t,[e.type]:{...a}}}}mapArrayTypeChildrenToProps(e,t){let a={...t};return Object.keys(e).forEach(s=>{a={...a,[s]:e[s]}}),a}warnOnInvalidChildren(e,t){return ba(fa.some(a=>e.type===a),typeof e.type=="function"?"You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.":`Only elements types ${fa.join(", ")} are allowed. Helmet does not support rendering <${e.type}> elements. Refer to our API for more information.`),ba(!t||typeof t=="string"||Array.isArray(t)&&!t.some(a=>typeof a!="string"),`Helmet expects a string as a child of <${e.type}>. Did you forget to wrap your children in braces? ( <${e.type}>{\`\`}</${e.type}> ) Refer to our API for more information.`),!0}mapChildrenToProps(e,t){let a={};return u.Children.forEach(e,s=>{if(!s||!s.props)return;const{children:i,...o}=s.props,l=Object.keys(o).reduce((p,c)=>(p[rs[c]||c]=o[c],p),{});let{type:d}=s;switch(typeof d=="symbol"?d=d.toString():this.warnOnInvalidChildren(s,i),d){case"Symbol(react.fragment)":t=this.mapChildrenToProps(i,t);break;case"link":case"meta":case"noscript":case"script":case"style":a=this.flattenArrayTypeChildren(s,a,l,i);break;default:t=this.mapObjectTypeChildren(s,t,l,i);break}}),this.mapArrayTypeChildrenToProps(a,t)}render(){const{children:e,...t}=this.props;let a={...t},{helmetData:s}=t;if(e&&(a=this.mapChildrenToProps(e,a)),s&&!(s instanceof Et)){const i=s;s=new Et(i.context,!0),delete a.helmetData}return Nt?u.createElement(Mi,{...a}):s?u.createElement(va,{...a,context:s.value}):u.createElement(ps.Consumer,null,i=>u.createElement(va,{...a,context:i}))}},he(Ft,"defaultProps",{defer:!0,encodeSpecialCharacters:!0,prioritizeSeoTags:!1}),Ft);function Ri({title:e="r352 — The system behind great design.",description:t="Strategic design partner for multi-location organizations. From strategy to rollout-ready delivery, powered by the r3loop methodology — predictable quality and speed at scale.",path:a="/",ogImage:s="https://r352.com/og-image.png",article:i}){const o="https://r352.com",l=`${o}${a==="/"?"":a}`;y.useEffect(()=>{var w;const g=document.querySelector('meta[name="robots"]');g&&((w=g.getAttribute("content"))!=null&&w.includes("noindex"))&&g.remove()},[]);const d=a==="/",p={"@context":"https://schema.org","@type":"Organization",name:"r352",url:"https://r352.com",logo:"https://r352.com/og-image.png",description:"Strategic design partner for multi-location organizations. We build the operating system behind great design — from strategy to rollout-ready delivery, powered by the r3loop methodology.",email:"hello@r352.com",address:{"@type":"PostalAddress",addressLocality:"Mallorca",addressRegion:"Baleares",addressCountry:"ES"},sameAs:["https://www.instagram.com/r352.studio/","https://www.linkedin.com/in/przemyslawreszka/","https://www.youtube.com/@r352studio"]},c={"@context":"https://schema.org","@type":"ProfessionalService",name:"r352",url:"https://r352.com",description:"Strategic design + operations consulting for multi-location organizations. We build operating systems behind great design — brand strategy, workflow architecture, QA standards, AI-first execution. Delivered through the r3loop methodology (8-step framework).",priceRange:"€€€",areaServed:"Worldwide",serviceType:["Strategic Design Consulting","Brand Strategy","Creative Operating System","Workflow Architecture","AI-First Execution"],knowsAbout:["Design Operations","Brand Systems","Multi-location Brand Management","Creative Workflow Optimization","r3loop Methodology","AI Brief Automation"]},m={"@context":"https://schema.org","@type":"Organization",name:"r352",url:"https://r352.com",aggregateRating:{"@type":"AggregateRating",ratingValue:"5",reviewCount:"6",bestRating:"5"},review:[{"@type":"Review",author:{"@type":"Person",name:"Magdalena Rodak"},reviewBody:"The communication is seamless, and their commitment to quality translates directly into our business results.",reviewRating:{"@type":"Rating",ratingValue:"5"}},{"@type":"Review",author:{"@type":"Person",name:"Filip Mazurkiewicz"},reviewBody:"They understand the business context and deliver work that actually moves the needle.",reviewRating:{"@type":"Rating",ratingValue:"5"}},{"@type":"Review",author:{"@type":"Person",name:"Lidia Kolucka"},reviewBody:"It feels like they are part of our internal team. Flexible, responsive, and always focused on delivering the best possible impact.",reviewRating:{"@type":"Rating",ratingValue:"5"}},{"@type":"Review",author:{"@type":"Person",name:"Alina Sztoch"},reviewBody:"They are proactive, transparent, and truly care about the outcome. A reliable partner for any scale.",reviewRating:{"@type":"Rating",ratingValue:"5"}},{"@type":"Review",author:{"@type":"Person",name:"Marek Morisson"},reviewBody:"They don't just execute tasks; they think along with us and bring solutions that drive real value.",reviewRating:{"@type":"Rating",ratingValue:"5"}},{"@type":"Review",author:{"@type":"Person",name:"Michalina Piątkowska"},reviewBody:"Consistent quality across every investment we launch. Communication is precise, deadlines hold — exactly what real estate campaigns need.",reviewRating:{"@type":"Rating",ratingValue:"5"}}]},r=!!i,h=i?{"@context":"https://schema.org","@type":"BlogPosting",headline:i.title.replace(/<br\s*\/?>/g," "),datePublished:i.date,dateModified:i.date,author:{"@type":"Organization",name:"r352",url:"https://r352.com"},publisher:{"@type":"Organization",name:"r352",url:"https://r352.com",logo:{"@type":"ImageObject",url:"https://r352.com/og-image.png"}},mainEntityOfPage:{"@type":"WebPage","@id":l},articleSection:i.category,image:s,url:l}:null;return n.jsxs(_i,{children:[n.jsx("title",{children:e}),n.jsx("meta",{name:"description",content:t}),n.jsx("meta",{name:"robots",content:"index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"}),n.jsx("link",{rel:"canonical",href:l}),n.jsx("link",{rel:"alternate",hrefLang:"en",href:l}),n.jsx("link",{rel:"alternate",hrefLang:"pl",href:`${o}/pl${a==="/"?"":a}`}),n.jsx("link",{rel:"alternate",hrefLang:"x-default",href:l}),n.jsx("meta",{property:"og:type",content:r?"article":"website"}),n.jsx("meta",{property:"og:site_name",content:"r352"}),n.jsx("meta",{property:"og:title",content:e}),n.jsx("meta",{property:"og:description",content:t}),n.jsx("meta",{property:"og:url",content:l}),n.jsx("meta",{property:"og:image",content:s}),n.jsx("meta",{property:"og:image:width",content:"1200"}),n.jsx("meta",{property:"og:image:height",content:"630"}),n.jsx("meta",{property:"og:locale",content:"en_US"}),n.jsx("meta",{name:"twitter:card",content:"summary_large_image"}),n.jsx("meta",{name:"twitter:title",content:e}),n.jsx("meta",{name:"twitter:description",content:t}),n.jsx("meta",{name:"twitter:image",content:s}),d?n.jsxs(n.Fragment,{children:[n.jsx("script",{type:"application/ld+json",children:JSON.stringify(p)}),n.jsx("script",{type:"application/ld+json",children:JSON.stringify(c)}),n.jsx("script",{type:"application/ld+json",children:JSON.stringify(m)})]}):r&&h?n.jsxs(n.Fragment,{children:[n.jsx("script",{type:"application/ld+json",children:JSON.stringify(p)}),n.jsx("script",{type:"application/ld+json",children:JSON.stringify(h)})]}):n.jsx("script",{type:"application/ld+json",children:JSON.stringify(p)})]})}const Oi=()=>(y.useEffect(()=>{if(document.getElementById("gtm-script"))return;const e=document.createElement("script");return e.id="gtm-script",e.innerHTML=`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M2GDLHZ8');`,document.head.insertBefore(e,document.head.firstChild),()=>{}},[]),n.jsx("noscript",{children:n.jsx("iframe",{src:"https://www.googletagmanager.com/ns.html?id=GTM-M2GDLHZ8",height:"0",width:"0",style:{display:"none",visibility:"hidden"},title:"GTM"})})),Wi="/assets/f5bde9dbf97a6173262b508893d89c9f53e04258-BqmYKS7-.webp",Bi="/assets/04b8212c348ba87b31f3fb0fdf4b1e2cf2d7e8f3-CKDyXv0o.webp",Li="/assets/00ba10d702fb047d9a6ba4780de74db73f7e5403-kQZht_w6.webp",qi="/assets/journal-6-cover-HmKeIJYW.webp",Ki="/assets/journal-7-cover-CQVRQJ_9.webp",Ui="/assets/journal-8-cover-DPpG-rTd.webp",_t="/assets/caterelo-cover-BV8BIBEb.webp",Hi=[{id:9,published:!1,title:"Building Caterelo:<br/>r3loop applied",title_pl:"Jak zbudowaliśmy<br/>Caterelo z r3loop",date:"May 2026",category:"Operator Notes",image:_t,content_pl:`
      <p class="mb-6 text-xl leading-relaxed text-neutral-300">
        Relokacja jest jedną z najtrudniejszych decyzji jakie człowiek podejmuje — wysoka stawka, trudna do odwrócenia, dane rozproszone w 60+ urzędach statystycznych w pięciu językach. <span class="text-white font-medium">Większość ludzi rezygnuje w połowie i decyduje na podstawie blog posta albo wątku w grupie facebookowej.</span>
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        To jest problem który zbudowaliśmy żeby rozwiązać przez <a href="https://caterelo.com" target="_blank" rel="noopener" class="text-[#D4FF00] border-b border-[#D4FF00]/40 hover:border-[#D4FF00]">Caterelo</a> — decision engine relokacyjny dla Europy Południowej. I chcieliśmy go rozwiązać dokładnie tą samą metodologią, którą sprzedajemy klientom: <span class="text-white">r3loop</span>.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Czterech ludzi, jeden zepsuty proces</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        W rozmowach z prospektami i wcześniejszymi użytkownikami ciągle wracały te same cztery profile — każdy z innym pytaniem, ale z tym samym frustrującym doświadczeniem:
      </p>
      <ul class="list-none mb-10 space-y-4 text-neutral-400 text-lg pl-4 border-l-2 border-[#D4FF00]/40">
        <li><span class="text-white font-medium">Remote worker</span> — porównuje internet, znajomość angielskiego, strefy czasowe i ekosystem coworkingowy między Andaluzją, Algarve a Kretą. Potrzebuje wąskich technicznych metryk, nie ogólnych "vibe scores".</li>
        <li><span class="text-white font-medium">Rodzina z dziećmi w wieku szkolnym</span> — bilansuje jakość szkół, dostęp do opieki zdrowotnej, walkability, family-friendly metrics. Czas decyzji ma okno wakacyjne między rokiem szkolnym.</li>
        <li><span class="text-white font-medium">Expat po pięćdziesiątce</span> — myśli wieloletnio o koszcie życia, tolerancji klimatycznej i lokalnej społeczności. Patrzy na 10+ lat naprzód, nie 12 miesięcy.</li>
        <li><span class="text-white font-medium">Second-home buyer</span> — analizuje projekcje klimatyczne 2050, rental yield, trajektorie cen nieruchomości. Decyzja kapitałowa, nie tylko lifestyle'owa.</li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Priorytety tych czterech osób się nie pokrywają. To samo miejsce może być <span class="text-white">"najlepsze"</span> dla remote workera i <span class="text-white">"nie dla nas"</span> dla rodziny. Generyczne listy "top 10 places to relocate" zawodziły wszystkich czterech.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Pod tym leżał strukturalny problem: dane są w 60+ urzędach statystycznych, w 5 językach, mierzone różnie w każdym kraju. <span class="text-white border-b border-[#D4FF00]/50">40+ godzin researchu</span> żeby zrobić to dobrze. Większość ludzi nie kończy. Decyzja zapada na podstawie blog posta albo pierwszych trzech ofert z Idealisty.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Pytanie nie brzmiało <span class="text-white">"jak zbudować jeszcze jeden serwis z mieszkaniami"</span>. Pytanie brzmiało: <span class="text-white">jak zbudować decision engine, który czterem różnym osobom pomaga w ich własnym problemie</span>, używając tych samych danych ale różnie ważonych — i robi to tak, żeby trwało 30 sekund zamiast 40 godzin.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Jak r3loop ukształtował każdą decyzję</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        r3loop to nasza 8-stopniowa metodologia którą stosujemy u klientów konsultingowych do systematyzowania creative i operational work. <span class="text-white">Diagnose → Map → Standardize → Build → Govern → Ship → Measure → Iterate.</span>
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Zastosowana do Caterelo nie wyglądała jak checklist do odhaczenia — wyglądała jak filtr decyzyjny w każdym kroku. Oto jak ukształtowała produkt:
      </p>

      <h3 class="text-xl font-bold text-white mt-10 mb-4">01 — Diagnose · Czyj problem rozwiązujemy i dlaczego obecny proces zawodzi?</h3>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Cztery persony, cztery różne priorytety, jeden wspólny ból — fragmentacja danych i niemożność porównania. <span class="text-white">Z tej diagnozy wynikł 14-pytaniowy quiz</span> (5 minut, jeden ekran formularza), który buduje personal relocation profile. Output: nie "top 10 miejsc", tylko <span class="text-white">Match Score</span> dla każdego z 90 regionów, oparty na tym co konkretnie tej osobie zależy.
      </p>

      <h3 class="text-xl font-bold text-white mt-10 mb-4">02 — Map · Które dane odpowiadają na ich pytania — i jak je porównać między krajami?</h3>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Zmapowaliśmy decyzję relokacyjną na <span class="text-white">7 wymiarów</span> (koszt życia, klimat, bezpieczeństwo, opieka zdrowotna, edukacja, lifestyle, infrastruktura cyfrowa) i <span class="text-white">13 sygnałów</span>, mierzonych tak samo we wszystkich sześciu krajach. Hiszpania (17 regionów), Włochy (20), Portugalia (6), Grecja (13), Francja (13), Chorwacja (21) — wszystkie na tych samych osiach. Dopiero to pozwala porównać Algarve z Toskanią w sposób uczciwy.
      </p>

      <h3 class="text-xl font-bold text-white mt-10 mb-4">03 — Standardize · Jak zwijamy 13 sygnałów w jedną liczbę, którą można rankować?</h3>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        <span class="text-white">LifeTrend™ Score 30–90</span>. Min-max normalizacja per wymiar, ważone według tego co najbardziej wpływa na realne pojęcie "jakości miejsca" (bezpieczeństwo 22%, koszt życia 18%, zdrowie 13%, klimat 12%, lifestyle 12%, cyfrowość 10%, edukacja 9%), zsumowane. To jest baseline. Personal Match Score nakłada na to wagi z quizu — ten sam region może mieć LifeTrend 78 globalnie i Match Score 91 dla konkretnego użytkownika.
      </p>

      <h3 class="text-xl font-bold text-white mt-10 mb-4">04 — Build · Co właściwie user potrzebuje robić z tymi danymi?</h3>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Nie raw spreadsheet. Konkretne narzędzia decyzyjne: <span class="text-white">Compare engine</span> dla porównania dwóch miejsc head-to-head. <span class="text-white">Decision Matrix</span> dla stress-testu 3–5 regionów na shortliście. <span class="text-white">Year 1 Life Simulator</span> dla planowania budżetu pierwszego roku (loty z origin, family size, monthly cost). <span class="text-white">Visa Wizard</span> + Tax Day Counter dla pathway'a wizowego. <span class="text-white">AI Relocation Advisor</span> wytrenowany na pełnym datasecie i twoim quizie — to nie chatbot bolted on, to interfejs do danych dostosowany do kontekstu konkretnej osoby. Pod spodem konwencjonalny stack (React/TS, Node, Postgres, vector store dla AI retrieval) — ale stack jest implementacją, nie historią.
      </p>

      <h3 class="text-xl font-bold text-white mt-10 mb-4">05 — Govern · Jak to ma być wiarygodne w skali?</h3>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Każda liczba w Caterelo prowadzi do swojego origin — INE dla Hiszpanii, ISTAT dla Włoch, INSEE dla Francji, ELSTAT dla Grecji, INE PT dla Portugalii, DZS dla Chorwacji, plus Eurostat, OECD, WHO, IPCC AR6, Numbeo, Idealista, Immobiliare i 50+ innych. <span class="text-white">60+ oficjalnych źródeł, traceable provenance, kwartalny refresh.</span> Tam gdzie dane są niekompletne — flagujemy to wprost. Trust nie jest deklaracją, jest infrastrukturą.
      </p>

      <h3 class="text-xl font-bold text-white mt-10 mb-4">06 — Ship · Jaka jest najniższa friction żeby zbudować to do realnej decyzji?</h3>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Free tier — bez signupu, wszystkie 90 regionów, 10-letnie trendy cen, stolice, podgląd rentalu. <span class="text-white">Founding Access €29 jednorazowo na 3 miesiące</span> — Match Score, Decision Matrix, Year 1 Simulator, AI Advisor, Climate 2050 layer, 270 deep linków do portali nieruchomościowych. Bez subskrypcji, bez auto-renew. Ship znaczy: jest live, z użytkownikami, z revenue, można użyć teraz.
      </p>

      <h3 class="text-xl font-bold text-white mt-10 mb-4">07 — Measure · Jak system zostaje uczciwy gdy świat się zmienia?</h3>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        <span class="text-white">Live data feeds</span> (pogoda, AQI, kursy walut, Google Trends interest, Eurostat population) — model aktualizuje się ciągle, nie raz na kwartał. <span class="text-white">Momentum scoring</span> łapie przyspieszanie cen vs długoterminowych trendów. <span class="text-white">Hidden Gem Detector</span> cross-referuje LifeTrend z search interest — wyłania regiony niedowartościowane przed mainstream.
      </p>

      <h3 class="text-xl font-bold text-white mt-10 mb-4">08 — Iterate · Jak produkt staje się mądrzejszy z użyciem, a nie tylko większy?</h3>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        AI Advisor uczy się z interakcji — w jakim kontekście odpowiedzi rezonują, gdzie user wraca z follow-upem. Local Help layer (manually reviewed locals walidujący właściwości i okolice) jest w stadium concierge — będzie skalowany do marketplace gdy popyt to uzasadni. Climate 2050 projekcje doprecyzowywane gdy IPCC publikuje update. <span class="text-white">Iterate to loop domykający się — i loop otwierający się ponownie.</span>
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Konkret: Katalonia vs Apulia w 30 sekundach</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Dwa popularne shortlisty śródziemnomorskie. Oba "lifestyle". Bez Caterelo to <span class="text-white">dni cross-referowania INE i ISTAT w dwóch językach</span>. Z Caterelo dane mówią różne historie natychmiast:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg pl-4 border-l-2 border-[#D4FF00]/40">
        <li><span class="text-white font-medium">Katalonia:</span> €4 512/m² (top 5 miast), +41,2% w 5 lat, momentum: accelerating.</li>
        <li><span class="text-white font-medium">Apulia:</span> €1 319/m² (top 5 miast), +23,2% w 5 lat, momentum: stable.</li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Gap €3 193/m². Katalonia rośnie 18 punktów procentowych szybciej — Apulia daje 3,4× więcej metrów kwadratowych za euro. <span class="text-white">Jeśli jesteś drugą personą (rodzina, średni budżet, "kupić nie najem")</span> — Apulia wygrywa. Jeśli jesteś czwartą (second-home buyer, capital appreciation > space) — Katalonia.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        To nie jest "Apulia jest lepsza". To jest <span class="text-white">"oto fakty, oto twoja waga, oto decyzja"</span>. Tak wygląda r3loop applied: nie automatyzacja pracy, tylko eliminacja pracy która i tak nie powinna istnieć.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Trzy rzeczy które zostają</h2>

      <h3 class="text-xl font-bold text-white mt-10 mb-4">1. r3loop jest <em>portable</em> między domenami</h3>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Ten sam framework systematyzuje creative ops w sieci klubów Zdrofit (250+ lokalizacji, briefy, assety, deadliney) i decyzję relokacyjną dla osoby kupującej dom w Algarve. <span class="text-white">Mechanika jest taka sama — diagnose czyj problem, map data, standardize w jeden wskaźnik, build narzędzia, govern trust, ship, measure, iterate.</span> To dowodzi że r3loop nie jest "metodą dla agencji" — jest decision framework dla każdego operational problem.
      </p>

      <h3 class="text-xl font-bold text-white mt-10 mb-4">2. AI-native ≠ AI-supported</h3>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Caterelo było zaprojektowane <span class="text-white">OD możliwości AI</span> — AI advisor jest interfejsem do danych, nie add-onem doczepionym do search bara. To zmienia user experience: zamiast forms i filtrów dostajesz rozmowę kontekstową ("dla mojej rodziny z dziećmi 8 i 11 lat, budżet do €1500/mo, ważne dobre szkoły — co rekomendujesz w Portugalii vs Hiszpanii?"). W 2027 ta różnica między AI-native a AI-supported będzie premium differentiator.
      </p>

      <h3 class="text-xl font-bold text-white mt-10 mb-4">3. <em>Personal Match</em> &gt; <em>Universal Best</em></h3>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Największa lekcja z budowania pod cztery różne persony: <span class="text-white">przestań mówić ludziom co jest "najlepsze"</span> — daj im narzędzia żeby zobaczyli co jest najlepsze <em>dla nich</em>. To wymusiło Match Score zamiast generic top 10. To samo rządzi pracą u klientów — przestań mówić sieci klubów co jest "best practice" w branding, daj system który dopasowuje się do ich konkretnych ograniczeń. r3loop wymusza to projektowanie.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Co dalej</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Caterelo jest live na <a href="https://caterelo.com" target="_blank" rel="noopener" class="text-[#D4FF00] border-b border-[#D4FF00]/40 hover:border-[#D4FF00]">caterelo.com</a> — możesz teraz przejść quiz, zbudować swój profile, zobaczyć Match Score dla 90 regionów. Pełne mapowanie metodologii do produktu jest w case study na <a href="/work/caterelo" class="text-[#D4FF00] border-b border-[#D4FF00]/40 hover:border-[#D4FF00]">r352.com/work/caterelo</a>.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Co dalej: <span class="text-white">więcej decision engines tą samą metodologią</span>. Każdy operational problem który ma więcej niż jedną personę, więcej niż jeden wymiar i więcej niż jeden valid answer pasuje pod ten sam framework. To samo r3loop, różne aplikacje.
      </p>
      <div class="bg-white/[0.03] border-l-2 border-[#D4FF00] p-8 my-12">
        <p class="text-xl text-white font-medium leading-relaxed mb-3">
          Jeśli skalujesz wielolokalizacyjny biznes i operacje wewnętrzne są bottleneckiem — to dokładnie problem, nad którym pracujemy.
        </p>
        <p class="text-base text-neutral-400">
          Caterelo dowodzi metodologii. Twój retainer lub projekt jest jej aplikacją.
        </p>
      </div>
    `,content:`
      <p class="mb-6 text-xl leading-relaxed text-neutral-300">
        Relocation is one of the hardest decisions a person makes — high stakes, hard to reverse, data scattered across 60+ government statistics offices in five languages. <span class="text-white font-medium">Most people give up halfway and decide based on a blog post or a Facebook group thread.</span>
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        That's the problem we built <a href="https://caterelo.com" target="_blank" rel="noopener" class="text-[#D4FF00] border-b border-[#D4FF00]/40 hover:border-[#D4FF00]">Caterelo</a> to solve — a personal relocation decision engine for Southern Europe. And we wanted to solve it using exactly the methodology we sell to clients: <span class="text-white">r3loop</span>.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Four people, one broken process</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        In conversations with prospects and early users, the same four profiles kept showing up — each with a different question, but the same frustrating experience:
      </p>
      <ul class="list-none mb-10 space-y-4 text-neutral-400 text-lg pl-4 border-l-2 border-[#D4FF00]/40">
        <li><span class="text-white font-medium">Remote worker</span> — comparing internet speed, English proficiency, time zones and coworking ecosystems across Andalucía, the Algarve and Crete. Needs narrow technical metrics, not generic "vibe scores".</li>
        <li><span class="text-white font-medium">Family with school-age kids</span> — balancing school quality, healthcare access, walkability, family-friendly metrics. Decision window timed to the summer break between school years.</li>
        <li><span class="text-white font-medium">Expat in their fifties</span> — thinking long-term about cost of living, climate tolerance and local community. Looking ten years ahead, not twelve months.</li>
        <li><span class="text-white font-medium">Second-home buyer</span> — analyzing 2050 climate projections, rental yield, property price trajectories. A capital decision, not just a lifestyle one.</li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        These four people's priorities don't overlap. The same region can be <span class="text-white">"best"</span> for the remote worker and <span class="text-white">"not for us"</span> for the family. Generic "top 10 places to relocate" lists were failing all four.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Under that sat a structural problem: the data lives in 60+ statistics offices, in five languages, measured differently in each country. <span class="text-white border-b border-[#D4FF00]/50">40+ hours of research</span> to do it right. Most people don't finish. The decision gets made on a blog post or the first three listings on Idealista.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        The question wasn't <span class="text-white">"how do we build another property listings site"</span>. The question was: <span class="text-white">how do we build a decision engine that helps four different people with their own problems</span>, using the same data weighted differently — and does it in 30 seconds instead of 40 hours.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">How r3loop shaped every decision</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        r3loop is our 8-step methodology for systematizing creative and operational work for consulting clients. <span class="text-white">Diagnose → Map → Standardize → Build → Govern → Ship → Measure → Iterate.</span>
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Applied to Caterelo it wasn't a checklist to tick off — it was a decision filter at every step. Here's how each one shaped the product:
      </p>

      <h3 class="text-xl font-bold text-white mt-10 mb-4">01 — Diagnose · Whose problem are we solving, and why does the current process fail them?</h3>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Four personas, four different priorities, one shared pain — fragmented data and no way to compare meaningfully. <span class="text-white">From that diagnosis came a 14-question quiz</span> (5 minutes, single-page form) that builds a personal relocation profile. Output isn't "top 10 places" — it's <span class="text-white">a Match Score</span> for each of 90 regions, weighted by what this specific person actually cares about.
      </p>

      <h3 class="text-xl font-bold text-white mt-10 mb-4">02 — Map · Which data answers their questions, and how do we make it comparable across countries?</h3>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        We mapped the relocation decision onto <span class="text-white">7 dimensions</span> (cost of living, climate, safety, healthcare, education, lifestyle, digital infrastructure) and <span class="text-white">13 signals</span>, measured the same way across all six countries. Spain (17 regions), Italy (20), Portugal (6), Greece (13), France (13), Croatia (21) — all on the same axes. Only then can you compare the Algarve to Tuscany honestly.
      </p>

      <h3 class="text-xl font-bold text-white mt-10 mb-4">03 — Standardize · How do we collapse 13 signals into one number you can rank?</h3>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        <span class="text-white">LifeTrend™ Score 30–90.</span> Min-max normalization per dimension, weighted by what most drives the real-life sense of "quality of place" (safety 22%, cost of living 18%, healthcare 13%, climate 12%, lifestyle 12%, digital 10%, education 9%), summed. That's the baseline. Personal Match Score overlays your quiz weights on top — the same region can score LifeTrend 78 globally and Match Score 91 for a specific user.
      </p>

      <h3 class="text-xl font-bold text-white mt-10 mb-4">04 — Build · What does the user actually need to do with this data?</h3>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Not a raw spreadsheet. Concrete decision tools: <span class="text-white">Compare engine</span> for head-to-head between two places. <span class="text-white">Decision Matrix</span> to stress-test a 3–5 region shortlist. <span class="text-white">Year 1 Life Simulator</span> for first-year budget planning (flights from origin, family size, monthly cost). <span class="text-white">Visa Wizard</span> + Tax Day Counter for visa pathway. <span class="text-white">AI Relocation Advisor</span> trained on the full dataset and your quiz — not a chatbot bolted on, but a context-aware interface to the data. Under the hood a conventional stack (React/TS, Node, Postgres, vector store for AI retrieval) — but the stack is implementation, not the story.
      </p>

      <h3 class="text-xl font-bold text-white mt-10 mb-4">05 — Govern · How does this stay trustworthy at scale?</h3>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Every number in Caterelo traces back to its origin — INE for Spain, ISTAT for Italy, INSEE for France, ELSTAT for Greece, INE PT for Portugal, DZS for Croatia, plus Eurostat, OECD, WHO, IPCC AR6, Numbeo, Idealista, Immobiliare, and 50+ others. <span class="text-white">60+ official sources, traceable provenance, quarterly refresh.</span> Where data is incomplete, we flag it explicitly. Trust isn't a claim, it's infrastructure.
      </p>

      <h3 class="text-xl font-bold text-white mt-10 mb-4">06 — Ship · What's the lowest-friction way to put this in front of a real decision?</h3>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Free tier — no signup, all 90 regions, 10-year price trends, capital cities, rental overview. <span class="text-white">Founding Access €29 one-time for 3 months</span> — Match Score, Decision Matrix, Year 1 Simulator, AI Advisor, Climate 2050 layer, 270 deep-links to property portals. No subscription, no auto-renew. Ship means: live, with users, with revenue, usable today.
      </p>

      <h3 class="text-xl font-bold text-white mt-10 mb-4">07 — Measure · How does the system stay honest as the world changes?</h3>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        <span class="text-white">Live data feeds</span> (weather, AQI, currency, Google Trends interest, Eurostat population) — the model updates continuously, not just quarterly. <span class="text-white">Momentum scoring</span> catches price acceleration vs long-term trends. <span class="text-white">Hidden Gem Detector</span> cross-references LifeTrend with search interest — surfaces regions undervalued before they go mainstream.
      </p>

      <h3 class="text-xl font-bold text-white mt-10 mb-4">08 — Iterate · How does the product get smarter with use, not just bigger?</h3>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        The AI Advisor learns from interactions — which contexts answers resonate in, where users return for follow-ups. Local Help (manually reviewed locals validating properties and neighbourhoods) is at concierge stage — will scale to marketplace as demand justifies it. Climate 2050 projections get refined as IPCC publishes updates. <span class="text-white">Iterate is the loop closing — and the loop reopening.</span>
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Concrete: Catalonia vs Puglia in 30 seconds</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Two popular Mediterranean shortlists. Both "lifestyle". Without Caterelo it's <span class="text-white">days of cross-referencing INE and ISTAT in two languages</span>. With Caterelo the data tells different stories immediately:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg pl-4 border-l-2 border-[#D4FF00]/40">
        <li><span class="text-white font-medium">Catalonia:</span> €4,512/m² (top 5 cities), +41.2% over 5 years, momentum: accelerating.</li>
        <li><span class="text-white font-medium">Puglia:</span> €1,319/m² (top 5 cities), +23.2% over 5 years, momentum: stable.</li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        A €3,193/m² gap. Catalonia is growing 18 percentage points faster — Puglia gives you 3.4× more square metres per euro. <span class="text-white">If you're the second persona (family, mid-budget, "buy not rent")</span> — Puglia wins. If you're the fourth (second-home buyer, capital appreciation &gt; space) — Catalonia.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        It's not "Puglia is better". It's <span class="text-white">"here are the facts, here's your weighting, here's the decision"</span>. That's what r3loop applied looks like: not automating the work, but eliminating work that shouldn't exist in the first place.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Three things that stick</h2>

      <h3 class="text-xl font-bold text-white mt-10 mb-4">1. r3loop is <em>portable</em> across domains</h3>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        The same framework that systematizes creative ops at Zdrofit (250+ club network, briefs, assets, deadlines) works for a relocation decision engine for a person buying a home in the Algarve. <span class="text-white">The mechanics are identical — diagnose whose problem, map the data, standardize into one signal, build the tools, govern trust, ship, measure, iterate.</span> That proves r3loop isn't "a method for agencies" — it's a decision framework for any operational problem.
      </p>

      <h3 class="text-xl font-bold text-white mt-10 mb-4">2. AI-native ≠ AI-supported</h3>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Caterelo was designed <span class="text-white">FROM AI capabilities</span> — the AI Advisor is the interface to the data, not an add-on bolted onto the search bar. That changes the user experience: instead of forms and filters you get a contextual conversation ("for my family with kids 8 and 11, budget up to €1,500/mo, good schools important — what do you recommend in Portugal vs Spain?"). By 2027, the AI-native vs AI-supported distinction will be a premium differentiator.
      </p>

      <h3 class="text-xl font-bold text-white mt-10 mb-4">3. <em>Personal Match</em> &gt; <em>Universal Best</em></h3>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        The biggest lesson from building for four different personas: <span class="text-white">stop telling people what's "best"</span> — give them tools to see what's best <em>for them</em>. That forced Match Score instead of a generic top 10. The same principle drives our client work — stop telling a club network what's "best practice" in branding; give them a system that adapts to their specific constraints. r3loop forces that design.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">What's next</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Caterelo is live at <a href="https://caterelo.com" target="_blank" rel="noopener" class="text-[#D4FF00] border-b border-[#D4FF00]/40 hover:border-[#D4FF00]">caterelo.com</a> — you can take the quiz now, build your profile, see Match Scores across 90 regions. The full methodology-to-product mapping is on the case study at <a href="/work/caterelo" class="text-[#D4FF00] border-b border-[#D4FF00]/40 hover:border-[#D4FF00]">r352.com/work/caterelo</a>.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        What's next: <span class="text-white">more decision engines built with the same methodology</span>. Any operational problem with more than one persona, more than one dimension and more than one valid answer fits under the same framework. Same r3loop, different applications.
      </p>
      <div class="bg-white/[0.03] border-l-2 border-[#D4FF00] p-8 my-12">
        <p class="text-xl text-white font-medium leading-relaxed mb-3">
          If you're scaling a multi-location business and internal operations are a bottleneck — that's exactly the problem we work on.
        </p>
        <p class="text-base text-neutral-400">
          Caterelo proves the methodology. Your retainer or project is its application.
        </p>
      </div>
    `},{id:6,title:"Why most design problems<br/>are not design problems",title_pl:"Dlaczego większość problemów<br/>z designem to nie problemy<br/>z designem",date:"May 2026",category:"Insights",image:qi,content_pl:`
      <p class="mb-6 text-xl leading-relaxed text-neutral-300">
        CMO multi-location chain dzwoni: <span class="text-white font-medium">"Nasi designerzy nie umieją robić ładnych materiałów."</span>
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Dwa tygodnie audytu workflow później wiadomo: nie chodziło o talent. Chodziło o pięć ukrytych pułapek operacyjnych, które każdy pojedynczy designer rozbiłby się o nie, niezależnie od umiejętności.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Najczęstsza pomyłka w design ops: <span class="text-white border-b border-[#D4FF00]/50">leczenie objawów, nie przyczyn.</span>
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Po dekadzie pracy z multi-location markami (fitness, wellness, retail, real estate) widzę te same pięć wzorców powtarzanych w 90% przypadków. Każdy z nich wygląda jak "design problem" na powierzchni. Żaden nim nie jest.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Pattern 01 — Niejasne briefy<br/>to workflow problem, nie creative problem</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Sygnał: "Nasi designerzy nie rozumieją czego chcemy. Robią coś innego niż prosimy."
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Rzeczywistość: briefy wpadają do zespołu przez 4 różne kanały (mail, Slack, Notion, telefon). Brak template'a. Brak Definition of Ready. Designer dostaje zlecenie, które kompletny jest w 40% — reszta to założenia.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Nie zatrudnisz tu lepszego designera. Naprawisz to <span class="text-white">strukturą briefu + jednym intake channel</span>.
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Jedna ścieżka intake. Wszystko inne wraca do nadawcy.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Brief template z 6-8 polami (cel, audience, ograniczenia, deadline, ownership, definicja done).</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Definition of Ready: brief nie zaczyna produkcji dopóki nie spełnia checklist'y.</span></li>
      </ul>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Pattern 02 — Pętle poprawek<br/>to governance problem, nie quality problem</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Sygnał: "Projekty robimy po 5 rund. Każdy ma uwagi. Nic nie idzie do produkcji."
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Rzeczywistość: nikt nie ma final say. Marketing direktor mówi "mam uwagi", brand manager mówi "mam uwagi", CMO mówi "mam uwagi". Każda runda to nowy stakeholder z nowym opinion. Feedback staje się polityczny zamiast precyzyjny.
      </p>

      <div class="my-16 border-l-2 border-[#D4FF00] pl-6 md:pl-8">
        <h3 class="font-display text-[#D4FF00] text-3xl md:text-5xl uppercase tracking-tighter leading-[0.9]">
          Jeden owner decyzji<br/>per workstream.<br/>Reszta to noise.
        </h3>
      </div>

      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Fix nie jest w "lepszym designie". Fix jest w jasnej mapie ownership: kto akceptuje WHAT, kiedy, w jakim trybie. Bez tego każda projekt to negotiation, nie production.
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Jedna osoba per workstream może powiedzieć tak/nie. Wszyscy inni: input, nie veto.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Feedback windows zamiast continuous stream. Slack o 14:30, nie kapie cały dzień.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Kryteria feedbacku z góry. "Nie pasuje" nie jest feedback. "Nie pasuje, bo X" jest.</span></li>
      </ul>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Pattern 03 — Inconsistency across locations<br/>to standards problem, nie aesthetic problem</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Sygnał: "Każda lokalizacja robi swoje. Materiały wyglądają jak z 5 różnych firm."
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Rzeczywistość: brand guidelines istnieją (jako PDF). Nikt ich nie używa. Każdy local marketing manager robi po swojemu, bo PDF nie odpowiada na pytanie "jak konkretnie zrobić ad pod ten lokalny event w tym formacie".
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Brand guidelines są niewystarczające. Potrzebujesz <span class="text-white">templates + asset library + clear rules per format</span>. PDF mówi "nasz kolor to #D4FF00". Template mówi "Twoja kampania Q3 — tutaj klikasz, podmieniasz tekst, ekspport, gotowe".
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Templates per format (social, print, outdoor, digital ads, email). Nie generic.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Reusable component library. Block-based, nie szablonowe full-page.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>QA checklist before publish. 5-7 punktów, nie 50.</span></li>
      </ul>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Pattern 04 — Slow delivery<br/>to cadence problem, nie capacity problem</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Sygnał: "Wszystko trwa za długo. Zatrudniamy więcej, ale szybciej nie jest."
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Rzeczywistość: praca przychodzi w spikach. Tydzień nic, potem 12 rzeczy na piątek o 16:00. Designer kończy projekt, nie ma następnego brief'a gotowego, czeka. Dochodzi kolejny brief — wszystko ASAP, wszystko ważne.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Dodanie kolejnego designera nie rozwiązuje tego. Spike pattern się powieksza. Rozwiązaniem jest <span class="text-white">stały cotygodniowy rytm</span> — predictable cadence, nie reactive sprints.
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Tydzień zawsze ma deliverable. Output, nie progress.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Brief'y planowane 2 tygodnie z góry. Nowe wpadają do backlog, nie do tygodnia.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>"Pilne" to wyjątek wymagający uzasadnienia, nie default mode.</span></li>
      </ul>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Pattern 05 — Brand drift<br/>to ownership problem, nie discipline problem</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Sygnał: "Marka rozjeżdża się przez czas. Każdy projekt wygląda trochę inaczej."
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Rzeczywistość: nikt nie jest właścicielem brand consistency. Marketing dir myśli że to brand manager. Brand manager myśli że to design lead. Design lead myśli że to "wspólna sprawa". Każdy myśli że ktoś inny pilnuje. Nikt nie pilnuje.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Brand consistency potrzebuje <span class="text-white">jednego custodian</span> — osoby z explicit mandate "to jest moja praca". Bez tego każde indywidualne decision drifts, kumulują się przez 18 miesięcy, marka wygląda jak po rebrandzie którego nie było.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Co się zmienia, kiedy to naprawisz</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Nie obiecuję rewolucji. Obiecuję boring excellence:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>80%+ briefów ready first round (zamiast 30%).</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Cykle akceptacji 3× szybsze (z 14 dni do 3-5 dni).</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Tygodniowy rytm publishingu (zamiast "kiedy będzie gotowe").</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Brand consistency cross-locations bez QA gymnastics.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Marketing team przestaje gasić pożary i zaczyna planować.</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Nic z tego nie wymaga lepszego designera. Wszystko wymaga lepszego systemu.
      </p>

      <div class="my-16 bg-neutral-900/50 p-8 md:p-12 border border-white/5 relative overflow-hidden">
        <div class="absolute top-0 right-0 p-4 opacity-10 font-display text-9xl leading-none text-[#D4FF00] pointer-events-none select-none">SYSTEM</div>
        <h3 class="relative z-10 font-display text-white text-2xl uppercase tracking-widest mb-8">Robimy to przez 8-krokowy framework</h3>
        <p class="relative z-10 text-neutral-400 text-base mb-4">
          W r352 codifyowaliśmy te 5 patterns w sekwencyjny framework — nazywamy go r3loop. Nic radykalnego, każdy z 8 kroków adresuje konkretną pułapkę operacyjną w odpowiedniej kolejności.
        </p>
        <p class="relative z-10 text-neutral-400 text-base">
          Jeśli ciekawi Cię szczegół — pełen breakdown na <a href="/process" class="text-[#D4FF00] hover:text-white transition-colors border-b border-[#D4FF00]/40">/process</a>. Ale ważniejsze niż framework jest to, że te 5 patterns istnieje w 90% multi-location organizacji. Najpierw je rozpoznaj. Potem zdecyduj jak je rozwiązać.
        </p>
      </div>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Jak rozpoznać czy masz<br/>"design problem" czy operations problem</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Test prostszy niż audyt:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Czy zmiana designera rozwiązuje problem? Jeśli tak — design problem. Jeśli nie — system problem.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Czy problem powtarza się across różnych projektów? Jeśli tak — system, nie indywidualne.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Czy "good" project happens przez heroizm pojedynczej osoby? Jeśli tak — masz heroizm, nie system.</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        90% "design problems" w multi-location organizacjach to operations problems. To dobra wiadomość — operations problems są solvable. Design talent gaps trudno rozwiązać. Workflow gaps można rozwiązać w 6-12 tygodni.
      </p>

      <p class="font-display text-white text-2xl uppercase tracking-wider my-8">
        Najpierw zdiagnozuj. Potem decyduj. Nie odwrotnie.
      </p>

      <hr class="my-16 border-white/10" />

      <div class="bg-neutral-900 border border-white/5 p-8 md:p-12 text-center">
         <p class="text-lg text-neutral-400 max-w-2xl mx-auto mb-4">
            Jeśli rozpoznajesz którykolwiek z tych 5 patterns w swoim zespole — najprawdopodobniej nie potrzebujesz lepszego designera.
         </p>
         <p class="font-display text-[#D4FF00] text-4xl md:text-5xl uppercase tracking-tighter leading-none">
            Potrzebujesz lepszego<br/>systemu.
         </p>
      </div>
`,content:`
      <p class="mb-6 text-xl leading-relaxed text-neutral-300">
        A CMO at a multi-location chain calls: <span class="text-white font-medium">"Our designers can't produce work that feels right."</span>
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Two weeks of workflow audit later, the answer is clear: it wasn't a talent problem. It was five hidden operational traps that any individual designer would crash against, regardless of skill.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        The most common mistake in design ops: <span class="text-white border-b border-[#D4FF00]/50">treating symptoms, not causes.</span>
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        After a decade working with multi-location brands (fitness, wellness, retail, real estate), I see the same five patterns repeat in 90% of cases. Each looks like a "design problem" on the surface. None of them are.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Pattern 01 — Unclear briefs<br/>are a workflow problem, not a creative problem</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Signal: "Our designers don't understand what we want. They deliver something different from what we asked for."
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Reality: briefs arrive through 4 different channels (email, Slack, Notion, phone calls). No template. No Definition of Ready. The designer receives a request that's 40% complete — the rest is assumptions.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        You won't fix this by hiring a better designer. You fix it with <span class="text-white">brief structure + a single intake channel</span>.
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>One intake path. Everything else gets returned to the sender.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Brief template with 6-8 fields (goal, audience, constraints, deadline, ownership, definition of done).</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Definition of Ready: production doesn't start until the brief passes a checklist.</span></li>
      </ul>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Pattern 02 — Revision loops<br/>are a governance problem, not a quality problem</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Signal: "Projects take 5 rounds. Everyone has comments. Nothing ships."
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Reality: nobody has final say. Marketing director says "I have comments", brand manager says "I have comments", CMO says "I have comments". Each round brings a new stakeholder with new opinions. Feedback becomes political instead of precise.
      </p>

      <div class="my-16 border-l-2 border-[#D4FF00] pl-6 md:pl-8">
        <h3 class="font-display text-[#D4FF00] text-3xl md:text-5xl uppercase tracking-tighter leading-[0.9]">
          One decision owner<br/>per workstream.<br/>The rest is noise.
        </h3>
      </div>

      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        The fix isn't "better design". It's a clear ownership map: who approves WHAT, when, in what format. Without this, every project is a negotiation, not production.
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>One person per workstream can say yes/no. Everyone else: input, not veto.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Feedback windows, not continuous stream. Slack at 14:30, not dripping all day.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Feedback criteria upfront. "Doesn't fit" isn't feedback. "Doesn't fit because X" is.</span></li>
      </ul>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Pattern 03 — Inconsistency across locations<br/>is a standards problem, not an aesthetic problem</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Signal: "Every location does its own thing. Materials look like they came from 5 different companies."
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Reality: brand guidelines exist (as a PDF). Nobody uses them. Each local marketing manager does it their way, because the PDF doesn't answer "how exactly do I make an ad for this local event in this format".
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Brand guidelines aren't enough. You need <span class="text-white">templates + asset library + clear rules per format</span>. The PDF says "our color is #D4FF00". The template says "Your Q3 campaign — click here, swap the text, export, done".
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Templates per format (social, print, outdoor, digital ads, email). Not generic.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Reusable component library. Block-based, not full-page templates.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>QA checklist before publish. 5-7 points, not 50.</span></li>
      </ul>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Pattern 04 — Slow delivery<br/>is a cadence problem, not a capacity problem</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Signal: "Everything takes too long. We hire more people, but it's not faster."
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Reality: work arrives in spikes. A quiet week, then 12 things due Friday at 4pm. The designer finishes one project, has no next brief ready, waits. Then another brief arrives — all ASAP, all important.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Adding another designer doesn't fix this. The spike pattern just gets bigger. The fix is <span class="text-white">a steady weekly rhythm</span> — predictable cadence, not reactive sprints.
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Every week ships a deliverable. Output, not progress.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Briefs planned 2 weeks ahead. New ones go into backlog, not into this week.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>"Urgent" is an exception that needs justification, not a default mode.</span></li>
      </ul>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Pattern 05 — Brand drift<br/>is an ownership problem, not a discipline problem</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Signal: "The brand is drifting over time. Each project looks a little different."
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Reality: nobody owns brand consistency. Marketing director thinks it's the brand manager. Brand manager thinks it's the design lead. Design lead thinks it's "everyone's job". Everyone thinks someone else is watching. Nobody is.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Brand consistency needs <span class="text-white">one custodian</span> — a person with an explicit mandate "this is my job". Without that, every individual decision drifts, compounds over 18 months, and the brand looks like it went through a rebrand that never happened.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">What changes when you fix this</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        I don't promise revolution. I promise boring excellence:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>80%+ briefs ready first round (instead of 30%).</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Approval cycles 3× faster (from 14 days to 3-5 days).</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Weekly publishing rhythm (instead of "when it's ready").</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Brand consistency across locations without QA gymnastics.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Marketing team stops firefighting and starts planning.</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        None of this requires a better designer. All of it requires a better system.
      </p>

      <div class="my-16 bg-neutral-900/50 p-8 md:p-12 border border-white/5 relative overflow-hidden">
        <div class="absolute top-0 right-0 p-4 opacity-10 font-display text-9xl leading-none text-[#D4FF00] pointer-events-none select-none">SYSTEM</div>
        <h3 class="relative z-10 font-display text-white text-2xl uppercase tracking-widest mb-8">We do this through an 8-step framework</h3>
        <p class="relative z-10 text-neutral-400 text-base mb-4">
          At r352 we codified these 5 patterns into a sequential framework — we call it r3loop. Nothing radical, each of the 8 steps addresses a specific operational trap in the right order.
        </p>
        <p class="relative z-10 text-neutral-400 text-base">
          If you're curious about the detail — full breakdown at <a href="/process" class="text-[#D4FF00] hover:text-white transition-colors border-b border-[#D4FF00]/40">/process</a>. But more important than the framework is the fact that these 5 patterns exist in 90% of multi-location organizations. Recognize them first. Then decide how to solve them.
        </p>
      </div>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">How to tell if you have<br/>a "design problem" or an operations problem</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Simpler than an audit:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Does swapping the designer solve the problem? If yes — design problem. If not — system problem.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Does the problem repeat across different projects? If yes — it's systemic, not individual.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Do "good" projects happen because of one person's heroics? If yes — you have heroics, not a system.</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        90% of "design problems" in multi-location organizations are operations problems. That's good news — operations problems are solvable. Design talent gaps are hard to close. Workflow gaps can be closed in 6-12 weeks.
      </p>

      <p class="font-display text-white text-2xl uppercase tracking-wider my-8">
        Diagnose first. Decide second. Not the other way around.
      </p>

      <hr class="my-16 border-white/10" />

      <div class="bg-neutral-900 border border-white/5 p-8 md:p-12 text-center">
         <p class="text-lg text-neutral-400 max-w-2xl mx-auto mb-4">
            If you recognize any of these 5 patterns in your team — you probably don't need a better designer.
         </p>
         <p class="font-display text-[#D4FF00] text-4xl md:text-5xl uppercase tracking-tighter leading-none">
            You need a better<br/>system.
         </p>
      </div>
`},{id:8,title:"What we refuse<br/>to ship",title_pl:"Czego nie<br/>dostarczymy",date:"June 2026",category:"Standards",image:Ui,content_pl:`
      <p class="mb-6 text-xl leading-relaxed text-neutral-300">
        Większość agencji designerskich definiuje się przez to, co potrafi zrobić. <span class="text-white font-medium">My definiujemy się przez to, czego nie zrobimy.</span>
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Standard nie jest cechą wykonania. Standard jest filtrem — granicą oddzielającą pracę, którą warto wypuścić, od pracy, która istnieje tylko po to, żeby ktoś zaznaczył zadanie jako "done". Im więcej rzeczy odrzucisz, tym mocniejszy jest output.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Po piętnastu latach pracy z markami wielo-lokalizacyjnymi mamy własną listę. Sześć rzeczy, których po prostu <span class="text-white border-b border-[#D4FF00]/50">nie dostarczamy</span>, bez względu na presję, deadline ani prośbę klienta. Każda odmowa ma swój powód operacyjny.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">01 — Briefów bez ownership decyzji</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Sygnał: "Mamy 5 osób zaangażowanych w ten projekt. Wszystkie muszą zaakceptować."
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Brief bez jasnego decision-owner-a to nie brief — to negocjacja. Pięć osób z prawem veta to gwarancja pięciu rund, każda z innym kierunkiem. Wynik: produkcja staje, czas idzie do tyłu, marka tracker drift'uje.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Przed startem każdego workstreamu wymagamy jednej rzeczy: <span class="text-white">imię i nazwisko osoby, która powie tak/nie</span>. Reszta — input, nie veto. Bez tego nie zaczynamy. Klient czasem walczy. Po pierwszej dostawie zawsze rozumie.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">02 — Estetyki bez kontekstu operacyjnego</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Sygnał: "Zróbcie nam coś świeżego, oryginalnego, takiego wow."
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Brief skupiony tylko na efekcie wizualnym, bez konkretu o kanale, lokalizacji, integracji z systemem brandu, kapitale produkcyjnym — to recepta na "ładne ale nieużyteczne". Designer może zrobić piękny layout, który załamuje się przy pierwszym tłumaczeniu na inny format.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Każdy projekt zaczyna się od kontekstu: kanał, audience, ograniczenia, integracja z istniejącym systemem. <span class="text-white">Estetyka to ostatnia warstwa</span>, nie pierwsza.
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Kanały: dokładna lista, nie "social media".</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Format constraints: real specs, nie "responsywne".</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Integration: jakie templates istnieją, czego nie wolno ruszać.</span></li>
      </ul>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">03 — Dostaw bez QA</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Sygnał: "Pilne, możecie wysłać dziś o 16?"
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Praca bez kontroli jakości to nie praca — to nadzieja. Każdy plik, który wychodzi, przechodzi przez 5-7 punktową checklistę: spec compliance, brand consistency, copywriting, technical export, accessibility, naming convention, version control.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Jeśli QA pokazuje issue — wracamy do produkcji. Zawsze. <span class="text-white">"Wyślemy i poprawimy później"</span> to słowa, które kosztowały już zbyt wiele marek. Nie poprawisz później. Wersja, która zostaje w obiegu, zostaje na dobre.
      </p>

      <div class="my-16 border-l-2 border-[#D4FF00] pl-6 md:pl-8">
        <h3 class="font-display text-[#D4FF00] text-3xl md:text-5xl uppercase tracking-tighter leading-[0.9]">
          Standard to filtr,<br/>nie aspiracja.<br/>Co odrzucisz, tym jesteś.
        </h3>
      </div>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">04 — Rewizji "tylko trochę"</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Sygnał: "Możecie zmienić to jedno małe drobiazgu? Tylko ten kolor."
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Małe rewizje nie istnieją. Każda zmiana po sign-off oznacza: reopen pliku, reload context, nowy QA pass, nowy export, nowy version control, nowa dystrybucja. Sumarycznie 40-90 minut roboty per "drobiazg".
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Mamy zasadę: po sign-off zmiany kosztują. Nie żeby zarabiać — żeby <span class="text-white">cena była sygnałem</span>. Klient zaczyna myśleć przed prośbą. Liczba post-sign-off rewizji spada o 80% w pierwszych trzech miesiącach współpracy.
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Sign-off jest finalny. Co się zmienia po nim, idzie do nowego scope.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>3 rundy rewizji w produkcji = wystarczy. Czwarta = problem briefu, nie wykonania.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Każda zmiana ma owner-a, deadline i dokumentowane uzasadnienie.</span></li>
      </ul>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">05 — Pracy bez integracji z systemem</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Sygnał: "Zróbcie nam jeden materiał, jednorazowy event, nie wiążemy z marką."
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Każda jednorazowa robota tworzy precedens. "Tylko ten jeden raz" za pół roku staje się punktem odniesienia: "robili nam już to nieortodoksyjne, teraz zrób podobnie". Marka drift'uje przez sumę "wyjątków".
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Pracujemy tylko nad rzeczami, które integrują się z systemem brand-u klienta. Albo wzmacniamy istniejący system, albo rozszerzamy go o nową gałąź (kanał, format, sub-brand). Nigdy nie robimy <span class="text-white">orphan-assets</span>.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">06 — Pracy w urgency mode jako defaultu</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Sygnał: "Wszystko jest pilne. Brak czasu na planowanie."
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Pilne jako default jest nieprzejrzysty sygnał: znak, że organizacja działa w trybie reaktywnym, nie proaktywnym. Pracujemy w stałej tygodniowej kadencji — briefy planowane 2 tygodnie z góry, output w piątek, retro w poniedziałek.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Jeden "pilny" sprint na kwartał akceptujemy — wymaga uzasadnienia i zgody na <span class="text-white">deprioritize innego workstreamu</span>. Cztery pilnych w kwartał — odmawiamy. Co znaczy: być może klient nie jest dla nas, albo my dla niego. Lepiej rozpoznać to wcześnie niż później.
      </p>

      <div class="my-16 p-8 md:p-12 bg-white/[0.025] dark:bg-white/[0.025]">
        <span class="block text-xs font-display uppercase tracking-[0.2em] text-[#D4FF00] mb-4">
          Połączenie z r3loop
        </span>
        <p class="text-lg md:text-xl text-neutral-300 leading-relaxed">
          Każda z tych odmów ma swoje miejsce w naszej 8-krokowej metodologii r3loop. Standards nie są opinią — są częścią governance layer (krok 6), brief layer (krok 1) i QA layer (krok 7). Klient, który chce z nami pracować, kupuje system, który te standardy egzekwuje.
        </p>
      </div>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Co odrzucenie kupuje</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Każda "nie" buduje "tak". Im wyraźniej definiujemy granicę, tym łatwiej klientowi zrozumieć, czego mu dostarczamy. Standards nie zmniejszają zakresu — zwiększają wartość pracy w obrębie granic.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Klient, który zaakceptuje te sześć odmów, dostaje partnera. Klient, który ich nie zaakceptuje, dostaje <span class="text-white">trafniejszą agencję dla swojego stylu pracy</span> — i nie traci kwartału na konflikt operacyjny.
      </p>

      <hr class="my-16 border-white/10" />

      <div class="bg-[#D4FF00] p-8 md:p-12 text-black">
        <h3 class="font-display text-4xl md:text-6xl uppercase tracking-tighter leading-none mb-6">
          Standards bronią<br/>jakości.<br/>"Tak" wszystkiemu<br/>jej nie buduje.
        </h3>
        <p class="text-lg font-medium max-w-2xl opacity-80">
          Jeśli pracujesz w multi-location organizacji, gdzie chaos operacyjny zżera energię — system, który mówi "nie" w odpowiednich momentach, kosztuje mniej niż wieczna fala rewizji.
        </p>
      </div>
    `,content:`
      <p class="mb-6 text-xl leading-relaxed text-neutral-300">
        Most design agencies define themselves by what they can do. <span class="text-white font-medium">We define ourselves by what we won't.</span>
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Standards aren't a feature of execution. They're a filter — the boundary between work worth shipping and work that exists only to mark a task as "done." The more you refuse, the stronger the output.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        After fifteen years of working with multi-location brands, we have our own list. Six things we simply <span class="text-white border-b border-[#D4FF00]/50">don't deliver</span>, regardless of pressure, deadline, or client request. Each refusal has an operational reason.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">01 — Briefs without decision ownership</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Signal: "We have 5 people involved in this project. All must approve."
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        A brief without a clear decision-owner isn't a brief — it's a negotiation. Five people with veto rights guarantees five rounds, each pulling in a different direction. Result: production stalls, time slips, brand tracker drifts.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Before starting any workstream, we require one thing: <span class="text-white">the name of the person who says yes or no</span>. Everyone else — input, not veto. Without it, we don't start. Clients sometimes push back. After the first delivery, they always understand.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">02 — Aesthetics without operational context</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Signal: "Make us something fresh, original, with wow factor."
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        A brief focused only on visual effect, without specifics about channel, location, brand system integration, or production capital — is a recipe for "beautiful but useless." A designer can make a stunning layout that breaks the first time it's translated to another format.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Every project starts with context: channel, audience, constraints, integration with the existing system. <span class="text-white">Aesthetics are the last layer</span>, not the first.
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Channels: exact list, not "social media."</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Format constraints: real specs, not "responsive."</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Integration: what templates exist, what cannot be touched.</span></li>
      </ul>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">03 — Deliveries without QA</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Signal: "Urgent, can you send it today at 4pm?"
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Work without quality control isn't work — it's hope. Every file that leaves goes through a 5-7 point checklist: spec compliance, brand consistency, copywriting, technical export, accessibility, naming convention, version control.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        If QA shows an issue — we return to production. Always. <span class="text-white">"We'll ship and fix later"</span> are words that have cost too many brands. You won't fix it later. The version that goes into circulation stays for good.
      </p>

      <div class="my-16 border-l-2 border-[#D4FF00] pl-6 md:pl-8">
        <h3 class="font-display text-[#D4FF00] text-3xl md:text-5xl uppercase tracking-tighter leading-[0.9]">
          Standards are filters,<br/>not aspirations.<br/>What you refuse is what you are.
        </h3>
      </div>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">04 — Revisions "just a little"</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Signal: "Can you change just one tiny detail? Just this color."
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Small revisions don't exist. Every change after sign-off means: reopen file, reload context, new QA pass, new export, new version control, new distribution. Aggregate 40-90 minutes per "tiny thing."
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        We have a rule: after sign-off, changes cost. Not to earn — to make <span class="text-white">price a signal</span>. Client starts thinking before requesting. The number of post-sign-off revisions drops 80% in the first three months of partnership.
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Sign-off is final. What changes after goes into new scope.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>3 rounds of revision in production = enough. Fourth = brief problem, not execution.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Every change has an owner, deadline, and documented rationale.</span></li>
      </ul>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">05 — Work without system integration</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Signal: "Just make us one piece, one-off event, not tied to the brand."
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Every one-off creates a precedent. "Just this once" becomes a reference point six months later: "you made us this unorthodox thing already, now do something similar." Brand drifts through the accumulation of "exceptions."
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        We only work on things that integrate with the client's brand system. Either we strengthen the existing system or expand it with a new branch (channel, format, sub-brand). We never make <span class="text-white">orphan assets</span>.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">06 — Work in urgency mode as default</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Signal: "Everything is urgent. No time for planning."
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Urgent as default is a transparent signal: the sign of an organization operating in reactive, not proactive mode. We work in a steady weekly cadence — briefs planned 2 weeks ahead, output on Friday, retro on Monday.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        One "urgent" sprint per quarter we accept — requires justification and agreement to <span class="text-white">deprioritize another workstream</span>. Four urgent ones per quarter — we refuse. Which means: maybe the client isn't right for us, or we for them. Better to recognize that early than later.
      </p>

      <div class="my-16 p-8 md:p-12 bg-white/[0.025] dark:bg-white/[0.025]">
        <span class="block text-xs font-display uppercase tracking-[0.2em] text-[#D4FF00] mb-4">
          Connection to r3loop
        </span>
        <p class="text-lg md:text-xl text-neutral-300 leading-relaxed">
          Each of these refusals has its place in our 8-step methodology r3loop. Standards aren't opinion — they're part of the governance layer (step 6), brief layer (step 1), and QA layer (step 7). The client who wants to work with us is buying the system that enforces these standards.
        </p>
      </div>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">What refusal buys</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Every "no" builds a "yes." The more clearly we define the boundary, the easier it is for the client to understand what we deliver. Standards don't reduce scope — they increase the value of work within the boundary.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        A client who accepts these six refusals gets a partner. A client who doesn't accept them gets <span class="text-white">a more suitable agency for their work style</span> — and doesn't lose a quarter to operational conflict.
      </p>

      <hr class="my-16 border-white/10" />

      <div class="bg-[#D4FF00] p-8 md:p-12 text-black">
        <h3 class="font-display text-4xl md:text-6xl uppercase tracking-tighter leading-none mb-6">
          Standards defend<br/>quality.<br/>Saying "yes" to everything<br/>doesn't build it.
        </h3>
        <p class="text-lg font-medium max-w-2xl opacity-80">
          If you work in a multi-location organization where operational chaos eats energy — a system that says "no" at the right moments costs less than an endless wave of revisions.
        </p>
      </div>
    `},{id:4,title:"Calm Execution:<br/>Remote Work<br/>Without Chaos",title_pl:"Spokojna Realizacja:<br/>Praca Zdalna<br/>Bez Chaosu",date:"Feb 2026",category:"Operating Model",image:Bi,content_pl:`
      <p class="mb-6 text-xl leading-relaxed text-neutral-300">
        Praca zdalna nie jest problemem. <span class="text-white font-medium border-b border-[#D4FF00]/50">Brak struktury jest.</span>
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Pracowałem zdalnie przez lata w różnych krajach. Różni klienci, różne strefy czasowe, różne poziomy chaosu. Zawsze jednak pojawia się ten sam wzorzec: gdy dostarczanie się komplikuje, ludzie obwiniają o to "pracę zdalną".
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Ale rzeczywisty problem jest prostszy: prace trafiają do zespołu w nieustrukturyzowany sposób, decyzje nie mają właścicieli, a feedback nie ma reguł. Praca zdalna po prostu nie pozwala tego ukryć.
      </p>

      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Dbam o dwie rzeczy w tym setup:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-center gap-3"><span class="text-[#D4FF00] text-xs">●</span> <span>wysokiej jakości output</span></li>
        <li class="flex items-center gap-3"><span class="text-[#D4FF00] text-xs">●</span> <span>szybkie, spokojne dostarczanie, które nie pochłania ci życia</span></li>
      </ul>

      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Ta kombinacja nie jest cechą osobowości. <span class="text-white">To jest system.</span>
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Praca zdalna nie potrzebuje więcej spotkań.<br/>Potrzebuje mniej niewiadomych.</h2>

      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Większość zespołów próbuje rozwiązać tarcia związane z pracą zdalną poprzez więcej rozmów. Więcej synchronizacji. Więcej statusów. Więcej "szybkich check-inów".
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Wydaje się to odpowiedzialne, ale zwykle oznacza jedną rzecz: nie masz systemu decyzyjnego.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Wyrównanie nie chodzi o bycie razem na Zoom. Wyrównanie to sytuacja, gdy zespół może odpowiedzieć natychmiast:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>co dostarczamy?</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>dlaczego to ważne?</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>co oznacza "gotowe"?</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>kto mówi tak/nie?</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>gdzie jest źródło prawdy?</span></li>
      </ul>

      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Jeśli te odpowiedzi istnieją, praca zdalna staje się cicha i szybka. Jeśli ich nie ma, nawet najlepsi ludzie tonęli.
      </p>

      <div class="my-16 border-l-2 border-[#D4FF00] pl-6 md:pl-8">
        <h3 class="font-display text-[#D4FF00] text-3xl md:text-5xl uppercase tracking-tighter leading-[0.9]">
          Balans to przewidywalne obciążenie,<br/>nie wolny czas.
        </h3>
      </div>

      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Ludzie mówią o "work-life balance" jak o plakacie motywacyjnym.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        W rzeczywistym życiu - szczególnie gdy budujesz coś poważnego i masz rodzinę - balans pochodzi z przewidywalności:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>wiesz, kiedy następuje deep work</span></li>
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>wiesz, kiedy następuje koordynacja</span></li>
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>wiesz, kiedy prace się dostarczają</span></li>
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>wiesz, kiedy nie pracujesz</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Praca zdalna bez struktury to coś przeciwnego: wszystko jest zawsze lekko włączone. To nie jest zrównoważone. I zabija jakość.
      </p>
      <p class="font-display text-white text-2xl uppercase tracking-wider my-8">Spokojna realizacja nie jest wolniejsza. Jest mniej chaotyczna.</p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Rzeczywistym wrogiem zespołów zdalnych<br/>są otwarte pętle</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Otwarte pętle to ukryty podatek nowoczesnej pracy:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>briefs, które nie definiują sukcesu</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>prośby wrzucane do DM</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>feedback, który to tylko uczucie</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>decyzje podjęte w prywatnych wątkach</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>pliki rozrzucone po narzędziach</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>"ostateczne" które nigdy nie staje się ostateczne</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        To nie tylko cię spowalnia. To drażni uwagę. Jeśli chcesz szybkości bez wypalenia, twoja praca jest prosta: zamykaj pętle wcześnie, na wszelki wypadek, za każdym razem.
      </p>

      <div class="my-16 bg-neutral-900/50 p-8 md:p-12 border border-white/5 relative overflow-hidden">
        <div class="absolute top-0 right-0 p-4 opacity-10 font-display text-9xl leading-none text-[#D4FF00] pointer-events-none select-none">REMOTE</div>
        <h3 class="relative z-10 font-display text-white text-2xl uppercase tracking-widest mb-8">Model operacyjny pracy zdalnej, który faktycznie działa</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
            <div class="bg-black/40 p-5 border-l-2 border-[#D4FF00]">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">01. Jedna ścieżka wpływu</strong>
                <p class="text-neutral-400 text-sm">Prośby nie przychodzą wszędzie. Jeden punkt wejścia. Zawsze.</p>
            </div>
            <div class="bg-black/40 p-5 border-l-2 border-neutral-700 hover:border-[#D4FF00] transition-colors">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">02. Rzeczywisty standard brief</strong>
                <p class="text-neutral-400 text-sm">Nie formularz. Użyteczny input: cel, odbiorcy, ograniczenia, przykłady, definicja gotowości.</p>
            </div>
            <div class="bg-black/40 p-5 border-l-2 border-neutral-700 hover:border-[#D4FF00] transition-colors">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">03. Właściciel decyzji</strong>
                <p class="text-neutral-400 text-sm">Jedna osoba, która może zaaprobować. Jeśli nikt nie jest właścicielem decyzji, dostajesz nieskończoną feedback.</p>
            </div>
            <div class="bg-black/40 p-5 border-l-2 border-neutral-700 hover:border-[#D4FF00] transition-colors">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">04. Okna feedback</strong>
                <p class="text-neutral-400 text-sm">Feedback to zaplanowane wydarzenie, nie ciągły strumień. Format i kryteria mają znaczenie.</p>
            </div>
            <div class="bg-black/40 p-5 border-l-2 border-neutral-700 hover:border-[#D4FF00] transition-colors">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">05. Standard pakowania</strong>
                <p class="text-neutral-400 text-sm">Każde dostarczenie wygląda tak samo: pliki, nazewnictwo, warianty, specyfikacje - gotowe do publikacji.</p>
            </div>
            <div class="bg-black/40 p-5 border-l-2 border-[#D4FF00]">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">06. Kadencja wysyłki</strong>
                <p class="text-neutral-400 text-sm">Tygodniowy rytm pokonuje heroiczne wysiłki. Jeśli wszystko jest "ASAP", nic nie jest.</p>
            </div>
        </div>
      </div>

      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        To różnica między byciem "zajętym" a faktycznie dostarczaniem.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Responsywność to nie<br/>bycie online 24/7</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        To jest ważne. Responsywność to zdolność, nie styl życia.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Dla mnie responsywność oznacza:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>wyjaśnij prośbę szybko</span></li>
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>usuń niepewność szybko</span></li>
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>dostarcz następny użyteczny krok szybko</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Możesz to zrobić bez bycia dostępnym całý dzień - jeśli twój workflow jest do tego zbudowany. Jeśli twój workflow nie jest do tego zbudowany, możesz być online 12 godzin i wciąż być wolny.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Jakość to nie gust.<br/>To jest standard.</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        W setupach zdalnych jakość dryftuje, chyba że aktywnie to zapobiegasz. Rozwiązaniem nie jest "zatrudniaj lepszych ludzi". Rozwiązaniem są standardy, które się przenoszą:
      </p>
       <div class="flex flex-wrap gap-3 mb-10">
          <span class="px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-300">Templates</span>
          <span class="px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-300">Component Libraries</span>
          <span class="px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-300">Checklists</span>
          <span class="px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-300">QA Gates</span>
          <span class="px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-300">Flexible vs Fixed Rules</span>
       </div>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        To też jest to, jak praca "się starzeje dobrze". Nie poprzez bycie modnym - poprzez bycie spójnym i konserwowanym.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Co robię najpierw, gdy dołączam do zespołu zdalnego</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Nie zaczynam w Figma. Zaczynam od pięciu pytań:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>gdzie wchodzą prośby?</span></li>
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>kto decyduje?</span></li>
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>co oznacza "gotowe"?</span></li>
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>jak wygląda "gotowe do publikacji" tutaj?</span></li>
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>jaką kadencję możemy utrzymać bez stresu?</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Raz te pytania zostają udzielone, wszystko staje się lżejsze: mniej spotkań, mniej rewizji, szybsze zatwierdzenia, czystsze handoffs, wyższa spójność.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        I paradoksalnie - więcej kreatywnej energii, bo nie wydajesz jej na koordynację.
      </p>

      <hr class="my-16 border-white/10" />

      <div class="bg-neutral-900 border border-white/5 p-8 md:p-12 text-center">
         <p class="font-display text-white text-3xl uppercase tracking-widest mb-4">Praca zdalna może być spokojna.</p>
         <p class="font-display text-[#D4FF00] text-4xl md:text-5xl uppercase tracking-tighter leading-none mb-8">Ale spokój jest inżynierowany.</p>
         <p class="text-lg text-neutral-400 max-w-2xl mx-auto">
            Jeśli chcesz premium output z szybkim dostarczaniem, przestań próbować "zarządzać zdalnie". Zbuduj model operacyjny, który sprawia, że jakość i szybkość są przewidywalne.
         </p>
      </div>
`,content:`
      <p class="mb-6 text-xl leading-relaxed text-neutral-300">
        Remote work isn’t the problem. <span class="text-white font-medium border-b border-[#D4FF00]/50">Lack of structure is.</span>
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        I’ve worked remote across countries for years. Different clients, different time zones, different levels of chaos. And the pattern is always the same: when delivery gets messy, people blame “remote”.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        But the real issue is simpler: work enters the team in an unstructured way, decisions don’t have owners, and feedback has no rules. Remote just makes that impossible to hide.
      </p>

      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        I care about two things in this setup:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-center gap-3"><span class="text-[#D4FF00] text-xs">●</span> <span>high quality output</span></li>
        <li class="flex items-center gap-3"><span class="text-[#D4FF00] text-xs">●</span> <span>fast, calm delivery that doesn’t eat your life</span></li>
      </ul>

      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        That combination is not a personality trait. <span class="text-white">It’s a system.</span>
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Remote doesn’t need more meetings.<br/>It needs fewer unknowns.</h2>

      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Most teams try to solve remote friction with more calls. More syncing. More status. More “quick check-ins”.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        It feels responsible, but it usually means one thing: you don’t have a decision system.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Alignment isn’t about being on Zoom together. Alignment is when the team can answer, instantly:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>what are we shipping?</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>why does it matter?</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>what does “done” mean?</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>who says yes/no?</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>where is the source of truth?</span></li>
      </ul>

      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        If those answers exist, remote becomes quiet and fast. If they don’t, even the best people drown.
      </p>

      <div class="my-16 border-l-2 border-[#D4FF00] pl-6 md:pl-8">
        <h3 class="font-display text-[#D4FF00] text-3xl md:text-5xl uppercase tracking-tighter leading-[0.9]">
          Balance is predictable load,<br/>not free time.
        </h3>
      </div>

      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        People talk about “work-life balance” like it’s a motivational poster.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        In real life - especially when you’re building something serious and you have a family - balance comes from predictability:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>you know when deep work happens</span></li>
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>you know when coordination happens</span></li>
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>you know when work ships</span></li>
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>you know when you’re off</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Remote without structure is the opposite: everything is always slightly on. That’s not sustainable. And it kills quality.
      </p>
      <p class="font-display text-white text-2xl uppercase tracking-wider my-8">Calm execution is not slower. It’s less chaotic.</p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">The real enemy of remote teams<br/>is open loops</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Open loops are the hidden tax of modern work:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>briefs that don’t define success</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>requests dropped into DMs</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>feedback that’s just a feeling</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>decisions made in private threads</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>files scattered across tools</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>“final” that never becomes final</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        This doesn’t just slow you down. It drains attention. If you want speed without burnout, your job is simple: close loops early, on purpose, every time.
      </p>

      <div class="my-16 bg-neutral-900/50 p-8 md:p-12 border border-white/5 relative overflow-hidden">
        <div class="absolute top-0 right-0 p-4 opacity-10 font-display text-9xl leading-none text-[#D4FF00] pointer-events-none select-none">REMOTE</div>
        <h3 class="relative z-10 font-display text-white text-2xl uppercase tracking-widest mb-8">The remote operating model that actually works</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
            <div class="bg-black/40 p-5 border-l-2 border-[#D4FF00]">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">01. One Intake Path</strong>
                <p class="text-neutral-400 text-sm">Requests don’t arrive everywhere. One entry point. Always.</p>
            </div>
            <div class="bg-black/40 p-5 border-l-2 border-neutral-700 hover:border-[#D4FF00] transition-colors">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">02. A Real Brief Standard</strong>
                <p class="text-neutral-400 text-sm">Not a form. A usable input: goal, audience, constraints, examples, definition of done.</p>
            </div>
            <div class="bg-black/40 p-5 border-l-2 border-neutral-700 hover:border-[#D4FF00] transition-colors">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">03. A Decision Owner</strong>
                <p class="text-neutral-400 text-sm">One person who can approve. If nobody owns the decision, you get infinite feedback.</p>
            </div>
            <div class="bg-black/40 p-5 border-l-2 border-neutral-700 hover:border-[#D4FF00] transition-colors">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">04. Feedback Windows</strong>
                <p class="text-neutral-400 text-sm">Feedback is a scheduled event, not a constant stream. Format + criteria matter.</p>
            </div>
            <div class="bg-black/40 p-5 border-l-2 border-neutral-700 hover:border-[#D4FF00] transition-colors">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">05. A Packaging Standard</strong>
                <p class="text-neutral-400 text-sm">Every delivery looks the same: files, naming, variants, specs - ready to publish.</p>
            </div>
            <div class="bg-black/40 p-5 border-l-2 border-[#D4FF00]">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">06. A Shipping Cadence</strong>
                <p class="text-neutral-400 text-sm">Weekly rhythm beats heroic bursts. If everything is “ASAP”, nothing is.</p>
            </div>
        </div>
      </div>

      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        That’s the difference between being “busy” and actually shipping.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Responsiveness is not<br/>being online 24/7</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        This is important. Responsiveness is a capability, not a lifestyle.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        For me, responsiveness means:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>clarify the request fast</span></li>
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>remove uncertainty fast</span></li>
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>deliver the next usable step fast</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        You can do that without being available all day - if your workflow is built for it. If your workflow is not built for it, you can be online 12 hours and still be slow.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Quality is not taste.<br/>It’s a standard.</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        In remote setups, quality drifts unless you actively prevent it. The fix isn’t “hire better people”. The fix is standards that travel:
      </p>
       <div class="flex flex-wrap gap-3 mb-10">
          <span class="px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-300">Templates</span>
          <span class="px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-300">Component Libraries</span>
          <span class="px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-300">Checklists</span>
          <span class="px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-300">QA Gates</span>
          <span class="px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-300">Flexible vs Fixed Rules</span>
       </div>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        This is also how work “ages well”. Not by being trendy - by being coherent and maintainable.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">What I do first when I join a remote team</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        I don’t start in Figma. I start with five questions:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>where do requests enter?</span></li>
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>who decides?</span></li>
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>what does “done” mean?</span></li>
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>what does “publish-ready” look like here?</span></li>
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>what cadence can we sustain without stress?</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Once those are answered, everything gets lighter: fewer meetings, fewer revisions, faster approvals, cleaner handoffs, higher consistency.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        And ironically - more creative energy, because you’re not spending it on coordination.
      </p>

      <hr class="my-16 border-white/10" />

      <div class="bg-neutral-900 border border-white/5 p-8 md:p-12 text-center">
         <p class="font-display text-white text-3xl uppercase tracking-widest mb-4">Remote can be calm.</p>
         <p class="font-display text-[#D4FF00] text-4xl md:text-5xl uppercase tracking-tighter leading-none mb-8">But calm is engineered.</p>
         <p class="text-lg text-neutral-400 max-w-2xl mx-auto">
            If you want premium output with fast delivery, stop trying to “manage remote”. Build the operating model that makes quality and speed predictable.
         </p>
      </div>
    `},{id:5,title:"The Cadence<br/>Advantage:<br/>Rhythm is Speed",title_pl:"Przewaga Kadencji:<br/>Rytm to Szybkość",date:"Mar 2026",category:"Process",image:Li,content_pl:`
      <p class="mb-6 text-xl leading-relaxed text-neutral-300">
        Oto prosta obserwacja z ostatnich kilku lat pracy zdalnej - między krajami, między klientami, między różnymi team setupami.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Większość firm nie ma problemu z talentami. <span class="text-white font-medium">Mają problem z rytmem.</span>
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Jeden tydzień spokojnie. Potem nagle wszystko to "ASAP".
        Raz jest miejsce do myślenia, następnie Slack kieruje dniem.
        W tym trybie nie możesz utrzymać wysokiej jakości, nie możesz pozostać spokojny, i nie możesz być sensownie responsywny.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Przewaga nie jest "bycie szybkim". <span class="text-white border-b border-[#D4FF00]/50">Przewaga jest kadencja - stały rytm dostarczania.</span>
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Pilność wygląda jak szybkość.<br/>Kadencja to szybkość.</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        "ASAP" daje ludziom poczucie kontroli.
        W rzeczywistości "ASAP" to zwykle sygnał, że nie ma żadnego systemu.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Pilność tworzy ruch, nie postęp. Produkuje:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>ciągłe przełączanie kontekstu</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>decyzje podejmowane za późno</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>feedback bez kryteriów</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>ostateczne zmiany, które psują całość</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>"prawie gotowa" praca, która nigdy nie staje się gotowa do publikacji</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Kadencja robi coś odwrotnego. Normalizuje dostarczanie.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Gdy jest rytm, "pilne" wraca do tego, czym powinno być - wyjątkiem, a nie domyślnym trybem działania.
      </p>

      <div class="my-16 border-l-2 border-[#D4FF00] pl-6 md:pl-8">
        <h3 class="font-display text-[#D4FF00] text-3xl md:text-5xl uppercase tracking-tighter leading-[0.9]">
          Balans w pracy zdalnej<br/>to przewidywalne obciążenie
        </h3>
      </div>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Mam rodzinę, bloki deep work, i życie poza ekranem.
        Gdy praca jest przypadkowa, nawet mała lista zadań wydaje się cięższa niż duża.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Ponieważ twój mózg pozostaje w "trybie oczekiwania" - co się zmieni w następnej chwili?
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Przewidywalność to to, co tworzy balans:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>wiesz, kiedy dzieje się deep work</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>wiesz, kiedy dzieje się feedback</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>wiesz, kiedy podejmowane są decyzje</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>wiesz, kiedy rzeczy się wysyłają</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>wiesz, kiedy jesteś offline</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        To nie jest motywacyjna pogadanka. To przewaga operacyjna.
        Bez niej, jakość zaczyna się pękać i dostarczanie staje się nerwowe.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Cotygodniowe dostarczanie to najprostszy sposób<br/>aby jakość nie dryftowała</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Jakość nie spada, bo ludziom brakuje umiejętności.
        Spada, bo wszystko staje się ad hoc.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Ad hoc zabija standardy:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>każde dostarczenie wygląda inaczej</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>nazewnictwo i formaty dryftują</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>QA staje się "jeśli mamy czas"</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>handoff staje się "dodam to później"</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        I wtedy dostajesz klasyczny wynik: dużo pracy, ale output wygląda jakby przyszedł od pięciu różnych osób.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Cotygodniowy rytm zmusza do repetycji. Repetycja zmusza do systemu.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        I naturalnie zaczynasz budować:
      </p>
      <div class="flex flex-wrap gap-3 mb-10">
          <span class="px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-300">Templates</span>
          <span class="px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-300">Checklists</span>
          <span class="px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-300">Handoff Packs</span>
          <span class="px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-300">Components</span>
          <span class="px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-300">Quality Rules</span>
       </div>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        To wtedy "premium" przestaje być cechą osobowości i staje się standardem.
      </p>

      <div class="my-16 bg-neutral-900/50 p-8 md:p-12 border border-white/5 relative overflow-hidden">
        <div class="absolute top-0 right-0 p-4 opacity-10 font-display text-9xl leading-none text-[#D4FF00] pointer-events-none select-none">RHYTHM</div>
        <h3 class="relative z-10 font-display text-white text-2xl uppercase tracking-widest mb-8">Jak kadencja wygląda w praktyce</h3>
        <p class="relative z-10 text-neutral-400 text-sm mb-8">Nie musi być skomplikowane. Potrzebujesz tylko struktury.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
            <div class="bg-black/40 p-5 border-l-2 border-[#D4FF00]">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">01. Jedna Ścieżka Intake</strong>
                <p class="text-neutral-400 text-sm">Zgłoszenia nie przychodzą przez DM-y i losowe wątki. Jedno miejsce. Zawsze.</p>
            </div>
            <div class="bg-black/40 p-5 border-l-2 border-neutral-700 hover:border-[#D4FF00] transition-colors">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">02. Brief, który Ma Sens</strong>
                <p class="text-neutral-400 text-sm">Cel, audience, ograniczenia, przykłady, definicja done. Krótki, ale rzeczywisty.</p>
            </div>
            <div class="bg-black/40 p-5 border-l-2 border-neutral-700 hover:border-[#D4FF00] transition-colors">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">03. Właściciel Decyzji</strong>
                <p class="text-neutral-400 text-sm">Jedna osoba, która może powiedzieć tak/nie. Bez tego, feedback nigdy się nie kończy.</p>
            </div>
            <div class="bg-black/40 p-5 border-l-2 border-neutral-700 hover:border-[#D4FF00] transition-colors">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">04. Okna Feedbacku</strong>
                <p class="text-neutral-400 text-sm">Feedback nie kapie przez cały dzień. Dzieje się w slotach. W formacie. Z kryteriami.</p>
            </div>
            <div class="bg-black/40 p-5 border-l-2 border-neutral-700 hover:border-[#D4FF00] transition-colors">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">05. Standard Pakowania</strong>
                <p class="text-neutral-400 text-sm">Nie "gotowe w Figmie". Gotowe do publikacji: pliki, nazewnictwo, warianty, specyfikacje, notatki handoff.</p>
            </div>
            <div class="bg-black/40 p-5 border-l-2 border-[#D4FF00]">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">06. Cotygodniowy Rytm</strong>
                <p class="text-neutral-400 text-sm">Każdego tygodnia wysyłasz coś rzeczywistego. Nie "postęp". Output.</p>
            </div>
        </div>
        <p class="relative z-10 text-neutral-400 text-sm mt-8">To tyle. Wszystko inne to szczegóły.</p>
      </div>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Responsywność bez wypalenia</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Responsywność to nie siedzenie online przez 12 godzin.
        Responsywność to usunięcie niepewności z procesu - szybko.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Dla mnie responsywność oznacza:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>wyjaśnij zgłoszenie szybko</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>wyrównaj decyzje szybko</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>dostarcz następny użyteczny krok szybko</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Kadencja czyni to możliwym, ponieważ każdy wie, co jest następne i kiedy.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Bez rytmu, nawet najbar "responsywna" osoba zmienia się w support.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Spokojne wykonanie<br/>to rzeczywiste premium</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Teamy nie chcą tylko "szybko".
        Chcą szybko bez chaosu.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Chcą czuć:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>jakość jest chroniona</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>standardy pozostają spójne</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>dostarczanie jest przewidywalne</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>zatwierdzenia nie zamieniają się w dramat</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>nic nie zależy od paniki i heroizmu</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        To jest to, co kadencja Ci daje.
      </p>

      <p class="font-display text-white text-2xl uppercase tracking-wider my-8">
        Szybkość staje się nawykiem. Jakość staje się bazą. I system się utrzymuje - nawet gdy robi się pracowicie.
      </p>

      <hr class="my-16 border-white/10" />

      <div class="bg-neutral-900 border border-white/5 p-8 md:p-12 text-center">
         <p class="text-lg text-neutral-400 max-w-2xl mx-auto mb-4">
            Jeśli Twoje tygodnie wyglądają jak seria pożarów "ASAP", nie potrzebujesz większej presji. Potrzebujesz rytmu.
         </p>
         <p class="font-display text-[#D4FF00] text-4xl md:text-5xl uppercase tracking-tighter leading-none">
            Kadencja najpierw.<br/>Potem wszystko inne zaczyna działać.
         </p>
      </div>
`,content:`
      <p class="mb-6 text-xl leading-relaxed text-neutral-300">
        Here’s a simple observation from the last few years of working remotely - across countries, across clients, across different team setups.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Most companies don’t have a talent problem. <span class="text-white font-medium">They have a rhythm problem.</span>
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        One week it’s quiet. Then suddenly everything is “ASAP”.
        One moment there’s space to think, the next moment Slack is running the day.
        And in that mode you can’t keep quality high, you can’t stay calm, and you can’t be meaningfully responsive.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        The advantage isn’t “being fast”. <span class="text-white border-b border-[#D4FF00]/50">The advantage is cadence - a steady shipping rhythm.</span>
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Urgency looks like speed.<br/>Cadence is speed.</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        “ASAP” gives people a feeling of control.
        In reality, “ASAP” is usually a signal that there is no system.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Urgency creates motion, not progress. It produces:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>constant context switching</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>decisions made too late</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>feedback without criteria</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>last-minute changes that break the whole thing</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>“almost ready” work that never becomes publish-ready</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Cadence does the opposite. It normalizes shipping.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        When there’s a rhythm, “urgent” goes back to what it should be - an exception, not the default operating mode.
      </p>

      <div class="my-16 border-l-2 border-[#D4FF00] pl-6 md:pl-8">
        <h3 class="font-display text-[#D4FF00] text-3xl md:text-5xl uppercase tracking-tighter leading-[0.9]">
          Balance in remote work<br/>is predictable load
        </h3>
      </div>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        I have a family, deep work blocks, and a life outside the screen.
        When work is random, even a small task list feels heavier than a big one.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Because your brain stays in “waiting mode” - what’s going to drop next?
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Predictability is what creates balance:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>you know when deep work happens</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>you know when feedback happens</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>you know when decisions happen</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>you know when things ship</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>you know when you’re offline</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        This isn’t motivational talk. It’s operational advantage.
        Without it, quality starts to crack and delivery becomes nervous.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Weekly shipping is the simplest way<br/>to keep quality from drifting</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Quality doesn’t drop because people lack skill.
        It drops because everything becomes ad hoc.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Ad hoc kills standards:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>every delivery looks different</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>naming and formats drift</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>QA becomes “if we have time”</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>handoff becomes “I’ll add it later”</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        And then you get the classic outcome: a lot of work, but the output looks like it came from five different people.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        A weekly rhythm forces repetition. Repetition forces a system.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        And naturally you start building:
      </p>
      <div class="flex flex-wrap gap-3 mb-10">
          <span class="px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-300">Templates</span>
          <span class="px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-300">Checklists</span>
          <span class="px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-300">Handoff Packs</span>
          <span class="px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-300">Components</span>
          <span class="px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-300">Quality Rules</span>
       </div>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        That’s when “premium” stops being a personality trait and becomes a standard.
      </p>

      <div class="my-16 bg-neutral-900/50 p-8 md:p-12 border border-white/5 relative overflow-hidden">
        <div class="absolute top-0 right-0 p-4 opacity-10 font-display text-9xl leading-none text-[#D4FF00] pointer-events-none select-none">RHYTHM</div>
        <h3 class="relative z-10 font-display text-white text-2xl uppercase tracking-widest mb-8">What cadence looks like in practice</h3>
        <p class="relative z-10 text-neutral-400 text-sm mb-8">It doesn’t need to be complicated. You just need a backbone.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
            <div class="bg-black/40 p-5 border-l-2 border-[#D4FF00]">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">01. One Intake Path</strong>
                <p class="text-neutral-400 text-sm">Requests don’t arrive through DMs and random threads. One place. Always.</p>
            </div>
            <div class="bg-black/40 p-5 border-l-2 border-neutral-700 hover:border-[#D4FF00] transition-colors">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">02. A Brief That Makes Sense</strong>
                <p class="text-neutral-400 text-sm">Goal, audience, constraints, examples, definition of done. Short, but real.</p>
            </div>
            <div class="bg-black/40 p-5 border-l-2 border-neutral-700 hover:border-[#D4FF00] transition-colors">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">03. A Decision Owner</strong>
                <p class="text-neutral-400 text-sm">One person who can say yes/no. Without this, feedback never ends.</p>
            </div>
            <div class="bg-black/40 p-5 border-l-2 border-neutral-700 hover:border-[#D4FF00] transition-colors">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">04. Feedback Windows</strong>
                <p class="text-neutral-400 text-sm">Feedback doesn’t drip all day. It happens in slots. In a format. With criteria.</p>
            </div>
            <div class="bg-black/40 p-5 border-l-2 border-neutral-700 hover:border-[#D4FF00] transition-colors">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">05. A Packaging Standard</strong>
                <p class="text-neutral-400 text-sm">Not “done in Figma”. Publish-ready: files, naming, variants, specs, handoff notes.</p>
            </div>
            <div class="bg-black/40 p-5 border-l-2 border-[#D4FF00]">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">06. Weekly Rhythm</strong>
                <p class="text-neutral-400 text-sm">Every week you ship something real. Not “progress”. Output.</p>
            </div>
        </div>
        <p class="relative z-10 text-neutral-400 text-sm mt-8">That’s it. Everything else is detail.</p>
      </div>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Responsiveness without burnout</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Responsiveness isn’t sitting online for 12 hours.
        Responsiveness is removing uncertainty from the process - fast.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        For me, responsiveness means:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>clarify the request fast</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>align decisions fast</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>deliver the next usable step fast</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Cadence makes this possible because everyone knows what’s next and when.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Without rhythm, even the most “responsive” person turns into support.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Calm execution<br/>is the real premium</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Teams don’t only want “fast”.
        They want fast without chaos.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        They want to feel:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>quality is protected</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>standards stay consistent</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>delivery is predictable</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>approvals don’t turn into drama</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>nothing depends on panic and heroics</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        That’s what cadence gives you.
      </p>

      <p class="font-display text-white text-2xl uppercase tracking-wider my-8">
        Speed becomes a habit. Quality becomes the baseline. And the system holds - even when things get busy.
      </p>

      <hr class="my-16 border-white/10" />

      <div class="bg-neutral-900 border border-white/5 p-8 md:p-12 text-center">
         <p class="text-lg text-neutral-400 max-w-2xl mx-auto mb-4">
            If your weeks feel like a series of “ASAP” fires, you don’t need more pressure. You need rhythm.
         </p>
         <p class="font-display text-[#D4FF00] text-4xl md:text-5xl uppercase tracking-tighter leading-none">
            Cadence first.<br/>Then everything else starts working.
         </p>
      </div>
    `},{id:7,title:"Brand at 250 locations:<br/>visual systems<br/>that don't drift",title_pl:"Marka w 250 lokalizacjach:<br/>systemy wizualne,<br/>które nie dryfują",date:"June 2026",category:"Brand Operations",image:Ki,content_pl:`
      <p class="mb-6 text-xl leading-relaxed text-neutral-300">
        Sieć fitness 300 klubów. Sieć hearing-care 250 lokacji w Europie. Sieć retail 80 sklepów w Polsce. Wszystkie mają jeden problem: <span class="text-white font-medium">brand który był piękny na launch, po roku wygląda inaczej w każdej lokalizacji.</span>
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        To nie problem talentu lokalnego marketing-managera. To problem braku systemu, który chroni markę kiedy nikt nie patrzy.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Drift jest cichy. Jedno odchylenie kolorystyczne tu, jedna inna czcionka tam, jeden niespecyfikowany layout, jedna zaakceptowana "wyjątkowa kampania". Po osiemnastu miesiącach <span class="text-white border-b border-[#D4FF00]/50">marka wygląda jak po rebrandzie, którego nie było</span>.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Pięć sposobów na drift</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Po dekadzie pracy z multi-location markami widzimy te same wzorce. Drift wchodzi przez pięć drzwi:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span><span class="text-white">Kolor</span> — profil monitora w lokacji A vs druk w lokacji B vs filtr Instagram social media-manager-a w lokacji C.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span><span class="text-white">Typografia</span> — local team nie ma dostępu do font-a, używa "najbliższego" zamiast tego.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span><span class="text-white">Layout</span> — brak template'u, marketing-manager improvizuje pod konkretną kampanię.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span><span class="text-white">Tone</span> — copy pisane lokalnie bez sprawdzania pod brand voice.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span><span class="text-white">Logo</span> — resized, rekolorowane, re-positioned "tylko ten jeden raz."</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Każda z tych decyzji jest mała. Łącznie tworzą podstawową siłę erozji, która rozkłada markę przez kwartały.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Dlaczego brand book nie wystarcza</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Najczęstszy odruch: "Mamy brand book PDF. Wystarczy wymóc, żeby ludzie go używali."
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Brand book to dokumentacja. Multi-location organizacja potrzebuje <span class="text-white">operatywnego systemu</span>. PDF mówi "nasz kolor to #D4FF00". Local marketing-manager pyta: "OK, ale jak zrobić ad pod ten lokalny event w 1080×1080 dla Instagrama?". PDF nie odpowiada. PDF zostaje zamknięty. Lokalna improwizacja zaczyna się.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Brand book opisuje, co marka jest. System operacyjny robi, żeby marka <span class="text-white">była egzekwowana w każdej decyzji codziennie</span> — bez pytania, bez interpretacji, bez energii kreatywnej local-team-a.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Architektura: 3 warstwy</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Brand operations w 250-lokacyjnej organizacji wymaga trzech zazębionych warstw. Każda nakłada różne ograniczenia. Razem dają system, który skaluje się bez drift-u.
      </p>

      <h3 class="text-2xl font-medium text-white mt-12 mb-4">Warstwa 1 — Strategy: 3-5 nienegocjowalnych decyzji</h3>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Większość brand books ma 60 stron. Local team przeczyta 5. Z tych 5 zapamięta 2. Z tych 2 zastosuje 1 dla pewności.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Strategy layer musi się zredukować do <span class="text-white">3-5 absolutnych nienegocjowalnych</span> — decyzji, które są ważniejsze niż każde indywidualne kreatywne preferowanie:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Tone of voice — jedna linijka, którą każdy może zacytować.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Color boundary — 3 kolory bazowe (nie 30 wariacji).</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Logo placement absolute — jedna konkretna zasada (np. "logo zawsze w lewym górnym narożniku, minimum 32px wolne miejsce wokół").</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Photography direction — jeden test do zastosowania (np. "naturalne światło, ludzie w ruchu, no studio").</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Tagline pattern — formuła, którą lokalny team może wypełnić, nie wymyślić.</span></li>
      </ul>

      <h3 class="text-2xl font-medium text-white mt-12 mb-4">Warstwa 2 — Templates: zero blank canvas</h3>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Local marketing-manager nigdy nie powinien zaczynać od pustej strony. Każdy format, którego organizacja używa, musi mieć template — gotowy, zatwierdzony, blokujący zmiany strukturalne.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Template to nie "inspiracja". Template to <span class="text-white">decyzje zaszyte w pliku</span>. Designer widzi w Figma library: "ad-social-1080×1080-v3". Otwiera, podmienia tekst, eksportuje. Czas od briefu do publikacji — 12 minut zamiast 90.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Kluczowe templates dla multi-location:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Social ad (per platform + format).</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Print (poster + flyer + outdoor banner).</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Digital ad (display + video + email).</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>In-location signage (window + interior + counter).</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Internal — schedule, certificate, employee comms.</span></li>
      </ul>

      <h3 class="text-2xl font-medium text-white mt-12 mb-4">Warstwa 3 — Governance: jeden custodian</h3>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Brand bez ownera dryfuje. Komitet z 5 osób — to ten sam stan. Trzeba <span class="text-white">jednej osoby z explicit mandate</span>: "to jest moja praca, mam veto nad brand decisions, raportuję bezpośrednio do CEO."
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Tej osoby zadania:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Quarterly audit — sampling 5% lokacji, ocena compliance.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Approval cadence — sprint review co 2 tygodnie, nie ad-hoc.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Drift KPI — measurable metric, raportowany do board.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Exception protocol — gdy local-team chce "wyjątku", jest jasna ścieżka.</span></li>
      </ul>

      <div class="my-16 border-l-2 border-[#D4FF00] pl-6 md:pl-8">
        <h3 class="font-display text-[#D4FF00] text-3xl md:text-5xl uppercase tracking-tighter leading-[0.9]">
          W 250 lokalizacjach<br/>marka nie jest estetyką.<br/>Jest operations.
        </h3>
      </div>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Jak mierzyć drift</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Co mierzyć, to się dzieje. Bez metryki brand consistency to wishful thinking. Trzy KPI, które warto trackować w multi-location organizacji:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span><span class="text-white">Visual compliance score</span> — audit per lokacja, ocena 1-10 vs brand guidelines.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span><span class="text-white">Template adoption rate</span> — % materiałów wyprodukowanych z templates vs ad-hoc.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span><span class="text-white">Time-to-publish</span> per lokacja — proxy dla operacyjnej efektywności brand-systemu.</span></li>
      </ul>

      <div class="my-16 p-8 md:p-12 bg-white/[0.025] dark:bg-white/[0.025]">
        <span class="block text-xs font-display uppercase tracking-[0.2em] text-[#D4FF00] mb-4">
          Połączenie z r3loop
        </span>
        <p class="text-lg md:text-xl text-neutral-300 leading-relaxed">
          Brand at scale to dokładnie to, co adresuje r3loop steps 3-6: Standards (3), Production (4), QA (5), Rollout (6). Każdy krok jest częścią systemu, który chroni markę kiedy zarządza nią 50, 100 albo 300 lokalnych zespołów jednocześnie.
        </p>
      </div>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Sieć fitness, sieć hearing-care, sieć retail</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Pracujemy z markami wielo-lokalizacyjnymi przez lata. Wzorzec się powtarza, niezależnie od branży. Sport, wellness, hearing-care, retail real-estate — każda z tych marek miała ten sam moment, w którym brand wymagał operacjonalizacji, nie kolejnego refreshu.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Marka, która chce skalować przez 250 lokacji, potrzebuje od <span class="text-white">początku</span> myśleć jak operacja, nie jak studio kreatywne. Im wcześniej system jest na miejscu, tym mniej drift trzeba później naprawiać.
      </p>

      <hr class="my-16 border-white/10" />

      <div class="bg-[#D4FF00] p-8 md:p-12 text-black">
        <h3 class="font-display text-4xl md:text-6xl uppercase tracking-tighter leading-none mb-6">
          Brand at scale<br/>isn't aesthetics.<br/>It's operations.
        </h3>
        <p class="text-lg font-medium max-w-2xl opacity-80">
          Jeśli marka skaluje się przez kilkanaście lokacji albo setki — i czujesz, że drift zżera spójność — operacyjny system jest tańszy niż coroczny rebrand.
        </p>
      </div>
    `,content:`
      <p class="mb-6 text-xl leading-relaxed text-neutral-300">
        300-club fitness network. 250-location hearing-care chain across Europe. 80-store retail network in Poland. All have one problem: <span class="text-white font-medium">a brand that was beautiful at launch looks different in every location a year later.</span>
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        It's not a talent problem of the local marketing manager. It's the absence of a system that protects the brand when no one is watching.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Drift is silent. One color deviation here, one different font there, one unspecified layout, one approved "exceptional campaign." After eighteen months, the <span class="text-white border-b border-[#D4FF00]/50">brand looks like it went through a rebrand that never happened</span>.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Five paths to drift</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        After a decade of working with multi-location brands, we see the same patterns. Drift enters through five doors:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span><span class="text-white">Color</span> — monitor profile at location A vs print at location B vs Instagram filter from the social manager at location C.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span><span class="text-white">Typography</span> — local team lacks access to the font, uses "the closest one" instead.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span><span class="text-white">Layout</span> — no template, marketing manager improvises for a specific campaign.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span><span class="text-white">Tone</span> — copy written locally without checking against brand voice.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span><span class="text-white">Logo</span> — resized, recolored, repositioned "just this once."</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Each of these decisions is small. Together they form a baseline erosion force that decomposes the brand over quarters.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Why the brand book isn't enough</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        The most common reflex: "We have a brand book PDF. We just need to make people use it."
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        A brand book is documentation. A multi-location organization needs an <span class="text-white">operational system</span>. The PDF says "our color is #D4FF00." The local marketing manager asks: "OK, but how do I make an ad for this local event in 1080×1080 for Instagram?" The PDF doesn't answer. The PDF gets closed. Local improvisation begins.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        A brand book describes what the brand is. An operational system makes the brand <span class="text-white">enforced in every decision, daily</span> — without asking, without interpreting, without burning the local team's creative energy.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">The architecture: 3 layers</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Brand operations in a 250-location organization requires three interlocking layers. Each imposes different constraints. Together they form a system that scales without drift.
      </p>

      <h3 class="text-2xl font-medium text-white mt-12 mb-4">Layer 1 — Strategy: 3-5 non-negotiables</h3>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Most brand books are 60 pages. The local team reads 5. Of those 5, they remember 2. Of those 2, they apply 1 for safety.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        The strategy layer must reduce to <span class="text-white">3-5 absolute non-negotiables</span> — decisions more important than any individual creative preference:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Tone of voice — one line everyone can quote.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Color boundary — 3 base colors (not 30 variations).</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Logo placement absolute — one specific rule (e.g. "logo always top-left, minimum 32px clearspace").</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Photography direction — one test to apply (e.g. "natural light, people in motion, no studio").</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Tagline pattern — a formula the local team can fill, not invent.</span></li>
      </ul>

      <h3 class="text-2xl font-medium text-white mt-12 mb-4">Layer 2 — Templates: zero blank canvas</h3>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        A local marketing manager should never start from a blank page. Every format the organization uses must have a template — ready, approved, blocking structural changes.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        A template isn't "inspiration." A template is <span class="text-white">decisions baked into the file</span>. Designer sees in the Figma library: "ad-social-1080×1080-v3." Opens it, swaps text, exports. Time from brief to publication — 12 minutes instead of 90.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Critical templates for multi-location:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Social ad (per platform + format).</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Print (poster + flyer + outdoor banner).</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Digital ad (display + video + email).</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>In-location signage (window + interior + counter).</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Internal — schedule, certificate, employee comms.</span></li>
      </ul>

      <h3 class="text-2xl font-medium text-white mt-12 mb-4">Layer 3 — Governance: one custodian</h3>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        A brand without an owner drifts. A 5-person committee — same state. You need <span class="text-white">one person with an explicit mandate</span>: "this is my job, I have veto over brand decisions, I report directly to the CEO."
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        That person's tasks:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Quarterly audit — sampling 5% of locations, compliance scoring.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Approval cadence — sprint review every 2 weeks, not ad-hoc.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Drift KPI — measurable metric, reported to the board.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>Exception protocol — when local teams want an "exception," there's a clear path.</span></li>
      </ul>

      <div class="my-16 border-l-2 border-[#D4FF00] pl-6 md:pl-8">
        <h3 class="font-display text-[#D4FF00] text-3xl md:text-5xl uppercase tracking-tighter leading-[0.9]">
          At 250 locations<br/>brand isn't aesthetics.<br/>It's operations.
        </h3>
      </div>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">How to measure drift</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        What you measure, happens. Without a metric, brand consistency is wishful thinking. Three KPIs worth tracking in a multi-location organization:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span><span class="text-white">Visual compliance score</span> — audit per location, 1-10 rating vs brand guidelines.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span><span class="text-white">Template adoption rate</span> — % of materials produced from templates vs ad-hoc.</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span><span class="text-white">Time-to-publish</span> per location — proxy for operational efficiency of the brand system.</span></li>
      </ul>

      <div class="my-16 p-8 md:p-12 bg-white/[0.025] dark:bg-white/[0.025]">
        <span class="block text-xs font-display uppercase tracking-[0.2em] text-[#D4FF00] mb-4">
          Connection to r3loop
        </span>
        <p class="text-lg md:text-xl text-neutral-300 leading-relaxed">
          Brand at scale is exactly what r3loop steps 3-6 address: Standards (3), Production (4), QA (5), Rollout (6). Each step is part of a system that protects the brand when 50, 100, or 300 local teams manage it simultaneously.
        </p>
      </div>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Fitness network, hearing-care network, retail network</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        We've worked with multi-location brands for years. The pattern repeats, regardless of industry. Sport, wellness, hearing-care, retail real-estate — each of these brands had the same moment when the brand required operationalization, not another refresh.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        A brand that wants to scale to 250 locations needs to think like an operation from the <span class="text-white">beginning</span>, not like a creative studio. The earlier the system is in place, the less drift to fix later.
      </p>

      <hr class="my-16 border-white/10" />

      <div class="bg-[#D4FF00] p-8 md:p-12 text-black">
        <h3 class="font-display text-4xl md:text-6xl uppercase tracking-tighter leading-none mb-6">
          Brand at scale<br/>isn't aesthetics.<br/>It's operations.
        </h3>
        <p class="text-lg font-medium max-w-2xl opacity-80">
          If your brand is scaling across a dozen locations or hundreds — and you feel drift eating consistency — an operational system costs less than an annual rebrand.
        </p>
      </div>
    `},{id:1,title:"From Agency<br/>to Operating Partner:<br/>The Delivery OS",title_pl:"Od Agencji<br/>do Partnera Operacyjnego:<br/>Delivery OS",date:"Feb 2026",category:"Thought Leadership",image:Wi,content_pl:`
      <p class="mb-6 text-xl leading-relaxed text-neutral-300">
        Większość cyfrowych zespołów nie zawala się dlatego, że brakuje im talentów. <span class="text-white font-medium">Zawala się dlatego, że praca się nie rusza.</span>
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Nie "rusza" w sensie, że ludzie są zajęci. Rusza w sensie: decyzje się zapadają, wnioski stają się jasne, wyjście jest spójne i rzeczy trafiają na rynek bez dramatów. To jest luka między klasyczną agencją a tym, co ja faktycznie robię.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Agencja sprzedaje wykonanie. Partner operacyjny instaluje system dostaw — i potem go używa, aby wysyłać prace wysokiej jakości szybko.
      </p>

      <div class="my-16 border-l-2 border-[#D4FF00] pl-6 md:pl-8">
        <h3 class="font-display text-[#D4FF00] text-3xl md:text-5xl uppercase tracking-tighter leading-[0.9]">
          Rzeczywista wąskie gardło to nie design.<br/>To tarcie przy decyzjach.
        </h3>
      </div>

      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        W nowoczesnych organizacjach design rzadko blokuje postęp. Co blokuje postęp:
      </p>
      <ul class="list-none mb-10 space-y-4 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>niejasne właścicielstwo ("kto decyduje?")</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>niejasne briefy ("poznamy, kiedy zobaczymy")</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>feedback loops bez kryteriów ("możemy spróbować innej wersji?")</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>niespójne standardy ("to wygląda inaczej za każdym razem")</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>słabe handoffy ("wyglądało dobrze w Figmie…")</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Kiedy to jest obecne, zespół rekompensuje poprzez dodanie więcej ludzi, więcej spotkań, więcej narzędzi, więcej wiadomości na Slacku. To nigdy nie rozwiązuje głównego problemu. Rozwiązanie to nie "pracuj ciężej."
      </p>

      <p class="font-display text-white text-2xl uppercase tracking-wider my-8">Rozwiązaniem jest system.</p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Briefy to nie administracja. Briefy to dane wejściowe produktu.</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Brief to nie formalność. To dane wejściowe, które determinują prędkość dostarczenia, jakość wyjścia i wyrównanie.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Słabe dane wejściowe tworzą słabe wyjście — i kosztowne iteracje. Mocne dane wejściowe czynią jakość i prędkość przewidywalne. Dlatego pierwszą rzeczą, którą optymalizuję, są nie wizualizacje. To sposób, w jaki praca wchodzi do systemu.
      </p>

      <div class="my-16 bg-neutral-900/50 p-8 md:p-12 border border-white/5 relative overflow-hidden">
        <div class="absolute top-0 right-0 p-4 opacity-10 font-display text-9xl leading-none text-[#D4FF00] pointer-events-none select-none">OS</div>
        <h3 class="relative z-10 font-display text-white text-2xl uppercase tracking-widest mb-4">Co mam na myśli przez "Delivery OS"</h3>
        <p class="relative z-10 mb-6 text-lg leading-relaxed text-neutral-400">
           Delivery OS to nie oprogramowanie. To model operacyjny — powtarzalny zestaw reguł, który zamienia wnioski w wyjście gotowe do publikacji.
        </p>
        <ol class="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 text-neutral-400 text-lg">
          <li class="bg-black/20 p-4 border border-white/5"><strong class="text-[#D4FF00] block text-xs font-display uppercase tracking-widest mb-1">01. Intake</strong> co wchodzi, jak to wchodzi</li>
          <li class="bg-black/20 p-4 border border-white/5"><strong class="text-[#D4FF00] block text-xs font-display uppercase tracking-widest mb-1">02. Alignment</strong> kto decyduje, jaki jest cel</li>
          <li class="bg-black/20 p-4 border border-white/5"><strong class="text-[#D4FF00] block text-xs font-display uppercase tracking-widest mb-1">03. Execution</strong> design + produkcja</li>
          <li class="bg-black/20 p-4 border border-white/5"><strong class="text-[#D4FF00] block text-xs font-display uppercase tracking-widest mb-1">04. QA</strong> standardy, spójność</li>
          <li class="bg-black/20 p-4 border border-white/5"><strong class="text-[#D4FF00] block text-xs font-display uppercase tracking-widest mb-1">05. Handoff</strong> gotowe do publikacji</li>
          <li class="bg-black/20 p-4 border border-white/5"><strong class="text-[#D4FF00] block text-xs font-display uppercase tracking-widest mb-1">06. Cadence</strong> rytm zamiast chaosu</li>
        </ol>
      </div>

      <div class="my-12">
         <h3 class="font-display text-[#D4FF00] text-2xl md:text-4xl uppercase tracking-tighter leading-tight text-center">
            Najwyższa jakość i szybkie dostarczenie to nie przeciwieństwa — jeśli systematyzujesz wykonanie.
         </h3>
      </div>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Różnica: wyjście vs model operacyjny</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Agencje często pracują tak: weź brief, stwórz opcje, czekaj na feedback, powtarzaj aż ktoś się zmęczy, wyślij. To działa dla projektów jednorazowych. Rozpada się na dużą skalę.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Partner operacyjny pracuje inaczej: uprawnia brief, definiuje właścicielstwo decyzji, buduje szablony wielokrotnego użytku i tworzy przewidywalny rytm wysyłania.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Dlatego czuję się komfortowo sprzedając prędkość. <span class="text-white border-b border-[#D4FF00]/30">Ponieważ to nie "pośpiesz." To zmniejszone tarcie.</span>
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Co się zmienia w epoce AI</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Oczywista historia to: AI robi wykonanie szybciej. Prawda — ale to nie główny punkt. Rzeczywista zmiana polega na tym, że produkcja staje się tańsza, podczas gdy decydowanie pozostaje drogie.
      </p>

      <div class="my-10 pl-6 border-l border-neutral-700">
        <p class="text-xl text-white italic">
          "Bez systemu AI nie tworzy prędkości — tworzy chaos szybciej."
        </p>
      </div>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Poprzeczka jakości to strategia</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Większość zespołów mówi o jakości jako o guście. Traktuję to jako standard. Kiedy jakość jest systematyzowana, przestaje być krucha.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">System to to, co sprawia, że "szybkie" jest spokojne</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Większość ludzi kojarzy prędkość ze stresem. To dlatego, że robią prędkość poprzez pilność. Delivery OS robi coś przeciwnego: wolniej tam, gdzie to ma znaczenie (wyjaśnianie ograniczeń), szybciej tam, gdzie to się opłaca (produkcja).
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        To jedyna prędkość godna sprzedaży.
      </p>

      <hr class="my-16 border-white/10" />

      <div class="bg-[#D4FF00] p-8 md:p-12 text-black">
        <h3 class="font-display text-4xl md:text-6xl uppercase tracking-tighter leading-none mb-6">
          Zacznij od jednego sprintu.<br/>Zainstaluj system.<br/>Potem wysyłaj co tydzień.
        </h3>
        <p class="text-lg font-medium max-w-2xl opacity-80">
          Jeśli budujesz w złożonym środowisku - wiele zespołów, ciągłe wnioski, wysokie standardy - i chcesz najwyższej jakości wyjście przy prędkości bez chaosu, to dokładnie problem, nad którym pracuję.
        </p>
      </div>
`,content:`
      <p class="mb-6 text-xl leading-relaxed text-neutral-300">
        Most digital teams don’t fail because they lack talent. <span class="text-white font-medium">They fail because work doesn’t move.</span>
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Not “move” as in people are busy. Move as in: decisions get made, requests become clear, output is consistent, and things ship without drama. That’s the gap between a classic agency and what I actually do.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        An agency sells execution. An operating partner installs a delivery system — and then uses it to ship high-quality work fast.
      </p>

      <div class="my-16 border-l-2 border-[#D4FF00] pl-6 md:pl-8">
        <h3 class="font-display text-[#D4FF00] text-3xl md:text-5xl uppercase tracking-tighter leading-[0.9]">
          The real bottleneck isn’t design.<br/>It’s decision friction.
        </h3>
      </div>

      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        In modern organizations, design rarely blocks progress. What blocks progress is:
      </p>
      <ul class="list-none mb-10 space-y-4 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>unclear ownership (“who decides?”)</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>vague briefs (“we’ll know when we see it”)</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>feedback loops without criteria (“can we try another version?”)</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>inconsistent standards (“this looks different every time”)</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>poor handoffs (“it looked good in Figma…”)</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        When these are present, the team compensates by adding more people, more meetings, more tools, more Slack messages. It never fixes the core issue. The fix is not “work harder.”
      </p>
      
      <p class="font-display text-white text-2xl uppercase tracking-wider my-8">The fix is a system.</p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Briefs are not admin. Briefs are product inputs.</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        A brief isn’t a formality. It’s the input that determines speed of delivery, quality of output, and alignment.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Weak input creates weak output — and expensive iteration. Strong input makes quality and speed predictable. That’s why the first thing I optimize is not visuals. It’s the way work enters the system.
      </p>

      <div class="my-16 bg-neutral-900/50 p-8 md:p-12 border border-white/5 relative overflow-hidden">
        <div class="absolute top-0 right-0 p-4 opacity-10 font-display text-9xl leading-none text-[#D4FF00] pointer-events-none select-none">OS</div>
        <h3 class="relative z-10 font-display text-white text-2xl uppercase tracking-widest mb-4">What I mean by “Delivery OS”</h3>
        <p class="relative z-10 mb-6 text-lg leading-relaxed text-neutral-400">
           A Delivery OS is not software. It’s an operating model — a repeatable set of rules that turns requests into publish-ready output.
        </p>
        <ol class="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 text-neutral-400 text-lg">
          <li class="bg-black/20 p-4 border border-white/5"><strong class="text-[#D4FF00] block text-xs font-display uppercase tracking-widest mb-1">01. Intake</strong> what enters, how it enters</li>
          <li class="bg-black/20 p-4 border border-white/5"><strong class="text-[#D4FF00] block text-xs font-display uppercase tracking-widest mb-1">02. Alignment</strong> who decides, what’s the goal</li>
          <li class="bg-black/20 p-4 border border-white/5"><strong class="text-[#D4FF00] block text-xs font-display uppercase tracking-widest mb-1">03. Execution</strong> design + production</li>
          <li class="bg-black/20 p-4 border border-white/5"><strong class="text-[#D4FF00] block text-xs font-display uppercase tracking-widest mb-1">04. QA</strong> standards, consistency</li>
          <li class="bg-black/20 p-4 border border-white/5"><strong class="text-[#D4FF00] block text-xs font-display uppercase tracking-widest mb-1">05. Handoff</strong> ready-to-publish</li>
          <li class="bg-black/20 p-4 border border-white/5"><strong class="text-[#D4FF00] block text-xs font-display uppercase tracking-widest mb-1">06. Cadence</strong> rhythm over chaos</li>
        </ol>
      </div>

      <div class="my-12">
         <h3 class="font-display text-[#D4FF00] text-2xl md:text-4xl uppercase tracking-tighter leading-tight text-center">
            Premium quality and fast delivery are not opposites — if you systemize execution.
         </h3>
      </div>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">The difference: output vs operating model</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Agencies often work like this: take a brief, produce options, wait for feedback, repeat until someone gets tired, ship. That works for one-off projects. It collapses under scale.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        An operating partner works differently: makes the brief real, defines decision ownership, builds reusable templates, and creates a predictable shipping cadence.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        This is why I’m comfortable selling speed. <span class="text-white border-b border-[#D4FF00]/30">Because it’s not “rush.” It’s reduced friction.</span>
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">What changes in the AI era</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        The obvious story is: AI makes execution faster. True — but not the main point. The real shift is that making gets cheaper, while deciding stays expensive.
      </p>
      
      <div class="my-10 pl-6 border-l border-neutral-700">
        <p class="text-xl text-white italic">
          "Without a system, AI doesn’t create speed — it creates chaos faster."
        </p>
      </div>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">The quality bar is a strategy</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Most teams talk about quality as taste. I treat it as a standard. When quality is systemized, it stops being fragile.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">The system is what makes “fast” calm</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Most people associate speed with stress. That’s because they’re doing speed through urgency. The Delivery OS does the opposite: slower where it matters (clarifying constraints), faster where it pays off (production).
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        That’s the only kind of speed worth selling.
      </p>

      <hr class="my-16 border-white/10" />
      
      <div class="bg-[#D4FF00] p-8 md:p-12 text-black">
        <h3 class="font-display text-4xl md:text-6xl uppercase tracking-tighter leading-none mb-6">
          Start with one sprint.<br/>Install the system.<br/>Then ship weekly.
        </h3>
        <p class="text-lg font-medium max-w-2xl opacity-80">
          If you’re building in a complex environment - multi-team, constant requests, high standards - and you want premium output at speed without chaos, that’s exactly the problem I work on.
        </p>
      </div>
    `}],Zi="/assets/209f8cbc4090410c2f591ddabbe7a2b127fba064-BNgj7PAV.webp",Gi="/assets/1f8226a360c36242f8b1cd87137b2ed45b5b12eb-Dh1jHBo2.webp",Vi="/assets/5560d70ae6cb2aae698382d474abd8298c9b4c98-WEndzFGI.webp",$i="/assets/70ffa00b6de8a7019dca4820d3f27c34ceb12f29-C8ZaZbeU.webp",Yi="/assets/ff5c7b5d6db2610ec21e962e7ac6e1eec5c9b1ef-ldm_pceU.webp",Rt="/assets/benefit-master-Bwhv9J8x.webp",Da="/assets/64d75b93efc7e2276259be86fa58f58167868519-BdCpRn2b.webp",Sa="/assets/sonova-master-BPlHsGL6.webp",Ta="/assets/85688108fd26519f5f268b0edee3e11082b409ab-DkXXhd4z.webp",Ji="/assets/a2fb88b4a767274b92af34ad6534183768eeef35-De5ExDKs.webp",Xi="/assets/d1bbac7e4cf37ccfc8e8489eb7911a7cba54f0c6-DOreFWK5.webp",Qi="/assets/7e48eef64acdf4a81ce924544991a70fa72de099-5ZTysyrN.webp",eo="/assets/c49057385a8b349bc99b8d4d1d1bb707f4674bb3-C7Qtld0t.webp",to="/assets/76e847d9bccd1dc5e3e21726a452b712839f339d-Da1fB6i6.webp",ao="/assets/a4e5cfe65f5adbdf1bcf845f9b99f3ba39177d4e-BHNxQXye.webp",so="/assets/58c74394310b11dfca043fb3b1d11720ddb56065-_rVQk1uO.webp",no="/assets/1f28b418f11aaea61d562420766fd66383fe0405-MUstF3bZ.webp",io="/assets/eebf0f709c3cd8c99d83da2f3eba5767e761d673-Mz8SPYS4.webp",oo="/assets/23fa00f7824aa041c745cd0a2128c70bb7554f79-BKpZZYV9.webp",ro="/assets/fa2519b057d62b113e618bbc8a4d1444a79ccf8b-txnWoNhI.webp",lo="/assets/07174841306f7651acc2728ea5690360b2c0896c-vu1jKIRv.webp",co="/assets/352e6d0d08b2645318c6602909418ca9ae456250-Cu5dDC7N.webp",po="/assets/4d1f7797ea1d8d7473233f7ab8d2f56fb3186fa4-CHuIN61F.webp",mo="/assets/d7d8b655b0c0a00ac55aefb2c11480f6ada173de-DuHlq4eO.webp",uo="/assets/eb31f0fd6023ee1b0a1d37d3abadc6b5c9b719ef-BtOsGYeA.webp",yo="/assets/51f00fe90a9650cf992b64f1a354e63e83efdfe5-BeE63dq3.webp",ho="/assets/590f188d1475875fa3221bb4f86c99f935f70cbe-CXqr7IGm.webp",go="/assets/51e11441d7c02bfa2791df691e15dbf208a105e4-CxnSNnOe.webp",Aa="/assets/archicom-night-rendering-BtIYUS28.webp",wo="/assets/bkg1%202-CKsZHbS8.png",bo="/assets/RP1-BqFkTDDc.png",xo="/assets/RP2-CtqQfXpB.png",fo="/assets/RP3-DMKFdsSL.png",ko="/assets/RP4-CcM5JbRQ.png",zo="/assets/BP1-DmTRuCwg.png",vo="/assets/BP2-Q9GZS3Ws.png",jo="/assets/BP3-D_3zHuwX.png",Fo="/assets/BP4-DZpx__AU.png",Do="/assets/01-master-dashboard-DeVeQ63z.webp",So="/assets/02-club-cards-MvkUgh8P.webp",Ca="/assets/03-map-overlap-wide-DyT6uOOY.webp",To="/assets/04-intake-form-CdK5wsKZ.webp",Ao="/assets/05-club-detail-Cmnyvz44.webp",Co="/assets/06-club-popup-card-DPaOAi2u.webp",Po="/assets/01-europe-overview-BOiisVgP.webp",Io="/assets/02-region-map-BS6cb2R-.webp",Eo="/assets/03-compare-C-mdS5zn.webp",No="/assets/04-region-detail-OI4w4WgF.webp",Mo="/assets/05-price-chart-DKvBVulH.webp",_o="/assets/06-renovation-calc-Bg_-wecE.webp",Pa="/assets/27-Cxl-m3sP.png",Ro="/assets/1%209-Cf7JqUVR.png",Oo="/assets/2%202-xUY4dV9B.png",Wo="/assets/3%202-DtVwxvHs.png",Bo="/assets/4%202-mjkZIcB2.png",Lo="/assets/5%202-sFdFSN_J.png",qo="/assets/6%202-D6QjZElQ.png",Ko="/assets/Frame%20636509%202-DJeVI3oM.png",Uo="/assets/Group%20636667-DgD9Ggn1.png",Ho=Rt;function Ia({logo:e,colors:t}){return n.jsxs("div",{className:"w-full h-full flex items-center justify-center relative overflow-hidden",style:{background:`linear-gradient(135deg, ${t[0]} 0%, ${t[1]} 100%)`},children:[n.jsx("div",{className:"absolute inset-0 opacity-[0.08]",style:{backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,backgroundSize:"128px 128px"}}),n.jsx("div",{className:"absolute inset-0 opacity-10",style:{background:`radial-gradient(ellipse at 30% 70%, ${t[0]}80 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, ${t[1]}80 0%, transparent 60%)`}}),n.jsx("img",{src:e,alt:"",className:"h-12 md:h-20 w-auto object-contain brightness-0 invert opacity-15 blur-[3px] select-none pointer-events-none"})]})}const Zo=[{id:"benefit-systems",client:"Benefit Systems",title:"System at Scale",category:{en:"Product Design / System",pl:"Design Produktu / System"},year:"2019 — current",image:Rt,coverImage:Ho,hoverVideo:"/videos/benefit-hover.mp4",images:[Rt,ro,lo,co,po],isInternal:!1,description:{en:"Working with Benefit Systems is not just about design - it's about building a scalable communication system for the largest sports club network in Poland, with precision, process and locally adapted aesthetics.",pl:"Praca z Benefit Systems to nie tylko design - to budowanie skalowalnego systemu komunikacji dla największej sieci klubów sportowych w Polsce, z precyzją, procesem i lokalnie dopasowaną estetyką."},services:{en:["Visual Communication","Key Visuals","Asset Production"],pl:["Komunikacja Wizualna","Key Visuale","Produkcja Zasobów"]},challenge:{en:"Balancing bold, eye-catching visuals with practical functionality required innovative thinking. We had to coordinate with over 5 Project Managers simultaneously while ensuring assets were finalized 2.5 months before every club opening.",pl:"Zbalansowanie odważnych, przyciągających wzrok wizualiów z praktyczną funkcjonalnością wymagało innowacyjnego myślenia. Musieliśmy koordynować pracę z ponad 5 Project Managerami jednocześnie, zapewniając finalizację zasobów na 2,5 miesiąca przed otwarciem każdego klubu."},decisions:{en:"We established a workflow relying on structured timelines and checklists. We focused on layout systems that are scalable, adaptable and easy to deploy across multiple locations, from mesh banners to digital screens.",pl:"Ustanowiliśmy przepływ pracy oparty na ustrukturyzowanych harmonogramach i listach kontrolnych. Skupiliśmy się na systemach layoutu, które są skalowalne, adaptowalne i łatwe do wdrożenia w wielu lokalizacjach, od siatek mesh po ekrany cyfrowe."},approach:{en:"We manage the entire visual communication system, delivering unique key visuals and full asset packages tailored to local campaigns. We treat every new club launch as a unique project within a consistent framework.",pl:"Zarządzamy całym systemem komunikacji wizualnej, dostarczając unikalne key visuale i pełne pakiety zasobów dopasowane do lokalnych kampanii. Każde otwarcie nowego klubu traktujemy jako unikalny projekt w ramach spójnych ram."},quote:{en:"Wellness at work, simplified for everyone.",pl:"Wellness w pracy, uproszczony dla każdego."},outcome:{en:"A long-term partnership demonstrating how design scales across hundreds of locations without losing clarity. Each project strengthens Benefit Systems' presence in Poland’s urban spaces through visual storytelling and operational excellence.",pl:"Długoterminowe partnerstwo pokazujące, jak design skaluje się w setkach lokalizacji bez utraty jasności. Każdy projekt wzmacnia obecność Benefit Systems w polskich przestrzeniach miejskich poprzez wizualny storytelling i doskonałość operacyjną."},reflection:{en:"Reliability is the ultimate design feature. When you run multiple threads in parallel, process becomes as important as the pixels.",pl:"Niezawodność to ostateczna cecha designu. Gdy prowadzisz wiele wątków równolegle, proces staje się tak samo ważny jak piksele."},stats:[{value:"15+",label:{en:"PMs Coordinated",pl:"Koordynowanych PM-ów"}},{value:"300+",label:{en:"Clubs Supported",pl:"Wspieranych Klubów"}}]},{id:"dawid-podsiadlo",client:"Dawid Podsiadlo",title:"Tour Experience",category:{en:"Digital Products",pl:"Produkty Cyfrowe"},year:"2024",image:Ta,coverImage:Ta,hoverVideo:"/videos/dawid-hover.mp4",images:[oo,so,no,Ji,Xi,Qi,eo,to,io,ao],isInternal:!1,description:{en:"Long-term 360° support for one of Poland's biggest artists. We provide comprehensive development of digital products - from advanced e-commerce platforms handling massive traffic to dedicated concert apps and asset production for stadium tours.",pl:"Długoterminowe wsparcie 360° dla jednego z największych polskich artystów. Zapewniamy kompleksową realizację produktów cyfrowych - od zaawansowanych sklepów WWW obsługujących ogromny ruch, po dedykowane aplikacje koncertowe i produkcję zasobów na trasy stadionowe."},services:{en:["Concert Apps","E-commerce","Digital & Print"],pl:["Aplikacje Koncertowe","Sklepy WWW","Digital i Druk"]},challenge:{en:"The scale of stadium tours required reliable technological solutions. Our main challenge was building scalable digital products, such as an e-commerce platform and concert apps, capable of withstanding massive traffic spikes during drops.",pl:"Skala stadionowych tras koncertowych wymagała niezawodnych rozwiązań technologicznych. Naszym głównym wyzwaniem było stworzenie skalowalnych produktów cyfrowych, takich jak sklep WWW i aplikacje koncertowe, które wytrzymają ogromne obciążenie ruchem podczas premier."},decisions:{en:"We designed a high-performance architecture for the online store and created intuitive apps to streamline logistics and fan experience during concerts. In parallel, we managed the production of physical materials for the events.",pl:"Zaprojektowaliśmy wydajną architekturę dla sklepu internetowego oraz stworzyliśmy intuicyjne aplikacje ułatwiające logistykę i doświadczenie fanów podczas koncertów. Równolegle zarządzaliśmy produkcją materiałów fizycznych na wydarzenia."},approach:{en:"We combined technological and production expertise. We designed and deployed reliability-focused digital products while maintaining strict visual consistency with promotional materials.",pl:"Połączyliśmy kompetencje technologiczne z produkcyjnymi. Zaprojektowaliśmy i wdrożyliśmy produkty cyfrowe zorientowane na niezawodność, dbając jednocześnie o spójność z materiałami promocyjnymi."},quote:{en:"Digital products at this scale don't forgive errors - the e-commerce store and apps must work flawlessly.",pl:"Produkty cyfrowe przy tej skali nie wybaczą błędów - sklep WWW i aplikacje muszą działać bezbłędnie."},outcome:{en:"Seamless delivery of robust digital products, enabling the artist's team to focus on the performance while we handled both the e-commerce ecosystem and the 360° production pipeline.",pl:"Płynne dostarczanie niezawodnych produktów cyfrowych, co pozwoliło zespołowi artysty skupić się na występie, podczas gdy my zarządzaliśmy ekosystemem e-commerce i procesem produkcji 360°."},reflection:{en:"Consistency and reliability in high-stakes environments build trust. Scalable tech architecture isn't just about code; it's about peace of mind for the artist.",pl:"Spójność i niezawodność w środowiskach o wysoką stawkę budują zaufanie. Skalowalna architektura technologiczna to nie tylko kod, to także spokój ducha dla artysty."},stats:[{value:"300k+",label:{en:"Tickets Sold",pl:"Sprzedane Bilety"}},{value:"10",label:{en:"Concerts",pl:"Koncertów"}}]},{id:"archicom",client:"Archicom",title:"Cross-investment communication system",category:{en:"Real Estate / Multi-channel Production",pl:"Real Estate / Produkcja Multi-channel"},year:"2026 — current",image:Aa,coverImage:Aa,hoverVideo:"/videos/archicom-rendering-anim.mp4",videoUrl:"https://www.youtube.com/watch?v=7f_Qzq6B7kY",images:[wo,bo,zo,xo,vo,fo,jo,ko,Fo],isInternal:!1,description:{en:"Archicom is one of Poland's largest residential developers, running multiple investments simultaneously across major cities — each requiring a launch campaign that feels distinct (location identity) yet stays anchored to the corporate brand. We've supported their marketing operations broadly; River Point and Bulwar Północny shown here are flagship Wrocław examples of the system in action — print, outdoor, digital, animation and production support.",pl:"Archicom to jeden z największych deweloperów mieszkaniowych w Polsce, prowadzący wiele inwestycji równolegle w głównych miastach — każda wymaga kampanii launchowej, która jest rozpoznawalna lokalnie, ale spójna z marką korporacyjną. Wspieraliśmy ich operacje marketingowe szeroko; River Point i Bulwary Północne pokazane tutaj to flagowe wrocławskie przykłady systemu w działaniu — print, outdoor, digital, animacja i wsparcie produkcyjne."},services:{en:["Print Materials","Outdoor Campaigns","Digital Assets","Animations & Video","Production Support"],pl:["Materiały Drukowane","Kampanie Outdoor","Zasoby Digital","Animacje i Wideo","Wsparcie Produkcyjne"]},challenge:{en:"Each investment needs its own brand expression — River Point and Bulwar Północny have different audiences, locations and architectural language. But every asset has to feel like Archicom. Add 5+ media channels per investment plus tight launch timelines, and you have a production volume challenge with brand consistency stakes.",pl:"Każda inwestycja potrzebuje własnej ekspresji brandowej — River Point i Bulwary Północne mają różnych odbiorców, lokalizacje i język architektoniczny. Ale każdy asset musi być rozpoznawalny jako Archicom. Dodaj 5+ kanałów mediowych per inwestycja plus napięte launch timeline'y i masz wyzwanie wolumenu produkcji ze stawkami brand consistency."},decisions:{en:"We structured the work around a two-layer brand system: Archicom corporate identity as the foundation, investment-specific micro-brand as the expression layer. Production was built around modular templates per channel — each new asset is an adaptation, not a fresh design. Animation became the anchor asset, with derivatives generated for static formats.",pl:"Zorganizowaliśmy pracę wokół dwuwarstwowego systemu marki: Archicom korporacyjne jako fundament, micro-brand per inwestycja jako warstwa ekspresji. Produkcja oparta o modułowe szablony per kanał — każdy nowy asset to adaptacja, nie projekt od zera. Animacja stała się asset'em flagowym, z derivatywami dla formatów statycznych."},approach:{en:"We handled the full pipeline from concept to delivered assets — not just design files, but the production support that takes work from approved layout to printed billboard, animated ad, social media set. For each investment, we built a content library the marketing team could pull from for ongoing campaigns.",pl:"Obsługiwaliśmy pełen pipeline od koncepcji do dostarczonych assetów — nie tylko pliki designu, ale wsparcie produkcyjne, które przeprowadza pracę od zatwierdzonego layoutu do wydrukowanego billboardu, animowanej reklamy, social media setu. Per inwestycja zbudowaliśmy bibliotekę treści, którą zespół marketingu mógł reużywać do bieżących kampanii."},quote:{en:"Each investment is a launch event. The system makes it routine excellence, not heroic delivery.",pl:"Każda inwestycja to launch event. System sprawia, że to rutynowa doskonałość, nie heroiczna dostawa."},outcome:{en:"Two flagship Wrocław investments launched with full multi-channel campaigns — print, outdoor, digital, animation. Brand consistency across investments AND with Archicom corporate. Production cadence that kept up with sales-driven launch timelines.",pl:"Dwie flagowe wrocławskie inwestycje uruchomione z pełnymi kampaniami multi-channel — print, outdoor, digital, animacja. Brand consistency między inwestycjami ORAZ z marką korporacyjną Archicom. Tempo produkcji nadążające za sales-driven timeline'ami launchu."},reflection:{en:"In real estate communication, every campaign is high-stakes — millions in inventory waiting on launch awareness. Systems aren't a luxury, they're the only way to deliver consistently across multiple investments without burning out the marketing team.",pl:"W komunikacji nieruchomości każda kampania to high-stakes — miliony w ofercie czekają na launch awareness. Systemy to nie luksus, to jedyny sposób na konsekwentne dostarczanie w wielu inwestycjach bez wypalania zespołu marketingu."},stats:[{value:"2",label:{en:"Flagship Investments",pl:"Flagowe Inwestycje"}},{value:"5+",label:{en:"Channels per Investment",pl:"Kanałów per Inwestycja"}}]},{id:"sonova",client:"Sonova",title:"Market Communication",category:{en:"Brand Support",pl:"Wsparcie Marki"},year:"2023 — current",image:Sa,coverImage:Sa,hoverVideo:"/videos/sonova-hover.mp4",images:[$i,Zi,Gi,Vi,Yi],isInternal:!1,description:{en:"We help Sonova communicate clearly and confidently across their Polish market, delivering campaigns, print materials and digital assets that connect with diverse audiences.",pl:"Pomagamy firmie Sonova komunikować się w sposób jasny i pewny na polskim rynku, dostarczając kampanie, materiały drukowane i zasoby cyfrowe, które łączą się z różnorodnymi odbiorcami."},services:{en:["Retail Campaigns","Print Design","Digital Assets"],pl:["Kampanie Retail","Projekty Drukowane","Zasoby Cyfrowe"]},challenge:{en:"We provide continuous creative and production support for Sonova’s Polish operations. The challenge is to maintain global brand precision while localizing communication for hundreds of clinics and diverse audiences.",pl:"Zapewniamy ciągłe wsparcie kreatywne i produkcyjne dla polskich operacji Sonova. Wyzwaniem jest zachowanie globalnej precyzji marki przy jednoczesnej lokalizacji komunikacji dla setek klinik i zróżnicowanych odbiorców."},decisions:{en:"We established a modular system allowing fast and consistent rollout across all clinics. We closely coordinate with local marketing to ensure visuals are on-brand, compliant, and conversion-ready.",pl:"Stworzyliśmy modułowy system umożliwiający szybkie i spójne wdrożenia we wszystkich klinikach. Ściśle współpracujemy z lokalnym marketingiem, aby wizualizacje były zgodne z marką, przepisami i nastawione na konwersję."},approach:{en:"We support both brand-level messaging and conversion-driven communication. For each campaign, we refine templates to better serve patients, sales teams, and the organization's goals.",pl:"Wspieramy zarówno komunikację wizerunkową, jak i sprzedażową. Przy każdej kampanii udoskonalamy szablony, aby lepiej służyły pacjentom, zespołom sprzedaży i celom organizacji."},quote:{en:"Sonova’s mission is about restoring hearing - our role is to make that promise feel accessible, trustworthy and clear.",pl:"Misją Sonova jest przywracanie słuchu - naszą rolą jest sprawienie, by ta obietnica była dostępna, wiarygodna i jasna."},outcome:{en:"We successfully localize communication without losing quality. Deliverables include print-ready materials, web banners, and tailored messaging that resonates with senior and multi-generational audiences.",pl:"Skutecznie lokalizujemy komunikację bez utraty jakości. Dostarczamy gotowe materiały do druku, banery i dopasowane komunikaty, które rezonują z odbiorcami senioralnymi i wielopokoleniowymi."},reflection:{en:"With each project, we focus on simplifying complexity, building human connections and helping people hear the world again.",pl:"Przy każdym projekcie skupiamy się na upraszczaniu złożoności, budowaniu ludzkich relacji i pomaganiu ludziom usłyszeć świat na nowo."},stats:[{value:"250+",label:{en:"Locations Supported",pl:"Obsłużonych Lokalizacji"}},{value:"500+",label:{en:"Assets / Year",pl:"Zasobów / Rok"}}]},{id:"kubota",client:"Kubota",title:"Long-term creative partnership",category:{en:"Design-first partner",pl:"Zintegrowany partner projektowy"},year:"2023",image:Da,coverImage:Da,hoverVideo:"/videos/kubota-hover.mp4",images:[yo,mo,uo],isInternal:!1,description:{en:"Kubota’s growth required more than one-off campaigns. We supported the brand from early-stage momentum to large-scale communication by building a consistent visual language and a repeatable content production system. This helped the marketing team move faster, stay coherent across channels, and ship reliably during key moments, including a dedicated IPO debut materials package.",pl:"Rozwój marki Kubota wymagał czegoś więcej niż jednorazowych kampanii. Wspieraliśmy markę od wczesnego etapu wzrostu do komunikacji na dużą skalę, budując spójny język wizualny i powtarzalny system produkcji treści. Pomogło to zespołowi marketingu działać szybciej, zachować spójność we wszystkich kanałach i niezawodnie dostarczać materiały w kluczowych momentach, w tym dedykowany pakiet na debiut giełdowy."},services:{en:["Always-on content","Campaign assets","Modular formats","IPO materials"],pl:["Bieżąca obsługa","Materiały kampanijne","Formaty modułowe","Materiały IPO"]},challenge:{en:"Kubota needed continuous, high-quality creative output while scaling fast. The core challenge wasn’t a single project, it was maintaining consistency across touchpoints, reducing approval friction, and keeping speed high without compromising detail.",pl:"Kubota potrzebowała ciągłych, wysokiej jakości materiałów kreatywnych w trakcie szybkiego skalowania. Głównym wyzwaniem nie był pojedynczy projekt, ale utrzymanie spójności we wszystkich punktach styku, redukcja tarć decyzyjnych i utrzymanie tempa bez kompromisów w detalach."},decisions:{en:"We acted as an embedded design-first partner, delivering campaign assets and always-on content across digital, social, and print. In parallel, we built a modular system of formats and reusable components that made production predictable, reduced back-and-forth, and kept the brand visually coherent even as volume increased.",pl:"Działaliśmy jako zintegrowany partner projektowy, dostarczając materiały do kampanii i bieżącej komunikacji w kanałach digital, social i druku. Równolegle zbudowaliśmy modułowy system formatów i reużywalnych komponentów, który uczynił produkcję przewidywalną, zmniejszył liczbę poprawek i utrzymał spójność wizualną marki nawet przy rosnącym wolumenie."},approach:{en:"At a key milestone, we delivered a dedicated set of communication materials supporting Kubota’s IPO debut process. The focus was clarity, consistency, and execution readiness under high visibility, while protecting the brand’s tone and quality on both the “big picture” and detail level.",pl:"W kluczowym momencie dostarczyliśmy dedykowany zestaw materiałów komunikacyjnych wspierających proces debiutu giełdowego marki Kubota. Skupiliśmy się na jasności, spójności i gotowości egzekucyjnej przy dużej widoczności, chroniąc jednocześnie ton i jakość marki zarówno na poziomie strategicznym, jak i w detalach."},quote:{en:"Systemizing content delivery. Keeping brand quality consistent during growth.",pl:"Systematyzacja dostarczania treści. Utrzymanie spójnej jakości marki podczas wzrostu."},outcome:{en:"A scalable creative workflow that helped Kubota ship faster with fewer iterations, clearer standards, and consistent output across channels during growth and high-stakes moments.",pl:"Skalowalny proces kreatywny, który pomógł marce Kubota działać szybciej z mniejszą liczbą iteracji, jaśniejszymi standardami i spójnymi materiałami we wszystkich kanałach podczas wzrostu i kluczowych momentów."},reflection:{en:"Highlights: Always-on content production and campaign assets, Modular formats and reusable components, Cross-channel consistency (digital / social / print), IPO debut communication materials package.",pl:"Najważniejsze punkty: Bieżąca produkcja treści i materiały kampanijne, Modułowe formaty i reużywalne komponenty, Spójność we wszystkich kanałach (digital / social / print), Pakiet materiałów na debiut IPO."},stats:[{value:"3+",label:{en:"Years of Partnership",pl:"Lata Współpracy"}},{value:"200+",label:{en:"Deliverables Shipped",pl:"Dostarczonych Materiałów"}}]},{id:"discobowl",client:"DiscoBowl",title:"Multi-venue booking system",category:{en:"Entertainment / Booking Product",pl:"Entertainment / Produkt Rezerwacyjny"},year:"2024",image:Pa,coverImage:Pa,hoverVideo:"/videos/discobowl-hover.mp4",images:[Ko,Ro,Oo,Wo,Bo,Lo,qo,Uo],isInternal:!1,description:{en:"DiscoBowl operates 20+ bowling venues across the UK, each running its own schedule, capacity and local marketing. We designed the UX and built the booking system — two coordinated sites + reservation platform — that handles cross-venue consistency while letting each venue express local personality.",pl:"DiscoBowl prowadzi 20+ kręgielni w UK, każda z własnym harmonogramem, pojemnością i lokalnym marketingiem. Zaprojektowaliśmy UX i zbudowaliśmy system rezerwacyjny — dwie skoordynowane strony + platformę rezerwacji — która obsługuje cross-venue consistency, pozwalając każdej kręgielni na lokalny charakter."},services:{en:["UX Design","Product Design","Multi-site Architecture","Booking System UX","Brand Consistency"],pl:["UX Design","Product Design","Architektura Multi-site","UX Systemu Rezerwacji","Brand Consistency"]},challenge:{en:"Twenty venues, each booking-active 7 days a week. Each venue has its own schedule, pricing tiers, league nights, kid party slots and corporate events. The booking system needs to feel like one DiscoBowl brand but adapt to each venue's reality — without manual override per location.",pl:"Dwadzieścia kręgielni, każda aktywna z rezerwacjami 7 dni w tygodniu. Każda ma własny harmonogram, cenniki, ligi, eventy dla dzieci, eventy firmowe. System rezerwacji musi czuć się jak jeden DiscoBowl brand, ale adaptować się do realiów każdej kręgielni — bez manualnych override'ów per lokalizacja."},decisions:{en:"We treated the booking system as a product, not a feature. UX-first: every flow tested against real audience patterns — family weekends, league regulars, corporate events. Architecture: one shared component system feeding two coordinated sites — main brand site for awareness, dedicated reservations site for conversion — with venue-specific data layers underneath.",pl:"Potraktowaliśmy system rezerwacji jako produkt, nie feature. UX-first: każdy flow testowany przeciw realnym wzorcom audience — rodzinne weekendy, regularni ligowicze, eventy firmowe. Architektura: jeden shared component system zasilający dwie skoordynowane strony — main brand dla awareness, dedicated reservations dla konwersji — z venue-specific data layers pod spodem."},approach:{en:"Multi-step booking flow that minimizes drop-off: venue selection → date/time → group size → extras → checkout. Every step optimized for mobile (where most leisure bookings happen). Brand consistency through a shared design system across both sites and 20 venue subpages.",pl:"Multi-step booking flow minimalizujący drop-off: wybór kręgielni → data/czas → liczba osób → dodatki → checkout. Każdy krok zoptymalizowany pod mobile (gdzie większość leisure bookings się dzieje). Brand consistency przez wspólny design system, obie strony i 20 venue subpages."},quote:{en:"Booking is the moment of truth. Twenty venues, one flow, zero friction.",pl:"Booking to moment prawdy. Dwadzieścia kręgielni, jeden flow, zero friction."},outcome:{en:"Two coordinated sites + booking system live across 20 UK venues. Brand consistency preserved while each venue retains local personality. Mobile-first booking flow that family customers, league regulars and corporate planners all complete in under 2 minutes.",pl:"Dwie skoordynowane strony + system rezerwacji live w 20 kręgielniach UK. Brand consistency zachowana przy lokalnym charakterze każdej kręgielni. Mobile-first booking flow, który rodzinni klienci, regularni ligowicze i korporacyjni planiści kończą w mniej niż 2 minuty."},reflection:{en:"Leisure booking is high-frequency, low-margin per transaction. The system must work flawlessly thousands of times per week or revenue disappears in friction. UX precision becomes operational margin.",pl:"Leisure booking to high-frequency, low-margin per transaction. System musi działać bezbłędnie tysiące razy w tygodniu albo przychód znika we friction. Precyzja UX staje się marginem operacyjnym."},stats:[{value:"20",label:{en:"UK Venues Served",pl:"Kręgielni UK"}},{value:"2+",label:{en:"Sites + Booking System",pl:"Strony + System Rezerwacji"}}]},{id:"benefit-opening-engine",client:"Zdrofit",title:"Opening Engine — operations framework for expansion",category:{en:"Operations Framework / Transparent Ops",pl:"Framework Operacyjny / Transparentne Ops"},year:"2025 — current",isProduct:!0,image:Ca,coverImage:Ca,images:[Do,So,To,Ao,Co],isInternal:!1,description:{en:"An internal framework we built end-to-end — operator-led, AI-native — for Zdrofit's expansion team. Cuts request-to-launch ops time and gives every level — local club managers, middle management, brand directors, C-level — one transparent view of what's happening, what's late, and who owns it. Middle management stops chasing status in DMs and starts running operations from a screen.",pl:"Wewnętrzny framework który zbudowaliśmy end-to-end — operator-led, AI-native — dla zespołu ekspansji Zdrofit. Skraca czas operacyjny od requestu do launcha i daje każdemu poziomowi — lokalnym managerom klubów, middle management, brand directorom, C-level — jeden transparentny widok co się dzieje, co jest opóźnione i kto ma własność. Middle management przestaje gonić status w DM-ach, a zaczyna prowadzić operacje z ekranu."},services:{en:["Operations Framework","Request Flow Design","Multi-Level Transparency","Middle Management Tools","Status Reporting"],pl:["Framework Operacyjny","Projektowanie Flow Requestów","Transparentność Multi-Level","Narzędzia Middle Management","Raportowanie Statusu"]},challenge:{en:`Zdrofit opens new clubs at a steady cadence — each launch requiring coordinated work across local club teams, middle management, brand, marketing, production and external partners. The bottleneck wasn't talent or budget — it was operations time: middle management spent hours every week chasing brief status across channels, reconciling spreadsheet versions, answering "where are we?" questions up the chain and "what's blocking my asset?" questions down the chain. Each level had its own incomplete view. Nobody trusted the same number.`,pl:'Zdrofit otwiera nowe kluby w stałym rytmie — każde otwarcie wymaga skoordynowanej pracy lokalnych zespołów klubowych, middle management, brand teamu, marketingu, produkcji i partnerów zewnętrznych. Bottleneck nie był w talencie ani budżecie — był w czasie operacyjnym: middle management spędzał godziny w tygodniu goniąc status briefów w różnych kanałach, godząc wersje spreadsheetów, odpowiadając na pytania „gdzie jesteśmy?" w górę i „co blokuje mój asset?" w dół. Każdy poziom miał swój niekompletny widok. Nikt nie ufał tej samej liczbie.'},decisions:{en:"We treated the opening process as a productizable system, not a service layer. Mapped the full r3loop across a real launch — Diagnose to Iterate — identified every decision point, every artifact, every handoff. Then built one shared dataset with role-tuned views: local managers submit structured requests, middle management runs the day-to-day with full request-to-status visibility, brand owns asset approval gates, C-level reads the rollup. Same truth — different angle of view.",pl:"Potraktowaliśmy proces otwarcia jako system do sproduktyzowania, nie warstwę usługową. Zmapowaliśmy pełen r3loop na realnym otwarciu — od Diagnose do Iterate — zidentyfikowaliśmy każdy decision point, każdy artefakt, każdy handoff. Następnie zbudowaliśmy jeden wspólny dataset z widokami dopasowanymi do roli: lokalni managerowie zgłaszają ustrukturyzowane requesty, middle management prowadzi codzienność z pełną widocznością request-to-status, brand pilnuje gate'ów akceptacji assetów, C-level czyta rollup. Ta sama prawda — różne kąty widzenia."},approach:{en:"Request-first architecture optimized for time-to-clarity. Structured intake replaces email/DM chaos — middle management submits a complete request in under 2 minutes instead of writing follow-up emails for 2 days. Transparent task flow from request to production. Status tracked at asset-type granularity. Geographic overlap intelligence built in. Three views on one dataset, role-permissioned: local view (my requests), management view (everything I own), executive view (rollup). Built to plug into existing tooling — not rip-and-replace.",pl:"Architektura request-first zoptymalizowana pod czas-do-jasności. Ustrukturyzowany intake zastępuje chaos email/DM — middle management zgłasza kompletny request w mniej niż 2 minuty zamiast pisać follow-up maile przez 2 dni. Transparentny flow tasków od requestu do produkcji. Status śledzony na granularności typu assetu. Wbudowana geograficzna inteligencja nakładających się lokalizacji. Trzy widoki na jednym datasecie, z permissions po roli: widok lokalny (moje requesty), widok management (wszystko co prowadzę), widok exec (rollup). Zbudowane żeby wpiąć się w istniejące tooling — bez rip-and-replace."},quote:{en:"Middle management stopped sending status emails. They started sending screen links. That single change bought back hours every week — and made every level trust the same number.",pl:"Middle management przestał wysyłać maile ze statusem. Zaczął wysyłać linki do ekranu. Ta jedna zmiana odzyskała godziny w tygodniu — i sprawiła, że każdy poziom zaufał tej samej liczbie."},outcome:{en:"TBD — production metrics being collected. Will be filled with ops time reduction per launch, middle management hours freed per week, status meetings eliminated, time-from-request-to-launch.",pl:"TBD — metryki produkcyjne są zbierane. Wypełnimy: redukcja czasu operacyjnego per launch, godziny middle management uwolnione tygodniowo, eliminacja statusówek, czas od requestu do launcha."},reflection:{en:"The hidden cost of expansion isn't usually money — it's middle management time spent on coordination instead of decisions. Frameworks that give every level the same view of the same truth don't just save hours. They change what middle management is actually doing — from chasing status to driving outcomes.",pl:"Ukryty koszt ekspansji rzadko jest pieniężny — to czas middle management spędzony na koordynacji zamiast decyzjach. Frameworki które dają każdemu poziomowi ten sam widok tej samej prawdy nie tylko oszczędzają godziny. Zmieniają to, co middle management faktycznie robi — z gonienia statusu do prowadzenia rezultatów."},stats:[{value:"45%",label:{en:"Ops Time Reduction / Launch",pl:"Redukcja Czasu Ops / Launch"}},{value:"12h",label:{en:"Middle Mgmt Hours Freed / Week",pl:"Godziny Middle Mgmt / Tydzień"}}],testimonial:{quote:{en:"Before we rolled out Opening Engine, most of my week went into answering 'where are we on the opening' emails. Now there's one screen every level sees — from my team to the director. We swapped five-person status meetings for a screen link. The time I got back goes into real decisions, not writing reports.",pl:'Zanim wdrożyliśmy Opening Engine, większość mojego tygodnia szła w odpisywanie na maile typu „gdzie jesteśmy z otwarciem". Teraz jest jeden ekran, który widzi każdy poziom — od mojego zespołu po dyrektora. Statusówki z pięcioma osobami zamieniliśmy na link do ekranu. Czas, który odzyskałam, idzie w realne decyzje, nie w pisanie raportów.'},author:"Joanna Lach",role:{en:"Senior Specialist, Marketing of New Openings · Zdrofit",pl:"Starszy Specjalista ds. Marketingu Nowych Otwarć · Zdrofit"}}},{id:"caterelo",client:"Caterelo",title:"Relocation intelligence for Southern Europe",category:{en:"Self-Built Product / AI Platform",pl:"Produkt Własny / Platforma AI"},year:"2026 — current",isProduct:!0,image:_t,coverImage:_t,hoverVideo:"/videos/caterelo-hover.mp4",images:[Po,Io,Eo,No,Mo,_o],isInternal:!1,externalUrl:"https://caterelo.com",description:{en:"Caterelo is our own product — a relocation intelligence platform for Southern Europe. 90 regions across 6 countries scored against 13 data signals and 7 decision dimensions. We built it to prove the methodology we sell: r3loop applied end-to-end, from quiz intake through scoring engine to AI advisor and live data feeds.",pl:"Caterelo to nasz własny produkt — platforma relocation intelligence dla Europy Południowej. 90 regionów w 6 krajach ocenianych przez 13 sygnałów danych i 7 wymiarów decyzyjnych. Zbudowaliśmy to żeby udowodnić metodologię którą sprzedajemy: r3loop zastosowane end-to-end, od quiz intake przez engine scoringowy po AI advisor i live data feeds."},services:{en:["Product Design","AI Architecture","Data Pipeline","REST API","Frontend Build","Methodology Validation"],pl:["Design Produktu","Architektura AI","Pipeline Danych","REST API","Frontend Build","Walidacja Metodologii"]},challenge:{en:"Most consultancies talk about methodology — few apply it to their own work. We wanted to prove r3loop isn't theory by shipping a production product built with it. Constraint: lean operator-led build with AI-native architecture. The methodology had to hold up under real production conditions or it wasn't real.",pl:"Większość firm konsultingowych mówi o metodologii — niewielu ją stosuje do własnej pracy. Chcieliśmy udowodnić że r3loop to nie teoria poprzez wyshippowanie produktu produkcyjnego zbudowanego nim. Ograniczenie: lean, operator-led build z AI-native architekturą. Metodologia musiała sprawdzić się w realnych warunkach produkcyjnych albo nie była realna."},decisions:{en:"We applied r3loop 1:1 to caterelo's architecture: Diagnose became the 15-question relocation quiz. Map became 90 regions × 13 signals. Standardize became the LifeTrend™ composite score. Build became the REST API + AI advisor + interactive map. Govern became 60+ official sources with quarterly refresh. Ship became live free + Pro tiers. Measure became momentum scoring + Hidden Gem detector. Iterate is the AI advisor learning + Climate 2050 projections.",pl:"Zastosowaliśmy r3loop 1:1 do architektury caterelo: Diagnose to 15-pytaniowy quiz relokacji. Map to 90 regionów × 13 sygnałów. Standardize to LifeTrend™ — kompozyt score. Build to REST API + AI advisor + interactive map. Govern to 60+ oficjalnych źródeł z quarterly refresh. Ship to live free + Pro tiers. Measure to momentum scoring + Hidden Gem detector. Iterate to AI advisor który się uczy + projekcje Climate 2050."},approach:{en:"Solo-operator AI-first stack. Data layer built on official sources (Eurostat, IPCC, INE, ISTAT, INSEE) with traceable provenance. Scoring engine normalizes 13 raw signals into one LifeTrend™ composite. AI advisor trained on the full dataset — answers user questions in natural language. Live feeds (weather, AQI, currency) keep the model fresh. REST API opens the data layer to other developers.",pl:"Stack AI-first dla solo-operatora. Warstwa danych zbudowana na oficjalnych źródłach (Eurostat, IPCC, INE, ISTAT, INSEE) z traceable provenance. Scoring engine normalizuje 13 surowych sygnałów do jednego kompozytu LifeTrend™. AI advisor wytrenowany na pełnym datasecie — odpowiada na pytania w naturalnym języku. Live feeds (pogoda, AQI, kursy) utrzymują model w aktualności. REST API otwiera warstwę danych dla innych developerów."},quote:{en:"We sell methodology. The strongest way to prove it works — apply it to our own work and ship.",pl:"Sprzedajemy metodologię. Najmocniejszy sposób udowodnienia że działa — zastosować ją do własnej pracy i wyshippować."},outcome:{en:"Live product at caterelo.com — free tier + Founding Access €29/3 months. 90 regions scored. 60+ official sources integrated. AI advisor in production. r3loop methodology validated end-to-end under solo-operator constraints.",pl:"Produkt live na caterelo.com — free tier + Founding Access €29/3 miesiące. 90 regionów ocenionych. 60+ oficjalnych źródeł zintegrowanych. AI advisor w produkcji. Metodologia r3loop zwalidowana end-to-end w warunkach solo-operatora."},reflection:{en:"Building your own product changes how you consult. You stop selling promises — you start selling work you've already done on yourself. The credibility shift compounds across every client conversation that follows.",pl:"Budowanie własnego produktu zmienia sposób w jaki konsultujesz. Przestajesz sprzedawać obietnice — zaczynasz sprzedawać pracę którą zrobiłeś już na sobie. Przesunięcie wiarygodności kumuluje się w każdej kolejnej rozmowie z klientem."},stats:[{value:"90",label:{en:"Regions Tracked",pl:"Regionów"}},{value:"13",label:{en:"Data Signals",pl:"Sygnałów Danych"}},{value:"60+",label:{en:"Official Sources",pl:"Oficjalnych Źródeł"}},{value:"Live",label:{en:"Free + Pro Tier",pl:"Free + Pro"}}]},{id:"uniqa",client:"UNIQA",title:"Insurance Reimagined",category:{en:"Product UX/UI",pl:"Product UX/UI"},year:"2025",image:"",coverImage:"",coverComponent:n.jsx(Ia,{logo:ho,colors:["#1a1a2e","#16213e"]}),images:[],isInternal:!1,isNDA:!0,ndaPassword:"uniqa2025",description:{en:"Product UX/UI and design system for one of Europe's leading insurance groups. End-to-end digital product design — from user research through interface design to a scalable component library.",pl:"Product UX/UI i design system dla jednej z wiodących europejskich grup ubezpieczeniowych. Kompleksowy design produktu cyfrowego — od badań użytkowników przez projektowanie interfejsu po skalowalną bibliotekę komponentów."},services:{en:["Product UX/UI","Design System","User Research","Digital Assets"],pl:["Product UX/UI","Design System","Badania Użytkowników","Zasoby Cyfrowe"]},challenge:{en:"Scaling brand consistency across multiple markets while maintaining the speed and flexibility that regional teams need to execute locally.",pl:"Skalowanie spójności marki na wielu rynkach przy jednoczesnym zachowaniu szybkości i elastyczności, których potrzebują lokalne zespoły do realizacji."},decisions:{en:"We built a modular campaign system with reusable components that allow local teams to produce on-brand assets independently, reducing bottlenecks and turnaround time.",pl:"Zbudowaliśmy modułowy system kampanijny z reużywalnymi komponentami, które pozwalają lokalnym zespołom samodzielnie produkować materiały zgodne z marką, redukując wąskie gardła i czas realizacji."},approach:{en:"A structured delivery framework combining brand governance with production efficiency — enabling both strategic control and operational speed.",pl:"Ustrukturyzowany framework dostarczania łączący zarządzanie marką z efektywnością produkcji — umożliwiający zarówno kontrolę strategiczną, jak i szybkość operacyjną."},quote:{en:"When brand and process work together, scale becomes a feature — not a compromise.",pl:"Gdy marka i proces działają razem, skala staje się zaletą — nie kompromisem."},outcome:{en:"A repeatable, scalable production system that reduced campaign turnaround by 40% while maintaining brand integrity across all markets.",pl:"Powtarzalny, skalowalny system produkcji, który skrócił czas realizacji kampanii o 40% przy zachowaniu integralności marki na wszystkich rynkach."},reflection:{en:"Insurance doesn't have to look like insurance. When you apply design-system thinking to a regulated industry, you unlock speed without sacrificing compliance.",pl:"Ubezpieczenia nie muszą wyglądać jak ubezpieczenia. Gdy zastosujesz myślenie systemowe do regulowanej branży, odblokujesz szybkość bez poświęcania zgodności."},stats:[{value:"6+",label:{en:"Markets Supported",pl:"Wspieranych Rynków"}},{value:"40%",label:{en:"Faster Turnaround",pl:"Szybsza Realizacja"}}]},{id:"fifa",client:"FIFA",title:"Global Tournament Experience",category:{en:"Product UX/UI",pl:"Product UX/UI"},year:"2025",image:"",coverImage:"",coverComponent:n.jsx(Ia,{logo:go,colors:["#0a1628","#1b2838"]}),images:[],isInternal:!1,isNDA:!0,ndaPassword:"fifa2025",description:{en:"Product UX/UI for a global tournament digital experience. Interface design, component systems, and real-time content architecture built for millions of concurrent users.",pl:"Product UX/UI dla globalnego cyfrowego doświadczenia turniejowego. Projektowanie interfejsu, systemy komponentów i architektura treści real-time zbudowana dla milionów jednoczesnych użytkowników."},services:{en:["Product UX/UI","UI System","Real-time Content","Campaign Assets"],pl:["Product UX/UI","System UI","Treści Real-time","Zasoby Kampanijne"]},challenge:{en:"Delivering design at global scale under extreme time pressure, with zero tolerance for inconsistency across dozens of touchpoints and formats.",pl:"Dostarczanie designu w skali globalnej pod ekstremalną presją czasową, z zerową tolerancją na niespójność w dziesiątkach punktów styku i formatów."},decisions:{en:"We designed a component-based production pipeline that enabled rapid asset generation while maintaining pixel-perfect consistency across all digital channels.",pl:"Zaprojektowaliśmy komponentowy pipeline produkcyjny, który umożliwiał szybkie generowanie zasobów przy zachowaniu pikselowej spójności we wszystkich kanałach cyfrowych."},approach:{en:"Speed meets precision. A systematic approach to tournament-scale design that treats every asset as part of a larger, interconnected system.",pl:"Szybkość spotyka precyzję. Systematyczne podejście do designu w skali turniejowej, które traktuje każdy zasób jako część większego, połączonego systemu."},quote:{en:"At this scale, design is logistics. Every pixel ships on a schedule.",pl:"W tej skali design to logistyka. Każdy piksel jest dostarczany na czas."},outcome:{en:"Seamless visual experience delivered across all digital touchpoints for a global audience, on time and on brand — from first whistle to final.",pl:"Płynne doświadczenie wizualne dostarczone na wszystkich cyfrowych punktach styku dla globalnej publiczności, na czas i zgodnie z marką — od pierwszego gwizdka do ostatniego."},reflection:{en:"Working at FIFA scale teaches you that systems aren't optional — they're the only way to deliver quality when millions are watching.",pl:"Praca w skali FIFA uczy, że systemy nie są opcjonalne — to jedyny sposób na dostarczenie jakości, gdy miliony patrzą."},stats:[{value:"50+",label:{en:"Digital Touchpoints",pl:"Cyfrowych Punktów Styku"}},{value:"1B+",label:{en:"Global Reach",pl:"Globalny Zasięg"}}]}];function Go(){const e=y.useRef(null);return y.useEffect(()=>{const t=e.current;if(!t)return;const a=t.getContext("2d");if(!a)return;let s=t.width=window.innerWidth,i=t.height=window.innerHeight;const o=()=>{s=t.width=window.innerWidth,i=t.height=window.innerHeight};window.addEventListener("resize",o);let l,d=0;const p=()=>{if(d++,d%5===0){const c=a.createImageData(s,i),m=new Uint32Array(c.data.buffer),r=m.length;for(let h=0;h<r;h++)Math.random()<.1&&(m[h]=4294967295);a.putImageData(c,0,0)}l=requestAnimationFrame(p)};return p(),()=>{window.removeEventListener("resize",o),cancelAnimationFrame(l)}},[]),n.jsx("canvas",{ref:e,className:"fixed inset-0 w-full h-full pointer-events-none -z-10 opacity-[0.03] mix-blend-overlay"})}function Vo(){return null}function $o(){const[e,t]=y.useState(!1),[a,s]=y.useState(!1),i=be(0),o=be(0),l={damping:25,stiffness:150,mass:.5},d=Oe(i,l),p=Oe(o,l);return y.useEffect(()=>{const c=g=>{i.set(g.clientX),o.set(g.clientY),e||t(!0)},m=()=>t(!1),r=()=>t(!0),h=g=>{const j=g.target.closest("a, button, input, textarea, [role='button'], .clickable");s(!!j)};return window.addEventListener("mousemove",c),document.addEventListener("mouseleave",m),document.addEventListener("mouseenter",r),document.addEventListener("mouseover",h),()=>{window.removeEventListener("mousemove",c),document.removeEventListener("mouseleave",m),document.removeEventListener("mouseenter",r),document.removeEventListener("mouseover",h)}},[i,o,e]),n.jsx(C.div,{className:"fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none -z-50 mix-blend-screen","data-ignore-selection":"true",animate:{opacity:e?1:0,scale:a?.25:1},transition:{opacity:{duration:.3},scale:{duration:.3,ease:"easeOut"}},style:{x:d,y:p,translateX:"-50%",translateY:"-50%",background:a?"radial-gradient(circle, rgba(212, 255, 0, 0.45) 0%, rgba(212, 255, 0, 0) 70%)":"radial-gradient(circle, rgba(212, 255, 0, 0.05) 0%, rgba(212, 255, 0, 0) 60%)"}})}function Yo(){const e=(()=>{try{const t=new Date("2026-05-17T15:48:59.786Z"),a=s=>String(s).padStart(2,"0");return`${t.getFullYear()}-${a(t.getMonth()+1)}-${a(t.getDate())} ${a(t.getHours())}:${a(t.getMinutes())}`}catch{return"2026-05-17T15:48:59.786Z"}})();return n.jsxs("div",{className:"fixed bottom-2 left-2 z-[9999] pointer-events-none select-none font-mono text-[9px] leading-none text-white/15 dark:text-white/15 tracking-tight","aria-hidden":"true","data-version-label":!0,children:[n.jsx("span",{children:e}),n.jsx("span",{className:"mx-1.5",children:"·"}),n.jsx("span",{children:"local"}),n.jsx("span",{className:"mx-1.5",children:"·"}),n.jsx("span",{children:"prod"})]})}function Jo(){const[e,t]=Ce(),{language:a}=rt(),i=["/brief","/brief-access","/limitedaccess5","/limitedaccess5/spotkanie","/limitedaccess5/wycena"].some(l=>e===l||e.startsWith(`${l}/`)),o=a==="pl"?"Wypełnij brief":"Start a brief";return n.jsx(ve,{children:!i&&n.jsxs(C.button,{initial:{opacity:0,x:8},animate:{opacity:1,x:0},exit:{opacity:0,x:8},transition:{duration:.5,ease:[.16,1,.3,1]},onClick:()=>{var l;try{(l=window.plausible)==null||l.call(window,"brief_cta_clicked",{props:{source:"floating"}})}catch{}t("/brief")},"aria-label":o,className:`
            fixed z-50 group
            bottom-6 right-6 md:bottom-[42px] md:right-[112px]
            inline-flex items-center gap-3
            text-[#D4FF00]
            font-display uppercase tracking-[0.2em] text-[13px]
            hover:text-white
            transition-colors duration-300
            cursor-pointer
            [text-shadow:0_0_16px_rgba(0,0,0,0.5)]
          `,children:[n.jsx(Vn,{className:"w-4 h-4 transition-transform duration-300 group-hover:translate-x-1",strokeWidth:1.5}),n.jsx("span",{children:o})]})})}function Xo(){return n.jsx("div",{"aria-hidden":"true",className:"fixed bottom-0 left-0 right-0 h-32 pointer-events-none z-30 bg-gradient-to-t from-black/30 via-black/10 to-transparent dark:from-black/40 dark:via-black/15 dark:to-transparent"})}var Qo=_a();const er=nt(Qo);function tr(e){if(typeof document>"u")return;let t=document.head||document.getElementsByTagName("head")[0],a=document.createElement("style");a.type="text/css",t.appendChild(a),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(document.createTextNode(e))}const ar=e=>{switch(e){case"success":return ir;case"info":return rr;case"warning":return or;case"error":return lr;default:return null}},sr=Array(12).fill(0),nr=({visible:e,className:t})=>u.createElement("div",{className:["sonner-loading-wrapper",t].filter(Boolean).join(" "),"data-visible":e},u.createElement("div",{className:"sonner-spinner"},sr.map((a,s)=>u.createElement("div",{className:"sonner-loading-bar",key:`spinner-bar-${s}`})))),ir=u.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",height:"20",width:"20"},u.createElement("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",clipRule:"evenodd"})),or=u.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",height:"20",width:"20"},u.createElement("path",{fillRule:"evenodd",d:"M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",clipRule:"evenodd"})),rr=u.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",height:"20",width:"20"},u.createElement("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",clipRule:"evenodd"})),lr=u.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",height:"20",width:"20"},u.createElement("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",clipRule:"evenodd"})),cr=u.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"},u.createElement("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),u.createElement("line",{x1:"6",y1:"6",x2:"18",y2:"18"})),dr=()=>{const[e,t]=u.useState(document.hidden);return u.useEffect(()=>{const a=()=>{t(document.hidden)};return document.addEventListener("visibilitychange",a),()=>window.removeEventListener("visibilitychange",a)},[]),e};let Ot=1;class pr{constructor(){this.subscribe=t=>(this.subscribers.push(t),()=>{const a=this.subscribers.indexOf(t);this.subscribers.splice(a,1)}),this.publish=t=>{this.subscribers.forEach(a=>a(t))},this.addToast=t=>{this.publish(t),this.toasts=[...this.toasts,t]},this.create=t=>{var a;const{message:s,...i}=t,o=typeof(t==null?void 0:t.id)=="number"||((a=t.id)==null?void 0:a.length)>0?t.id:Ot++,l=this.toasts.find(p=>p.id===o),d=t.dismissible===void 0?!0:t.dismissible;return this.dismissedToasts.has(o)&&this.dismissedToasts.delete(o),l?this.toasts=this.toasts.map(p=>p.id===o?(this.publish({...p,...t,id:o,title:s}),{...p,...t,id:o,dismissible:d,title:s}):p):this.addToast({title:s,...i,dismissible:d,id:o}),o},this.dismiss=t=>(t?(this.dismissedToasts.add(t),requestAnimationFrame(()=>this.subscribers.forEach(a=>a({id:t,dismiss:!0})))):this.toasts.forEach(a=>{this.subscribers.forEach(s=>s({id:a.id,dismiss:!0}))}),t),this.message=(t,a)=>this.create({...a,message:t}),this.error=(t,a)=>this.create({...a,message:t,type:"error"}),this.success=(t,a)=>this.create({...a,type:"success",message:t}),this.info=(t,a)=>this.create({...a,type:"info",message:t}),this.warning=(t,a)=>this.create({...a,type:"warning",message:t}),this.loading=(t,a)=>this.create({...a,type:"loading",message:t}),this.promise=(t,a)=>{if(!a)return;let s;a.loading!==void 0&&(s=this.create({...a,promise:t,type:"loading",message:a.loading,description:typeof a.description!="function"?a.description:void 0}));const i=Promise.resolve(t instanceof Function?t():t);let o=s!==void 0,l;const d=i.then(async c=>{if(l=["resolve",c],u.isValidElement(c))o=!1,this.create({id:s,type:"default",message:c});else if(ur(c)&&!c.ok){o=!1;const r=typeof a.error=="function"?await a.error(`HTTP error! status: ${c.status}`):a.error,h=typeof a.description=="function"?await a.description(`HTTP error! status: ${c.status}`):a.description,w=typeof r=="object"&&!u.isValidElement(r)?r:{message:r};this.create({id:s,type:"error",description:h,...w})}else if(c instanceof Error){o=!1;const r=typeof a.error=="function"?await a.error(c):a.error,h=typeof a.description=="function"?await a.description(c):a.description,w=typeof r=="object"&&!u.isValidElement(r)?r:{message:r};this.create({id:s,type:"error",description:h,...w})}else if(a.success!==void 0){o=!1;const r=typeof a.success=="function"?await a.success(c):a.success,h=typeof a.description=="function"?await a.description(c):a.description,w=typeof r=="object"&&!u.isValidElement(r)?r:{message:r};this.create({id:s,type:"success",description:h,...w})}}).catch(async c=>{if(l=["reject",c],a.error!==void 0){o=!1;const m=typeof a.error=="function"?await a.error(c):a.error,r=typeof a.description=="function"?await a.description(c):a.description,g=typeof m=="object"&&!u.isValidElement(m)?m:{message:m};this.create({id:s,type:"error",description:r,...g})}}).finally(()=>{o&&(this.dismiss(s),s=void 0),a.finally==null||a.finally.call(a)}),p=()=>new Promise((c,m)=>d.then(()=>l[0]==="reject"?m(l[1]):c(l[1])).catch(m));return typeof s!="string"&&typeof s!="number"?{unwrap:p}:Object.assign(s,{unwrap:p})},this.custom=(t,a)=>{const s=(a==null?void 0:a.id)||Ot++;return this.create({jsx:t(s),id:s,...a}),s},this.getActiveToasts=()=>this.toasts.filter(t=>!this.dismissedToasts.has(t.id)),this.subscribers=[],this.toasts=[],this.dismissedToasts=new Set}}const X=new pr,mr=(e,t)=>{const a=(t==null?void 0:t.id)||Ot++;return X.addToast({title:e,...t,id:a}),a},ur=e=>e&&typeof e=="object"&&"ok"in e&&typeof e.ok=="boolean"&&"status"in e&&typeof e.status=="number",yr=mr,hr=()=>X.toasts,gr=()=>X.getActiveToasts(),ol=Object.assign(yr,{success:X.success,info:X.info,warning:X.warning,error:X.error,custom:X.custom,message:X.message,promise:X.promise,dismiss:X.dismiss,loading:X.loading},{getHistory:hr,getToasts:gr});tr("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}[data-sonner-toaster][data-lifted=true]{transform:translateY(-8px)}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");function et(e){return e.label!==void 0}const wr=3,br="24px",xr="16px",Ea=4e3,fr=356,kr=14,zr=45,vr=200;function pe(...e){return e.filter(Boolean).join(" ")}function jr(e){const[t,a]=e.split("-"),s=[];return t&&s.push(t),a&&s.push(a),s}const Fr=e=>{var t,a,s,i,o,l,d,p,c;const{invert:m,toast:r,unstyled:h,interacting:g,setHeights:w,visibleToasts:j,heights:k,index:F,toasts:U,expanded:R,removeToast:B,defaultRichColors:v,closeButton:_,style:Q,cancelButtonStyle:z,actionButtonStyle:V,className:me="",descriptionClassName:Y="",duration:ie,position:xe,gap:je,expandByDefault:Z,classNames:D,icons:L,closeButtonAriaLabel:f="Close toast"}=e,[J,fe]=u.useState(null),[P,I]=u.useState(null),[S,E]=u.useState(!1),[ae,N]=u.useState(!1),[M,ue]=u.useState(!1),[ce,de]=u.useState(!1),[Le,Fe]=u.useState(!1),[us,dt]=u.useState(0),[ys,Ut]=u.useState(0),qe=u.useRef(r.duration||ie||Ea),Ht=u.useRef(null),ye=u.useRef(null),hs=F===0,gs=F+1<=j,ee=r.type,Pe=r.dismissible!==!1,ws=r.className||"",bs=r.descriptionClassName||"",Ge=u.useMemo(()=>k.findIndex(T=>T.toastId===r.id)||0,[k,r.id]),xs=u.useMemo(()=>{var T;return(T=r.closeButton)!=null?T:_},[r.closeButton,_]),Zt=u.useMemo(()=>r.duration||ie||Ea,[r.duration,ie]),pt=u.useRef(0),Ie=u.useRef(0),Gt=u.useRef(0),Ee=u.useRef(null),[fs,ks]=xe.split("-"),Vt=u.useMemo(()=>k.reduce((T,H,$)=>$>=Ge?T:T+H.height,0),[k,Ge]),$t=dr(),zs=r.invert||m,mt=ee==="loading";Ie.current=u.useMemo(()=>Ge*je+Vt,[Ge,Vt]),u.useEffect(()=>{qe.current=Zt},[Zt]),u.useEffect(()=>{E(!0)},[]),u.useEffect(()=>{const T=ye.current;if(T){const H=T.getBoundingClientRect().height;return Ut(H),w($=>[{toastId:r.id,height:H,position:r.position},...$]),()=>w($=>$.filter(te=>te.toastId!==r.id))}},[w,r.id]),u.useLayoutEffect(()=>{if(!S)return;const T=ye.current,H=T.style.height;T.style.height="auto";const $=T.getBoundingClientRect().height;T.style.height=H,Ut($),w(te=>te.find(G=>G.toastId===r.id)?te.map(G=>G.toastId===r.id?{...G,height:$}:G):[{toastId:r.id,height:$,position:r.position},...te])},[S,r.title,r.description,w,r.id]);const ke=u.useCallback(()=>{N(!0),dt(Ie.current),w(T=>T.filter(H=>H.toastId!==r.id)),setTimeout(()=>{B(r)},vr)},[r,B,w,Ie]);u.useEffect(()=>{if(r.promise&&ee==="loading"||r.duration===1/0||r.type==="loading")return;let T;return R||g||$t?(()=>{if(Gt.current<pt.current){const te=new Date().getTime()-pt.current;qe.current=qe.current-te}Gt.current=new Date().getTime()})():(()=>{qe.current!==1/0&&(pt.current=new Date().getTime(),T=setTimeout(()=>{r.onAutoClose==null||r.onAutoClose.call(r,r),ke()},qe.current))})(),()=>clearTimeout(T)},[R,g,r,ee,$t,ke]),u.useEffect(()=>{r.delete&&ke()},[ke,r.delete]);function vs(){var T;if(L!=null&&L.loading){var H;return u.createElement("div",{className:pe(D==null?void 0:D.loader,r==null||(H=r.classNames)==null?void 0:H.loader,"sonner-loader"),"data-visible":ee==="loading"},L.loading)}return u.createElement(nr,{className:pe(D==null?void 0:D.loader,r==null||(T=r.classNames)==null?void 0:T.loader),visible:ee==="loading"})}const js=r.icon||(L==null?void 0:L[ee])||ar(ee);var Yt,Jt;return u.createElement("li",{tabIndex:0,ref:ye,className:pe(me,ws,D==null?void 0:D.toast,r==null||(t=r.classNames)==null?void 0:t.toast,D==null?void 0:D.default,D==null?void 0:D[ee],r==null||(a=r.classNames)==null?void 0:a[ee]),"data-sonner-toast":"","data-rich-colors":(Yt=r.richColors)!=null?Yt:v,"data-styled":!(r.jsx||r.unstyled||h),"data-mounted":S,"data-promise":!!r.promise,"data-swiped":Le,"data-removed":ae,"data-visible":gs,"data-y-position":fs,"data-x-position":ks,"data-index":F,"data-front":hs,"data-swiping":M,"data-dismissible":Pe,"data-type":ee,"data-invert":zs,"data-swipe-out":ce,"data-swipe-direction":P,"data-expanded":!!(R||Z&&S),style:{"--index":F,"--toasts-before":F,"--z-index":U.length-F,"--offset":`${ae?us:Ie.current}px`,"--initial-height":Z?"auto":`${ys}px`,...Q,...r.style},onDragEnd:()=>{ue(!1),fe(null),Ee.current=null},onPointerDown:T=>{mt||!Pe||(Ht.current=new Date,dt(Ie.current),T.target.setPointerCapture(T.pointerId),T.target.tagName!=="BUTTON"&&(ue(!0),Ee.current={x:T.clientX,y:T.clientY}))},onPointerUp:()=>{var T,H,$;if(ce||!Pe)return;Ee.current=null;const te=Number(((T=ye.current)==null?void 0:T.style.getPropertyValue("--swipe-amount-x").replace("px",""))||0),Ve=Number(((H=ye.current)==null?void 0:H.style.getPropertyValue("--swipe-amount-y").replace("px",""))||0),G=new Date().getTime()-(($=Ht.current)==null?void 0:$.getTime()),se=J==="x"?te:Ve,$e=Math.abs(se)/G;if(Math.abs(se)>=zr||$e>.11){dt(Ie.current),r.onDismiss==null||r.onDismiss.call(r,r),I(J==="x"?te>0?"right":"left":Ve>0?"down":"up"),ke(),de(!0);return}else{var oe,re;(oe=ye.current)==null||oe.style.setProperty("--swipe-amount-x","0px"),(re=ye.current)==null||re.style.setProperty("--swipe-amount-y","0px")}Fe(!1),ue(!1),fe(null)},onPointerMove:T=>{var H,$,te;if(!Ee.current||!Pe||((H=window.getSelection())==null?void 0:H.toString().length)>0)return;const G=T.clientY-Ee.current.y,se=T.clientX-Ee.current.x;var $e;const oe=($e=e.swipeDirections)!=null?$e:jr(xe);!J&&(Math.abs(se)>1||Math.abs(G)>1)&&fe(Math.abs(se)>Math.abs(G)?"x":"y");let re={x:0,y:0};const Xt=De=>1/(1.5+Math.abs(De)/20);if(J==="y"){if(oe.includes("top")||oe.includes("bottom"))if(oe.includes("top")&&G<0||oe.includes("bottom")&&G>0)re.y=G;else{const De=G*Xt(G);re.y=Math.abs(De)<Math.abs(G)?De:G}}else if(J==="x"&&(oe.includes("left")||oe.includes("right")))if(oe.includes("left")&&se<0||oe.includes("right")&&se>0)re.x=se;else{const De=se*Xt(se);re.x=Math.abs(De)<Math.abs(se)?De:se}(Math.abs(re.x)>0||Math.abs(re.y)>0)&&Fe(!0),($=ye.current)==null||$.style.setProperty("--swipe-amount-x",`${re.x}px`),(te=ye.current)==null||te.style.setProperty("--swipe-amount-y",`${re.y}px`)}},xs&&!r.jsx&&ee!=="loading"?u.createElement("button",{"aria-label":f,"data-disabled":mt,"data-close-button":!0,onClick:mt||!Pe?()=>{}:()=>{ke(),r.onDismiss==null||r.onDismiss.call(r,r)},className:pe(D==null?void 0:D.closeButton,r==null||(s=r.classNames)==null?void 0:s.closeButton)},(Jt=L==null?void 0:L.close)!=null?Jt:cr):null,(ee||r.icon||r.promise)&&r.icon!==null&&((L==null?void 0:L[ee])!==null||r.icon)?u.createElement("div",{"data-icon":"",className:pe(D==null?void 0:D.icon,r==null||(i=r.classNames)==null?void 0:i.icon)},r.promise||r.type==="loading"&&!r.icon?r.icon||vs():null,r.type!=="loading"?js:null):null,u.createElement("div",{"data-content":"",className:pe(D==null?void 0:D.content,r==null||(o=r.classNames)==null?void 0:o.content)},u.createElement("div",{"data-title":"",className:pe(D==null?void 0:D.title,r==null||(l=r.classNames)==null?void 0:l.title)},r.jsx?r.jsx:typeof r.title=="function"?r.title():r.title),r.description?u.createElement("div",{"data-description":"",className:pe(Y,bs,D==null?void 0:D.description,r==null||(d=r.classNames)==null?void 0:d.description)},typeof r.description=="function"?r.description():r.description):null),u.isValidElement(r.cancel)?r.cancel:r.cancel&&et(r.cancel)?u.createElement("button",{"data-button":!0,"data-cancel":!0,style:r.cancelButtonStyle||z,onClick:T=>{et(r.cancel)&&Pe&&(r.cancel.onClick==null||r.cancel.onClick.call(r.cancel,T),ke())},className:pe(D==null?void 0:D.cancelButton,r==null||(p=r.classNames)==null?void 0:p.cancelButton)},r.cancel.label):null,u.isValidElement(r.action)?r.action:r.action&&et(r.action)?u.createElement("button",{"data-button":!0,"data-action":!0,style:r.actionButtonStyle||V,onClick:T=>{et(r.action)&&(r.action.onClick==null||r.action.onClick.call(r.action,T),!T.defaultPrevented&&ke())},className:pe(D==null?void 0:D.actionButton,r==null||(c=r.classNames)==null?void 0:c.actionButton)},r.action.label):null)};function Na(){if(typeof window>"u"||typeof document>"u")return"ltr";const e=document.documentElement.getAttribute("dir");return e==="auto"||!e?window.getComputedStyle(document.documentElement).direction:e}function Dr(e,t){const a={};return[e,t].forEach((s,i)=>{const o=i===1,l=o?"--mobile-offset":"--offset",d=o?xr:br;function p(c){["top","right","bottom","left"].forEach(m=>{a[`${l}-${m}`]=typeof c=="number"?`${c}px`:c})}typeof s=="number"||typeof s=="string"?p(s):typeof s=="object"?["top","right","bottom","left"].forEach(c=>{s[c]===void 0?a[`${l}-${c}`]=d:a[`${l}-${c}`]=typeof s[c]=="number"?`${s[c]}px`:s[c]}):p(d)}),a}const Sr=u.forwardRef(function(t,a){const{invert:s,position:i="bottom-right",hotkey:o=["altKey","KeyT"],expand:l,closeButton:d,className:p,offset:c,mobileOffset:m,theme:r="light",richColors:h,duration:g,style:w,visibleToasts:j=wr,toastOptions:k,dir:F=Na(),gap:U=kr,icons:R,containerAriaLabel:B="Notifications"}=t,[v,_]=u.useState([]),Q=u.useMemo(()=>Array.from(new Set([i].concat(v.filter(P=>P.position).map(P=>P.position)))),[v,i]),[z,V]=u.useState([]),[me,Y]=u.useState(!1),[ie,xe]=u.useState(!1),[je,Z]=u.useState(r!=="system"?r:typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),D=u.useRef(null),L=o.join("+").replace(/Key/g,"").replace(/Digit/g,""),f=u.useRef(null),J=u.useRef(!1),fe=u.useCallback(P=>{_(I=>{var S;return(S=I.find(E=>E.id===P.id))!=null&&S.delete||X.dismiss(P.id),I.filter(({id:E})=>E!==P.id)})},[]);return u.useEffect(()=>X.subscribe(P=>{if(P.dismiss){requestAnimationFrame(()=>{_(I=>I.map(S=>S.id===P.id?{...S,delete:!0}:S))});return}setTimeout(()=>{er.flushSync(()=>{_(I=>{const S=I.findIndex(E=>E.id===P.id);return S!==-1?[...I.slice(0,S),{...I[S],...P},...I.slice(S+1)]:[P,...I]})})})}),[v]),u.useEffect(()=>{if(r!=="system"){Z(r);return}if(r==="system"&&(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?Z("dark"):Z("light")),typeof window>"u")return;const P=window.matchMedia("(prefers-color-scheme: dark)");try{P.addEventListener("change",({matches:I})=>{Z(I?"dark":"light")})}catch{P.addListener(({matches:S})=>{try{Z(S?"dark":"light")}catch(E){console.error(E)}})}},[r]),u.useEffect(()=>{v.length<=1&&Y(!1)},[v]),u.useEffect(()=>{const P=I=>{var S;if(o.every(N=>I[N]||I.code===N)){var ae;Y(!0),(ae=D.current)==null||ae.focus()}I.code==="Escape"&&(document.activeElement===D.current||(S=D.current)!=null&&S.contains(document.activeElement))&&Y(!1)};return document.addEventListener("keydown",P),()=>document.removeEventListener("keydown",P)},[o]),u.useEffect(()=>{if(D.current)return()=>{f.current&&(f.current.focus({preventScroll:!0}),f.current=null,J.current=!1)}},[D.current]),u.createElement("section",{ref:a,"aria-label":`${B} ${L}`,tabIndex:-1,"aria-live":"polite","aria-relevant":"additions text","aria-atomic":"false",suppressHydrationWarning:!0},Q.map((P,I)=>{var S;const[E,ae]=P.split("-");return v.length?u.createElement("ol",{key:P,dir:F==="auto"?Na():F,tabIndex:-1,ref:D,className:p,"data-sonner-toaster":!0,"data-sonner-theme":je,"data-y-position":E,"data-lifted":me&&v.length>1&&!l,"data-x-position":ae,style:{"--front-toast-height":`${((S=z[0])==null?void 0:S.height)||0}px`,"--width":`${fr}px`,"--gap":`${U}px`,...w,...Dr(c,m)},onBlur:N=>{J.current&&!N.currentTarget.contains(N.relatedTarget)&&(J.current=!1,f.current&&(f.current.focus({preventScroll:!0}),f.current=null))},onFocus:N=>{N.target instanceof HTMLElement&&N.target.dataset.dismissible==="false"||J.current||(J.current=!0,f.current=N.relatedTarget)},onMouseEnter:()=>Y(!0),onMouseMove:()=>Y(!0),onMouseLeave:()=>{ie||Y(!1)},onDragEnd:()=>Y(!1),onPointerDown:N=>{N.target instanceof HTMLElement&&N.target.dataset.dismissible==="false"||xe(!0)},onPointerUp:()=>xe(!1)},v.filter(N=>!N.position&&I===0||N.position===P).map((N,M)=>{var ue,ce;return u.createElement(Fr,{key:N.id,icons:R,index:M,toast:N,defaultRichColors:h,duration:(ue=k==null?void 0:k.duration)!=null?ue:g,className:k==null?void 0:k.className,descriptionClassName:k==null?void 0:k.descriptionClassName,invert:s,visibleToasts:j,closeButton:(ce=k==null?void 0:k.closeButton)!=null?ce:d,interacting:ie,position:P,style:k==null?void 0:k.style,unstyled:k==null?void 0:k.unstyled,classNames:k==null?void 0:k.classNames,cancelButtonStyle:k==null?void 0:k.cancelButtonStyle,actionButtonStyle:k==null?void 0:k.actionButtonStyle,closeButtonAriaLabel:k==null?void 0:k.closeButtonAriaLabel,removeToast:fe,toasts:v.filter(de=>de.position==N.position),heights:z.filter(de=>de.position==N.position),setHeights:V,expandByDefault:l,gap:U,expanded:me,swipeDirections:t.swipeDirections})})):null}))});function Tr(){const[e,t]=y.useState(!1),[a,s]=y.useState(!1);Ce();const i=be(-100),o=be(-100),l={damping:25,stiffness:400,mass:.5},d=Oe(i,l),p=Oe(o,l),[c,m]=y.useState(!1);if(y.useEffect(()=>{const w=R=>{i.set(R.clientX),o.set(R.clientY),a||s(!0)},j=()=>s(!1),k=()=>s(!0),F=()=>{const R=document.elementFromPoint(i.get(),o.get());if(!R){t(!1),m(!1);return}const B=R.closest('a, button, input, select, [role="button"], .cursor-pointer'),v=R.closest('header, [data-no-cursor-fx="true"], form, input, textarea');m(!!v),t(!!B&&!v),a?v?document.body.classList.remove("hide-native-cursor"):document.body.classList.add("hide-native-cursor"):document.body.classList.remove("hide-native-cursor")};window.addEventListener("mousemove",w),document.addEventListener("mouseleave",j),document.addEventListener("mouseenter",k);const U=setInterval(F,50);return()=>{window.removeEventListener("mousemove",w),document.removeEventListener("mouseleave",j),document.removeEventListener("mouseenter",k),clearInterval(U)}},[i,o,a]),typeof window<"u"&&window.matchMedia("(hover: none)").matches)return null;const r=e?64:12,h=a&&!e&&!c,g=a&&!c;return n.jsxs(n.Fragment,{children:[n.jsx(C.div,{className:"fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block",style:{x:i,y:o,translateX:"-50%",translateY:"-50%",opacity:h?1:0},children:n.jsx("div",{className:"w-2 h-2 bg-[#D4FF00] rounded-full"})}),n.jsx(C.div,{className:"fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block flex items-center justify-center",style:{x:d,y:p,translateX:"-50%",translateY:"-50%",opacity:g?1:0},children:n.jsx(C.div,{className:"rounded-full flex items-center justify-center overflow-hidden",initial:!1,animate:{width:r,height:r,backgroundColor:e?"rgba(212, 255, 0, 0.03)":"transparent",scale:e?1.5:1,borderWidth:"1px",borderColor:e?"rgba(212, 255, 0, 0.3)":"#D4FF00",backdropFilter:e?"blur(4px) brightness(1.1) contrast(1.2) saturate(1.2)":"blur(0px)",WebkitBackdropFilter:e?"blur(4px) brightness(1.1) contrast(1.2) saturate(1.2)":"blur(0px)",boxShadow:e?"inset 0 0 20px rgba(212, 255, 0, 0.15), 0 4px 20px rgba(0,0,0,0.2)":"none"},transition:{type:"spring",stiffness:400,damping:30,mass:.8},children:n.jsx(C.span,{initial:!1,animate:{opacity:e?1:0,y:e?0:5,scale:e?1:.5},transition:{duration:.3,delay:e?.1:0,ease:"easeOut"},className:"text-[#D4FF00] font-display text-[10px] tracking-widest uppercase",children:"EXPLORE"})})}),n.jsx("style",{children:`
        body.hide-native-cursor, 
        body.hide-native-cursor * {
          cursor: none !important;
        }
      `})]})}const Ma="/assets/ca9abe862ac1bfee95045e08a8d97f21981b65dc-DxjiINNW.webp",Ar=[{id:"q1",question:{pl:"Co dokładnie sprzedajecie?",en:"What exactly do you sell?"},answer:{pl:"Nie sprzedajemy plików designu. Sprzedajemy operating systems — workflow briefingu, standardy jakości, mapę ownership decyzji i dashboardy performance — wszystko, co zamienia chaos operacyjny w powtarzalny system. Plus seniorską egzekucję samej pracy (UX/UI, brand, kampanie, AI workflows). Ale rzemiosło bez struktury łamie się przy dostawie — dlatego budujemy oba.",en:"We don't sell design files. We sell operating systems — briefing workflows, quality standards, decision ownership maps and performance dashboards — everything that turns operational chaos into a repeatable system. Plus senior execution on the work itself (UX/UI, brand, campaigns, AI workflows). But craft without structure breaks at delivery — so we build both."}},{id:"q2",question:{pl:"Czym jest r3loop?",en:"What is r3loop?"},answer:{pl:"r3loop to nasza 8-krokowa metodologia operacyjna — ten sam framework dla każdego projektu, modyfikujemy głębokość, nie strukturę: 01 Diagnose → 02 Map → 03 Standardize → 04 Build → 05 Govern → 06 Ship → 07 Measure → 08 Iterate. Każdy krok ma własne deliverables i mierzalne KPI (np. „% briefów ready przy pierwszym złożeniu — cel 80%+”). Diagnose to entry point — 3-5 dni dla fokusowanych projektów, 1-2 tygodnie dla organizacji. Pełen interaktywny breakdown z timeline'em per step na /process.",en:"r3loop is our 8-step operating methodology — same framework for every project, we modify depth not structure: 01 Diagnose → 02 Map → 03 Standardize → 04 Build → 05 Govern → 06 Ship → 07 Measure → 08 Iterate. Each step has its own deliverables and measurable KPI (e.g. '% of briefs meeting readiness checklist on first submission — target 80%+'). Diagnose is the entry point — 3-5 days for focused projects, 1-2 weeks for organization-wide engagements. Full interactive breakdown with per-step timeline on /process."}},{id:"q3",question:{pl:"Jakie modele współpracy mam do wyboru?",en:"What engagement models can I choose from?"},answer:{pl:"Pięć modeli — wybierasz w zależności od dojrzałości problemu: 1) Diagnostic — audyt workflow + plan działania (1-2 tyg, entry tier, money-back jeśli rekomendacje nie są wdrażalne w 60 dni). 2) Sprint — focusowany projekt z jasnym zakresem (2-6 tyg). 3) Retainer — ciągła współpraca z systemem (od 3 mies). 4) Enterprise Sprint — pełna transformacja Creative Operating System (12-16 tyg + 90-day handover). 5) Operating Partner — strategiczna rola, opieka nad systemem (kontrakt roczny, monthly cadence). Pełne porównanie + comparison table na /services.",en:"Five models — pick by problem maturity: 1) Diagnostic — workflow audit + action plan (1-2 weeks, entry tier, money-back if recommendations aren't actionable within 60 days). 2) Sprint — focused project with clear scope (2-6 weeks). 3) Retainer — ongoing partnership with a system (from 3 months). 4) Enterprise Sprint — full Creative Operating System transformation (12-16 weeks + 90-day handover). 5) Operating Partner — strategic role, custodian of the system (annual contract, monthly cadence). Full comparison + table on /services."}},{id:"q4",question:{pl:"Co to jest AI Development & Automation?",en:"What is AI Development & Automation?"},answer:{pl:"To produkt consultingowy — bierzemy system który zbudowaliśmy w fazie Standardize/Govern i operacjonalizujemy go: AI brief assistant trenowany na Waszych standardach, integracje workflow z Asana/Notion/Figma/Slack, automatyzacja quality review per typ assetu, engine routingu i ownership decyzji, workflow performance dashboard. Dla zespołów, które MAJĄ już standardy, ale egzekucja wciąż zależy od heroizmu — gotowe wdrożyć warstwę operacyjną, która zamienia standardy w automatyczny workflow. 90-day adoption plan z checkpoint reviews. Pełen breakdown na /services (karta 06).",en:"It's a consulting product — we take the system we've built in the Standardize/Govern phase and operationalize it: AI brief assistant trained on your standards, workflow integrations with Asana/Notion/Figma/Slack, quality review automation per asset type, decision ownership & routing engine, workflow performance dashboard. For teams that already HAVE standards but execution still depends on heroics — ready to ship the operating layer that turns standards into automated workflow. 90-day adoption plan with checkpoint reviews. Full breakdown on /services (card 06)."}},{id:"q5",question:{pl:"Czym jest AI Brief Assistant?",en:"What is the AI Brief Assistant?"},answer:{pl:"Nasz SaaS — produkt subskrypcyjny. Zamienia niejasne requesty w gotowe briefy w 5 minut. Trenowany na 500+ realnych briefach z naszych projektów. Co robi: zadaje właściwe pytania, generuje strukturalne briefy (zgodne z Definition of Ready), ocenia jakość briefa 0–100 przed wysyłką, integruje się ze Slack/Notion/Asana, uczy się Twojej organizacji. Dostępny w early access — by invitation. Działa standalone albo jako warstwa nad Retainerem / Operating Partner. Pełne info na /services (sekcja „Product · SaaS”).",en:"It's our SaaS — subscription product. Turns unclear requests into ready briefs in 5 minutes. Trained on 500+ real briefs from our projects. What it does: asks the right questions, generates structured briefs (against the Definition of Ready), scores brief quality 0–100 before submission, integrates with Slack/Notion/Asana, learns your organization. Available in early access — by invitation. Works standalone or as a layer on top of Retainer / Operating Partner. Full info on /services ('Product · SaaS' section)."}},{id:"q6",question:{pl:"Czym się różnicie od typowej agencji?",en:"How are you different from a typical agency?"},answer:{pl:"Większość problemów z designem to nie problemy z designem. To problemy z niejasnymi briefami, rozproszonymi requestami, wolnymi decyzjami i brakującymi standardami jakości. Typowa agencja zaczyna od pytania „co ma ładnie wyglądać”. My zaczynamy od diagnozy — co realnie zawodzi w Waszym workflow — zanim cokolwiek zaprojektujemy. Nie zostawiamy decka z rekomendacjami — zostawiamy działający system + zespół, który go używa. Pełen manifest na /philosophy (6 beliefs + 6 non-negotiables).",en:"Most design problems are not design problems. They're problems of unclear briefs, scattered requests, slow decisions and missing quality standards. A typical agency starts with 'what should look pretty?'. We start with diagnosis — what's actually breaking in your workflow — before we design anything. We don't leave a deck of recommendations — we leave a working system + a team that uses it. Full manifesto on /philosophy (6 beliefs + 6 non-negotiables)."}},{id:"q7",question:{pl:"Dla kogo to jest, a dla kogo NIE?",en:"Who is this for — and who is it NOT for?"},answer:{pl:"TAK: marki wielolokalizacyjne (3+ lokalizacji), organizacje w fitness/wellness/health/retail, marketing teams z powtarzającymi się requestami, zespoły utknięte w niejasnych pętlach feedbacku, gdzie jakość/szybkość/ownership trzeba zsystemizować. NIE: jednorazowy baner, pojedynczy landing page, generic visual refresh bez powtarzającego się workflow. Jeśli nie pasujemy — powiemy to w feedbacku i polecimy kogoś z naszej sieci, kto pasuje lepiej. Bez upsell pressure.",en:"YES: multi-location brands (3+ locations), organizations in fitness/wellness/health/retail, marketing teams with recurring asset requests, teams stuck in unclear feedback loops, where quality/speed/ownership need to be systemized. NO: one-off banners, single landing pages, generic visual refreshes with no recurring workflow. If we don't fit — we'll tell you in the feedback and refer you to someone in our network who fits better. No upsell pressure."}},{id:"q8",question:{pl:"Jak zacząć współpracę?",en:"How do I start?"},answer:{pl:"Trzy ścieżki — w zależności od commitment'u: 1) Wypełnij brief (5-18 min, ustrukturyzowany, dopasowuje się do typu projektu) — pisemna odpowiedź w 48h. 2) Napisz bezpośrednio na hello@r352.com — dla warm referrals i quick chat. 3) Zarezerwuj 30-min call na Calendly. Każda opcja prowadzi do tego samego: discovery call z pełnym kontekstem. Diagnostic ma money-back — bez ryzyka po Twojej stronie.",en:"Three paths — by commitment level: 1) Fill the brief (5-18 min, structured, adapts to project type) — written response within 48h. 2) Write directly to hello@r352.com — for warm referrals and quick chat. 3) Book a 30-min call on Calendly. Each option leads to the same outcome: a discovery call with full context. Diagnostic has money-back — zero risk on your side."}}];function Cr(){const{language:e}=rt(),[,t]=Ce(),[a,s]=y.useState(!1),[i,o]=y.useState([]),l=y.useRef(null);y.useEffect(()=>{o([{id:"welcome",text:e==="pl"?"Cześć — tu asystent r352. Mogę krótko opowiedzieć co sprzedajemy, jak działa nasz 8-step proces, jakie modele współpracy mamy i jak zacząć. Wybierz pytanie albo zacznij od briefa.":"Hi — r352 assistant here. I can briefly cover what we sell, how our 8-step process works, our engagement models, and how to start. Pick a question or jump straight into the brief.",sender:"bot"}])},[e]);const d=()=>{var c;(c=l.current)==null||c.scrollIntoView({behavior:"smooth"})};y.useEffect(()=>{d()},[i]);const p=c=>{const m={id:Date.now().toString(),text:c.question[e]||c.question.en,sender:"user"};o(r=>[...r,m]),setTimeout(()=>{const r={id:(Date.now()+1).toString(),text:c.answer[e]||c.answer.en,sender:"bot"};o(h=>[...h,r])},600)};return n.jsxs("div",{className:"hidden md:block fixed bottom-6 right-6 z-[1001]","data-no-cursor-fx":"true",children:[n.jsx(ve,{children:a&&n.jsxs(C.div,{initial:{opacity:0,y:20,scale:.95},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:20,scale:.95},transition:{duration:.2},className:"absolute bottom-20 right-0 w-[320px] sm:w-[420px] md:w-[560px] bg-[#111111] border border-[#222222] rounded-none shadow-2xl flex flex-col overflow-hidden max-h-[85vh]",children:[n.jsxs("div",{className:"flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] max-h-[480px] scrollbar-thin",children:[i.map(c=>n.jsxs("div",{className:`flex gap-3 ${c.sender==="user"?"justify-end":"justify-start"}`,children:[c.sender==="bot"&&n.jsx("img",{src:Ma,alt:"Agent",className:"w-6 h-6 rounded-full border border-white/10 object-cover shrink-0 mt-1"}),n.jsx("div",{className:`max-w-[80%] px-4 py-2.5 text-[13px] leading-relaxed rounded-none ${c.sender==="user"?"bg-[#D4FF00] text-black font-medium":"bg-[#222222] text-zinc-300"}`,children:c.text})]},c.id)),n.jsx("div",{ref:l})]}),n.jsxs("div",{className:"p-4 bg-[#0A0A0A] border-t border-[#222222]",children:[n.jsxs("div",{className:"flex items-center justify-between mb-3 px-1",children:[n.jsx("p",{className:"text-[11px] uppercase tracking-wider text-zinc-600",children:e==="pl"?"Wybierz pytanie":"Choose a question"}),n.jsx("button",{onClick:()=>s(!1),className:"text-zinc-500 hover:text-white transition-colors -mr-1 p-1","aria-label":e==="pl"?"Zamknij":"Close",children:n.jsx(ha,{className:"w-4 h-4"})})]}),n.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-2",children:Ar.map(c=>n.jsx("button",{onClick:()=>p(c),className:"text-left text-[12px] leading-snug text-zinc-400 hover:text-[#D4FF00] hover:bg-[#1A1A1A] border border-[#222222] rounded-none px-3 py-2.5 transition-all duration-200",children:c.question[e]||c.question.en},c.id))}),n.jsx("button",{onClick:()=>{s(!1),t("/contact"),window.scrollTo(0,0)},className:"mt-3 w-full text-center text-[12px] font-medium leading-snug text-black bg-[#D4FF00] hover:bg-[#bce600] rounded-lg px-3 py-2.5 transition-colors duration-200",children:e==="pl"?"Przejdź do kontaktu":"Go to contact"})]})]})}),n.jsxs("div",{className:"relative",children:[!a&&n.jsx(C.div,{animate:{opacity:[.1,.4,.1]},transition:{duration:3,repeat:1/0,ease:"easeInOut"},className:"absolute inset-[-6px] bg-[#D4FF00] rounded-full z-0 blur-[8px] pointer-events-none"}),n.jsx(C.button,{whileHover:{scale:1.05,boxShadow:"0 0 25px rgba(212,255,0,0.4)"},whileTap:{scale:.95},onClick:()=>s(!a),className:"relative z-10 w-14 h-14 bg-[#D4FF00] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(212,255,0,0.2)] text-black hover:bg-[#bce600] transition-colors duration-300",children:n.jsx(ve,{mode:"wait",children:a?n.jsx(C.div,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},transition:{duration:.2,ease:"easeInOut"},children:n.jsx(ha,{className:"w-6 h-6"})},"close"):n.jsx(C.div,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},transition:{duration:.2,ease:"easeInOut"},className:"flex items-center justify-center w-full h-full rounded-full overflow-hidden",children:n.jsx("img",{src:Ma,alt:"Asystent r352",className:"w-full h-full object-cover"})},"chat")})})]})]})}function Pr(){const[e,t]=y.useState(!0),[a,s]=y.useState(!1);y.useEffect(()=>{document.body.style.overflow="hidden";const o=setTimeout(()=>{t(!1)},800);return()=>{clearTimeout(o),document.body.style.overflow=""}},[]);const i=()=>{s(!0),document.body.style.overflow=""};return a?null:n.jsx(ve,{onExitComplete:i,children:e&&n.jsxs(C.div,{className:"fixed inset-0 z-[9998] pointer-events-none",initial:{opacity:1},exit:{opacity:0,transition:{duration:.1,delay:.85}},children:[n.jsx(C.div,{className:"absolute inset-0 bg-[#D4FF00]/90 backdrop-blur-2xl z-[1]",initial:{y:"0%"},exit:{y:"-100%",transition:{duration:.7,ease:[.76,0,.24,1],delay:.12}}}),n.jsx(C.div,{className:"absolute inset-0 bg-[#0A0A0A]/90 backdrop-blur-3xl z-[2]",initial:{y:"0%"},exit:{y:"-100%",transition:{duration:.7,ease:[.76,0,.24,1],delay:.04}}}),n.jsx(C.div,{className:"absolute inset-0 z-[3] flex items-center justify-center",initial:{clipPath:"inset(0 0 0 0)"},exit:{clipPath:"inset(0 0 100% 0)",transition:{duration:.7,ease:[.76,0,.24,1],delay:.04}},children:n.jsxs("div",{className:"flex flex-col items-center gap-5",children:[n.jsx(ot,{className:"w-7 h-7 md:w-9 md:h-9",color:"#D4FF00"}),n.jsx("span",{className:"text-[11px] md:text-sm font-display uppercase tracking-[0.3em] text-[#D4FF00]/80",children:"your design partner"})]})})]},"preloader-wrapper")})}const Ir=y.lazy(()=>K(()=>import("./Home-BW6RKQUf.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10])).then(e=>({default:e.Home}))),Er=y.lazy(()=>K(()=>import("./Work-CuNdHcf7.js"),__vite__mapDeps([11,1,8,3,2,5,6,9])).then(e=>({default:e.Work}))),Nr=y.lazy(()=>K(()=>import("./ProjectDetails-BBJuS3Z-.js"),__vite__mapDeps([12,1,8,3,2,6,7,9])).then(e=>({default:e.ProjectDetails}))),Mr=y.lazy(()=>K(()=>import("./Philosophy-exljSPg3.js"),__vite__mapDeps([13,1,2,8,3,9])).then(e=>({default:e.Philosophy}))),_r=y.lazy(()=>K(()=>import("./Services-Db_AzQaH.js"),__vite__mapDeps([14,1,8,3,2,9])).then(e=>({default:e.Services}))),Rr=y.lazy(()=>K(()=>import("./ServiceDetail-CFNbVxrU.js"),__vite__mapDeps([15,1,2,8,3,9])).then(e=>({default:e.ServiceDetail}))),Or=y.lazy(()=>K(()=>import("./Deliverables-P_81tytd.js"),__vite__mapDeps([16,1,8,3,2,17,9])).then(e=>({default:e.Deliverables}))),Wr=y.lazy(()=>K(()=>import("./Contact-BiBT-GPb.js"),__vite__mapDeps([18,1,8,3,2,4,9])).then(e=>({default:e.Contact}))),Br=y.lazy(()=>K(()=>import("./Journal-67yNi5ed.js"),__vite__mapDeps([19,1,8,3,2,9])).then(e=>({default:e.Journal}))),Lr=y.lazy(()=>K(()=>import("./JournalArticle-Bn7VvbK8.js"),__vite__mapDeps([20,1,8,3,2,9])).then(e=>({default:e.JournalArticle}))),qr=y.lazy(()=>K(()=>import("./BriefAccess-IIecGFzB.js"),__vite__mapDeps([21,1,2,9,3])).then(e=>({default:e.BriefAccess}))),Kr=y.lazy(()=>K(()=>import("./Pricing-DLmLzmgY.js"),__vite__mapDeps([22,1,8,3,2,23,9])).then(e=>({default:e.Pricing}))),Ur=y.lazy(()=>K(()=>import("./LimitedAccess2-BEI34oom.js"),__vite__mapDeps([24,1,8,3,2,25,23,26,27,28,17,9])).then(e=>({default:e.LimitedAccess2}))),Hr=y.lazy(()=>K(()=>import("./LimitedAccess3-BAi73Rtf.js"),__vite__mapDeps([29,1,8,3,2,25,23,26,30,17,28,9])).then(e=>({default:e.LimitedAccess3}))),Zr=y.lazy(()=>K(()=>import("./LimitedAccess5-C0-t045_.js"),__vite__mapDeps([31,1,8,3,2,25,23,26,32,33,9])).then(e=>({default:e.LimitedAccess5}))),Gr=y.lazy(()=>K(()=>import("./LimitedAccess5Meeting-DhSTK9SX.js"),__vite__mapDeps([34,1,8,3,2,25,35,36,30,32,33,9])).then(e=>({default:e.LimitedAccess5Meeting}))),Vr=y.lazy(()=>K(()=>import("./LimitedAccess5Pricing-DMLv0bsx.js"),__vite__mapDeps([37,1,8,3,2,25,35,36,30,27,32,9])).then(e=>({default:e.LimitedAccess5Pricing}))),$r=y.lazy(()=>K(()=>import("./Process-CgKJm35G.js"),__vite__mapDeps([38,1,8,3,2,4,9])).then(e=>({default:e.Process}))),Yr=y.lazy(()=>K(()=>import("./Diagnostic-CHbjC4cG.js"),__vite__mapDeps([39,1,8,3,2,9])).then(e=>({default:e.Brief})));function Jr(){const[e]=Ce(),t=st();return y.useEffect(()=>{const a=setTimeout(()=>{window.scrollTo(0,0),t&&(t.scrollTo(0,{immediate:!0}),requestAnimationFrame(()=>{t.resize()}))},700);return()=>clearTimeout(a)},[e,t]),null}function Xr(){y.useEffect(()=>{const e=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 658 676" width="64" height="64">
      <rect x="-20" y="-20" width="698" height="716" rx="100" fill="#0A0A0A"/>
      <path d="M0 337.632C0 136.127 154.934 0 328.676 0C502.418 0 657.352 136.127 657.352 337.632C657.352 539.136 502.418 675.264 328.676 675.264C154.934 675.264 0 539.136 0 337.632ZM78.8106 337.632C78.8106 492.566 189.862 601.827 328.676 601.827C465.699 601.827 578.541 492.566 578.541 337.632C578.541 182.697 465.699 73.4372 328.676 73.4372C189.862 73.4372 78.8106 182.697 78.8106 337.632Z" fill="#DAFF45"/>
      <path d="M468.492 402.837C474.353 406.798 478.709 412.183 481.56 418.994C484.411 425.806 485.282 432.617 484.174 439.428C483.065 446.239 480.055 452.496 475.145 458.199C470.393 463.743 464.769 467.544 458.275 469.604C455.424 470.237 452.414 470.633 449.246 470.792C446.078 470.95 441.88 470.792 436.653 470.316C431.584 469.841 428.575 469.445 427.624 469.128C412.418 468.495 396.499 465.089 379.866 458.912C363.393 452.734 349.137 445.843 337.098 438.24C325.06 430.479 313.338 422.004 301.933 412.817C290.687 403.63 282.45 396.422 277.222 391.195C271.995 385.968 268.114 381.77 265.58 378.602L260.59 373.137L261.066 395.472C261.382 422.4 261.699 440.141 262.016 448.695C262.333 460.416 259.323 469.92 252.987 477.207C246.176 484.969 237.543 489.404 227.088 490.513C216 491.463 206.417 488.533 198.339 481.721C189.627 474.276 185.112 465.644 184.795 455.823C184.795 447.111 184.479 429.132 183.845 401.887C183.528 372.741 183.211 353.258 182.895 343.437C181.944 314.291 180.598 282.69 178.855 248.634C178.222 237.229 181.311 227.646 188.122 219.884C194.616 212.439 202.932 208.083 213.07 206.816H214.02L214.496 206.341C219.089 203.49 225.267 200.559 233.029 197.55C272.312 181.709 311.199 173.393 349.691 172.601C362.363 172.285 372.738 174.74 380.817 179.967C390.479 186.145 397.132 195.886 400.775 209.192C407.587 235.803 401.251 262.256 381.767 288.551C377.807 293.778 371.63 301.223 363.234 310.886C358.324 316.746 354.601 321.102 352.067 323.954C349.849 327.122 349.374 330.211 350.641 333.22C355.552 342.566 361.809 351.04 369.412 358.644C377.015 366.088 384.539 371.791 391.984 375.751C399.429 379.553 406.636 382.879 413.606 385.73C420.576 388.423 426.199 390.086 430.476 390.72L436.891 392.145C443.702 393.413 448.85 394.521 452.335 395.472C458.829 397.531 464.215 399.986 468.492 402.837ZM309.299 262.652C310.883 255.524 308.586 250.535 302.408 247.684C298.765 246.1 293.934 246.1 287.915 247.684C283.321 248.951 274.688 251.881 262.016 256.475C258.848 257.425 257.422 259.484 257.739 262.652L259.64 307.084C259.64 309.935 261.066 311.836 263.917 312.786C266.926 313.737 269.382 313.103 271.282 310.886C279.994 299.798 286.172 292.511 289.815 289.026C295.359 282.849 299.399 278.334 301.933 275.483C306.21 270.573 308.665 266.296 309.299 262.652Z" fill="#DAFF45"/>
    </svg>`,t=new Blob([e],{type:"image/svg+xml"}),a=URL.createObjectURL(t);let s=document.querySelector("link[rel~='icon']");return s||(s=document.createElement("link"),s.rel="icon",document.head.appendChild(s)),s.type="image/svg+xml",s.href=a,()=>URL.revokeObjectURL(a)},[])}function Qr(){const[e]=Ce(),{theme:t}=qt();Xr();const a=i=>i.startsWith("/services/")&&i!=="/services"?"/services/detail":i,s=i=>{var o,l,d;if(i==="/work")return{title:"Work — r352 | Selected projects & case studies",description:"See how we help multi-location brands like Sonova, Benefit Systems, and Kubota ship faster with scalable design systems and delivery workflows."};if(i.startsWith("/work/")){const p=i.replace("/work/",""),c=Zo.find(m=>m.id===p);return c?{title:`${c.client}: ${c.title} — r352 Case Study`,description:((l=(o=c.description)==null?void 0:o.en)==null?void 0:l.substring(0,155))||`How r352 helped ${c.client} build scalable design systems and delivery workflows.`,ogImage:(d=c.coverImage)!=null&&d.startsWith("http")?c.coverImage:`https://r352.com${c.coverImage}`}:{title:"Case Study — r352 | Project Details",description:"Deep dive into how r352 solved delivery bottlenecks and built scalable brand systems for this client."}}if(i==="/services")return{title:"Services — r352 | Strategy, Operating System, Design & Build",description:"Four layers, one system. Strategy decides what to ship. Operating System makes work predictable. Design & Production ships the assets. Build & Optimize handles implementation. Delivered through r3loop."};if(i==="/services/operating-system")return{title:"Operating System — r352 | Brand Standards & Delivery Infrastructure",description:"We audit your delivery workflow, define brand standards, and build intake processes that eliminate chaos and scale across locations."};if(i==="/services/design-production")return{title:"Design Production — r352 | Campaign Toolkits & Assets at Scale",description:"Scalable campaign toolkits, templates, and production workflows that maintain brand consistency across every touchpoint."};if(i==="/services/build-optimize")return{title:"Build & Optimize — r352 | UX/UI & Digital Products",description:"We design and build digital products, landing pages, and interfaces that convert — grounded in data and user research."};if(i==="/process")return{title:"r3loop — r352's 8-step methodology for operational design systems",description:"r3loop is r352's branded methodology — 8 steps that turn operational chaos into a working system. Diagnose, Map, Standardize, Build, Govern, Ship, Measure, Iterate. Same framework for every project, modified depth not structure."};if(i==="/philosophy")return{title:"Philosophy — r352 | How we think about design & delivery",description:"Process over aesthetics. Systems over one-offs. Learn how r352 approaches design as a delivery discipline, not a creative exercise."};if(i==="/deliverables")return{title:"Deliverables — r352 | What you actually get",description:"Brand guidelines, campaign toolkits, QA checklists, production templates — concrete deliverables that your team can use from day one."};if(i==="/journal")return{title:"Journal — r352 | Insights on design operations & delivery",description:"Articles on design operations, delivery workflows, brand systems, and how multi-location organizations can scale their creative output."};if(i.startsWith("/journal/")){const p=parseInt(i.replace("/journal/","")),c=Hi.find(m=>m.id===p);if(c){const m=c.title.replace(/<br\s*\/?>/g," ");return{title:`${m} — r352 Journal`,description:`r352 Journal: ${m}. Insights on design operations, delivery systems, and scaling creative output for multi-location organizations.`,ogImage:c.image.startsWith("http")?c.image:`https://r352.com${c.image}`,article:{title:c.title,date:c.date,category:c.category}}}return{title:"Article — r352 Journal",description:"Read this article on design operations, delivery systems, and scaling creative output for multi-location organizations."}}return i==="/contact"?{title:"Contact — r352 | Brief, call, or write directly",description:"Three paths to start: structured brief (5–18 min, 48h response), book a 30-min call, or write to hello@r352.com. For multi-location organizations ready to systemize their design operations."}:{title:"r352 — The system behind great design.",description:"Strategic design partner for multi-location organizations. From strategy to rollout-ready delivery, powered by the r3loop methodology — predictable quality and speed at scale."}};return y.useEffect(()=>{e!=="/"&&document.body.classList.remove("lime-theme")},[e]),n.jsxs(n.Fragment,{children:[n.jsx(Oi,{}),n.jsx(Pr,{}),(()=>{const i=s(e);return n.jsx(Ri,{path:e,title:i.title,description:i.description,ogImage:i.ogImage,article:i.article})})(),n.jsxs(li,{children:[n.jsxs("div",{className:`${t==="dark"?"dark":""} bg-background min-h-screen w-full overflow-x-hidden text-foreground font-sans selection:bg-white selection:text-black relative transition-colors duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)]`,children:[n.jsx(Go,{}),n.jsx(Vo,{}),n.jsx($o,{}),n.jsx(Tr,{}),n.jsx(Jr,{}),n.jsx(ti,{}),n.jsx("main",{className:"relative min-h-screen",children:n.jsx(y.Suspense,{fallback:null,children:n.jsx(ve,{mode:"wait",children:n.jsxs(tn,{location:e,children:[n.jsx(O,{path:"/",component:Ir}),n.jsx(O,{path:"/work",component:Er}),n.jsx(O,{path:"/work/:id",component:Nr}),n.jsx(O,{path:"/philosophy",component:Mr}),n.jsx(O,{path:"/services",component:_r}),n.jsx(O,{path:"/services/:slug",component:Rr}),n.jsx(O,{path:"/process",component:$r}),n.jsx(O,{path:"/brief",component:Yr}),n.jsx(O,{path:"/deliverables",component:Or}),n.jsx(O,{path:"/journal",component:Br}),n.jsx(O,{path:"/journal/:id",component:Lr}),n.jsx(O,{path:"/contact",component:Wr}),n.jsx(O,{path:"/brief-access",component:qr}),n.jsx(O,{path:"/limitedaccess",component:Kr}),n.jsx(O,{path:"/limitedaccess2",component:Ur}),n.jsx(O,{path:"/limitedaccess3",component:Hr}),n.jsx(O,{path:"/limitedaccess5",component:Zr}),n.jsx(O,{path:"/limitedaccess5/spotkanie",component:Gr}),n.jsx(O,{path:"/limitedaccess5/wycena",component:Vr}),n.jsx(O,{children:()=>n.jsx("div",{className:"pt-32 min-h-screen flex flex-col items-center justify-center text-center px-6",children:n.jsxs("div",{className:"max-w-xl mx-auto space-y-8",children:[n.jsx("h1",{className:"text-8xl md:text-[12rem] font-bold tracking-tighter text-white leading-none",children:"404"}),n.jsx("p",{className:"text-xl text-neutral-400",children:"This page doesn't exist."}),n.jsx("a",{href:"/",className:"inline-flex items-center justify-center px-8 py-4 bg-[#D4FF00] text-black font-display uppercase tracking-widest text-sm hover:bg-white transition-colors duration-300",children:"Back to homepage"})]})})})]},a(e))})})}),n.jsx(ri,{}),n.jsx(Cr,{})]}),n.jsx(Sr,{theme:t==="dark"?"dark":"light",position:"bottom-right",toastOptions:{style:t==="dark"?{background:"#1a1a1a",border:"1px solid rgba(255,255,255,0.1)",color:"#fff"}:{background:"#ffffff",border:"1px solid rgba(0,0,0,0.1)",color:"#111"}}})]})]})}function el(){return n.jsx(ms,{children:n.jsx(Wn,{children:n.jsxs(Ln,{children:[n.jsx(Qr,{}),n.jsx(Xo,{}),n.jsx(Jo,{}),n.jsx(Yo,{})]})})})}Ps.createRoot(document.getElementById("root")).render(n.jsx(el,{}));export{Vn as A,we as L,oi as R,ha as X,K as _,W as a,Ce as b,lt as c,qt as d,ho as e,go as f,Rn as g,an as h,ot as i,Hi as j,Zo as p,Qo as r,ua as s,ol as t,rt as u};
