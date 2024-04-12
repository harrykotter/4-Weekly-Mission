import Image from "next/image";
import styles from "@/styles/ui/InputLayout.module.css";
import { ReactNode } from "react";

interface Prop {
  children: ReactNode;
  inputError?: string;
  isEyeOpen?: boolean;
  handleEyeconClick?: any;
}

const InputLayout = ({ isEyeOpen, inputError, handleEyeconClick, children }: Prop) => {
  const eyecon = isEyeOpen ? "/assets/eye-on.svg" : "/assets/eye-off.svg";

  return (
    <div className={styles.InputLayout}>
      <div className={styles.InputWrapper}>
        {children}
        {isEyeOpen !== undefined && (
          <button onClick={handleEyeconClick}>
            <Image width={24} height={16} src={eyecon} alt='눈 아이콘' className={styles.eyecon} />
          </button>
        )}
      </div>
      <span className={styles.errorText}>{inputError}</span>
    </div>
  );
};

export default InputLayout;
