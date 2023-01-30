import { useForm } from "react-hook-form";

import { useHttpClient } from "../../common/hooks/http-hook";

interface FormValue {
  nickName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  image: string;
}

export default function Auth() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
  } = useForm<FormValue>();

  const onSubmit = async (data: any) => {
    try {
      const formData: any = new FormData();
      formData.append("email", data.email);
      formData.append("name", data.nickName);
      formData.append("password", data.password);
      formData.append("image", data.image[0]);
      const responseData = await sendRequest(
        "http://localhost:5000/api/users/signup",
        "POST",
        formData
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      {errors.nickName && <small role="alert">{errors.nickName.message}</small>}

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

      <label htmlFor="password">비밀번호</label>
      <input
        id="password"
        type="password"
        placeholder="****************"
        {...register("password", {
          required: "비밀번호는 필수 입력입니다.",
          minLength: {
            value: 8,
            message: "8자리 이상 비밀번호를 사용하세요.",
          },
        })}
      />
      {errors.password && <small role="alert">{errors.password.message}</small>}

      <label htmlFor="password">비밀번호 확인</label>
      <input
        id="password"
        type="password"
        placeholder="****************"
        {...register("passwordConfirm", {
          required: "비밀번호는 필수 입력입니다.",
          minLength: {
            value: 8,
            message: "8자리 이상 비밀번호를 사용하세요.",
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

      <label htmlFor="picture">프로필 사진</label>
      <input
        {...register("image")}
        id="picture"
        type="file"
        className="hidden"
        accept="image/*"
      />

      <button type="submit" disabled={isSubmitting}>
        로그인
      </button>
    </form>
  );
}
