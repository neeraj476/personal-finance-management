// src/components/chartOptions.js

export const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ₹${tooltipItem.raw}`, // Showing the amount in ₹
        },
      },
    },
  };
  
  export const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.dataset.label}: ₹${tooltipItem.raw}`, // Showing the amount in ₹
        },
      },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };
  