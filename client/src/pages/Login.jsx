import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';
import { motion } from 'framer-motion';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('/auth/login', form);
            const res = await axios.get('/auth/profile');
            setUser(res.data);
            navigate('/wallet');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg"
        >
            <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Login</h2>
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
                    Login
                </motion.button>
            </form>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="text-center mt-4 text-gray-600"
            >
                <p className="text-sm">Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Sign up</a></p>
            </motion.div>
        </motion.div>
    );
};

export default Login;
