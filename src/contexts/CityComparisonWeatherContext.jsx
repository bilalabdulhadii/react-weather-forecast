import { createContext, useContext, useState } from "react";

const CityComparisonWeatherContext = createContext({});

export const CityComparisonWeatherProvider = ({ children }) => {
    const [cityComparisonWeather, setCityComparisonWeather] = useState([
        {
            id: "",
            city: "",
            temp: null,
            humidity: null,
            wind: null,
            description: "",
            icon: "",
        },
    ]);

    return (
        <CityComparisonWeatherContext.Provider
            value={{
                CityComparisonWeather: cityComparisonWeather,
                setCityComparisonWeather: setCityComparisonWeather,
            }}
        >
            {children}
        </CityComparisonWeatherContext.Provider>
    );
};

export const useCityComparisonWeather = () => {
    return useContext(CityComparisonWeatherContext);
};
