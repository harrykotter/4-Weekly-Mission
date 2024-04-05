import Input from "@/src/ui/Input";
import styles from "@/styles/pages/SigninPage.module.css";
import { FocusEventHandler, MouseEventHandler, useState } from "react";
import { ERROR_MESSAGE } from "@/src/util/constant";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

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
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <div className={styles.SignPage}>
        <div className={styles.FormWrapper}>
        <div className={styles.SigninHeader}>
        <Link href="/">
          <Image
            width={210}
            height={40}
            src="/assets/linkbrary.svg"
            alt="Linkbrary 서비스 로고"
          />
        </Link>
        <div className={styles.SignMsg}>회원이 아니신가요? <Link href="/signup">회원 가입하기</Link></div>
       </div>
       <form className={styles.InputForm}>
          <Input
          title="이메일"
            type="email"
            placeholder="이메일을 입력해주세요"
            handleFocusout={handleEmailFocusout}
            inputError={errorEmail}
          />
          <Input
          title="비밀번호"
            type={isEyeOpen ? "email" : "password"}
            placeholder="비밀번호를 입력해주세요"
            isEyeOpen={isEyeOpen}
            inputError={errorPassword}
            handleFocusout={handlePasswordFocusout}
            handleEyeconClick={handleEyeconClick}
          />
      </form>
      </div>
      </div>
    </>
  );
};

export default Signin;
