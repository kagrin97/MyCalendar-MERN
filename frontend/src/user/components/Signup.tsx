import { useNavigate } from "react-router-dom";

import AuthForm from "./UIElements/AuthForm";

import { useHttpClient } from "../../common/hooks/http-hook";
import { useAuth } from "../../common/hooks/auth-hook";

import { useAuthDispatch } from "../../common/context/authContext";
import { useRef, useState } from "react";

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
      formData.append("image", data.image ? data.image[0] : undefined);

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

  const [imgFile, setImgFile] = useState("img/default-Avatar.png");
  const imgRef: any = useRef();

  const savePreViewFile = () => {
    console.log(imgRef.current);
    if (imgRef.current.files.length === 0) {
      setImgFile("img/default-Avatar.png");
      return;
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
      await sendRequest(
        "http://localhost:5000/api/users/checkExistingEmail",
        "POST",
        JSON.stringify({ email }),
        {
          "Content-Type": "application/json",
        }
      );
      return;
    } catch (err: any) {
      return err.message;
    }
  };

  return (
    <AuthForm
      onSubmit={onSubmit}
      imgFile={imgFile}
      imgRef={imgRef}
      savePreViewFile={savePreViewFile}
      checkExistingUser={checkExistingUser}
      signup={true}
    />
  );
}
