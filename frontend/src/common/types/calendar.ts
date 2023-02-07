interface handlingCalendarTyep {
  sendRequest: any;
  token: string | null;
}

export interface CreateCalendarType extends handlingCalendarTyep {
  title: string;
  createdDate: string;
  userId: string | null;
  editorRef: any;
}

export interface updateCalendarType extends handlingCalendarTyep {
  title: string;
  calendarId: string | null;
  editorRef: any;
}

export interface deleteCalendarType extends handlingCalendarTyep {
  calendarId: string | null;
}
