import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const Header = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const logout = async () => {
        try {
            await axios.post('/auth/logout');
            setUser(null);
            navigate('/login');
        } catch {
            alert('Logout failed');
        }
    };

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className="bg-gray-900 text-white p-4 flex justify-between items-center relative z-100">
            <Link to="/" className="font-bold text-xl">E-Wallet</Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex space-x-4 items-center">
                {user ? (
                    <>
                        <Link to="/wallet">Wallet</Link>
                        <Link to="/transactions">Transactions</Link>
                        <Link to="/profile">Profile</Link>
                        <button onClick={logout} className="bg-red-500 px-3 py-1 rounded text-sm">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav>

            {/* Hamburger icon */}
            <div className="md:hidden">
                <button onClick={toggleMenu}>
                    {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="absolute top-full right-0 w-full bg-gray-800 flex flex-col items-center py-4 space-y-3 z-10 md:hidden">
                    {user ? (
                        <>
                            <Link to="/wallet" onClick={toggleMenu}>Wallet</Link>
                            <Link to="/transactions" onClick={toggleMenu}>Transactions</Link>
                            <Link to="/profile" onClick={toggleMenu}>Profile</Link>
                            <button
                                onClick={() => {
                                    logout();
                                    toggleMenu();
                                }}
                                className="bg-red-500 px-4 py-2 rounded text-sm"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" onClick={toggleMenu}>Login</Link>
                            <Link to="/register" onClick={toggleMenu}>Register</Link>
                        </>
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;
