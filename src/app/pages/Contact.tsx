import { PageTransition } from "@/app/components/ui/PageTransition";
import { Reveal } from "@/app/components/ui/Reveal";
import { useLanguage } from "@/app/context/LanguageContext";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { projectId, publicAnonKey } from "../../../utils/supabase/info";
import { toast } from "sonner";

type FormData = {
  name: string;
  email: string;
  company?: string;
  context: string;
  stage: string;
  support: string[];
  budget?: string;
  timeline: string;
};

const stages = [
  "Early idea / exploration",
  "Growing and feeling the need for structure",
  "Scaling and trying to maintain quality",
  "Something else"
];

const supportOptions = [
  "Direction & strategy",
  "Digital product or platform",
  "Design system / visual direction",
  "Ongoing partnership",
  "Not sure yet"
];

const budgetRanges = [
  "5k–10k (Design Sprint / Brand Audit, 2 weeks)",
  "10k–25k",
  "25k–50k",
  "50k+",
  "Not defined yet"
];

const timings = [
  "As soon as possible",
  "In the next 1–2 months",
  "Later this year",
  "Just exploring"
];

export function Contact() {
  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({
    defaultValues: {
      support: []
    }
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const selectedSupport = watch("support");
  const { t, language } = useLanguage();

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);
    console.log("[Contact Form] Submitting form data:", JSON.stringify(data, null, 2));
    
    // Construct email body for mailto fallback
    const subject = `New Project Inquiry: ${data.name} from ${data.company || 'Individual'}`;
    const body = `
Name: ${data.name}
Email: ${data.email}
Company: ${data.company || '-'}
Stage: ${data.stage || '-'}
Budget: ${data.budget || '-'}
Timeline: ${data.timeline || '-'}

Support needed:
${(data.support || []).join(', ') || '-'}

Context:
${data.context}
    `.trim();

    // 1. Send via FormSubmit
    try {
      const formSubmitUrl = `https://formsubmit.co/ajax/p.reszkovy@gmail.com`;
      console.log("[Contact Form] Sending to:", formSubmitUrl);
      
      const response = await fetch(formSubmitUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: subject,
          name: data.name,
          email: data.email,
          company: data.company || '-',
          context: data.context,
          stage: data.stage || '-',
          support: data.support?.join(", ") || '-',
          budget: data.budget || '-',
          timeline: data.timeline || '-',
        })
      });

      const responseData = await response.json();
      console.log("[Contact Form] Server response:", responseData);

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to send message");
      }
      
      console.log("[Contact Form] Successfully sent");
      toast.success(language === 'pl' ? "Wiadomość została wysłana pomyślnie!" : "Message sent successfully!");
      setIsSubmitted(true);
    } catch (error) {
      console.error("[Contact Form] Fetch failed:", error);
      
      // 2. Try opening email client as backup if fetch fails
      try {
        const mailtoUrl = `mailto:p.reszkovy@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        const link = document.createElement('a');
        link.href = mailtoUrl;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        setTimeout(() => document.body.removeChild(link), 100);
        
        setIsSubmitted(true);
        toast.success(language === 'pl' ? "Otworzono klienta poczty." : "Opened mail client.");
      } catch (e) {
        console.log("[Contact Form] mailto fallback failed:", e);
        toast.error(language === 'pl' ? "Wystąpił błąd. Spróbuj ponownie." : "Network error. Please try again.");
      }
    }
  };

  const toggleSupport = (option: string) => {
    const current = selectedSupport || [];
    if (current.includes(option)) {
      setValue("support", current.filter(item => item !== option));
    } else {
      if (current.length < 3) {
        setValue("support", [...current, option]);
      }
    }
  };

  if (isSubmitted) {
    return (
      <PageTransition className="pt-32 min-h-screen flex flex-col items-center justify-center text-center px-6">
        <Reveal>
          <div className="max-w-xl mx-auto space-y-8">
            <div className="w-16 h-16 bg-[#D4FF00] rounded-full flex items-center justify-center mx-auto mb-8 text-black">
              <Check size={32} />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
              {t("contact.success.title")}
            </h2>
            <p className="text-xl text-neutral-400 leading-relaxed">
              {t("contact.success.body")}
            </p>
          </div>
        </Reveal>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="pt-32 pb-24 px-6 md:px-12 max-w-[1800px] mx-auto min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        
        {/* Left Column - Context */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
          <Reveal>
            <div className="mb-12">
              <span className="text-xs font-display uppercase tracking-[0.2em] text-[#D4FF00] mb-8 block">
                {t("contact.label")}
              </span>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-12 leading-[0.9]">
                {t("contact.title_line1")} <br /> {t("contact.title_line2")}
              </h1>
              <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl leading-relaxed">
                 {t("contact.intro")}
              </p>
            </div>

            <div className="space-y-8 text-sm text-neutral-500 hidden lg:block">
              <div>
                <p className="mb-2 uppercase tracking-widest font-display text-xs">{t("contact.sidebar.email_label")}</p>
                <a href="mailto:hello@r352.com" className="text-white hover:text-[#D4FF00] transition-colors text-lg">
                  hello@r352.com
                </a>
              </div>
              <p className="max-w-xs leading-relaxed">
                {t("contact.sidebar.text")}
              </p>

              <div className="pt-8 border-t border-white/10">
                <span className="text-xs font-display uppercase tracking-widest text-[#D4FF00] mb-3 block">
                  {t("contact.detailed_brief.label")}
                </span>
                <p className="text-neutral-400 mb-4 leading-relaxed">
                  {t("contact.detailed_brief.description")}
                </p>
                <a 
                  href="/brief-access"
                  className="inline-flex items-center gap-2 text-white border-b border-white/30 pb-1 hover:text-[#D4FF00] hover:border-[#D4FF00] transition-colors text-sm uppercase tracking-wider font-display"
                >
                  {t("contact.detailed_brief.cta")}
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column - Form */}
        <div className="lg:col-span-7 max-w-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-16">
            
            {/* 1. Basics */}
            <section className="space-y-8">
              <Reveal delay={0.1}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-display uppercase tracking-widest text-neutral-500">{t("contact.form.name")}</label>
                    <input 
                      {...register("name", { required: true })}
                      className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white placeholder:text-neutral-700 focus:border-[#D4FF00] focus:outline-none transition-colors"
                      placeholder={t("contact.form.name_placeholder")}
                    />
                    {errors.name && <span className="text-[#D4FF00] text-xs">{t("contact.errors.required")}</span>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-display uppercase tracking-widest text-neutral-500">{t("contact.form.email")}</label>
                    <input 
                      {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                      className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white placeholder:text-neutral-700 focus:border-[#D4FF00] focus:outline-none transition-colors"
                      placeholder={t("contact.form.email_placeholder")}
                    />
                    {errors.email && <span className="text-[#D4FF00] text-xs">{t("contact.errors.email")}</span>}
                  </div>
                </div>
                <div className="mt-8 space-y-2">
                  <label className="text-xs font-display uppercase tracking-widest text-neutral-500">{t("contact.form.company")}</label>
                  <input 
                    {...register("company")}
                    className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white placeholder:text-neutral-700 focus:border-[#D4FF00] focus:outline-none transition-colors"
                    placeholder={t("contact.form.company_placeholder")}
                  />
                </div>
              </Reveal>
            </section>

            {/* 2. Context */}
            <section className="space-y-4">
              <Reveal delay={0.2}>
                <label className="text-xs font-display uppercase tracking-widest text-neutral-500 block mb-4">{t("contact.form.context_label")}</label>
                <textarea 
                  {...register("context", { required: true })}
                  rows={4}
                  className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white placeholder:text-neutral-700 focus:border-[#D4FF00] focus:outline-none transition-colors resize-none"
                  placeholder={t("contact.form.context_placeholder")}
                />
                {errors.context && <span className="text-[#D4FF00] text-xs">{t("contact.errors.required")}</span>}
              </Reveal>
            </section>

            {/* 3. Stage */}
            <section className="space-y-6">
              <Reveal delay={0.3}>
                <label className="text-xs font-display uppercase tracking-widest text-neutral-500 block mb-6">{t("contact.form.stage_label")}</label>
                <div className="space-y-3">
                  {stages.map((stage) => (
                    <label key={stage} className="flex items-center group cursor-pointer">
                      <input 
                        type="radio" 
                        value={stage} 
                        {...register("stage", { required: true })}
                        className="peer sr-only"
                      />
                      <div className="w-5 h-5 rounded-full border border-white/20 peer-checked:border-[#D4FF00] peer-checked:bg-[#D4FF00] mr-4 transition-all relative flex items-center justify-center">
                        <div className="w-2 h-2 bg-black rounded-full opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-lg text-neutral-400 group-hover:text-white transition-colors peer-checked:text-white">{stage}</span>
                    </label>
                  ))}
                </div>
                {errors.stage && <span className="text-[#D4FF00] text-xs">{t("contact.errors.select_one")}</span>}
              </Reveal>
            </section>

            {/* 4. Scope */}
            <section className="space-y-6">
              <Reveal delay={0.4}>
                <div className="flex justify-between items-baseline mb-6">
                  <label className="text-xs font-display uppercase tracking-widest text-neutral-500">{t("contact.form.support_label")}</label>
                  <span className="text-xs text-neutral-600">{t("contact.form.support_hint")}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {supportOptions.map((option) => {
                    const isSelected = selectedSupport?.includes(option);
                    return (
                      <button
                        type="button"
                        key={option}
                        onClick={() => toggleSupport(option)}
                        className={cn(
                          "px-6 py-3 border rounded-full text-sm transition-all duration-300",
                          isSelected 
                            ? "bg-white text-black border-white" 
                            : "bg-transparent text-neutral-400 border-white/10 hover:border-white/40 hover:text-white"
                        )}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
                {/* support field is managed via setValue, no hidden input needed */}
              </Reveal>
            </section>

            {/* 5. Budget */}
            <section className="space-y-6">
              <Reveal delay={0.5}>
                <label className="text-xs font-display uppercase tracking-widest text-neutral-500 block mb-6">{t("contact.form.budget_label")}</label>
                <div className="flex flex-wrap gap-3">
                  {budgetRanges.map((range) => (
                    <label key={range} className="cursor-pointer">
                      <input 
                        type="radio" 
                        value={range} 
                        {...register("budget")}
                        className="peer sr-only"
                      />
                      <span className="inline-block px-6 py-3 border border-white/10 rounded-full text-sm text-neutral-400 transition-all peer-checked:border-[#D4FF00] peer-checked:text-[#D4FF00] hover:border-white/40 hover:text-white">
                        {range}
                      </span>
                    </label>
                  ))}
                </div>
              </Reveal>
            </section>

            {/* 6. Timing */}
            <section className="space-y-6">
              <Reveal delay={0.6}>
                <label className="text-xs font-display uppercase tracking-widest text-neutral-500 block mb-6">{t("contact.form.timeline_label")}</label>
                <div className="space-y-3">
                   {timings.map((time) => (
                    <label key={time} className="flex items-center group cursor-pointer">
                      <input 
                        type="radio" 
                        value={time} 
                        {...register("timeline", { required: true })}
                        className="peer sr-only"
                      />
                      <div className="w-5 h-5 rounded-full border border-white/20 peer-checked:border-[#D4FF00] peer-checked:bg-[#D4FF00] mr-4 transition-all relative flex items-center justify-center">
                         <div className="w-2 h-2 bg-black rounded-full opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-lg text-neutral-400 group-hover:text-white transition-colors peer-checked:text-white">{time}</span>
                    </label>
                  ))}
                </div>
                {errors.timeline && <span className="text-[#D4FF00] text-xs">{t("contact.errors.required")}</span>}
              </Reveal>
            </section>

            {/* CTA */}
            <Reveal delay={0.7}>
              <div className="pt-8 border-t border-white/10 space-y-8">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="group relative inline-flex items-center justify-center px-12 py-5 bg-[#D4FF00] text-black w-full md:w-auto transition-all duration-500 ease-out cursor-pointer overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                >
                   <div className="absolute inset-0 bg-white/40 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out pointer-events-none" />
                   <span className="relative flex items-center gap-3 font-display uppercase tracking-widest font-bold">
                     {isSubmitting ? t("contact.form.sending") : t("contact.form.submit")}
                     {!isSubmitting && <ArrowRight size={18} />}
                   </span>
                </button>
                
                <p className="text-neutral-500 text-sm leading-relaxed max-w-md">
                   {t("contact.form.footer_text_1")} <br/>
                   {t("contact.form.footer_text_2")}
                </p>

                {submitError && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm leading-relaxed"
                  >
                    {submitError}
                  </motion.p>
                )}
              </div>
            </Reveal>

          </form>

          {/* Mobile Footer Alternative */}
          <div className="mt-16 pt-16 border-t border-white/10 lg:hidden block">
             <p className="mb-2 uppercase tracking-widest font-display text-xs text-neutral-500">{t("contact.sidebar.email_label")}</p>
             <a href="mailto:hello@r352.com" className="text-white hover:text-[#D4FF00] transition-colors text-lg">
               hello@r352.com
             </a>
             <p className="mt-4 text-neutral-500 text-sm leading-relaxed">
               {t("contact.sidebar.text")}
             </p>

             <div className="mt-8 pt-8 border-t border-white/10">
                <span className="text-xs font-display uppercase tracking-widest text-[#D4FF00] mb-3 block">
                  {t("contact.detailed_brief.label")}
                </span>
                <p className="text-neutral-500 text-sm mb-4 leading-relaxed">
                  {t("contact.detailed_brief.description")}
                </p>
                <a 
                  href="/brief-access"
                  className="inline-flex items-center gap-2 text-white border-b border-white/30 pb-1 hover:text-[#D4FF00] hover:border-[#D4FF00] transition-colors text-sm uppercase tracking-wider font-display"
                >
                  {t("contact.detailed_brief.cta")}
                  <ArrowRight size={14} />
                </a>
              </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
}