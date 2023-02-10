import {
  CreateCalendarType,
  updateCalendarType,
  deleteCalendarType,
} from "../types/calendar";

import { sendRequestType } from "../types/http";

export const CalendarHttp = {
  BASE_URL: process.env.REACT_APP_BACKEND_URL + "/calendar",

  async getAll(userId: string | null, sendRequest: sendRequestType) {
    try {
      const { calendar } = await sendRequest(`${this.BASE_URL}/user/${userId}`);
      return calendar;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw err.message;
      }
    }
  },

  async createCalendar({
    title,
    createdDate,
    userId,
    sendRequest,
    editorRef,
    token,
  }: CreateCalendarType) {
    const htmlContent = editorRef.current?.getInstance().getHTML() || "";
    const httpBody = {
      title,
      description: htmlContent,
      createdDate,
      userId,
    };
    const { calendar } = await sendRequest(
      `${this.BASE_URL}`,
      "POST",
      JSON.stringify(httpBody),
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }
    );
    return calendar;
  },

  async updateCalendar({
    title,
    calendarId,
    sendRequest,
    editorRef,
    token,
  }: updateCalendarType) {
    const htmlContent = editorRef.current?.getInstance().getHTML() || "";
    const httpBody = {
      title,
      description: htmlContent,
    };
    const { calendar } = await sendRequest(
      `${this.BASE_URL}/${calendarId}`,
      "PATCH",
      JSON.stringify(httpBody),
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }
    );
    return calendar;
  },

  async deleteCalendar({ calendarId, sendRequest, token }: deleteCalendarType) {
    const { message } = await sendRequest(
      `${this.BASE_URL}/${calendarId}`,
      "DELETE",
      undefined,
      {
        Authorization: "Bearer " + token,
      }
    );
    return message;
  },
};
