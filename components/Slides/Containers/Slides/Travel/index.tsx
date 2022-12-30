import * as React from "react";
import type { SlideProps } from "../../../../../hooks/useSlides";
import BaseSlide from "..";

const Travel = ({ next, duration }: SlideProps) => (
    <BaseSlide next={next} duration={duration}>
        <div id="travel">Travel</div>
    </BaseSlide>
);

export default Travel;
