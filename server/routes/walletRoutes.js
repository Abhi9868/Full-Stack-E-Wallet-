import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import kycCheck from '../middleware/kycMiddleware.js';
import {
    getWallet,
    addMoney,
    withdrawMoney,
    transferMoney,
    transactionHistory
} from '../controllers/walletController.js';

const router = express.Router();

router.use(authMiddleware);
router.use(kycCheck);

router.get('/', getWallet);
router.post('/add', addMoney);
router.post('/withdraw', withdrawMoney);
router.post('/transfer', transferMoney);
router.get('/transactions', transactionHistory);

export default router;
