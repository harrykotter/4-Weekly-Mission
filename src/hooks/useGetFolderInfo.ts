import { mapFolderData } from "../util/mapFolderData";
import instance from "../util/instance";

export const useGetFolderInfo = async () => {
  const response = await instance.get("sample/folder");
  const data = mapFolderData(response.data?.folder);
  return data;
};
