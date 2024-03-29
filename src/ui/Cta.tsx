import { ReactNode } from "react";
import styles from "@/styles/ui/Cta.module.css";

interface Prop {
  children: ReactNode;
}

const Cta = ({ children }: Prop) => {
  return <div className={styles.Cta}>{children}</div>;
};

export default Cta;
