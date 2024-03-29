import styles from "@/styles/ui/FolderInfo.module.css";
import Image from "next/image";

interface Props {
  profileImage: string;
  ownerName: string;
  folderName: string;
}

const FolderInfo = ({ profileImage, ownerName, folderName }: Props) => {
  return (
    <div className={styles.FolderInfo}>
      <img
        className={styles.FolderInfoProfile}
        src={profileImage}
        alt="폴더 소유자 프로필 이미지"
      />
      <span className={styles.FolderInfoOwner}>{ownerName}</span>
      <h2 className={styles.FolderInfoFolder}>{folderName}</h2>
    </div>
  );
};

export default FolderInfo;
