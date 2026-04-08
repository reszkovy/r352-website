import svgPaths from "./svg-qjmb2ynw0p";

function Group() {
  return (
    <div className="w-full h-full relative">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 916.999 1131.44">
        <g id="Group 8">
          <path d={svgPaths.p27575f00} fill="var(--fill-0, black)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute flex w-full h-full items-center justify-center left-0 top-0">
        <div className="flex-none rotate-[90deg] w-full h-full">
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