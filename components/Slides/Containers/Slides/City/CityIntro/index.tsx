import * as React from "react";
import type { SlideProps } from "../../../../../../hooks/useSlides";
import { motion, useAnimation } from "framer-motion";

type SlideState = "active" | "inactive";

const CityIntro = ({ next }: SlideProps) => {
    const [slideState, setSlideState] = React.useState<SlideState>("active");

    const variants = {
        active: {
            opacity: 1
        },
        inactive: {
            opacity: 0,
            transition: { duration: 0.5 }
        }
    };

    React.useEffect(() => {
        let timeout: NodeJS.Timer;
        let waitTimeout: NodeJS.Timer;
        timeout = setTimeout(() => {
            setSlideState("inactive");
            waitTimeout = setTimeout(next, 500);
        }, 8000);
        return () => {
            clearTimeout(timeout);
            clearTimeout(waitTimeout);
        }
    }, []);

    return (
        <div
            id="city-intro-slide"
            className="bg-infoslide-color bg-city-intro-slide bg-no-repeat min-w-infoslide max-w-infoslide min-h-infoslide-px max-h-infoslide-px absolute top-0 overflow-hidden flex flex-col z-infoslide"
        >
            <motion.div animate={slideState} variants={variants} id="ws-copyright" className="text-white text-copyright bg-copyright h-copyright w-full absolute top-0 left-0 items-center pl-copyright-l pr-copyright-r pt-copyright-t leading-copyright z-copyright">
                <span id="ws-copyright-text" className="block transform scale-x-107 scale-y-100 origin-left text-white text-copyright leading-copyright">
                    Weatherscan is brought to you by The Weather Channel&#174; and MIDCO
                </span>
            </motion.div>
            <motion.div animate={slideState} variants={variants} id="cityaccent-i-curve" className="bg-cityaccent-yellow cityaccent-mask w-[40%] h-[128.5%] -top-[16.3%] -right-[11.2%] opacity-[.8] animate-cityaccentmovei absolute bg-curve bg-no-repeat"></motion.div>
            <motion.div animate={slideState} variants={variants} id="cityaccent-ii-curve" className="bg-cityaccent-blue cityaccent-mask w-[55%] h-[131%] -top-[13.5%] -right-[13.75%] opacity-[.5] animate-cityaccentmoveii absolute bg-curve bg-no-repeat"></motion.div>
            <motion.div animate={slideState} variants={variants} id="cityaccent-iii-curve" className="bg-cityaccent-yellow cityaccent-mask w-[55%] h-[172.4%] -top-[12.25%] -right-[29.75%] animate-cityaccentmoveiii absolute bg-curve bg-no-repeat"></motion.div>
            <motion.div animate={slideState} variants={variants} id="cityaccent-iv-curve" className="bg-cityaccent-blue cityaccent-mask-min w-[67.5%] h-[202.5%] -top-[31.45%] -left-[22%] opacity-[.5] animate-cityaccentmoveiv absolute bg-curve bg-no-repeat"></motion.div>
        </div>
    );
};

export default CityIntro;
