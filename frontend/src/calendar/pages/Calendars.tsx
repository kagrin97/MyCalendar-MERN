import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { useHttpClient } from "../../common/hooks/http-hook";
import { useAuthState } from "../../common/context/authContext";
import { fomatDate } from "../../common/utils/fomatDate";
import { getAllCalendarHandler } from "../../common/api/calendarApi";

export default function Calendars() {
  const navigate = useNavigate();

  const [value, onChange] = useState(new Date());
  const [calendarDate, setCalendarDate] = useState<string | undefined>();
  const [calendarList, setCalendarList] = useState([]);

  const { userId, token } = useAuthState();

  const { isLoading, sendRequest } = useHttpClient();

  useEffect(() => {
    async function getAllCalendarList() {
      try {
        const foundList = await getAllCalendarHandler(userId, sendRequest);
        if (foundList) {
          setCalendarList(foundList);
        }
      } catch (err: any) {
        console.error(err.message);
      }
    }
    if (userId) {
      getAllCalendarList();
    }
  }, [userId]);

  // setState를 동기로 받기위한 처리
  useEffect(() => {
    const getCalendarDetail = () => {
      const foundCalendar = calendarList.filter(
        (item: any) => item.createdDate === calendarDate
      )[0];
      navigate("/detail", { state: { calendar: foundCalendar, calendarDate } });
    };
    if (calendarDate) {
      getCalendarDetail();
    }
  }, [calendarDate]);

  const getCalendarByDate = (day: any) => {
    setCalendarDate(fomatDate(day));
  };

  return (
    <div className="center">
      {token ? (
        <React.Fragment>
          <Calendar
            onChange={onChange}
            value={value}
            onClickDay={getCalendarByDate}
          />
        </React.Fragment>
      ) : (
        "로그인을 먼저 해주세요"
      )}
    </div>
  );
}
