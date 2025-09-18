export interface AuthStoreType {
  loggedIn: boolean;
  user: UserType | null;
}
export interface UserType {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  role: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface SuccessLogin {
  accessToken: string;
}
