import CalendarCard from "../../common/components/UIElements/CalendarCard";
import LoadingSpinner from "../../common/components/UIElements/LoadingSpinner";
import { CalendarType } from "../../common/types/calendar";

export interface PropsType {
  isLoading: Boolean;
  calendarList: CalendarType[];
  onClickDetail: (calendar: CalendarType) => void;
}

export default function MemoAllView({
  isLoading,
  calendarList,
  onClickDetail,
}: PropsType) {
  return (
    <div className="MemoAll-container">
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="MemoAll-items">
        {calendarList.length ? (
          calendarList.map((calendar: CalendarType, index: number) => (
            <div className="MemoAll-item" key={index}>
              <CalendarCard
                onClick={() => onClickDetail(calendar)}
                cardContents={calendar}
              />
            </div>
          ))
        ) : (
          <div className="container center">아직 작성된 메모가 없습니다</div>
        )}
      </div>
    </div>
  );
}
