import { MouseEventHandler } from "react";
import styles from "@/styles/ui/EditLink.module.css";
import Image from "next/image";

interface Props {
  currentCategory: string;
  handleEditClick: MouseEventHandler;
}

export const EditLink = ({ currentCategory, handleEditClick }: Props) => {
  const isCurrentAll = currentCategory === "전체";
  return (
    <div className={styles.EditLinkWrapper}>
      <div className={styles.currentCategory}>{currentCategory}</div>
      {!isCurrentAll && (
        <div className={styles.EditLinks}>
          <button
            className={styles.editButton}
            onClick={handleEditClick}
            id="shareFolder"
          >
            <Image src="images/share-icon.svg" alt="share icon" />
            공유하기
          </button>
          <button
            className={styles.editButton}
            onClick={handleEditClick}
            id="changeFolderName"
          >
            <Image src="images/pen-icon.svg" alt="rename icon" />
            이름 변경
          </button>
          <button
            className={styles.editButton}
            onClick={handleEditClick}
            id="deleteFolder"
          >
            <Image src="images/trash-icon.svg" alt="delete icon" />
            삭제
          </button>
        </div>
      )}
    </div>
  );
};
