import { useNavigate } from "react-router-dom";

import AuthForm from "./UIElements/AuthForm";

import { useHttpClient } from "../../common/hooks/http-hook";
import { useAuth } from "../../common/hooks/auth-hook";

import { useAuthDispatch } from "../../common/context/authContext";

export default function Signup() {
  const auth = useAuth();
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const onSubmit = async (data: any) => {
    try {
      const formData: any = new FormData();
      formData.append("email", data.email);
      formData.append("name", data.nickName);
      formData.append("password", data.password);
      formData.append("image", data.image[0]);

      const { userId, token } = await sendRequest(
        "http://localhost:5000/api/users/signup",
        "POST",
        formData
      );
      dispatch({ type: "SET_AUTH_SUCCESS", data: { userId, token } });
      auth.login(userId, token);
      navigate("/");
    } catch (err) {
      dispatch({ type: "SET_AUTH_ERROR" });
    }
    return;
  };

  return <AuthForm onSubmit={onSubmit} signup={true} />;
}
