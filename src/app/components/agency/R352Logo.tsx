import { cn } from "@/lib/utils";
import svgPaths from "../../../imports/svg-9vxan0q60f";
import textPaths from "../../../imports/svg-0vjdtj0k0r"; 

interface R352ComponentProps {
  className?: string;
  color?: string;
}

export function R352Symbol({ className, color = "#DAFF45" }: R352ComponentProps) {
  // Using the new paths from svg-9vxan0q60f
  // p3111bb80 is the R
  // p37835f00 is the Circle
  return (
    <svg 
      viewBox="0 0 658 676" 
      className={cn("block select-none overflow-visible", className)}
      fill="none" 
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Symbol">
         {/* The Circle - Fades out on hover */}
        <path 
          d={svgPaths.p37835f00} 
          fill={color} 
          className="transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-0 group-hover:scale-95 origin-center"
        />
        
        {/* The R - Moves RIGHT on hover towards the 352 text */}
        <path 
          d={svgPaths.p3111bb80} 
          fill={color} 
          // Adjusted translation to 150px so it doesn't crash into the 352
          className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[150px]" 
        />
      </g>
    </svg>
  );
}

export function R352Text({ className, color = "#DAFF45" }: R352ComponentProps) {
  return (
    <svg 
      viewBox="0 0 460 373" 
      className={cn("block select-none", className)}
      fill="none" 
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 
         Moves slightly LEFT on hover to meet the R 
         Adjusted to -10px to be more subtle and prevent overlap
      */}
      <g transform="translate(0 93.61)" className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-[10px]">
        <g id="Text">
          <path d={textPaths.p18f5d700} fill={color} />
          <path d={textPaths.p37c6300} fill={color} />
          <path d={textPaths.pbe454f0} fill={color} />
        </g>
      </g>
    </svg>
  );
}
