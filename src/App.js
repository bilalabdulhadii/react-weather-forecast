import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./theme.js";
import { CssBaseline, Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import "moment/locale/ar";
import { useTranslation } from "react-i18next";
import { useLang } from "./contexts/LangContext.js";
import { useCurrentWeather } from "./contexts/CurrentWeatherContext.js";
import { useNext5DaysWeather } from "./contexts/Next5DaysWeatherContext.js";
import { useCityComparisonWeather } from "./contexts/CityComparisonWeatherContext.jsx";
import Navbar from "./components/Navbar.jsx";
import MainContent from "./components/MainContent.jsx";

function App() {
    const { setCurrentWeather } = useCurrentWeather();
    const { setNext5DaysWeather } = useNext5DaysWeather();
    const { setCityComparisonWeather } = useCityComparisonWeather();

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

                const cityNames = ["Damascus", "Istanbul", "Berlin", "Tokyo"];
                const cityComparisonRequests = cityNames.map((name) =>
                    axios.get(
                        "https://api.openweathermap.org/data/2.5/weather",
                        {
                            params: {
                                q: name,
                                appid: process.env
                                    .REACT_APP_OPEN_WEATHER_API_KEY,
                                units: "metric",
                            },
                            signal: controller.signal,
                        }
                    )
                );

                // Wait for all responses
                return Promise.all([
                    currentWeather,
                    next5Days,
                    ...cityComparisonRequests,
                ]).then(
                    ([
                        currentWeatherResult,
                        next5DaysResult,
                        ...cityComparisonWeatherResults
                    ]) => {
                        const currentWeatherData = currentWeatherResult.data;
                        const next5DaysData = next5DaysResult.data;

                        setCurrentWeather({
                            city: city || currentWeatherData.name,
                            country:
                                country_code || currentWeatherData.sys.country,
                            dateRaw: moment.unix(currentWeatherData.dt),
                            temp: Math.round(currentWeatherData.main.temp),
                            feels_like: Math.round(
                                currentWeatherData.main.feels_like
                            ),
                            humidity: currentWeatherData.main.humidity,
                            wind: Math.round(currentWeatherData.wind.speed),
                            description:
                                currentWeatherData.weather[0].description,
                            icon: currentWeatherData.weather[0].icon,
                            sunriseRaw: currentWeatherData.sys.sunrise,
                            sunsetRaw: currentWeatherData.sys.sunset,
                        });

                        setNext5DaysWeather(
                            next5DaysData.list.map((item) => ({
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

                        setCityComparisonWeather(
                            cityComparisonWeatherResults.map((res) => {
                                const data = res.data;
                                return {
                                    id: data.dt,
                                    city: data.name,
                                    temp: Math.round(data.main.temp),
                                    humidity: data.main.humidity,
                                    wind: Math.round(data.wind.speed),
                                    description: data.weather[0].description,
                                    icon: data.weather[0].icon,
                                };
                            })
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
                    <MainContent loading={loading} />
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default App;
