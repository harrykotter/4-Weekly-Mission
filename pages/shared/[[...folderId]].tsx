import FolderInfo from "@/src/ui/FolderInfo";
import SearchBar from "@/src/ui/SearchBar";
import { CardList } from "@/src/ui/CardList";
import Layout from "@/src/feature/Layout";
import { Card } from "@/src/ui/Card";
import useAsync from "@/src/hooks/useAsync";
import styles from "@/styles/pages/SharedPage.module.css";
import { ChangeEventHandler, useEffect, useState } from "react";
import Head from "next/head";

import { axiosInstance } from "@/src/util/axiosInstance";
import Router, { useRouter } from "next/router";
import { useGetLinksByFolderId } from "@/src/hooks/useGetLinksByFolderId";
import { useGetFolderInfo } from "@/src/hooks/useGetFolderInfo";

interface FolderData {
  data: {
    id: number;
    created_at: string;
    name: string;
    user_id: number;
    favorite: boolean;
  }[];
}
interface userData {
  data: {
    id: number;
    created_at: string;
    name: string;
    image_source: string;
    email: string;
    auth_id: string;
  }[];
}
interface LinkData {
  data: {
    id: number;
    url: string;
    imageSource: string;
    title?: string;
    alt: string;
    elapsedTime: string;
    description?: string;
    createdAt: string;
    favorite?: boolean;
  }[];
}

const SharedPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [folderData, setFolderData] = useState<FolderData>({
    data: [],
  });
  const [userData, setUserData] = useState<userData>({
    data: [],
  });
  const [linkData, setLinkData] = useState<LinkData>({
    data: [],
  });

  const router = useRouter();
  const { folderId } = router.query;
  const getFolder = async (id: number) => axiosInstance.get(`folders/${id}`);
  const getFolderOwner = async (id: number) => axiosInstance.get(`users/${id}`);
  const { wrappedFunction: getFolderInfo } = useAsync(getFolder);
  const { wrappedFunction: getOwner } = useAsync(getFolderOwner);
  const { wrappedFunction: get0FolderInfo } =
    useAsync<FolderData>(useGetFolderInfo);
  const { wrappedFunction: getLinksByFolderId } = useAsync(
    useGetLinksByFolderId,
  );

  useEffect(() => {
    if (folderId?.length === 1) {
      getFolderInfo(folderId[0]).then((result) => {
        setFolderData(result?.data);
        const ownerId = result?.data.data[0].user_id;
        if (ownerId) {
          getOwner(ownerId).then((res) => setUserData(res?.data));
          getLinksByFolderId(ownerId, folderId).then(setLinkData);
        }
      });
    } else if (folderId === undefined) {
      get0FolderInfo().then(setFolderData);
    }
  }, [folderId]);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleInputClear = () => {
    setSearchTerm("");
  };

  const filteredLinks = linkData?.data?.filter(
    (link) =>
      link.alt?.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
      link.description
        ?.toLowerCase()
        .includes(searchTerm.trim().toLowerCase()) ||
      link.url.toLowerCase().includes(searchTerm.trim().toLowerCase()),
  );

  return (
    <>
      <Head>
        <title>Shared</title>
      </Head>
      <Layout>
        <div className={styles.SharedPage}>
          <FolderInfo
            profileImage={
              userData?.data[0]?.image_source || "/assets/profile-default.svg"
            }
            ownerName={userData?.data[0]?.name}
            folderName={folderData?.data[0]?.name}
          />
          <div className={styles.SharedPageItems}>
            <SearchBar
              handleInputChange={handleInputChange}
              handleInputClear={handleInputClear}
              searchTerm={searchTerm}
            />
            {filteredLinks && filteredLinks.length > 0 ? (
              <CardList>
                {filteredLinks?.map((link) => (
                  <Card key={link?.id} {...link} />
                ))}
              </CardList>
            ) : (
              <div className={styles.NoLink}>저장된 링크가 없습니다.</div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SharedPage;
