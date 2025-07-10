import axios from "axios";
import { toast } from "react-toastify";
import { getData, removeData } from "./config";

export default function setupAxios() {
  axios.defaults.baseURL = "https://solusiparking.com/backend/";
  axios.defaults.timeout = 30000;

  axios.interceptors.request.use(
    (config) => {
      const sessionId = getData("sessionId");

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
        removeData("sessionId");
        removeData("userInfo");
      } else {
        toast.error(errorMessage);
      }
      throw error;
    }
  );
}
