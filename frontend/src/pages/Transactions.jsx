import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../lib/axios';
import { fetchTransactions } from '../utils/fetchTransaction.js';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    description: '',
    amount: '',
    type: 'Income',
  });


  // Fetch transactions when the component mounts
  useEffect(() => {
    const getTransactions = async () => {
      const data = await fetchTransactions();
      console.log(data)
      setTransactions(data); // Update state with fetched data
    };

    getTransactions();
  }, []);

  // Handle adding new transaction
  const handleAddTransaction = async (e) => {
    e.preventDefault();
    if (newTransaction.description && newTransaction.amount) {
      try {
        const response = await axiosInstance().post('/transactions/create', newTransaction, {
          withCredentials: true, // Ensure cookie authentication
        });
        setTransactions([response.data.transaction, ...transactions]); // Add the new transaction
        setNewTransaction({ description: '', amount: '', type: 'Income' }); // Reset the form
      } catch (error) {
        console.error("Error adding transaction:", error);
      }
    }
  };

  // Fetch transactions when the component mounts
  useEffect(() => {
    fetchTransactions();
    console.log(transactions)
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-orange-500 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Transactions</h1>
          <p className="text-lg">View and manage your financial transactions</p>
        </div>
      </header>

      {/* Main Transactions Content */}
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Add Transaction Form */}
          <section className="bg-white p-6 rounded-lg shadow-lg mb-16">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Transaction</h2>
            <form onSubmit={handleAddTransaction}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Description */}
                <div>
                  <label className="block text-gray-600 font-medium">Description</label>
                  <input
                    type="text"
                    value={newTransaction.description}
                    onChange={(e) =>
                      setNewTransaction({ ...newTransaction, description: e.target.value })
                    }
                    className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter description"
                    required
                  />
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-gray-600 font-medium">Amount</label>
                  <input
                    type="number"
                    value={newTransaction.amount}
                    onChange={(e) =>
                      setNewTransaction({ ...newTransaction, amount: e.target.value })
                    }
                    className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter amount"
                    required
                  />
                </div>

                {/* Type */}
                <div>
                  <label className="block text-gray-600 font-medium">Type</label>
                  <select
                    value={newTransaction.type}
                    onChange={(e) =>
                      setNewTransaction({ ...newTransaction, type: e.target.value })
                    }
                    className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="mt-6 inline-block bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 focus:outline-none"
              >
                Add Transaction
              </button>
            </form>
          </section>

          {/* Transactions List */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recent Transactions</h2>
            <div className="space-y-4">
              {transactions.map((transaction) => {
                const formattedDate = new Date(transaction.date).toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                });

                const formattedTime = new Date(transaction.date).toLocaleTimeString('en-IN', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                });

                return (
                  <div
                    key={transaction._id}
                    className={`flex justify-between items-center p-4 rounded-md ${transaction.type === 'Income' ? 'bg-green-50' : 'bg-red-50'
                      }`}
                  >
                    <div>
                      <p className="text-gray-600 font-medium">{transaction.description}</p>
                      <p className="text-sm text-gray-500">{transaction.type}</p>
                      <p className="text-xs text-gray-400">
                        {formattedDate} • {formattedTime}
                      </p>
                    </div>
                    <span
                      className={`text-xl font-bold ${transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'
                        }`}
                    >
                      {transaction.type === 'Income' ? '+' : '-'} ₹{transaction.amount}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2025 hDekho. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};
export default Transactions;
