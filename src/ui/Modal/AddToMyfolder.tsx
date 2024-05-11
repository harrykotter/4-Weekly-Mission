import styles from "@/styles/ui/Modal.module.css";
import Image from "next/image";
import { MouseEventHandler, useState } from "react";

interface Category {
  id: number;
  name: string;
  link_count: number;
}

function AddToMyFolder({
  currentUrl,
  categoryData,
}: {
  currentUrl: string;
  categoryData: Category[];
}) {
  const [selectedFolder, setSelectedFolder] = useState<number>(0);

  const handleFolderClick: MouseEventHandler<HTMLDivElement> = (e) => {
    setSelectedFolder(+e.currentTarget.id);
  };

  return (
    <>
      <div className={styles.ModalTitle}>폴더에 추가</div>
      <div className={styles.ModalSubtitle}>{currentUrl}</div>
      <div className={styles.folderWrapper}>
        {categoryData?.map((link) => (
          <div
            key={link.name}
            className={`${styles.folderButton} ${
              selectedFolder === link.id ? styles.selectedFolder : ""
            }`}
            onClick={handleFolderClick}
            id={`${link.id}`}
          >
            <span className={styles.folderButtonName}>{link.name}</span>
            <span
              className={styles.folderButtonLinks}
            >{`${link.link_count}개 링크`}</span>
            {selectedFolder === link.id && (
              <Image
                width={14}
                height={14}
                className={styles.checkIcon}
                src="/assets/check-icon.svg"
                alt="check icon"
              />
            )}
          </div>
        ))}
      </div>
      <button className={styles.submitButton}>추가하기</button>
    </>
  );
}

export default AddToMyFolder;
