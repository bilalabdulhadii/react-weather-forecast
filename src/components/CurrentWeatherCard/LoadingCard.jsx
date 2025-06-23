import { Paper, CircularProgress } from "@mui/material";

export default function LoadingCard() {
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
                minHeight: "300px",
            }}
        >
            <CircularProgress color="primary" size={40} />
        </Paper>
    );
}
