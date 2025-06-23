import { Stack, Box, Typography } from "@mui/material";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import ValueInfoRow from "./ValueInfoRow";
import { useTranslation } from "react-i18next";
import { formatNumber, formatSunriseOrSunset } from "../../utils/format";
import { useLang } from "../../contexts/LangContext";
import { useMemo } from "react";
import { useWeather } from "../../contexts/WeatherContext";

export default function WeatherDetails() {
    const {weather} = useWeather();
    const { lang } = useLang();
    const { t } = useTranslation();

    const formattedSunrise = useMemo(
        () => formatSunriseOrSunset(weather.sunriseRaw, lang),
        [weather.sunriseRaw, lang]
    );

    const formattedSunset = useMemo(
        () => formatSunriseOrSunset(weather.sunsetRaw, lang),
        [weather.sunsetRaw, lang]
    );

    return (
        <Stack spacing={4}>
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
                    {formatNumber(weather.temp, lang) + t("units.temp")}
                </Typography>
                <Typography
                    variant="h4"
                    sx={{
                        justifySelf: "center",
                    }}
                >
                    {t(weather.description)}
                </Typography>
            </Box>

            <Box display="flex" flexDirection="column" alignItems="center">
                <ValueInfoRow
                    label={t("feels_like")}
                    value={
                        formatNumber(weather.feels_like, lang) + t("units.temp")
                    }
                />
                <ValueInfoRow
                    label={t("humidity")}
                    value={
                        formatNumber(weather.humidity, lang) +
                        t("units.humidity")
                    }
                />
                <ValueInfoRow
                    label={t("wind")}
                    value={
                        formatNumber(weather.wind, lang) +
                        " " +
                        t("units.wind_speed")
                    }
                />
                <ValueInfoRow label={t("sunrise")} value={formattedSunrise} />
                <ValueInfoRow label={t("sunset")} value={formattedSunset} />
            </Box>
        </Stack>
    );
}
