import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      navigate("/");
    } else {
      alert("Username dan Password wajib diisi!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center animated-bg px-4 relative overflow-hidden">
      {/* Glow Bulatan */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300 opacity-30 rounded-full blur-3xl -z-10 float-glow" />
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-purple-300 opacity-20 rounded-full blur-2xl -z-10 float-glow delay" />

      {/* Login Card */}
      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/40 p-8 transition-all duration-300">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Username */}
          <div className="relative">
            <FontAwesomeIcon
              icon={faUser}
              className="absolute top-3 left-3 text-gray-400"
            />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400 transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FontAwesomeIcon
              icon={faLock}
              className="absolute top-3 left-3 text-gray-400"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-700 placeholder-gray-400 transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:opacity-90 transition duration-200 shadow-md"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Belum punya akun?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => alert("Redirect ke halaman daftar")}
          >
            Daftar Sekarang
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
