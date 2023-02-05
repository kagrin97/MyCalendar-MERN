import React, { useState } from "react";
import { useForm } from "react-hook-form";

import "./CalendarItem.css";

import Button from "../../common/components/UIElements/Button";
import { useAuthState } from "../../common/context/authContext";
import { useHttpClient } from "../../common/hooks/http-hook";

interface FormValue {
  title: string;
  description: string;
}

export default function CalendarItem(props: any) {
  const { isLoading, sendRequest } = useHttpClient();
  const { userId } = useAuthState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({
    mode: "onChange",
    defaultValues: {
      title: props.calendar?.title || "",
      description: props.calendar?.description || "",
    },
  });

  const [isEdit, setEdit] = useState(false);

  const toggleEditMode = () => {
    setEdit(!isEdit);
  };

  const onUpdateCalendar = async (data: any) => {
    try {
      const httpBody = {
        title: data.title,
        description: data.description,
      };
      const { calendar } = await sendRequest(
        `http://localhost:5000/api/calendar/${props.calendar.id}`,
        "PATCH",
        JSON.stringify(httpBody),
        {
          "Content-Type": "application/json",
        }
      );
      props.setCalendar(calendar);
      toggleEditMode();
    } catch (err: any) {
      return err.message;
    }
  };

  const onCreateCalendar = async (data: any) => {
    try {
      const httpBody = {
        title: data.title,
        description: data.description,
        createdDate: props.calendarDate,
        userId,
      };
      const { calendar } = await sendRequest(
        `http://localhost:5000/api/calendar`,
        "POST",
        JSON.stringify(httpBody),
        {
          "Content-Type": "application/json",
        }
      );
      props.setCalendar(calendar);
      toggleEditMode();
    } catch (err: any) {
      return err.message;
    }
  };

  return (
    <React.Fragment>
      {isEdit ? (
        <form
          onSubmit={handleSubmit(
            props.calendar ? onUpdateCalendar : onCreateCalendar
          )}
        >
          <div>
            <label htmlFor="title">제목</label>
            <input
              id="title"
              type="text"
              {...register("title", {
                required: "제목은 필수 입력입니다.",
                minLength: {
                  value: 1,
                  message: "제목은 1글자 이상이 필요합니다",
                },
              })}
            />
            {errors.title && <small role="alert">{errors.title.message}</small>}
          </div>

          <div>
            <label htmlFor="description">내용</label>
            <input
              id="description"
              type="text"
              {...register("description", {
                required: "내용은 필수 입력입니다.",
                minLength: {
                  value: 1,
                  message: "내용은 1글자 이상이 필요합니다",
                },
              })}
            />
            {errors.description && (
              <small role="alert">{errors.description.message}</small>
            )}
          </div>
          <Button type="submit">
            {props.calendar ? "수정하시겠습니까?" : "작성하시겠습니까?"}
          </Button>
        </form>
      ) : (
        <React.Fragment>
          <h2>{props.calendar?.title || "제목"}</h2>
          <div>{props.calendar?.description || "내용"}</div>
        </React.Fragment>
      )}
      {props.calendar ? (
        <Button onClick={toggleEditMode}>{isEdit ? "취소" : "수정하기"}</Button>
      ) : (
        <Button onClick={toggleEditMode}>{isEdit ? "취소" : "작성하기"}</Button>
      )}
    </React.Fragment>
  );
}
