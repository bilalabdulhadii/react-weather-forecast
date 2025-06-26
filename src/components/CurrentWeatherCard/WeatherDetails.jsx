import { Stack, Box, Typography } from "@mui/material";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import ValueInfoRow from "./ValueInfoRow";
import { useTranslation } from "react-i18next";
import { formatNumber, formatHour } from "../../utils/format";
import { useLang } from "../../contexts/LangContext";
import { useMemo } from "react";
import { useCurrentWeather } from "../../contexts/CurrentWeatherContext";

export default function WeatherDetails() {
    const { currentWeather } = useCurrentWeather();
    const { lang } = useLang();
    const { t } = useTranslation();

    const formattedSunrise = useMemo(
        () => formatHour(currentWeather.sunriseRaw, lang),
        [currentWeather.sunriseRaw, lang]
    );

    const formattedSunset = useMemo(
        () => formatHour(currentWeather.sunsetRaw, lang),
        [currentWeather.sunsetRaw, lang]
    );

    return (
        <Stack
            spacing={4}
            sx={{
                height: "100%",
                display: "flex",
                justifyContent: "space-between",
            }}
        >
            <Box>
                <Typography
                    variant="h2"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <ThermostatIcon
                        fontSize="inherit"
                        sx={{
                            color: (theme) => theme.palette.secondary.main,
                        }}
                    />
                    {formatNumber(currentWeather.temp, lang) + t("units.temp")}
                </Typography>
                <Typography
                    variant="h4"
                    sx={{
                        justifySelf: "center",
                    }}
                >
                    {t(currentWeather.description)}
                </Typography>
            </Box>

            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={1}
            >
                <ValueInfoRow
                    icon="feels_like"
                    label={t("feels_like")}
                    value={
                        formatNumber(currentWeather.feels_like, lang) +
                        t("units.temp")
                    }
                />
                <ValueInfoRow
                    icon="humidity"
                    label={t("humidity")}
                    value={
                        formatNumber(currentWeather.humidity, lang) +
                        t("units.humidity")
                    }
                />
                <ValueInfoRow
                    icon="wind"
                    label={t("wind")}
                    value={
                        formatNumber(currentWeather.wind, lang) +
                        " " +
                        t("units.wind_speed")
                    }
                />
                <ValueInfoRow
                    icon="sunrise"
                    label={t("sunrise")}
                    value={formattedSunrise}
                />
                <ValueInfoRow
                    icon="sunset"
                    label={t("sunset")}
                    value={formattedSunset}
                />
            </Box>
        </Stack>
    );
}
