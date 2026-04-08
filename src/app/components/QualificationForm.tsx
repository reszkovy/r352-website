export function QualificationForm() {
  return (
    <section
      className="mt-40 pt-20 border-t border-white/10"
      id="qualification"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span className="type-sub-sm text-[#D4FF00] mb-4 block">
            Assessment
          </span>
          <h2 className="type-h2 mb-6">
            Qualification Protocol
          </h2>
          <p className="type-body-base">
            Determine if your organization is ready for systemic structural
            intervention.
          </p>
        </div>
        <form className="space-y-16" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-6">
            <label className="type-sub-base text-white block">
              01. Your primary operational challenge?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Execution bottlenecks at scale",
                "Lack of creative consistency",
                "Founder-dependency friction",
                "Uncontrolled technical debt",
              ].map((option, i) => (
                <div className="relative" key={i}>
                  <input
                    className="peer hidden"
                    id={`q1a${i}`}
                    name="q1"
                    type="radio"
                  />
                  <label
                    className="block p-6 border border-white/10 hover:border-white/30 cursor-pointer transition-all type-body-sm text-neutral-400 peer-checked:border-[#D4FF00] peer-checked:bg-[#D4FF00]/10 peer-checked:text-white"
                    htmlFor={`q1a${i}`}
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <label className="type-sub-base text-white block">
              02. Desired Level of Control?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["Optimization", "Overhaul", "Full Autonomy"].map(
                (option, i) => (
                  <div className="relative" key={i}>
                    <input
                      className="peer hidden"
                      id={`q2a${i}`}
                      name="q2"
                      type="radio"
                    />
                    <label
                      className="block p-6 border border-white/10 hover:border-white/30 cursor-pointer transition-all text-center type-sub-sm text-neutral-400 peer-checked:border-[#D4FF00] peer-checked:bg-[#D4FF00]/10 peer-checked:text-white"
                      htmlFor={`q2a${i}`}
                    >
                      {option}
                    </label>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="space-y-8 pt-8 border-t border-white/10">
            <div className="relative">
              <input
                className="w-full bg-transparent border-0 border-b border-white/20 py-4 focus:ring-0 focus:border-[#D4FF00] focus:outline-none transition-colors type-body-lg placeholder:text-neutral-700 text-white"
                placeholder="Direct professional email"
                type="email"
              />
            </div>
            <button className="w-full py-6 bg-[#D4FF00] text-black font-display uppercase text-lg transition-all duration-500 ease-out flex items-center justify-center gap-4 group cursor-pointer relative overflow-hidden whitespace-nowrap">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <span className="flex items-center justify-center relative z-10">
                <span className="invisible tracking-widest">Initiate Briefing Call</span>
                <span className="absolute tracking-widest group-hover:tracking-normal transition-all duration-500 ease-out">Initiate Briefing Call</span>
              </span>
            </button>
            <p className="type-sub-sm text-center opacity-40">
              Response time: &lt; 24h for qualified leads.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
