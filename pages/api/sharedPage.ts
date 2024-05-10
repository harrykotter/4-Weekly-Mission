import instance from "@/src/util/instance";
import { mapFolderData } from "@/src/util/mapFolderData";
import { mapFolderFromLink } from "@/src/util/mapFolderFromLink";

export const getFolder = async (id: number) => instance.get(`folders/${id}`);
export const getFolderOwner = async (id: number) => instance.get(`users/${id}`);

export const getLinksByFolderId = async (userId: number, folderId?: number) => {
  const folderQuery = folderId === 0 ? "" : `?folderId=${folderId}`;
  const response = await instance.get(`users/${userId}/links${folderQuery}`);
  const data = mapFolderFromLink(response.data?.data);

  return data;
};

export const getFolderInfo = async () => {
  const response = await instance.get("sample/folder");
  const data = mapFolderData(response.data?.folder);
  return data;
};
