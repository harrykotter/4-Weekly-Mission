import Image from "next/image";
import {
  Dispatch,
  FocusEventHandler,
  MouseEventHandler,
  SetStateAction,
  useState,
} from "react";
import styles from "@/styles/ui/Input.module.css";
import { ERROR_MESSAGE } from "@/src/util/constant";

interface Prop {
  placeholder: string;
  type: string;
  isEyeOpen?: boolean;
  setIsEyeOpen?: Dispatch<SetStateAction<boolean>>;
  // handleFocusout: any;
  // inputError: string | null;
}

const Input = ({
  placeholder,
  type,
  isEyeOpen,
  setIsEyeOpen,
  // handleFocusout,
  // inputError,
}: Prop) => {
  const [inputError, setInputError] = useState<string | null>(null);

  const handleFocusout: FocusEventHandler<HTMLInputElement> = (e) => {
    const eventTarget = e.target;
    if (eventTarget.value?.trim() === "") {
      setInputError(ERROR_MESSAGE.wrongInput);
    } else setInputError(null);
  };
  const handleEyeconClick: MouseEventHandler<HTMLImageElement> = () => {
    if (setIsEyeOpen) setIsEyeOpen(!isEyeOpen);
  };
  const eyecon = isEyeOpen ? "/assets/eye-on.svg" : "/assets/eye-off.svg";
  const inputStyle =
    inputError !== null
      ? `${styles.inputStyles} ${styles.inputError}`
      : styles.inputStyles;

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
