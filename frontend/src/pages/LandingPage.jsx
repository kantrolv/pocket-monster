import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/Button';

const LandingPage = () => {
    return (
        <div className="page-layout text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px] -z-10"></div>
            {/* Decorative Background Elements */}
            <div className="absolute top-[10%] left-[5%] w-32 h-32 bg-yellow-200 rounded-full blur-3xl opacity-60 animate-float"></div>
            <div className="absolute top-[20%] right-[10%] w-24 h-24 bg-blue-200 rounded-full blur-2xl opacity-50 animate-float" style={{ animationDelay: '2s' }}></div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="z-10 max-w-2xl px-6"
            >
                <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-800 tracking-tight">
                    Pocket <span className="text-[var(--beach-ocean)]">Adventure</span>
                </h1>
                <p className="text-xl text-gray-600 mb-10 font-medium">
                    The sun is shining, the ocean is calling. <br /> Your journey to become a champion begins today.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/signup">
                        <Button variant="primary" className="text-lg px-8 py-4 w-full sm:w-auto">
                            Start Your Journey
                        </Button>
                    </Link>
                    <Link to="/login">
                        <Button variant="secondary" className="text-lg px-8 py-4 w-full sm:w-auto">
                            Resume Adventure
                        </Button>
                    </Link>
                </div>
            </motion.div>

            <div className="absolute bottom-4 text-sm text-gray-400">
                © 2024 Pocket Adventure. Made with ☀️ and 🌊
            </div>
        </div>
    );
};

export default LandingPage;
