import { CalendarHttp } from "../service/CalendarHttp";

import {
  CreateCalendarType,
  updateCalendarType,
  deleteCalendarType,
} from "../types/calendar";

export const getAllCalendarHandler = (
  userId: string | null,
  sendRequest: any
) => CalendarHttp.getAll(userId, sendRequest);

export const createCalendarHandler = ({
  title,
  createdDate,
  userId,
  sendRequest,
  editorRef,
  token,
}: CreateCalendarType) =>
  CalendarHttp.createCalendar({
    title,
    createdDate,
    userId,
    sendRequest,
    editorRef,
    token,
  });

export const updateCalendarHandler = ({
  title,
  calendarId,
  sendRequest,
  editorRef,
  token,
}: updateCalendarType) =>
  CalendarHttp.updateCalendar({
    title,
    calendarId,
    sendRequest,
    editorRef,
    token,
  });

export const deleteCalendarHandler = ({
  calendarId,
  sendRequest,
  token,
}: deleteCalendarType) =>
  CalendarHttp.deleteCalendar({ calendarId, sendRequest, token });
