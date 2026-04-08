import imgImage422 from "figma:asset/4e2f67b4959605fd8a80c1b82ec16671423c2181.png";
import imgImageF11D95B253A741F685C0474B8894106C2 from "figma:asset/26587a91068e3ed541894d1dcb94363cfca3c620.png";
import React from "react";

function Frame() {
  return <div className="bg-gradient-to-r from-[#009fe4] h-[227.957px] rounded-[41.261px] to-[#8bdcff] w-[968.215px]" />;
}

function Frame1() {
  return <div className="h-[48.456px] shrink-0 w-[198.914px]" />;
}

function Frame4() {
  return (
    <div className="content-stretch flex h-[126.902px] items-center justify-between overflow-clip relative rounded-[41.261px] w-[266.947px]" style={{ backgroundImage: "linear-gradient(66.3287deg, rgb(255, 91, 25) 30.404%, rgb(255, 194, 170) 93.564%)" }}>
      <Frame1 />
    </div>
  );
}

function Frame2() {
  return <div className="h-[24.241px] shrink-0 w-[99.512px]" />;
}

function Frame5() {
  return (
    <div className="bg-gradient-to-r content-stretch flex from-[#009fe4] h-[63.486px] items-center justify-between overflow-clip relative rounded-[20.642px] to-[#8bdcff] w-[133.547px]">
      <Frame2 />
    </div>
  );
}

function Frame3() {
  return <div className="h-[24.241px] shrink-0 w-[99.512px]" />;
}

function Frame6() {
  return (
    <div className="bg-gradient-to-r content-stretch flex from-[#009fe4] h-[63.486px] items-center justify-between overflow-clip relative rounded-[20.642px] to-[#8bdcff] w-[133.547px]">
      <Frame3 />
    </div>
  );
}

function Frame8() {
  return <div className="h-[48.456px] shrink-0 w-[198.914px]" />;
}

function Frame7() {
  return (
    <div className="content-stretch flex h-[145.232px] items-center justify-between overflow-clip relative rounded-[41.261px] w-[305.504px]" style={{ backgroundImage: "linear-gradient(66.3287deg, rgb(255, 91, 25) 30.404%, rgb(255, 194, 170) 93.564%)" }}>
      <Frame8 />
    </div>
  );
}

export default function Frame13() {
  return (
    <div className="bg-white relative w-full h-full overflow-hidden @container">
      <div className="absolute top-1/2 left-1/2 origin-center pointer-events-none w-[1920px] h-[1080px]" style={{ transform: 'translate(-50%, -50%) scale(calc(max(100cqw / 1920, 100cqh / 1080)))' }}>
        <div className="absolute h-[3889.136px] left-[-525.14px] top-[-1462.88px] w-[2947.016px]" data-name="image 422">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage422} />
        </div>
        <div className="absolute bg-[#009fe4] h-[1274.081px] left-[-463.87px] mix-blend-color top-0 w-[2714.456px]" />
        <div className="absolute flex h-[652.395px] items-center justify-center left-[562.02px] top-[203.8px] w-[870.226px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
          <div className="-rotate-26 -skew-x-26 flex-none scale-y-90">
            <Frame />
          </div>
        </div>
        <div className="absolute flex h-[243.924px] items-center justify-center left-[510.76px] top-[370.62px] w-[239.93px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
          <div className="-rotate-26 -skew-x-26 flex-none scale-y-90">
            <Frame4 />
          </div>
        </div>
        <div className="absolute flex h-[122.029px] items-center justify-center left-[1312.22px] top-[856.47px] w-[120.031px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
          <div className="-rotate-26 -skew-x-26 flex-none scale-y-90">
            <Frame5 />
          </div>
        </div>
        <div className="absolute flex h-[122.029px] items-center justify-center left-[735.19px] top-[51.26px] w-[120.031px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
          <div className="-rotate-26 -skew-x-26 flex-none scale-y-90">
            <Frame6 />
          </div>
        </div>
        <div className="absolute flex items-center justify-center left-[382.6px] size-[1308.465px] top-[41.89px]">
          <div className="-scale-y-100 flex-none rotate-180">
            <div className="relative size-[1308.465px]" data-name="image-f11d95b2-53a7-41f6-85c0-474b8894106c 2">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageF11D95B253A741F685C0474B8894106C2} />
            </div>
          </div>
        </div>
        <div className="absolute flex h-[279.156px] items-center justify-center left-[1082.16px] top-[562.65px] w-[274.585px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
          <div className="-rotate-26 -skew-x-26 flex-none scale-y-90">
            <Frame7 />
          </div>
        </div>
      </div>
    </div>
  );
}
