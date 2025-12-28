"use client";

import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export const AnimeGrid = () => {
    const [gridSize, setGridSize] = useState({ columns: 0, rows: 0 });

    useEffect(() => {
        const calculateGrid = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const size = 50; // Tile size
            const columns = Math.ceil(width / size);
            const rows = Math.ceil(height / size);
            setGridSize({ columns, rows });
        };

        calculateGrid();
        window.addEventListener("resize", calculateGrid);
        return () => window.removeEventListener("resize", calculateGrid);
    }, []);



    const gridStyles = {
        "--columns": gridSize.columns,
        "--rows": gridSize.rows,
        gridTemplateColumns: "repeat(var(--columns), 1fr)",
        gridTemplateRows: "repeat(var(--rows), 1fr)",
    } as React.CSSProperties;

    return (
        <div className="absolute inset-0 z-0 overflow-hidden flex flex-wrap justify-center items-center pointer-events-none">
            {/* eslint-disable-next-line react-dom/no-unsafe-styles */}
            <div
                className="w-full h-full grid"
                style={gridStyles}
            >
                {[...Array(gridSize.columns * gridSize.rows)].map((_, i) => (
                    <Tile key={i} />
                ))}
            </div>
        </div>
    );
};

const Tile = () => {
    const controls = useAnimation();

    const handleInteract = () => {
        controls.start({
            backgroundColor: ["rgba(34, 211, 238, 0.5)", "rgba(23, 23, 23, 0)"],
            transition: { duration: 0.8, ease: "easeOut" }
        });
    }

    return (
        <motion.div
            className="w-full h-full border-[0.5px] border-neutral-900/20 bg-transparent pointer-events-auto hover:bg-neutral-800/30 transition-colors"
            animate={controls}
            onHoverStart={handleInteract}
            onClick={handleInteract}
            whileTap={{ scale: 0.9 }}
        />
    )
}
