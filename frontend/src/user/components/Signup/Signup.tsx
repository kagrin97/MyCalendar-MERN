import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useHttpClient } from "../../../common/hooks/http-hook";
import { useAuth } from "../../../common/hooks/auth-hook";
import { useAuthDispatch } from "../../../common/context/authContext";
import {
  checkExistingUserHandler,
  SignupHandler,
} from "../../../common/api/userApi";

import SignupView from "./SignupView";

export default function Signup() {
  const auth = useAuth();
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();

  const { isLoading, sendRequest, error, clearError } = useHttpClient();

  const onSubmitSignup = async (data: any) => {
    try {
      const { userId, token } = await SignupHandler(data, sendRequest);
      dispatch({ type: "SET_AUTH_SUCCESS", data: { userId, token } });
      auth.login(userId, token);
      navigate("/");
    } catch (err: any) {
      dispatch({ type: "SET_AUTH_ERROR" });
    }
  };

  const [imgFile, setImgFile] = useState("img/default-Avatar.png");
  const imgRef: any = useRef();

  const savePreViewFile = () => {
    if (imgRef.current.files.length === 0) {
      setImgFile("img/default-Avatar.png");
    }

    const file = imgRef.current.files[0];
    const reader: any = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  const checkExistingUser = async (email: string | undefined) => {
    try {
      await checkExistingUserHandler(email);
    } catch (err: any) {
      return err.message;
    }
  };

  const props = {
    isLoading,
    error,
    clearError,
    onSubmitSignup,
    imgFile,
    imgRef,
    savePreViewFile,
    checkExistingUser,
  };

  return <SignupView {...props} />;
}