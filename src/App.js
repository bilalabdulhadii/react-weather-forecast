import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./theme.js";
import { CssBaseline, Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/ar";
import { useTranslation } from "react-i18next";
import { useLang } from "./contexts/LangContext";
import useWeatherData from "./hooks/useWeatherData.js";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import MainContent from "./components/MainContent.jsx";

function App() {
    const { lang } = useLang();
    const { i18n } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [darkMode, setDarkMode] = useState(() => {
        const storedTheme = localStorage.getItem("theme");
        return storedTheme === "dark";
    });

    useWeatherData(setLoading);

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
                <Footer />
            </Box>
        </ThemeProvider>
    );
}

export default App;
