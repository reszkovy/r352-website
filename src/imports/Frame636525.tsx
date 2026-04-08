import svgPaths from "./svg-lkqb1tusoj";
import imgImage172 from "figma:asset/6449e03ff341e31632b834260461728334f2a509.png";
import imgImage144 from "figma:asset/a1cc3577225286ec33de24953f31210bb3561385.png";
import imgImage147 from "figma:asset/0bd4d4ac9c8d9e4846e22a9cde659ad2175fbac6.png";
import imgImage174 from "figma:asset/11755ec73cb2f927118f165431e68f599a797283.png";
import imgImage148 from "figma:asset/9e88aa16dafe3018e31af92fa3e3fcb3bcae154b.png";

function UniqaInsuranceGroupLogo() {
  return (
    <div className="col-1 h-[942.997px] ml-0 mt-0 relative row-1 w-[1210.671px]" data-name="Uniqa_Insurance_Group_logo 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1210.67 942.997">
        <g id="Uniqa_Insurance_Group_logo 1">
          <path d={svgPaths.p31d19d00} fill="var(--fill-0, white)" id="path4772" />
          <path d={svgPaths.p2fbf2040} fill="var(--fill-0, white)" id="path4790" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0">
      <UniqaInsuranceGroupLogo />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex gap-[1048px] items-center justify-center relative size-full">
      <div className="h-[813.312px] relative shrink-0 w-[1756.015px]" data-name="image 172">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage172} />
      </div>
      <div className="h-[707.618px] mix-blend-plus-lighter relative shrink-0 w-[2100.028px]" data-name="image 144">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage144} />
      </div>
      <div className="h-[705.265px] mix-blend-plus-lighter relative shrink-0 w-[1848.937px]" data-name="image 147">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage147} />
      </div>
      <Group />
      <div className="h-[808.335px] relative shrink-0 w-[1865.769px]" data-name="image 174">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage174} />
      </div>
      <div className="h-[707.618px] mix-blend-plus-lighter relative shrink-0 w-[1803.284px]" data-name="image 148">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage148} />
      </div>
    </div>
  );
}