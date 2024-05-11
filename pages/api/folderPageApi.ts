import instance from "@/pages/api/instance";
import { mapFolderFromLink } from "@/src/util/mapFolderFromLink";

export const getFolderData = async () => {
  const response = await instance.get("folders");
  return response;
};

export const getLinks = async (folderId: number = 0) => {
  const folderQuery = folderId === 0 ? "" : `folders/${folderId}/`;
  const response = await instance.get(`${folderQuery}links`);
  const data = mapFolderFromLink(response.data);

  return data;
};
