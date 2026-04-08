import React from "react";
import imgImage419 from "figma:asset/cc83c611649a28a788fdbc804faca8660ef993e6.png";

export function PhilosophyVisuals() {
  return (
    <div className="w-full overflow-hidden">
      <div className="relative w-full aspect-[2048/682.5]">
        <img 
          alt="Philosophy Visuals" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
          src={imgImage419} 
        />
      </div>
    </div>
  );
}
