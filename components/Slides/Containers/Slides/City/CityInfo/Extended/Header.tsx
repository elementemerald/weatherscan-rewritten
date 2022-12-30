import * as React from "react";

interface ExtendedHeaderProps {
    days: string[]
}

const Header = ({ days }: ExtendedHeaderProps) => (
    <div
        id="extendedHeader"
        className="text-white font-frutiger text-[30px] text-shadow h-[35px] w-full absolute flex top-[70px] z-[388688] text-center"
    >
        <div
            id="extendedMask"
            className="absolute h-[35px] w-full bg-[#2a3a8a] frostpane-mask-header"
        />
        {days.map(day => (
            <div
                key={day}
                id="extendedDay"
                className="text-white font-frutiger57-cond text-[30px] text-shadow h-[35px] min-w-[165px] ml-[6.5px] pt-[3.5px] z-[388690] text-center transform scale-x-115 scale-y-100"
            >{day}</div>
        ))}
    </div>
);

export default Header;
