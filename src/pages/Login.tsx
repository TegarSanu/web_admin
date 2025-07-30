import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/features/loading/loadingSlice";
import { setData } from "../api/config";

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { role }: any = useParams();

  const url = () => {
    if (role === "admin-dashboard") {
      return `admin-dashboard/login`;
    } else {
      return `company-dashboard/login`;
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      dispatch(setLoading(true));
      axios
        .post(`${url()}`, { email: username, password: password })
        .finally(() => {
          dispatch(setLoading(false));
        })
        .then((res) => {
          setData("sessionId", res.data.data.sessionId);
          setData("userInfo", res.data.data);
          toast.success("Login sukses");
          navigate(`/${role}`, { replace: true });
        });
    } else {
      toast.error("Username dan Password wajib diisi!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center animated-bg px-4 relative overflow-hidden">
      {/* Glow Bulatan */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300 opacity-30 rounded-full blur-3xl -z-10 float-glow" />
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-purple-300 opacity-20 rounded-full blur-2xl -z-10 float-glow delay" />

      {/* Login Card */}
      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/40 p-8 transition-all duration-300">
        <img
          src={
            "https://ik.imagekit.io/tgrsnbr/Solusi%20parkir%201.png?updatedAt=1752058193679"
          }
          className="w-[80%] mb-10 mt-5 flex mx-auto"
        />
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Welcome {role === "company-dashboard" ? "Admin" : "Superadmin"} 👋
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
              placeholder="Email"
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
      </div>
    </div>
  );
};

export default Login;
