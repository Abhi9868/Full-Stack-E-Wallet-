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
    'https://b85g2fl7-5174.inc1.devtunnels.ms'
];
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/kyc', kycRoutes);

app.get('/', (req, res) => res.send('E-Wallet Auth Server Running'));

export default app;
