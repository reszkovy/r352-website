import svgPaths from "./svg-0vjdtj0k0r";

function Group() {
  return (
    <div className="absolute h-[372.755px] left-0 top-0 w-[362.867px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 362.867 372.755">
        <g id="Group 636540">
          <path d={svgPaths.p286f1b80} fill="var(--fill-0, #DAFF45)" id="Â®" />
          <path d={svgPaths.p236e6f00} fill="var(--fill-0, #DAFF45)" id="r" />
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute contents left-[calc(50%-246.96px)] top-1/2">
      <Group />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents left-0 top-0">
      <Group1 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute h-[185.536px] left-[403.06px] top-[93.61px] w-[453.734px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 453.734 185.536">
        <g id="Group 636647">
          <g id="Vector">
            <path d={svgPaths.p18f5d700} fill="var(--fill-0, #DAFF45)" />
            <path d={svgPaths.p18f5d700} stroke="var(--stroke-0, #DAFF45)" />
          </g>
          <g id="Vector_2">
            <path d={svgPaths.p37c6300} fill="var(--fill-0, #DAFF45)" />
            <path d={svgPaths.p37c6300} stroke="var(--stroke-0, #DAFF45)" />
          </g>
          <g id="Vector_3">
            <path d={svgPaths.pbe454f0} fill="var(--fill-0, #DAFF45)" />
            <path d={svgPaths.pbe454f0} stroke="var(--stroke-0, #DAFF45)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents left-0 top-0">
      <Group3 />
      <Group2 />
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents left-0 top-0">
      <Group4 />
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents left-0 top-0">
      <Group5 />
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents left-0 top-0">
      <Group6 />
    </div>
  );
}

export default function Group8() {
  return (
    <div className="relative size-full">
      <Group7 />
    </div>
  );
}