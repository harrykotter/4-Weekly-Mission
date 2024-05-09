import AddLink from "@/src/ui/AddLink";
import Layout from "@/src/feature/Layout";
import SearchBar from "@/src/ui/SearchBar";
import { CardList } from "@/src/ui/CardList";
import { Card } from "@/src/ui/Card";
import useAsync from "@/src/hooks/useAsync";
import Category from "@/src/ui/Category";
import { EditLink } from "@/src/ui/EditLink";
import Modal from "@/src/ui/Modal/Modal";
import ErrorPage from "next/error";

import styles from "@/styles/pages/FolderPage.module.css";
import {
  useState,
  useRef,
  useEffect,
  ChangeEventHandler,
  MouseEventHandler,
} from "react";
import Head from "next/head";
import { MappedLink } from "@/src/util/mapFolderFromLink";
import Router, { useRouter } from "next/router";
// import { setAxiosHeader } from "@/src/util/setAxiosToken";
import { useGetLinks } from "@/src/hooks/useGetLink";
import { axiosInstance } from "@/src/util/axiosInstance";
import useFloatingAddLinkBar from "@/src/hooks/useFloatingAddLinkBar";

interface Folder {
  created_at: string;
  favorite: boolean;
  id: number;
  link: { count: number };
  name: string;
  user_id: number;
}

const FolderPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const getFolderData = () => axiosInstance.get("folders");
  const { wrappedFunction: getLinks } = useAsync<any>(useGetLinks);
  const { wrappedFunction: getFolderList } = useAsync<any>(getFolderData);

  const [currentCategory, setCurrentCategory] = useState("전체");
  const [folderId, setFolderId] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modal, setModal] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [linksData, setLinksData] = useState<MappedLink[]>([]);
  const [folderData, setFolderData] = useState<Folder[]>([]);

  const [isAddLinkShown, setIsAddLinkShown] = useState(true);
  const [isFooterShown, setIsFooterShown] = useState(false);
  const [isError, setIsError] = useState(false);

  const addLinkRef = useRef(null);
  const footerRef = useRef(null);
  const isAddLinkFixed = !isAddLinkShown && !isFooterShown;

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      // setAxiosHeader();
      getLinks(folderId).then((response) => setLinksData(response.data));
      getFolderList().then((response) =>
        setFolderData(response?.data?.data.folder),
      );
    } else Router.push("/signin");
  }, [folderId]);

  useEffect(() => {
    if (!router.isReady) return;
    if (id !== undefined && !(id.length > 2 && /^\d+$/.test(id[0])))
      setIsError(true);
    id?.length
      ? setFolderId(parseInt((id[0] as string) ?? 0, 10))
      : setFolderId(0);
  }, [id]);

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

  // useEffect(() => {
  //   const addLinkObserver = new IntersectionObserver(
  //     ([entry]) => {
  //       setIsAddLinkShown(entry.isIntersecting);
  //     },
  //     { threshold: 0 },
  //   );
  //   const footerObserver = new IntersectionObserver(
  //     ([entry]) => {
  //       setIsFooterShown(entry.isIntersecting);
  //     },
  //     { threshold: 0 },
  //   );
  //   if (addLinkRef.current) {
  //     addLinkObserver.observe(addLinkRef.current);
  //   }
  //   if (footerRef.current) {
  //     footerObserver.observe(footerRef.current);
  //   }

  //   return () => {
  //     if (addLinkRef.current) {
  //       addLinkObserver.unobserve(addLinkRef.current);
  //     }
  //     if (footerRef.current) {
  //       footerObserver.unobserve(footerRef.current);
  //     }
  //   };
  // }, []);
  useFloatingAddLinkBar({
    setIsAddLinkShown,
    setIsFooterShown,
    addLinkRef,
    footerRef,
  });

  if (isError) {
    return <ErrorPage statusCode={404} />;
  }

  const filteredLinks = linksData?.filter(
    (link) =>
      link.title?.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
      link.description
        ?.toLowerCase()
        .includes(searchTerm.trim().toLowerCase()) ||
      link.url.toLowerCase().includes(searchTerm.trim().toLowerCase()),
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
            <EditLink
              currentCategory={currentCategory}
              handleEditClick={handleModalClick}
            />
            {filteredLinks && filteredLinks.length > 0 ? (
              <CardList>
                {filteredLinks?.map((link) => (
                  <Card
                    key={link?.id}
                    {...link}
                    handleModalClick={handleModalClick}
                  />
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
