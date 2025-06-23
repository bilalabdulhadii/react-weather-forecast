import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const commonSettings = {
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: "2.5rem", // mobile
            "@media (min-width:600px)": {
                fontSize: "3.5rem", // tablets
            },
            "@media (min-width:900px)": {
                fontSize: "5rem", // desktops
            },
            fontWeight: 600,
            lineHeight: 1.2,
        },
        h2: {
            fontSize: "2rem",
            "@media (min-width:600px)": {
                fontSize: "3rem",
            },
            "@media (min-width:900px)": {
                fontSize: "3.75rem",
            },
            fontWeight: 600,
            lineHeight: 1.3,
        },
        h3: {
            fontSize: "1.75rem",
            "@media (min-width:600px)": {
                fontSize: "2.25rem",
            },
            "@media (min-width:900px)": {
                fontSize: "3rem",
            },
            fontWeight: 600,
            lineHeight: 1.3,
        },
        h4: {
            fontSize: "1.5rem",
            "@media (min-width:600px)": {
                fontSize: "1.75rem",
            },
            "@media (min-width:900px)": {
                fontSize: "2.25rem",
            },
            fontWeight: 600,
            lineHeight: 1.4,
        },
        h5: {
            fontSize: "1.25rem",
            "@media (min-width:600px)": {
                fontSize: "1.5rem",
            },
            "@media (min-width:900px)": {
                fontSize: "1.75rem",
            },
            fontWeight: 500,
            lineHeight: 1.4,
        },
        h6: {
            fontSize: "1.1rem",
            "@media (min-width:600px)": {
                fontSize: "1.25rem",
            },
            "@media (min-width:900px)": {
                fontSize: "1.5rem",
            },
            fontWeight: 500,
            lineHeight: 1.5,
        },
        subtitle1: {
            fontSize: "1.1rem",
            "@media (min-width:600px)": {
                fontSize: "1.25rem",
            },
            "@media (min-width:900px)": {
                fontSize: "1.35rem",
            },
            fontWeight: 500,
            lineHeight: 1.5,
        },
        subtitle2: {
            fontSize: "1rem",
            "@media (min-width:600px)": {
                fontSize: "1.1rem",
            },
            "@media (min-width:900px)": {
                fontSize: "1.2rem",
            },
            fontWeight: 500,
            lineHeight: 1.5,
        },
        body1: {
            fontSize: "1.1rem",
            "@media (min-width:600px)": {
                fontSize: "1.2rem",
            },
            "@media (min-width:900px)": {
                fontSize: "1.3rem",
            },
            fontWeight: 400,
            lineHeight: 1.6,
        },
        body2: {
            fontSize: "0.95rem",
            "@media (min-width:600px)": {
                fontSize: "1rem",
            },
            "@media (min-width:900px)": {
                fontSize: "1.1rem",
            },
            fontWeight: 400,
            lineHeight: 1.6,
        },
        caption: {
            fontSize: "0.85rem",
            "@media (min-width:600px)": {
                fontSize: "0.9rem",
            },
            "@media (min-width:900px)": {
                fontSize: "0.95rem",
            },
            fontWeight: 400,
            lineHeight: 1.4,
        },
        overline: {
            fontSize: "0.7rem",
            "@media (min-width:600px)": {
                fontSize: "0.75rem",
            },
            "@media (min-width:900px)": {
                fontSize: "0.8rem",
            },
            fontWeight: 500,
            lineHeight: 1.4,
            textTransform: "uppercase",
        },
        button: {
            fontSize: "1rem",
            "@media (min-width:600px)": {
                fontSize: "1.1rem",
            },
            "@media (min-width:900px)": {
                fontSize: "1.2rem",
            },
            fontWeight: 400,
            lineHeight: 1.75,
            textTransform: ""
        },
    },
    shape: {
        borderRadius: 12,
    },
    transitions: {
        duration: {
            shortest: 150,
            shorter: 200,
            short: 250,
            standard: 300,
            complex: 375,
            enteringScreen: 225,
            leavingScreen: 195,
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                "*": {
                    transition:
                        "background-color 0.5s ease-in-out, color 0.5s ease-in-out",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },
    },
};


let lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#2196F3", // Blue Sky
        },
        secondary: {
            main: "#FFC107", // Sunlight
        },
        accent: {
            main: "#81D4FA", // Light Airy Blue
        },
        background: {
            default: "#E3F2FD", // Light Blue Background
            paper: "#FFFFFF", // Clean white card
        },
        text: {
            primary: "#212121", // Deep gray
            secondary: "#616161", // Medium gray
        },
    },
    ...commonSettings,
});

let darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#2196F3", // Blue Sky
        },
        secondary: {
            main: "#FFCA28", // Warm Yellow
        },
        accent: {
            main: "#66BB6A", // Soft Green
        },
        background: {
            default: "#0B1D33", // Deep Night Sky
            paper: "#152642", // Slightly lighter for cards
        },
        text: {
            primary: "#E0E0E0",
            secondary: "#A0A0A0",
        },
    },
    ...commonSettings,
});

// 🧠 Make typography responsive
lightTheme = responsiveFontSizes(lightTheme);
darkTheme = responsiveFontSizes(darkTheme);

// ✅ Export
export { lightTheme, darkTheme };