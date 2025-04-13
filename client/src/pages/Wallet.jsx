import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Wallet = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [addAmount, setAddAmount] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [transferAmount, setTransferAmount] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [transferToEmail, setTransferToEmail] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            fetchBalance();
            fetchTransactions();
            fetchAllUsers();
        }
    }, [user]);

    const fetchBalance = async () => {
        try {
            const res = await axios.get('/wallet');
            setBalance(res.data.balance);
        } catch (err) {
            console.error('Error fetching balance', err);
        }
    };

    const fetchTransactions = async () => {
        try {
            const res = await axios.get('/wallet/transactions');
            setTransactions(res.data);
        } catch (err) {
            console.error('Error fetching transactions', err);
        }
    };

    const fetchAllUsers = async () => {
        try {
            const res = await axios.get('/auth/users');
            setAllUsers(res.data);
        } catch (err) {
            console.error('Error fetching users', err);
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchInput(value);
        setTransferToEmail('');
        if (value.trim() === '') {
            setSuggestions([]);
            return;
        }
        const filtered = allUsers.filter(
            (u) =>
                (u.email.toLowerCase().includes(value.toLowerCase()) ||
                    u.phone.includes(value)) &&
                u.email !== user?.email
        );
        setSuggestions(filtered);
    };

    const handleSuggestionClick = (user) => {
        setTransferToEmail(user.email);
        setSearchInput(`${user.email} (${user.phone})`);
        setSuggestions([]);
    };

    const handleAddMoney = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/wallet/add', { amount: parseFloat(addAmount) });
            await fetchBalance();
            await fetchTransactions();
            toast.success('Money added successfully!');
            setAddAmount('');
        } catch (err) {
            toast.error('Failed to add money');
        } finally {
            setLoading(false);
        }
    };

    const handleWithdrawMoney = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/wallet/withdraw', { amount: parseFloat(withdrawAmount) });
            await fetchBalance();
            await fetchTransactions();
            toast.success('Money withdrawn successfully!');
            setWithdrawAmount('');
        } catch (err) {
            toast.error('Failed to withdraw money');
        } finally {
            setLoading(false);
        }
    };

    const handleTransfer = async (e) => {
        e.preventDefault();
        if (!transferToEmail) {
            toast.error('Please select a valid user from suggestions');
            return;
        }
        setLoading(true);
        try {
            await axios.post('/wallet/transfer', {
                amount: parseFloat(transferAmount),
                toEmail: transferToEmail,
            });
            await fetchBalance();
            await fetchTransactions();
            toast.success('Money transferred successfully!');
            setTransferAmount('');
            setSearchInput('');
            setTransferToEmail('');
        } catch (err) {
            toast.error('Transfer failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-6">Wallet</h2>

            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <div className="text-2xl font-semibold text-center text-green-600">
                    ₹ {balance}
                </div>
                <p className="text-center text-gray-500">Your current balance</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
                {/* Add Money */}
                <form onSubmit={handleAddMoney} className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Add Money</h3>
                    <input
                        type="number"
                        required
                        className="w-full border px-4 py-2 rounded mb-4"
                        placeholder="Enter amount"
                        value={addAmount}
                        onChange={(e) => setAddAmount(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? 'Adding...' : 'Add Money'}
                    </button>
                </form>

                {/* Transfer Money */}
                <form onSubmit={handleTransfer} className="bg-white p-6 rounded-lg shadow-md relative">
                    <h3 className="text-xl font-semibold mb-4">Transfer Money</h3>
                    <input
                        type="text"
                        required
                        className="w-full border px-4 py-2 rounded mb-2"
                        placeholder="Search by email or phone"
                        value={searchInput}
                        onChange={handleSearchChange}
                    />
                    {suggestions.length > 0 && (
                        <ul className="absolute bg-white border w-full rounded shadow z-10 max-h-40 overflow-y-auto">
                            {suggestions.map((u) => (
                                <li
                                    key={u._id}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleSuggestionClick(u)}
                                >
                                    {u.email} ({u.phone})
                                </li>
                            ))}
                        </ul>
                    )}
                    <input
                        type="number"
                        required
                        className="w-full border px-4 py-2 rounded mb-4 mt-2"
                        placeholder="Enter amount"
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                        disabled={loading}
                    >
                        {loading ? 'Transferring...' : 'Transfer Money'}
                    </button>
                </form>

                {/* Withdraw Money */}
                <form onSubmit={handleWithdrawMoney} className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Withdraw Money</h3>
                    <input
                        type="number"
                        required
                        className="w-full border px-4 py-2 rounded mb-4"
                        placeholder="Enter amount"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
                        disabled={loading}
                    >
                        {loading ? 'Withdrawing...' : 'Withdraw Money'}
                    </button>
                </form>
            </div>

            {/* Transaction History */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Transaction History</h3>
                <div className="space-y-3 max-h-72 overflow-y-auto">
                    {transactions.length === 0 ? (
                        <p className="text-gray-500">No transactions found.</p>
                    ) : (
                        transactions.map((txn) => (
                            <div key={txn._id} className="flex justify-between border-b pb-2 text-sm">
                                <span>
                                    {txn.type === 'add' && 'Added'}
                                    {txn.type === 'transfer' && 'Transferred'}
                                    {txn.type === 'withdraw' && 'Withdrew'} ₹{txn.amount}
                                </span>
                                <span className="text-gray-500">
                                    {new Date(txn.createdAt).toLocaleString()}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Wallet;
