import * as React from "react";

const Bulletin = () => (
    <>
        <div id="info-slide_bulletin" className="relative bg-infoslide-color bg-bulletin-image bg-infoslide-pos bg-infoslide-size bg-no-repeat w-full min-h-infoslide max-h-infoslide overflow-hidden flex flex-col hidden">
            <div
                id="info-subheader"
                className="transform scale-x-102-5 scale-y-100 font-frutigerbold-cn flex flex-row flex-nowrap justify-between text-subhead-bulletin h-subhead text-shadow-subhead-bulletin absolute min-w-[20%] origin-left z-subheader leading-subheader text-white w-full p-slidehead"
            >
                <span
                    id="subhead-titlei"
                    className="transform -translate-y-42-5 absolute top-2/4"
                >WEATHER BULLETIN</span>
                <span
                    id="subhead-noaa"
                    className="transform scale-x-101 scale-y-100 -translate-y-42-5 text-subhead-noaa font-bold right-subhead-noaa-r italic font-frutiger text-shadow-none leading-subhead-noaa origin-right absolute top-2/4 font-stretch-semi-exp"
                >FROM THE NATIONAL WEATHER SERVICE</span>
            </div>
            <div className="transform translate-x-0 translate-y-2.5 bg-bulletin-frost-pane bg-no-repeat z-default mt-bulletin-frost-pane text-white text-bulletin-frost-pane text-shadow max-h-bulletin-frost-pane flex-1 hidden">
                <div className="transform scale-x-105 scale-y-100 text-bulletin-cityname absolute left-bulletin-cityname-l top-bulletin-cityname-t origin-left">Frankfort Area</div>
                <div
                    id="warningbulletin"
                    className="transform scale-x-112-5 scale-y-100 font-frutiger57-cond origin-left text-white text-bulletin-warnings absolute left-bulletin-warnings-l top-bulletin-warnings-t leading-bulletin-warnings pr-bulletin-warnings whitespace-pre font-stretch-cond"
                >
                    Flash Flood Watch in effect until 4:30 PM EST Tuesday. Monday morning.
                    <br />
                    <br />
                    Severe Thunderstorm Watch 720 in effect until 4:30 PM EST Tuesday. Monday Monday morning.
                </div>
            </div>
        </div>
    </>
);

export default Bulletin;
