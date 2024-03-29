import { MouseEventHandler } from "react";
import styles from "@/styles/ui/Category.module.css";

interface Prop {
  buttonClicked: MouseEventHandler<HTMLButtonElement>;
  linkData: any;
  currentCategory: string;
  handleModalClick: MouseEventHandler<HTMLButtonElement>;
}

const Category = ({
  buttonClicked,
  linkData,
  currentCategory,
  handleModalClick,
}: Prop) => {
  return (
    <div className={styles.CategoryWrapper}>
      <div className={styles.Categories}>
        {linkData?.map((folder: any) => (
          <button
            className={
              folder.name === currentCategory
                ? `${styles.CategoryButton} ${styles.buttonClicked}`
                : styles.CategoryButton
            }
            key={folder?.id}
            onClick={buttonClicked}
            data-id={folder?.id}
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
