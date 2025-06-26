import { Box } from "@mui/material";
import iconMap from "../../iconMap";

export default function DayWeatherIcon({ icon, description }) {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" >
            <img
                src={iconMap[icon || iconMap["01d"]]}
                alt={description}
                draggable={false}
                style={{
                    maxWidth: "50px",
                }}
            />
        </Box>
    );
}
