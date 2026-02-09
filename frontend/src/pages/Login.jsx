import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Sun } from 'lucide-react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import './Login.css'; // Import the new CSS file

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login, error } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData.email, formData.password);
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="login-container">
            {/* Background elements */}
            <div className="login-bg-overlay"></div>
            <div className="login-bg-gradient"></div>

            <Card className="login-card p-0 !border-none !bg-transparent">
                {/* Left Panel - Image Area */}
                <div className="login-image-section">
                    {/* Blurry Backdrop */}
                    <div
                        className="login-image-bg"
                        style={{ backgroundImage: 'url("https://i.pinimg.com/1200x/3e/67/30/3e6730000ea1112fe931045e885a5c56.jpg")' }}
                    ></div>

                    {/* Main Image */}
                    <img
                        src="https://i.pinimg.com/1200x/3e/67/30/3e6730000ea1112fe931045e885a5c56.jpg"
                        alt="Pokemon"
                        className="login-pokemon-img"
                    />

                    <div className="login-badge">
                        Trainer Portal
                    </div>
                </div>

                {/* Right Panel - Form Area */}
                <div className="login-form-section">
                    <div className="login-header">
                        <div className="login-icon-wrapper">
                            <Sun className="login-icon" />
                        </div>
                        <h2 className="login-title">Welcome Back</h2>
                        <p className="login-subtitle">Your team is waiting for you.</p>
                    </div>

                    {error && (
                        <div className="login-error">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="login-form">
                        <Input
                            icon={Mail}
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            icon={Lock}
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        <Button type="submit" className="login-button btn-primary">
                            Log In <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </form>

                    <div className="login-footer">
                        <span className="login-footer-text">New around here?</span>
                        <Link to="/signup" className="login-link">
                            Create a Trainer Account
                        </Link>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Login;

