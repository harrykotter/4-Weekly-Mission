import { UseFormRegister } from "react-hook-form";
import InputLayout from "./InputLayout";
import styles from "@/styles/pages/SigninPage.module.css";

interface FormValue {
  email: string;
  password: string;
}

interface InputProps {
  register: UseFormRegister<FormValue>;
  inputError?: string;
  isPasswordOpen: boolean;
  handleEyeconClick: any;
}

const PasswordInput = ({ register, inputError, isPasswordOpen, handleEyeconClick }: InputProps) => {
  return (
    <InputLayout
      inputError={inputError}
      isEyeOpen={isPasswordOpen}
      handleEyeconClick={handleEyeconClick}
    >
      <label htmlFor='password'>비밀번호</label>
      <input
        id='password'
        type={isPasswordOpen ? "email" : "password"}
        placeholder='비밀번호를 입력해주세요'
        className={!inputError ? styles.inputStyles : `${styles.inputStyles} ${styles.inputError}`}
        {...register("password", {
          required: "비밀번호를 입력해주세요",
        })}
      ></input>
    </InputLayout>
  );
};

export default PasswordInput;
