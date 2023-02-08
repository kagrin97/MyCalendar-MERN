import CalendarItem from "../../components/CalendarItem/CalendarItem";

import "./CalendarDetail.css";

import { PropsType } from "./type";

export default function CalendarDetailView({
  calendar,
  setCalendar,
  calendarDate,
}: PropsType) {
  return (
    <div className="calendar-detail">
      <CalendarItem
        calendar={calendar}
        setCalendar={setCalendar}
        calendarDate={calendarDate}
      />
    </div>
  );
}
