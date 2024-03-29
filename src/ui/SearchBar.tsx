import { ChangeEventHandler } from "react";
import styles from "@/styles/ui/SearchBar.module.css";
import Image from "next/image";

interface Prop {
  handleInputChange: ChangeEventHandler<HTMLInputElement>;
  handleInputClear: () => void;
  searchTerm: string;
}

const SearchBar: React.FC<Prop> = ({
  handleInputChange,
  handleInputClear,
  searchTerm,
}) => {
  return (
    <>
      <div className={styles.SearchBar}>
        <input
          className={styles.SearchBarInput}
          type="search"
          placeholder="링크를 검색해 보세요."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <Image src="images/search.svg" alt="검색" className={styles.lenzIcon} />
        <button onClick={handleInputClear}>
          {!!searchTerm && (
            <Image
              src="images/search-clear.svg"
              alt="지우기"
              className={styles.clearIcon}
            />
          )}
        </button>
      </div>
      {!!searchTerm.trim() && (
        <div className={styles.SearchResult}>
          <span>{searchTerm.trim()}</span>
          <span className={styles.lightText}>으로 검색한 결과입니다.</span>
        </div>
      )}
    </>
  );
};

export default SearchBar;
