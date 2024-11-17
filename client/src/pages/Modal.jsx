import React from 'react';

const Modal = ({ onClose, title, message }) => {
  return (
    <div className="fixed top-5 right-5 bg-green-50 border border-green-200 rounded-lg shadow-lg p-4 w-[400px]">
      <button
        className="absolute top-2 right-2 text-green-600 hover:text-green-800"
        onClick={onClose}
      >
        &times;
      </button>
      <div className="flex items-start">
        <div className="mt-1 mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6 text-green-600"
          >
            <path
               strokeLinecap="round"
             strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div>
          <p className="text-green-800 font-medium">
            {title}
          </p>
          <p className="text-green-700">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
