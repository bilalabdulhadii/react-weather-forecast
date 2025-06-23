import { Box, Typography } from "@mui/material";

export default function ValueInfoRow({ label, value }) {
    return (
        <Box
            sx={{
                width: "80%",
                display: "flex",
                justifyContent: "space-between",
            }}
        >
            <Typography variant="body2">{label}</Typography>
            <Typography variant="body2">{value}</Typography>
        </Box>
    );
}
