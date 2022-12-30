import * as React from "react";
import FrostPane from "../../../FrostPane";

const SlideSevereCityInfo = () => (
    <>
        <div
            id="info-slide_severe-city-info"
            className="relative bg-infoslide-color bg-severe-city-info-image bg-infoslide-pos bg-infoslide-size bg-no-repeat w-full min-h-infoslide max-h-infoslide overflow-hidden flex flex-col hidden"
        >
            <div id="info-subheader" className="pr-slidehead-severe-city-info-r font-frutiger57-cond flex flex-row flex-nowrap justify-between text-subhead h-subhead z-subheader text-shadow-subhead leading-subheader relative text-white w-full p-slidehead">
                <span
                    id="subhead-titlei"
                    className="transform -translate-y-42-5 absolute top-2/4"
                />
                <span
                    id="subhead-city"
                    className="transform -translate-y-43-5 scale-x-105-9 scale-y-100 font-frutiger text-subhead-city pt-0 origin-right right-subhead-city-r absolute top-2/4 font-stretch-semi-exp"
                />
            </div>
            <div id="info-subheadershadowfix" className="font-frutiger57-cond text-white flex flex-row flex-nowrap justify-between text-subhead h-subhead z-subheader-shadow whitespace-nowrap text-shadow-subhead absolute min-w-subhead-shadow">
                <span
                    id="subhead-title"
                    className="transform -translate-y-42-5 scale-x-118 scale-y-100 absolute top-subhead-shadow-t origin-left left-subhead-shadow-l w-subhead-shadow"
                >Severe Weather Message</span>
            </div>
            <div
                id="noreport"
                className="transform translate-x-0 translate-y-60px scale-x-114-5 scale-y-100 origin-left absolute whitespace-nowrap font-frutiger57-cond pt-noreport-t pl-noreport-l text-white text-noreport text-shadow z-noreport hidden"
            >
                No Report
            </div>
            <div
                id="tempunavailable"
                className="transform translate-x-0 translate-y-60px scale-x-114-5 scale-y-100 origin-left absolute whitespace-nowrap font-frutiger57-cond pt-noreport-t pl-tempunavailable-l text-white text-tempunavailable text-shadow z-noreport hidden"
            >
                Temporarily Unavailable
            </div>
            <div id="infoslide-content-severe-forecast" className="h-full min-h-full w-full flex-1 z-0 flex-row top-forecast text-forecast hidden">
                <FrostPane extraParent={[
                    "bg-severe-frost-pane",
                    "p-info-frost-pane",
                    "h-info-frost-pane"
                ]}>
                    <div
                        id="title"
                        className="font-frutiger57-cond text-frost-pane-title text-severe-frost-pane-title transform scale-x-117 scale-y-100 origin-left tracking-severe-frost-pane-title capitalize"
                    />
                    <div
                        id="content"
                        className="font-frutiger57-cond h-severe-frost-pane-content max-h-severe-frost-pane-content transform -translate-x-2.5 -translate-y-2.5 scale-x-115 scale-y-100 origin-left tracking-severe-frost-pane-content text-frost-pane-content leading-frost-pane-content"
                    />
                </FrostPane>
            </div>
        </div>
    </>
);

export default SlideSevereCityInfo;
