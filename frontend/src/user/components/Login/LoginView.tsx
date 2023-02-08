import React from "react";

import ErrorModal from "../../../common/components/UIElements/ErrorModal";
import LoadingSpinner from "../../../common/components/UIElements/LoadingSpinner";
import { PropsType } from "./type";
import AuthForm from "../UIElements/AuthForm";

export default function LoginView({
  isLoading,
  error,
  clearError,
  onSubmit,
}: PropsType) {
  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal error={error} onClear={clearError} />
      <AuthForm onSubmit={onSubmit} />
    </React.Fragment>
  );
}
