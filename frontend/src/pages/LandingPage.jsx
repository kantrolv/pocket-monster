import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black to-gray-900 text-white relative overflow-hidden">

            {/* Background Ambience */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://wallpapers.com/images/hd/pokemon-landscape-background-1920-x-1080-9289k2v50l0j8w7h.jpg')] bg-cover bg-center" />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60" />

            <div className="relative z-10 text-center container mx-auto px-4">

                {/* Animated Title */}
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8"
                >
                    <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-400 to-blue-600 drop-shadow-[0_0_15px_rgba(255,0,0,0.5)]">
                        POCKET MONSTER
                    </h1>
                    <p className="text-xl md:text-2xl mt-4 text-gray-300 font-light">
                        Your Adventure Begins Now
                    </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-col md:flex-row gap-6 justify-center items-center"
                >
                    <Link to="/signup" className="group">
                        <button className="btn btn-primary text-xl px-12 py-4 rounded-full relative overflow-hidden">
                            <span className="relative z-10">Start Adventure</span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </button>
                    </Link>

                    <Link to="/login" className="group">
                        <button className="btn btn-secondary text-xl px-12 py-4 rounded-full border-2 border-gray-600 hover:border-white transition-colors">
                            Resume Journey
                        </button>
                    </Link>
                </motion.div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-6 text-gray-500 text-sm z-10">
                &copy; 2024 Pocket Monster World
            </div>
        </div>
    );
};

export default LandingPage;
