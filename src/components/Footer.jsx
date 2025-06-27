import { Box, Typography, Link } from "@mui/material";
import { useTranslation } from "react-i18next";
import { formatNumber } from "../utils/format";
import { useLang } from "../contexts/LangContext";

export default function Footer() {
    const { t } = useTranslation();
    const { lang } = useLang();
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: (theme) => theme.palette.background.paper,
                textAlign: "center",
                padding: "10px 10px",
                mt: "auto",
                borderTop: "1px solid",
                borderColor: "divider",
                height: "60px",
                boxSizing: "border-box",
            }}
        >
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                {t("copyright") +
                    " © " +
                    formatNumber(new Date().getFullYear(), lang) +
                    " " +
                    t("copyright_1") +
                    " "}
                <Link
                    href="https://bilalabdulhadi.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    color="primary"
                    fontWeight="bold"
                >
                    {t("bilalabdulhadi")}
                </Link>
            </Typography>
        </Box>
    );
}
