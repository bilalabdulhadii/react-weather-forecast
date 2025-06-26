import { Grid } from "@mui/material";
import CurrentWeatherIcon from "./CurrentWeatherIcon";
import WeatherDetails from "./WeatherDetails";
import { useCurrentWeather } from "../../contexts/CurrentWeatherContext";

export default function CardBody() {
    const { currentWeather } = useCurrentWeather();
    return (
        <Grid container spacing={1}>
            <Grid size={7}>
                <WeatherDetails />
            </Grid>
            <Grid size={5}>
                <CurrentWeatherIcon
                    icon={currentWeather.icon}
                    description={currentWeather.description}
                />
            </Grid>
        </Grid>
    );
}
