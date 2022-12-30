import * as React from "react";
import { motion } from "framer-motion";
import type { ExtraInfo } from "../../../../../../hooks/useWeather";
import { VocalMale, VocalFemale } from "../../../../../VocalAudio";
import { Icons2010, getIcon } from "../../../../../../hooks/useIconMap";
import FrostPane from "../../FrostPane";

interface DetailedProps {
    info?: ExtraInfo
    setVocal?: (vocal: VocalMale | VocalFemale) => Promise<void>
}

const Detailed = ({ info, setVocal }: DetailedProps) => {
    const [icon, setIcon] = React.useState<Icons2010>(Icons2010.UNK);

    React.useEffect(() => {
        setVocal(VocalFemale.CURRENT_COND);
    }, []);

    React.useEffect(() => {
        console.log(info);
    }, [info]);

    React.useEffect(() => {
        if (info.current) {
            const mapped = getIcon(info.current.icon, info.current.windSpeed);
            setIcon(mapped);
        }
    }, [info.current]);

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                key="info-subheader"
                id="info-subheader"
                className="pr-subhead-city-info-r font-frutiger57-cond flex flex-row flex-nowrap justify-between text-subhead h-subhead z-subheader text-shadow-subhead leading-subheader relative text-white w-full p-slidehead"
            >
                <span id="subhead-titlei" className="absolute top-1/2 transform -translate-y-42-5" />
                <span
                    id="subhead-city"
                    className="font-frutiger text-subhead-city pt-0 transform -translate-y-43-5 scale-x-105-9 scale-y-100 origin-right right-subhead-city-r font-stretch-semi-exp absolute top-1/2"
                >{info.details ? info.details.name : "N/A"}</span>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                key="info-subheadershadowfix"
                id="info-subheadershadowfix"
                className="font-normal font-frutiger57-cond text-white flex flex-row flex-nowrap justify-between text-subhead h-subhead z-subheader-shadow whitespace-nowrap text-shadow-subhead absolute min-w-subhead-shadow"
            >
                <span id="subhead-title" className="absolute top-subhead-title-t transform -translate-y-42-5 scale-x-118 scale-y-100 origin-left left-subhead-title-l w-subhead-title">Currently</span>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                key="detailed"
                id="detailed"
                className="h-full min-h-full w-full flex-1 z-0 flex flex-row top-[10%] text-[110%]"
            >
                <FrostPane
                    id="left"
                    extraParent={[
                        "min-w-[55.5%]",
                        "mr-[0.8%]"
                    ]}
                >
                    <div id="frost-pane-labels" className="absolute pt-[5px] leading-[182.5%] font-frutiger57-cond text-[#d8c422] left-[13.5%] transform scale-x-115-5 scale-y-100 origin-left text-[37.5px]">
                        Humidity
                        <br />
                        Dew Point
                        <br />
                        Pressure
                        <br />
                        Wind
                        <br />
                        Gusts
                        <br />
                        Wind Chill
                    </div>
                    {info.current && <div id="frost-pane-data" className="absolute pt-[5px] leading-[182.5%] font-frutiger57-cond transform scale-x-113-5 scale-y-100 origin-right right-[10%] text-[37.5px] text-right">
                        {`${info.current.humidity}%`}
                        <br />
                        {info.current.dewpt}
                        <br />
                        {info.current.pres}
                        <br/>
                        {info.current.wind}
                        <br/>
                        none
                        <br />
                        {info.current.chill.toString()}
                    </div>}
                </FrostPane>
                <FrostPane
                    id="right"
                    extraParent={[
                        "flex",
                        "flex-col",
                        "items-center"
                    ]}
                    style={{ backgroundPosition: "-570px -329px" }}
                >
                    <div id="info-icon"
                        className="bg-no-repeat bg-cover bg-info-icon w-[212px] h-[212px] transform -translate-y-[5px]"
                        style={{ backgroundImage: `url(/images/icons2010/${icon < 10 ? `0${icon}` : icon}.png)` }}
                    />
                    {info.current && <>
                        <div
                            id="conditions"
                            className="flex items-center justify-center absolute text-[36px] font-medium leading-[110%] top-[220px] text-center capitalize break-word w-[25%] h-[50px] transform -translate-x-[11px] translate-y-0 scale-x-[104.5%] scale-y-100"
                        >{info.current.phrase}</div>
                        <div
                            id="temp"
                            className="font-frutigerbold-cn text-[69px] font-bold absolute top-[323px] tracking-[2.5px] transform -translate-x-6px translate-y-0 scale-x-102-5 scale-y-100 origin-left"
                        >{info.current.temp}</div>
                    </>}
                </FrostPane>
            </motion.div>
        </>
    );
};

export default Detailed;
