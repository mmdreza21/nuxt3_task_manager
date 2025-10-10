import type { OAthReqDTO, UserLoginDTO, UserOtpLoginDTO } from "./UserTypes";

export type LoginStates = {
  loginEmail: "loginEmail";
  otp: "otp";
  setReSetPass: "setReSetPass";
  forgetPass: "forgetPass";
  reset: "reset";
  password: "password";
};
export type LoginCredentials = UserLoginDTO | UserOtpLoginDTO | OAthReqDTO;

export interface ILoginProcess {
  authCookie: Ref<string | null>;
  states: globalThis.Ref<LoginStates>;
  state: Ref<string>;
  loading: Ref<boolean>;
  emailState: globalThis.Ref<string>;
  fireNotification: (
    snackbarColorProp: string,
    snakeBarTextsProp: string
  ) => void;
  login: (credentials: LoginCredentials) => void;
}
