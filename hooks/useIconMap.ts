export enum Icons2010 {
    UNUSED,
    THUNDER,
    MIXED_RAIN_SNOW,
    MIXED_FREEZE_RAIN_SNOW,
    FREEZING_DRIZZLE,
    DRIZZLE,
    FREEZING_RAIN,
    LIGHT_RAIN_ALT,
    RAIN,
    SNOW,
    SNOW_ALT,
    BLOWING_SNOW,
    HEAVY_SNOW,
    HAIL,
    SMOKE,
    FOG,
    SMOKE_ALT,
    WIND,
    HEAVY_WIND,
    UNK,
    CLOUDS,
    MOSTLY_CLOUDS_NIGHT,
    MOSTLY_CLOUDS,
    PARTLY_CLOUDS_NIGHT,
    PARTLY_CLOUDS,
    CLEAR_NIGHT,
    CLEAR,
    LIGHT_CLOUDS_NIGHT,
    LIGHT_CLOUDS,
    THUNDER_SUN,
    RAIN_SUN,
    HEAVY_RAIN,
    HEAVY_SNOW_SUN,
    HEAVY_SNOW_ALT,
    HEAVY_SNOW_ALT2,
    RAIN_NIGHT,
    SNOW_NIGHT,
    THUNDER_NIGHT,
    MIXED_SNOW_SLEET,
    SNOW_WIND,
    SNOW_STORM,
    HOT,
    COLD,
    HEAVY_RAIN_SNOW_ICY,
    HEAVY_RAIN_ALT,
    LIGHT_THUNDER,
    STRONG_STORMS,
    HAIL_ALT,
    FOG_ALT,
    HEAVY_WIND_ALT
};

/** @internal */
const Icons2010CodeMap = Object.freeze([
    Icons2010.UNUSED, // 0
    Icons2010.UNUSED, // 1
    Icons2010.UNUSED, // 2
    Icons2010.STRONG_STORMS, // 3
    Icons2010.THUNDER, // 4
    Icons2010.MIXED_RAIN_SNOW, // 5
    Icons2010.MIXED_SNOW_SLEET, // 6
    Icons2010.MIXED_FREEZE_RAIN_SNOW, // 7
    Icons2010.FREEZING_DRIZZLE, // 8
    Icons2010.DRIZZLE, // 9
    Icons2010.FREEZING_RAIN, // 10
    Icons2010.RAIN, // 11
    Icons2010.RAIN, // 12
    Icons2010.SNOW, // 13
    Icons2010.HEAVY_SNOW, // 14
    Icons2010.BLOWING_SNOW, // 15
    Icons2010.HEAVY_SNOW, // 16
    Icons2010.HAIL_ALT, // 17
    Icons2010.HAIL_ALT, // 18
    Icons2010.SMOKE_ALT, // 19
    Icons2010.FOG_ALT, // 20
    Icons2010.SMOKE_ALT, // 21
    Icons2010.SMOKE, // 22
    Icons2010.UNUSED, // 23
    Icons2010.HEAVY_WIND_ALT, // 24
    Icons2010.HEAVY_SNOW_ALT2, // 25
    Icons2010.CLOUDS, // 26
    Icons2010.MOSTLY_CLOUDS_NIGHT, // 27
    Icons2010.MOSTLY_CLOUDS, // 28
    Icons2010.PARTLY_CLOUDS_NIGHT, // 29
    Icons2010.PARTLY_CLOUDS, // 30
    Icons2010.CLEAR_NIGHT, // 31
    Icons2010.CLEAR, // 32
    Icons2010.LIGHT_CLOUDS_NIGHT, // 33
    Icons2010.LIGHT_CLOUDS, // 34
    Icons2010.HAIL, // 35
    Icons2010.HOT, // 36
    Icons2010.THUNDER_SUN, // 37
    Icons2010.THUNDER_SUN, // 38
    Icons2010.RAIN_SUN, // 39
    Icons2010.HEAVY_RAIN, // 40
    Icons2010.HEAVY_SNOW_SUN, // 41
    Icons2010.HEAVY_SNOW_ALT, // 42
    Icons2010.HEAVY_SNOW_ALT2, // 43
    Icons2010.UNK, // 44
    Icons2010.RAIN_NIGHT, // 45
    Icons2010.SNOW_NIGHT, // 46
    Icons2010.THUNDER_NIGHT // 47
]);

/**
 * Gets the mapped icon for the specified code and wind data.
 * @param iconCode The icon code to map.
 * @param windData The wind data to map.
 * @returns An {@link Icons2010} member for the specified code and wind data.
 */
export const getIcon = (iconCode: number, windData: number) : Icons2010 => {
    let icon = Icons2010CodeMap[iconCode];
    if (windData >= 20) {
        if (icon === Icons2010.HEAVY_SNOW || icon === Icons2010.SNOW || icon === Icons2010.SNOW_ALT) {
            icon = Icons2010.HEAVY_SNOW_ALT2;
        } else if (icon === Icons2010.HEAVY_RAIN || icon === Icons2010.LIGHT_RAIN_ALT || icon === Icons2010.RAIN) {
            icon = Icons2010.HEAVY_RAIN_ALT;
        }
    }
    return icon;
};