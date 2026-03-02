import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePlayerMovement } from '../game/usePlayerMovement';
import { SpriteAnimator } from '../game/SpriteAnimator';
import { getMapData } from '../game/mapData';
import { TILE_SIZE } from '../game/constants';

const SingleMap = () => {
    const { id } = useParams();
    const [message, setMessage] = useState("Explore the map freely!");
    const [keyboardEnabled, setKeyboardEnabled] = useState(true);

    const mapUrl = `/maps/map_${id}.png`;
    const mapData = getMapData(id);

    const handleMessage = useCallback((msg) => {
        if (msg) setMessage(msg);
    }, []);

    // Start at (1, 1) or somewhere safe on MAP_1_DATA
    const { pixelPos, animState, facing, requestMove } = usePlayerMovement(1, 1, mapData, handleMessage);

    useEffect(() => {
        if (!keyboardEnabled) return;

        const handleKeyDown = (e) => {
            let directions = [];
            if (e.key === "ArrowUp") directions.push("UP");
            if (e.key === "ArrowDown") directions.push("DOWN");
            if (e.key === "ArrowLeft") directions.push("LEFT");
            if (e.key === "ArrowRight") directions.push("RIGHT");

            if (directions.length > 0) {
                e.preventDefault();
                requestMove(directions);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [keyboardEnabled, requestMove]);

    return (
        <div className="h-screen w-screen bg-gray-900 flex items-center justify-center font-sans overflow-hidden">
            {/* Centered Card Container */}
            <div className="flex w-[920px] h-[560px] rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.7)] border border-gray-700">

                {/* Left side: The Map */}
                <div className="flex-1 relative bg-[#444] overflow-hidden border-r-2 border-gray-600 block">
                    {/* The actual map background locked strictly to taking up exactly the dimension of its container without cropping */}
                    <img
                        src={mapUrl}
                        alt="Game Map"
                        className="w-full h-full object-fill absolute inset-0 pointer-events-none"
                    />

                    {/* Game Area Wrapper */}
                    <div
                        className="absolute inset-0 w-full h-full pointer-events-none"
                    >
                        {/* Sprite is centered relative to its current tile visually using offset */}
                        <div
                            className="absolute pointer-events-none"
                            style={{
                                left: pixelPos.x,
                                top: pixelPos.y,
                                width: TILE_SIZE,
                                height: TILE_SIZE,
                            }}
                        >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <SpriteAnimator state={animState} facing={facing} size={64} />
                            </div>
                        </div>
                    </div>

                    {/* Back button overlay */}
                    <Link to="/map" className="absolute top-3 left-3 bg-white/90 px-3 py-1.5 rounded-md font-bold hover:bg-white z-10 shadow-md border border-gray-400 text-black text-xs pointer-events-auto">
                        ← Back to World Map
                    </Link>
                </div>

                {/* Right side: Controller & Info Panel */}
                <div className="w-[280px] h-full flex flex-col bg-[#c8c8c8] text-black shrink-0 relative z-10">

                    {/* Top Half: Message Box */}
                    <div className="bg-[#c3e8f8] flex-1 flex flex-col items-center justify-center p-6 border-b border-gray-400">
                        <p className="text-center font-extrabold text-[#111] text-[15px] whitespace-pre-wrap leading-snug">
                            {message}
                        </p>
                    </div>

                    {/* Bottom Half: Controller */}
                    <div className="h-[360px] p-4 flex flex-col items-center justify-center">

                        {/* D-Pad Container */}
                        <div className="grid grid-cols-3 grid-rows-3 gap-4 w-[180px] h-[180px] mb-8 mt-4">
                            {/* Top Left */}
                            <button className="flex items-center justify-center pointer-events-none" />
                            {/* Top */}
                            <button
                                className="flex items-center justify-center hover:scale-110 active:scale-95 transition-transform group"
                                onClick={() => requestMove(["UP"])}
                            >
                                <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[24px] border-b-gray-800 group-active:border-b-blue-600 transition-colors" />
                            </button>
                            {/* Top Right */}
                            <button className="flex items-center justify-center pointer-events-none" />

                            {/* Left */}
                            <button
                                className="flex items-center justify-center hover:scale-110 active:scale-95 transition-transform group"
                                onClick={() => requestMove(["LEFT"])}
                            >
                                <div className="w-0 h-0 border-y-[16px] border-y-transparent border-r-[24px] border-r-gray-800 group-active:border-r-blue-600 transition-colors" />
                            </button>

                            {/* Center D-Pad Block */}
                            <div className="flex items-center justify-center bg-gray-800 rounded-full w-4 h-4 m-auto" />

                            {/* Right */}
                            <button
                                className="flex items-center justify-center hover:scale-110 active:scale-95 transition-transform group"
                                onClick={() => requestMove(["RIGHT"])}
                            >
                                <div className="w-0 h-0 border-y-[16px] border-y-transparent border-l-[24px] border-l-gray-800 group-active:border-l-blue-600 transition-colors" />
                            </button>

                            {/* Bottom Left */}
                            <button className="flex items-center justify-center pointer-events-none" />
                            {/* Bottom */}
                            <button
                                className="flex items-center justify-center hover:scale-110 active:scale-95 transition-transform group"
                                onClick={() => requestMove(["DOWN"])}
                            >
                                <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[24px] border-t-gray-800 group-active:border-t-blue-600 transition-colors" />
                            </button>
                            {/* Bottom Right */}
                            <button className="flex items-center justify-center pointer-events-none" />
                        </div>

                        {/* Enable Keyboard Option */}
                        <label className="flex items-center gap-2 text-[13px] font-medium cursor-pointer text-black">
                            <input
                                type="checkbox"
                                checked={keyboardEnabled}
                                onChange={(e) => setKeyboardEnabled(e.target.checked)}
                                className="w-4 h-4 text-blue-600 bg-white border-gray-400 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                            />
                            Enable Keyboard
                        </label>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SingleMap;
