import React from "react";
import ReactDOM from "react-dom";
import { FiX } from "react-icons/fi";

const Modal = ({
  isOpen,
  onClose,
  title = "Modal Title",
  children,
  showFooter = true,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <FiX size={20} />
        </button>

        {/* Title */}
        <h2 className="mb-4 text-lg font-semibold text-gray-800">{title}</h2>

        {/* Modal Content */}
        <div className="text-sm text-gray-600">{children}</div>

        {/* Footer Actions */}
        {showFooter && (
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className="rounded-md bg-[#3CAAFA] px-4 py-2 text-sm text-white hover:bg-[#2196e3]"
            >
              {confirmText}
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
