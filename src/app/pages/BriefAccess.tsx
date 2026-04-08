import { useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { Reveal } from "@/app/components/ui/Reveal";

export function BriefAccess() {
  const { t } = useLanguage();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    // Simulate a small delay for better UX
    setTimeout(() => {
      if (password === "BetterW2026") {
        window.location.href = "https://detailedbrief.vercel.app/";
      } else {
        setError(true);
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-12 flex flex-col justify-center items-center">
      <Reveal>
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            {t("nav.detailed_brief")}
          </h1>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-mono uppercase tracking-widest text-neutral-400">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className={`w-full bg-white/5 border ${error ? 'border-red-500' : 'border-white/10'} p-4 text-white focus:outline-none focus:border-[#D4FF00] transition-colors`}
                placeholder="Enter password"
                autoFocus
              />
              {error && (
                <p className="text-red-500 text-sm mt-2">
                  Incorrect password. Please try again.
                </p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={loading || !password}
              className={`
                group relative flex items-center justify-center px-8 py-4 
                ${loading ? 'bg-neutral-800' : 'bg-[#D4FF00]'} 
                text-black transition-all duration-300 overflow-hidden
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              <span className="relative z-10 font-display uppercase tracking-widest font-bold">
                {loading ? "Verifying..." : "Access Brief"}
              </span>
              {!loading && (
                 <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              )}
            </button>
          </form>
          
          <p className="mt-8 text-center text-neutral-500 text-sm">
            This document is protected. Please enter the password provided by the agency.
          </p>
        </div>
      </Reveal>
    </div>
  );
}