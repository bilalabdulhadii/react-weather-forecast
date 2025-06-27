import { Stack, Box, Typography } from "@mui/material";
import OneDayWeatherBox from "./OneDayWeatherBox";
import { useNext5DaysWeather } from "../../contexts/Next5DaysWeatherContext";
import moment from "moment";
import { useLang } from "../../contexts/LangContext";
import { formatDay } from "../../utils/format";
export default function CardBody() {
    const { next5DaysWeather } = useNext5DaysWeather();
    const { lang } = useLang();

    // Group the data by day
    const grouped = {};
    next5DaysWeather.forEach((item) => {
        const key = moment.unix(item.dateRaw).format("YYYY-MM-DD");
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(item);
    });

    // Convert to summarized daily data
    const dailyData = Object.keys(grouped)
        .slice(0, 5)
        .map((dayKey) => {
            const items = grouped[dayKey];

            const temps = items.map((i) => i.temp);
            const descriptions = items.map((i) => i.description);
            const icons = items.map((i) => i.icon);

            return {
                day: formatDay(
                    items[Math.floor(items.length / 2)].dateRaw,
                    lang
                ),
                description: descriptions[Math.floor(descriptions.length / 2)],
                icon: icons[Math.floor(icons.length / 2)],
                min: Math.min(...temps),
                max: Math.max(...temps),
            };
        });

    return (
        <Stack sx={{ padding: "20px 20px 0" }}>
            <Box
                sx={{
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                    gap: 2,
                    marginBottom:"5px"
                }}
            >
                {/* <div style={{ width: "60px" }} />
                <Typography
                    variant="body1"
                    sx={{ flexGrow: "1", textAlign: "start" }}
                >
                    <small>Description</small>
                </Typography> */}
                <Typography variant="body1" sx={{ width: "60px" }}>
                    <small>High</small>
                </Typography>
                <Typography variant="body1" sx={{ width: "60px" }}>
                    <small>Low</small>
                </Typography>
            </Box>
            {dailyData.map((day, index) => (
                <OneDayWeatherBox key={index} weather={day} />
            ))}
        </Stack>
    );
}
