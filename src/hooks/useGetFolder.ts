import { axiosInstance } from "../util/axiosInstance";

export const useGetFolder = async () => {
  const response = await axiosInstance.get("users/1/folders");
  const data = response.data?.data;

  return data;
};
