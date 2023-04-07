import React from "react";

import { PropsType } from "./type";

import ToastEditor from "../ToastEditor/ToastEditor";
import ToastViewer from "../ToastViewer/ToastViewer";

import Button from "../../../common/components/UIElements/Button";
import ErrorModal from "../../../common/components/UIElements/ErrorModal";
import LoadingSpinner from "../../../common/components/UIElements/LoadingSpinner";

import Modal from "../../../common/components/UIElements/Modal";
import Card from "../../../common/components/UIElements/Card";
import minusToDot from "../../../common/utils/minusToDot";

export default function CalendarItemView({
  isLoading,
  error,
  clearError,
  register,
  handleSubmit,
  errors,
  onUpdateCalendar,
  onCreateCalendar,
  showInformModal,
  closeInformModal,
  isEdit,
  toggleEditMode,
  setShowInformModal,
  props,
  editorRef,
  setIsDelete,
}: PropsType) {
  const renderSpinner = () => {
    return isLoading && <LoadingSpinner asOverlay />;
  };

  const renderDeleteModal = () => {
    return (
      <Modal
        show={showInformModal}
        onCancel={closeInformModal}
        footer={
          <div className="center">
            <Button danger onClick={() => setIsDelete(true)}>
              삭제 하기
            </Button>
            <Button onClick={closeInformModal}>닫기</Button>
          </div>
        }
      >
        삭제하시겠습니까?
      </Modal>
    );
  };

  const renderContent = () => {
    if (isEdit) {
      return (
        <form
          onSubmit={handleSubmit(
            props.calendar ? onUpdateCalendar : onCreateCalendar
          )}
        >
          <div>
            <h3>제목 입력</h3>
            <input
              className="form__title"
              id="title"
              type="text"
              {...register("title", {
                required: "제목은 필수 입력입니다.",
                minLength: {
                  value: 1,
                  message: "제목은 1글자 이상이 필요합니다",
                },
              })}
            />
            {errors.title && <small role="alert">{errors.title.message}</small>}
          </div>
          <ToastEditor {...props} editorRef={editorRef} />
          <div className="center">
            <Button type="submit">
              {props.calendar ? "수정하시겠습니까?" : "작성하시겠습니까?"}
            </Button>
          </div>
        </form>
      );
    }

    return (
      <React.Fragment>
        <div className="calendar-detail__header">
          {props.calendar ? (
            <React.Fragment>
              <h2>{props.calendar?.title}</h2>
              <p>{minusToDot(props.calendar?.createdDate)}</p>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <h2>제목</h2>
            </React.Fragment>
          )}
        </div>
        <div className="calendar-detail__description">
          {props.calendar?.description ? <ToastViewer {...props} /> : "내용"}
        </div>
      </React.Fragment>
    );
  };

  const renderButtons = () => {
    if (props.calendar) {
      return (
        <React.Fragment>
          <Button inverse onClick={toggleEditMode}>
            {isEdit ? "수정 취소" : "수정하기"}
          </Button>
          {!isEdit && (
            <Button danger onClick={() => setShowInformModal(true)}>
              삭제하기
            </Button>
          )}
        </React.Fragment>
      );
    }
    return (
      <Button inverse onClick={toggleEditMode}>
        {isEdit ? "작성 취소" : "작성하기"}
      </Button>
    );
  };

  return (
    <React.Fragment>
      {renderSpinner()}
      <ErrorModal error={error} onClear={clearError} />
      <Card>
        <div className="calendar-detail">
          {renderDeleteModal()}
          {renderContent()}
          <div className="center">{renderButtons()}</div>
        </div>
      </Card>
    </React.Fragment>
  );
}
