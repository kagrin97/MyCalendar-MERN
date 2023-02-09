import { Dispatch, SetStateAction } from "react";

import { CalendarType } from "../../../common/types/calendar";

export interface PropsType {
  isLoading: boolean;
  token: string | null;
  onChange: Dispatch<SetStateAction<Date>>;
  value: Date;
  getCalendarByDate: (day: Date) => void;
  existingCalendar: (date: Date) => boolean;
  showCard: boolean;
  cardContents: CalendarType | undefined;
  onClickDetail: () => void;
}
