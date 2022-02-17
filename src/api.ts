import axios from "axios";

const service = axios.create({
  baseURL: "/api",
  timeout: 10000,
  withCredentials: true,
});

axios.defaults.transformRequest = [
  data => {
    let newData = "";
    for (const k in data) {
      if (data.hasOwnProperty(k)) {
        newData += encodeURIComponent(k) + "=" + encodeURIComponent(data[k]) + "&";
      }
    }
    return newData;
  },
];

service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    console.error(error);
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  response => {
    if (response && response.data && response.data.success !== undefined) {
      if (response.data.success) {
        return response.data;
      }
    }
    console.error(response);
    return Promise.reject(response.data);
  },
  error => {
    console.error(error);
    return Promise.reject(error);
  },
);

export default service;
