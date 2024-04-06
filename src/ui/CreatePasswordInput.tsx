import { UseFormRegister } from "react-hook-form";
import InputLayout from "./InputLayout";
import styles from "@/styles/pages/SignPage.module.css";

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

const CreatePasswordInput = ({
  register,
  inputError,
  isPasswordOpen,
  handleEyeconClick,
}: InputProps) => {
  return (
    <InputLayout
      inputError={inputError}
      isEyeOpen={isPasswordOpen}
      handleEyeconClick={handleEyeconClick}
    >
      <label htmlFor='password'>비밀번호</label>
      <input
        id='password'
        type={isPasswordOpen ? "text" : "password"}
        placeholder='비밀번호를 입력해주세요'
        className={!inputError ? styles.inputStyles : `${styles.inputStyles} ${styles.inputError}`}
        {...register("password", {
          required: "비밀번호를 입력해주세요",
          minLength: {
            value: 8,
            message: "비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요",
          },
          validate: {
            check: (val) => {
              if (/^(?:\d+|\D+)$/.test(val)) {
                return "비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요";
              }
            },
          },
        })}
      ></input>
    </InputLayout>
  );
};

export default CreatePasswordInput;
