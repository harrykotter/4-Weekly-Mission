import instance from "@/pages/api/instance";

export interface FormValue {
  email: string;
  password: string;
  passwordConfirm?: string;
}

export const postUserInfo = async (data: FormValue) => {
  const response = await instance.post("auth/sign-in", data);
  return response;
};

export const postCreateAccount = async (data: FormValue) => {
  const response = await instance.post("auth/sign-up", data);
  console.log(response);

  return response;
};

export const postCheckEmail = async (emailData: FormValue) => {
  const response = await instance.post("users/check-email", emailData);
  return response;
};
