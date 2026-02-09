import { motion } from 'framer-motion';

const Card = ({ children, className = '', variant = 'glass', ...props }) => {
    const baseClasses = "rounded-[24px] transition-all duration-300";
    const variants = {
        default: "bg-white shadow-[var(--shadow-soft)] border border-gray-50",
        glass: "glass-panel"
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`${baseClasses} ${variants[variant] || variants.default} ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
