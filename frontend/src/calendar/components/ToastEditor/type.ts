import { Dispatch, SetStateAction, RefObject } from "react";
import { Editor } from "@toast-ui/react-editor";

import { CalendarType } from "../../../common/types/calendar";

export interface OtherPropsType {
  calendar: CalendarType;
  calendarDate: string;
  editorRef: RefObject<Editor>;
  setCalendar: Dispatch<SetStateAction<CalendarType | undefined>>;
}
