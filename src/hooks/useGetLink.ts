import { mapFolderFromLink } from "../util/mapFolderFromLink";
import instance from "../util/instance";

export const useGetLinks = async (folderId: number = 0) => {
  const folderQuery = folderId === 0 ? "" : `?folderId=${folderId}`;
  const response = await instance.get(`links${folderQuery}`);
  const data = mapFolderFromLink(response.data?.data.folder);

  return data;
};
