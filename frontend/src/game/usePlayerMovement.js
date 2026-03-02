import { useState, useRef, useCallback } from 'react';
import { TILE_SIZE } from './constants';

export const usePlayerMovement = (initialX, initialY, mapData, onMessage) => {
    const [gridPos, setGridPos] = useState({ x: initialX, y: initialY });
    const [pixelPos, setPixelPos] = useState({ x: initialX * TILE_SIZE, y: initialY * TILE_SIZE });
    const [animState, setAnimState] = useState("idle");
    const [facing, setFacing] = useState("right");

    const isMovingRef = useRef(false);

    const requestMove = useCallback((directionKeys) => {
        if (isMovingRef.current) return;

        let dx = 0;
        let dy = 0;

        if (directionKeys.includes("UP")) dy = -1;
        if (directionKeys.includes("DOWN")) dy = 1;
        if (directionKeys.includes("LEFT")) { dx = -1; setFacing("left"); }
        if (directionKeys.includes("RIGHT")) { dx = 1; setFacing("right"); }

        if (dx === 0 && dy === 0) {
            setAnimState("idle");
            return;
        }

        let newX = gridPos.x + dx;
        let newY = gridPos.y + dy;

        // Custom bounds to match 800px free-flow movement so they can completely traverse the entire available map size without stopping artificially
        if (newX < 0) newX = 0;
        if (newY < 0) newY = 0;
        if (newX > 30) newX = 30; // 30 squares approx 900px wide
        if (newY > 20) newY = 20; // 20 squares approx 600px tall

        if (newX === gridPos.x && newY === gridPos.y) {
            return;
        }

        setAnimState("running");
        isMovingRef.current = true;

        const startPixelX = gridPos.x * TILE_SIZE;
        const startPixelY = gridPos.y * TILE_SIZE;
        const endPixelX = newX * TILE_SIZE;
        const endPixelY = newY * TILE_SIZE;

        // Force exactly 800ms again to match the 'vary slow' request precisely
        const duration = 800;
        let startTime = null;
        let rAF;

        const animate = (time) => {
            if (!startTime) startTime = time;
            const progress = Math.min((time - startTime) / duration, 1);

            const currentX = startPixelX + (endPixelX - startPixelX) * progress;
            const currentY = startPixelY + (endPixelY - startPixelY) * progress;

            setPixelPos({ x: currentX, y: currentY });

            if (progress < 1) {
                rAF = requestAnimationFrame(animate);
            } else {
                setGridPos({ x: newX, y: newY });
                setAnimState("idle");
                isMovingRef.current = false;
                setPixelPos({ x: endPixelX, y: endPixelY });
            }
        };

        rAF = requestAnimationFrame(animate);
    }, [gridPos]);

    return { gridPos, pixelPos, animState, facing, requestMove };
};
