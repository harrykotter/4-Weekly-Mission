import styles from "@/styles/pages/SigninPage.module.css";
import { MouseEventHandler, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import EmailInput from "@/src/ui/EmailInput";
import PasswordInput from "@/src/ui/PasswordInput";
import useAsyncCallback from "@/src/hooks/useAsyncCallback";
import { axiosInstance } from "@/src/util/axiosInstance";
import Router from "next/router";

interface FormValue {
  email: string;
  password: string;
}

const Signin: React.FC = () => {
  const [isPasswordOpen, setIsPasswordOpen] = useState<boolean>(false);

  const postUserInfo = (signinData: FormValue) => axiosInstance.post("sign-in", signinData);
  const { wrappedFunction: postSignin } = useAsyncCallback(postUserInfo);

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
          <form className={styles.InputForm} onSubmit={handleSubmit(onSubmit)}>
            <EmailInput register={register} inputError={errors.email?.message} />
            <PasswordInput
              register={register}
              inputError={errors.password?.message}
              isPasswordOpen={isPasswordOpen}
              handleEyeconClick={handleEyeconClick}
            />
            <button className={styles.SubmitButton} type='submit'>
              로그인
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;
