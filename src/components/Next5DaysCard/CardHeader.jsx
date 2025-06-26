import { Box, Typography } from "@mui/material";
import DateRangeTwoToneIcon from "@mui/icons-material/DateRangeTwoTone";
import { useTranslation } from "react-i18next";
export default function CardHeader() {
    const {t} = useTranslation();
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" display="flex" alignItems="center">
                <DateRangeTwoToneIcon
                    fontSize="inherit"
                    sx={{
                        color: (theme) => theme.palette.primary.main,
                    }}
                />
                &nbsp;{t("next_5_days")}
            </Typography>
        </Box>
    );
}
