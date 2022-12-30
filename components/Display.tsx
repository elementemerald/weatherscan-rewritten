import * as React from "react";
import {
    TemperatureUnit,
    Location,
    ExtraLocation,
    ExtraInfo,
    CurrentCond,
    CurrentConds,
    Alert,
    MarqueeLocation,
    MarqueeCities
} from "../hooks/useWeather";
import {
    defaults,
    currentDefaults,
    getMainLocation,
    getClosestLocation,
    getExtraLocations,
    getCurrentCond,
    getExtraCond,
    getAlerts,
    getAlertText
} from "../hooks/useWeather";

import SlideBg from "./Slides/SlideBg";
import SlidesContainer from "./Slides/Containers/SlidesContainer";
import DateTime from "./DateTime";
import CCIcon from "./CCIcon";
import Current from "./Current";
import LogoArea from "./LogoArea";
import InfoMarquee from "./Marquee";
//import MarqueeSevere from "./MarqueeSevere";
const MarqueeSevere = React.lazy(() => import(
    "./MarqueeSevere" /* webpackChunkName: "marqueeSevere" */
));

const resizeWindow = (
    mainRef: React.MutableRefObject<HTMLDivElement>,
    winWidth: number,
    winHeight: number
) => {
    const mainAspect = 4/3;
    const windowAspect = winWidth / winHeight;
    let scale: number;

    const refWidth = mainRef.current.clientWidth;
    const refHeight = mainRef.current.clientHeight;

    if (windowAspect >= mainAspect) {
        scale = winHeight / refHeight;
    } else {
        scale = winWidth / refWidth;
    }

    mainRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
};

interface DisplayProps {
    isReady: boolean
    debug: boolean
    winSize: number[]
    location: string
    language: string
    units: TemperatureUnit
    muteSevere: boolean
    setMainVol: React.Dispatch<React.SetStateAction<number>>
}

const Display = ({
    isReady,
    debug,
    winSize,
    location,
    language,
    units,
    muteSevere,
    setMainVol
}: DisplayProps) => {
    const [cityIntroLoaded, setCityIntroLoaded] = React.useState<boolean>(false);
    const [innerWidth, innerHeight] = winSize;
    const mainRef = React.useRef<HTMLDivElement>();

    const resize = () => {
        resizeWindow(mainRef, innerWidth, innerHeight);
    };

    // Resize handler
    React.useEffect(() => {
        if (typeof window === undefined) {
            return;
        }

        if (mainRef && mainRef.current) {
            resize();
        }
    }, [mainRef, innerWidth, innerHeight]);

    const [locInfo, setLocInfo] = React.useState<Partial<Location>>(defaults);
    const [currentInfo, setCurrentInfo] = React.useState<Partial<CurrentCond>>(currentDefaults);
    const [currentExtra, setCurrentExtra] = React.useState<ExtraInfo>({
        details: {
            name: "",
            lat: 0,
            lon: 0
        }
    });
    const [extraInfo, setExtraInfo] = React.useState<Map<string, ExtraInfo>>(new Map<string, ExtraInfo>());

    const [alerts, setAlerts] = React.useState<Alert[]>([]);
    const [focusedAlert, setFocusedAlert] = React.useState<Alert>(null);
    const [focusedAlertText, setFocusedAlertText] = React.useState<string>(null);

    const [marqueeCities, setMarqueeCities] = React.useState<MarqueeLocation[]>(MarqueeCities);

    // Location handler
    React.useEffect(() => {
        if (isReady) {
            if (location !== "") {
                getMainLocation(location, { language }).then(data => {
                    setLocInfo(data);
                }).catch(err => console.error(err));
            } else {
                getClosestLocation().then(data => {
                    setLocInfo(data);
                }).catch(err => console.error(err));
            }
        }
    }, [isReady, location]);

    const fetchCurrent = (lat: number, lon: number) : Promise<CurrentCond> => {
        return new Promise((resolve, reject) => {
            getCurrentCond(lat, lon, {
                language,
                units
            }).then(data => {
                setCurrentInfo(data);
                resolve(data);
            }).catch(err => reject(err));
        });
    };

    const fetchExtra = async (lat: number, lon: number, initial?: Map<string, ExtraInfo>) => {
        const data = await getExtraLocations(lat, lon, { language });

        const tempMap = new Map<string, ExtraInfo>(initial ?? []);
        const latLonMap = new Map<string, string>();
        const queryLatLons: string[] = [];

        // Dirty way of doing things
        for (let i = 0; i < data.length; i++) {
            const location = data[i];
            const latLon = `${location.lat},${location.lon}`;
            if (debug) console.log(latLon);
            queryLatLons.push(latLon);
            latLonMap.set(latLon, location.displayName);
        }

        const extras = await getExtraCond(queryLatLons, {
            language,
            units
        });
        for (const [key, value] of Object.entries(extras)) {
            const displayName = latLonMap.get(key);
            if (debug) {
                console.log(key);
                console.log(displayName, value);
            }
            const latLon = key.split(",");
            tempMap.set(displayName, {
                details: {
                    name: displayName,
                    lat: parseFloat(latLon[0]),
                    lon: parseFloat(latLon[1])
                },
                current: value
            });
        }

        setExtraInfo(tempMap);
    };

    const fetchAlerts = (lat: number, lon: number) => {
        getAlerts(lat, lon, { language, units }).then(data => {
            setAlerts(data);
        }).catch(err => console.error(err));
    };

    // Current conditions and alerts handler
    React.useEffect(() => {
        if (isReady) {
            const lat = locInfo.latitude;
            const lon = locInfo.longitude;
            
            let intervalTimer: NodeJS.Timer;
            if (lat && lon) {
                const fetchCallback = (data: CurrentCond) => {
                    const tempMap = new Map<string, ExtraInfo>();
                    const currentEx = {
                        details: {
                            name: locInfo.city,
                            lat,
                            lon
                        },
                        current: data
                    };
                    tempMap.set(locInfo.city, currentEx);
                    setCurrentExtra(currentEx);

                    fetchExtra(lat, lon, tempMap);
                    fetchAlerts(lat, lon);
                };

                fetchCurrent(lat, lon).then(fetchCallback).catch(err => console.error(err));
                intervalTimer = setInterval(() => {
                    fetchCurrent(lat, lon).then(fetchCallback).catch(err => console.error(err));
                }, 300000);
            }

            return () => clearInterval(intervalTimer);
        }
    }, [isReady, locInfo.latitude, locInfo.longitude]);

    React.useEffect(() => {
        if (!isReady || !marqueeCities) return;
        let latLons: string[] = [];

        for (const city of marqueeCities) {
            latLons.push(`${city.latitude},${city.longitude}`);
        }

        const ExtraCondCallback = (ret: CurrentConds) => {
            for (const latLon of latLons) {
                const cond = ret[latLon];
                const [lat, lon] = latLon.split(",");
                const parsedLat = parseFloat(lat);
                const parsedLon = parseFloat(lon);

                const city = marqueeCities.find(c => c.latitude === parsedLat && c.longitude === parsedLon);
                if (city) city.observations = cond;
            }
        };

        getExtraCond(latLons, { language, units }).then(ExtraCondCallback).catch(err => console.error(err));
        const interval = setInterval(() => {
            getExtraCond(latLons, { language, units }).then(ExtraCondCallback).catch(err => console.error(err));
        }, 300000);

        return () => clearInterval(interval);
    }, [isReady, marqueeCities]);

    React.useEffect(() => {
        if (alerts.length > 0) {
            setFocusedAlert(alerts[0]);
            getAlertText(alerts[0].detailKey, { language }).then(texts => {
                if (texts.length > 0) {
                    setFocusedAlertText(texts[0].description);
                }
            }).catch(err => {
                console.error(err);
            })
        }
    }, [alerts.length]);

    React.useEffect(() => {
        if (debug) console.log(currentExtra);
    }, [currentExtra]);

    React.useEffect(() => {
        if (debug) console.log(extraInfo);
    }, [extraInfo]);

    /*
        <InfoMarquee
            top="Hello World"
            bottom="This is some text. | This is some other text. | Demo"
        />
    */
    return (
        <div id="main" ref={mainRef} className="relative top-1/2 left-1/2 overflow-hidden w-main h-main">
            <img className="block max-h-full max-w-full" src="/images/template-4k.png" alt="background" />
            <SlideBg />
            {(isReady && locInfo && currentExtra && extraInfo.size !== 0) && <SlidesContainer
                debug={debug}
                setMainVol={setMainVol}
                locInfo={locInfo}
                mainCityInfo={currentExtra}
                extraCityInfo={extraInfo}
                introLoaded={cityIntroLoaded}
                setIntroLoaded={setCityIntroLoaded}
            />}
            {locInfo.timezone !== "" && <DateTime tz={locInfo.timezone} />}
            {locInfo.city !== "" && <div
                id="city"
                className="font-interstate font-semibold text-city pt-city-t absolute text-left ml-city-l w-city h-city top-city-t left-0 leading-city flex items-center transform scale-x-103 scale-y-100 origin-left"
            >{locInfo.city}</div>}
            <CCIcon iconCode={currentInfo.icon} windData={currentInfo.windSpeed} />
            <Current
                key={currentInfo.phrase}
                temp={currentInfo.temp}
                info={currentInfo}
            />
            <LogoArea />
            <InfoMarquee
                top={{
                    locations: marqueeCities ?? [],
                    duration: 4.5
                }}
                ticker={{
                    text: "Happy holidays! | This project is open source: github.com/elementemerald/weatherscan-rewritten | NextJs version inspired from https://github.com/buffbears/Weatherscan |",
                    duration: 12
                }}
            />
            {(focusedAlert && focusedAlertText) && <MarqueeSevere
                top={{
                    text: focusedAlert.eventDescription
                }}
                bottom={{
                    text: focusedAlertText,
                    duration: 0.1 * (focusedAlertText.length)
                }}
                mute={muteSevere}
                setMainVol={setMainVol}
            />}
        </div>
    );
};

export default Display;
