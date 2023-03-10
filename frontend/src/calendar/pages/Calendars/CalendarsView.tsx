import Calendar from "react-calendar";

import { PropsType } from "./type";

import LoadingSpinner from "../../../common/components/UIElements/LoadingSpinner";
import CalendarCard from "../../../common/components/UIElements/CalendarCard";
import PWAInstallPrompt from "../../../common/components/PWA/PWAInstallPrompt";

import { BsCheckLg } from "react-icons/bs";
import React from "react";

export default function CalendarsView({
  isLoading,
  token,
  onChange,
  value,
  getCalendarByDate,
  existingCalendar,
  showCard,
  cardContents,
  onClickDetail,
}: PropsType) {
  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="pwa-install-prompt">
        <PWAInstallPrompt />
      </div>
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

          {showCard &&
            (cardContents ? (
              <div className="calendar-card__width block-center">
                <CalendarCard
                  onClick={onClickDetail}
                  cardContents={cardContents}
                />
              </div>
            ) : (
              <div className="calendar-card__width block-center">
                <CalendarCard onClick={onClickDetail} cardContents={null} />
              </div>
            ))}
        </div>
      ) : (
        <div className="container center">
          <h3>로그인을 먼저 해주세요</h3>
        </div>
      )}
    </React.Fragment>
  );
}
