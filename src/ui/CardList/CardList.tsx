import { ReactNode } from "react";
import styles from "@/styles/ui/CardList.module.css";

interface CardListProp {
  children: ReactNode;
}

export const CardList = ({ children }: CardListProp) => {
  return <div className={styles.CardList}>{children}</div>;
};
