import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
    return (
        <div className={`bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 hover:border-light-primary dark:hover:border-dark-primary ${className}`}>
            {children}
        </div>
    );
};