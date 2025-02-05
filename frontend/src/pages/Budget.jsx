import React, { useContext, useState } from 'react';
import { TransactionContext } from "../context/TransactionContext.jsx";
import { axiosInstance } from '../lib/axios.js';
const Budget = () => {
  
  const { processedData, month, year, setYear, isLoading } = useContext(TransactionContext);
  // axiosInstance().post() // for creating a new bu
  // Sample budget data
  const [budget, setBudget] = useState({
    total: 10000, // Fixed total budget
    categories: [
      { id: 1, name: 'Rent', amount: 3000, spent: 2500 },
      { id: 2, name: 'Food', amount: 1500, spent: 1200 },
      { id: 3, name: 'Transportation', amount: 800, spent: 500 },
      { id: 4, name: 'Entertainment', amount: 600, spent: 400 },
      { id: 5, name: 'Savings', amount: 2000, spent: 1500 },
    ],
  });

  // State for new expense form
  const [newExpense, setNewExpense] = useState({
    category: 'Food',
    amount: '',
    description: '',
  });

  // Handle budget update for a category
  const handleUpdateCategory = (id, newAmount) => {
    setBudget({
      ...budget,
      categories: budget.categories.map((category) =>
        category.id === id ? { ...category, amount: newAmount } : category
      ),
    });
  };

  // Handle adding new expense
  const handleAddExpense = (e) => {
    e.preventDefault();
    const categoryIndex = budget.categories.findIndex((cat) => cat.name === newExpense.category);
    const updatedCategories = [...budget.categories];
    updatedCategories[categoryIndex].spent += parseFloat(newExpense.amount);

    setBudget({
      ...budget,
      categories: updatedCategories,
    });

    setNewExpense({ category: 'Food', amount: '', description: '' }); // Reset form
  };

  // Calculate the total spent by summing up all spent amounts in categories
  const totalSpent = budget.categories.reduce((acc, category) => acc + category.spent, 0);

  // Total remaining is the difference between total budget and total spent
  const totalRemaining = budget.total - totalSpent;

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-orange-500 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Budget</h1>
          <p className="text-lg">Track and manage your budget</p>
        </div>
      </header>

      {/* Main Budget Content */}
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Budget Overview Section */}
          <section className="bg-white shadow-lg rounded-lg p-6 mb-16">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Budget Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {/* Total Budget */}
              <div className="bg-green-100 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Total Budget</h3>
                <p className="text-3xl font-bold text-green-600">${budget.total}</p>
              </div>

              {/* Total Spent */}
              <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Total Spent</h3>
                <p className="text-3xl font-bold text-yellow-600">${totalSpent}</p>
              </div>

              {/* Total Remaining */}
              <div className="bg-red-100 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Total Remaining</h3>
                <p className="text-3xl font-bold text-red-600">${totalRemaining}</p>
              </div>
            </div>
          </section>

          {/* Budget Categories Section */}
          <section className="bg-white shadow-lg rounded-lg p-6 mb-16">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Budget Categories</h2>
            <div className="space-y-4">
              {budget.categories.map((category) => (
                <div
                  key={category.id}
                  className="flex justify-between items-center p-4 rounded-md bg-gray-50"
                >
                  <div>
                    <p className="text-gray-600">{category.name}</p>
                    <p className="text-sm text-gray-500">Spent: 
                      <span className="text-red-600 font-bold"> ${category.spent}</span>
                    </p>
                  </div>
                  <div>
                    <input
                      type="number"
                      value={category.amount}
                      onChange={(e) => handleUpdateCategory(category.id, e.target.value)}
                      className="w-32 p-2 border border-gray-300 rounded-md text-right"
                    />
                    <span className="ml-2 text-gray-600">Budgeted</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Add New Expense Form */}
          <section className="bg-white shadow-lg rounded-lg p-6 mb-16">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Expense</h2>
            <form onSubmit={handleAddExpense} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Category */}
              <div>
                <label className="block text-gray-600 font-medium">Category</label>
                <select
                  value={newExpense.category}
                  onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                >
                  {budget.categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-gray-600 font-medium">Amount</label>
                <input
                  type="number"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                  placeholder="Enter amount"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-600 font-medium">Description</label>
                <input
                  type="text"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                  placeholder="Enter description"
                  required
                />
              </div>
            </form>
            <button
              type="submit"
              className="mt-6 bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
            >
              Add Expense
            </button>
          </section>

          {/* Footer Section */}
          <footer className="bg-gray-800 text-white py-6">
            <div className="max-w-7xl mx-auto text-center">
              <p>&copy; 2025 hDekho. All Rights Reserved.</p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Budget;
