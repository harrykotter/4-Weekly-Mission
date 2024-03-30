import Input from "@/src/ui/Input";
import styles from "@/styles/pages/SigninPage.module.css";
import { FocusEventHandler, MouseEventHandler, useState } from "react";
import { ERROR_MESSAGE } from "@/src/util/constant";

const Signin = () => {
  const [isEyeOpen, setIsEyeOpen] = useState<boolean>(false);
  const [errorEmail, setErrorEmail] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");

  const handleEmailFocusout: FocusEventHandler<HTMLInputElement> = (e) => {
    const eventTarget = e.target;
    if (eventTarget.value?.trim() === "") {
      setErrorEmail(ERROR_MESSAGE.wrongInput);
    } else setErrorEmail("");
  };

  const handlePasswordFocusout: FocusEventHandler<HTMLInputElement> = (e) => {
    const eventTarget = e.target;
    if (eventTarget.value?.trim() === "") {
      setErrorPassword(ERROR_MESSAGE.wrongInput);
    } else setErrorPassword("");
  };

  const handleEyeconClick: MouseEventHandler<HTMLImageElement> = () => {
    setIsEyeOpen(!isEyeOpen);
  };
  return (
    <form className={styles.SignPage}>
      <div className={styles.InputForm}>
        <Input
          type="email"
          placeholder="이메일"
          handleFocusout={handleEmailFocusout}
          inputError={errorEmail}
        />
        <Input
          type={isEyeOpen ? "email" : "password"}
          placeholder="비밀번호"
          isEyeOpen={isEyeOpen}
          inputError={errorPassword}
          handleFocusout={handlePasswordFocusout}
          handleEyeconClick={handleEyeconClick}
        />
      </div>
    </form>
  );
};

export default Signin;
