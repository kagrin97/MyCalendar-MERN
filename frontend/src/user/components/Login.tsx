import React from "react";
import { useNavigate } from "react-router-dom";

import AuthForm from "./UIElements/AuthForm";

import { useHttpClient } from "../../common/hooks/http-hook";
import { useAuth } from "../../common/hooks/auth-hook";
import { useAuthDispatch } from "../../common/context/authContext";
import LoadingSpinner from "../../common/components/UIElements/LoadingSpinner";

export default function Login() {
  const navigate = useNavigate();

  const dispatch = useAuthDispatch();

  const auth = useAuth();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const onSubmit = async (data: any) => {
    try {
      const httpBody = { email: data.email, password: data.password };
      const { userId, token } = await sendRequest(
        "http://localhost:5000/api/users/login",
        "POST",
        JSON.stringify(httpBody),
        {
          "Content-Type": "application/json",
        }
      );
      auth.login(userId, token);
      navigate("/");
    } catch (err) {
      dispatch({ type: "SET_AUTH_ERROR" });
    }
  };

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      <AuthForm onSubmit={onSubmit} />
    </React.Fragment>
  );
}
