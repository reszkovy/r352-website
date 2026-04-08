import {
  DraftingCompass,
  Terminal,
  ShieldCheck,
  Stethoscope,
  Landmark,
  Building,
} from "lucide-react";

export function Framework() {
  return (
    <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      <div className="space-y-12">
        <div className="relative">
          <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-primary mb-8">
            The Framework
          </h2>
          <div className="flex flex-col gap-px bg-white/10">
            <div className="bg-background-dark p-6 flex justify-between items-center group">
              <span className="text-3xl serif-heading italic opacity-40 group-hover:opacity-100 transition-opacity">
                01. Strategy
              </span>
              <DraftingCompass className="text-primary size-8" />
            </div>
            <div className="bg-background-dark p-6 flex justify-between items-center group">
              <span className="text-3xl serif-heading italic opacity-40 group-hover:opacity-100 transition-opacity">
                02. Protocol
              </span>
              <Terminal className="text-primary size-8" />
            </div>
            <div className="bg-background-dark p-6 flex justify-between items-center group">
              <span className="text-3xl serif-heading italic opacity-40 group-hover:opacity-100 transition-opacity">
                03. Governance
              </span>
              <ShieldCheck className="text-primary size-8" />
            </div>
          </div>
        </div>
        <p className="text-2xl leading-relaxed text-slate-300">
          Traditional "Doing" scales linearly. <br />
          Systemic "Defining" scales{" "}
          <span className="text-primary italic">exponentially</span>.
        </p>
      </div>
      <div className="relative p-12 border border-white/5 bg-white/[0.01]">
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <span className="text-[200px] font-bold tracking-tighter select-none">
            ORDER
          </span>
        </div>
        <div className="grid grid-cols-3 gap-8 relative z-10">
          <div className="aspect-square border border-white/10 flex flex-col items-center justify-center p-4 text-center bg-background-dark/50 backdrop-blur-sm">
            <span className="text-xs font-bold uppercase tracking-widest opacity-40 mb-2">
              Medtech
            </span>
            <Stethoscope className="text-3xl mb-1" />
          </div>
          <div className="aspect-square border border-white/10 flex flex-col items-center justify-center p-4 text-center bg-background-dark/50 backdrop-blur-sm">
            <span className="text-xs font-bold uppercase tracking-widest opacity-40 mb-2">
              Fintech
            </span>
            <Landmark className="text-3xl mb-1" />
          </div>
          <div className="aspect-square border border-white/10 flex flex-col items-center justify-center p-4 text-center bg-background-dark/50 backdrop-blur-sm">
            <span className="text-xs font-bold uppercase tracking-widest opacity-40 mb-2">
              Real Estate
            </span>
            <Building className="text-3xl mb-1" />
          </div>
        </div>
        <div className="mt-8 text-center uppercase tracking-[0.3em] text-[10px] font-bold opacity-30">
          Structural Compatibility Index: High
        </div>
      </div>
    </div>
  );
}
