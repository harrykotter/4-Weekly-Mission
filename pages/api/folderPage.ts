// import { useGetLinks } from "@/src/hooks/useGetLink";
import instance from "@/src/util/instance";
import { mapFolderFromLink } from "@/src/util/mapFolderFromLink";

export const getFolderData = () => instance.get("folders");

export const getLinks = async (folderId: number = 0) => {
  const folderQuery = folderId === 0 ? "" : `?folderId=${folderId}`;
  const response = await instance.get(`links${folderQuery}`);
  const data = mapFolderFromLink(response.data?.data.folder);

  return data;
};
