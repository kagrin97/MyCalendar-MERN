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

import { BsCheckLg } from "react-icons/bs";
import CalendarCard from "../../common/components/UIElements/CalendarCard";

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

  const [cardContents, setCardContents] = useState<any>();

  // setState를 동기로 받기위한 처리
  useEffect(() => {
    const getCalendarDetail = () => {
      const foundCalendar = calendarList.filter(
        (item: any) => item.createdDate === calendarDate
      )[0];
      setCardContents(foundCalendar);
    };
    if (calendarDate) {
      getCalendarDetail();
    }
  }, [calendarDate]);

  const onClickDetail = () => {
    if (cardContents) {
      navigate("/detail", {
        state: { calendar: cardContents, calendarDate },
      });
      return;
    }
    navigate("/detail", { state: { calendar: null, calendarDate } });
  };

  const [showCard, setShowCard] = useState(false);

  const getCalendarByDate = (day: any) => {
    setCalendarDate(fomatDate(day));
    setShowCard(true);
  };

  const existingCalendar = (date: Date) => {
    if (calendarList) {
      for (let cal of calendarList) {
        if (cal["createdDate"] === fomatDate(date)) {
          return true;
        }
      }
    }
    return false;
  };

  return (
    <div className="">
      {isLoading && <LoadingSpinner asOverlay />}
      {token ? (
        <div className="calendar-container">
          <Calendar
            onChange={onChange}
            value={value}
            onClickDay={getCalendarByDate}
            formatDay={(locale, date) =>
              date.toLocaleString("en", { day: "numeric" })
            }
            next2Label={null}
            prev2Label={null}
            showNeighboringMonth={false}
            tileContent={({ activeStartDate, date, view }) =>
              view === "month" && existingCalendar(date) ? (
                <div className="calendar-icon">
                  <BsCheckLg />
                </div>
              ) : null
            }
          />
          {showCard && cardContents && (
            <CalendarCard onClick={onClickDetail} cardContents={cardContents} />
          )}
        </div>
      ) : (
        <div className="container center">
          <h3>로그인을 먼저 해주세요</h3>
        </div>
      )}
    </div>
  );
}
