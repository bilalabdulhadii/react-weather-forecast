import { Paper, CircularProgress } from "@mui/material";

export default function Next5DaysLoadingCard() {
    return (
        <Paper
            elevation={2}
            sx={{
                width: "100%",
                padding: 2,
                opacity: 0.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "450px",
            }}
        >
            <CircularProgress color="primary" size={40} />
        </Paper>
    );
}
