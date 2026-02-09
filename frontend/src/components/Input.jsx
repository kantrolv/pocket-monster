import { forwardRef } from 'react';

const Input = forwardRef(({ icon: Icon, className = '', ...props }, ref) => {
    return (
        <div className="relative">
            {Icon && (
                <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            )}
            <input
                ref={ref}
                className={`w-full py-4 ${Icon ? 'pl-12' : 'pl-5'} pr-4 rounded-xl text-gray-800 font-medium placeholder-gray-500 glass-input ${className}`}
                {...props}
            />
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
