import { mapFolderFromLink } from "../util/mapFolderFromLink";
import { axiosInstance } from "../util/axiosInstance";

export const useGetLinksByFolderId = async (id?: string) => {
  const folderId = id === "0" ? "users/1/links" : `users/1/links?folderId=${id}`;
  const response = await axiosInstance.get(folderId);
  const data = mapFolderFromLink(response.data?.data);

  return data;
};
