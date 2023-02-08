import {
  CreateCalendarType,
  updateCalendarType,
  deleteCalendarType,
} from "../types/calendar";

export const CalendarHttp = {
  BASE_URL: "http://localhost:5000/api/calendar",

  async getAll(userId: string | null, sendRequest: any) {
    try {
      const { calendar } = await sendRequest(`${this.BASE_URL}/user/${userId}`);
      return calendar;
    } catch (err: any) {
      return err.message;
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
      null,
      {
        Authorization: "Bearer " + token,
      }
    );
    return message;
  },
};
