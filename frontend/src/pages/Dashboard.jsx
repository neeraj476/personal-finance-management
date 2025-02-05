import React, { useState, useContext , useEffect } from "react";
import { PieChart, BarChart } from "../components/Charts"; // Import charts
import { pieOptions, barOptions } from "../components/chartOptions";
import { TransactionContext } from "../context/TransactionContext.jsx";
import { Search } from "lucide-react";
import { fetchTransactions } from "../utils/fetchTransaction.js";

const Dashboard = () => {
  const [transactions1, setTransactions] = useState([]); 
  const { processedData, month, year, setYear, isLoading } = useContext(TransactionContext);

  // Year search state
  const [searchYear, setSearchYear] = useState(year);

  // Handle year search
  const handleSearch = () => {
    if (searchYear.trim() !== "") {
      setYear(searchYear);
    }
  };

  // Handle Enter key press for search
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // Pie Chart Data (Yearly Data)
  const pieData = {
    labels: ["Income", "Expenses", "Savings"],
    datasets: [
      {
        data: [processedData.totalIncome || 0, processedData.totalExpense || 0, processedData.Savings || 0],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
      },
    ],
  };

  // Bar Chart Data (Monthly Data)
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Expenses",
        data: month.expense || new Array(12).fill(0),
        backgroundColor: "#FF6384",
        borderColor: "#FF6384",
        borderWidth: 1,
      },
      {
        label: "Income",
        data: month.income || new Array(12).fill(0),
        backgroundColor: "#36A2EB",
        borderColor: "#36A2EB",
        borderWidth: 1,
      },
      {
        label: "Savings",
        data: month.savings || new Array(12).fill(0),
        backgroundColor: "#FFCE56",
        borderColor: "#FFCE56",
        borderWidth: 1,
      },
    ],
  };
  useEffect(() => {
      const getTransactions = async () => {
        const data = await fetchTransactions();
        console.log(data)
        setTransactions(data); // Update state with fetched data
      };
  
      getTransactions();
    }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-orange-500 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
          <p className="text-lg">Your financial overview at a glance</p>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Year */}
          <div className="relative flex items-center space-y-2 mb-4">
            <label htmlFor="year" className="text-lg font-medium text-gray-700 mr-2">
              Year
            </label>
            <div className="relative w-64">
              <input
                value={searchYear}
                onChange={(e) => setSearchYear(e.target.value)}
                onKeyDown={handleKeyDown}
                type="number"
                name="year"
                id="year"
                placeholder="Enter year"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 pl-10"
              />  
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                size={20}
                onClick={handleSearch}
              />
            </div>
          </div>

          {/* Charts Section */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-16">
            {/* Pie Chart */}
            <PieChart data={pieData} options={pieOptions} />

            {/* Bar Chart */}
            <BarChart data={barData} options={barOptions} />
          </section>

          {/* Recent Transactions Section */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recent Transactions</h2>
            <div className="space-y-4">
              {isLoading ? (
                <p className="text-center text-gray-500">Loading transactions...</p>
              ) : transactions1.length === 0 ? (
                <p className="text-center text-gray-500">No transactions found.</p>
              ) : (
                transactions1.map((transaction) => { // Limit to 5 transactions
                  const formattedDate = new Date(transaction.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  });

                  const formattedTime = new Date(transaction.date).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  });

                  return (
                    <div
                      key={transaction._id}
                      className={`flex justify-between items-center p-4 rounded-md ${
                        transaction.type === "Income" ? "bg-green-50" : "bg-red-50"
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
                        className={`text-xl font-bold ${
                          transaction.type === "Income" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {transaction.type === "Income" ? "+" : "-"} ₹{transaction.amount}
                      </span>
                    </div>
                  );
                })
              )}
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

export default Dashboard;
