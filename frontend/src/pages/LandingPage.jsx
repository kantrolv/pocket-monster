import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './LandingPage.css'; // Import the CSS file

const LandingPage = () => {
    return (
        <div className="landing-container">
            {/* Background Video Layer */}
            {/* Main Content Card (Glass Box) */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="content-wrapper"
            >
                <div className="glass-card">
                    {/* 
                        Video Background (Cozy Fireplace) 
                        Placed INSIDE the glass card as requested.
                    */}
                    <div className="video-background">
                        <img
                            src="https://i.pinimg.com/originals/67/87/56/678756a8c5d02ef8186ab2e4a1228ce5.gif"
                            alt="Cozy Pokemon Fireplace"
                        />
                        <div className="video-overlay"></div>
                    </div>

                    {/* Content on top of video */}
                    <div style={{ position: 'relative', zIndex: 10 }}>
                        {/* Subtle Glow Effect */}
                        <div className="glow-effect"></div>

                        <h1 className="landing-title">
                            Pocket <span className="highlight-text">Adventure</span>
                        </h1>

                        <p className="landing-subtitle">
                            The fire is warm, and the journey awaits. <br />
                            Catch, train, and become the champion you were destined to be.
                        </p>

                        <div className="button-group">
                            <Link to="/signup" className="btn-landing btn-landing-primary">
                                Start Your Journey
                            </Link>
                            <Link to="/login" className="btn-landing btn-landing-secondary">
                                Resume Adventure
                            </Link>
                        </div>

                        <div className="landing-footer">
                            <span>© 2024 Pocket Adventure</span>
                            <span className="footer-dot"></span>
                            <span>Made with ❤️ and 🔥</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LandingPage;
