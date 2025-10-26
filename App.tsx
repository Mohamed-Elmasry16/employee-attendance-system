import React, { useState, useCallback } from 'react';
import AttendanceForm from './components/AttendanceForm';
import Header from './components/Header';
import Notification from './components/Notification';
import { supabase } from './lib/supabaseClient';

const App: React.FC = () => {
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleCheckIn = useCallback(async (username: string, password: string) => {
    if (!username.trim() || !password.trim()) {
      showNotification('الرجاء إدخال اسم المستخدم وكلمة المرور', 'error');
      return;
    }

    try {
      // الخطوة 1: البحث عن الموظف
      const { data: employee, error: employeeError } = await supabase
        .from('employees')
        .select('employee_id, full_name')
        .eq('username', username)
        .single();

      if (employeeError || !employee) {
        throw new Error('اسم المستخدم غير موجود أو غير صحيح');
      }

      // تحذير: تم تخطي التحقق من كلمة المرور لأنه لا يمكن تنفيذه بأمان من الواجهة الأمامية.
      // يجب تأمين هذا الجزء باستخدام RLS أو Supabase Auth في تطبيق حقيقي.

      // الخطوة 2: التحقق من وجود سجل حضور مفتوح
      const { data: existingRecord, error: recordError } = await supabase
        .from('attendance_records')
        .select('record_id')
        .eq('employee_id', employee.employee_id)
        .is('clock_out', null)
        .single();
      
      // PGRST116 هو كود يعني "لم يتم العثور على صفوف"، وهذا هو المتوقع هنا. أي خطأ آخر هو مشكلة.
      if (recordError && recordError.code !== 'PGRST116') throw recordError;

      if (existingRecord) {
        throw new Error('لقد قمت بتسجيل الحضور بالفعل ولم تسجل انصراف بعد');
      }

      // الخطوة 3: إضافة سجل حضور جديد
      const { error: insertError } = await supabase
        .from('attendance_records')
        .insert({
          employee_id: employee.employee_id,
          clock_in: new Date().toISOString(),
        });

      if (insertError) throw insertError;

      showNotification(`أهلاً بك ${employee.full_name}! تم تسجيل حضورك بنجاح`, 'success');
    } catch (error: any) {
      showNotification(error.message || 'حدث خطأ غير متوقع', 'error');
    }
  }, []);

  const handleCheckOut = useCallback(async (username: string, password: string) => {
     if (!username.trim() || !password.trim()) {
      showNotification('الرجاء إدخال اسم المستخدم وكلمة المرور', 'error');
      return;
    }

    try {
        // الخطوة 1: البحث عن الموظف (مكرر للتحقق)
        const { data: employee, error: employeeError } = await supabase
            .from('employees')
            .select('employee_id, full_name')
            .eq('username', username)
            .single();

        if (employeeError || !employee) {
            throw new Error('اسم المستخدم غير موجود أو غير صحيح');
        }

        // الخطوة 2: البحث عن سجل الحضور المفتوح لتحديثه
        const { data: recordToUpdate, error: recordError } = await supabase
            .from('attendance_records')
            .select('record_id')
            .eq('employee_id', employee.employee_id)
            .is('clock_out', null)
            .single();
        
        if (recordError || !recordToUpdate) {
            throw new Error('يجب عليك تسجيل الحضور أولاً قبل تسجيل الانصراف');
        }

        // الخطوة 3: تحديث السجل بوقت الانصراف
        const { error: updateError } = await supabase
            .from('attendance_records')
            .update({ clock_out: new Date().toISOString() })
            .eq('record_id', recordToUpdate.record_id);

        if (updateError) throw updateError;
        
        showNotification(`إلى اللقاء ${employee.full_name}! تم تسجيل انصرافك بنجاح`, 'success');

    } catch (error: any) {
        showNotification(error.message || 'حدث خطأ غير متوقع', 'error');
    }
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      {notification && <Notification message={notification.message} type={notification.type} />}
      <div className="w-full max-w-md mx-auto">
        <Header />
        <main className="mt-8">
          <AttendanceForm onCheckIn={handleCheckIn} onCheckOut={handleCheckOut} />
        </main>
      </div>
    </div>
  );
};

export default App;