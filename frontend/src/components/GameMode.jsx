import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GameMode = ({ children, regionName, playerCoordinate, biome }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-[#eef2f5] overflow-hidden flex flex-col font-sans z-50"
        >
            {/* Minimal Top Bar */}
            <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm z-50">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-bold bg-white hover:bg-blue-50 px-4 py-2 rounded-full border border-gray-200 shadow-sm"
                >
                    <ArrowLeft size={18} />
                    <span>Back</span>
                </button>

                <div className="flex flex-col items-center">
                    <h1 className="text-xl font-black text-gray-800 tracking-tight">{regionName}</h1>
                    <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">{biome} Biome</span>
                </div>

                <div className="flex items-center gap-4 bg-white px-4 py-1.5 rounded-full border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-blue-500" />
                        <span className="text-sm font-bold text-gray-700 font-mono">{playerCoordinate}</span>
                    </div>
                </div>
            </div>

            {/* Main Game Area */}
            <div className="flex-1 relative bg-gradient-to-b from-[#eef2f5] to-[#d8e3eb] flex items-center justify-center p-4 md:p-8 overflow-hidden">
                {children}
            </div>
        </motion.div>
    );
};

export default GameMode;
