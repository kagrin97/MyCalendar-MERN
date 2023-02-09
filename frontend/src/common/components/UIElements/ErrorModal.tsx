import Modal from "./Modal";
import Button from "./Button";

interface ErrorModalProps {
  onClear: () => void;
  error: string | null | undefined;
}

const ErrorModal = (props: ErrorModalProps) => {
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
