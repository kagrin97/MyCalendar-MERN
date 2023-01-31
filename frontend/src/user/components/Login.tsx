import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useHttpClient } from "../../common/hooks/http-hook";
import { useAuth } from "../../common/hooks/auth-hook";

import {
  useAuthState,
  useAuthDispatch,
} from "../../common/context/authContext";

interface FormValue {
  nickName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  image: string;
}

export default function Login() {
  const navigate = useNavigate();

  const dispatch = useAuthDispatch();

  const auth = useAuth();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
  } = useForm<FormValue>();

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">이메일</label>
      <input
        id="email"
        type="text"
        placeholder="test@email.com"
        {...register("email", {
          required: "이메일은 필수 입력입니다.",
        })}
      />
      {errors.email && <small role="alert">{errors.email.message}</small>}

      <label htmlFor="password">비밀번호</label>
      <input
        id="password"
        type="password"
        placeholder="****************"
        {...register("password", {
          required: "비밀번호는 필수 입력입니다.",
        })}
      />
      {errors.password && <small role="alert">{errors.password.message}</small>}

      <button type="submit" disabled={isSubmitting}>
        로그인
      </button>
    </form>
  );
}
