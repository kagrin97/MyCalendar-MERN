import { Dispatch, SetStateAction } from "react";

import { CalendarType } from "../../../common/types/calendar";

export interface OtherPropsType {
  calendar: CalendarType;
  calendarDate: string;
  setCalendar: Dispatch<SetStateAction<CalendarType | undefined>>;
}
