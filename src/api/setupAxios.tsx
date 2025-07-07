import axios from "axios";
import { toast } from "react-toastify";

export default function setupAxios() {
  axios.defaults.baseURL = "https://barberking.cloud/backend/barberking/admin";
  axios.defaults.timeout = 30000;

  axios.interceptors.request.use(
    (config) => {
      const sessionId = localStorage.getItem("sessionId");

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
        localStorage.removeItem("sessionId");
      } else {
        toast.error(errorMessage);
      }
      throw error;
    }
  );
}
