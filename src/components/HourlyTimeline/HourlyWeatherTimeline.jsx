import { Box, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { useNext5DaysWeather } from "../../contexts/Next5DaysWeatherContext";
import OneHourWeatherCard from "./OneHourWeatherCard";
import { useLang } from "../../contexts/LangContext";

export default function HourlyWeatherTimeline() {
    const { next5DaysWeather } = useNext5DaysWeather();
    const { lang } = useLang();
    const scrollRef = useRef(null);

    const [isDragging, setIsDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);
    const [initialScrollLeft, setInitialScrollLeft] = useState(0);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);

    // Handle scroll position (to enable/disable arrows)
    const handleScroll = () => {
        const el = scrollRef.current;
        if (!el) return;

        const scrollPos = Math.abs(el.scrollLeft); // normalize
        const maxScroll = el.scrollWidth - el.clientWidth;

        setAtStart(scrollPos <= 1);
        setAtEnd(scrollPos >= maxScroll - 1);
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        handleScroll(); // Initial check
        el.addEventListener("scroll", handleScroll);
        return () => el.removeEventListener("scroll", handleScroll);
    }, []);

    // Scroll by percentage of container width
    const scrollByPercent = (percent) => {
        const el = scrollRef.current;
        if (!el) return;

        const gap = 15;
        const directionMultiplier = lang === "ar" ? -1 : 1;
        const amount =
            directionMultiplier *
            (el.clientWidth * (percent / 100) + Math.sign(percent) * gap);

        el.scrollBy({ left: amount, behavior: "smooth" });
    };
    

    // Drag & Touch Handlers (Shared Logic)
    const startDrag = (clientX) => {
        const el = scrollRef.current;
        if (!el) return;
        setIsDragging(true);
        setDragStartX(clientX - el.offsetLeft);
        setInitialScrollLeft(el.scrollLeft);
    };

    const doDrag = (clientX) => {
        if (!isDragging || !scrollRef.current) return;
        const x = clientX - scrollRef.current.offsetLeft;
        const walk = (x - dragStartX) * 1.5;
        scrollRef.current.scrollLeft = initialScrollLeft - walk;
    };

    // Build the weather cards
    const weatherCards = next5DaysWeather.map((data) => (
        <OneHourWeatherCard key={data.id} weather={data} />
    ));

    return (
        <Box sx={{ position: "relative", width: "100%" }}>
            {/* Scrollable area */}
            <Box
                ref={scrollRef}
                onMouseDown={(e) => startDrag(e.pageX)}
                onMouseMove={(e) => doDrag(e.pageX)}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                onTouchStart={(e) => startDrag(e.touches[0].pageX)}
                onTouchMove={(e) => doDrag(e.touches[0].pageX)}
                onTouchEnd={() => setIsDragging(false)}
                sx={{
                    display: "flex",
                    overflowX: "auto",
                    gap: "15px",
                    padding: "5px 0",
                    cursor: isDragging ? "grabbing" : "grab",
                    userSelect: "none",
                    WebkitOverflowScrolling: "touch",
                    "&::-webkit-scrollbar": { display: "none" },
                    scrollbarWidth: "none",
                    borderRadius: 1,
                    boxShadow: `inset 15px 0px 10px -10px rgba(0, 0, 0, 0.5),
                                inset -15px 0px 10px -10px rgba(0, 0, 0, 0.5)`,
                }}
            >
                {weatherCards}
            </Box>

            {/* Left visual button */}
            {!atStart && (
                <ScrollButton
                    direction={lang === "ar" ? "right" : "left"}
                    onClick={() => scrollByPercent(-100)}
                />
            )}

            {/* Right visual button */}
            {!atEnd && (
                <ScrollButton
                    direction={lang === "ar" ? "left" : "right"}
                    onClick={() => scrollByPercent(100)}
                />
            )}
        </Box>
    );
}

// ScrollButton Component for Reusability
function ScrollButton({ direction, onClick }) {
    const isLeft = direction === "left";
    return (
        <IconButton
            onClick={onClick}
            sx={{
                position: "absolute",
                top: "50%",
                [isLeft ? "left" : "right"]: 0,
                transform: "translateY(-50%)",
                backgroundColor: (theme) => theme.palette.background.default,
                boxShadow: 5,
                zIndex: 1,
                "&:hover": {
                    backgroundColor: "#2196F399",
                },
            }}
        >
            {isLeft ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
    );
}
