import { Paper, Stack } from "@mui/material";
import CardHeader from "./CardHeader";
import CardBody from "./CardBody";

export default function CurrentWeatherCard() {
    return (
        <Paper
            elevation={2}
            sx={{
                width: "100%",
                padding: 2,
                opacity: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Stack
                spacing={2}
                sx={{ width: "100%" }}
                display="flex"
                justifyContent="center"
                alignContent="center"
            >
                <CardHeader />
                <hr />
                <CardBody />
            </Stack>
        </Paper>
    );
}
