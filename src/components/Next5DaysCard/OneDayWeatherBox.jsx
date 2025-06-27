import { Box, Typography } from "@mui/material";
import DayWeatherIcon from "./DayWeatherIcon";
import TrendingUpTwoToneIcon from "@mui/icons-material/TrendingUpTwoTone";
import TrendingDownTwoToneIcon from "@mui/icons-material/TrendingDownTwoTone";
import { formatNumber } from "../../utils/format";
import { useLang } from "../../contexts/LangContext";
import { useTranslation } from "react-i18next";

export default function OneDayWeatherBox({ weather }) {
    const { lang } = useLang();
    const { t } = useTranslation();
    return (
        <Box
            sx={{
                padding: 1,
                display: "flex",
                alignItems: "stretch",
                gap: 2,
                borderRadius: (theme) => `${theme.shape.borderRadius}px`,
                "&:hover": {
                    backgroundColor: "action.hover",
                    cursor: "pointer",
                },
            }}
        >
            <DayWeatherIcon
                icon={weather.icon}
                description={weather.description}
            />
            <Box
                sx={{
                    flexGrow: "1",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Box>
                    <Typography variant="h5">{weather.day}</Typography>
                    <Typography variant="body1">
                        {t(weather.description)}
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 2 }}>
                    <Box
                        dir="ltr"
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                        <TrendingUpTwoToneIcon
                            color="error"
                            fontSize="medium"
                        />
                        <Typography variant="body2">
                            {formatNumber(weather.max, lang) + t("units.temp")}
                        </Typography>
                    </Box>

                    <Box
                        dir="ltr"
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                        <TrendingDownTwoToneIcon
                            color="primary"
                            fontSize="medium"
                        />
                        <Typography variant="body2">
                            {formatNumber(weather.min, lang) + t("units.temp")}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
