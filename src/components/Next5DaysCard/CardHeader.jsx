import { Box, Typography } from "@mui/material";

export default function CardHeader({date}) {
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" display="flex" alignItems="center">
                {date}
            </Typography>
            
        </Box>
    );
}
