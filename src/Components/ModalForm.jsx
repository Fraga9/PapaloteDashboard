import { useEffect, useState } from "react";
import "../Styles/ModalForm.css";
import React from 'react'; // Explicit import for React

export default function ModalForm({ isOpen, onClose, title, children }) {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <div className={`modal ${open ? "modal-open" : ""}`}>
      <div className="modal-backdrop" onClick={handleClose}></div>
      <div className="modal-content">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={handleClose}>
            ×
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}