import axios from "axios";

const Api = axios.create({
  baseURL: `http://classroom/api`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

Api.interceptors.request.use(
  config => {
    let token = localStorage.getItem("authtoken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },

  error => {
    return Promise.reject(error);
  },
);

export default Api;
