import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import walletRoutes from './routes/walletRoutes.js';
import kycRoutes from './routes/kycRoutes.js';
import cors from 'cors';

dotenv.config();
const app = express();

connectDB();

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost',
    "https://full-stack-e-wallet-lgur.vercel.app",
    'https://b85g2fl7-5174.inc1.devtunnels.ms'
];
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/health", (req, res) => {
    res.status(200).json({ message: "Server is healthy" });
});

app.use('/api/auth', authRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/kyc', kycRoutes);

app.get('/', (req, res) => res.send('E-Wallet Auth Server Running'));

export default app;
