import { Box, Typography } from "@mui/material";
import AirIcon from "@mui/icons-material/Air";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

export default function ValueInfoRow({ icon, label, value }) {
    const getIconForLabel = () => {
        switch (icon) {
            case "feels_like":
                return <ThermostatIcon fontSize="small" />;
            case "humidity":
                return <WaterDropIcon fontSize="small" />;
            case "wind":
                return <AirIcon fontSize="small" />;
            case "sunrise":
                return <WbSunnyIcon fontSize="small" />;
            case "sunset":
                return <WbTwilightIcon fontSize="small" />;
            default:
                return null;
        }
    };

    return (
        <Box
            sx={{
                width: "80%",
                display: "flex",
                justifyContent: "space-between",
            }}
        >
            <Typography
                variant="body2"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
                {getIconForLabel(icon)}
                {label}
            </Typography>
            <Typography variant="body2">{value}</Typography>
        </Box>
    );
}
