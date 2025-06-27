import { createContext, useContext, useState } from "react";

const CurrentWeatherContext = createContext({});
export const CurrentWeatherProvider = ({ children }) => {
    const [currentWeather, setCurrentWeather] = useState({
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
        <CurrentWeatherContext.Provider
            value={{
                currentWeather: currentWeather,
                setCurrentWeather: setCurrentWeather,
            }}
        >
            {children}
        </CurrentWeatherContext.Provider>
    );
};

export const useCurrentWeather = () => {
    return useContext(CurrentWeatherContext);
};
