import { useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useCurrentWeather } from "../contexts/CurrentWeatherContext";
import { useNext5DaysWeather } from "../contexts/Next5DaysWeatherContext";
import { useCityComparisonWeather } from "../contexts/CityComparisonWeatherContext";

export default function useWeatherData(setLoading) {
    const { setCurrentWeather } = useCurrentWeather();
    const { setNext5DaysWeather } = useNext5DaysWeather();
    const { setCityComparisonWeather } = useCityComparisonWeather();

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
}
