import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Shield, Zap, LogOut } from 'lucide-react';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <div className="container">
                {/* Header */}
                <header className="flex justify-between items-center mb-12 border-b border-gray-800 pb-6">
                    <h1 className="text-2xl font-bold text-red-500 tracking-wider">POCKET MONSTER</h1>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </header>

                {/* Welcome Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Welcome, <span className="text-blue-500">{user.username}</span>!
                    </h2>
                    <p className="text-xl text-gray-400">
                        Your adventure will begin soon.
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {/* Card 1: Badges */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center hover:border-yellow-500/50 transition-colors"
                    >
                        <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-500">
                            <Shield size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Badges Verified</h3>
                        <p className="text-3xl font-mono text-white">{user.badges?.length || 0}</p>
                    </motion.div>

                    {/* Card 2: Pokemon */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center hover:border-red-500/50 transition-colors"
                    >
                        <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
                            <Zap size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Pokemon Caught</h3>
                        <p className="text-3xl font-mono text-white">{user.pokemon?.length || 0}</p>
                    </motion.div>

                    {/* Card 3: Profile */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center hover:border-blue-500/50 transition-colors"
                    >
                        <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-500">
                            <User size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Trainer Level</h3>
                        <p className="text-sm text-gray-500 mt-2">Coming Soon</p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
