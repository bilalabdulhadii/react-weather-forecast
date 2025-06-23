import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./i18n";
import { LangProvider } from "./contexts/LangContext";
import { WeatherProvider } from "./contexts/WeatherContext";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <WeatherProvider>
            <LangProvider>
                <App />
            </LangProvider>
        </WeatherProvider>
    </React.StrictMode>
);
reportWebVitals();
