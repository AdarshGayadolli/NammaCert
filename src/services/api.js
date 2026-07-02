import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    console.log("========== API REQUEST ==========");
    console.log("URL :", config.url);
    console.log("METHOD :", config.method);
    console.log("TOKEN :", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("HEADERS :", config.headers);

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    console.log("========== API RESPONSE ==========");
    console.log(response);

    return response;
  },
  (error) => {
    console.log("========== API ERROR ==========");
    console.log(error);

    if (error?.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    }

    return Promise.reject(error);
  }
);

export default api;