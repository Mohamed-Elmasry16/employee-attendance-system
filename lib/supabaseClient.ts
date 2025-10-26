// This file initializes the Supabase client.
// It assumes the Supabase library has been loaded via a <script> tag in index.html.

// Destructure createClient from the global supabase object provided by the CDN script.
// The `|| {}` prevents an error if the global object is not found.
const { createClient } = (window as any).supabase || {};

// 1. تم وضع بيانات الاتصال الخاصة بك هنا
const supabaseUrl = "https://grdfxvncybulazxfqszj.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyZGZ4dm5jeWJ1bGF6eGZxc3pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1MDAyOTcsImV4cCI6MjA3NzA3NjI5N30.E9E3-qk-LiusiI4RuCvsM5AJ5mzGddFT67qEFRkNsuw";

// 2. التحقق من أن مكتبة Supabase تم تحميلها بنجاح
if (typeof createClient !== 'function') {
  throw new Error('مكتبة Supabase غير موجودة. تأكد من تحميل السكربت الخاص بها بشكل صحيح في ملف index.html.');
}

// 3. إنشاء وتصدير عميل Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
