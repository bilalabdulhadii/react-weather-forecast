import { Paper, CircularProgress } from "@mui/material";

export default function OneHourLoadingCard() {
    return (
        <Paper
            elevation={2}
            sx={{
                padding: 2,
                opacity: 0.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: {
                    xs: "calc(50% - 7.5px)",
                    sm: "calc(33.3% - 10px)",
                    md: "calc(20% - 12px)",
                    lg: "calc(20% - 12px)",
                },
            }}
        >
            <CircularProgress color="primary" size={40} />
        </Paper>
    );
}