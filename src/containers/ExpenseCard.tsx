import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register required components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const AvailableExpenses = () => {
  const data = {
    labels: ["Food", "Clothes", "Other"],
    datasets: [
      {
        data: [950, 420, 380],
        backgroundColor: ["#4fd1c5", "#805ad5", "#ed8936"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  return (
    <div className="bg-gradient-to-r from-teal-900/50 to-teal-950/50 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-md h-[30vh]">
      <h2 className="text-lg font-bold">Available</h2>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default AvailableExpenses;
