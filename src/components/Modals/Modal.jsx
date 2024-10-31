import React from 'react'
import { createPortal } from 'react-dom'

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return createPortal(
    <dialog open className="modal bg-black/60">
      <div className="modal-box">
        <div className="p-5 flex flex-col items-center justify-center gap-5">
          {children}
          <div className="modal-action">
            <button className="btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </dialog>,
    document.body,
  )
}

export default Modal
