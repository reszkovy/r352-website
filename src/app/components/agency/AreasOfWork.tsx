import { motion } from "motion/react";
import { Reveal } from "@/app/components/ui/Reveal";

const areas = [
  {
    id: "01",
    title: "Strategy / Direction",
    description: "Helping teams slow down just enough to\u00A0make better decisions.",
    items: ["Product & brand direction", "Prioritisation and focus", "Aligning teams around what really matters"],
    note: null
  },
  {
    id: "02",
    title: "Design / Experience",
    description: "Design that feels intentional, not decorative.",
    items: ["Product & interface design", "Digital identities & systems", "Motion, interaction and detail"],
    note: "Inspired by\u00A0culture, architecture and technology, not trends."
  },
  {
    id: "03",
    title: "Technology / Delivery",
    description: "Modern technology, used thoughtfully.",
    items: ["Web platforms & products", "Design systems & scalable foundations", "Close collaboration with development teams"],
    note: "We care about how things work and how they\u00A0age."
  }
];

export function AreasOfWork() {
  return (
    <section className="py-32 px-8 md:px-12 bg-[#080808] border-t border-white/10">
      <div className="max-w-[1800px] mx-auto">
        <Reveal>
          <div className="mb-24 flex flex-col md:flex-row justify-between md:items-end border-b border-white/10 pb-8 gap-6 text-center md:text-left items-center">
            <h2 className="text-4xl md:text-5xl font-normal tracking-normal text-white whitespace-normal md:whitespace-nowrap">
              Areas of Expertise
            </h2>
            <p className="text-neutral-500 font-display uppercase tracking-widest text-sm whitespace-normal md:whitespace-nowrap">
              Core disciplines that define our practice and shape our output.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {areas.map((area, index) => (
            <Reveal key={area.id} delay={index * 0.1} className="h-full">
              <motion.div 
                className="bg-[#050505] p-10 h-full hover:bg-[#0a0a0a] transition-colors duration-500 group flex flex-col"
              >
                <div className="mb-8">
                  <span className="text-lg font-display uppercase tracking-wide text-[#D4FF00] block mb-3">
                    {area.id}
                  </span>
                  <h3 className="text-4xl font-display uppercase tracking-wider text-white mb-6 font-normal">
                    {area.title}
                  </h3>
                  <p className="text-neutral-400 leading-relaxed text-base min-h-[5rem]">
                    {area.description}
                  </p>
                </div>

                <div className="mt-auto pt-8 border-t border-white/5 space-y-8">
                  <ul className="space-y-4">
                    {area.items.map((item, i) => (
                      <li key={i} className="flex items-center text-lg text-neutral-500 font-mono group-hover:text-neutral-300 transition-colors">
                        {item}
                      </li>
                    ))}
                  </ul>
                  
                  {area.note && (
                    <p className="text-[10px] font-display uppercase tracking-widest text-neutral-600 pt-8 border-t border-white/5 block">
                      {area.note}
                    </p>
                  )}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
