import { FormEvent, useState } from "react";

/**
 * QualificationForm - accessibility notes (WCAG 2.1 AA):
 *
 * - Radio groups use <fieldset>/<legend> so screen readers announce the
 *   question together with each option (1.3.1 Info and Relationships).
 * - Radio inputs are visually hidden with `sr-only` - NOT `hidden`
 *   (display:none removed them from the tab order and the a11y tree
 *   entirely). Keyboard focus paints a lime ring on the styled label via
 *   peer-focus-visible (2.1.1 Keyboard / 2.4.7 Focus Visible).
 * - Email input carries an explicit aria-label (placeholder alone is not
 *   an accessible name), and on invalid submit gets aria-invalid plus an
 *   error message linked through aria-describedby (3.3.1 / 3.3.3).
 */
export function QualificationForm() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      setEmailError("Email is required - enter your direct professional email.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailError("Enter a valid email address, e.g. name@company.com.");
      return;
    }
    setEmailError(null);
  };

  // Shared option-card classes - peer-focus-visible mirrors the global lime
  // focus ring (the sr-only input holds focus; the visible label shows it).
  const optionFocusClasses =
    "peer-focus-visible:outline-2 peer-focus-visible:outline-solid peer-focus-visible:outline-[#D4FF00] peer-focus-visible:outline-offset-3";

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
        <form className="space-y-16" onSubmit={handleSubmit} noValidate>
          <fieldset className="space-y-6 border-0 p-0 m-0 min-w-0">
            <legend className="type-sub-base text-white block mb-6">
              01. Your primary operational challenge?
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Execution bottlenecks at scale",
                "Lack of creative consistency",
                "Founder-dependency friction",
                "Uncontrolled technical debt",
              ].map((option, i) => (
                <div className="relative" key={i}>
                  <input
                    className="peer sr-only"
                    id={`q1a${i}`}
                    name="q1"
                    value={option}
                    type="radio"
                  />
                  <label
                    className={`block p-6 border border-white/10 hover:border-white/30 cursor-pointer transition-all type-body-sm text-neutral-400 peer-checked:border-[#D4FF00] peer-checked:bg-[#D4FF00]/10 peer-checked:text-white ${optionFocusClasses}`}
                    htmlFor={`q1a${i}`}
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
          <fieldset className="space-y-6 border-0 p-0 m-0 min-w-0">
            <legend className="type-sub-base text-white block mb-6">
              02. Desired Level of Control?
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["Optimization", "Overhaul", "Full Autonomy"].map(
                (option, i) => (
                  <div className="relative" key={i}>
                    <input
                      className="peer sr-only"
                      id={`q2a${i}`}
                      name="q2"
                      value={option}
                      type="radio"
                    />
                    <label
                      className={`block p-6 border border-white/10 hover:border-white/30 cursor-pointer transition-all text-center type-sub-sm text-neutral-400 peer-checked:border-[#D4FF00] peer-checked:bg-[#D4FF00]/10 peer-checked:text-white ${optionFocusClasses}`}
                      htmlFor={`q2a${i}`}
                    >
                      {option}
                    </label>
                  </div>
                )
              )}
            </div>
          </fieldset>
          <div className="space-y-8 pt-8 border-t border-white/10">
            <div className="relative">
              <label className="sr-only" htmlFor="qualification-email">
                Direct professional email
              </label>
              <input
                className="w-full bg-transparent border-0 border-b border-white/20 py-4 focus:ring-0 focus:border-[#D4FF00] focus:outline-none transition-colors type-body-lg placeholder:text-neutral-700 text-white"
                id="qualification-email"
                name="email"
                autoComplete="email"
                placeholder="Direct professional email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError(null);
                }}
                aria-invalid={emailError ? true : undefined}
                aria-describedby={emailError ? "qualification-email-error" : undefined}
              />
              {emailError && (
                <p
                  id="qualification-email-error"
                  role="alert"
                  className="mt-3 text-sm text-[#FF6B6B]"
                >
                  {emailError}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-6 bg-[#D4FF00] text-black font-display uppercase text-lg transition-all duration-500 ease-out flex items-center justify-center gap-4 group cursor-pointer relative overflow-hidden whitespace-nowrap"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <span className="flex items-center justify-center relative z-10">
                {/* Sizing ghost - visibility:hidden, already excluded from the
                    a11y tree; the absolute span below provides the accessible name. */}
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
