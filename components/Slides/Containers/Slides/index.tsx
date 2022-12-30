import * as React from "react";
import type { SlideProps } from "../../../../hooks/useSlides";

interface BaseSlideProps extends SlideProps {
    children?: React.ReactNode
}

const BaseSlide = ({ next, duration, children }: BaseSlideProps) => {
    React.useEffect(() => {
        let timeout = setTimeout(next, duration ?? 8000);
        return () => clearTimeout(timeout);
    }, []);

    return <>
        {children}
    </>;
};

export default BaseSlide;
