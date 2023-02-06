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
}: CreateCalendarType) =>
  CalendarHttp.createCalendar({
    title,
    createdDate,
    userId,
    sendRequest,
    editorRef,
  });

export const updateCalendarHandler = ({
  title,
  calendarId,
  sendRequest,
  editorRef,
}: updateCalendarType) =>
  CalendarHttp.updateCalendar({
    title,
    calendarId,
    sendRequest,
    editorRef,
  });

export const deleteCalendarHandler = ({
  calendarId,
  sendRequest,
}: deleteCalendarType) =>
  CalendarHttp.deleteCalendar({ calendarId, sendRequest });
