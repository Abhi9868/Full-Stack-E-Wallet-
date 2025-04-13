
import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    balance: { type: Number, default: 0 }
});
const Wallet = mongoose.model('Wallet', walletSchema);
export default Wallet;