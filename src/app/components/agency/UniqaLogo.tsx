import { cn } from "@/lib/utils";
import svgPaths from "../../../imports/svg-oocbyu64c2";

interface UniqaLogoProps {
  className?: string;
  fill?: string;
}

export function UniqaLogo({ className, fill = "currentColor" }: UniqaLogoProps) {
  return (
    <div className={cn("relative", className)}>
      <svg 
        className="block size-full" 
        fill="none" 
        preserveAspectRatio="xMidYMid meet" 
        viewBox="0 0 986 768"
      >
        <g id="Uniqa_Insurance_Group_logo">
          <path d={svgPaths.p64e5a00} fill={fill} fillRule="evenodd" clipRule="evenodd" />
          <path d={svgPaths.p1b584c00} fill={fill} fillRule="evenodd" clipRule="evenodd" />
        </g>
      </svg>
    </div>
  );
}
