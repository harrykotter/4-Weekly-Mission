import { axiosInstance } from "../util/axiosInstance";
import { DEFAULT_PROFILE } from "../util/constant";

export const useGetUser = async () => {
  const response = await axiosInstance.get("users/1");
  const data = response.data ? response.data?.data[0] : null;
  const userData = data
    ? {
        id: data.id,
        name: data.name,
        email: data.email,
        profileImageSource: data.image_source || DEFAULT_PROFILE,
      }
    : null;
  return userData;
};
