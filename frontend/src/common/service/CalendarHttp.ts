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
  }: CreateCalendarType) {
    const htmlContent = editorRef.current?.getInstance().getHTML() || "";
    const httpBody = {
      title,
      description: htmlContent,
      createdDate,
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
    return calendar;
  },

  async updateCalendar({
    title,
    calendarId,
    sendRequest,
    editorRef,
  }: updateCalendarType) {
    const htmlContent = editorRef.current?.getInstance().getHTML() || "";
    const httpBody = {
      title,
      description: htmlContent,
    };
    const { calendar } = await sendRequest(
      `http://localhost:5000/api/calendar/${calendarId}`,
      "PATCH",
      JSON.stringify(httpBody),
      {
        "Content-Type": "application/json",
      }
    );
    return calendar;
  },

  async deleteCalendar({ calendarId, sendRequest }: deleteCalendarType) {
    const { message } = await sendRequest(
      `http://localhost:5000/api/calendar/${calendarId}`,
      "DELETE"
    );
    return message;
  },
};
