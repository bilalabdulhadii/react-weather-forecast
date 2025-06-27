import { Paper, Stack, Typography } from "@mui/material";
import { formatNumber } from "../../utils/format";
import { useTranslation } from "react-i18next";
import { useLang } from "../../contexts/LangContext";
import CityWeatherIcon from "./CityWeatherIcon";

export default function OneCityWeatherCard({ weather }) {
    const { lang } = useLang();
    const { t } = useTranslation();

    return (
        <Paper
            elevation={2}
            sx={{
                padding: 2,
                opacity: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "&:hover": {
                    backgroundColor: "action.hover",
                },
            }}
        >
            <Stack
                spacing={2}
                sx={{ width: "100%" }}
                display="flex"
                justifyContent="center"
                alignContent="center"
                textAlign="center"
            >
                <Typography variant="h5">{t(weather.city)}</Typography>

                <CityWeatherIcon
                    icon={weather.icon}
                    description={weather.description}
                />

                <Typography variant="h3">
                    {formatNumber(weather.temp, lang) + t("units.temp")}
                </Typography>
                <Typography variant="body2" style={{ margin: "0" }}>
                    {formatNumber(weather.humidity, lang) + t("units.humidity")}
                </Typography>
                <Typography variant="body2" style={{ margin: "0" }}>
                    {t(weather.description)}
                </Typography>
            </Stack>
        </Paper>
    );
}
