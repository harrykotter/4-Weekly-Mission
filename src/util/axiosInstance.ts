import axios, { AxiosInstance } from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://bootcamp-api.codeit.kr/api/",
});
if (typeof window !== "undefined") {
  const token = localStorage.getItem("accessToken");
  axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
}
