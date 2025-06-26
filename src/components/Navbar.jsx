import { useTheme } from "@emotion/react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LogoBlue from "../assets/logo_blue.png";
import LogoWhite from "../assets/logo_white.png";
import { useEffect, useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Button,
    IconButton,
    Avatar,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLang } from "../contexts/LangContext";

export default function Navbar({ setThemeMode }) {
    const theme = useTheme();
    const { lang, setLang } = useLang();
    const { t } = useTranslation();

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <Box
            sx={{
                flexGrow: 1,
                position: "sticky",
                top: "0",
                zIndex: "1000",
                paddingTop: "20px",
            }}
        >
            <AppBar
                position="static"
                elevation={scrolled ? 4 : 0}
                sx={{
                    backgroundColor: scrolled ? "#2196F333" : "transparent",
                    backdropFilter: scrolled ? "blur(10px)" : "none",
                    transition: "all 0.3s ease-in-out",
                    boxShadow: scrolled ? theme.shadows[2] : "none",
                }}
            >
                <Toolbar>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                        }}
                        onClick={() => window.location.reload()}
                    >
                        <Avatar
                            alt="Logo"
                            src={LogoBlue}
                            sx={{ width: 32, height: 32 }}
                        />
                        <Typography
                            variant="h4"
                            component="div"
                            sx={{
                                userSelect: "none",
                                margin: "0 5px",
                                fontFamily: "serif",
                                fontSize: "1.5em",
                                color: (theme) => theme.palette.primary.main,
                            }}
                        >
                            {t("logo")}
                        </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: "flex", gap: "5px" }}>
                        <Button
                            variant="text"
                            sx={{
                                width: "fit-content",
                                color: (theme) => theme.palette.primary.main,
                            }}
                            onClick={() => {
                                setLang();
                            }}
                        >
                            {lang === "en" ? "Arabic" : "إنجليزي"}
                        </Button>
                        <IconButton
                            size="large"
                            color="secondary"
                            onClick={() =>
                                setThemeMode(theme.palette.mode !== "dark")
                            }
                        >
                            {theme.palette.mode === "light" ? (
                                <DarkModeIcon />
                            ) : (
                                <LightModeIcon />
                            )}
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
