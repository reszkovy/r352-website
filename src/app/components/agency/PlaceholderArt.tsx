import imgStudioNoise1 from "figma:asset/9cbf2fb28e4515eafaa2cdce6536ee71e5936e0b.png";
import imgScan211 from "figma:asset/d3462c6c22a9963680e32078a43d73d49b15186a.png";
import imgSwirl22 from "figma:asset/7ac28c46c8fc1129f63feec8179d9781cec20dce.png";

export function PlaceholderArt() {
  return (
    <div className="bg-[#b4b4b4] relative w-full h-full overflow-hidden" data-name="2027">
      <div className="absolute h-[593px] left-[-1052px] mix-blend-overlay opacity-33 top-[-455px] w-[981px]" data-name="STUDIO_noise 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full" src={imgStudioNoise1} />
      </div>
      <div className="absolute flex h-[1643px] items-center justify-center left-[-361px] mix-blend-difference top-[-215px] w-[2281px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[270deg] scale-y-[-100%]">
          <div className="h-[2281px] relative w-[1643px]" data-name="SCAN-21 1">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full" src={imgScan211} />
          </div>
        </div>
      </div>
      <div className="absolute flex h-[1874.056px] items-center justify-center left-[169px] top-[-211px] w-[1815.584px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[63.633deg]">
          <div className="h-[1311.939px] relative w-[1441.345px]" data-name="SWIRL-2 2">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full" src={imgSwirl22} />
          </div>
        </div>
      </div>
    </div>
  );
}
