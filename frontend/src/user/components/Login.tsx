import React from "react";
import { useNavigate } from "react-router-dom";

import AuthForm from "./UIElements/AuthForm";

import { useHttpClient } from "../../common/hooks/http-hook";
import { useAuth } from "../../common/hooks/auth-hook";
import { useAuthDispatch } from "../../common/context/authContext";
import LoadingSpinner from "../../common/components/UIElements/LoadingSpinner";
import { LoginHandler } from "../../common/api/userApi";
import ErrorModal from "../../common/components/UIElements/ErrorModal";

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

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal error={error} onClear={clearError} />
      <AuthForm onSubmit={onSubmit} />
    </React.Fragment>
  );
}
