import instance from "../util/instance";

export const useGetFolder = async () => {
  const response = await instance.get("users/1/folders");
  const data = response.data?.data;

  return data;
};
