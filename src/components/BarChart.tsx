// src/components/BarChart.tsx
import React from "react";
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
import { useSelector } from "react-redux";
import type { RootState } from "../redux/app/store";

// Registrasi Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SummaryItem {
  title: string;
  value: string | number;
}

interface DatasetItem {
  label: string;
  data: number[];
  color?: string;
}

interface BarChartProps {
  labels: string[];
  datasets: DatasetItem[]; // multiple dataset support
  title?: string;
  subtitle?: string; // akan ditampilkan manual di luar chart
  summaryItems?: SummaryItem[];
}

const BarChart: React.FC<BarChartProps> = ({
  labels,
  datasets,
  title = "Grafik",
  subtitle,
  summaryItems = [],
}) => {
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);

  const chartData = {
    labels,
    datasets: datasets?.map((ds) => ({
      label: ds.label,
      data: ds.data,
      backgroundColor: ds.color || "#3b82f6",
      borderRadius: 0,
      barThickness: 500 / datasets.length,
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: { family: "Mulish" },
        },
      },
      title: {
        display: true,
        text: title,
        font: {
          family: "Mulish",
          size: 18,
        },
      },
      // ⚠️ Hapus subtitle karena tidak didukung
    },
    scales: {
      x: {
        ticks: { font: { family: "Mulish" } },
        grid: { display: false },
      },
      y: {
        ticks: { font: { family: "Mulish" } },
        grid: { color: "#e5e7eb" },
      },
    },
  };

  return (
    <div className="space-y-4">
      {subtitle && (
        <p className="text-center text-sm text-gray-600 font-medium">
          {subtitle}
        </p>
      )}
      <Bar options={options} data={chartData} />

      {summaryItems.length > 0 && (
        <div className="flex items-center gap-4 text-center justify-center flex-wrap">
          {summaryItems.map((item, idx) => (
            <div
              key={idx}
              className={`${
                darkMode ? "bg-gray-600 text-white" : "bg-white text-gray-500"
              } shadow rounded-xl p-4 min-w-72`}
            >
              <p className="">{item.title}</p>
              <p className="text-xl font-bold">{item.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BarChart;
