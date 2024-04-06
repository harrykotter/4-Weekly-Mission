import styles from "@/styles/pages/SignPage.module.css";
import { MouseEventHandler, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import EmailInput from "@/src/ui/EmailInput";
import PasswordInput from "@/src/ui/PasswordInput";
import PasswordConfirmInput from "@/src/ui/PasswordConfirmInput";

interface FormValue {
  email: string;
  password: string;
  passwordConfirm?: string;
}

const Signup: React.FC = () => {
  const [isPasswordOpen, setIsPasswordOpen] = useState<boolean>(false);
  const [isPasswordConfirmOpen, setIsPasswordConfirmOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValue>({ mode: "onBlur" });

const passwordValue = getValues('password');

  const handlePasswordEyeconClick: MouseEventHandler<HTMLImageElement> = () => {
    setIsPasswordOpen(!isPasswordOpen);
  };
  const handlePasswordConfirmEyeconClick: MouseEventHandler<HTMLImageElement> = () => {
    setIsPasswordConfirmOpen(!isPasswordConfirmOpen);
  };

  const onSubmit: SubmitHandler<FormValue> = (data) => {
    console.log(data);
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
            <EmailInput register={register} inputError={errors.email?.message} />
            <PasswordInput
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
              handleEyeconClick={handlePasswordConfirmEyeconClick}/>
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
