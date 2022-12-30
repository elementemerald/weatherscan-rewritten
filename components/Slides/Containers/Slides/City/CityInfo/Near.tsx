import * as React from "react";
import FrostPane from "../../FrostPane";

const Forecast = () => (
    <div id="infoslide-content-forecast" className="h-full min-h-full w-full flex-1 z-0 flex flex-row top-forecast text-forecast">
        <FrostPane extraParent={[
            "p-info-frost-pane",
            "h-info-frost-pane"
        ]}>
            <div
                id="title"
                className="font-frutiger57-cond text-frost-pane-title text-severe-frost-pane-title transform scale-x-117 scale-y-100 origin-left tracking-severe-frost-pane-title capitalize"
            />
            <div
                id="content"
                className="font-frutiger57-cond h-frost-pane-content max-h-frost-pane-content transform -translate-x-2.5 -translate-y-2.5 scale-x-115 scale-y-100 origin-left tracking-frost-pane-content"
                style={{ fontSize: "52px" }}
            >Near</div>
        </FrostPane>
    </div>
);

export default Forecast;
