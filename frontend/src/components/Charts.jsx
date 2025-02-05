// src/components/Charts.js
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const PieChart = ({ data, options }) => (
  <div className="bg-white shadow-lg rounded-lg p-6">
    <h3 className="text-xl font-semibold text-gray-800 mb-3">Financial Distribution</h3>
    <Pie data={data} options={options} />
  </div>
);

const BarChart = ({ data, options }) => (
  <div className="bg-white shadow-lg rounded-lg p-6">
    <h3 className="text-xl font-semibold text-gray-800 mb-3">Financial Overview</h3>
    <Bar data={data} options={options} />
  </div>
);

export { PieChart, BarChart };
