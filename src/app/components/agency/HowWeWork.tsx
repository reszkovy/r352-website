import { motion } from "motion/react";

export function HowWeWork() {
  return (
    <section className="py-32 px-8 md:px-12 max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
       <motion.div 
         initial={{ opacity: 0, scale: 0.98 }}
         whileInView={{ opacity: 1, scale: 1 }}
         viewport={{ once: true }}
         transition={{ duration: 0.8 }}
         className="relative aspect-[4/5] overflow-hidden bg-neutral-900"
       >
          <img 
            src="https://images.unsplash.com/photo-1762952777439-2fffee8ce13f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwYXJjaGl0ZWN0dXJlJTIwZ2VvbWV0cmljJTIwZGFyayUyMGxpZ2h0JTIwYWJzdHJhY3R8ZW58MXx8fHwxNzY4OTU4NDc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Minimalist Architecture"
            className="w-full h-full object-cover opacity-80 grayscale hover:grayscale-0 transition-all duration-[1.5s]"
          />
       </motion.div>

       <div className="space-y-16">
         <div>
           <span className="text-xs font-display font-bold uppercase tracking-[0.2em] text-neutral-500 mb-6 block">
             Process
           </span>
           <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-white mb-8 leading-tight">
             A calm, collaborative way of working.
           </h2>
           <p className="text-xl font-normal text-neutral-400">
             We don’t run factories. We don’t chase volume.
           </p>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
           {[
             "Small, senior teams",
             "Close collaboration",
             "Clear communication",
             "Room for thinking"
           ].map((item, i) => (
             <div key={i} className="flex items-center gap-4 py-4 border-b border-white/10">
               <div className="size-1.5 bg-white rounded-full" />
               <span className="text-lg text-neutral-300 font-medium tracking-tight">{item}</span>
             </div>
           ))}
         </div>

         <p className="text-sm font-display text-neutral-500 pt-8 uppercase tracking-widest">
           Projects are shaped around real needs — not predefined packages.
         </p>
       </div>
    </section>
  );
}
