import * as React from "react";
import type { SlideProps } from "../../../../../hooks/useSlides";
import BaseSlide from "..";

const International = ({ next, duration }: SlideProps) => (
    <BaseSlide next={next} duration={duration}>
        <div id="international">International</div>
    </BaseSlide>
);

export default International;
