import { BarChart, Network, Gauge, BadgeCheck } from "lucide-react";

export function StatsGrid() {
  const stats = [
    {
      icon: BarChart,
      value: "92%",
      label: "Entropy Rate",
      desc: "Average organizational chaos when systems lack central governance.",
      italic: true,
    },
    {
      icon: Network,
      value: "0.0",
      label: "Manual Touchpoints",
      desc: "The target for routine creative workflows. Eliminate the human bottleneck.",
      italic: false,
    },
    {
      icon: Gauge,
      value: "4X",
      label: "Velocity Multiplier",
      desc: "Sustainable output increase once decision silos are structurally bridged.",
      italic: true,
    },
    {
      icon: BadgeCheck,
      value: "100%",
      label: "Governance Fit",
      desc: "Full alignment between brand strategy and autonomous execution.",
      italic: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="border border-white/10 bg-white/[0.02] backdrop-blur-sm p-8 rounded-none group hover:bg-white/[0.04] transition-colors"
        >
          <div className="size-12 flex items-center justify-center border border-primary/30 text-primary mb-6">
            <stat.icon className="size-6" />
          </div>
          <span
            className={`text-7xl md:text-8xl font-bold tracking-tighter text-white block leading-none ${
              stat.italic ? "italic" : ""
            }`}
          >
            {stat.value}
          </span>
          <h3 className="text-xs font-bold uppercase tracking-widest mt-4 mb-2 text-primary">
            {stat.label}
          </h3>
          <p className="text-sm text-slate-400">{stat.desc}</p>
        </div>
      ))}
    </div>
  );
}
