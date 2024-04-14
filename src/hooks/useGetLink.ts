import { mapFolderFromLink } from "../util/mapFolderFromLink";
import { axiosInstance } from "../util/axiosInstance";

export const useGetLinks = async (folderId: number = 0) => {
  const folderQuery = folderId === 0 ? "" : `?folderId=${folderId}`;
  const response = await axiosInstance.get(`links${folderQuery}`);
  const data = mapFolderFromLink(response.data?.data.folder);

  return data;
};
