import { Grid } from "@mui/material";
import WeatherIcon from "../WeatherIcon";
import WeatherDetails from "./WeatherDetails";
import { useWeather } from "../../contexts/WeatherContext";

export default function CardBody() {
    const { weather } = useWeather();
    return (
        <Grid container spacing={1}>
            <Grid size={7}>
                <WeatherDetails />
            </Grid>
            <Grid size={5}>
                <WeatherIcon
                    icon={weather.icon}
                    description={weather.description}
                />
            </Grid>
        </Grid>
    );
}
