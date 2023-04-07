import { UserHttp } from "../service/UserHttp";

import { sendRequestType } from "../types/http";

import { SignupDataType } from "../../pages/UserAuth/components/Signup/type";

import { LoginDataType } from "../../pages/UserAuth/components/Login/type";

export const checkExistingUserHandler = (email: string | undefined) =>
  UserHttp.checkExistingUser(email);

export const SignupHandler = (
  data: SignupDataType,
  sendRequest: sendRequestType
) => UserHttp.Signup(data, sendRequest);

export const LoginHandler = (
  data: LoginDataType,
  sendRequest: sendRequestType
) => UserHttp.Login(data, sendRequest);
