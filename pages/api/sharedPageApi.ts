import instance from "@/pages/api/instance";
import { mapFolderFromLink } from "@/src/util/mapFolderFromLink";

export const getFolder = async (id: number) => {
  const response = await instance.get(`folders/${id}`);
  return response;
};
export const getFolderOwner = async (id: number) => {
  const response = await instance.get(`users/${id}`);
  return response.data;
};

export const getLinksByFolderId = async (folderId: number) => {
  const response = await instance.get(`folders/${folderId}/links`);
  const data = mapFolderFromLink(response.data?.data);
  return data;
};
