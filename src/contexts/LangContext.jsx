import { createContext, useContext, useState } from "react";

const LangContext = createContext({});

export const LangProvider = ({ children }) => {
    const [lang, setLang] = useState(() => {
        return localStorage.getItem("lang") || "en";
    });

    const setNewLang = () => {
        setLang((prevLang) => (prevLang === "en" ? "ar" : "en"));
    };

    return (
        <LangContext.Provider value={{ lang: lang, setLang: setNewLang }}>
            {children}
        </LangContext.Provider>
    );
};

export const useLang = () => {
    return useContext(LangContext);
};
