import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MapPreview = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-8 w-full">
            <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                <MapPin className="text-blue-500 w-5 h-5" />
                Current Location
            </h2>

            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 bg-blue-50/50 rounded-xl p-4 border border-blue-100 flex flex-col justify-between">
                    <div>
                        <h3 className="text-2xl font-black text-gray-800 mb-1">Coastal Region</h3>
                        <p className="text-blue-600 font-bold mb-4">Route 1 - Sandy Shores</p>

                        <div className="space-y-2 mb-6 text-sm">
                            <div className="flex justify-between items-center bg-white/60 px-3 py-2 rounded-lg">
                                <span className="text-gray-500 font-semibold">Coordinates</span>
                                <span className="text-gray-800 font-mono font-bold">X: 50, Y: 50</span>
                            </div>
                            <div className="flex justify-between items-center bg-white/60 px-3 py-2 rounded-lg">
                                <span className="text-gray-500 font-semibold">Time</span>
                                <span className="text-gray-800 font-bold">Afternoon</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/map')}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
                    >
                        <Navigation className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        Enter Map
                    </button>
                </div>

                <div className="w-full md:w-48 h-48 rounded-xl overflow-hidden shadow-inner border-2 border-white relative group cursor-pointer" onClick={() => navigate('/map')}>
                    <img
                        src="/maps/map_1.png"
                        alt="Map Preview"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                            e.target.src = 'https://placehold.co/400x400/87CEEB/FFFFFF?text=Map+Preview'
                        }}
                    />
                    <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors duration-300"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-md animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};

export default MapPreview;
