import type { ApiCallCommon } from "./ApiCallCommon";

export type UserLoginDTO = {
  email: string;
  password: string;
};
export type UserSignDTO = {
  name: string;
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
  email: string;
  roles: string;
  name: string;
};

export type AuthStoreType = {
  user: UserType | null;
  loggedIn: boolean;
};

export type userUpdateDto = Pick<UserType, "email" | "roles" | "name">;
