import { DEFAULT_PROFILE } from "@/src/util/constant";
import instance from "@/pages/api/instance";

export const getUser = async () => {
  const response = await instance.get("users");
  const data = response?.data[0];
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
