import * as React from "react";
import { Icons2010, getIcon } from "../hooks/useIconMap";

interface CCIconProps {
    iconCode: number
    windData: number
}

const CCIcon = ({ iconCode, windData }: CCIconProps) => {
    const [icon, setIcon] = React.useState<Icons2010>(Icons2010.UNK);

    React.useEffect(() => {
        const mapped = getIcon(iconCode, windData);
        setIcon(mapped);
    }, [iconCode, windData]);

    return (
        <div
            id="conditions-icon"
            className="absolute left-conditions-icon-l bg-conditions-icon w-conditions-icon h-conditions-icon bg-no-repeat top-conditions-icon-t z-0"
            style={{ backgroundImage: `url(images/icons2010/${icon < 10 ? `0${icon}` : icon}.png)` }}
        />
    );
};

export default CCIcon;
