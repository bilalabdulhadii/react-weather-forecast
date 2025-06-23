import { createContext, useContext, useState } from "react";
export const WeatherContext = createContext({});

export const WeatherProvider = ({ children }) => {
    const [weatherRaw, setWeatherRow] = useState({
        city: "",
        country: "",
        dateRaw: null,
        date: "",
        temp: null,
        feels_like: null,
        humidity: null,
        wind: null,
        description: "",
        icon: "",
        sunriseRaw: null,
        sunrise: "",
        sunsetRaw: null,
        sunset: "",
    });

    return (
        <WeatherContext.Provider
            value={{ weather: weatherRaw, setWeather: setWeatherRow }}
        >
            {children}
        </WeatherContext.Provider>
    );
};

export const useWeather = () => {
    return useContext(WeatherContext);
};
