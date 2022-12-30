import * as React from "react";
import { AnimatePresence } from "framer-motion";
import type { MainSlideProps } from "../../../../../hooks/useSlides";
import { SlideshowReducer, SlidesCity, ActionType, SlideProps } from "../../../../../hooks/useSlides";

import CityIntro from "./CityIntro";
import CityInfo from "./CityInfo";

const City = ({ next, debug, location, currentCityInfo, isLoaded = false, setLoaded, setVocal }: MainSlideProps) => {
    const [slideState, slideDispatch] = React.useReducer(SlideshowReducer, { index: isLoaded ? 1 : 0 });

    React.useEffect(() => {
        if (!isLoaded) setLoaded(true);
    }, []);

    const SlideCallback = React.useCallback(() => {
        const numSlides = Object.keys(SlidesCity).length / 2;
        if (slideState.index >= (numSlides - 1)) {
            next();
            slideDispatch({ type: ActionType.SET, payload: 2 });
            setTimeout(() => slideDispatch({ type: ActionType.SET, payload: isLoaded ? 1 : 0 }), 900);
        } else {
            slideDispatch({ type: ActionType.INCREASE, payload: 1 });
        }
    }, [slideState.index, isLoaded]);

    const currentSlide = React.useMemo(() => {
        if (debug) console.log("Rendering new city slide");
        switch (slideState.index) {
            case SlidesCity.INTRO:
                return <CityIntro next={SlideCallback} />;
            case SlidesCity.INFO:
                return <CityInfo
                    next={SlideCallback}
                    debug={debug}
                    location={location}
                    currentCityInfo={currentCityInfo}
                    setVocal={setVocal}
                />;
            default:
                return null;
        }
    }, [slideState.index, SlideCallback, location, currentCityInfo]);

    return (
        <AnimatePresence>
            {currentSlide}
        </AnimatePresence>
    );
};

export default City;
