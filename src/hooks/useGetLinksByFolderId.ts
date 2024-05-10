import { mapFolderFromLink } from "../util/mapFolderFromLink";
import instance from "../util/instance";

export const useGetLinksByFolderId = async (
  userId: number,
  folderId?: number,
) => {
  const folderQuery = folderId === 0 ? "" : `?folderId=${folderId}`;
  const response = await instance.get(`users/${userId}/links${folderQuery}`);
  const data = mapFolderFromLink(response.data?.data);

  return data;
};
