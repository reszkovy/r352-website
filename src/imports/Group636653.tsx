import svgPaths from "./svg-x4bhjyl8gx";

function Group2() {
  return (
    <div className="absolute left-0 size-[384.771px] top-0">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 384.771 384.771">
        <g id="Group 636649">
          <path d={svgPaths.p1b5faa00} fill="var(--fill-0, #DAFF45)" id="Vector" />
          <circle cx="192.385" cy="192.385" id="Ellipse 3" r="160.385" stroke="var(--stroke-0, #DAFF45)" strokeWidth="64" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute h-[292.034px] left-[362.87px] top-[46.37px] w-[714.179px]">
      <div className="absolute inset-[-17.3%_-7.08%_-17.3%_-7.03%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 814.947 393.103">
          <g id="Group 636647">
            <path d={svgPaths.p3872e980} fill="var(--fill-0, #DAFF45)" id="Vector" stroke="var(--stroke-0, #DAFF45)" strokeWidth="50.5344" />
            <path d={svgPaths.pac66b00} fill="var(--fill-0, #DAFF45)" id="Vector_2" stroke="var(--stroke-0, #DAFF45)" strokeWidth="50.5344" />
            <path d={svgPaths.p60fec00} fill="var(--fill-0, #DAFF45)" id="Vector_3" stroke="var(--stroke-0, #DAFF45)" strokeWidth="50.5344" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute h-[292.034px] left-[362.87px] top-[46.37px] w-[714.179px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 714.179 292.034">
        <g id="Group 636648">
          <path d={svgPaths.p2e6a3300} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.p2155be40} fill="var(--fill-0, black)" id="Vector_2" />
          <path d={svgPaths.p31090800} fill="var(--fill-0, black)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents left-0 top-0">
      <Group2 />
      <Group />
      <Group1 />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents left-0 top-0">
      <Group3 />
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

export default function Group6() {
  return (
    <div className="relative size-full">
      <Group5 />
    </div>
  );
}