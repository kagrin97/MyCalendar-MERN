import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendars.css";

import { useHttpClient } from "../../common/hooks/http-hook";
import { fomatDate } from "../../common/utils/fomatDate";
import { getAllCalendarHandler } from "../../common/api/calendarApi";
import { useAuth } from "../../common/hooks/auth-hook";
import LoadingSpinner from "../../common/components/UIElements/LoadingSpinner";

export default function Calendars() {
  const navigate = useNavigate();

  const [value, onChange] = useState(new Date());
  const [calendarDate, setCalendarDate] = useState<string | undefined>();
  const [calendarList, setCalendarList] = useState([]);

  const { userId, token } = useAuth();

  const { isLoading, sendRequest } = useHttpClient();

  useEffect(() => {
    async function getAllCalendarList() {
      try {
        const foundList = await getAllCalendarHandler(userId, sendRequest);
        setCalendarList(foundList);
      } catch (err) {}
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

      navigate("/detail", {
        state: { calendar: foundCalendar, calendarDate },
      });
    };
    if (calendarDate) {
      try {
        getCalendarDetail();
      } catch (err) {
        navigate("/detail", { state: { calendar: null, calendarDate } });
      }
    }
  }, [calendarDate]);

  const getCalendarByDate = (day: any) => {
    setCalendarDate(fomatDate(day));
  };

  return (
    <div className="center">
      {isLoading && <LoadingSpinner asOverlay />}
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
