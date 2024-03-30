import Input from "@/src/ui/Input";
import styles from "@/styles/pages/SigninPage.module.css";
import { useState } from "react";

const Signin = () => {
  const [isEyeOpen, setIsEyeOpen] = useState<boolean>(false);
  return (
    <form className={styles.SignPage}>
      <div className={styles.InputForm}>
        <Input type="email" placeholder="이메일" />
        <Input
          type="password"
          placeholder="비밀번호"
          isEyeOpen={isEyeOpen}
          setIsEyeOpen={setIsEyeOpen}
        />
      </div>
    </form>
  );
};

export default Signin;
