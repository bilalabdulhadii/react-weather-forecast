import { Paper, Stack } from "@mui/material";
import CardHeader from "./CardHeader";
import CardBody from "../CurrentWeatherCard/CardBody";

export default function OneDayCard({date}) {
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
                <CardHeader date={date}/>
                <hr />
                <CardBody />
            </Stack>
        </Paper>
    );
}
