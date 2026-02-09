import { motion } from 'framer-motion';

const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
    const baseStyles = "px-6 py-3 rounded-2xl font-bold transition-all duration-200 flex items-center justify-center gap-2";

    const variants = {
        primary: "bg-[var(--beach-ocean)] text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:bg-[#0069a8]",
        secondary: "bg-transparent border-2 border-[var(--beach-ocean)] text-[var(--beach-ocean)] hover:bg-blue-50",
        disabled: "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
    };

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            className={`${baseStyles} ${variants[props.disabled ? 'disabled' : variant]} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
