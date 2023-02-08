import { useNavigate } from "react-router-dom";

import LoginView from "./LoginView";

import { useHttpClient } from "../../../common/hooks/http-hook";
import { useAuth } from "../../../common/hooks/auth-hook";
import { useAuthDispatch } from "../../../common/context/authContext";
import { LoginHandler } from "../../../common/api/userApi";

export default function Login() {
  const navigate = useNavigate();

  const dispatch = useAuthDispatch();

  const auth = useAuth();
  const { isLoading, sendRequest, error, clearError } = useHttpClient();

  const onSubmit = async (data: any) => {
    try {
      const { userId, token } = await LoginHandler(data, sendRequest);
      auth.login(userId, token);
      navigate("/");
    } catch (err: any) {
      dispatch({ type: "SET_AUTH_ERROR" });
    }
  };

  const props = {
    isLoading,
    error,
    clearError,
    onSubmit,
  };

  return <LoginView {...props} />;
}