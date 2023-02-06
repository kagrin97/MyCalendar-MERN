export interface CreateCalendarType {
  title: string;
  createdDate: string;
  userId: string | null;
  sendRequest: any;
  editorRef: any;
}

export interface updateCalendarType {
  title: string;
  calendarId: string | null;
  sendRequest: any;
  editorRef: any;
}

export interface deleteCalendarType {
  calendarId: string | null;
  sendRequest: any;
}
