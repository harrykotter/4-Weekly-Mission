import { MouseEventHandler } from "react";
import styles from "@/styles/ui/Category.module.css";

interface Prop {
  buttonClicked: MouseEventHandler<HTMLButtonElement>;
  linkData: any;
  categoryId: string;
  handleModalClick: MouseEventHandler<HTMLButtonElement>;
}

const Category = ({
  buttonClicked,
  linkData,
  categoryId,
  handleModalClick,
}: Prop) => {
  return (
    <div className={styles.CategoryWrapper}>
      <div className={styles.Categories}>
        {linkData?.map((folder: any) => (
          <button
            className={
              folder.id.toString() === categoryId
                ? `${styles.CategoryButton} ${styles.buttonClicked}`
                : styles.CategoryButton
            }
            key={folder?.id}
            onClick={buttonClicked}
            id={folder?.id}
          >
            {folder?.name}
          </button>
        ))}
      </div>
      <button
        className={styles.addFolder}
        onClick={handleModalClick}
        id="addFolder"
      >
        폴더 추가하기 +
      </button>
    </div>
  );
};

export default Category;
