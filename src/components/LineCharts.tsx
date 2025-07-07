// src/components/LineChart.tsx
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Registrasi elemen-elemen yang diperlukan
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
      borderColor: "#3b82f6", // warna biru Tailwind
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      fill: true,
      tension: 0.4, // untuk efek melengkung
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Grafik Pengunjung per Bulan",
    },
  },
};

const LineChart = () => {
  return <Line options={options} data={data} />;
};

export default LineChart;
