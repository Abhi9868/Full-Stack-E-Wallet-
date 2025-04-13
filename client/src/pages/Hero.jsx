import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="min-h-screen bg-gradient-to-tr from-purple-100 via-white to-blue-200 flex flex-col items-center justify-center px-4 py-20 text-center">
            <motion.h1
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight drop-shadow-sm"
            >
                Welcome to <span className="text-blue-700">SmartWallet</span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 max-w-2xl"
            >
                Simplify your finances with seamless money transfers and a sleek, modern dashboard built for your digital lifestyle.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
            >
                <Link
                    to="/wallet"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-medium shadow-md transition-all duration-300"
                >
                    Go to Wallet
                </Link>
            </motion.div>

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.3, delay: 0.9 }}
                className="mt-16 w-full max-w-md"
            >
                <img
                    src="/logo.png"
                    alt="Wallet Illustration"
                    className="w-full mx-auto rounded-lg shadow-md"
                />
            </motion.div>
        </div>
    );
};

export default Hero;
