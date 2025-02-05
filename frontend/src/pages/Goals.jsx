import React, { useState } from 'react';

const Goals = () => {
  // Sample goal data
  const [goals, setGoals] = useState([
    { id: 1, name: 'Save for Vacation', target: 5000, saved: 2000 },
    { id: 2, name: 'Emergency Fund', target: 10000, saved: 4500 },
    { id: 3, name: 'Buy a Car', target: 15000, saved: 7000 },
  ]);

  // State for new goal form
  const [newGoal, setNewGoal] = useState({ name: '', target: '', saved: '' });

  // Handle adding a new goal
  const handleAddGoal = (e) => {
    e.preventDefault();
    if (newGoal.name && newGoal.target && newGoal.saved !== '') {
      const updatedGoals = [
        ...goals,
        {
          id: goals.length + 1,
          name: newGoal.name,
          target: parseFloat(newGoal.target),
          saved: parseFloat(newGoal.saved),
        },
      ];
      setGoals(updatedGoals);
      setNewGoal({ name: '', target: '', saved: '' }); // Reset form
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-orange-500 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Financial Goals</h1>
          <p className="text-lg">Set and track your savings goals</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Add New Goal Form */}
          <section className="bg-white p-6 rounded-lg shadow-lg mb-16">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add a New Goal</h2>
            <form onSubmit={handleAddGoal} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              {/* Goal Name */}
              <div>
                <label className="block text-gray-600 font-medium">Goal Name</label>
                <input
                  type="text"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter goal name"
                  required
                />
              </div>

              {/* Target Amount */}
              <div>
                <label className="block text-gray-600 font-medium">Target Amount ($)</label>
                <input
                  type="number"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter target amount"
                  required
                />
              </div>

              {/* Amount Saved */}
              <div>
                <label className="block text-gray-600 font-medium">Amount Saved ($)</label>
                <input
                  type="number"
                  value={newGoal.saved}
                  onChange={(e) => setNewGoal({ ...newGoal, saved: e.target.value })}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter saved amount"
                  required
                />
              </div>

            </form>
            <button
              type="submit"
              className="mt-6 inline-block bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 focus:outline-none"
              onClick={handleAddGoal}
            >
              Add Goal
            </button>
          </section>

          {/* Goals List */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Goals</h2>
            <div className="space-y-6">
              {goals.map((goal) => {
                const progress = Math.min((goal.saved / goal.target) * 100, 100);
                return (
                  <div key={goal.id} className="p-4 rounded-md bg-gray-50 shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700">{goal.name}</h3>
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>Saved: <span className="text-green-600 font-bold">${goal.saved}</span></span>
                      <span>Target: <span className="text-blue-600 font-bold">${goal.target}</span></span>
                    </div>
                    <div className="w-full bg-gray-200 h-4 mt-3 rounded-md">
                      <div
                        className={`h-full ${
                          progress >= 100 ? 'bg-green-500' : 'bg-blue-500'
                        } rounded-md`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      {progress >= 100 ? '🎉 Goal Achieved!' : `Progress: ${progress.toFixed(1)}%`}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
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

export default Goals;
