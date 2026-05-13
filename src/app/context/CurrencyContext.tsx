import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Currency = "eur" | "pln";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  toggleCurrency: () => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const STORAGE_KEY = "r352-currency";

// EUR → PLN multiplier (rough rate; update if needed)
export const EUR_TO_PLN = 4.3;

export function CurrencyProvider({ children }: { children: ReactNode }) {
  // Initialize from localStorage if available, else default EUR
  const [currency, setCurrencyState] = useState<Currency>(() => {
    if (typeof window === "undefined") return "eur";
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return saved === "pln" ? "pln" : "eur";
    } catch {
      return "eur";
    }
  });

  // Persist to localStorage on change
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, currency);
    } catch {
      /* ignore */
    }
  }, [currency]);

  const setCurrency = (c: Currency) => setCurrencyState(c);
  const toggleCurrency = () => setCurrencyState((c) => (c === "eur" ? "pln" : "eur"));

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, toggleCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

const defaultCtx: CurrencyContextType = {
  currency: "eur",
  setCurrency: () => {},
  toggleCurrency: () => {},
};

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  return ctx ?? defaultCtx;
}

// ─── Helpers ─────────────────────────────────────────────────────────

function formatNumber(n: number): string {
  // 17200 → "17 200" (spaces as thousand separator, PL style works for both EUR and PLN)
  return Math.round(n).toLocaleString("pl-PL").replace(/ /g, " ").replace(/,/g, " ");
}

function symbolFor(currency: Currency): string {
  return currency === "pln" ? "zł" : "€";
}

interface FormatOpts {
  from: number; // EUR base value
  to?: number | null; // EUR upper bound (optional)
  monthly?: boolean;
  prefix?: string; // e.g. "+ " for add-on
  language?: "pl" | "en";
}

export function formatPrice(currency: Currency, opts: FormatOpts): string {
  const rate = currency === "pln" ? EUR_TO_PLN : 1;
  const fromVal = opts.from * rate;
  const toVal = opts.to != null ? opts.to * rate : null;

  const fromStr = formatNumber(fromVal);
  const toStr = toVal != null ? formatNumber(toVal) : null;

  const symbol = symbolFor(currency);
  const periodSuffix = opts.monthly
    ? ` ${symbol} / ${opts.language === "pl" ? "msc" : "mo"}`
    : ` ${symbol}`;

  const range = toStr ? `${fromStr} — ${toStr}` : fromStr;
  return `${opts.prefix ?? ""}${range}${periodSuffix}`;
}
