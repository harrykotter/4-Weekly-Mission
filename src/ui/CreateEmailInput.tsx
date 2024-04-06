import { UseFormRegister } from "react-hook-form";
import InputLayout from "./InputLayout";
import styles from "@/styles/pages/SignPage.module.css";

interface FormValue {
  email: string;
  password: string;
}

interface InputValue {
  register: UseFormRegister<FormValue>;
  inputError?: string;
  onBlur?: any;
}

const CreateEmailInput = ({ register, inputError, onBlur = undefined }: InputValue) => {
  return (
    <InputLayout inputError={inputError}>
      <label htmlFor='email'>이메일</label>
      <input
        id='email'
        type='email'
        placeholder='이메일을 입력해주세요'
        className={!inputError ? styles.inputStyles : `${styles.inputStyles} ${styles.inputError}`}
        {...register("email", {
          required: "이메일을 입력해주세요",
          pattern: {
            value:
              /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
            message: "올바른 이메일 주소가 아닙니다.",
          },
        })}
        onBlur={onBlur}
      ></input>
    </InputLayout>
  );
};

export default CreateEmailInput;
