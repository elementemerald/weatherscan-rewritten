/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    fontFamily: {
      "frutiger": ["Frutiger", "'Zemestro Std'", "sans-serif"],
      "interstate": ["Interstate", "'Zemestro Std'", "sans-serif"],
      "interstate-bold": ["'Interstate Bold'", "'Zemestro Std'", "sans-serif"],
      "interstate-cn": ["'Interstate Cn'", "'Zemestro Std'", "sans-serif"],
      "interstate-mono": ["'Interstate Mono'", "'Zemestro Std'", "sans-serif"],
      "parrow": ["PressureArrow", "Interstate", "'Zemestro Std'", "sans-serif"],
      "interstate2": ["Interstate2", "'Zemestro Std'", "sans-serif"],
      "frutiger57-cond": ["'Frutiger 57 Condensed'", "'Zemestro Std'", "sans-serif"],
      "frutigerbold-cn": ["'Frutiger Bold Cn'", "'Zemestro Std'", "sans-serif"],
      "zemestro-std": ["'Zemestro Std'", "sans-serif"]
    },
    extend: {
      colors: {
        "dark": "#171717",
        "subhead-noaa": "#f6a67a",
        "bulletin-cityname": "#d8c422",
        "frost-pane-title": "#d8c422",
        "marquee-top": "#DDDDDD",
        "marquee-severe-text": "#DDDDDD"
      },
      backgroundImage: {
        "marquee-severe-header": "linear-gradient(to right, rgb(242, 153, 46) 0px, rgb(187, 99, 26) 100%)",
        "marquee-severe": "linear-gradient(to right, rgb(135, 73, 1) 0px, rgb(187, 99, 26) 100%)",
        "slideouter": "radial-gradient(farthest-corner at 963px 569px, #000d28, #001668)",
        "slideheadgrad": "linear-gradient(to right, rgba(147, 156, 171, 0), rgba(147, 156, 171, .97))",
        "city-intro-slide": "url(/images/newbg/city_bg.png)",
        "copyright": "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
        "bulletin-image": "url(/images/newbg/weather_bulletin_bg.png)",
        "bulletin-frost-pane": "url(/images/newbg/bulletinfrostpane.svg)",
        "severe-city-info-image": "url(/images/newbg/severe_core_bg.png)",
        "frost-pane": "url(/images/newbg/frostpane.svg)",
        "severe-frost-pane": "url(/images/newbg/severefrostpane.svg)",
        "city-info-slide": "url(/images/newbg/core_mountain_bg.png)"
      },
      backgroundColor: {
        "cityaccent-yellow": "#e5be45",
        "cityaccent-blue": "#001782",
        "slidehead": "#2267b7",
        "infoslide-color": "transparent",
        "city-info-slide": "transparent"
      },
      backgroundPosition: {
        "infoslide-pos": "69% 41.5%",
        "city-intro-slide": "-127px -112px",
        "curve": "0 0",
        "bulletin-frost-pane": "-72px -329px",
        "severe-city-info-pos": "69% 41.5%",
        "frost-pane": "-72px -329px",
        "frost-pane-detailed-right": "-570px -329px",
        "city-info-slide": "69% 41.5%",
        "city-info-extended": "-72px -364px"
      },
      backgroundSize: {
        "conditions-icon": "100% 100%",
        "infoslide-size": "120.3% 150.9%",
        "city-intro-slide": "1068px 788px",
        "curve": "200% 200%",
        "bulletin-frost-pane": "1065px 1164px",
        "severe-city-info-size": "120.3% 150.9%",
        "frost-pane": "1065px 1164px",
        "city-info-slide": "120.3% 150.9%"
      },
      padding: {
        "city-t": "10px",
        "slides": "2.5px 0 2.5px 2.5px",
        "slidehead": "0 7.5px",
        "slidehead-severe-city-info-r": "10%",
        "copyright-l": "11px",
        "copyright-r": "10px",
        "copyright-t": "10px",
        "subhead-city-info-r": "10%",
        "noreport-t": "23.5%",
        "noreport-l": "29.65%",
        "tempunavailable-l": "15%",
        "bulletin-warnings": "10px",
        "info-frost-pane": "1% 18% 1% 7%"
      },
      boxShadow: {
        "slideouter": "0 3px 10px 0 rgba(0, 0, 0, .35)"
      },
      inset: {
        "date-time-t": "101px",
        "current-t": "376px",
        "now-t": "12.5px",
        "now-l": "145px",
        "nowwide-l": "146px",
        "temp-t": "88px",
        "temp-l": "12.5px",
        "info-l": "145px",
        "info-t": "177px",
        "conditions-icon-l": "294px",
        "conditions-icon-t": "390px",
        "current-noreport-t": "45%",
        "current-noreport-l": "32.4%",
        "city-t": "284px",
        "infoslides-container-r": "75px",
        "infoslides-container-t": "92px",
        "infoslide-container-t": "45px",
        "slidehead": "2.5px",
        "gradient-r": "125px",
        "subhead-noaa-r": "105px",
        "bulletin-cityname-l": "50px",
        "bulletin-cityname-t": "16px",
        "bulletin-warnings-l": "50px",
        "bulletin-warnings-t": "62.5px",
        "subhead-city-r": "90px",
        "subhead-shadow-t": "50.8%",
        "subhead-shadow-l": "7px",
        "subhead-title-t": "50.8%",
        "subhead-title-l": "7px",
        "forecast": "10%",
        "logo-area-t": "83.4%",
        "logo-area-img-t": "19%",
        "logo-area-img-r": "5%"
      },
      fontSize: {
        "date": "28px",
        "now": "46px",
        "temp": "69px",
        "info": "31px",
        "current-noreport": "44px",
        "city": "36.5px",
        "slidehead": "31px",
        "hscroller": "30px",
        "divider-arrow": "26px",
        "copyright": "28px",
        "subhead": "39px",
        "subhead-bulletin": "40.5px",
        "subhead-noaa": "22.5px",
        "bulletin-frost-pane": "36px",
        "bulletin-cityname": "36px",
        "bulletin-warnings": "40px",
        "subhead-city": "31px",
        "noreport": "48px",
        "tempunavailable": "49px",
        "forecast": "110%",
        "frost-pane": "36px",
        "frost-pane-content": "50px",
        "severe-frost-pane-title": "41.5px",
        "marquee-top": "33px",
        "marquee-bottom": "41.5px",
        "marquee-severe-text": "50px"
      },
      minWidth: {
        "slidehead": "125%",
        "subhead-shadow": "20%",
        "infoslide": "885px"
      },
      maxWidth: {
        "infoslide": "885px"
      },
      minHeight: {
        "slidehead": "42.5px",
        "infoslide": "99.87%",
        "infoslide-px": "521px"
      },
      maxHeight: {
        "infoslides-container": "569px",
        "slidehead": "42.5px",
        "infoslide": "99.87%",
        "infoslide-px": "521px",
        "bulletin-frost-pane": "446.25px",
        "frost-pane": "446.25px",
        "frost-pane-content": "400px",
        "severe-frost-pane-content": "400px"
      },
      transformOrigin: {
        "left-center": "left center"
      },
      lineHeight: {
        "info": "117.5%",
        "city": "110%",
        "date": "40px",
        "hscroller": "23.5px",
        "copyright": "110%",
        "subheader": "24.5px",
        "subhead-noaa": "35px",
        "bulletin-warnings": "125%",
        "frost-pane-content": "125%"
      },
      width: {
        "main": "1440px",
        "conditions-icon": "155px",
        "current": "452px",
        "info": "62.5%",
        "current-noreport": "66%",
        "city": "311px",
        "date-time": "458px",
        "infoslides-container": "887px",
        "infoslide-container": "884.5px",
        "gradient": "125px",
        "subhead-shadow": "250%",
        "subhead-title": "250%",
        "logo-area": "31.528%",
        "logo-area-img": "65%"
      },
      height: {
        "main": "1080px",
        "conditions-icon": "155px",
        "current": "221px",
        "city": "92px",
        "infoslides-container": "569px",
        "infoslide-container": "520.82px",
        "slidehead": "42.5px",
        "copyright": "105px",
        "subhead": "60px",
        "info-frost-pane": "446.25px",
        "frost-pane-content": "400px",
        "severe-frost-pane-content": "400px",
        "logo-area": "9.398%"
      },
      zIndex: {
        "default": "1",
        "current": "4",
        "now": "5",
        "infoslide": "5",
        "subheader": "4",
        "subheader-shadow": "6",
        "copyright": "101",
        "noreport": "2000",
        "frost-pane": "388686",
        "audio": "999999"
      },
      dropShadow: {
        "none": "0px 0px 0px #000",
        "default": "#000 2px 2px 4px",
        "subhead": "2px 2px 3px #000",
        "subhead-bulletin": "2px 2px 5px #000",
        "bulletin-frost-pane": "#000 2px 2px 4px"
      },
      margin: {
        "city-l": "142px",
        "bulletin-frost-pane": "60px"
      },
      letterSpacing: {
        "now": "2px",
        "current-noreport": "1.4px",
        "severe-frost-pane-title": ".5px",
        "frost-pane-content": "1.5px",
        "severe-frost-pane-content": "1.5px"
      },
      translate: {
        "2.5": "2.5px",
        "6px": "6px",
        "10px": "10px",
        "45px": "45px",
        "60px": "60px",
        "42-5": "42.5%",
        "43-5": "43.5%",
        "47-5": "47.5%"
      },
      scale: {
        "1": "1",
        "101": "1.01",
        "102-5": "1.025",
        "103": "1.03",
        "105": "1.05",
        "105-9": "1.059",
        "106": "1.06",
        "107": "1.07",
        "110": "1.10",
        "112": "1.12",
        "112-5": "1.125",
        "113-5": "1.135",
        "114-5": "1.145",
        "115": "1.15",
        "115-5": "1.155",
        "117": "1.17",
        "118": "1.18"
      },
      opacity: {
        "half": ".5"
      }
    },
    keyframes: {
      cityaccentmovei: {
        "35%": { transform: "translate(-.75%, -4.5%) scaleY(1.03)" },
        "100%": { transform: "translate(-8.75%, -12%) scale(1.15, 1.2)" }
      },
      cityaccentmoveii: {
        "35%": { transform: "translate(-.75%, -4.5%) scaleY(1.03)" },
        "100%": { transform: "translate(-8.15%, -10.15%) scale(1.15, 1.2)" }
      },
      cityaccentmoveiii: {
        "100%": { transform: "translate(1%, -4.5%)" }
      },
      cityaccentmoveiv: {
        "0%": { transform: "translate(0, 0)" },
        "100%": { transform: "translate(4.5%, 8%)" }
      }
    },
    animation: {
      opacity: "opacity 1s ease-in-out",
      cityaccentmovei: "cityaccentmovei 10s linear normal forwards",
      cityaccentmoveii: "cityaccentmoveii 10s linear normal forwards",
      cityaccentmoveiii: "cityaccentmoveiii 5s linear normal forwards"
    }
  },
  plugins: [],
}
