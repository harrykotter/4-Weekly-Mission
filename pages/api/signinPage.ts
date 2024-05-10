import instance from "@/src/util/instance";
// import { FormValue } from "../signin";

export interface FormValue {
  email: string;
  password: string;
  passwordConfirm?: string;
}

export const postUserInfo = (signinData?: FormValue) =>
  instance.post("sign-in", signinData);

export const postAccountCheck = (data: FormValue) =>
  instance.post("sign-up", data);
