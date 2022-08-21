const { default: Axios } = require("axios");

const server = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 600000,
});

export default server;

server.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("jwt"))
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);