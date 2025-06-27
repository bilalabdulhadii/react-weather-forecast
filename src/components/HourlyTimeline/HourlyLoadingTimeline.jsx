import { Box } from "@mui/material";
import { useRef, useState } from "react";
import OneHourLoadingCard from "./OneHourLoadingCard";

export default function HourlyLoadingTimeline() {
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
                minHeight: "240px",
                padding: "5px 0",
            }}
        >
            <OneHourLoadingCard />
            <OneHourLoadingCard />
            <OneHourLoadingCard />
            <OneHourLoadingCard />
            <OneHourLoadingCard />
        </Box>
    );
}
