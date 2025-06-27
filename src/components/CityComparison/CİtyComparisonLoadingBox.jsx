import { Box, Grid } from "@mui/material";
import OneCityLoadingCard from "./OneCityLoadingCard";

export default function CityComparisonLoadingBox() {
    const citiesList = Array.from({ length: 4 }).map((_, index) => {
        return (
            <Grid
                key={index}
                size={{
                    xs: 12,
                    sm: 6,
                    md: 3,
                    lg: 3,
                }}
            >
                <OneCityLoadingCard />
            </Grid>
        );
    });
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                {citiesList}
            </Grid>
        </Box>
    );
}
