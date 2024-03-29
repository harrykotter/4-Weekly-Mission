import styles from "@/styles/ui/AddLink.module.css";
import Image from "next/image";
import { RefObject } from "react";

const AddLink = ({
  addLinkRef,
  isAddLinkFixed = false,
}: {
  addLinkRef?: RefObject<HTMLDivElement>;
  isAddLinkFixed?: boolean;
}) => {
  const addLinkClass = isAddLinkFixed
    ? `${styles.AddLink} ${styles.AddLinkFixed}`
    : styles.AddLink;

  return (
    <div className={addLinkClass} ref={addLinkRef}>
      <div className={styles.AddLinkItems}>
        <input
          className={styles.AddLinkInput}
          placeholder="링크를 추가하세요"
        />
        <Image
          className={styles.AddLinkIcon}
          src="images/link.svg"
          alt="링크 아이콘"
        />
        <button className={styles.AddLinkButton}>추가하기</button>
      </div>
    </div>
  );
};

export default AddLink;
