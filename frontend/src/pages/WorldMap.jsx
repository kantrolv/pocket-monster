import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import GameMode from '../components/GameMode';
import MapLayout from '../components/MapLayout';
import { MovementControls } from '../components/MapLayout';
import './WorldMap.css';

const WorldMap = () => {
    const navigate = useNavigate();

    // We keep 5x5 chunks as in the original code, 25 chunks.
    const totalChunks = 25;
    const mapChunks = Array.from({ length: totalChunks }, (_, i) => i + 1);

    const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 50 }); // Center in percentages
    const [isKeyboardEnabled, setIsKeyboardEnabled] = useState(true);
    const [lastAction, setLastAction] = useState('Entered Coastal Region');
    const [currentTile, setCurrentTile] = useState('Path');

    // Movement configuration
    const moveStep = 5; // Move by 5% each time

    const handleMove = useCallback((direction) => {
        setPlayerPosition((prev) => {
            let newX = prev.x;
            let newY = prev.y;

            if (direction === 'up') newY = Math.max(0, prev.y - moveStep);
            if (direction === 'down') newY = Math.min(100, prev.y + moveStep);
            if (direction === 'left') newX = Math.max(0, prev.x - moveStep);
            if (direction === 'right') newX = Math.min(100, prev.x + moveStep);

            if (newX !== prev.x || newY !== prev.y) {
                setLastAction(`Moved ${direction} to (${newX}%, ${newY}%)`);

                // Extremely simple "terrain" simulation based on coordinates
                if (newX <= 30) setCurrentTile('Water');
                else if (newY >= 70) setCurrentTile('Forest');
                else if (newX >= 70) setCurrentTile('Tall Grass');
                else setCurrentTile('Path');
            }

            return { x: newX, y: newY };
        });
    }, []);

    useEffect(() => {
        if (!isKeyboardEnabled) return;

        const handleKeyDown = (e) => {
            if (['ArrowUp', 'w', 'W'].includes(e.key)) handleMove('up');
            if (['ArrowDown', 's', 'S'].includes(e.key)) handleMove('down');
            if (['ArrowLeft', 'a', 'A'].includes(e.key)) handleMove('left');
            if (['ArrowRight', 'd', 'D'].includes(e.key)) handleMove('right');
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isKeyboardEnabled, handleMove]);

    const toggleKeyboard = () => {
        setIsKeyboardEnabled(prev => {
            const next = !prev;
            setLastAction(`Keyboard controls ${next ? 'enabled' : 'disabled'}`);
            return next;
        });
    };

    return (
        <AnimatePresence>
            <GameMode
                regionName="Coastal Region"
                biome="Beach"
                playerCoordinate={`X:${playerPosition.x} Y:${playerPosition.y}`}
            >
                <MapLayout
                    isKeyboardEnabled={isKeyboardEnabled}
                    currentTile={currentTile}
                    encounterChance={currentTile === 'Tall Grass' ? 45 : (currentTile === 'Water' ? 25 : 5)}
                    lastAction={lastAction}
                    controls={
                        <MovementControls
                            onMove={handleMove}
                            toggleKeyboard={toggleKeyboard}
                            isKeyboardEnabled={isKeyboardEnabled}
                        />
                    }
                >
                    {/* Centered Map Wrapper */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="map-grid relative shadow-2xl rounded-2xl overflow-hidden bg-[#e0f2fe] border-4 border-white m-auto"
                        style={{
                            boxShadow: '0 20px 50px -12px rgba(14, 165, 233, 0.25)'
                        }}
                    >
                        {mapChunks.map(chunkNum => (
                            <div
                                key={chunkNum}
                                onClick={() => navigate(`/map/${chunkNum}`)}
                                className="map-chunk flex items-center justify-center bg-blue-50/50 text-blue-900/40 font-bold text-3xl cursor-pointer hover:ring-inset hover:ring-4 hover:ring-blue-400 transition-all z-20"
                                style={{
                                    backgroundImage: `url(/maps/map_${chunkNum}.png)`
                                }}
                            >
                                <span className="bg-white/70 backdrop-blur-md px-3 py-1 rounded-xl text-sm border border-white max-w-fit shadow-sm">{chunkNum}</span>
                            </div>
                        ))}

                        {/* Player Character */}
                        <motion.div
                            className="absolute w-6 h-6 md:w-8 md:h-8 bg-blue-500 rounded-full border-4 border-white z-30 flex items-center justify-center"
                            animate={{
                                left: `${playerPosition.x}%`,
                                top: `${playerPosition.y}%`
                            }}
                            transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 30
                            }}
                            style={{
                                transform: 'translate(-50%, -50%)',
                                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.5), inset 0 -2px 4px rgba(0,0,0,0.2)'
                            }}
                            initial={false}
                        >
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </motion.div>
                    </motion.div>
                </MapLayout>
            </GameMode>
        </AnimatePresence>
    );
};

export default WorldMap;
