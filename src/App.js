import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./theme.js";
import { CssBaseline, Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import "moment/locale/ar";
import WeatherCard from "./components/CurrentWeatherCard/WeatherCard.jsx";
import LoadingCard from "./components/CurrentWeatherCard/LoadingCard.jsx";
import Navbar from "./components/Navbar.jsx";
import { useTranslation } from "react-i18next";
import { useLang } from "./contexts/LangContext.js";
import { useWeather } from "./contexts/WeatherContext.js";

function App() {
    const { setWeather } = useWeather();
    const { lang } = useLang();
    const { i18n } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [darkMode, setDarkMode] = useState(() => {
        const storedTheme = localStorage.getItem("theme");
        return storedTheme === "dark";
    });

    useEffect(() => {
        const html = document.documentElement;
        const theme = darkMode ? "dark" : "light";
        html.setAttribute("data-theme", theme);
        localStorage.setItem("theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    useEffect(() => {
        i18n.changeLanguage(lang).then(() => {
            document.title = i18n.t("title");
        });
        moment.locale(lang);
        localStorage.setItem("lang", lang);
        document.documentElement.lang = lang;
    }, [lang, i18n]);

    useEffect(() => {
        const controller = new AbortController();
        axios
            .get("https://ipwho.is/")
            .then((ipResult) => {
                const { latitude, longitude, city, country_code } =
                    ipResult.data;

                return axios
                    .get("https://api.openweathermap.org/data/2.5/weather", {
                        params: {
                            lat: latitude,
                            lon: longitude,
                            appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
                            units: "metric",
                        },
                        signal: controller.signal,
                    })
                    .then((weatherResult) => {
                        const data = weatherResult.data;

                        setWeather({
                            city: city || data.name,
                            country: country_code || data.sys.country,
                            dateRaw: moment.unix(data.dt),
                            temp: Math.round(data.main.temp),
                            feels_like: Math.round(data.main.feels_like),
                            humidity: data.main.humidity,
                            wind: Math.round(data.wind.speed * 3.6),
                            description: data.weather[0].description,
                            icon: data.weather[0].icon,
                            sunriseRaw: data.sys.sunrise,
                            sunsetRaw: data.sys.sunset,
                        });
                        setLoading(false);
                    });
            })
            .catch((err) => {
                console.error("Error getting location or weather data:", err);
            });

        return () => {
            controller.abort();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <Box
                className="App"
                sx={{
                    height: "100vh",
                    background: (theme) => theme.palette.background.default,
                }}
            >
                <Container maxWidth="md" dir={lang === "en" ? "ltr" : "rtl"}>
                    <Navbar
                        setThemeMode={(isDark) => {
                            setDarkMode(isDark);
                        }}
                    />
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Box
                            sx={{
                                height: "calc(100vh - 84px)",
                                width: "100%",
                                maxWidth: "600px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignContent: "center",
                            }}
                        >
                            {loading ? <LoadingCard /> : <WeatherCard />}
                        </Box>
                    </div>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default App;
