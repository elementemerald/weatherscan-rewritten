import * as React from "react";
import type { SlideProps } from "../../../../../hooks/useSlides";
import BaseSlide from "..";

const Airports = ({ next, duration }: SlideProps) => (
    <BaseSlide next={next} duration={duration}>
        <div id="airports">Airports</div>
    </BaseSlide>
);

export default Airports;
