import React from 'react';
import { AttendanceRecord } from '../types';

interface AttendanceLogProps {
  records: AttendanceRecord[];
}

const AttendanceLog: React.FC<AttendanceLogProps> = ({ records }) => {
  const formatDate = (date: Date | null) => {
    if (!date) return '—';
    return date.toLocaleString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg animate-slide-in-up animation-delay-400">
      <h2 className="text-2xl font-bold text-white mb-6">سجل الحضور والإنصراف</h2>
      <div className="overflow-x-auto">
        {records.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-900">
              <tr>
                <th scope="col" className="px-6 py-3 text-right text-sm font-bold text-gray-400 uppercase tracking-wider">
                  معرف الموظف
                </th>
                <th scope="col" className="px-6 py-3 text-right text-sm font-bold text-gray-400 uppercase tracking-wider">
                  وقت الحضور
                </th>
                <th scope="col" className="px-6 py-3 text-right text-sm font-bold text-gray-400 uppercase tracking-wider">
                  وقت الانصراف
                </th>
                <th scope="col" className="px-6 py-3 text-right text-sm font-bold text-gray-400 uppercase tracking-wider">
                  الحالة
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {records.map((record, index) => (
                <tr key={record.id} className={`transition-colors duration-200 ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700/50'} hover:bg-amber-500/10`}>
                  <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-100">{record.employeeId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-md text-gray-300">{formatDate(record.checkInTime)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-md text-gray-300">{formatDate(record.checkOutTime)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                        record.status === 'حاضر'
                          ? 'bg-green-600 text-white'
                          : 'bg-red-600 text-white'
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-400 text-lg">لا توجد سجلات لعرضها حتى الآن.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceLog;