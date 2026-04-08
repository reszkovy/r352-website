export function Hero() {
  return (
    <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12 border-l-4 border-primary pl-10">
      <div className="max-w-4xl">
        <h1 className="serif-heading text-6xl md:text-8xl leading-none mb-6">
          System <span className="italic text-primary">Architecture</span> for Scale.
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl">
          I do not execute tasks. I design the autonomous systems that govern creative production and operational certainty for C-suite leaders.
        </p>
      </div>
      <div className="hidden lg:block text-right">
        <div className="text-xs font-bold uppercase tracking-[0.4em] opacity-40 mb-2">
          Subject
        </div>
        <div className="text-2xl">
          Structural Entropy vs. Managed Scale
        </div>
      </div>
    </div>
  );
}
