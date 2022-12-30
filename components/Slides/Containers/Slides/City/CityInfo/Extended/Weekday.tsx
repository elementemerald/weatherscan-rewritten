import * as React from "react";
import FrostPane from "../../../FrostPane";

interface WeekdayProps {
    title: string
}

const Weekday = ({ title }: WeekdayProps) => (
    <FrostPane
        id={`weekday_${title}`}
        extraParent={[
            "translate-x-0",
            "translate-y-45px",
            "max-h-[411.25px]",
            "min-w-[165px]",
            "bg-city-info-extended"
        ]}
    >
        <div id="conditions" />
    </FrostPane>
);

export default Weekday;
