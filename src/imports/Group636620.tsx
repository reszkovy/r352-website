import svgPaths from "./svg-ofc98nm3st";

function Wegobold() {
  return (
    <div className="absolute h-[28.709px] left-0 top-0 w-[141.025px]" data-name="wegobold">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 141.025 28.7088">
        <g id="wegobold">
          <path d={svgPaths.pb7244f0} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p3babd880} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p15a50b80} fill="var(--fill-0, white)" id="Vector_3" />
          <path d={svgPaths.p3569d480} fill="var(--fill-0, white)" id="Vector_4" />
          <path d={svgPaths.p8f3300} fill="var(--fill-0, white)" id="Vector_5" />
          <path d={svgPaths.p2cac0380} fill="var(--fill-0, white)" id="Vector_6" />
          <path d={svgPaths.p39bb7f80} fill="var(--fill-0, white)" id="Vector_7" />
          <path d={svgPaths.p1691d000} fill="var(--fill-0, white)" id="Vector_8" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-0 top-0">
      <Wegobold />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-0 top-0">
      <Group />
    </div>
  );
}

export default function Group2() {
  return (
    <div className="relative size-full">
      <Group1 />
    </div>
  );
}