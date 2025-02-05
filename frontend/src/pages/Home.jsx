import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PieChart } from '../components/Charts'; // Import the Pie and Bar Chart components

const Home = () => {
  const [transactions, setTransactions] = useState([
    { _id: 1, description: 'Salary', type: 'Income', amount: 5000 },
    { _id: 2, description: 'Groceries', type: 'Expense', amount: 200 },
    { _id: 3, description: 'Rent', type: 'Expense', amount: 1000 },
    { _id: 4, description: 'Freelance Work', type: 'Income', amount: 800 },
  ]);

  // Demo Pie chart data
  const pieData = {
    labels: ['Income', 'Expenses', 'Savings'],
    datasets: [
      {
        data: [5800, 1350, 4450], // Income, Expenses, Savings
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
      },
    ],
  };



  // Demo Transactions list (for Transaction Card)
  const transactionsList = transactions.map((transaction) => (
    <div
      key={transaction._id}
      className={`flex justify-between items-center p-4 rounded-md ${
        transaction.type === 'Income' ? 'bg-green-50' : 'bg-red-50'
      }`}
    >
      <div>
        <p className="text-gray-600">{transaction.description}</p>
        <p className="text-sm text-gray-500">{transaction.type}</p>
      </div>
      <span
        className={`text-xl font-bold ${
          transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {transaction.type === 'Income' ? '+' : '-'} ₹{transaction.amount}
      </span>
    </div>
  ));

  // Static goal data for the Goals Card (display top 3 goals)
  const goals = [
    { id: 2, name: 'Emergency Fund', target: 10000, saved: 4500 },  
    { id: 5, name: 'House Down Payment', target: 50000, saved: 20000 },
  ];

  const displayedGoals = goals.slice(0, 3); // Display top 3 goals

  const progress = (goal) => Math.min((goal.saved / goal.target) * 100, 100);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-orange-500 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to hDekho</h1>
          <p className="text-lg">Manage your finances and track your progress effortlessly.</p>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Dashboard Card with Pie Chart */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">Dashboard</h3>
                <p className="text-gray-600">Get an overview of your financial status and transactions.</p>
                <div className="mt-6">
                  <PieChart data={pieData} options={{ responsive: true }} />
                </div>
                <Link
                  to="/dashboard"
                  className="mt-4 inline-block bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                >
                  Go to Dashboard
                </Link>
              </div>
            </div>

            {/* Transactions Card with Demo List */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">Transactions</h3>
                <p className="text-gray-600">View all your transactions and track your spending.</p>
                <div className="space-y-4 mt-6">{transactionsList}</div>
                <Link
                  to="/transactions"
                  className="mt-4 inline-block bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                >
                  View Transactions
                </Link>
              </div>
            </div>

            {/* Goals Card displaying Top 3 Goals */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">Goals</h3>
                <p className="text-gray-600">Track your savings goals</p>
                <div className="space-y-6 mt-6">
                  {displayedGoals.map((goal) => {
                    const goalProgress = progress(goal);
                    return (
                      <div key={goal.id} className="p-4 rounded-md bg-gray-50 shadow-md">
                        <h3 className="text-lg font-semibold text-gray-700">{goal.name}</h3>
                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                          <span>Saved: <span className="text-green-600 font-bold">${goal.saved}</span></span>
                          <span>Target: <span className="text-blue-600 font-bold">${goal.target}</span></span>
                        </div>
                        <div className="w-full bg-gray-200 h-4 mt-3 rounded-md">
                          <div
                            className={`h-full ${goalProgress >= 100 ? 'bg-green-500' : 'bg-blue-500'} rounded-md`}
                            style={{ width: `${goalProgress}%` }}
                          ></div>
                        </div>
                        <p className="mt-2 text-sm text-gray-600">
                          {goalProgress >= 100 ? '🎉 Goal Achieved!' : `Progress: ${goalProgress.toFixed(1)}%`}
                        </p>
                      </div>
                    );
                  })}
                  <Link
                  to="/goals"
                  className="mt-4 inline-block bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                >
                  View Goals
                </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2025 hDekho. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
