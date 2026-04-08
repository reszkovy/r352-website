import { PageTransition } from "@/app/components/ui/PageTransition";
import { Reveal } from "@/app/components/ui/Reveal";
import { motion } from "motion/react";
import {
  Lock, Eye, EyeOff, ArrowRight, Check, X,
  Download, Loader2, Package, Calendar, Minus,
  Code, Film, PenTool, BookOpen,
  ChevronDown, Zap, Users, Mail
} from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect, useCallback } from "react";
import { useLenis } from "lenis/react";
import PyszneLogo from "@/imports/Group1";
import { jsPDF } from "jspdf";

// ─── Data ────────────────────────────────────────────────────────────────────

type CompRow = {
  name: string;
  a: false | { qty: string; details: string[]; price: string };
  b: false | { qty: string; details: string[]; price: string };
};

const comparisonRows: CompRow[] = [
  {
    name: "Key Visual (KV)",
    a: { qty: "1 motyw", details: ["1 wersja kolorystyczna", "pliki źródłowe PSD / Figma"], price: "3 500" },
    b: { qty: "1 motyw + 2 adaptacje", details: ["2 wersje kolorystyczne", "adaptacje formatowe", "pliki źródłowe PSD / Figma"], price: "5 000" },
  },
  {
    name: "Landing Page (LP)",
    a: false,
    b: { qty: "1 strona", details: ["desktop + mobile", "do 5 sekcji", "projekt + wdrożenie"], price: "4 000" },
  },
  {
    name: "Social Media Pack",
    a: { qty: "8 grafik", details: ["4× post feed (1080×1080)", "4× stories (1080×1920)"], price: "3 500" },
    b: { qty: "15 grafik", details: ["6× post feed (1080×1080)", "6× stories (1080×1920)", "3× karuzele / slidery"], price: "5 000" },
  },
  {
    name: "Display / Programmatic",
    a: { qty: "5 formatów", details: ["300×250, 728×90, 160×600", "320×50, 300×600"], price: "1 000" },
    b: { qty: "10 formatów", details: ["5 formatów bazowych", "+ 5 dodatkowych (np. 970×250,", "320×480, 480×320, 336×280, 120×600)"], price: "2 000" },
  },
  {
    name: "Prezentacja sprzedażowa",
    a: { qty: "do 15 slajdów", details: ["format Figma", "szablon do edycji"], price: "3 500" },
    b: { qty: "do 25 slajdów", details: ["format Figma", "szablon do edycji", "2 warianty layoutu"], price: "4 000" },
  },
  {
    name: "Materiały drukowane / BTL",
    a: false,
    b: { qty: "3 materiały", details: ["ulotka A5 (2-stronna)", "plakat A2", "rollup 85×200 cm"], price: "3 000" },
  },
  {
    name: "Newsletter / E-mail marketing",
    a: { qty: "1 szablon", details: ["responsive HTML", "kompatybilność z Mailchimp / Emarsys", "grafiki + copy w cenie"], price: "1 500" },
    b: { qty: "3 szablony", details: ["responsive HTML", "kompatybilność z Mailchimp / SAP Emarsys", "grafiki + copy w cenie"], price: "2 500" },
  },
];

const pricingItems = [
  { name: "Key Visual (KV)", desc: "1 motyw kreatywny + pliki źródłowe", price: "od 3 500 PLN" },
  { name: "Landing Page (LP)", desc: "1 strona (desktop + mobile, do 5 sekcji)", price: "od 4 000 PLN" },
  { name: "Social Media Pack", desc: "Zestaw grafik na feed, stories i/lub karuzele", price: "od 3 500 PLN" },
  { name: "Display / Programmatic", desc: "Zestaw banerów digital w ustalonych formatach", price: "od 1 000 PLN" },
  { name: "Prezentacja sprzedażowa", desc: "Plik Figma, do 15-25 slajdów, edytowalny szablon", price: "od 3 500 PLN" },
  { name: "Materiały drukowane / BTL", desc: "Ulotka, plakat, rollup — pliki print-ready", price: "od 3 000 PLN" },
  { name: "Newsletter / E-mail marketing", desc: "Szablon HTML responsive, Mailchimp / Emarsys", price: "od 1 500 PLN" },
];

type AddonItem = {
  icon: string;
  name: string;
  desc: string;
  scope: string;
  price: string;
  unit: string;
};

const addonServices: AddonItem[] = [
  {
    icon: "code",
    name: "Development WWW",
    desc: "Front-end na bazie projektu Figma",
    scope: "React / Next.js, responsive, hosting + domena, do 10 podstron, CMS opcjonalnie",
    price: "od 8 000",
    unit: "PLN / projekt",
  },
  {
    icon: "film",
    name: "Motion Design & Animacja",
    desc: "Animowane kreacje i micro-interactions",
    scope: "Animowane banery HTML5/GIF, animacje do stories/reels (do 15s), Lottie do LP, intro/outro wideo",
    price: "od 2 000",
    unit: "PLN / szt.",
  },
  {
    icon: "pen",
    name: "Copywriting kampanijny",
    desc: "Teksty do materiałów kreatywnych",
    scope: "Hasła kampanijne, copy do LP (do 5 sekcji), opisy do SM (do 12 postów), CTA i microcopy",
    price: "od 2 500",
    unit: "PLN / pakiet",
  },
  {
    icon: "book",
    name: "Mini brand book",
    desc: "Wytyczne wizualne dla sub-brandu",
    scope: "Zasady użycia logo, paleta kolorów, typografia, grid, tone of voice, do-and-don'ts, plik Figma",
    price: "od 5 000",
    unit: "PLN / dokument",
  },
];

const assetPackages = [
  { name: "S", formats: "do 5", price: "1 500" },
  { name: "M", formats: "6-10", price: "2 700" },
  { name: "L", formats: "11-20", price: "4 800" },
];

const processSteps = [
  { step: "Brief", desc: "Ustalamy cele, grupy docelowe i zakres materiałów." },
  { step: "Koncept", desc: "Tworzymy Key Visual — główny motyw graficzny całej kampanii." },
  { step: "Produkcja", desc: "Na bazie zaakceptowanego KV realizujemy wszystkie materiały (do 2 rund poprawek na każdy)." },
  { step: "Dostarczenie", desc: "Przekazujemy gotowe pliki w ustalonych formatach — gotowe do publikacji i druku." },
];

// ─── Client-friendly glossary ────────────────────────────────────────────────

const glossary: Record<string, string> = {
  "Key Visual (KV)": "Główna grafika kampanii — motyw wizualny, z którego powstają wszystkie pozostałe materiały.",
  "Landing Page (LP)": "Dedykowana strona internetowa kampanii, na którą kierowany jest ruch z reklam.",
  "Social Media Pack": "Gotowe grafiki i wideo do publikacji na kanałach społecznościowych.",
  "Display / Programmatic": "Banery reklamowe wyświetlane w sieci reklamowej (Google Display, DV360 itp.).",
  "Prezentacja sprzedażowa": "Edytowalny szablon prezentacji dla zespołu sprzedaży Klienta.",
  "Materiały drukowane / BTL": "Materiały fizyczne: ulotki, plakaty, rollupy — pliki gotowe do druku.",
  "Newsletter / E-mail marketing": "Szablony mailingowe responsywne, gotowe do wysyłki przez Mailchimp lub SAP Emarsys.",
};

const faqItems = [
  {
    q: "Czy mogę zacząć od wariantu A i później rozszerzyć do B?",
    a: "Tak. Wariant A to solidna baza, którą w każdej chwili można rozbudować o kolejne materiały w cenach z cennika jednostkowego.",
  },
  {
    q: "Kto dostarcza zdjęcia i fonty?",
    a: "Zdjęcia stockowe dobieramy i kupujemy my — są wliczone w cenę. Licencje na fonty (np. firmowy krój Pyszne.pl) pozostają po stronie Klienta.",
  },
  {
    q: "Co oznacza \"do 2 rund poprawek\"?",
    a: "Po każdym etapie Klient ma dwie okazje do zgłoszenia uwag, które realizujemy w cenie. Trzecia i kolejne rundy są wyceniane osobno — żeby motywować obie strony do precyzyjnego feedbacku.",
  },
  {
    q: "Dlaczego prezentacje w Figmie, a nie w PowerPoint?",
    a: "Figma daje pełną kontrolę nad jakością wizualną i pozwala zespołowi Klienta edytować treści bez ryzyka \"rozjechania się\" layoutu. Eksport do PDF jest jednym kliknięciem.",
  },
  {
    q: "Co jeśli w trakcie projektu zmieni się zakres?",
    a: "Nie ma problemu. Rozliczamy etapowo (30/30/40), więc zakres można korygować między etapami. Każda zmiana jest transparentnie wyceniana.",
  },
  {
    q: "Jak wygląda komunikacja w trakcie projektu?",
    a: "Dedykowany project manager po naszej stronie, komunikacja przez Slack lub e-mail, statusy co tydzień. Bez zbędnych spotkań.",
  },
];

// ─── PDF Pitch Export ────────────────────────────────────────────────────────

const SW = 1920;
const SH = 1080;
const L = "#D4FF00";
const PAD = 120;
const CONTENT_W = SW - PAD * 2;

function drawBg(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "#08080a";
  ctx.fillRect(0, 0, SW, SH);
  const g1 = ctx.createRadialGradient(0, 0, 0, 0, 0, 900);
  g1.addColorStop(0, "rgba(212,255,0,0.025)");
  g1.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, SW, SH);
  ctx.fillStyle = "rgba(255,255,255,0.018)";
  for (let gx = PAD; gx < SW - PAD; gx += 40) {
    for (let gy = 80; gy < SH - 60; gy += 40) {
      ctx.fillRect(gx, gy, 1, 1);
    }
  }
}

function drawFooter(ctx: CanvasRenderingContext2D, page: number, ttl: number) {
  ctx.strokeStyle = "rgba(255,255,255,0.06)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(PAD, SH - 56); ctx.lineTo(SW - PAD, SH - 56); ctx.stroke();
  ctx.fillStyle = "rgba(255,255,255,0.12)"; ctx.font = "bold 11px Arial, sans-serif";
  ctx.letterSpacing = "3px"; ctx.textAlign = "left"; ctx.fillText("R352", PAD, SH - 32); ctx.letterSpacing = "0px";
  ctx.textAlign = "center"; ctx.fillStyle = "rgba(255,255,255,0.07)"; ctx.font = "10px Arial, sans-serif";
  ctx.fillText("POUFNE  \u00b7  PYSZNE PAY  \u00b7  2026", SW / 2, SH - 32);
  ctx.textAlign = "right"; ctx.fillStyle = "rgba(255,255,255,0.15)"; ctx.font = "11px Arial, sans-serif";
  ctx.fillText(`${String(page).padStart(2, "0")} / ${String(ttl).padStart(2, "0")}`, SW - PAD, SH - 32);
  ctx.textAlign = "left";
}

function drawTopAccent(ctx: CanvasRenderingContext2D) { ctx.fillStyle = L; ctx.fillRect(0, 0, SW, 3); }

function drawCornerMarks(ctx: CanvasRenderingContext2D) {
  const sz = 16, m = PAD - 24; ctx.strokeStyle = "rgba(255,255,255,0.06)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(m, 80); ctx.lineTo(m, 80 - sz); ctx.moveTo(m, 80); ctx.lineTo(m + sz, 80); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(SW - m, 80); ctx.lineTo(SW - m, 80 - sz); ctx.moveTo(SW - m, 80); ctx.lineTo(SW - m - sz, 80); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(m, SH - 64); ctx.lineTo(m, SH - 64 + sz); ctx.moveTo(m, SH - 64); ctx.lineTo(m + sz, SH - 64); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(SW - m, SH - 64); ctx.lineTo(SW - m, SH - 64 + sz); ctx.moveTo(SW - m, SH - 64); ctx.lineTo(SW - m - sz, SH - 64); ctx.stroke();
}

function slideHeader(ctx: CanvasRenderingContext2D, num: string, title: string, subtitle?: string) {
  ctx.fillStyle = L + "18"; ctx.fillRect(PAD, 95, 52, 28);
  ctx.fillStyle = L; ctx.font = "bold 13px Arial, sans-serif"; ctx.textAlign = "center"; ctx.fillText(num, PAD + 26, 114); ctx.textAlign = "left";
  ctx.fillStyle = "#ffffff"; ctx.font = "bold 38px Arial, sans-serif"; ctx.fillText(title, PAD + 68, 118);
  if (subtitle) { ctx.fillStyle = "rgba(255,255,255,0.25)"; ctx.font = "15px Arial, sans-serif"; ctx.fillText(subtitle, PAD + 70, 148); }
  ctx.fillStyle = L + "30"; ctx.fillRect(PAD, 168, 60, 2);
}

function drawCard(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, opts?: { highlight?: boolean; topAccent?: boolean }) {
  ctx.fillStyle = opts?.highlight ? "rgba(212,255,0,0.04)" : "rgba(255,255,255,0.03)"; ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = opts?.highlight ? L + "25" : "rgba(255,255,255,0.07)"; ctx.lineWidth = 1; ctx.strokeRect(x + .5, y + .5, w - 1, h - 1);
  if (opts?.topAccent) { ctx.fillStyle = L; ctx.fillRect(x, y, w, 2); }
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxW: number, lineH: number) {
  const words = text.split(" ");
  let line = "";
  let ty = y;
  for (const word of words) {
    const test = line + word + " ";
    if (ctx.measureText(test).width > maxW && line) {
      ctx.fillText(line.trim(), x, ty);
      line = word + " ";
      ty += lineH;
    } else { line = test; }
  }
  ctx.fillText(line.trim(), x, ty);
}

const PDF_CTA_LINE = "Prosimy o wyb\u00F3r wariantu \u2014 um\u00F3wmy rozmow\u0119, by doprecyzowa\u0107 zakres.";

function generatePitchPdf() {
  const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [SW, SH] });
  const canvas = document.createElement("canvas");
  canvas.width = SW;
  canvas.height = SH;
  const ctx = canvas.getContext("2d")!;
  const total = 7;

  const addSlide = (fn: () => void, page: number) => {
    if (page > 1) pdf.addPage([SW, SH], "landscape");
    drawBg(ctx); drawTopAccent(ctx); drawCornerMarks(ctx);
    fn();
    drawFooter(ctx, page, total);
    pdf.addImage(canvas.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, SW, SH);
  };

  // 1 — Cover
  addSlide(() => {
    ctx.fillStyle = "rgba(255,255,255,0.015)"; ctx.font = "bold 600px Arial, sans-serif"; ctx.fillText("r", SW - 600, 700);
    ctx.strokeStyle = L + "30"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(SW - 340, 200); ctx.lineTo(SW - 340, 800); ctx.stroke();
    ctx.fillStyle = L; ctx.fillRect(PAD, 320, 4, 400);
    ctx.fillStyle = L + "90"; ctx.font = "bold 12px Arial, sans-serif"; ctx.letterSpacing = "8px";
    ctx.fillText("OFERTA DEDYKOWANA", PAD + 30, 390); ctx.letterSpacing = "0px";
    ctx.fillStyle = "#ffffff"; ctx.font = "bold 90px Arial, sans-serif"; ctx.fillText("Pyszne Pay", PAD + 30, 510);
    ctx.fillStyle = "rgba(255,255,255,0.25)"; ctx.fillText("Oferta Marzec 2026", PAD + 30, 610);
    ctx.fillStyle = "rgba(255,255,255,0.40)"; ctx.font = "20px Arial, sans-serif";
    ctx.fillText("Kompleksowe wsparcie kreatywne \u2014 marzec 2026", PAD + 32, 670);
    drawCard(ctx, SW - 320, 440, 200, 120);
    ctx.fillStyle = L; ctx.font = "bold 24px Arial, sans-serif"; ctx.fillText("Pyszne.pl", SW - 300, 490);
    ctx.fillStyle = "rgba(255,255,255,0.30)"; ctx.font = "14px Arial, sans-serif"; ctx.fillText("Pyszne Pay", SW - 300, 520);
    ctx.fillStyle = "rgba(255,255,255,0.12)"; ctx.font = "11px Arial, sans-serif"; ctx.fillText("2026", SW - 300, 545);
    ctx.fillStyle = "rgba(255,255,255,0.10)"; ctx.font = "bold 13px Arial, sans-serif"; ctx.letterSpacing = "4px";
    ctx.fillText("R352 AGENCY", PAD + 30, 780); ctx.letterSpacing = "0px";
  }, 1);

  // 2 — Comparison
  addSlide(() => {
    slideHeader(ctx, "01", "Co otrzymujesz", "Por\u00F3wnanie wariant\u00F3w A i B");
    const tY = 200, nameW = 380, colW = (CONTENT_W - nameW) / 2, colAx = PAD + nameW, colBx = PAD + nameW + colW;
    ctx.fillStyle = "rgba(255,255,255,0.04)"; ctx.fillRect(PAD, tY, nameW, 48); ctx.fillRect(colAx, tY, colW, 48);
    ctx.fillStyle = L + "0A"; ctx.fillRect(colBx, tY, colW, 48);
    ctx.strokeStyle = "rgba(255,255,255,0.06)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(colAx, tY); ctx.lineTo(colAx, tY + 48 + comparisonRows.length * 66 + 80); ctx.stroke();
    ctx.strokeStyle = L + "15";
    ctx.beginPath(); ctx.moveTo(colBx, tY); ctx.lineTo(colBx, tY + 48 + comparisonRows.length * 66 + 80); ctx.stroke();
    ctx.font = "bold 11px Arial, sans-serif"; ctx.letterSpacing = "2px";
    ctx.fillStyle = "rgba(255,255,255,0.30)"; ctx.fillText("CO DOSTARCZAMY", PAD + 20, tY + 29);
    ctx.textAlign = "center"; ctx.fillText("WARIANT A", colAx + colW / 2, tY + 24);
    ctx.fillStyle = "rgba(255,255,255,0.15)"; ctx.font = "10px Arial, sans-serif"; ctx.letterSpacing = "0px";
    ctx.fillText("Podstawowy", colAx + colW / 2, tY + 40);
    ctx.fillStyle = L + "80"; ctx.font = "bold 11px Arial, sans-serif"; ctx.letterSpacing = "2px";
    ctx.fillText("WARIANT B", colBx + colW / 2, tY + 24); ctx.letterSpacing = "0px";
    ctx.fillStyle = L + "40"; ctx.font = "10px Arial, sans-serif"; ctx.fillText("Rozszerzony", colBx + colW / 2, tY + 40);
    ctx.textAlign = "left";
    comparisonRows.forEach((row, i) => {
      const ry = tY + 48 + i * 66;
      if (i % 2 === 0) { ctx.fillStyle = "rgba(255,255,255,0.015)"; ctx.fillRect(PAD, ry, CONTENT_W, 66); }
      ctx.strokeStyle = "rgba(255,255,255,0.04)"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(PAD, ry); ctx.lineTo(PAD + CONTENT_W, ry); ctx.stroke();
      ctx.fillStyle = L + "40"; ctx.fillRect(PAD + 18, ry + 28, 4, 4);
      ctx.fillStyle = "rgba(255,255,255,0.70)"; ctx.font = "16px Arial, sans-serif"; ctx.fillText(row.name, PAD + 32, ry + 34);
      ctx.textAlign = "center";
      if (row.a === false) { ctx.fillStyle = "rgba(255,255,255,0.10)"; ctx.font = "18px Arial, sans-serif"; ctx.fillText("\u2014", colAx + colW / 2, ry + 34); }
      else { ctx.fillStyle = "rgba(255,255,255,0.55)"; ctx.font = "bold 14px Arial, sans-serif"; ctx.fillText(row.a.qty, colAx + colW / 2, ry + 28); ctx.fillStyle = "rgba(255,255,255,0.20)"; ctx.font = "11px Arial, sans-serif"; ctx.fillText(`${row.a.price} PLN`, colAx + colW / 2, ry + 48); }
      if (row.b === false) { ctx.fillStyle = "rgba(255,255,255,0.10)"; ctx.font = "18px Arial, sans-serif"; ctx.fillText("\u2014", colBx + colW / 2, ry + 34); }
      else { ctx.fillStyle = L; ctx.font = "bold 14px Arial, sans-serif"; ctx.fillText(row.b.qty, colBx + colW / 2, ry + 28); ctx.fillStyle = L + "50"; ctx.font = "11px Arial, sans-serif"; ctx.fillText(`${row.b.price} PLN`, colBx + colW / 2, ry + 48); }
      ctx.textAlign = "left";
    });
    const sy = tY + 48 + comparisonRows.length * 66;
    ctx.strokeStyle = "rgba(255,255,255,0.12)"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(PAD, sy); ctx.lineTo(PAD + CONTENT_W, sy); ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.04)"; ctx.fillRect(PAD, sy, CONTENT_W, 68);
    ctx.fillStyle = "#ffffff"; ctx.font = "bold 18px Arial, sans-serif"; ctx.fillText("SUMA NETTO", PAD + 20, sy + 42);
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff"; ctx.font = "bold 28px Arial, sans-serif"; ctx.fillText("13 000", colAx + colW / 2, sy + 38);
    ctx.fillStyle = "rgba(255,255,255,0.25)"; ctx.font = "12px Arial, sans-serif"; ctx.fillText("PLN netto", colAx + colW / 2, sy + 56);
    ctx.fillStyle = L; ctx.font = "bold 28px Arial, sans-serif"; ctx.fillText("25 500", colBx + colW / 2, sy + 38);
    ctx.fillStyle = L + "40"; ctx.font = "12px Arial, sans-serif"; ctx.fillText("PLN netto", colBx + colW / 2, sy + 56);
    ctx.textAlign = "left";
    ctx.fillStyle = "rgba(255,255,255,0.15)"; ctx.font = "12px Arial, sans-serif";
    ctx.fillText("Ceny netto + 23% VAT  \u00b7  Materia\u0142y stock w cenie  \u00b7  Do 2 rund poprawek", PAD, SH - 80);
  }, 2);

  // 3 — Cennik
  addSlide(() => {
    slideHeader(ctx, "02", "Cennik pojedynczych us\u0142ug", "Ceny za materia\u0142y zamawiane niezale\u017Cnie od pakietu");
    const tY = 210;
    ctx.fillStyle = "rgba(255,255,255,0.04)"; ctx.fillRect(PAD, tY, CONTENT_W, 44);
    ctx.strokeStyle = "rgba(255,255,255,0.06)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(PAD, tY + 44); ctx.lineTo(PAD + CONTENT_W, tY + 44); ctx.stroke();
    ctx.font = "bold 10px Arial, sans-serif"; ctx.letterSpacing = "2px";
    ctx.fillStyle = "rgba(255,255,255,0.25)"; ctx.fillText("US\u0141UGA", PAD + 20, tY + 27);
    ctx.fillText("ZAKRES", PAD + 500, tY + 27);
    ctx.fillStyle = L + "70"; ctx.textAlign = "right"; ctx.fillText("CENA NETTO", PAD + CONTENT_W - 20, tY + 27);
    ctx.textAlign = "left"; ctx.letterSpacing = "0px";
    pricingItems.forEach((item, i) => {
      const y = tY + 44 + i * 80;
      if (i % 2 === 0) { ctx.fillStyle = "rgba(255,255,255,0.015)"; ctx.fillRect(PAD, y, CONTENT_W, 80); }
      ctx.strokeStyle = "rgba(255,255,255,0.03)";
      ctx.beginPath(); ctx.moveTo(PAD, y + 80); ctx.lineTo(PAD + CONTENT_W, y + 80); ctx.stroke();
      ctx.fillStyle = L + "20"; ctx.font = "bold 11px Arial, sans-serif"; ctx.fillText(String(i + 1).padStart(2, "0"), PAD + 20, y + 46);
      ctx.fillStyle = "rgba(255,255,255,0.80)"; ctx.font = "bold 17px Arial, sans-serif"; ctx.fillText(item.name, PAD + 52, y + 42);
      ctx.fillStyle = "rgba(255,255,255,0.25)"; ctx.font = "13px Arial, sans-serif"; ctx.fillText(item.desc, PAD + 500, y + 42);
      ctx.fillStyle = "#ffffff"; ctx.font = "bold 17px Arial, sans-serif"; ctx.textAlign = "right";
      ctx.fillText(item.price, PAD + CONTENT_W - 20, y + 42); ctx.textAlign = "left";
    });
    const badgeY = SH - 110; const badges = ["Materia\u0142y stock w cenie", "Do 2 rund poprawek", "Fonty po stronie Klienta"];
    let bx = PAD;
    badges.forEach((b, i) => {
      const tw = ctx.measureText(b).width + 50;
      ctx.fillStyle = i < 2 ? L + "08" : "rgba(255,255,255,0.03)"; ctx.fillRect(bx, badgeY, tw, 32);
      ctx.strokeStyle = i < 2 ? L + "20" : "rgba(255,255,255,0.06)"; ctx.strokeRect(bx, badgeY, tw, 32);
      ctx.fillStyle = i < 2 ? L + "70" : "rgba(255,255,255,0.20)"; ctx.font = "bold 12px Arial, sans-serif";
      ctx.fillText(i < 2 ? "\u2713" : "\u2014", bx + 12, badgeY + 21);
      ctx.fillStyle = "rgba(255,255,255,0.40)"; ctx.font = "12px Arial, sans-serif"; ctx.fillText(b, bx + 30, badgeY + 21);
      bx += tw + 12;
    });
  }, 3);

  // 4 — Pakiety adaptacji
  addSlide(() => {
    slideHeader(ctx, "03", "Adaptacje formatowe", "Dodatkowe rozmiary i formaty na bazie Key Visual");
    const cW = (CONTENT_W - 60) / 3, cH = 360, cY = 210;
    assetPackages.forEach((pkg, i) => {
      const x = PAD + i * (cW + 30), isMid = i === 1;
      drawCard(ctx, x, cY, cW, cH, { highlight: isMid, topAccent: true });
      ctx.fillStyle = L + (isMid ? "30" : "15"); ctx.font = "bold 120px Arial, sans-serif"; ctx.fillText(pkg.name, x + 35, cY + 140);
      ctx.fillStyle = L + "60"; ctx.font = "bold 11px Arial, sans-serif"; ctx.letterSpacing = "3px";
      ctx.fillText(`PAKIET ${pkg.name}`, x + 35, cY + 180); ctx.letterSpacing = "0px";
      ctx.fillStyle = "rgba(255,255,255,0.50)"; ctx.font = "18px Arial, sans-serif"; ctx.fillText(`${pkg.formats} format\u00F3w`, x + 35, cY + 220);
      ctx.fillStyle = "rgba(255,255,255,0.25)"; ctx.font = "14px Arial, sans-serif"; ctx.fillText("na bazie jednego KV", x + 35, cY + 248);
      ctx.fillStyle = L; ctx.font = "bold 36px Arial, sans-serif"; ctx.fillText(pkg.price, x + 35, cY + 320);
      ctx.fillStyle = "rgba(255,255,255,0.20)"; ctx.font = "14px Arial, sans-serif";
      ctx.fillText("PLN netto", x + 35 + ctx.measureText(pkg.price).width + 10, cY + 320);
    });
    const barY = cY + cH + 30; drawCard(ctx, PAD, barY, CONTENT_W, 56);
    ctx.fillStyle = "rgba(255,255,255,0.60)"; ctx.font = "bold 15px Arial, sans-serif"; ctx.fillText("Dodatkowy format ponad pakiet", PAD + 24, barY + 34);
    ctx.fillStyle = "#ffffff"; ctx.textAlign = "right"; ctx.fillText("250 \u2013 400 PLN netto / szt.", PAD + CONTENT_W - 24, barY + 34); ctx.textAlign = "left";
    ctx.fillStyle = "rgba(255,255,255,0.15)"; ctx.font = "13px Arial, sans-serif";
    ctx.fillText("Przyk\u0142ad: KV kampanijny \u2192 5 baner\u00F3w display + 3 formaty social = Pakiet M (2 700 PLN)", PAD, SH - 80);
  }, 4);

  // 5 — Proces
  addSlide(() => {
    slideHeader(ctx, "04", "Jak wygl\u0105da wsp\u00F3\u0142praca", "Od briefu do gotowych materia\u0142\u00F3w w 3\u20136 tygodni");
    const cW = (CONTENT_W - 90) / 4, cH = 380, cY = 220;
    processSteps.forEach((s, i) => {
      const x = PAD + i * (cW + 30);
      drawCard(ctx, x, cY, cW, cH, { topAccent: true });
      ctx.fillStyle = L + "12"; ctx.font = "bold 140px Arial, sans-serif"; ctx.fillText(String(i + 1), x + 20, cY + 160);
      ctx.fillStyle = "#ffffff"; ctx.font = "bold 24px Arial, sans-serif"; ctx.fillText(s.step, x + 30, cY + 230);
      ctx.fillStyle = L + "40"; ctx.fillRect(x + 30, cY + 242, 40, 2);
      ctx.fillStyle = "rgba(255,255,255,0.40)"; ctx.font = "15px Arial, sans-serif"; wrapText(ctx, s.desc, x + 30, cY + 280, cW - 60, 24);
      if (i < 3) {
        ctx.strokeStyle = L + "25"; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
        ctx.beginPath(); ctx.moveTo(x + cW + 2, cY + cH / 2); ctx.lineTo(x + cW + 28, cY + cH / 2); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = L + "40"; ctx.beginPath();
        ctx.moveTo(x + cW + 24, cY + cH / 2 - 5); ctx.lineTo(x + cW + 30, cY + cH / 2); ctx.lineTo(x + cW + 24, cY + cH / 2 + 5); ctx.fill();
      }
    });
    ctx.fillStyle = "rgba(255,255,255,0.15)"; ctx.font = "12px Arial, sans-serif";
    ctx.fillText("Do 2 rund poprawek w cenie  \u00b7  Dedykowany project manager  \u00b7  Komunikacja: Slack / e-mail", PAD, SH - 80);
  }, 5);

  // 6 — Warunki
  addSlide(() => {
    slideHeader(ctx, "05", "Warunki p\u0142atno\u015Bci", "Rozliczenie etapowe 30 / 30 / 40");
    const tW = (CONTENT_W - 60) / 3;
    [{ pct: "30%", wh: "Po podpisaniu umowy", ds: "Startujemy z briefem i konceptem", ic: "1" },
     { pct: "30%", wh: "Po akceptacji KV", ds: "Produkcja wszystkich materia\u0142\u00F3w", ic: "2" },
     { pct: "40%", wh: "Po dostarczeniu", ds: "Przekazujemy gotowe pliki", ic: "3" }]
    .forEach((t, i) => {
      const x = PAD + i * (tW + 30);
      drawCard(ctx, x, 220, tW, 210, { topAccent: true });
      ctx.fillStyle = L + "20"; ctx.fillRect(x + 24, 244, 28, 28);
      ctx.fillStyle = L; ctx.font = "bold 14px Arial, sans-serif"; ctx.textAlign = "center"; ctx.fillText(t.ic, x + 38, 264); ctx.textAlign = "left";
      ctx.fillStyle = L; ctx.font = "bold 64px Arial, sans-serif"; ctx.textAlign = "center"; ctx.fillText(t.pct, x + tW / 2, 356);
      ctx.fillStyle = "rgba(255,255,255,0.55)"; ctx.font = "bold 15px Arial, sans-serif"; ctx.fillText(t.wh, x + tW / 2, 394);
      ctx.fillStyle = "rgba(255,255,255,0.25)"; ctx.font = "13px Arial, sans-serif"; ctx.fillText(t.ds, x + tW / 2, 418); ctx.textAlign = "left";
    });
    const notes = ["Wszystkie ceny netto PLN + 23% VAT", "Do 2 rund poprawek na ka\u017Cdy materia\u0142 w cenie", "Zdj\u0119cia stockowe w cenie",
      "Licencje na fonty po stronie Klienta", "Prezentacje w formacie Figma (edytowalne)", "Realizacja: 3\u20136 tygodni od akceptacji briefu", "Zakres mo\u017Cna korygowa\u0107 mi\u0119dzy etapami"];
    const nY = 480;
    ctx.fillStyle = "rgba(255,255,255,0.03)"; ctx.fillRect(PAD, nY, CONTENT_W, notes.length * 36 + 24);
    ctx.strokeStyle = "rgba(255,255,255,0.05)"; ctx.strokeRect(PAD, nY, CONTENT_W, notes.length * 36 + 24);
    notes.forEach((n, i) => {
      const ny = nY + 32 + i * 36;
      if (i > 0) { ctx.strokeStyle = "rgba(255,255,255,0.03)"; ctx.beginPath(); ctx.moveTo(PAD + 20, ny - 14); ctx.lineTo(PAD + CONTENT_W - 20, ny - 14); ctx.stroke(); }
      ctx.fillStyle = L + "25"; ctx.font = "bold 10px Arial, sans-serif"; ctx.fillText(String(i + 1).padStart(2, "0"), PAD + 24, ny + 4);
      ctx.fillStyle = "rgba(255,255,255,0.40)"; ctx.font = "14px Arial, sans-serif"; ctx.fillText(n, PAD + 56, ny + 4);
    });
  }, 6);

  // 7 — CTA
  addSlide(() => {
    const g2 = ctx.createRadialGradient(SW / 2, SH / 2, 0, SW / 2, SH / 2, 600);
    g2.addColorStop(0, "rgba(212,255,0,0.04)"); g2.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g2; ctx.fillRect(0, 0, SW, SH);
    ctx.strokeStyle = L + "40"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(SW / 2, 180); ctx.lineTo(SW / 2, 340); ctx.stroke();
    ctx.fillStyle = L; ctx.save(); ctx.translate(SW / 2, 360); ctx.rotate(Math.PI / 4); ctx.fillRect(-5, -5, 10, 10); ctx.restore();
    ctx.textAlign = "center";
    ctx.fillStyle = L + "80"; ctx.font = "bold 12px Arial, sans-serif"; ctx.letterSpacing = "8px";
    ctx.fillText("NAST\u0118PNY KROK", SW / 2, 420); ctx.letterSpacing = "0px";
    ctx.fillStyle = "#ffffff"; ctx.font = "bold 64px Arial, sans-serif"; ctx.fillText("Porozmawiajmy", SW / 2, 520);
    ctx.fillStyle = "rgba(255,255,255,0.30)"; ctx.fillText("o Pyszne Pay", SW / 2, 590);
    ctx.fillStyle = "rgba(255,255,255,0.40)"; ctx.font = "18px Arial, sans-serif";
    ctx.fillText(PDF_CTA_LINE, SW / 2, 650);
    ctx.fillStyle = L; ctx.fillRect(SW / 2 - 170, 700, 340, 56);
    ctx.fillStyle = "#000"; ctx.font = "bold 14px Arial, sans-serif"; ctx.letterSpacing = "3px";
    ctx.fillText("UM\u00D3W SPOTKANIE", SW / 2, 734); ctx.letterSpacing = "0px";
    ctx.fillStyle = "rgba(255,255,255,0.20)"; ctx.font = "14px Arial, sans-serif"; ctx.fillText("hello@r352.agency", SW / 2, 800);
    ctx.fillStyle = "rgba(255,255,255,0.08)"; ctx.font = "11px Arial, sans-serif";
    ctx.fillText("Dokument poufny \u2014 przygotowany wy\u0142\u0105cznie dla Pyszne Pay  \u00b7  r352 agency 2026", SW / 2, 860);
    ctx.textAlign = "left";
  }, 7);

  pdf.save("r352_PysznePay_Pitch_2026.pdf");
}

// ─── Component ───────────────────────────────────────────────────────────────

export function LimitedAccess2() {
  const lenis = useLenis();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    if (lenis && unlocked) {
      const timers = [
        setTimeout(() => lenis.resize(), 100),
        setTimeout(() => lenis.resize(), 500),
        setTimeout(() => lenis.resize(), 1500),
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [lenis, unlocked]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setTimeout(() => {
      if (password === "Pyszne2026") { setUnlocked(true); } else { setError(true); }
      setLoading(false);
    }, 800);
  };

  const handleExportPdf = useCallback(async () => {
    setExporting(true);
    await new Promise((r) => setTimeout(r, 100));
    try { generatePitchPdf(); } catch (err) { console.error("PDF export failed:", err); }
    finally { setExporting(false); }
  }, []);

  // ─── Password Gate ──────────────────────────────────────────
  if (!unlocked) {
    return (
      <PageTransition>
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-12 flex flex-col justify-center items-center">
          <Reveal>
            <div className="w-full max-w-md mx-auto text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mx-auto mb-10 w-20 h-20 border border-white/10 bg-white/[0.02] flex items-center justify-center"
              >
                <Lock className="w-8 h-8 text-[#D4FF00]/60" />
              </motion.div>

              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Oferta dedykowana</h1>
              <p className="text-white/40 text-sm mb-10 max-w-sm mx-auto leading-relaxed">
                Ta strona zawiera poufną ofertę współpracy. Wprowadź hasło otrzymane od agencji.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
                <div className="space-y-2">
                  <label htmlFor="la2-password" className="text-[11px] font-display uppercase tracking-[0.2em] text-white/30">Hasło dostępu</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="la2-password"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setError(false); }}
                      className={`w-full bg-white/[0.03] border ${error ? "border-red-500/60" : "border-white/10 focus:border-[#D4FF00]/50"} px-5 py-4 pr-12 text-white text-lg tracking-wider focus:outline-none transition-colors duration-300`}
                      placeholder="••••••••••"
                      autoFocus
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors">
                      {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                    </button>
                  </div>
                  <motion.div initial={false} animate={{ height: error ? "auto" : 0, opacity: error ? 1 : 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                    <p className="text-red-400/80 text-sm pt-1">Nieprawidłowe hasło. Spróbuj ponownie.</p>
                  </motion.div>
                </div>

                <button type="submit" disabled={loading || !password} className={`group relative flex items-center justify-center px-8 py-4 overflow-hidden transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed ${loading ? "bg-white/10" : "bg-[#D4FF00] hover:bg-[#e0ff33]"} text-black`}>
                  <span className="relative z-10 font-display uppercase tracking-[0.2em] text-sm font-bold">{loading ? "Weryfikacja..." : "Uzyskaj dostęp"}</span>
                  {!loading && <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />}
                </button>
              </form>

              <div className="mt-12 pt-8 border-t border-white/[0.06]">
                <p className="text-white/20 text-xs leading-relaxed">Nie masz hasła? Skontaktuj się z nami.</p>
                <Link href="/contact" className="inline-flex items-center gap-2 mt-4 text-[#D4FF00]/60 hover:text-[#D4FF00] text-sm font-display uppercase tracking-widest transition-colors duration-300">
                  Kontakt <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </PageTransition>
    );
  }

  // ─── Unlocked Content ──────────────────────────────────────
  return (
    <PageTransition>
      <div className="min-h-screen pt-40 pb-32 px-6 md:px-12">
        <div className="max-w-[960px] mx-auto">

          {/* ═══════════════════ HERO ═══════════════════ */}
          <Reveal>
            <div className="mb-16">
              <div className="flex items-start justify-between gap-6 mb-8">
                <div>
                  <span className="text-xs font-display uppercase tracking-[0.3em] text-[#D4FF00] block mb-6">Oferta dedykowana</span>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]">
                    Pyszne Pay<br /><span className="text-white/35">Oferta Marzec 2026</span>
                  </h1>
                </div>
                <div className="w-28 md:w-40 lg:w-48 shrink-0 mt-2">
                  <PyszneLogo />
                </div>
              </div>
              <p className="text-base md:text-lg text-white/50 mt-6 max-w-2xl leading-relaxed">
                Przygotowaliśmy kompletny zestaw materiałów kreatywnych dla Pyszne Pay
                — od głównej grafiki kampanii, przez social media i banery display, po szablony mailingowe i prezentację sprzedażową.
              </p>
              <p className="text-sm text-white/30 mt-3 max-w-2xl leading-relaxed">
                Poniżej przedstawiamy dwa warianty do wyboru, cennik na wypadek domawiania pojedynczych materiałów oraz odpowiedzi na najczęstsze pytania.
              </p>
              <div className="mt-8">
                <button onClick={handleExportPdf} disabled={exporting} className="group inline-flex items-center gap-3 px-5 py-2.5 border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-wait">
                  {exporting ? <Loader2 className="w-4 h-4 text-[#D4FF00] animate-spin" /> : <Download className="w-4 h-4 text-[#D4FF00]/60 group-hover:text-[#D4FF00] transition-colors" />}
                  <span className="text-xs text-white/50 group-hover:text-white/70 transition-colors font-display uppercase tracking-[0.15em]">{exporting ? "Generowanie..." : "Pobierz jako Pitch PDF"}</span>
                  <span className="text-[9px] text-white/20 border border-white/10 px-1.5 py-0.5">16:9</span>
                </button>
              </div>
            </div>
          </Reveal>

          {/* ═══════════════════ W SKRÓCIE — A vs B ═══════════════════ */}
          <Reveal delay={0.03}>
            <div className="mb-24 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Wariant A */}
              <div className="p-6 border border-white/10 bg-white/[0.02]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-display uppercase tracking-[0.2em] text-white/40">Wariant A</span>
                  <span className="text-[10px] text-white/20 border border-white/10 px-2 py-0.5">Podstawowy</span>
                </div>
                <span className="text-3xl md:text-4xl font-bold text-white block">13 000 <span className="text-sm text-white/25">PLN netto</span></span>
                <p className="text-sm text-white/40 mt-3 leading-relaxed">
                  Solidna baza kampanijna: główna grafika (KV), social media, banery display, prezentacja sprzedażowa i 1 szablon mailingu.
                </p>
                <div className="mt-4 pt-4 border-t border-white/[0.06] space-y-1.5">
                  {["Key Visual — 1 motyw", "8 grafik social media", "5 formatów display", "Prezentacja do 15 slajdów", "1 szablon newsletter"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-white/25 shrink-0" />
                      <span className="text-xs text-white/40">{item}</span>
                    </div>
                  ))}
                  {["Landing Page", "Materiały drukowane"].map((item, i) => (
                    <div key={`no-${i}`} className="flex items-center gap-2">
                      <X className="w-3 h-3 text-white/10 shrink-0" />
                      <span className="text-xs text-white/20 line-through">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Wariant B */}
              <div className="p-6 border border-[#D4FF00]/20 bg-[#D4FF00]/[0.03] relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-display uppercase tracking-[0.2em] text-[#D4FF00]/70">Wariant B</span>
                </div>
                <span className="text-3xl md:text-4xl font-bold text-[#D4FF00] block">25 500 <span className="text-sm text-[#D4FF00]/30">PLN netto</span></span>
                <p className="text-sm text-white/45 mt-3 leading-relaxed">
                  Pełny zestaw kreatywny: wszystko z A, ale więcej materiałów w każdej kategorii + landing page, materiały drukowane i 3 szablony mailingów.
                </p>
                <div className="mt-4 pt-4 border-t border-[#D4FF00]/10 space-y-1.5">
                  {[
                    "Key Visual — 1 motyw + 2 adaptacje",
                    "15 grafik social media",
                    "10 formatów display",
                    "Prezentacja do 25 slajdów",
                    "3 szablony newsletter",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-[#D4FF00]/50 shrink-0" />
                      <span className="text-xs text-white/50">{item}</span>
                    </div>
                  ))}
                  {["Landing Page (desktop + mobile)", "3 materiały drukowane (ulotka, plakat, rollup)"].map((item, i) => (
                    <div key={`extra-${i}`} className="flex items-center gap-2">
                      <Zap className="w-3 h-3 text-[#D4FF00]/40 shrink-0" />
                      <span className="text-xs text-[#D4FF00]/60">{item}</span>
                    </div>
                  ))}

                </div>
              </div>
            </div>
          </Reveal>

          {/* ═══════════════════ CO ZAWIERA CENA ═══════════════════ */}
          <Reveal delay={0.03}>
            <div className="mb-24 p-5 border border-white/[0.08] bg-white/[0.02]">
              <span className="text-[10px] font-display uppercase tracking-[0.2em] text-white/30 block mb-4">Co zawiera każda cena</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 shrink-0 border border-[#D4FF00]/15 bg-[#D4FF00]/[0.04] flex items-center justify-center">
                    <Check className="w-4 h-4 text-[#D4FF00]/60" />
                  </div>
                  <div>
                    <span className="text-sm text-white/70 block">Zdjęcia stockowe</span>
                    <span className="text-[11px] text-white/30">Dobieramy i kupujemy — są w cenie</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 shrink-0 border border-[#D4FF00]/15 bg-[#D4FF00]/[0.04] flex items-center justify-center">
                    <Users className="w-4 h-4 text-[#D4FF00]/60" />
                  </div>
                  <div>
                    <span className="text-sm text-white/70 block">2 rundy poprawek</span>
                    <span className="text-[11px] text-white/30">Na każdy materiał, w cenie projektu</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 shrink-0 border border-white/10 bg-white/[0.02] flex items-center justify-center">
                    <Minus className="w-4 h-4 text-white/25" />
                  </div>
                  <div>
                    <span className="text-sm text-white/50 block">Fonty — po stronie Klienta</span>
                    <span className="text-[11px] text-white/25">Licencje na krój firmowy Pyszne.pl</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ═══════════════════ 01 — SZCZEGÓŁOWE PORÓWNANIE ═══════════════════ */}
          <Reveal delay={0.05}>
            <section className="mb-24">
              <div className="mb-10">
                <SectionLabel number="01" />
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mt-3">
                  Szczegółowe porównanie wariantów
                </h2>
                <p className="text-sm text-white/40 mt-3 max-w-2xl leading-relaxed">
                  Dokładne zestawienie: co, ile sztuk i w jakiej cenie wchodzi w skład każdego wariantu.
                  Najedź na nazwę materiału, żeby zobaczyć krótkie wyjaśnienie.
                </p>
              </div>

              {/* Comparison Table */}
              <div className="border border-white/10 overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-[1fr_1fr_1fr] bg-white/[0.04]">
                  <div className="px-5 py-4">
                    <span className="text-[10px] font-display uppercase tracking-[0.2em] text-white/30">Co dostarczamy</span>
                  </div>
                  <div className="px-5 py-4 text-center border-l border-white/[0.06]">
                    <span className="text-[10px] font-display uppercase tracking-[0.2em] text-white/30 block">Wariant A</span>
                    <span className="text-[10px] text-white/15 block mt-0.5">13 000 PLN</span>
                  </div>
                  <div className="px-5 py-4 text-center border-l border-[#D4FF00]/15 bg-[#D4FF00]/[0.03]">
                    <span className="text-[10px] font-display uppercase tracking-[0.2em] text-[#D4FF00]/70 block">Wariant B</span>
                    <span className="text-[10px] text-[#D4FF00]/25 block mt-0.5">25 500 PLN</span>
                  </div>
                </div>

                {/* Deliverable Rows */}
                {comparisonRows.map((row, i) => (
                  <div key={i} className="grid grid-cols-[1fr_1fr_1fr] border-t border-white/[0.06] group/row">
                    <div className="px-5 py-4 flex flex-col justify-center">
                      <span className="text-sm text-white/70 font-medium">{row.name}</span>
                      {glossary[row.name] && (
                        <span className="text-[10px] text-white/20 mt-1 leading-snug max-h-0 overflow-hidden group-hover/row:max-h-20 transition-all duration-300">
                          {glossary[row.name]}
                        </span>
                      )}
                    </div>
                    <div className="px-5 py-4 border-l border-white/[0.06]">
                      <CellValue value={row.a} variant="a" />
                    </div>
                    <div className="px-5 py-4 border-l border-[#D4FF00]/10 bg-[#D4FF00]/[0.015]">
                      <CellValue value={row.b} variant="b" />
                    </div>
                  </div>
                ))}

                {/* Asset packages row */}
                <div className="grid grid-cols-[1fr_1fr_1fr] border-t border-white/[0.06]">
                  <div className="px-5 py-3.5">
                    <span className="text-sm text-white/60">Adaptacje formatowe</span>
                    <span className="block text-[11px] text-white/20 mt-0.5">Dodatkowe rozmiary z jednego KV — osobna wycena</span>
                  </div>
                  <div className="px-5 py-3.5 border-l border-white/[0.06] flex items-center justify-center text-xs text-white/25">
                    opcja
                  </div>
                  <div className="px-5 py-3.5 border-l border-[#D4FF00]/10 bg-[#D4FF00]/[0.015] flex items-center justify-center text-xs text-[#D4FF00]/40">
                    opcja
                  </div>
                </div>

                {/* SUMA */}
                <div className="grid grid-cols-[1fr_1fr_1fr] border-t-2 border-white/20 bg-white/[0.03]">
                  <div className="px-5 py-6">
                    <span className="text-base font-bold text-white">Suma netto</span>
                  </div>
                  <div className="px-5 py-6 flex flex-col items-center justify-center border-l border-white/[0.06]">
                    <span className="text-2xl md:text-3xl font-bold text-white">13 000</span>
                    <span className="text-[10px] text-white/25 mt-0.5">PLN netto</span>
                  </div>
                  <div className="px-5 py-6 flex flex-col items-center justify-center border-l border-[#D4FF00]/20 bg-[#D4FF00]/[0.04]">
                    <span className="text-2xl md:text-3xl font-bold text-[#D4FF00]">25 500</span>
                    <span className="text-[10px] text-[#D4FF00]/35 mt-0.5">PLN netto</span>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-white/20 mt-3 text-center">
                Wszystkie ceny netto PLN + 23% VAT. Pakiety adaptacji formatowych (S/M/L) wyceniane osobno — szczegóły w sekcji 04.
              </p>
            </section>
          </Reveal>

          {/* ═══════════════════ 02 — CENNIK JEDNOSTKOWY ═══════════════════ */}
          <Reveal delay={0.05}>
            <section className="mb-24">
              <SectionLabel number="02" />
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-3">
                Cennik pojedynczych usług
              </h2>
              <p className="text-sm text-white/40 mt-2 mb-8 max-w-2xl leading-relaxed">
                Dodatkowy materiał poza wybranym wariantem? Poniżej ceny startowe
                za pojedyncze elementy — można je domówić w dowolnym momencie.
              </p>

              <div className="space-y-0 border border-white/[0.06]">
                {pricingItems.map((item, i) => (
                  <div key={i} className={`flex items-center justify-between gap-4 px-5 py-4 ${i > 0 ? "border-t border-white/[0.06]" : ""} hover:bg-white/[0.02] transition-colors`}>
                    <div className="min-w-0">
                      <span className="text-sm text-white/80 font-medium block">{item.name}</span>
                      <span className="text-xs text-white/30 block mt-0.5">{item.desc}</span>
                    </div>
                    <span className="text-sm text-white font-bold whitespace-nowrap shrink-0">{item.price}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 bg-[#D4FF00]/[0.03] border border-[#D4FF00]/10">
                <p className="text-xs text-white/40 leading-relaxed">
                  <span className="text-[#D4FF00]/60 font-bold">Uwaga:</span> W ramach wariantu A lub B poszczególne materiały są wycenione korzystniej,
                  ponieważ korzystają ze wspólnego Key Visual i strategii kreatywnej. Powyższe ceny dotyczą zamówień realizowanych niezależnie.
                </p>
              </div>
            </section>
          </Reveal>

          {/* ═══════════════════ 03 — OPCJONALNE USŁUGI DODATKOWE ═══════════════════ */}
          <Reveal delay={0.05}>
            <section className="mb-24">
              <SectionLabel number="03" />
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-3">
                Usługi dodatkowe
              </h2>
              <p className="text-sm text-white/40 mt-2 mb-8 max-w-2xl leading-relaxed">
                Można je dodać do dowolnego wariantu — są wyceniane niezależnie
                i realizowane równolegle lub po zakończeniu głównego projektu.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {addonServices.map((addon, i) => (
                  <div key={i} className="group p-5 border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-9 h-9 shrink-0 border border-[#D4FF00]/15 bg-[#D4FF00]/[0.04] flex items-center justify-center">
                        <AddonIcon icon={addon.icon} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-3 mb-1">
                          <span className="text-sm font-bold text-white/80">{addon.name}</span>
                          <span className="text-xs font-bold text-[#D4FF00]/70 whitespace-nowrap tabular-nums">{addon.price}</span>
                        </div>
                        <span className="text-xs text-white/40 block">{addon.desc}</span>
                        <span className="text-[10px] text-[#D4FF00]/30 block mt-0.5">{addon.unit}</span>
                        <div className="mt-2.5 pt-2.5 border-t border-white/[0.04]">
                          <span className="text-[11px] text-white/30 leading-relaxed block">{addon.scope}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-white/15 mt-3 text-center">Ceny orientacyjne netto PLN. Finalna wycena po określeniu szczegółowego zakresu.</p>
            </section>
          </Reveal>

          {/* ═══════════════════ 04 — PAKIETY ADAPTACJI ═══════════════════ */}
          <Reveal delay={0.05}>
            <section className="mb-24">
              <SectionLabel number="04" />
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-3">
                Adaptacje formatowe
              </h2>
              <p className="text-sm text-white/40 mt-2 mb-3 max-w-2xl leading-relaxed">
                Po stworzeniu głównej grafiki (Key Visual) możemy ją zaadaptować do dodatkowych
                rozmiarów i formatów — np. dodatkowe banery display, formaty social media, nagłówki e-mail itp.
              </p>
              <p className="text-xs text-white/25 mb-8 max-w-2xl leading-relaxed">
                Przykład: Key Visual kampanijny Klienta &rarr; 5 dodatkowych banerów display + 3 nowe formaty social = Pakiet M.
              </p>
              <div className="grid grid-cols-3 gap-3 md:gap-4">
                {assetPackages.map((pkg, i) => (
                  <div key={i} className="p-5 md:p-6 border border-white/[0.08] bg-white/[0.02] flex flex-col items-center text-center">
                    <span className="text-2xl md:text-3xl font-bold text-[#D4FF00] mb-2">{pkg.name}</span>
                    <span className="text-xs text-white/40 mb-4">{pkg.formats} formatów</span>
                    <span className="text-lg md:text-xl font-bold text-white">{pkg.price}</span>
                    <span className="text-[10px] text-white/25">PLN netto</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 p-4 border border-white/[0.06] bg-white/[0.02] flex items-center justify-between flex-wrap gap-2">
                <span className="text-sm text-white/60">Dodatkowy format ponad pakiet</span>
                <span className="text-sm font-bold text-white">250-400 <span className="text-white/30 text-xs">PLN netto / szt.</span></span>
              </div>
            </section>
          </Reveal>

          {/* ═══════════════════ 05 — JAK PRACUJEMY ═══════════════════ */}
          <Reveal delay={0.05}>
            <section className="mb-24">
              <SectionLabel number="05" />
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-3">
                Jak wygląda współpraca
              </h2>
              <p className="text-sm text-white/40 mt-2 mb-8 max-w-2xl leading-relaxed">
                Cztery etapy — od ustalenia zakresu po dostarczenie gotowych plików.
                Całość trwa 3-6 tygodni od akceptacji briefu.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {processSteps.map((s, i) => (
                  <div key={i} className="p-5 border border-white/[0.06] bg-white/[0.02] relative">
                    <span className="text-3xl font-bold text-[#D4FF00]/20 block mb-3">{i + 1}</span>
                    <h4 className="text-sm font-bold text-white mb-2">{s.step}</h4>
                    <p className="text-xs text-white/35 leading-relaxed">{s.desc}</p>
                    {i < 3 && (
                      <div className="hidden md:flex absolute -right-[18px] top-1/2 -translate-y-1/2 z-10 w-6 h-6 items-center justify-center">
                        <ArrowRight className="w-3 h-3 text-[#D4FF00]/20" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          {/* ═══════════════════ 06 — WARUNKI PŁATNOŚCI ═══════════════════ */}
          <Reveal delay={0.05}>
            <section className="mb-24">
              <SectionLabel number="06" />
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-3 mb-8">
                Warunki płatności
              </h2>

              {/* Payment terms */}
              <div className="grid grid-cols-3 gap-0 mb-6">
                {[
                  { pct: "30%", when: "Po podpisaniu umowy", desc: "Startujemy z briefem i konceptem" },
                  { pct: "30%", when: "Po akceptacji KV", desc: "Przechodzimy do produkcji materiałów" },
                  { pct: "40%", when: "Po dostarczeniu", desc: "Przekazujemy wszystkie pliki" },
                ].map((t, i) => (
                  <div key={i} className={`p-5 border border-white/[0.06] ${i > 0 ? "border-l-0" : ""} bg-white/[0.02] text-center`}>
                    <span className="text-2xl md:text-3xl font-bold text-[#D4FF00] block">{t.pct}</span>
                    <span className="text-[11px] text-white/50 mt-1.5 block leading-tight">{t.when}</span>
                    <span className="text-[10px] text-white/20 mt-1 block">{t.desc}</span>
                  </div>
                ))}
              </div>

              {/* Notes */}
              <div className="space-y-0 border border-white/[0.06]">
                {[
                  "Wszystkie ceny netto PLN + 23% VAT.",
                  "Do 2 rund poprawek na każdy materiał w cenie. Kolejne rundy wyceniane osobno.",
                  "Zdjęcia stockowe (fotografie, grafiki) dobieramy i kupujemy — są w cenie.",
                  "Licencje na fonty (np. krój firmowy Pyszne.pl) po stronie Klienta.",
                  "Prezentacje w formacie Figma — zespół Klienta może edytować treści samodzielnie.",
                  "Czas realizacji: 3–6 tygodni od momentu zatwierdzenia briefu.",
                  "Zakres można skorygować między etapami — każda zmiana jest transparentnie wyceniana.",
                ].map((note, i) => (
                  <div key={i} className={`px-5 py-3 ${i > 0 ? "border-t border-white/[0.04]" : ""} flex items-start gap-3`}>
                    <span className="text-white/15 text-xs mt-0.5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-sm text-white/45 leading-relaxed">{note}</span>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          {/* ═══════════════════ FAQ ═══════════════════ */}
          <Reveal delay={0.05}>
            <section className="mb-24">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                Najczęstsze pytania
              </h2>
              <p className="text-sm text-white/40 mt-2 mb-8 max-w-2xl leading-relaxed">
                Odpowiedzi na pytania, które najczęściej pojawiają się na tym etapie rozmów.
              </p>

              <div className="space-y-2">
                {faqItems.map((faq, i) => (
                  <FaqAccordion key={i} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </section>
          </Reveal>

          {/* ═══════════════════ CTA ═══════════════════ */}
          <Reveal delay={0.05}>
            <div className="border-t border-white/[0.06] pt-16 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Porozmawiajmy o Pyszne Pay
              </h3>
              <p className="text-white/40 text-sm mb-8 max-w-lg mx-auto leading-relaxed">
                Prosimy o wybór preferowanego wariantu — lub umówmy rozmowę,
                żeby doprecyzować zakres i odpowiedzieć na dodatkowe pytania.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-10 py-4 bg-[#D4FF00] text-black font-display uppercase tracking-[0.2em] text-sm font-bold hover:bg-[#e0ff33] transition-colors duration-300 group"
                >
                  Umów spotkanie
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  onClick={handleExportPdf}
                  disabled={exporting}
                  className="inline-flex items-center gap-3 px-8 py-4 border border-white/10 hover:border-white/20 bg-white/[0.03] hover:bg-white/[0.06] text-white/50 hover:text-white/70 font-display uppercase tracking-[0.2em] text-sm transition-all duration-300 disabled:opacity-50"
                >
                  {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                  Pobierz PDF
                </button>
              </div>
              <div className="mt-8 flex items-center justify-center gap-6 text-[11px] text-white/20">
                <span className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> hello@r352.agency</span>
              </div>
              <p className="text-white/10 text-xs mt-8">
                Dokument poufny — przygotowany wyłącznie dla Pyszne Pay  |  r352 agency 2026
              </p>
            </div>
          </Reveal>

        </div>
      </div>
    </PageTransition>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function SectionLabel({ number }: { number: string }) {
  return (
    <span className="text-[11px] font-display uppercase tracking-[0.25em] text-[#D4FF00]/35">
      {number}
    </span>
  );
}

function CellValue({ value, variant }: { value: false | { qty: string; details: string[]; price: string }; variant: "a" | "b" }) {
  if (value === false) {
    return (
      <div className="flex items-center justify-center h-full min-h-[40px]">
        <span className="text-white/12 text-lg">&mdash;</span>
      </div>
    );
  }
  const isLime = variant === "b";
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2 mb-1">
        <span className={`text-sm font-bold ${isLime ? "text-[#D4FF00]" : "text-white/70"}`}>
          {value.qty}
        </span>
        <span className={`text-xs font-bold tabular-nums whitespace-nowrap ${isLime ? "text-[#D4FF00]/60" : "text-white/40"}`}>
          {value.price} <span className={`text-[9px] ${isLime ? "text-[#D4FF00]/30" : "text-white/20"}`}>PLN</span>
        </span>
      </div>
      <div className="space-y-0.5">
        {value.details.map((d, i) => (
          <span key={i} className={`text-[11px] block leading-snug ${isLime ? "text-white/35" : "text-white/25"}`}>
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}

function AddonIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "code":
      return <Code className="w-5 h-5 text-[#D4FF00]/60" />;
    case "film":
      return <Film className="w-5 h-5 text-[#D4FF00]/60" />;
    case "pen":
      return <PenTool className="w-5 h-5 text-[#D4FF00]/60" />;
    case "book":
      return <BookOpen className="w-5 h-5 text-[#D4FF00]/60" />;
    default:
      return <Code className="w-5 h-5 text-[#D4FF00]/60" />;
  }
}

function FaqAccordion({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border transition-colors duration-200 ${open ? "border-white/15 bg-white/[0.03]" : "border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.02]"}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className={`text-sm transition-colors duration-200 ${open ? "text-white/80" : "text-white/50"}`}>{question}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown className="w-4 h-4 text-white/20" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-4 text-sm text-white/35 leading-relaxed">{answer}</p>
      </motion.div>
    </div>
  );
}
