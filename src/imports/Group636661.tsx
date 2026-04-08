import img621 from "figma:asset/a4e5cfe65f5adbdf1bcf845f9b99f3ba39177d4e.png";
import imgIPhone16Pro11 from "figma:asset/58c74394310b11dfca043fb3b1d11720ddb56065.png";
import imgIPhone16Pro111 from "figma:asset/1f28b418f11aaea61d562420766fd66383fe0405.png";
import imgIPhone16Pro121 from "figma:asset/eebf0f709c3cd8c99d83da2f3eba5767e761d673.png";
import img110 from "figma:asset/23fa00f7824aa041c745cd0a2128c70bb7554f79.png";

function Frame() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 p-[10px] top-0 w-[2109px]">
      <div className="aspect-[2920/1648] relative shrink-0 w-full" data-name="6 – 2 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img621} />
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[145px] top-[41.87px]">
      <div className="absolute h-[435.359px] left-[585.61px] top-[41.87px] w-[200.245px]" data-name="iPhone 16 Pro - 1 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgIPhone16Pro11} />
      </div>
      <div className="absolute h-[435.359px] left-[365.12px] top-[41.87px] w-[200.245px]" data-name="iPhone 16 Pro - 1-1 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgIPhone16Pro111} />
      </div>
      <div className="absolute h-[435.359px] left-[145px] top-[41.87px] w-[200.245px]" data-name="iPhone 16 Pro - 1-2 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgIPhone16Pro121} />
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[145px] top-[41.87px]">
      <Group />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-[145px] top-[41.87px]">
      <Group1 />
    </div>
  );
}

function Component() {
  return (
    <div className="absolute bg-[#3ab169] h-[573px] left-[2207.43px] overflow-clip top-[26.5px] w-[931px]" data-name="000">
      <Group2 />
    </div>
  );
}

export default function Group3() {
  return (
    <div className="relative size-full">
      <div className="absolute h-[573px] left-[2207.43px] top-[707.64px] w-[931px]" data-name="1 10">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img110} />
      </div>
      <Frame />
      <Component />
    </div>
  );
}