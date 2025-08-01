import axios from "axios";
import { toast } from "react-toastify";
import { getData, removeData } from "./config";
import { useNavigate, useParams } from "react-router-dom";

export default function setupAxios(role: any) {
  axios.defaults.baseURL = "https://solusiparking.com/backend/";
  axios.defaults.timeout = 30000;

  axios.interceptors.request.use(
    (config) => {
      const sessionId =
        role === "admin-dashboard"
          ? getData("session-superadmin")
          : getData("session-company");
      if (sessionId && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${sessionId}`;
      }

      return config;
    },
    (err) => {
      Promise.reject(err);
    }
  );
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      console.log({ error });
      const { status } = error.response ?? {};
      const errorMessage =
        error.response?.data?.errors?.messages[0] ?? error.message;
      if (status === 401) {
        if (role === "admin-dashboard") {
          removeData("session-superadmin");
          removeData("user-superadmin");
        } else {
          removeData("session-company");
          removeData("user-company");
        }
      } else {
        toast.error(errorMessage);
      }
      throw error;
    }
  );
}
