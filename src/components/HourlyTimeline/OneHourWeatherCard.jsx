import { Paper, Stack, Typography } from "@mui/material";
import { formatNumber } from "../../utils/format";
import { useTranslation } from "react-i18next";
import { useLang } from "../../contexts/LangContext";
import HourWeatherIcon from "./HourWeatherIcon";
import moment from "moment";

export default function OneHourWeatherCard({ weather }) {
    const { lang } = useLang();
    const { t } = useTranslation();

    const date = moment.unix(weather.dateRaw);
    const hour = date.format("HH:mm");
    const day = date.format("dddd");

    return (
        <Paper
            elevation={2}
            sx={{
                padding: 2,
                opacity: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: {
                    xs: "calc(50% - 7.5px)",
                    sm: "calc(33.3% - 10px)",
                    md: "calc(20% - 12px)",
                    lg: "calc(20% - 12px)",
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
                <Typography variant="h5">
                    {hour} <br />
                    {day}
                </Typography>

                <HourWeatherIcon
                    icon={weather.icon}
                    description={weather.description}
                />

                <Typography variant="h4">
                    {formatNumber(weather.temp, lang) + t("units.temp")}
                </Typography>

                <Typography variant="body2" style={{ margin: "0" }}>
                    {formatNumber(weather.humidity, lang) + t("units.humidity")}
                </Typography>
            </Stack>
        </Paper>
    );
}
