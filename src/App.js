import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./theme.js";
import { CssBaseline, Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import "moment/locale/ar";
import CurrentWeatherCard from "./components/CurrentWeatherCard/CurrentWeatherCard.jsx";
import CurrentLoadingCard from "./components/CurrentWeatherCard/CurrentLoadingCard.jsx";
import Navbar from "./components/Navbar.jsx";
import { useTranslation } from "react-i18next";
import { useLang } from "./contexts/LangContext.js";
import { useCurrentWeather } from "./contexts/CurrentWeatherContext.js";
import HourlyTimelineWeatherCard from "./components/HourlyTimeline/HourlyTimelineWeatherCard.jsx";
import { useNext5DaysWeather } from "./contexts/Next5DaysWeatherContext.js";
import HourlyTimelineLoadingCard from "./components/HourlyTimeline/HourlyTimelineLoadingCard.jsx";
import Next5DaysWeatherCard from "./components/Next5DaysCard/Next5DaysWeatherCard.jsx";
import Next5DaysLoadingCard from "./components/Next5DaysCard/Next5DaysLoadingCard.jsx";

function App() {
    const { setCurrentWeather } = useCurrentWeather();
    const { setNext5DaysWeather } = useNext5DaysWeather();

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

                /* return axios
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
                            wind: Math.round(data.wind.speed),
                            description: data.weather[0].description,
                            icon: data.weather[0].icon,
                            sunriseRaw: data.sys.sunrise,
                            sunsetRaw: data.sys.sunset,
                        });
                        setLoading(false);
                    }); */

                const currentWeather = axios.get(
                    "https://api.openweathermap.org/data/2.5/weather",
                    {
                        params: {
                            lat: latitude,
                            lon: longitude,
                            appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
                            units: "metric",
                        },
                        signal: controller.signal,
                    }
                );

                const next5Days = axios.get(
                    "https://api.openweathermap.org/data/2.5/forecast",
                    {
                        params: {
                            lat: latitude,
                            lon: longitude,
                            appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
                            units: "metric",
                        },
                        signal: controller.signal,
                    }
                );

                // Wait for both responses
                return Promise.all([currentWeather, next5Days]).then(
                    ([currentWeatherResult, next5DaysResult]) => {
                        const weatherData = currentWeatherResult.data;
                        const forecastData = next5DaysResult.data;

                        setCurrentWeather({
                            city: city || weatherData.name,
                            country: country_code || weatherData.sys.country,
                            dateRaw: moment.unix(weatherData.dt),
                            temp: Math.round(weatherData.main.temp),
                            feels_like: Math.round(weatherData.main.feels_like),
                            humidity: weatherData.main.humidity,
                            wind: Math.round(weatherData.wind.speed),
                            description: weatherData.weather[0].description,
                            icon: weatherData.weather[0].icon,
                            sunriseRaw: weatherData.sys.sunrise,
                            sunsetRaw: weatherData.sys.sunset,
                        });
                        setNext5DaysWeather(
                            forecastData.list.map((item) => ({
                                id: item.dt,
                                dateRaw: item.dt,
                                temp: Math.round(item.main.temp),
                                feels_like: item.main.feels_like,
                                humidity: item.main.humidity,
                                wind: Math.round(item.wind.speed),
                                description: item.weather[0].description,
                                icon: item.weather[0].icon,
                            }))
                        );

                        setLoading(false);
                    }
                );
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
                    minHeight: "100vh",
                    background: (theme) => theme.palette.background.default,
                }}
            >
                <Container
                    maxWidth="md"
                    dir={lang === "en" ? "ltr" : "rtl"}
                    sx={{
                        minHeight: "100vh",
                    }}
                >
                    <Navbar
                        setThemeMode={(isDark) => {
                            setDarkMode(isDark);
                        }}
                    />
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            marginTop: "30px",
                            gap: 3,
                        }}
                    >
                        {loading ? (
                            <CurrentLoadingCard />
                        ) : (
                            <CurrentWeatherCard />
                        )}
                        {loading ? (
                            <HourlyTimelineLoadingCard />
                        ) : (
                            <HourlyTimelineWeatherCard />
                        )}
                        {loading ? (
                            <Next5DaysLoadingCard />
                        ) : (
                            <Next5DaysWeatherCard />
                        )}
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default App;
