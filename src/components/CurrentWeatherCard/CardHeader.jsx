import { Box, Typography } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import TodayIcon from "@mui/icons-material/Today";
import { localizedCountryName } from "../../utils/localizedCountryName";
import { useLang } from "../../contexts/LangContext";
import { useMemo } from "react";
import { formatDate } from "../../utils/format";
import { useWeather } from "../../contexts/WeatherContext";

export default function CardHeader() {
    const { weather } = useWeather();
    const { lang } = useLang();

    const formattedDate = useMemo(
        () => formatDate(weather.dateRaw, lang),
        [weather.dateRaw, lang]
    );

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" display="flex" alignItems="center">
                <PlaceIcon
                    fontSize="inherit"
                    sx={{
                        color: (theme) => theme.palette.primary.main,
                    }}
                />
                &nbsp;{localizedCountryName(weather.country, lang)}{" "}
                {/* {city} */}
            </Typography>
            <Typography variant="body2" display="flex" alignItems="center">
                <TodayIcon
                    fontSize="inherit"
                    sx={{
                        color: (theme) => theme.palette.primary.main,
                    }}
                />
                &nbsp;{formattedDate}
            </Typography>
        </Box>
    );
}
