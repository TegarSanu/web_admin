// src/components/BarChart.tsx
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Registrasi elemen-elemen yang diperlukan
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      label: "Pengunjung",
      data: [30, 45, 28, 60, 70],
      backgroundColor: "#3b82f6", // warna biru Tailwind
      borderRadius: 6,
      barThickness: 40,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        font: {
          family: "Mulish",
        },
      },
    },
    title: {
      display: true,
      text: "Grafik Pengunjung per Bulan",
      font: {
        family: "Mulish",
        size: 18,
      },
    },
  },
  scales: {
    x: {
      ticks: {
        font: {
          family: "Mulish",
        },
      },
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        font: {
          family: "Mulish",
        },
      },
      grid: {
        color: "#e5e7eb",
      },
    },
  },
};

const BarChart = () => {
  return <Bar options={options} data={data} />;
};

export default BarChart;
