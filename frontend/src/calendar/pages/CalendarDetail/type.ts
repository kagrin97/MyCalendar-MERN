import { Dispatch, SetStateAction } from "react";

export interface PropsType {
  calendar: any;
  setCalendar: Dispatch<SetStateAction<any>>;
  calendarDate: string;
}
