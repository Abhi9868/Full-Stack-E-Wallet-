import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { updateKYC } from '../controllers/kycController.js';

const router = express.Router();

router.post('/update', authMiddleware, updateKYC);

export default router;
