import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import "./CalendarItem.css";

import ToastEditor from "./ToastEditor";
import ToastViewer from "./ToastViewer";
import Button from "../../common/components/UIElements/Button";
import ErrorModal from "../../common/components/UIElements/ErrorModal";
import { useAuthState } from "../../common/context/authContext";
import { useHttpClient } from "../../common/hooks/http-hook";

import { Editor } from "@toast-ui/react-editor";
import Modal from "../../common/components/UIElements/Modal";
import Card from "../../common/components/UIElements/Card";

import {
  createCalendarHandler,
  updateCalendarHandler,
  deleteCalendarHandler,
} from "../../common/api/calendarApi";

import {
  CreateCalendarType,
  updateCalendarType,
  deleteCalendarType,
} from "../../common/types/calendar";

interface FormValue {
  title: string;
  description: string;
}

export default function CalendarItem(props: any) {
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const { userId } = useAuthState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValue>({
    mode: "onChange",
    defaultValues: {
      title: props.calendar?.title || "",
    },
  });

  const [isEdit, setEdit] = useState(false);

  const toggleEditMode = () => {
    setEdit(!isEdit);
    setValue("title", props.calendar?.title || "");
  };

  const editorRef = useRef<Editor>(null);

  const applyCalendar = (calendar: any) => {
    props.setCalendar(calendar);
    toggleEditMode();
  };

  const onUpdateCalendar = async (data: any) => {
    try {
      const updateCalendarProps: updateCalendarType = {
        title: data.title,
        calendarId: props.calendar.id,
        sendRequest,
        editorRef,
      };
      const calendar = await updateCalendarHandler(updateCalendarProps);

      applyCalendar(calendar);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const onCreateCalendar = async (data: any) => {
    try {
      const createCalendarProps: CreateCalendarType = {
        title: data.title,
        createdDate: props.calendarDate,
        userId,
        sendRequest,
        editorRef,
      };
      const calendar = await createCalendarHandler(createCalendarProps);

      applyCalendar(calendar);
    } catch (err: any) {
      return err.message;
    }
  };

  const [showInformModal, setShowInformModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const closeInformModal = () => {
    setShowInformModal(false);
  };

  useEffect(() => {
    const onDeleteCalendar = async () => {
      try {
        const deleteCalendarProps: deleteCalendarType = {
          calendarId: props.calendar._id,
          sendRequest,
        };
        const message = deleteCalendarHandler(deleteCalendarProps);
        console.info(message);
        props.setCalendar(undefined);
      } catch (err: any) {
        return err.message;
      }
      setShowInformModal(false);
      setIsDelete(false);
    };
    if (isDelete) {
      onDeleteCalendar();
    }
  }, [isDelete, setIsDelete]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card>
        <div className="calendar-detail">
          <Modal
            show={showInformModal}
            onCancel={closeInformModal}
            footer={
              <div className="center">
                <Button danger onClick={() => setIsDelete(true)}>
                  삭제 하기
                </Button>
                <Button onClick={closeInformModal}>닫기</Button>
              </div>
            }
          >
            삭제하시겠습니까?
          </Modal>

          {isEdit ? (
            <form
              onSubmit={handleSubmit(
                props.calendar ? onUpdateCalendar : onCreateCalendar
              )}
            >
              <div>
                <h3>제목 입력</h3>
                <input
                  className="form__title"
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
                {errors.title && (
                  <small role="alert">{errors.title.message}</small>
                )}
              </div>
              <ToastEditor {...props} editorRef={editorRef} />
              <div className="center">
                <Button type="submit">
                  {props.calendar ? "수정하시겠습니까?" : "작성하시겠습니까?"}
                </Button>
              </div>
            </form>
          ) : (
            <React.Fragment>
              <h2>{props.calendar?.title || "제목"}</h2>
              <div className="calendar-detail__description">
                {props.calendar?.description ? (
                  <ToastViewer {...props} />
                ) : (
                  "내용"
                )}
              </div>
            </React.Fragment>
          )}
          <div className="center">
            {props.calendar ? (
              <React.Fragment>
                <Button inverse onClick={toggleEditMode}>
                  {isEdit ? "수정 취소" : "수정하기"}
                </Button>
                <Button danger onClick={() => setShowInformModal(true)}>
                  삭제하기
                </Button>
              </React.Fragment>
            ) : (
              <Button inverse onClick={toggleEditMode}>
                {isEdit ? "작성 취소" : "작성하기"}
              </Button>
            )}
          </div>
        </div>
      </Card>
    </React.Fragment>
  );
}
