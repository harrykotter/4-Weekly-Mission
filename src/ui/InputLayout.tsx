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
          <Image
            width={24}
            height={16}
            src={eyecon}
            alt='눈 아이콘'
            className={styles.eyecon}
            onClick={handleEyeconClick}
          />
          // TODO
          // 이미지 태그 자체보단 button태그로 감싸
          // 시맨틱하게 유지하기
        )}
      </div>
      <span className={styles.errorText}>{inputError}</span>
    </div>
  );
};

export default InputLayout;
