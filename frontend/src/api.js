import axios from "axios";
import { ACCESS_TOKEN, apiDomain } from "./utils/utils"; // Assuming apiDomain is exported from "./utils/utils"

const apiUrl = "/choreo-apis/awbo/backend/rest-api-be2/v1.0";

const api = axios.create({
  baseURL: apiDomain ? apiDomain : apiUrl,
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;