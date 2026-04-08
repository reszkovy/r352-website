import svgPaths from "./svg-iq3170lkdc";

function Group() {
  return (
    <div className="h-[2066.645px] relative w-[1674.952px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1674.95 2066.64">
        <g id="Group 8">
          <path d={svgPaths.p967a300} fill="var(--fill-0, black)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute flex h-[1674.952px] items-center justify-center left-0 top-0 w-[2066.645px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "150" } as React.CSSProperties}>
        <div className="flex-none rotate-[90deg]">
          <Group />
        </div>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-0 top-0">
      <Group1 />
    </div>
  );
}

export default function Group3() {
  return (
    <div className="relative size-full">
      <Group2 />
    </div>
  );
}