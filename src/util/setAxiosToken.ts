import { axiosInstance } from "./axiosInstance";

export const setAxiosHeader = (accessToken?: string) => {
  const token = accessToken ? accessToken : localStorage.getItem("accessToken");
  axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};
