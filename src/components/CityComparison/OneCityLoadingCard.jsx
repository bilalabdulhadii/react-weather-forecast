import { Paper, CircularProgress } from "@mui/material";

export default function OneCityLoadingCard() {
    return (
        <Paper
            elevation={2}
            sx={{
                minHeight: "250px",
                padding: 2,
                opacity: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "&:hover": {
                    backgroundColor: "action.hover",
                },
            }}
        >
            <CircularProgress color="primary" size={40} />
        </Paper>
    );
}
