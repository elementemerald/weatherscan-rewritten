import * as React from "react";
import { VocalMale, VocalFemale } from "../components/VocalAudio";
import type { ExtraInfo } from "./useWeather";

export enum Slides {
    CITY,
    HEALTH,
    TRAVEL,
    AIRPORTS,
    INTERNATIONAL
}

// City slides
export enum SlidesCity {
    INTRO,
    INFO
}

export enum SlidesCityInfo {
    DETAILED,
    NEAR,
    EXTENDED
}

export interface SlideProps {
    currentCityInfo?: ExtraInfo
    next?: () => void
    duration?: number
    debug?: boolean
    location?: string
    setVocal?: (vocal: VocalMale | VocalFemale) => Promise<void>
}

export interface MainSlideProps extends SlideProps {
    isLoaded?: boolean
    setLoaded?: React.Dispatch<React.SetStateAction<boolean>>
}

export const enum ActionType {
    INCREASE = "INCREASE",
    DECREASE = "DECREASE",
    SET = "SET",
    TOGGLE_CITY = "TOGGLE_CITY",
    SET_CITY = "SET_CITY"
}

interface Action {
    type: ActionType
    payload?: number
    payloadCity?: boolean
}

interface State {
    index: number
    isCity?: boolean // Used for header, nullable
}

export const SlideshowReducer = (state: State, action: Action) => {
    const { type, payload, payloadCity } = action;
    switch (type) {
        case ActionType.INCREASE:
            return { index: state.index + payload };
        case ActionType.DECREASE:
            return { index: state.index - payload };
        case ActionType.SET:
            return { index: payload, isCity: payloadCity || false };
        case ActionType.TOGGLE_CITY:
            return { index: state.index, isCity: !state.isCity }
        case ActionType.SET_CITY:
            return { index: state.index, isCity: payloadCity || false }
        default:
            return state;
    }
};