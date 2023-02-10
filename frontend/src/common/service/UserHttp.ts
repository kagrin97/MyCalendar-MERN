import { sendRequestType } from "../types/http";

import { LoginDataType } from "../../user/components/Login/type";
import { SignupDataType } from "../../user/components/Signup/type";

export const UserHttp = {
  BASE_URL: process.env.REACT_APP_BACKEND_URL + "/users",

  async checkExistingUser(email: string | undefined) {
    try {
      const response = await fetch(`${this.BASE_URL}/checkExistingEmail`, {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  },

  async Signup(data: SignupDataType, sendRequest: sendRequestType) {
    const formData: FormData = new FormData();
    formData.append("email", data.email);
    formData.append("name", data.nickName);
    formData.append("password", data.password);
    if (data.image instanceof Blob) {
      formData.append("image", data.image);
    }
    return await sendRequest(`${this.BASE_URL}/signup`, "POST", formData);
  },

  async Login(data: LoginDataType, sendRequest: sendRequestType) {
    const httpBody = { email: data.email, password: data.password };
    return await sendRequest(
      `${this.BASE_URL}/login`,
      "POST",
      JSON.stringify(httpBody),
      {
        "Content-Type": "application/json",
      }
    );
  },
};
