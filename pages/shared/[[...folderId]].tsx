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
import { useQuery } from "@tanstack/react-query";

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
interface UserData {
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

  const router = useRouter();
  const { folderId } = router.query;
  const { wrappedFunction: getFolderInfo } = useAsync(getFolder);
  const { wrappedFunction: getOwner } = useAsync(getFolderOwner);
  const { wrappedFunction: getLinks } = useAsync(getLinksByFolderId);

  const {
    data: folderData,
    isError: folderError,
    isLoading: folderLoading,
  } = useQuery<FolderData>({
    queryKey: ["folderData", folderId],
    queryFn: () =>
      getFolderInfo(folderId?.[0]).then((response) => {
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        return response.data[0];
      }),
    enabled: !!folderId?.length,
  });

  const { data: userData, isError: userError } = useQuery<UserData>({
    queryKey: ["owner", folderData?.user_id],
    queryFn: () =>
      getOwner(folderData?.user_id).then((response) => {
        return response[0];
      }),
    enabled: !!folderData?.user_id && !folderLoading,
  });

  const { data: linkData, isError: linkError } = useQuery<LinkData[]>({
    queryKey: ["links", folderData?.user_id, folderId?.[0]],
    queryFn: () =>
      getLinks(folderData?.user_id, folderId?.[0]).then((response) => {
        return response.data || [];
      }),
    enabled: !!folderData?.user_id && !folderLoading,
  });

  if (folderError || userError || linkError) {
    return <ErrorPage statusCode={404} />;
  }

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleInputClear = () => {
    setSearchTerm("");
  };

  const filteredLinks = linkData?.filter(
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
