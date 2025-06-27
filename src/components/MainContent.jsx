import { Box } from "@mui/material";
import CurrentLoadingCard from "./CurrentWeatherCard/CurrentLoadingCard";
import CurrentWeatherCard from "./CurrentWeatherCard/CurrentWeatherCard";
import HourlyLoadingTimeline from "./HourlyTimeline/HourlyLoadingTimeline";
import HourlyWeatherTimeline from "./HourlyTimeline/HourlyWeatherTimeline";
import Next5DaysLoadingCard from "./Next5DaysCard/Next5DaysLoadingCard";
import Next5DaysWeatherCard from "./Next5DaysCard/Next5DaysWeatherCard";
import CityComparisonLoadingBox from "./CityComparison/CİtyComparisonLoadingBox";
import CityComparisonWeatherBox from "./CityComparison/CİtyComparisonWeatherBox";

export default function MainContent({ loading }) {
    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                marginTop: "30px",
                marginBottom: "100px",
                gap: 3,
            }}
        >
            {loading ? <CurrentLoadingCard /> : <CurrentWeatherCard />}
            {loading ? <HourlyLoadingTimeline /> : <HourlyWeatherTimeline />}
            {loading ? <Next5DaysLoadingCard /> : <Next5DaysWeatherCard />}
            {loading ? (
                <CityComparisonLoadingBox />
            ) : (
                <CityComparisonWeatherBox />
            )}
        </Box>
    );
}
