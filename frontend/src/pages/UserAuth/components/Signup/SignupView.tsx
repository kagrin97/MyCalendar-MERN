import React from "react";
import { useForm } from "react-hook-form";

import { PropsType } from "./type";

import LoadingSpinner from "../../../../common/components/UIElements/LoadingSpinner";
import ErrorModal from "../../../../common/components/UIElements/ErrorModal";
import Button from "../../../../common/components/UIElements/Button";

interface FormValue {
  nickName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  image: string;
}

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
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormValue>({ mode: "onChange" });

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal error={error} onClear={clearError} />
      <form className="form-control" onSubmit={handleSubmit(onSubmitSignup)}>
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

              validate: {
                check: async (email) => {
                  return checkExistingUser(email);
                },
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

        <div className="form-control__items container-img">
          <label htmlFor="picture">프로필 사진</label>
          <div className="form-control__items-img center">
            <img src={imgFile} alt="프로필 이미지" />
          </div>
          <input
            {...register("image")}
            id="picture"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={savePreViewFile}
            ref={imgRef}
          />
          <small role="alert">선택하지 않을 시 기본이미지가 적용됩니다.</small>
        </div>

        <Button type="submit">회원가입</Button>
      </form>
    </React.Fragment>
  );
}
