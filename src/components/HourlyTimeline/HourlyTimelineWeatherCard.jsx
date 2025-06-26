import { Box } from "@mui/material";
import OneHourWeatherCard from "./OneHourWeatherCard";
import { useRef, useState } from "react";
import { useNext5DaysWeather } from "../../contexts/Next5DaysWeatherContext";

export default function HourlyTimelineWeatherCard() {
    const { next5DaysWeather } = useNext5DaysWeather();

    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseLeave = () => setIsDragging(false);
    const handleMouseUp = () => setIsDragging(false);

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 1.5; // Speed factor
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };
    const hoursList = next5DaysWeather.map((item) => {
        return (
            <OneHourWeatherCard
                key={item.id}
                weather={item}
            />
        );
    });

    return (
        <Box
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            sx={{
                width: "100%",
                overflowX: "auto",
                display: "flex",
                flexDirection: "row",
                whiteSpace: "nowrap",
                gap: "15px",
                cursor: isDragging ? "grabbing" : "grab",
                "&::-webkit-scrollbar": { display: "none" },
                scrollbarWidth: "none",
                userSelect: "none",
            }}
        >
            {hoursList}
        </Box>
    );
}
