import { Paper, CircularProgress } from "@mui/material";

export default function CurrentLoadingCard() {
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
                minHeight: "400px",
            }}
        >
            <CircularProgress color="primary" size={40} />
        </Paper>
    );
}
