import React from 'react';

const ModalReu = ({ onClose, title, message, type }) => {
  // Definir los colores y los íconos según el tipo
  const modalStyles = {
    success: {
      backgroundColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800',
      iconColor: 'text-green-600',
      icon: (
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
      ),
    },
    error: {
      backgroundColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-800',
      iconColor: 'text-red-600',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6 text-red-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ),
    },
  };

  // Establecer los estilos según el tipo
  const styles = type === 'error' ? modalStyles.error : modalStyles.success;

  return (
    <div className={`fixed top-5 right-5 ${styles.backgroundColor} border ${styles.borderColor} rounded-lg shadow-lg p-4 w-[400px]`}>
      <button
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        onClick={onClose}
      >
        &times;
      </button>
      <div className="flex items-start">
        <div className="mt-1 mr-2">
          {styles.icon}
        </div>
        <div>
          <p className={`font-medium ${styles.textColor}`}>
            {title}
          </p>
          <p className={`${styles.textColor}`}>
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModalReu;
