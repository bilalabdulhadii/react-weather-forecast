import { Box, Grid } from "@mui/material";
import OneCityWeatherCard from "./OneCityWeatherCard";
import { useCityComparisonWeather } from "../../contexts/CityComparisonWeatherContext";

export default function CityComparisonWeatherBox() {
    const { CityComparisonWeather } = useCityComparisonWeather();

    const citiesList = CityComparisonWeather.map((city) => {
        return (
            <Grid
                key={city.id}
                size={{
                    xs: 12,
                    sm: 6,
                    md: 3,
                    lg: 3,
                }}
            >
                <OneCityWeatherCard weather={city} />
            </Grid>
        );
    });
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                {citiesList}
            </Grid>
        </Box>
    );
}
