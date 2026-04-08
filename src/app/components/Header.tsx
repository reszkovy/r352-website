import { Link } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-background-dark/95 backdrop-blur-sm">
      <div className="max-w-[1600px] mx-auto px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-primary">
            <svg
              className="size-5"
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase">
            Executive Briefing v1.0
          </span>
        </div>
        <div className="flex items-center gap-8">
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1">
            Internal Use Only
          </span>
          <div className="h-4 w-px bg-white/10"></div>
          <a
            href="#qualification"
            className="text-xs font-display uppercase tracking-widest hover:tracking-[0.25em] hover:text-primary transition-all duration-300"
          >
            Skip to Audit
          </a>
        </div>
      </div>
    </header>
  );
}
