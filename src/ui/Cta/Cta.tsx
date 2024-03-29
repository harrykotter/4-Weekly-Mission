import { ReactNode } from "react";
import styles from "./Cta.module.css";

interface Prop {
  children: ReactNode;
}

const Cta = ({ children }: Prop) => {
  return <div className="Cta">{children}</div>;
};

export default Cta;
