
import React from "react";
import "/resources/styles/components/layout/modal.scss";

type ModalProps = {
  title: string;
  mid: string;
  buttonProps: {
    text: string;
    color: "red" | "blue" | "orange";
  }
  children: React.ReactNode;
};

export default function Modal(props: ModalProps) {
  // modal?.close();
  return (
    <>
      <dialog className={`modal ${props.mid}`}>
        <div className="modal-header">
          <h1 className="modal-title">{props.title}</h1>
          <button onClick={() => (document.querySelector(`.${props.mid}`) as HTMLDialogElement).close()} className="modal-close">X</button>
        </div>
        <div className="content">
          {
            props.children
          }
        </div>
      </dialog>

      <button className={`modal-open ${props.buttonProps.color}`} onClick={() => (document.querySelector(`.${props.mid}`) as HTMLDialogElement).showModal()}>
        {props.buttonProps.text}
      </button>
    </>
  );
}
