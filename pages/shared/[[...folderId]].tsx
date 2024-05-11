import FolderInfo from "@/src/ui/FolderInfo";
import SearchBar from "@/src/ui/SearchBar";
import { CardList } from "@/src/ui/CardList";
import Layout from "@/src/feature/Layout";
import { Card } from "@/src/ui/Card";
import useAsync from "@/src/hooks/useAsync";
import styles from "@/styles/pages/SharedPage.module.css";
import { ChangeEventHandler, useEffect, useState } from "react";
import Head from "next/head";
import ErrorPage from "next/error";

import { useRouter } from "next/router";
import {
  getFolder,
  getFolderOwner,
  getLinksByFolderId,
} from "../api/sharedPageApi";

interface FolderData {
  id: number;
  created_at: string;
  name: string;
  user_id: number;
  favorite: boolean;
}
interface userData {
  id: number;
  created_at: string;
  name: string;
  image_source: string;
  email: string;
  auth_id: string;
}
interface LinkData {
  id: number;
  url: string;
  imageSource: string;
  title?: string;
  alt: string;
  elapsedTime: string;
  description?: string;
  createdAt: string;
  favorite?: boolean;
}

const SharedPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [folderData, setFolderData] = useState<FolderData>();
  const [userData, setUserData] = useState<userData>();
  const [linkData, setLinkData] = useState<LinkData[]>([]);

  const router = useRouter();
  const { folderId } = router.query;
  const { wrappedFunction: getFolderInfo } = useAsync(getFolder);
  const { wrappedFunction: getOwner } = useAsync(getFolderOwner);
  const { wrappedFunction: getLinks } = useAsync(getLinksByFolderId);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (folderId?.length === 1) {
      getFolderInfo(folderId[0])
        .then((result) => {
          setFolderData(result?.[0]);
          const ownerId = result[0].user_id;
          if (ownerId) {
            getOwner(ownerId).then((res) => {
              setUserData(res?.[0]);
            });
            getLinks(ownerId, folderId).then((res) => {
              setLinkData(res?.data);
            });
          }
        })
        .catch(() => setIsError(true));
    } else setIsError(true);
  }, [folderId]);

  if (isError) {
    return <ErrorPage statusCode={404} />;
  }

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleInputClear = () => {
    setSearchTerm("");
  };

  const filteredLinks = linkData.filter(
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
              userData?.image_source || "/assets/profile-default.svg"
            }
            ownerName={userData?.name}
            folderName={folderData?.name}
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
