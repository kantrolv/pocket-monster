import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, Star } from 'lucide-react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import './Signup.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const { signup, error } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        try {
            await signup(formData.username, formData.email, formData.password);
            navigate('/login');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="signup-container">
            {/* Background elements */}
            <div className="signup-bg-overlay"></div>
            <div className="signup-bg-gradient"></div>

            <Card className="signup-card p-0 !border-none !bg-transparent">
                {/* Left Panel - Image Area */}
                <div className="signup-image-section">
                    {/* Blurry Backdrop */}
                    <div
                        className="signup-image-bg"
                        style={{ backgroundImage: 'url("https://i.pinimg.com/1200x/b9/07/0d/b9070df773a679cb1aee4e06bd3bc86c.jpg")' }}
                    ></div>

                    {/* Main Image */}
                    <img
                        src="https://i.pinimg.com/1200x/b9/07/0d/b9070df773a679cb1aee4e06bd3bc86c.jpg"
                        alt="Sleeping Pokemon"
                        className="signup-pokemon-img"
                    />

                    <div className="signup-badge">
                        Join the Adventure
                    </div>
                </div>

                {/* Right Panel - Form Area */}
                <div className="signup-form-section">
                    <div className="signup-header">
                        <div className="signup-icon-wrapper">
                            <Star className="signup-icon" />
                        </div>
                        <h2 className="signup-title">Become a Trainer</h2>
                        <p className="signup-subtitle">Start your master journey today.</p>
                    </div>

                    {error && (
                        <div className="signup-error">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="signup-form">
                        <Input
                            icon={User}
                            type="text"
                            name="username"
                            placeholder="Trainer Name"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />

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

                        <Input
                            icon={Lock}
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />

                        <Button type="submit" className="signup-button btn-primary">
                            Create Account <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </form>

                    <div className="signup-footer">
                        <span className="signup-footer-text">Already have an account?</span>
                        <Link to="/login" className="signup-link">
                            Log In Here
                        </Link>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Signup;

