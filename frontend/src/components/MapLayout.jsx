import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Info, AlertTriangle, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Keyboard } from 'lucide-react';

export const MovementControls = ({ onMove, toggleKeyboard, isKeyboardEnabled }) => {
    return (
        <div className="bg-white/90 backdrop-blur-sm p-3 rounded-[24px] shadow-lg border border-white flex flex-col items-center gap-2">
            <button
                onClick={() => onMove('up')}
                className="w-12 h-12 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-600 rounded-full flex items-center justify-center transition-colors active:scale-95"
            >
                <ArrowUp size={24} />
            </button>
            <div className="flex gap-2">
                <button
                    onClick={() => onMove('left')}
                    className="w-12 h-12 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-600 rounded-full flex items-center justify-center transition-colors active:scale-95"
                >
                    <ArrowLeft size={24} />
                </button>
                <button
                    onClick={() => toggleKeyboard()}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors active:scale-95 ${isKeyboardEnabled ? 'bg-blue-500 text-white shadow-md' : 'bg-gray-100 text-gray-500'}`}
                >
                    <Keyboard size={20} />
                </button>
                <button
                    onClick={() => onMove('right')}
                    className="w-12 h-12 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-600 rounded-full flex items-center justify-center transition-colors active:scale-95"
                >
                    <ArrowRight size={24} />
                </button>
            </div>
            <button
                onClick={() => onMove('down')}
                className="w-12 h-12 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-600 rounded-full flex items-center justify-center transition-colors active:scale-95"
            >
                <ArrowDown size={24} />
            </button>
        </div>
    );
};

const MapLayout = ({ children, controls, currentTile, encounterChance, lastAction, isKeyboardEnabled }) => {
    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 items-center lg:items-start h-full max-h-[900px]">

            {/* Map Canvas Container */}
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex-[2] w-full min-h-[60vh] lg:min-h-full bg-white rounded-[24px] shadow-[0_12px_40px_rgba(0,0,0,0.08)] ring-4 ring-white/60 border border-blue-100 overflow-hidden relative flex flex-col"
            >
                {/* Map Grid area goes here */}
                <div className="flex-1 relative overflow-auto custom-scrollbar bg-[#f0f4f8] flex items-center justify-center">
                    {children}
                </div>

                {/* Mobile/Overlay Controls Context */}
                {controls && (
                    <div className="absolute bottom-6 right-6 z-30 lg:hidden">
                        {controls}
                    </div>
                )}
            </motion.div>

            {/* Right Side Panel */}
            <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full lg:w-80 flex flex-col gap-4 h-full"
            >
                {/* Context Card */}
                <div className="bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex-none shrink-0">
                    <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                        <Compass className="w-4 h-4" />
                        Area Scanner
                    </h3>

                    <div className="space-y-4">
                        <div className="bg-blue-50/70 rounded-2xl p-4 border border-blue-100/50">
                            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Current Terrain</span>
                            <span className="text-gray-800 font-extrabold text-lg capitalize flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-green-400 inline-block shadow-sm"></span>
                                {currentTile || 'Grassland'}
                            </span>
                        </div>

                        <div className="bg-orange-50/70 rounded-2xl p-4 border border-orange-100/50">
                            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Encounter Rate</span>
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-orange-500" />
                                <span className="text-gray-800 font-extrabold text-lg">{encounterChance || '15'}%</span>
                                <span className="text-xs font-bold text-orange-600 bg-orange-200/50 px-2 py-0.5 rounded-full ml-auto">Moderate</span>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Controls Active</span>
                            <div className="flex gap-2 text-xs font-bold text-gray-400">
                                <kbd className="bg-white px-2 py-1 rounded shadow-sm border border-gray-200 text-gray-700">W</kbd>
                                <kbd className="bg-white px-2 py-1 rounded shadow-sm border border-gray-200 text-gray-700">A</kbd>
                                <kbd className="bg-white px-2 py-1 rounded shadow-sm border border-gray-200 text-gray-700">S</kbd>
                                <kbd className="bg-white px-2 py-1 rounded shadow-sm border border-gray-200 text-gray-700">D</kbd>
                            </div>
                            <span className={`block mt-3 text-xs font-bold flex items-center gap-1 ${isKeyboardEnabled ? 'text-green-500' : 'text-gray-400'}`}>
                                <div className={`w-2 h-2 rounded-full ${isKeyboardEnabled ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
                                {isKeyboardEnabled ? 'Keyboard Link Established' : 'Keyboard Offline'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Event Log */}
                <div className="bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex-1 flex flex-col min-h-0">
                    <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2 shrink-0">
                        <Info className="w-4 h-4" />
                        Action Log
                    </h3>
                    <div className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100/50 text-sm font-medium text-gray-600 flex-1 overflow-y-auto custom-scrollbar space-y-3">
                        {lastAction ? (
                            <div className="animate-fade-in text-gray-800 relative pl-4 border-l-2 border-blue-500">
                                {lastAction}
                            </div>
                        ) : (
                            <div className="text-gray-400 italic text-center mt-4">Exploring region...</div>
                        )}
                        <div className="text-gray-400 text-xs mt-2 pl-4 border-l-2 border-gray-200">
                            Entered Coastal Region
                        </div>
                    </div>
                </div>

                {/* Desktop Controls (shown in panel on large screens) */}
                <div className="hidden lg:flex w-full justify-center">
                    {controls}
                </div>
            </motion.div>
        </div>
    );
};

export default MapLayout;
