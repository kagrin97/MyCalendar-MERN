import { UserHttp } from "../service/UserHttp";

export const checkExistingUserHandler = (email: string | undefined) =>
  UserHttp.checkExistingUser(email);

export const createUserHandler = (data: any, sendRequest: any) =>
  UserHttp.createUser(data, sendRequest);
