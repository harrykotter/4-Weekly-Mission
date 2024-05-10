import instance from "@/src/util/instance";
import { mapFolderFromLink } from "@/src/util/mapFolderFromLink";
// import { mapFolderData } from "@/src/util/mapFolderData";

export const getFolder = async (id: number) => instance.get(`folders/${id}`);
export const getFolderOwner = async (id: number) => instance.get(`users/${id}`);

// export const getLinksByFolderId = async ( folderId?: number) => {
//   const folderQuery = folderId === 0 ? "" : `folders/${folderId}/`;
//   const response = await instance.get(`${folderQuery}links`);
//   const data = mapFolderFromLink(response.data?.data);

//   return data;
// };

export const getLinksByFolderId = async (folderId: number) => {
  const response = await instance.get(`folders/${folderId}/links`);
  const data = mapFolderFromLink(response.data?.data);
  return data;
};

// export const getFolderInfo = async () => {
//   const response = await instance.get("sample/folder");
//   const data = mapFolderData(response.data?.folder);
//   return data;
// };
