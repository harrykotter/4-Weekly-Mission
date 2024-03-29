import { ReactNode } from "react";
import styles from "@/styles/ui/CategoryButton.module.css";

interface Props {
  children: ReactNode;
}

const CategoryButton = ({ children }: Props) => {
  return <button className={styles.CategoryButton}>{children}</button>;
};

export default CategoryButton;
