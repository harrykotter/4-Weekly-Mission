import format from "date-fns/format";
import { getElapsedTime } from "./getElapsedTime";

interface Folder {
  name: string;
  owner: {
    id: number;
    name: string;
    profileImageSource: string;
  };
  links: {}[];
}

interface Link {
  id: number;
  createdAt: string;
  url: string;
  imageSource: string;
  title: string;
  description: string;
}

interface linkData extends Omit<Link, "title"> {
  alt: string;
  elapsedTime: string;
}

export type FolderData = {
  profileImage: string;
  ownerName: string;
  folderName: string;
  links: linkData[];
};

export const mapFolderData = (folder: Folder): FolderData => {
  if (!folder) return { profileImage: "", ownerName: "", folderName: "", links: [] };
  const { name, owner, links } = folder;

  const mapLinks = (link: Link) => {
    const { id, createdAt, url, imageSource, title, description } = link;
    return {
      id,
      url,
      imageSource,
      alt: `${title ?? url}의 대표 이미지`,
      elapsedTime: getElapsedTime(createdAt),
      description,
      createdAt: format(new Date(createdAt), "yyyy. MM. dd"),
    };
  };

  return {
    profileImage: owner?.profileImageSource,
    ownerName: owner?.name,
    folderName: name,
    links: links?.map(mapLinks) ?? [],
  };
};
