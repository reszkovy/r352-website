import { Reveal } from "@/app/components/ui/Reveal";
import { cn } from "@/lib/utils";
// New assets provided by user
import deloitteLogo from "figma:asset/58f9891995f72756719a6583adb94e90f0590ad3.png";
import benefitLogo from "figma:asset/e9e0c20de4346f961fc2e9469ef295e4b015b901.png";
import dawidLogo from "figma:asset/ba749ac924400bb32e1a42b8f18e7464907fccd8.png";
import kubotaLogo from "figma:asset/7750d53403eee4d14f322fd5a118f3c5750f51a5.png";
import uniqaLogo from "figma:asset/590f188d1475875fa3221bb4f86c99f935f70cbe.png";
import fifaLogo from "figma:asset/51e11441d7c02bfa2791df691e15dbf208a105e4.png";
// Keeping existing Sonova asset as no new one was provided
import sonovaLogo from "figma:asset/b14b67ba2d6df576bef8431f5353f2a1244c4815.png";

export function ClientLogos() {
  const uniqueClients = [
    { name: "Deloitte Digital", logo: deloitteLogo, url: "https://www.deloittedigital.com" },
    { name: "Sonova", logo: sonovaLogo, url: "https://www.sonova.com" },
    { name: "Benefit Systems", logo: benefitLogo, url: "https://www.benefitsystems.pl" },
    { name: "Dawid Podsiadło", logo: dawidLogo, url: "https://dawidpodsiadlo.pl" },
    { name: "Kubota", logo: kubotaLogo, url: "https://kubotastore.pl" },
    { name: "UNIQA", logo: uniqaLogo, url: "https://www.uniqa.pl" },
    { name: "FIFA", logo: fifaLogo, url: "https://www.fifa.com" },
  ];

  return (
    <section className="py-12 border-t border-b border-white/5 bg-[#151515] overflow-hidden">
      <Reveal width="100%">
        <div className="max-w-[1800px] mx-auto px-8 md:px-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Label */}
          <div className="w-full md:w-auto flex-shrink-0">
             <h3 className="text-[#D4FF00] font-display font-normal uppercase tracking-widest text-sm md:text-base whitespace-nowrap text-left">
               We worked with
             </h3>
          </div>

          {/* Logos Row - Always one line */}
          <div className="w-full flex flex-nowrap items-center justify-between gap-6 md:gap-12 overflow-x-auto md:overflow-visible scrollbar-hide mask-fade-sides">
            {uniqueClients.map((client, i) => (
              <a 
                key={i} 
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex-shrink-0 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300",
                  // Individual sizing adjustments for optical balance
                  client.name === "Dawid Podsiadło" ? "h-6 md:h-10" : 
                  client.name === "Deloitte Digital" ? "h-6 md:h-10" : 
                  client.name === "UNIQA" ? "h-8 md:h-12" : 
                  client.name === "Kubota" ? "h-5 md:h-9" : 
                  client.name === "Benefit Systems" ? "h-5 md:h-9" : 
                  client.name === "FIFA" ? "h-6 md:h-10" : 
                  client.name === "Sonova" ? "h-4 md:h-7" : 
                  "h-6 md:h-10"
                )}
                aria-label={`Visit ${client.name} website`}
              >
                <img 
                  src={client.logo} 
                  alt={client.name}
                  className="h-full w-auto object-contain brightness-0 invert"
                />
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
