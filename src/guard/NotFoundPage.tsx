import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 flex flex-col items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <h1 className="text-9xl font-extrabold text-blue-500 tracking-tight mb-6">
          404
        </h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-gray-600 mb-8">
          Sepertinya halaman yang kamu cari tidak tersedia atau sudah
          dipindahkan.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center px-5 py-3 bg-blue-500 text-white text-sm font-semibold rounded-lg shadow hover:bg-blue-600 transition"
        >
          Kembali
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
