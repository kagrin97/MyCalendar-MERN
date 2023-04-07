import React from "react";
import Calendar from "react-calendar";
import { BsCheckLg } from "react-icons/bs";

import { PropsType } from "./type";
import LoadingSpinner from "../../../common/components/UIElements/LoadingSpinner";
import CalendarCard from "../../../common/components/UIElements/CalendarCard";
import PWAInstallPrompt from "../../../common/components/PWA/PWAInstallPrompt";

export default function CalendarsView({
  isLoading,
  token,
  onChange,
  value,
  getCalendarByDate,
  checkExistingCalendar,
  showCard,
  cardContents,
  onClickDetail,
}: PropsType) {
  const renderSpinner = () => isLoading && <LoadingSpinner asOverlay />;

  const renderInstallPrompt = () => (
    <div className="pwa-install-prompt">
      <PWAInstallPrompt />
    </div>
  );

  const renderCalendar = () => (
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
        view === "month" && checkExistingCalendar(date) ? (
          <div className="calendar-icon">
            <BsCheckLg />
          </div>
        ) : null
      }
    />
  );

  const renderCard = () => {
    if (!cardContents) {
      return <CalendarCard onClick={onClickDetail} cardContents={null} />;
    }
    return <CalendarCard onClick={onClickDetail} cardContents={cardContents} />;
  };

  const renderContent = () => {
    if (token) {
      return (
        <div className="calendar-container">
          {renderCalendar()}
          {showCard && (
            <div className="calendar-card__width block-center">
              {renderCard()}
            </div>
          )}
        </div>
      );
    }
    return (
      <div className="container center">
        <h3>Please log in first</h3>
      </div>
    );
  };

  return (
    <React.Fragment>
      {renderSpinner()}
      {renderInstallPrompt()}
      {renderContent()}
    </React.Fragment>
  );
}
