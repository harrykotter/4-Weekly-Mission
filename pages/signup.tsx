import styles from "@/styles/pages/SignPage.module.css";
import { FocusEventHandler, MouseEventHandler, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import EmailInput from "@/src/ui/EmailInput";
import PasswordConfirmInput from "@/src/ui/PasswordConfirmInput";
import CreatePasswordInput from "@/src/ui/CreatePasswordInput";
import useAsyncCallback from "@/src/hooks/useAsyncCallback";
import { axiosInstance } from "@/src/util/axiosInstance";
import Router from "next/router";

interface FormValue {
  email: string;
  password: string;
  passwordConfirm?: string;
}

const Signup: React.FC = () => {
  const [isPasswordOpen, setIsPasswordOpen] = useState<boolean>(false);
  const [isPasswordConfirmOpen, setIsPasswordConfirmOpen] = useState<boolean>(false);

  const postCheckEmail = (emailData: FormValue) => axiosInstance.post("check-email", emailData);
  const { wrappedFunction: postEmailValidation } = useAsyncCallback(postCheckEmail);

  const postCehckAccount = (data: FormValue) => axiosInstance.post("sign-up", data);
  const { wrappedFunction: postSignup } = useAsyncCallback(postCehckAccount);

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm<FormValue>({ mode: "onBlur" });

  const passwordValue = getValues("password");

  const checkEmail = async (emailInput: string) => {
    const response = await postEmailValidation({ email: emailInput });
    if (response?.status !== 200) {
      setError("email", { message: "이미 사용 중인 이메일입니다" });
    }
  };

  const handlePasswordEyeconClick: MouseEventHandler<HTMLImageElement> = () => {
    setIsPasswordOpen(!isPasswordOpen);
  };
  const handlePasswordConfirmEyeconClick: MouseEventHandler<HTMLImageElement> = () => {
    setIsPasswordConfirmOpen(!isPasswordConfirmOpen);
  };

  const handleEmailOnBlur: FocusEventHandler<HTMLInputElement> = async (e) => {
    checkEmail(e.target.value.trim());
  };

  const onSubmit: SubmitHandler<FormValue> = async (data) => {
    checkEmail(data.email);
    if (errors.email?.message) return;
    const response = await postSignup(data);
    if (response?.status === 200) Router.push("/folder");
  };

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <div className={styles.SignPage}>
        <div className={styles.FormWrapper}>
          <div className={styles.SignHeader}>
            <Link href='/'>
              <Image
                width={210}
                height={40}
                src='/assets/linkbrary.svg'
                alt='Linkbrary 서비스 로고'
              />
            </Link>
            <div className={styles.SignMsg}>
              이미 회원이신가요? <Link href='/signin'>로그인하기</Link>
            </div>
          </div>
          <form className={styles.InputForm} onSubmit={handleSubmit(onSubmit)}>
            <EmailInput
              register={register}
              inputError={errors.email?.message}
              onBlur={handleEmailOnBlur}
            />
            <CreatePasswordInput
              register={register}
              inputError={errors.password?.message}
              isPasswordOpen={isPasswordOpen}
              handleEyeconClick={handlePasswordEyeconClick}
            />
            <PasswordConfirmInput
              register={register}
              inputError={errors.passwordConfirm?.message}
              isPasswordOpen={isPasswordConfirmOpen}
              passwordValue={passwordValue}
              handleEyeconClick={handlePasswordConfirmEyeconClick}
            />
            <button className={styles.SubmitButton} type='submit'>
              회원 가입하기
            </button>
            <div className={styles.SocialButton}>
              다른 방식으로 가입하기
              <div className={styles.IconWrapper}>
                <Link href='https://www.google.com'>
                  <Image width={42} height={42} alt='google' src='/assets/google-icon.svg' />
                </Link>
                <Link href='https://www.kakaocorp.com/page'>
                  <Image width={42} height={42} alt='kakaotalk' src='/assets/kakaotalk-icon.svg' />
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
