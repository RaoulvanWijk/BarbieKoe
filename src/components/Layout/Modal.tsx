import React, { useState } from "react";

import "/resources/styles/components/layout/modal.scss";

type ModalProps = {
  title: string;
  children: React.ReactNode;
};

export default function Modal(props: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const modal = document.querySelector(".modal") as HTMLDialogElement;
  // modal?.close();
  return (
    <>
      <dialog className="modal">
        <div className="modal-header">
          <h1 className="modal-title">{props.title}</h1>
          <button className="modal-close">X</button>
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
