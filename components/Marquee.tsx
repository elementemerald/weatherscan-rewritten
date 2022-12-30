import * as React from "react";
import Marquee from "./CustomMarquee";
import { MarqueeLocation } from "../hooks/useWeather";

/*
    #marquee1 {
        position: absolute;
        color: #DDDDDD;
        left: 32%;
        top: 900px;
        width: 68.507%;
        height: 43px;
        font-size: 33px;
        letter-spacing: .5px;
        text-shadow: 2px 2px 2px #000;
        transform: scale(112%, 100%);
        transform-origin: left;
    }
    #marquee2 {
        color: #171717;
        position: absolute;
        left: 31.35%;
        top: 87.2%;
        width: 68.507%;
        height: 5%;
        font-size: 41.5px;
        font-weight: 400;
        padding-top: .52%;
        font-stretch: expanded;
        transform: scale(110%, 100%);
        transform-origin: left;
        filter: drop-shadow(.5px 0 0 #171717);
    }
*/

export interface InfoMarqueeSection {
    duration?: number
}

export interface InfoMarqueeSingle extends InfoMarqueeSection {
    text: string
}

export interface InfoMarqueeLocations extends InfoMarqueeSection {
    locations: MarqueeLocation[]
}

export interface InfoMarqueeProps {
    top: InfoMarqueeLocations
    ticker: InfoMarqueeSingle
}

/* <span className="text-marquee-top text-shadow-sm origin-left">{top.text}</span> */
const InfoMarquee = ({ top, ticker }: InfoMarqueeProps) => (
    <div className="absolute left-[31.35%] top-[82.5%] w-full flex flex-col">
        <Marquee play={true} gradient={false} duration={top.duration ?? 5} pauseOnHover={true}>
            <div id="marquee-loc">
                {top.locations.map(v => (
                    <span key={v.city} className="text-marquee-top text-shadow-sm origin-left pr-[3vw]">
                        {`${v.city}: ${v.observations?.temp} ${v.observations?.phrase}`}
                    </span>
                ))}
            </div>
        </Marquee>
        <Marquee play={true} gradient={false} duration={ticker.duration ?? 15} pauseOnHover={true}>
            <span className="text-marquee-bottom font-normal origin-left">{ticker.text}</span>
        </Marquee>
    </div>
);

export default InfoMarquee;
