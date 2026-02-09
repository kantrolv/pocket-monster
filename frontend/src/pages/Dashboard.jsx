import { useAuth } from '../context/AuthContext';
import { LogOut, Map, Award, User } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/Button';

const Dashboard = () => {
    const { user, logout } = useAuth();

    if (!user) {
        return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div></div>;
    }

    return (
        <div className="min-h-screen p-6 relative">
            <div className="fixed inset-0 bg-white/30 backdrop-blur-[2px] -z-10"></div>
            <nav className="max-w-6xl mx-auto flex justify-between items-center mb-12 py-4 relative z-10">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">P</div>
                    <span className="font-bold text-gray-800 text-lg">Pocket Monster</span>
                </div>
                <button
                    onClick={logout}
                    className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors font-bold text-sm bg-white/50 px-4 py-2 rounded-full border border-white/50"
                >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                </button>
            </nav>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl mx-auto"
            >
                {/* Header */}
                <Card className="mb-10 p-10 flex flex-col md:flex-row justify-between items-center glass-panel !bg-white/60">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
                            Welcome, <span className="text-[var(--beach-ocean)]">{user?.username}</span>!
                        </h1>
                        <p className="text-xl text-gray-600 mt-2 font-medium">Your journey continues here.</p>
                    </div>
                    <div className="mt-6 md:mt-0">
                        <div className="bg-white/80 px-6 py-3 rounded-2xl flex items-center shadow-sm border border-white/50">
                            <span className="text-blue-600 font-bold mr-2">Level</span>
                            <span className="text-3xl font-black text-blue-800">1</span>
                        </div>
                    </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {/* Stats Card */}
                    <Card className="p-8 glass-panel !bg-white/70">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                            <div className="bg-purple-100 p-2.5 rounded-xl mr-3 shadow-sm">
                                <Award className="w-6 h-6 text-purple-600" />
                            </div>
                            Your Progress
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/60 p-5 rounded-2xl border border-white/50 shadow-sm">
                                <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Caught</p>
                                <p className="text-3xl font-black text-gray-800 mt-1">{user?.pokemon?.length || 0}</p>
                            </div>
                            <div className="bg-white/60 p-5 rounded-2xl border border-white/50 shadow-sm">
                                <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Badges</p>
                                <p className="text-3xl font-black text-gray-800 mt-1">{user?.badges?.length || 0}</p>
                            </div>
                        </div>
                    </Card>

                    {/* Action Card */}
                    <Card className="p-8 glass-panel !bg-white/70">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                            <div className="bg-green-100 p-2.5 rounded-xl mr-3 shadow-sm">
                                <Map className="w-6 h-6 text-green-600" />
                            </div>
                            Quick Actions
                        </h2>
                        <p className="text-gray-600 mb-8 leading-relaxed font-medium">
                            The Wild Area is teeming with Pokémon. Are you ready to catch them all?
                        </p>
                        <Button className="w-full py-4 text-lg shadow-lg hover:shadow-xl">
                            Explore Wild Area
                        </Button>
                    </Card>
                </div>
            </motion.div>
        </div>
    );
};

export default Dashboard;
