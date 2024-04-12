import { UseFormRegister } from "react-hook-form";
import InputLayout from "./InputLayout";
import styles from "@/styles/pages/SignPage.module.css";
import { axiosInstance } from "../util/axiosInstance";
import useAsync from "../hooks/useAsync";

interface FormValue {
  email: string;
  password: string;
}

interface InputValue {
  register: UseFormRegister<FormValue>;
  inputError?: string;
}

const CreateEmailInput = ({ register, inputError }: InputValue) => {
  const postCheckEmail = (emailData: FormValue) => axiosInstance.post("check-email", emailData);
  const { wrappedFunction: postEmailValidation } = useAsync(postCheckEmail);

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
          validate: {
            check: async (val) => {
              const response = await postEmailValidation({ email: val });
              if (response?.status !== 200) {
                return "이미 사용 중인 이메일입니다";
              }
            },
          },
        })}
      ></input>
    </InputLayout>
  );
};

export default CreateEmailInput;
