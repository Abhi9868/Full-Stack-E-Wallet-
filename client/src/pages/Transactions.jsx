import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Transactions = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (!user) return navigate('/login');
    fetchTransactions();
  }, [user]);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get('/wallet/transactions');
      setTransactions(res.data);
    } catch (err) {
      console.error('Failed to fetch transactions:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Transaction History</h2>

      <div className="border border-gray-300 rounded-lg overflow-hidden h-[70vh] mb-10 pb-4">
        <div className="overflow-x-auto w-full h-full">
          <div className="min-w-[800px] max-h-full overflow-y-auto">
            <table className="min-w-full bg-white text-sm text-left">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3">Txn ID</th>
                  <th className="px-6 py-3">From</th>
                  <th className="px-6 py-3">To</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-gray-500">
                      No transactions yet.
                    </td>
                  </tr>
                ) : (
                  transactions.map((txn) => (
                    <tr
                      key={txn._id}
                      className="hover:bg-gray-50 transition duration-150"
                    >
                      <td className="px-6 py-4 text-xs font-mono">
                        {txn.transactionId}
                      </td>
                      <td className="px-6 py-4">
                        <div>{txn.from.email}</div>
                        <div className="text-xs text-gray-500">
                          {txn.from.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>{txn.to.email}</div>
                        <div className="text-xs text-gray-500">
                          {txn.to.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 capitalize">{txn.type}</td>
                      <td className="px-6 py-4 text-green-600 font-semibold">
                        ₹ {txn.amount}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-medium ${txn.status === 'success'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                            }`}
                        >
                          {txn.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-500">
                        {new Date(txn.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
