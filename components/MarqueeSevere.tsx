import * as React from "react";
import Marquee from "./CustomMarquee";

interface MarqueeSevereProps {
    top: string
    bottom: string
}

const MarqueeSevere = ({ top, bottom }: MarqueeSevereProps) => (
    <>
        <div id="marquee-severe-header" className="bg-marquee-severe-header text-black text-shadow-none font-synthesis-weight absolute font-interstate-cn font-extrabold left-[450px] leading-[45px] tracking-[1.5px] top-[888px] w-[68.75%] h-[45px] mt-2 text-[34.5px] pl-[40px] uppercase transform scale-x-112 scale-y-100 origin-left z-[13]">
            {top}
        </div>
        <div id="marquee-severe" className="bg-marquee-severe font-interstate text-shadow font-normal absolute left-[450px] top-[86.9%] w-[68.7%] h-[56px] text-[46px] pt-[.10%] text-[#DDDDDD] uppercase transform scale-x-110 scale-y-100 origin-left whitespace-nowrap z-[13]">
            <Marquee play={true} gradient={false} duration={90} pauseOnHover={true}>
                <span className="text-marquee-severe-text font-interstate text-shadow font-synthesis-weight font-semibold tracking-[1px] leading-[100%]">
                    {bottom}
                </span>
            </Marquee>
        </div>
    </>
);

export default MarqueeSevere;
