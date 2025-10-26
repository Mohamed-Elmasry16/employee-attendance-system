// This file is reserved for shared TypeScript type definitions.

// FIX: Define and export the AttendanceRecord interface based on its usage in AttendanceLog.tsx to resolve the import error.
export interface AttendanceRecord {
  id: number | string;
  employeeId: string;
  checkInTime: Date | null;
  checkOutTime: Date | null;
  status: string;
}
