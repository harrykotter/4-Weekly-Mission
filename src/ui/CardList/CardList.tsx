import { ReactNode } from "react";
import styles from "./CardList.module.css";

interface CardListProp {
  children: ReactNode;
}

export const CardList = ({ children }: CardListProp) => {
  return <div className="CardList">{children}</div>;
};
