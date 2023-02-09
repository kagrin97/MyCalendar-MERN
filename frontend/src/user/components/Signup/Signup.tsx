import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

import { useHttpClient } from "../../../common/hooks/http-hook";
import { useAuth } from "../../../common/hooks/auth-hook";
import { useAuthDispatch } from "../../../common/context/authContext";
import {
  checkExistingUserHandler,
  SignupHandler,
} from "../../../common/api/userApi";

import SignupView from "./SignupView";

import { SignupDataType } from "./type";

export default function Signup() {
  const auth = useAuth();
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();

  const { isLoading, sendRequest, error, clearError } = useHttpClient();

  const onSubmitSignup = async (data: SignupDataType) => {
    if (imgRef.current && imgRef.current.current) {
      const input = imgRef.current.current as HTMLInputElement;
      data.image = Array.from(input.files as FileList);
    }

    try {
      const { userId, token } = await SignupHandler(data, sendRequest);
      dispatch({ type: "SET_AUTH_SUCCESS", data: { userId, token } });
      auth.login(userId, token);
      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        dispatch({ type: "SET_AUTH_ERROR" });
      }
    }
  };

  const [imgFile, setImgFile] = useState<string>("img/default-Avatar.png");
  const imgRef = useRef<React.RefObject<HTMLInputElement> | undefined>();

  const savePreViewFile = () => {
    if (!imgRef.current) {
      return;
    }

    const input = imgRef.current.current as HTMLInputElement;
    if (!input || !input.files) {
      setImgFile("img/default-Avatar.png");
      return;
    }

    const file = input.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImgFile(reader.result);
      }
    };
  };

  const checkExistingUser = async (email: string | undefined) => {
    try {
      await checkExistingUserHandler(email);
    } catch (err: unknown) {
      if (err instanceof Error) {
        return err.message;
      }
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
