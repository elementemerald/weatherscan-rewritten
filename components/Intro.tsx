import * as React from "react";

import perlin from "../hooks/usePerlin";

const resizeWindow = (
    mainRef: React.MutableRefObject<HTMLDivElement>,
    winWidth: number,
    winHeight: number
) => {
    const mainAspect = 4/3;
    const windowAspect = winWidth / winHeight;
    let scale: number;

    const main = document.getElementById("main");

    if (main instanceof HTMLElement) {
        const mainWidth = main.clientWidth;
        const mainHeight = main.clientHeight;

        if (windowAspect >= mainAspect) {
            scale = winHeight / mainHeight;
        } else {
            scale = winWidth / mainWidth;
        }
    
        mainRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }
};

interface IntroProps {
    winSize: number[]
    callback: () => void
}

const Intro = ({ winSize, callback }: IntroProps) => {
    const [innerWidth, innerHeight] = winSize;

    const mainRef = React.useRef<HTMLDivElement>();
    const intellistarRef = React.useRef<HTMLImageElement>();

    function resize() {
        resizeWindow(mainRef, innerWidth, innerHeight);
    }

    React.useEffect(() => {
        if (typeof window === undefined) {
            return;
        }

        if (mainRef && mainRef.current) {
            resize();
        }
    }, [mainRef, innerWidth, innerHeight]);

    React.useEffect(() => {
        if (intellistarRef && intellistarRef.current) {
            // Intro spinner
            const startxx = Math.random()*1000;
            const startxy = Math.random()*1000;
            const startyx = Math.random()*1000;
            const startyy = Math.random()*1000;
            const startzx = Math.random()*1000;
            const startzy = Math.random()*1000;

            let rotatex = perlin.get(startxx, startxy)*2;
            let rotatey = perlin.get(startyx, startyy)*2;
            let rotatez = perlin.get(startzx, startzy)*2;

            intellistarRef.current.style.transition = "transform 2s linear";
            intellistarRef.current.style.transform = `rotatex(${rotatex}turn) rotatey(${rotatey}turn) rotatez(${rotatez}turn)`;

            let rotInterval: NodeJS.Timeout;
            let time = 0;

            setTimeout(() => {
                rotInterval = setInterval(() => {
                    time += .005;
                    
                    rotatex = perlin.get(startxx + time, startxy + time)*2;
                    rotatey = perlin.get(startyx + time, startyy + time)*2;
                    rotatez = perlin.get(startzx + time, startzy + time)*2;

                    intellistarRef.current.style.transition = "transform 1s linear";
                    intellistarRef.current.style.transform = `rotatex(${rotatex}turn) rotatey(${rotatey}turn) rotatez(${rotatez}turn)`;
                }, 100);
            }, 1000);

            setTimeout(() => {
                clearInterval(rotInterval);
                mainRef.current.classList.add("hidden");
                callback();
            }, 5000);
        }
    }, [intellistarRef]);

    return (
        <div id="intro" ref={mainRef} className="relative top-1/2 left-1/2 overflow-hidden w-main h-main bg-white z-[999]">
            <div id="blackbar" className="h-[23.5%] w-full absolute bottom-0 bg-[#161418]">
                <div className="absolute w-[400px] left-[8.05%] top-[4.6%] flex flex-row flex-col">
                    <div className="whitespace-nowrap relative font-frutiger font-semibold text-[#d8c422] text-[31.5px] tracking-[1px] pt-6">headend id:</div>
                    <div className="whitespace-nowrap relative font-frutiger font-semibold text-[#d8c422] text-[31.5px] tracking-[1px] pt-6">serial number:</div>
                    <div className="whitespace-nowrap relative font-frutiger font-semibold text-[#d8c422] text-[31.5px] tracking-[1px] pt-6">location name:</div>
                    <div className="whitespace-nowrap relative font-frutiger font-semibold text-[#d8c422] text-[31.5px] tracking-[1px] pt-6">affiliate name:</div>
                </div>
                <div className="absolute w-[400px] left-[8.05%] top-[4.6%] flex flex-row flex-col hidden">
                    <div className="whitespace-nowrap relative font-frutiger font-semibold text-[#d8c422] text-[31.5px] tracking-[1px] pt-6">appearance settings</div>
                    <div className="whitespace-nowrap relative font-frutiger font-semibold text-[#d8c422] text-[31.5px] tracking-[1px] pt-6">location settings</div>
                    <div className="whitespace-nowrap relative font-frutiger font-semibold text-[#d8c422] text-[31.5px] tracking-[1px] pt-6">weather settings</div>
                    <div className="whitespace-nowrap relative font-frutiger font-semibold text-[#d8c422] text-[31.5px] tracking-[1px] pt-6">other settings</div>
                    <div className="whitespace-nowrap relative font-frutiger font-semibold text-[#d8c422] text-[31.5px] tracking-[1px] pt-6">Save</div>
                </div>
                <img className="object-contain absolute w-[500px] h-[175px] right-[1.9%] -top-[9px]" src="/images/weatherlogos.png" alt="weatherscan" />
                <a target="_blank" rel="noreferrer" href="https://ryand.ca" className="whitespace-nowrap font-frutiger font-semibold text-[#d8c422] text-[31.5px] tracking-[1px] float-right pt-40 pr-[7rem]">Now rewritten!</a>
            </div>
            <div id="appearancesettingspane" className="pt-[200px] hidden">
                <select name="background" id="background">
                    <option value="oldnologo">old background no logo</option>
                    <option value="oldnormal">old background twc logo</option>
                    <option value="oldearthday">old background earthday twc logo</option>
                    <option value="nologo">no nogo</option>
                    <option value="normal">twc logo</option>
                    <option value="earthday">earthday twc logo</option>
                    <option value="custom">custom background</option>
                </select>
                <select name="sidebar" id="sidebar">
                    <option value="normalsidebar">normal sidebar</option>
                    <option value="2005sidebar">2005 sidebar</option>
                </select>
                <select name="citybackground" id="citybackground">
                    <option value="city">city</option>
                    <option value="beach">beach</option>
                    <option value="fence">fence</option>
                    <option value="custom">custom</option>
                </select>
                <button name="slide" id="slide" />
            </div>
            <div id="locationsettingspane" className="pt-[200px] hidden">
                <div id="weathertitle" className="absolute w-full text-center text-[56px] top-[16px]">Location Settings</div>
            </div>
            <img ref={intellistarRef} className="object-contain object-center w-[625px] h-[205px] block m-[0px] m-auto mt-[440px]" src="/images/intellistarlogo.png" alt="intellistar" />
        </div>
    );
};

export default Intro;
