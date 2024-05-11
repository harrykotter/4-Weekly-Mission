import styles from "@/styles/pages/SignPage.module.css";
import { MouseEventHandler, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import EmailInput from "@/src/ui/EmailInput";
import PasswordInput from "@/src/ui/PasswordInput";
import useAsync from "@/src/hooks/useAsync";
import Router from "next/router";
import { postUserInfo, FormValue } from "./api/signPageApi";

const Signin: React.FC = () => {
  if (localStorage.getItem("accessToken")) Router.push("/folder");

  const [isPasswordOpen, setIsPasswordOpen] = useState<boolean>(false);
  const { wrappedFunction: postSignin } = useAsync<any>(postUserInfo);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValue>({ mode: "onBlur" });

  const handleEyeconClick: MouseEventHandler<HTMLImageElement> = () => {
    setIsPasswordOpen(!isPasswordOpen);
  };

  const onSubmit: SubmitHandler<FormValue> = async (data) => {
    const response = await postSignin(data);
    if (response?.status === 200) {
      const result = response.data;
      localStorage.setItem("accessToken", result.accessToken);
      Router.push("/folder");
    } else {
      setError("email", { message: "이메일을 확인해주세요" });
      setError("password", { message: "비밀번호를 확인해주세요" });
    }
  };

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <div className={styles.SignPage}>
        <div className={styles.FormWrapper}>
          <div className={styles.SignHeader}>
            <Link href="/">
              <Image
                width={210}
                height={40}
                src="/assets/linkbrary.svg"
                alt="Linkbrary 서비스 로고"
              />
            </Link>
            <div className={styles.SignMsg}>
              회원이 아니신가요? <Link href="/signup">회원 가입하기</Link>
            </div>
          </div>
          <form className={styles.InputForm} onSubmit={handleSubmit(onSubmit)}>
            <EmailInput
              register={register}
              inputError={errors.email?.message}
            />
            <PasswordInput
              register={register}
              inputError={errors.password?.message}
              isPasswordOpen={isPasswordOpen}
              handleEyeconClick={handleEyeconClick}
            />
            <button className={styles.SubmitButton} type="submit">
              로그인
            </button>
            <div className={styles.SocialButton}>
              소셜 로그인
              <div className={styles.IconWrapper}>
                <Link href="https://www.google.com">
                  <Image
                    width={42}
                    height={42}
                    alt="google"
                    src="/assets/google-icon.svg"
                  />
                </Link>
                <Link href="https://www.kakaocorp.com/page">
                  <Image
                    width={42}
                    height={42}
                    alt="kakaotalk"
                    src="/assets/kakaotalk-icon.svg"
                  />
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;
