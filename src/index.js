import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./i18n";
import { LangProvider } from "./contexts/LangContext";
import { CurrentWeatherProvider } from "./contexts/CurrentWeatherContext";
import { Next5DaysWeatherProvider } from "./contexts/Next5DaysWeatherContext";
import { CityComparisonWeatherProvider } from "./contexts/CityComparisonWeatherContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <CurrentWeatherProvider>
            <Next5DaysWeatherProvider>
                <CityComparisonWeatherProvider>
                    <LangProvider>
                        <App />
                    </LangProvider>
                </CityComparisonWeatherProvider>
            </Next5DaysWeatherProvider>
        </CurrentWeatherProvider>
    </React.StrictMode>
);
reportWebVitals();
