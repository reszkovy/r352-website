import svgPaths from "./svg-sgbjpsp0cq";

function Group() {
  return (
    <div className="absolute h-[384.771px] left-[277.79px] top-0 w-[1245.602px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1245.6 384.771">
        <g id="Group 636631">
          <g id="by r352">
            <path d={svgPaths.p2373f500} fill="var(--fill-0, black)" id="Vector" />
            <path d={svgPaths.p3625bc00} fill="var(--fill-0, black)" id="Vector_2" />
            <path d={svgPaths.p37ea5580} fill="var(--fill-0, black)" id="Vector_3" />
            <path d={svgPaths.p34ed2580} fill="var(--fill-0, black)" id="Vector_4" />
          </g>
          <circle cx="192.385" cy="192.385" id="Ellipse 3" r="160.385" stroke="var(--stroke-0, black)" strokeWidth="64" />
        </g>
      </svg>
    </div>
  );
}

function By() {
  return (
    <div className="absolute h-[154.169px] left-0 top-[132.25px] w-[193.517px]" data-name="by">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 193.517 154.169">
        <g id="by">
          <path d={svgPaths.p2c0532f2} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.pa483980} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

export default function Group1() {
  return (
    <div className="relative size-full">
      <Group />
      <By />
    </div>
  );
}