import Modal from "./Modal";
import Button from "./Button";

const ErrorModal = (props: any) => {
  return (
    <Modal
      onCancel={props.onClear}
      show={!!props.error}
      footer={<Button onClick={props.onClear}>닫기</Button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
