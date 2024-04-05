import InputLayout from "@/src/ui/InputLayout";
import styles from "@/styles/pages/SigninPage.module.css";
import { FocusEventHandler, MouseEventHandler, useState } from "react";
import { ERROR_MESSAGE } from "@/src/util/constant";
import { useForm } from "react-hook-form";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

interface FormValue {
  email: string;
  password: string;
}

const Signin = () => {
  const [isEyeOpen, setIsEyeOpen] = useState<boolean>(false);
  const [errorPassword, setErrorPassword] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormValue>({ mode: "onBlur" });

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
            <Link href='/'>
              <Image
                width={210}
                height={40}
                src='/assets/linkbrary.svg'
                alt='Linkbrary 서비스 로고'
              />
            </Link>
            <div className={styles.SignMsg}>
              회원이 아니신가요? <Link href='/signup'>회원 가입하기</Link>
            </div>
          </div>
          <form className={styles.InputForm}>
            <InputLayout inputError={errors.email?.message}>
              <label htmlFor='email'>이메일</label>
              <input
                id='email'
                type='email'
                placeholder='이메일을 입력해주세요'
                className={
                  !errors.email?.message
                    ? styles.inputStyles
                    : `${styles.inputStyles} ${styles.inputError}`
                }
                {...register("email", {
                  required: "이메일을 입력해주세요",
                  pattern: {
                    value:
                      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                    message: "올바른 이메일 주소가 아닙니다.",
                  },
                })}
              ></input>
            </InputLayout>
            <InputLayout
              isEyeOpen={isEyeOpen}
              inputError={errors.password?.message}
              handleEyeconClick={handleEyeconClick}
            >
              <label htmlFor='password'>비밀번호</label>
              <input
                id='password'
                type={isEyeOpen ? "email" : "password"}
                placeholder='비밀번호를 입력해주세요'
                className={
                  !errors.password?.message
                    ? styles.inputStyles
                    : `${styles.inputStyles} ${styles.inputError}`
                }
                {...register("password", {
                  required: "비밀번호를 입력해주세요.",
                })}
              ></input>
            </InputLayout>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;
