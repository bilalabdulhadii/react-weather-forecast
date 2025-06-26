import { Box } from "@mui/material";
import iconMap from "../../iconMap";

export default function CurrentWeatherIcon({ icon, description }) {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
        >
            <img
                src={iconMap[icon || iconMap["01d"]]}
                alt={description}
                draggable={false}
                style={{
                    width: "100%",
                    height: "auto",
                }}
            />
        </Box>
    );
}
