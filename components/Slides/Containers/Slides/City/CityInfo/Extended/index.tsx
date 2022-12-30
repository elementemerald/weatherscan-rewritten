import * as React from "react";
import type { ExtraInfo } from "../../../../../../../hooks/useWeather";
const Header = React.lazy(() => import(
    "./Header" /* webpackChunkName: "ciExtendedHeader" */
));
const Weekday = React.lazy(() => import(
    "./Weekday" /* webpackChunkName: "ciExtendedWeekday" */
));
const Linebreak = React.lazy(() => import(
    "./Linebreak" /* webpackChunkName: "ciExtendedLinebreak" */
));

interface ExtendedProps {
    info?: ExtraInfo
}

// Extended forecasts
const Extended = ({ info }: ExtendedProps) => (
    <Header days={[
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri"
    ]} />
);

export default Extended;
