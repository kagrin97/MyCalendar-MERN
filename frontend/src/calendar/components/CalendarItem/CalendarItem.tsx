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
  getAllCalendarHandler,
} from "../../../common/api/calendarApi";

import {
  CreateCalendarType,
  updateCalendarType,
  deleteCalendarType,
} from "../../../common/types/calendar";
import { useAuth } from "../../../common/hooks/auth-hook";

import { CalendarType } from "../../../common/types/calendar";
import { OtherPropsType, FormValue } from "./type";
import { useCalendarDispatch } from "../../../common/context/calendarContext";

export default function CalendarItem(props: OtherPropsType) {
  const [showInformModal, setShowInformModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const editorRef = useRef<Editor>(null);

  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const { userId, token } = useAuth();

  const calendarDispatch = useCalendarDispatch();

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

  const closeInformModal = () => {
    setShowInformModal(false);
  };

  const toggleEditMode = () => {
    setEdit(!isEdit);
    setValue("title", props.calendar?.title || "");
  };

  const applyCalendar = (calendar: CalendarType) => {
    props.setCalendar(calendar);
    toggleEditMode();
  };

  const reGetCalendars = async () => {
    const foundList = await getAllCalendarHandler(userId, sendRequest);
    if (typeof foundList === "string") {
      throw new Error(foundList);
    }
    calendarDispatch({
      type: "SET_CALENDAR_SUCCESS",
      data: foundList,
    });
  };

  const onUpdateCalendar = async ({ title }: { title: string }) => {
    try {
      const updateCalendarProps: updateCalendarType = {
        title,
        calendarId: props.calendar._id,
        sendRequest,
        editorRef,
        token,
      };
      const calendar = await updateCalendarHandler(updateCalendarProps);
      applyCalendar(calendar);
      reGetCalendars();
    } catch (err) {}
  };

  const onCreateCalendar = async ({ title }: { title: string }) => {
    try {
      const createCalendarProps: CreateCalendarType = {
        title,
        createdDate: props.calendarDate,
        userId,
        sendRequest,
        editorRef,
        token,
      };
      const calendar = await createCalendarHandler(createCalendarProps);
      applyCalendar(calendar);
      reGetCalendars();
    } catch (err) {}
  };

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
      reGetCalendars();
    } catch (err) {}
    setShowInformModal(false);
    setIsDelete(false);
  };

  useEffect(() => {
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
