import React from 'react';

interface ToastProps {
  message: string;
  types: "success" | "error" | "warning"; 
  onClose: () => void; 
}

const ShowToast: React.FC<ToastProps> = ({ message, types, onClose }) => {
  const getIconAndStyle = () => {
    switch (types) {
      case "success":
        return {
          icon: (
            <svg
              className="w-5 h-5 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
          ),
          bgColor: "bg-green-100",
        };
      case "error":
        return {
          icon: (
            <svg
              className="w-5 h-5 text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
            </svg>
          ),
          bgColor: "bg-red-100",
        };
      case "warning":
        return {
          icon: (
            <svg
              className="w-5 h-5 text-yellow-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
               <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
            </svg>
          ),
          bgColor: "bg-yellow-100",
        };
      default:
        return {
          icon: null,
          bgColor: "bg-gray-100",
        };
    }
  };

  const { icon, bgColor } = getIconAndStyle();

  return (
    <div
      className={`fixed right-5 bottom-5 p-4 rounded-lg shadow-lg flex items-center z-50 ${bgColor}`}
      role="alert"
    >
      <div className="flex-shrink-0">{icon}</div>
      <div className="ml-3 text-sm font-medium">{message}</div>
      <button
        onClick={onClose}
        className="ml-auto bg-transparent text-gray-400 hover:text-gray-700 p-1"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default ShowToast;
