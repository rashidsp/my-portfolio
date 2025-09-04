import React from 'react';

interface ModalProps {
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ onClose, onConfirm, title, children }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fade-in"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative bg-light-card dark:bg-dark-card w-full max-w-md p-6 m-4 rounded-lg shadow-xl animate-content-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="modal-title" className="text-xl font-bold text-light-text dark:text-dark-text">{title}</h3>
        <div className="mt-4 text-light-accent dark:text-dark-accent">
          {children}
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-sm font-medium text-light-accent dark:text-dark-accent bg-light-bg dark:bg-dark-bg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md text-sm font-medium text-white bg-light-primary dark:bg-dark-primary hover:bg-opacity-90 dark:hover:bg-opacity-90 transition-colors"
          >
            Confirm & Download
          </button>
        </div>
      </div>
    </div>
  );
};