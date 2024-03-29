import { useState, useRef, useEffect, MouseEventHandler } from "react";
import styles from "@/styles/ui/Card.module.css";

interface Prop {
  url: string;
  imageSource: string;
  alt: string;
  elapsedTime: string;
  description?: string;
  createdAt: string;
  favorite?: boolean;
  handleModalClick?: MouseEventHandler<HTMLElement>;
}

export const Card = ({
  url,
  imageSource,
  alt,
  elapsedTime,
  description,
  createdAt,
  favorite,
  handleModalClick,
}: Prop) => {
  const [kebabOpen, setKebabOpen] = useState(false);

  const isFolder = typeof favorite !== "undefined";
  const isFavorite = favorite
    ? "images/full-star.svg"
    : "images/empty-star.svg";
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick: EventListener = (ev: Event) => {
      const target = ev.target;
      if (ref.current && !ref.current.contains(target as Node)) {
        setKebabOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [kebabOpen]);

  const handleKebabClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setKebabOpen(true);
  };

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <div className={styles.Card}>
        <div
          style={{
            backgroundImage: `url(${imageSource ?? "images/card-default.png"})`,
          }}
          className={styles.CardImage}
        >
          {favorite !== undefined && (
            <img className={styles.starButton} alt="star" src={isFavorite} />
          )}
        </div>
        <div className={styles.CardContent}>
          <div className={styles.CardContentTop}>
            <span className={styles.CardContentElapsedTime}>{elapsedTime}</span>
            {isFolder && (
              <button onClick={handleKebabClick}>
                <img
                  className={styles.kebab}
                  src="images/kebab.png"
                  alt="menu"
                />
              </button>
            )}
            {kebabOpen && (
              <div className={styles.kebabMenu} ref={ref}>
                <button
                  id="deleteLink"
                  className={styles.kebabMenuButton}
                  data-url={url}
                  onClick={handleModalClick}
                >
                  삭제하기
                </button>
                <button
                  id="addToFolder"
                  className={styles.kebabMenuButton}
                  onClick={handleModalClick}
                >
                  폴더에 추가
                </button>
              </div>
            )}
          </div>
          <p className={styles.CardContentDescription}>{description}</p>
          <span className={styles.CardContentCreatedAt}>{createdAt}</span>
        </div>
      </div>
    </a>
  );
};
