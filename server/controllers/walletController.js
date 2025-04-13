import Transaction from '../models/transactionModel.js';
import { v4 as uuidv4 } from 'uuid';
import Wallet from '../models/walletModel.js';
import User from '../models/userModel.js';

export const getWallet = async (req, res) => {
    try {
        const wallet = await Wallet.findOne({ userId: req.userId });

        if (!wallet) {
            return res.status(404).json({ message: "Wallet not found" });
        }

        res.status(200).json(wallet);
    } catch (error) {
        console.error("Error fetching wallet:", error);
        res.status(500).json({ message: "Something went wrong while fetching wallet" });
    }
};


export const addMoney = async (req, res) => {
    const { amount } = req.body;
    if (amount <= 0) return res.status(400).json({ message: 'Invalid amount' });

    const wallet = await Wallet.findOneAndUpdate(
        { userId: req.userId },
        { $inc: { balance: amount } },
        { new: true }
    );

    await Transaction.create({
        from: req.userId,
        to: req.userId,
        amount,
        type: 'add',
        transactionId: uuidv4(),
    });

    res.json({ message: 'Money added', wallet });
};

export const withdrawMoney = async (req, res) => {
    const { amount } = req.body;
    if (amount <= 0) return res.status(400).json({ message: 'Invalid amount' });

    const wallet = await Wallet.findOne({ userId: req.userId });
    if (wallet.balance < amount) {
        return res.status(400).json({ message: 'Insufficient balance' });
    }

    wallet.balance -= amount;
    await wallet.save();

    await Transaction.create({
        from: req.userId,
        to: req.userId,
        amount,
        type: 'withdraw',
        transactionId: uuidv4(),
    });

    res.json({ message: 'Money withdrawn', wallet });
};

export const transferMoney = async (req, res) => {
    try {
        const { toEmail, amount } = req.body;

        if (!toEmail || !amount || amount <= 0) {
            return res.status(400).json({ message: 'Invalid transfer details' });
        }

        const fromUser = await User.findById(req.userId);
        if (!fromUser) {
            return res.status(401).json({ message: 'Sender not found' });
        }

        // 🚫 Prevent self-transfer
        if (fromUser.email === toEmail) {
            return res.status(400).json({ message: 'Cannot transfer to self' });
        }

        const fromWallet = await Wallet.findOne({ userId: req.userId });
        if (!fromWallet || fromWallet.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        const toUser = await User.findOne({ email: toEmail });
        if (!toUser) {
            return res.status(404).json({ message: 'Recipient not found' });
        }

        if (!toUser.kycStatus) {
            return res.status(403).json({ message: 'Recipient KYC not completed. Cannot transfer.' });
        }

        const toWallet = await Wallet.findOne({ userId: toUser._id });
        if (!toWallet) {
            return res.status(500).json({ message: 'Recipient wallet not found' });
        }

        // ✅ Proceed with transfer
        fromWallet.balance -= amount;
        toWallet.balance += amount;
        await fromWallet.save();
        await toWallet.save();

        await Transaction.create({
            from: req.userId,
            to: toUser._id,
            amount,
            type: 'transfer',
            transactionId: uuidv4(),
        });

        res.json({ message: 'Transfer successful' });

    } catch (error) {
        console.error('Transfer error:', error.message);
        res.status(500).json({ message: 'Transfer failed', error: error.message });
    }
};


export const transactionHistory = async (req, res) => {
    try {
        const txns = await Transaction.find({
            $or: [{ from: req.userId }, { to: req.userId }],
        })
            .sort({ createdAt: -1 })
            .populate('from', 'email phone')
            .populate('to', 'email phone');

        res.json(txns);
    } catch (error) {
        console.error('Transaction history error:', error.message);
        res.status(500).json({ message: 'Failed to fetch transaction history', error: error.message });
    }
};
