import { UseFormRegister, useForm } from "react-hook-form";
import InputLayout from "./InputLayout";
import styles from "@/styles/pages/SignPage.module.css";

interface FormValue {
  email: string;
  password: string;
  passwordConfirm?: string
}

interface InputProps {
  register: UseFormRegister<FormValue>;
  inputError?: string;
  isPasswordOpen: boolean;
  handleEyeconClick: any;
  passwordValue: string;
}

const PasswordConfirmInput = ({ register, inputError, isPasswordOpen, handleEyeconClick, passwordValue }: InputProps) => {
  return (
    <InputLayout
      inputError={inputError}
      isEyeOpen={isPasswordOpen}
      handleEyeconClick={handleEyeconClick}
    >
      <label htmlFor='passwordConfirm'>비밀번호 확인</label>
      <input
        id='passwordConfirm'
        type={isPasswordOpen ? "text" : "password"}
        placeholder='비밀번호와 일치하는 값을 입력해주세요'
        className={!inputError ? styles.inputStyles : `${styles.inputStyles} ${styles.inputError}`}
        {...register("passwordConfirm", {
          validate: {
            check: (val) => {
            if (passwordValue !== val) {
                return "비밀번호가 일치하지 않습니다.";
            }
            },
        },
        })}
      ></input>
    </InputLayout>
  );
};

export default PasswordConfirmInput;
