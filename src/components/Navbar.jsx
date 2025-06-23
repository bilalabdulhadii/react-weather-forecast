import { useTheme } from "@emotion/react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Logo from "../assets/logo.png";

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
                elevation={0}
                sx={{
                    backgroundColor: "transparent",
                    boxShadow: "none",
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
                            src={Logo}
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
