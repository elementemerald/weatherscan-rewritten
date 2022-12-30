import * as React from "react";
import { Icons2010 } from "./useIconMap";

export enum TemperatureUnit {
    ENGLISH = "e",
    METRIC = "m",
    HYBRID = "h",
    METRIC_SI = "s"
}

interface APIOptions {
    language?: string
    units?: TemperatureUnit
}

// Mapped location
export interface Location {
    city: string
    state: string
    country: string
    countryCode: string
    latitude: number
    longitude: number
    timezone: string
}

// api.weather.com
interface WeatherAPILocation {
    city?: string
    displayName?: string
    adminDistrict?: string
    country?: string
    countryCode?: string
    latitude?: number
    longitude?: number
    ianaTimeZone?: string
}

interface WeatherAPISearchLoc {
    city?: string[]
    adminDistrict?: string[]
    country?: string[]
    countryCode?: string[]
    latitude?: number[]
    longitude?: number[]
    ianaTimeZone?: string[]
}

interface WeatherAPINear {
    adminDistrictCode?: string[]
    stationName?: string[]
    countryCode?: string[]
    stationId?: string[]
    ianaTimeZone?: string[]
    obsType?: string[]
    latitude?: number[]
    longitude?: number[]
    distanceKm?: number[]
    distanceMi?: number[]
}

interface WeatherAPISearchLocResponse {
    location: WeatherAPISearchLoc
}

interface WeatherAPINearResponse {
    location: WeatherAPINear
}

interface WeatherAPIPointResponse {
    location: WeatherAPILocation
}

export interface ExtraLocation {
    lat?: number
    lon?: number
    distance?: number
    stationUrl?: string
    name?: string
    displayName?: string
}

export interface ExtraInfo {
    details?: ExtraLocation
    current?: Partial<CurrentCond>
    fiveDay?: CurrentCond[]
}

// ip-api.com
enum IPAPIStatus {
    SUCCESS = "success",
    FAIL = "fail"
}

interface IPAPILocResponse {
    status: IPAPIStatus
    city: string
    region: string
    regionName: string
    country: string
    countryCode: string
    lat: number
    lon: number
    timezone: string
}

export const defaults: Location = Object.freeze({
    status: "",
    city: "",
    state: "",
    country: "",
    countryCode: "",
    latitude: null,
    longitude: null,
    timezone: ""
});

export interface CurrentCond {
    temp: number
    icon: number
    wind: string
    windSpeed: number
    visib: number
    uvIndex: string
    phrase: string
    humidity: number
    dewpt: number
    pres: number
    chill: number
}

export const currentDefaults: CurrentCond = Object.freeze({
    temp: NaN,
    icon: 44,
    wind: "",
    windSpeed: 0,
    visib: 0,
    uvIndex: "",
    phrase: "",
    humidity: 0,
    dewpt: 0,
    pres: 0,
    chill: NaN
});

/* const memoAsync = (cb) => {
    const cache = new Map();
    return async (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) return cache.get(key);
        const value = await cb(...args);
        cache.set(key, value);
        return value;
    };
};

const memoizedFetch = memoAsync(fetch); */

const baseUrl = "https://api.weather.com";

/**
 * Gets the main location for a query string.
 * @param location The query string to look up.
 * @param options The options for this request.
 * @returns A promise returning a {@link Location} for the query string.
 */
export const getMainLocation = async (location: string, options?: APIOptions) => {
    const apiLanguage = options.language || "en-US";

    return fetch(`${baseUrl}/v3/location/search?query=${encodeURIComponent(location)}&language=${apiLanguage}&format=json&apiKey=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`)
        .then(async (res: Response) => {
            return res.json().then((data: WeatherAPISearchLocResponse) => {
                const dataLocs = data.location;

                const loc = Object.assign({}, defaults);
                loc.city = dataLocs.city[0];
                loc.state = dataLocs.adminDistrict[0];
                loc.country = dataLocs.country[0];
                loc.countryCode = dataLocs.countryCode[0];
                loc.latitude = dataLocs.latitude[0];
                loc.longitude = dataLocs.longitude[0];
                loc.timezone = dataLocs.ianaTimeZone[0];

                return loc;
            }).catch(err => {
                throw new Error(err);
            });
        }).catch(err => {
            throw new Error(err);
        });
};

/**
 * Gets the location info of a point.
 * @param lat The latitude of the point.
 * @param lon The longitude of the point.
 * @param options The options for this request.
 */
// https://api.weather.com/v3/aggcommon/v3-location-point;v3-wx-observations-current?geocodes=41.881832,-87.623177;44.986656,-93.258133;33.427204,-111.939896;46.877186,-96.789803;34.187042,-118.381256;33.660057,-117.998970;36.114647,-115.172813;21.315603,-157.858093;28.538336,-81.379234;43.0,-75.0;&language=en-US&units=e&format=json&apiKey=e1f10a1e78da46f5b10a1e78da96f525
export const getPointLocation = async (lat: number, lon: number, options?: APIOptions) => {
    const apiLanguage = options.language || "en-US";

    return fetch(`${baseUrl}/v3/location/point?geocode=${lat},${lon}&language=${apiLanguage}&format=json&apiKey=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`)
        .then(async (res: Response) => {
            return res.json().then((data: WeatherAPIPointResponse) => {
                const dataLoc = data.location;

                const loc = Object.assign({}, defaults);
                loc.city = dataLoc.city;
                loc.state = dataLoc.adminDistrict;
                loc.country = dataLoc.country;
                loc.countryCode = dataLoc.countryCode;
                loc.latitude = dataLoc.latitude;
                loc.longitude = dataLoc.longitude;
                loc.timezone = dataLoc.ianaTimeZone;

                return loc;
            }).catch(err => {
                throw new Error(err);
            });
        }).catch(err => {
            throw new Error(err);
        });
};

/**
 * Gets the closest location nearest to the user.
 * @returns A promise returning the {@link Location} of the user.
 */
export const getClosestLocation = async () => {
    return fetch(`https://pro.ip-api.com/json/?key=${process.env.NEXT_PUBLIC_IP_API_KEY}&exposeDate=true`)
        .then(async (res: Response) => {
            return res.json().then((data: IPAPILocResponse) => {
                if (data.status === IPAPIStatus.SUCCESS) {
                    const closest = Object.assign({}, defaults);
                    closest.city = data.city;
                    closest.state = data.region;
                    closest.country = data.country;
                    closest.countryCode = data.countryCode;
                    closest.latitude = data.lat;
                    closest.longitude = data.lon;
                    closest.timezone = data.timezone;

                    return closest;
                }

                return defaults;
            }).catch(err => {
                throw new Error(err);
            });
        }).catch(err => {
            throw new Error(err);
        });
};

/**
 * Gets nearby locations for a single location.
 * @param lat The latitude of the location.
 * @param lon The longitude of the location.
 * @param options The options for this request.
 * @returns A promise returning an {@link ExtraLocation} array for the specified location.
 */
export const getExtraLocations = async (lat: number, lon: number, options?: APIOptions) => {
    const apiLanguage = options.language || "en-US";

    return fetch(`https://api.weather.com/v3/location/near?geocode=${lat},${lon}&product=observation&format=json&apiKey=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`)
        .then(async (res: Response) => {
            return res.json().then(async (near: WeatherAPINearResponse) => {
                const dataLoc = near.location;
                const dataLocLength = dataLoc.stationName.length;
                const extraLocs: ExtraLocation[] = [];
                for (let i = 0; i < dataLocLength; i++) {
                    const point = await fetch(`https://api.weather.com/v3/location/point?geocode=${dataLoc.latitude[i]},${dataLoc.longitude[i]}&language=${apiLanguage}&format=json&apiKey=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`)
                        .then(async (res: Response) => {
                            return res.json().then((point: WeatherAPIPointResponse) => {
                                const pointData = point.location;
                                return pointData;
                            });
                        });
                    extraLocs.push({
                        name: point.displayName,
                        displayName: point.displayName,
                        lat: point.latitude,
                        lon: point.longitude,
                        distance: dataLoc.distanceMi[i],
                        stationUrl: dataLoc.stationId[i]
                    });
                }

                return extraLocs;
            }).catch(err => {
                throw new Error(err);
            });
        }).catch(err => {
            throw new Error(err);
        });
};

/**
 * Gets the current conditions for a single location.
 * @param lat The latitude of the location.
 * @param lon The longitude of the location.
 * @param options The options for this request.
 * @returns A promise returning a {@link CurrentCond} object for the specified location.
 */
export const getCurrentCond = async (lat: number, lon: number, options?: APIOptions) => {
    const apiLanguage = options.language || "en-US";
    const apiUnits = options.units || TemperatureUnit.METRIC_SI;
    return fetch(`https://api.weather.com/v3/aggcommon/v3-wx-observations-current?geocode=${lat},${lon}&language=${apiLanguage}&units=${apiUnits}&format=json&apiKey=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`)
        .then(async (res: Response) => {
            return res.json().then(data => {
                const dataLoc = data["v3-wx-observations-current"];

                const current = Object.assign({}, currentDefaults);
                current.temp = dataLoc.temperature;
                current.icon = dataLoc.iconCode;
                current.wind = `${(dataLoc.windDirectionCardinal === "CALM" || dataLoc.windSpeed === 0 ? "Calm" : dataLoc.windDirectionCardinal)} ${dataLoc.windSpeed === 0 ? "" : dataLoc.windSpeed}`;
                current.windSpeed = dataLoc.windSpeed;
                current.visib = dataLoc.visibility;
                current.uvIndex = dataLoc.uvDescription;
                current.phrase = dataLoc.wxPhraseLong.toLowerCase();
                current.humidity = dataLoc.relativeHumidity;
                current.dewpt = dataLoc.temperatureDewPoint;
                current.pres = dataLoc.pressureAltimeter.toFixed(2);
                current.chill = dataLoc.temperatureWindChill;

                return current;
            }).catch(err => {
                throw new Error(err);
            });
        }).catch(err => {
            throw new Error(err);
        });
};

export interface CurrentConds {
    [latLon: string]: CurrentCond
}

/**
 * Gets the current conditions for a list of locations.
 * @param latLons An array of locations (latitudes and longitudes).
 * @param options The options for this request.
 * @returns A promise returning a {@link CurrentConds} object for the specified locations.
 */
export const getExtraCond = async (latLons: string[], options?: APIOptions) => {
    const apiLanguage = options.language || "en-US";
    const apiUnits = options.units || TemperatureUnit.METRIC_SI;
    let baseUrl = "https://api.weather.com/v3/aggcommon/v3-wx-observations-current?geocodes=";
    for (let i = 0; i < latLons.length; i++) {
        const latLon = latLons[i];
        baseUrl += `${latLon};`;
    }
    baseUrl += `&language=${apiLanguage}&units=${apiUnits}&format=json&apiKey=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`;
    const conds = await fetch(baseUrl)
        .then(async (res: Response) => {
            return res.json().then(data => {
                return data;
            });
        });

    const result: CurrentConds = {};
    
    for (let i = 0; i < conds.length; i++) {
        const cond = conds[i];
        const dataLoc = cond["v3-wx-observations-current"];

        const current = Object.assign({}, currentDefaults);
        current.temp = dataLoc.temperature;
        current.icon = dataLoc.iconCode;
        current.wind = `${(dataLoc.windDirectionCardinal === "CALM" || dataLoc.windSpeed === 0 ? "Calm" : dataLoc.windDirectionCardinal)} ${dataLoc.windSpeed === 0 ? "" : dataLoc.windSpeed}`;
        current.windSpeed = dataLoc.windSpeed;
        current.visib = dataLoc.visibility;
        current.uvIndex = dataLoc.uvDescription;
        current.phrase = dataLoc.wxPhraseLong.toLowerCase();
        current.humidity = dataLoc.relativeHumidity;
        current.dewpt = dataLoc.temperatureDewPoint;
        current.pres = dataLoc.pressureAltimeter.toFixed(2);
        current.chill = dataLoc.temperatureWindChill;

        result[cond.id] = current;
    }

    return result;
};

enum MessageType {
    New = 1,
    Update,
    Cancel
}

enum AreaType {
    County = "C",
    Zone = "Z",
    CanadaLocation = "CLC"
}

enum Certainty {
    Observed = 1,
    Likely,
    Possible,
    Unlikely,
    Unknown
}

enum Severity {
    Extreme = 1,
    Severe,
    Moderate,
    Minor,
    Unknown
}

enum Urgency {
    Immediate = 1,
    Expected,
    Future,
    Past,
    Unknown
}

// Category object
enum CategoryCode {
    Geo = 1,
    Met,
    Safety,
    Security,
    Rescue,
    Fire,
    Health,
    Env,
    Transport,
    Infra,
    CBRNE,
    Other
}

interface Category {
    category: string
    categoryCode: CategoryCode
}

// Flood object
interface Flood {
    floodCrestTimeLocal: string
    floodCrestTimeLocalTimeZone: string
    floodEndTimeLocal: string
    floodEndTimeLocalTimeZone: string
    floodImmediateCause: string
    floodImmediateCauseCode: string
    floodLocationId: string
    floodLocationName: string
    floodRecordStatus: string
    floodRecordStatusCode: string
    floodSeverity: string
    floodSeverityCode: string
    floodStartTimeLocal: string
    floodStartTimeLocalTimeZone: string
}

// Response type object
enum ResponseTypeCode {
    Shelter = 1,
    Evacuate,
    Prepare,
    Execute,
    Avoid,
    Monitor,
    Assess,
    AllClear,
    None
}

/** @internal */
interface ResponseType {
    responseType: string
    responseTypeCode: ResponseTypeCode
}

/** @internal */
interface Text {
    languageCode: string
    description: string
    instruction: string
    overview: string
}

export interface Alert {
    adminDistrict: string
    adminDistrictCode: string
    areaId: string
    areaName: string
    areaTypeCode: AreaType
    certainty: string
    certaintyCode: Certainty
    countryCode: string
    countryName: string
    detailKey: string
    disclaimer: string
    effectiveTimeLocal: string
    effectiveTimeLocalTimeZone: string
    eventDescription: string
    eventTrackingNumber: string
    expireTimeLocal: string
    expireTimeLocalTimeZone: string
    expireTimeUTC: number
    headlineText: string
    ianaTimeZone: string
    identifier: string
    issueTimeLocal: string
    issueTimeLocalTimeZone: string
    latitude: number
    longitude: number
    messageType: string
    messageTypeCode: MessageType
    officeAdminDistrict: string
    officeAdminDistrictCode: string
    officeCode: string
    officeCountryCode: string
    officeName: string
    onsetTimeLocal: string
    onsetTimeLocalTimeZone: string
    phenomena: string
    processTimeUTC: number
    productIdentifier: string
    severity: string
    severityCode: Severity
    significance: string
    source: string
    urgency: string
    urgencyCode: Urgency
    endTimeLocal: string
    endTimeLocalTimeZone: string
    endTimeUTC: number
    categories: Category[]
    flood: Flood
    responseTypes: ResponseType[]
    texts: Text[]
}

/** @internal */
interface AlertsMetadata {
    next: any
}

/** @internal */
interface AlertsResponse {
    metadata?: AlertsMetadata
    alerts: Alert[]
}

/** @internal */
const alertsFallback: AlertsResponse = Object.freeze({
    metadata: {
        next: null
    },
    alerts: []
});

/**
 * Gets the alerts for a specified latitude and longitude.
 * @param lat The latitude of the location.
 * @param lon The longitude of the location.
 * @param options The options for this request.
 * @returns A promise returning an {@link Alert} array for the specified latitude and longitude.
 */
export const getAlerts = async (lat: number, lon: number, options?: APIOptions) => {
    const apiLanguage = options.language || "en-US";
    return fetch(`https://api.weather.com/v3/alerts/headlines?geocode=${lat},${lon}&language=${apiLanguage}&format=json&apiKey=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`)
        .then(async (res: Response) => {
            return res.json().then((data: AlertsResponse) => {
                return data.alerts;
            }).catch(() => {
                return alertsFallback.alerts;
            });
        }).catch(err => {
            throw new Error(err);
        });
};

/** @internal */
interface AlertDetailResponse {
    alertDetail: Alert
}

/**
 * Gets the alert text for a specified alert ID. This should be ran after getAlerts.
 * @param alertId The alert ID to fetch the text for.
 * @param options The options for this request.
 * @returns A promise returning a {@link Text} array for the specified alert ID.
 */

export const getAlertText = async (alertId: string, options?: APIOptions) : Promise<Text[]> => {
    const apiLanguage = options.language || "en-US";
    return fetch(`https://api.weather.com/v3/alerts/detail?alertId=${alertId}&language=${apiLanguage}&format=json&apiKey=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`)
        .then(async (res: Response) => {
            return res.json().then((data: AlertDetailResponse) => {
                return data.alertDetail.texts;
            }).catch(() => {
                return null;
            });
        }).catch(err => {
            throw new Error(err);
        })
};

interface AlertSectionColor {
    primary: string
    secondary: string
}

interface AlertColor {
    header: AlertSectionColor
    body: AlertSectionColor
}

/**
 * Gets the alert color for a specified alert. This should be ran after getAlerts.
 * @param alert The alert to fetch the color for.
 * @returns The color that the alert should show.
 */

export const getAlertColor = (alert: Alert) : AlertColor => {
    // Header
    let headerPrimary = "#510d08";
    let headerSecondary = "#b41a08";

    // Body
    let bodyPrimary = "#d51e08";
    let bodySecondary = "#b41a08";

    switch (alert.significance) {
        case "Y":
        case "S":
            headerPrimary = "#874901";
            headerSecondary = "#bb631a";
            bodyPrimary = "#f2992e";
            bodySecondary = "#bb631a";
        case "A":
            headerPrimary = "#846811";
            headerSecondary = "#9b7d0e";
            bodyPrimary = "#e5dd20";
            bodySecondary = "#9b7d0e";
    }

    const color: AlertColor = {
        header: {
            primary: headerPrimary,
            secondary: headerSecondary
        },
        body: {
            primary: bodyPrimary,
            secondary: bodySecondary
        }
    };

    return color;
};

export interface MarqueeLocation extends Location {
    observations?: Partial<CurrentCond>
}

// Cities that the marquee should cycle through
export const MarqueeCities: MarqueeLocation[] = [
    {
        city: "Chicago",
        state: "Illinois",
        country: "United States",
        countryCode: "US",
        latitude: 41.882,
        longitude: -87.629,
        timezone: "America/Chicago"
    },
    {
        city: "Minneapolis",
        state: "Minnesota",
        country: "United States",
        countryCode: "US",
        latitude: 44.988,
        longitude: -93.26,
        timezone: "America/Chicago"
    }
];