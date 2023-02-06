import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import CalendarItem from "../components/CalendarItem";

import Modal from "../../common/components/UIElements/Modal";
import Button from "../../common/components/UIElements/Button";
import { useHttpClient } from "../../common/hooks/http-hook";
import { useAuthState } from "../../common/context/authContext";
import { fomatDate } from "../../common/utils/fomatDate";

interface CalendarType {
  createdDate: string;
  title: string;
  description: string;
}

export default function Calendars() {
  const [value, onChange] = useState(new Date());
  const [calendarDate, setCalendarDate] = useState<string | undefined>();
  const [calendarList, setCalendarList] = useState([]);
  const [calendar, setCalendar] = useState<CalendarType>();

  const { userId, token } = useAuthState();

  const { isLoading, sendRequest } = useHttpClient();

  const getCalendarAll = async () => {
    try {
      const res = await sendRequest(
        `http://localhost:5000/api/calendar/user/${userId}`
      );
      setCalendarList(res.calendar);
    } catch (err: any) {
      return err.message;
    }
  };

  useEffect(() => {
    if (userId) {
      getCalendarAll();
    }
  }, [userId]);

  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(!setShowModal);
    setCalendarDate(undefined);
  };

  // setState를 동기로 받기위한 처리
  useEffect(() => {
    if (calendarDate) {
      const foundCalendar = calendarList.filter(
        (item: any) => item.createdDate === calendarDate
      )[0];
      setCalendar(() => foundCalendar);
      setShowModal(true);
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
          <Modal
            show={showModal}
            onCancel={closeModal}
            header={calendarDate}
            footer={<Button onClick={closeModal}>닫기</Button>}
          >
            <CalendarItem
              calendar={calendar}
              setCalendar={setCalendar}
              calendarDate={calendarDate}
            />
          </Modal>
        </React.Fragment>
      ) : (
        "로그인을 먼저 해주세요"
      )}
    </div>
  );
}
