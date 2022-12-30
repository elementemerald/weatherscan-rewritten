import * as React from "react";
import type { SlideProps } from "../../../../../hooks/useSlides";
import BaseSlide from "..";

const Health = ({ next, duration }: SlideProps) => (
    <BaseSlide next={next} duration={duration}>
        <div id="health">Health</div>
    </BaseSlide>
);

export default Health;
