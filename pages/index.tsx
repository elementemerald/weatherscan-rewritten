import * as React from "react";
import { useRouter } from "next/router";
import { TemperatureUnit } from "../hooks/useWeather";

import { AudioPlayerProvider } from "react-use-audio-player";
import MusicAudio from "../components/MusicAudio";

import Intro from "../components/Intro";
import Display from "../components/Display";

import { useWinSizeInner } from "../hooks/useWinSize";

const Index = () => {
    const { isReady, query } = useRouter();

    const [loading, setLoading] = React.useState<boolean>(true);
    const [location, setLocation] = React.useState<string>("");
    const [language, setLanguage] = React.useState<string>("en-US");
    const [units, setUnits] = React.useState<TemperatureUnit>(TemperatureUnit.METRIC_SI);
    const [muteSevere, setMuteSevere] = React.useState<boolean>(false);

    const [innerWidth, innerHeight] = useWinSizeInner();
    const [introDone, setIntroDone] = React.useState<boolean>(false);

    const [musicVol, setMusicVol] = React.useState<number>(1);

    const IntroCallback = () => {
        setIntroDone(true);
    };

    React.useEffect(() => {
        if (!isReady) return;
        const location = query.location as string;
        const language = query.language as string;
        const units = query.units as TemperatureUnit;
        const muteSevere = query.muteSevere as string;

        // Custom location
        if (location !== undefined && location !== null) {
            setLocation(location);
        }

        // Custom language
        if (language !== undefined && language !== null) {
            setLanguage(language);
        }

        // Custom units
        if (units !== undefined && units !== null) {
            setUnits(units);
        }

        // Mute severe marquees
        if (muteSevere !== undefined && muteSevere !== null) {
            setMuteSevere(Boolean(muteSevere));
        }

        setLoading(false);
    }, [isReady]);

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <AudioPlayerProvider>
                <MusicAudio vol={musicVol} />
            </AudioPlayerProvider>
            <Intro winSize={[innerWidth, innerHeight]} callback={IntroCallback} />
            <Display
                isReady={introDone}
                debug={
                    process.env.NODE_ENV === "development"
                    || process.env.NODE_ENV === "test"
                }
                winSize={[innerWidth, innerHeight]}
                location={location}
                language={language}
                units={units}
                muteSevere={muteSevere}
                setMainVol={setMusicVol}
            />
        </>
    );
};

export default Index;
