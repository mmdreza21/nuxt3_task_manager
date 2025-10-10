import type { ApiCallCommon } from "./ApiCallCommon";

export type UserLoginDTO = {
  email: string;
  password: string;
};

export type UserOtpLoginDTO = {
  email: string;
  otp: string;
  password: string;
};

export type OAthReqDTO = {
  token: string;
  referred_by?: string;
};

export type SendOtpDTO = {
  email: string;
};

export type OtpReqDTO = {
  email: string;
  otp: string;
};

export type SuccessLogin = {
  expires_in: number;
  access_token: string;
  token_type: string;
};

export type signUpResponse = {
  user: {
    email: string;
    email_verified_at: string;
  };
};

export type UserType = ApiCallCommon & {
  birthday: string;
  email: string;
  gender: string;
  google_id: string;
  phone: string;
  roles: string;
  name: string;
};

export type AuthStoreType = {
  user: UserType | null;
  loggedIn: boolean;
};

export type userUpdateDto = Pick<
  UserType,
  "birthday" | "email" | "gender" | "phone" | "roles" | "name"
>;
