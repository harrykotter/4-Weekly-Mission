import { mapFolderData } from "../util/mapFolderData";
import { axiosInstance } from "../util/axiosInstance";

export const useGetFolderInfo = async () => {
  const response = await axiosInstance.get("sample/folder");
  const data = mapFolderData(response.data?.folder);
  return data;
};
