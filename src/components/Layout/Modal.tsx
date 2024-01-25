
import React from "react";
import "/resources/styles/components/layout/modal.scss";

type ModalProps = {
  title: string;
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  children: React.ReactNode;
};

export default function Modal(props: ModalProps) {

  const modal = document.querySelector(".modal") as HTMLDialogElement;
  // modal?.close();
  return (
    <>
      <dialog className="modal">
        <div className="modal-header">
          <h1 className="modal-title">{props.title}</h1>
          <button onClick={() => modal.close()} className="modal-close">X</button>
        </div>
        {
          props.children
        }
      </dialog>

      <button className="modal-open" onClick={() => modal?.showModal()}>
        Open Modal
      </button>
    </>
  );
}
