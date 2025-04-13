import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';

const Header = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await axios.post('/auth/logout');
            setUser(null);
            navigate('/login');
        } catch {
            alert('Logout failed');
        }
    };

    return (
        <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
            <Link to="/" className="font-bold text-xl">E-Wallet</Link>
            <nav className="space-x-4">
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
        </header>
    );
};

export default Header;
