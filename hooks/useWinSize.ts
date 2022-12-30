import * as React from "react";

/**
 * Gets the inner size of the window.
 * @returns A number array with the first index being the inner width and the second index being the inner height.
 */
export const useWinSizeInner = () => {
    const [size, setSize] = React.useState<number[]>([0, 0]);
    React.useEffect(() => {
        let resizeTimer: NodeJS.Timeout;
        const updateSize = () => {
            setSize([window.innerWidth, window.innerHeight]);
        };
        
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => {
            window.removeEventListener("resize", updateSize);
            clearTimeout(resizeTimer);
        };
    }, []);
    
    return size;
};

/**
 * Gets the outer size of the window.
 * @returns A number array with the first index being the outer width and the second index being the outer height.
 */
export const useWinSizeOuter = () => {
    const [size, setSize] = React.useState([0, 0]);
    React.useEffect(() => {
        let resizeTimer;
        const updateSize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                setSize([window.outerWidth, window.outerHeight]);
            }, 100);
        };
        
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => {
            window.removeEventListener("resize", updateSize);
            clearTimeout(resizeTimer);
        };
    }, []);
    
    return size;
};