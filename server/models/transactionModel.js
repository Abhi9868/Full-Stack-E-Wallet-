import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    amount: Number,
    status: {
        type: String,
        enum: ['success', 'failed'],
        default: 'success',
    },
    type: {
        type: String,
        enum: ['add', 'withdraw', 'transfer'],
    },
    transactionId: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
