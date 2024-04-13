import { mapFolderFromLink } from "../util/mapFolderFromLink";
import { axiosInstance } from "../util/axiosInstance";

export const useGetLinksByFolderId = async (userId: number, folderId?: number) => {
  const folderQuery = folderId === 0 ? "" : `?folderId=${folderId}`;
  const response = await axiosInstance.get(`users/${userId}/links${folderQuery}`);
  const data = mapFolderFromLink(response.data?.data);

  return data;
};
