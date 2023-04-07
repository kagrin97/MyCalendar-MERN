import React from "react";
import { useForm } from "react-hook-form";
import "./Login.css";

import ErrorModal from "../../../../common/components/UIElements/ErrorModal";
import LoadingSpinner from "../../../../common/components/UIElements/LoadingSpinner";
import { PropsType } from "./type";

import Button from "../../../../common/components/UIElements/Button";

interface FormValue {
  email: string;
  password: string;
}

export default function LoginView({
  isLoading,
  error,
  clearError,
  onSubmit,
}: PropsType) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({ mode: "onChange" });

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal error={error} onClear={clearError} />
      <form className="form-control" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control__items ">
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="text"
            placeholder="test@email.com"
            {...register("email", {
              required: "이메일은 필수 입력입니다.",
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                message: "이메일 형식에 맞지 않습니다.",
              },
            })}
          />
          {errors.email && <small role="alert">{errors.email.message}</small>}
        </div>

        <div className="form-control__items">
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            placeholder="*******"
            {...register("password", {
              required: "비밀번호는 필수 입력입니다.",
              minLength: {
                value: 7,
                message: "7자리 이상 비밀번호를 입력하세요.",
              },
            })}
          />
          {errors.password && (
            <small role="alert">{errors.password.message}</small>
          )}
        </div>

        <Button type="submit">로그인</Button>
      </form>
    </React.Fragment>
  );
}
