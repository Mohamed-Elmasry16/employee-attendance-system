
import React from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
}

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  const baseClasses = "fixed top-5 left-1/2 -translate-x-1/2 z-50 p-4 rounded-lg shadow-xl text-white font-bold text-center w-11/12 max-w-md animate-fade-in-down";
  const typeClasses = {
    success: "bg-green-500",
    error: "bg-red-500"
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      {message}
    </div>
  );
};

export default Notification;
