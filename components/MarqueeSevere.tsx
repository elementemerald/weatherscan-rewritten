import * as React from "react";
import Marquee from "./CustomMarquee";
import { InfoMarqueeSingle } from "./Marquee";

interface InfoMarqueeSevereProps {
    top: InfoMarqueeSingle
    bottom: InfoMarqueeSingle
    mute: boolean
    setMainVol: React.Dispatch<React.SetStateAction<number>>
}

const MarqueeSevere = ({ top, bottom, mute, setMainVol }: InfoMarqueeSevereProps) => {
    const beep = new Audio("/vocals/beepmuffled.mp3");
    const [utterance, setUtterance] = React.useState<SpeechSynthesisUtterance>(
        new SpeechSynthesisUtterance()
    );
    const [speech, setSpeech] = React.useState<string>("A severe weather warning is in your area.");

    const tts = React.useCallback((message: string) => {
        if (utterance) {
            setMainVol(0.25);

            beep.play();
            beep.onended = () => {
                utterance.text = message;
                //utterance.pitch = 3 / 5;
                speechSynthesis.speak(utterance);

                utterance.onend = () => setMainVol(1);
            };
        }
    }, [utterance, setMainVol]);

    React.useEffect(() => {
        if (top.text !== "") setSpeech(`A ${top.text.toLowerCase()} is in your area.`);
    }, [top.text]);

    React.useEffect(() => {
        let interval: NodeJS.Timer;
        if (typeof window !== undefined) {
            if (!mute && speech && speech !== "") {
                tts(speech);
                interval = setInterval(() => tts(speech), 41500);
            }
        }
        return () => {
            if (typeof window !== undefined) {
                speechSynthesis.cancel();
            }
            clearInterval(interval);
        };
    }, [mute, speech]);

    return (
        <>
            <div id="marquee-severe-header" className="bg-marquee-severe-header text-black text-shadow-none font-synthesis-weight absolute font-interstate-cn font-extrabold left-[450px] leading-[45px] tracking-[1.5px] top-[888px] w-[68.75%] h-[45px] mt-2 text-[34.5px] pl-[40px] uppercase transform scale-x-112 scale-y-100 origin-left z-[13]">
                {top.text}
            </div>
            <div id="marquee-severe" className="bg-marquee-severe font-interstate text-shadow font-normal absolute left-[450px] top-[86.9%] w-[68.7%] h-[56px] text-[46px] pt-[.10%] text-[#DDDDDD] uppercase transform scale-x-110 scale-y-100 origin-left whitespace-nowrap z-[13]">
                <Marquee play={true} gradient={false} duration={bottom.duration ?? 90} pauseOnHover={true}>
                    <span className="text-marquee-severe-text font-interstate text-shadow font-synthesis-weight font-semibold tracking-[1px] leading-[100%]">
                        {bottom.text}
                    </span>
                </Marquee>
            </div>
        </>
    );
};

export default MarqueeSevere;
