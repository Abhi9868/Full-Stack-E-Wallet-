import { createContext, useContext, useEffect, useState } from 'react';
import axios from '../api/axios';

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Function to fetch the user's profile
    const getProfile = async () => {
        try {
            const res = await axios.get('/auth/profile');
            setUser(res.data); // Save the user data to state
        } catch (err) {
            setUser(null); // Handle errors by setting user to null
        }
    };

    // Load the user profile on app start and check localStorage for user data
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user')); // Check for user data in localStorage
        if (storedUser) {
            setUser(storedUser);
        } else {
            getProfile(); // Fetch profile if not found in localStorage
        }
    }, []);

    // Save the user in localStorage whenever it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user)); // Store user data in localStorage
        }
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for accessing the auth context
export const useAuth = () => useContext(AuthContext);
