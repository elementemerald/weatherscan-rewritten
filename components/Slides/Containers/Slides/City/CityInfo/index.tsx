import * as React from "react";
import type { SlideProps } from "../../../../../../hooks/useSlides";
import { SlidesCityInfo } from "../../../../../../hooks/useSlides";
import { SlideshowReducer, Slides, ActionType } from "../../../../../../hooks/useSlides";
import { VocalMale, VocalFemale } from "../../../../../VocalAudio";
import { motion, AnimatePresence } from "framer-motion";
// import NoReport from "./NoReport";
// import Unavailable from "./Unavailable";
// import Detailed from "./Detailed";
// import Near from "./Near";
// import Extended from "./Extended";
const Detailed = React.lazy(() => import(
    "./Detailed" /* webpackChunkName: "citySlideCurrent" */
));
const Near = React.lazy(() => import(
    "./Near" /* webpackChunkName: "citySlideNear" */
));
const Extended = React.lazy(() => import(
    "./Extended" /* webpackChunkName: "citySlideExtended" */
));

const SlideCityInfo = ({ next, debug, location, currentCityInfo, setVocal }: SlideProps) => {
    const [slideState, slideDispatch] = React.useReducer(SlideshowReducer, { index: 0 });

    const currentSlide = React.useMemo(() => {
        if (debug) console.log("Rendering new city info slide");
        switch (slideState.index) {
            case SlidesCityInfo.DETAILED:
                return <Detailed
                    info={currentCityInfo}
                    setVocal={setVocal}
                />;
            case SlidesCityInfo.NEAR:
                return <Near />;
            case SlidesCityInfo.EXTENDED:
                return <Extended />;
            default:
                return null;
        }
    }, [slideState.index]);

    React.useEffect(() => {
        let timeout = setTimeout(() => {
            const numSlides = Object.keys(SlidesCityInfo).length / 2;
            if (slideState.index >= (numSlides - 1)) {
                next();
                slideDispatch({ type: ActionType.SET, payload: 0 });
                return;
            }

            slideDispatch({ type: ActionType.INCREASE, payload: 1 });
        }, 8000);
        return () => clearTimeout(timeout);
    }, [slideState.index]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.09, ease: "easeInOut" }}
            key="city-info-slide"
            id="city-info-slide"
            className="relative bg-city-info-slide bg-no-repeat w-full min-h-infoslide max-h-infoslide overflow-hidden flex flex-col"
        >
            <AnimatePresence>
                {currentSlide}
            </AnimatePresence>
        </motion.div>
    );
};

export default SlideCityInfo;
