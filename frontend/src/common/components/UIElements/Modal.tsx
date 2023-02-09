import React, { CSSProperties } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./Backdrop";
import "./Modal.css";

interface ModalOverlayProps {
  className?: string;
  style?: CSSProperties | undefined;
  contentClass?: string;
  footerClass?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

const ModalOverlay = (props: ModalOverlayProps) => {
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <div className={`modal__content center ${props.contentClass}`}>
        <h2>{props.children}</h2>
      </div>
      <footer className={`modal__footer center ${props.footerClass}`}>
        {props.footer}
      </footer>
    </div>
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById("modal-hook") as HTMLElement
  );
};

interface ModalProps {
  show: boolean;
  onCancel: () => void;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

const Modal = (props: ModalProps) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
