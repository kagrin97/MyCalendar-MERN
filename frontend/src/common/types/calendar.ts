import { RefObject } from "react";
import { Editor } from "@toast-ui/react-editor";

import { sendRequestType } from "./http";

interface handlingCalendarTyep {
  sendRequest: sendRequestType;
  token: string | null;
}

export interface CreateCalendarType extends handlingCalendarTyep {
  title: string;
  createdDate: string;
  userId: string | null;
  editorRef: RefObject<Editor>;
}

export interface updateCalendarType extends handlingCalendarTyep {
  title: string;
  calendarId: string | null;
  editorRef: RefObject<Editor>;
}

export interface deleteCalendarType extends handlingCalendarTyep {
  calendarId: string | null;
}

export interface CalendarType {
  calendar: CalendarType;
  createdDate: string;
  creator: string;
  description: string;
  id: string;
  title: string;
  _id: string;
  userId: string;
  message?: string;
  token: string;
}
