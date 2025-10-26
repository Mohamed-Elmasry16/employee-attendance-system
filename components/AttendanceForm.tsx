import React, { useState } from 'react';

interface AttendanceFormProps {
  onCheckIn: (employeeId: string, password: string) => void;
  onCheckOut: (employeeId: string, password: string) => void;
}

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);


const CheckInIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
    </svg>
);

const CheckOutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
    </svg>
);

const AttendanceForm: React.FC<AttendanceFormProps> = ({ onCheckIn, onCheckOut }) => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');

  const handleCheckInClick = () => {
    onCheckIn(employeeId, password);
    setEmployeeId('');
    setPassword('');
  };

  const handleCheckOutClick = () => {
    onCheckOut(employeeId, password);
    setEmployeeId('');
    setPassword('');
  };

  return (
    <div className="bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg animate-slide-in-up animation-delay-200 border-t-4 border-amber-500">
      <div className="mb-6">
        <label htmlFor="employeeId" className="block text-lg font-bold text-gray-200 mb-2">
          اسم المستخدم
        </label>
        <div className="relative">
            <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                <UserIcon />
            </span>
            <input
              type="text"
              id="employeeId"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              placeholder="ادخل اسم المستخدم"
              className="w-full pl-4 pr-12 py-3 text-lg bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
              aria-required="true"
            />
        </div>
      </div>
      <div className="mb-8">
        <label htmlFor="password" className="block text-lg font-bold text-gray-200 mb-2">
          كلمة المرور
        </label>
         <div className="relative">
             <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                <LockIcon />
            </span>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="ادخل كلمة المرور"
              className="w-full pl-4 pr-12 py-3 text-lg bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
              aria-required="true"
            />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={handleCheckInClick}
          className="flex items-center justify-center w-full bg-amber-500 text-gray-900 font-bold py-3 px-4 rounded-lg hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ring-offset-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-amber-500/40"
        >
          تسجيل حضور
          <CheckInIcon />
        </button>
        <button
          onClick={handleCheckOutClick}
          className="flex items-center justify-center w-full bg-gray-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ring-offset-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-gray-400/30"
        >
          تسجيل انصراف
          <CheckOutIcon />
        </button>
      </div>
    </div>
  );
};

export default AttendanceForm;