import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RevenueFlow = () => {
  const data = {
    labels: [
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Revenue",
        data: [1500, 2000, 1800, 2400, 2240, 2600, 500, 2000, 1000, 4000],
        backgroundColor: "#4fd1c5",
        borderRadius: 10,
        color: "#fff",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "#2d3748",
        },
      },
    },
  };

  return (
    <div className="bg-gradient-to-r from-teal-900/50 to-teal-950/50 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-md h-[40vh]">
      <h2 className="text-lg font-bold">Revenue Flow</h2>
      <Bar data={data} options={options} className="min-w-full p-4" />
    </div>
  );
};

export default RevenueFlow;
