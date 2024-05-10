import { DEFAULT_PROFILE } from "@/src/util/constant";
import instance from "@/src/util/instance";

export const getUser = async () => {
  const response = await instance.get("users");
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
