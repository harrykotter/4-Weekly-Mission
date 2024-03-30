import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import styles from "@/styles/ui/Input.module.css";

interface Prop {
  placeholder: string;
  type: string;
  handleFocusout: any;
  inputError: string;
  isEyeOpen?: boolean;
  handleEyeconClick?: any;
}

const Input = ({
  placeholder,
  type,
  isEyeOpen,
  handleFocusout,
  inputError,
  handleEyeconClick,
}: Prop) => {
  const eyecon = isEyeOpen ? "/assets/eye-on.svg" : "/assets/eye-off.svg";
  const inputStyle =
    inputError === ""
      ? styles.inputStyles
      : `${styles.inputStyles} ${styles.inputError}`;

  return (
    <div className={styles.InputWrapper}>
      <label htmlFor={type}>{placeholder}</label>
      <div className={styles.Input}>
        <input
          id={type}
          type={type}
          placeholder={placeholder}
          onBlur={handleFocusout}
          className={inputStyle}
        ></input>
        {isEyeOpen !== undefined && (
          <Image
            width={24}
            height={16}
            src={eyecon}
            alt="눈 아이콘"
            className={styles.eyecon}
            onClick={handleEyeconClick}
          />
        )}
      </div>
      <span className={styles.errorText}>{inputError}</span>
    </div>
  );
};

export default Input;
