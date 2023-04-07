import { Dispatch, SetStateAction } from "react";

import { CalendarType } from "../../common/types/calendar";

export interface PropsType {
  calendar: CalendarType;
  setCalendar: Dispatch<SetStateAction<CalendarType | undefined>>;
  calendarDate: string;
}
