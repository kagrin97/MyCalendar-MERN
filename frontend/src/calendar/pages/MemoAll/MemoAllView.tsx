import CalendarCard from "../../../common/components/UIElements/CalendarCard";
import LoadingSpinner from "../../../common/components/UIElements/LoadingSpinner";

export interface PropsType {
  isLoading: Boolean;
  calendarList: any;
  onClickDetail: (calendar: any) => void;
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
        {calendarList.map((calendar: any, index: number) => (
          <div className="MemoAll-item" key={index}>
            <CalendarCard
              onClick={() => onClickDetail(calendar)}
              cardContents={calendar}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
