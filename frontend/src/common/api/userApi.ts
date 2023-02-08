import { UserHttp } from "../service/UserHttp";

export const checkExistingUserHandler = (email: string | undefined) =>
  UserHttp.checkExistingUser(email);

export const SignupHandler = (data: any, sendRequest: any) =>
  UserHttp.Signup(data, sendRequest);

export const LoginHandler = (data: any, sendRequest: any) =>
  UserHttp.Login(data, sendRequest);
