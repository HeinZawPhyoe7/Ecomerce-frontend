import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.url && !/^https?:\/\//i.test(config.url)) {
      config.url = `${BASE_URL}${config.url}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
