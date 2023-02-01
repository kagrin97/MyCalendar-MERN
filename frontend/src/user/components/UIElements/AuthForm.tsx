import React from "react";
import { useForm } from "react-hook-form";

import "./AuthForm.css";

import Button from "../../../common/components/UIElements/Button";

interface FormValue {
  nickName?: string;
  email: string;
  password: string;
  passwordConfirm?: string;
  image?: string;
}

const AuthForm = (props: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormValue>({ mode: "onChange" });

  return (
    <form className="form-control" onSubmit={handleSubmit(props.onSubmit)}>
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

      {props.signup ? (
        <React.Fragment>
          <div className="form-control__items">
            <label htmlFor="password">비밀번호 확인</label>
            <input
              id="password"
              type="password"
              placeholder="*******"
              {...register("passwordConfirm", {
                required: "비밀번호는 필수 입력입니다.",
                minLength: {
                  value: 7,
                  message: "7자리 이상 비밀번호를 사용하세요.",
                },
                validate: {
                  check: (val) => {
                    if (getValues("password") !== val) {
                      return "비밀번호가 일치하지 않습니다.";
                    }
                  },
                },
              })}
            />
            {errors.passwordConfirm && (
              <small role="alert">{errors.passwordConfirm.message}</small>
            )}
          </div>

          <div className="form-control__items">
            <label htmlFor="nickName">닉네임</label>
            <input
              id="nickName"
              type="text"
              placeholder="닉네임을 입력해주세요"
              {...register("nickName", {
                required: "닉네임은 필수 입력입니다.",
                minLength: {
                  value: 2,
                  message: "2자리 이상 닉네임을 사용하세요.",
                },
              })}
            />
            {errors.nickName && (
              <small role="alert">{errors.nickName.message}</small>
            )}
          </div>

          <div className="form-control__items">
            <label htmlFor="picture">프로필 사진</label>
            <input
              {...register("image")}
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </div>

          <Button type="submit">회원가입</Button>
        </React.Fragment>
      ) : (
        <Button type="submit">로그인</Button>
      )}
    </form>
  );
};

export default AuthForm;
