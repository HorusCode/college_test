import axios from "axios";
import router from "@/router";

const Api = axios.create({
  baseURL: `http://192.168.1.200/api`,
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

Api.interceptors.response.use(undefined, err => {
  const response = err.response;
  return new Promise(() => {
    if (response.status === 401) {
      if (router.currentRoute.path !== "/") {
        router.push("/");
      }
    }
    throw err;
  });
});

export default Api;
