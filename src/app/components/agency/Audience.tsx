export function Audience() {
  return (
    <section className="py-32 px-8 md:px-12 border-t border-white/10">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
        
        {/* Who this is for */}
        <div>
          <span className="text-xs font-display font-bold uppercase tracking-[0.2em] text-white/60 mb-8 block">
            Who this is for
          </span>
          <h3 className="text-4xl font-bold tracking-tighter text-white mb-12 leading-tight">
            We work best with growing brands and product-driven teams.
          </h3>
          <ul className="space-y-6">
            {[
              "Founders and leaders who value design and clarity",
              "Companies across multiple touchpoints or markets",
              "Teams that value long-term thinking"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="text-white mt-1.5 size-1.5 bg-white rounded-full shrink-0" />
                <span className="text-xl text-neutral-300 font-normal tracking-tight">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-12 text-sm text-neutral-500 font-display uppercase tracking-widest">
            Geography doesn’t matter. Mindset does.
          </p>
        </div>

        {/* Not for */}
        <div className="opacity-60 hover:opacity-100 transition-opacity duration-500">
           <span className="text-xs font-display font-bold uppercase tracking-[0.2em] text-neutral-600 mb-8 block">
            Probably not a fit if...
          </span>
          <ul className="space-y-6 border-l border-white/10 pl-8">
            {[
              "You’re looking for fast, cheap production",
              "Design is treated as decoration",
              "Decisions are constantly postponed",
              "Everything needs to be done yesterday"
            ].map((item, i) => (
              <li key={i} className="text-lg text-neutral-400 tracking-tight">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-12 pl-8 text-sm text-neutral-500 font-display uppercase tracking-widest">
            We prefer fewer projects done well.
          </p>
        </div>

      </div>
    </section>
  );
}
