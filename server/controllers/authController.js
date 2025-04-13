import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import Wallet from '../models/walletModel.js';

const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

export const register = async (req, res) => {
    const { email, phone, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ email, phone, password });

    // create wallet for user
    await Wallet.create({ userId: user._id });

    const token = createToken(user._id);
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
        message: 'User registered successfully',
        user: { email: user.email, phone: user.phone, kycStatus: user.kycStatus },
    });
};



export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = createToken(user._id);
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
        message: 'Login successful',
        user: { email: user.email, phone: user.phone, kycStatus: user.kycStatus },
    });
};

export const logout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
};

export const profile = async (req, res) => {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
};

export const getAllUsers = async (req, res) => {
    const users = await User.find().select('-password');
    res.json(users);
}