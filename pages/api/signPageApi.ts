import instance from "@/src/util/instance";

export interface FormValue {
  email: string;
  password: string;
  passwordConfirm?: string;
}

export const postUserInfo = (data?: FormValue) =>
  instance.post("auth/sign-in", data);

export const postCreateAccount = (data: FormValue) =>
  instance.post("auth/sign-up", data);

export const postCheckEmail = (emailData: FormValue) =>
  instance.post("users/check-email", emailData);
