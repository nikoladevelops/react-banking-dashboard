import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
  throw new Error("VITE_API_BASE_URL is not defined as environment variable");
}

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000,
});

export default axiosInstance;
