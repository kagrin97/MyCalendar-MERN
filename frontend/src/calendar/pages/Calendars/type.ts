import { Dispatch, SetStateAction } from "react";

export interface PropsType {
  isLoading: Boolean;
  token: string | null;
  onChange: Dispatch<SetStateAction<Date>>;
  value: Date;
  getCalendarByDate: (day: any) => void;
  existingCalendar: (date: Date) => Boolean;
  showCard: Boolean;
  cardContents: any;
  onClickDetail: () => void;
}
