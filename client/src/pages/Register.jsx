import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { motion } from 'framer-motion';

const Register = () => {
    const [form, setForm] = useState({ email: '', phone: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('/auth/register', form);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg"
        >
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Register</h2>
            {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
                <motion.input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    className="w-full border-2 border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    onChange={handleChange}
                    whileHover={{ scale: 1.02 }}
                    whileFocus={{ scale: 1.02, borderColor: '#4CAF50', boxShadow: '0 0 10px rgba(76, 175, 80, 0.5)' }}
                />
                <motion.input
                    name="phone"
                    type="text"
                    placeholder="Phone"
                    required
                    className="w-full border-2 border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    onChange={handleChange}
                    whileHover={{ scale: 1.02 }}
                    whileFocus={{ scale: 1.02, borderColor: '#4CAF50', boxShadow: '0 0 10px rgba(76, 175, 80, 0.5)' }}
                />
                <motion.input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    className="w-full border-2 border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    onChange={handleChange}
                    whileHover={{ scale: 1.02 }}
                    whileFocus={{ scale: 1.02, borderColor: '#4CAF50', boxShadow: '0 0 10px rgba(76, 175, 80, 0.5)' }}
                />
                <motion.button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Register
                </motion.button>
            </form>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="text-center mt-4 text-gray-600"
            >
                <p className="text-sm">Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a></p>
            </motion.div>
        </motion.div>
    );
};

export default Register;
