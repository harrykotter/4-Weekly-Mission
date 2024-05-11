import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "https://bootcamp-api.codeit.kr/api/linkbrary/v1/",
});

const getToken = () => {
  if (typeof window !== undefined) {
    const token = window.localStorage.getItem("accessToken");
    // console.log(token);

    return token;
  }
  return "";
};

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getToken()}`;
  return config;
});

export default instance;
