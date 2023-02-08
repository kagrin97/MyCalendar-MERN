import React from "react";

import { PropsType } from "./type";

import AuthForm from "../UIElements/AuthForm";
import LoadingSpinner from "../../../common/components/UIElements/LoadingSpinner";
import ErrorModal from "../../../common/components/UIElements/ErrorModal";

export default function SignupView({
  isLoading,
  error,
  clearError,
  onSubmitSignup,
  imgFile,
  imgRef,
  savePreViewFile,
  checkExistingUser,
}: PropsType) {
  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal error={error} onClear={clearError} />
      <AuthForm
        onSubmit={onSubmitSignup}
        imgFile={imgFile}
        imgRef={imgRef}
        savePreViewFile={savePreViewFile}
        checkExistingUser={checkExistingUser}
        signup={true}
      />
    </React.Fragment>
  );
}
