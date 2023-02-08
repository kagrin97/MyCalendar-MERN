import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import "./CalendarItem.css";
import CalendarItemView from "./CalendarItemView";

import { useHttpClient } from "../../../common/hooks/http-hook";
import { Editor } from "@toast-ui/react-editor";

import {
  createCalendarHandler,
  updateCalendarHandler,
  deleteCalendarHandler,
} from "../../../common/api/calendarApi";

import {
  CreateCalendarType,
  updateCalendarType,
  deleteCalendarType,
} from "../../../common/types/calendar";
import { useAuth } from "../../../common/hooks/auth-hook";

interface FormValue {
  title: string;
  description: string;
}

export default function CalendarItem(props: any) {
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const { userId, token } = useAuth();

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
        token,
      };
      const calendar = await updateCalendarHandler(updateCalendarProps);
      applyCalendar(calendar);
    } catch (err) {}
  };

  const onCreateCalendar = async (data: any) => {
    try {
      const createCalendarProps: CreateCalendarType = {
        title: data.title,
        createdDate: props.calendarDate,
        userId,
        sendRequest,
        editorRef,
        token,
      };
      const calendar = await createCalendarHandler(createCalendarProps);

      applyCalendar(calendar);
    } catch (err) {}
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
          token,
        };
        const message = await deleteCalendarHandler(deleteCalendarProps);
        console.info(message);
        props.setCalendar(undefined);
      } catch (err) {}
      setShowInformModal(false);
      setIsDelete(false);
    };
    if (isDelete) {
      onDeleteCalendar();
    }
  }, [isDelete, setIsDelete]);

  const propss = {
    isLoading,
    error,
    clearError,
    register,
    handleSubmit,
    errors,
    onUpdateCalendar,
    onCreateCalendar,
    showInformModal,
    closeInformModal,
    isEdit,
    toggleEditMode,
    setShowInformModal,
    props,
    editorRef,
    setIsDelete,
  };

  return <CalendarItemView {...propss} />;
}
