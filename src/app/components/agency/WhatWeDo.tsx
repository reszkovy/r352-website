import { Note } from "@/app/components/ui/Note";

export function WhatWeDo() {
  return (
    <section className="py-32 px-8 md:px-12 max-w-[1800px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-white/10 pt-16">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-6 block">
            What we help with
          </span>
          <h3 className="text-4xl font-bold tracking-tighter text-white mb-6 leading-tight">
            We support brands and organisations at moments that&nbsp;matter.
          </h3>
        </div>
        
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-16">
          <div className="space-y-8">
            <h4 className="text-xs font-mono text-white/40 uppercase tracking-[0.2em]">Context</h4>
            <ul className="space-y-4 text-neutral-300 font-medium tracking-tight text-lg">
              <li className="border-l border-white/10 pl-4 py-1">When things start to&nbsp;grow</li>
              <li className="border-l border-white/10 pl-4 py-1">When systems feel messy</li>
              <li className="border-l border-white/10 pl-4 py-1">When quality becomes harder to&nbsp;maintain</li>
            </ul>
          </div>
          
          <div className="space-y-8">
            <h4 className="text-xs font-mono text-white/40 uppercase tracking-[0.2em]">Focus</h4>
            <ul className="space-y-4 text-neutral-300 font-medium tracking-tight text-lg">
              <li className="border-l border-white/10 pl-4 py-1">Strategy & direction</li>
              <li className="border-l border-white/10 pl-4 py-1">Design & experience</li>
              <li className="border-l border-white/10 pl-4 py-1">Technology & execution</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mt-32">
        <Note>
          We engage deeply. We are not a&nbsp;volume shop. We take on a&nbsp;limited number of clients to&nbsp;ensure direct access to senior partners.
        </Note>
      </div>
    </section>
  );
}
