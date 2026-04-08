import { Reveal } from "@/app/components/ui/Reveal";

interface NoteProps {
  children: React.ReactNode;
  className?: string;
  label?: string;
}

export function Note({ children, className = "", label = "Note" }: NoteProps) {
  return (
    <div className={`relative p-8 md:p-12 bg-neutral-900/50 ${className}`}>
      <span className="block text-xs font-bold uppercase tracking-[0.2em] text-[#D4FF00] mb-6">
        {label}
      </span>
      <div className="text-xl md:text-2xl text-neutral-300 leading-relaxed max-w-3xl">
        {children}
      </div>
    </div>
  );
}