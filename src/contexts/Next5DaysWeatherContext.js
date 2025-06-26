import { createContext, useContext, useState } from "react";

const next5DaysWeatherContext = createContext({});

export const Next5DaysWeatherProvider = ({ children }) => {
    const [next5DaysWeather, setNext5DaysWeather] = useState([
        {
            id: "",
            dateRaw: "",
            temp: null,
            feels_like: null,
            humidity: null,
            wind: null,
            description: "",
            icon: "",
        },
    ]);

    return (
        <next5DaysWeatherContext.Provider
            value={{
                next5DaysWeather: next5DaysWeather,
                setNext5DaysWeather: setNext5DaysWeather,
            }}
        >
            {children}
        </next5DaysWeatherContext.Provider>
    );
};

export const useNext5DaysWeather = () => {
    return useContext(next5DaysWeatherContext);
};
