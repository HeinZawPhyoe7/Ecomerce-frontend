import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";

const axiosInstance = axios.create();

// Request interceptor: Attach base URL and token
axiosInstance.interceptors.request.use(
  (config) => {
    if (config.url && !/^https?:\/\//i.test(config.url)) {
      config.url = `${BASE_URL}${config.url}`;
    }

    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");

      // Redirect to login page
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
