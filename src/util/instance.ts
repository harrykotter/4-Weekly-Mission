import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "https://bootcamp-api.codeit.kr/api/",
});

const getToken = () => {
  if (typeof window !== undefined) {
    const token = window.localStorage.getItem("accessToken");
    return token;
  }
  return "";
};

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getToken()}`;
  return config;
});

export default instance;
