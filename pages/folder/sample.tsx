import AddLink from "@/src/ui/AddLink";
import Layout from "@/src/feature/Layout";
import SearchBar from "@/src/ui/SearchBar";
import { CardList } from "@/src/ui/CardList";
import { Card } from "@/src/ui/Card";
import useAsync from "@/src/hooks/useAsync";
import { useGetFolder } from "@/src/hooks/useGetFolder";
import { useGetLinksByFolderId } from "@/src/hooks/useGetLinksByFolderId";
import Category from "@/src/ui/Category";
import { EditLink } from "@/src/ui/EditLink";
import Modal from "@/src/ui/Modal/Modal";

import styles from "@/styles/pages/FolderPage.module.css";
import { useState, useRef, useEffect, ChangeEventHandler, MouseEventHandler } from "react";
import Head from "next/head";
import { MappedLink } from "@/src/util/mapFolderFromLink";
import { axiosInstance } from "@/src/util/axiosInstance";
import Router from "next/router";
import { setAxiosHeader } from "@/src/util/setAxiosToken";

interface Folder {
  created_at: string;
  favorite: boolean;
  id: number;
  link: { count: number };
  name: string;
  user_id: number;
}

const FolderPage: React.FC = () => {
  const getLinks = () => axiosInstance.get("/links");
  const { wrappedFunction: getLink } = useAsync<any>(getLinks);
  const { wrappedFunction: getFolder } = useAsync<Folder[]>(useGetFolder);
  const { wrappedFunction: getLinksByFolderId } = useAsync<any>(useGetLinksByFolderId);

  const [currentCategory, setCurrentCategory] = useState("전체");
  const [folderId, setFolderId] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modal, setModal] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [linksData, setLinksData] = useState<MappedLink[]>([]);
  const [folderData, setFolderData] = useState<Folder[]>([]);

  const [isAddLinkShown, setIsAddLinkShown] = useState(true);
  const [isFooterShown, setIsFooterShown] = useState(false);

  const addLinkRef = useRef(null);
  const footerRef = useRef(null);
  const isAddLinkFixed = !isAddLinkShown && !isFooterShown;

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setAxiosHeader();
      getLink().then((result) => console.log(result));
      getLinksByFolderId(1, folderId).then((result) => setLinksData(result?.data));
      getFolder().then(setFolderData);
    } else Router.push("/signin");
  }, [folderId]);

  const folderDataWithAll = Array.isArray(folderData)
    ? [{ name: "전체", id: "0" }, ...folderData]
    : [];
  const navFixed = true;

  const handleCategoryClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const eventTarget = e.target as HTMLElement;
    const category = eventTarget.innerText;
    const Id = eventTarget.id;
    setCurrentCategory(category);
    setFolderId(+Id || 0);
  };
  const handleModalClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const eventTarget = e.target as HTMLElement;
    e.preventDefault();
    setIsModalOpen(true);
    setModal(e.currentTarget.id);
    setCurrentUrl(eventTarget.getAttribute("data-url") || "");
  };
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleInputClear = () => {
    setSearchTerm("");
  };

  useEffect(() => {
    const addLinkObserver = new IntersectionObserver(
      ([entry]) => {
        setIsAddLinkShown(entry.isIntersecting);
      },
      { threshold: 0 }
    );
    const footerObserver = new IntersectionObserver(
      ([entry]) => {
        setIsFooterShown(entry.isIntersecting);
      },
      { threshold: 0 }
    );
    if (addLinkRef.current) {
      addLinkObserver.observe(addLinkRef.current);
    }
    if (footerRef.current) {
      footerObserver.observe(footerRef.current);
    }

    return () => {
      if (addLinkRef.current) {
        addLinkObserver.unobserve(addLinkRef.current);
      }
      if (footerRef.current) {
        footerObserver.unobserve(footerRef.current);
      }
    };
  }, []);

  const filteredLinks = linksData?.filter(
    (link) =>
      link.title?.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
      link.description?.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
      link.url.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Folder</title>
      </Head>
      {isModalOpen && (
        <Modal
          currentCategory={currentCategory}
          modal={modal}
          setIsModalOpen={setIsModalOpen}
          categoryData={folderData}
          currentUrl={currentUrl}
          selectedId={folderId}
        />
      )}
      <Layout isNavFixed={navFixed} footerRef={footerRef}>
        <div className={styles.FolderPage}>
          <AddLink addLinkRef={addLinkRef} />
          <div className={styles.FolderPageItems}>
            <SearchBar
              handleInputChange={handleInputChange}
              handleInputClear={handleInputClear}
              searchTerm={searchTerm}
            />
            <Category
              buttonClicked={handleCategoryClick}
              linkData={folderDataWithAll}
              categoryId={folderId.toString()}
              handleModalClick={handleModalClick}
            />
            <EditLink currentCategory={currentCategory} handleEditClick={handleModalClick} />
            {filteredLinks && filteredLinks.length > 0 ? (
              <CardList>
                {filteredLinks?.map((link) => (
                  <Card key={link?.id} {...link} handleModalClick={handleModalClick} />
                ))}
              </CardList>
            ) : (
              <div className={styles.NoLink}>저장된 링크가 없습니다.</div>
            )}
            <button className={styles.mobileAddButton}>폴더 추가하기 +</button>
            {isAddLinkFixed && <AddLink isAddLinkFixed={isAddLinkFixed} />}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default FolderPage;
