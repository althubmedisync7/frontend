import React, { useState, useMemo } from 'react';

// Primary colors
const primaryBlue = 'text-[#233CAF]';
const primaryDarkBlue = 'bg-[#233CAF]';
// Status colors
const statusCompleted = 'bg-green-100 text-green-700';
const statusConfirmed = 'bg-indigo-100 text-indigo-700';
const statusPending = 'bg-red-100 text-red-700';

// --- INLINE SVG ICONS ---
const IconCalendar = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
const IconChevronLeft = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>;
const IconChevronRight = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>;
const IconView = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12s2-4 7-4 7 4 7 4-2 4-7 4-7-4-7-4z"></path><circle cx="12" cy="12" r="3"></circle></svg>;

// --- MOCK DATA ---
const mockAppointments = [
   { time: '10:00', duration: '30 min', name: 'Olamide Grace', initials: 'DG', reason: 'Follow-up', status: 'Completed', date: '2025-09-04' },
   { time: '10:30', duration: '45 min', name: 'Ade Jamiu', initials: 'AJ', reason: 'Consultation', status: 'Completed', date: '2025-09-04' },
   { time: '11:30', duration: '30 min', name: 'Patrick Kojo', initials: 'PK', reason: 'Check-up', status: 'Confirmed', date: '2025-09-04' },
   { time: '14:00', duration: '30 min', name: 'Dorcas Wisdom', initials: 'DW', reason: 'Follow-up', status: 'Confirmed', date: '2025-09-04' },
   { time: '14:30', duration: '30 min', name: 'ThankGod Etim', initials: 'TE', reason: 'Check-up', status: 'Pending', date: '2025-09-04' },

   // Appointments for the 29th (as highlighted in image)
   { time: '09:00', duration: '30 min', name: 'New Patient 1', initials: 'NP', reason: 'Initial Visit', status: 'Confirmed', date: '2025-08-29' },
   { time: '11:00', duration: '60 min', name: 'Grace O.', initials: 'GO', reason: 'Extended Consult', status: 'Pending', date: '2025-08-29' },

   // Future Appointments (for Upcoming tab)
   { time: '09:00', duration: '30 min', name: 'Future A', initials: 'FA', reason: 'Vaccination', status: 'Confirmed', date: '2025-10-15' },
   { time: '11:00', duration: '45 min', name: 'Future B', initials: 'FB', reason: 'Bloodwork', status: 'Pending', date: '2025-11-20' },
];

const todayDate = '2025-09-04'; // Mock today's date for display purposes

// --- CALENDAR COMPONENT ---
const Calendar = ({ selectedDate, onDateSelect }) => {
   const [viewDate, setViewDate] = useState(new Date('2025-08-01')); // Start on August 1st, 2025
   const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

   const getMonthName = (date) => date.toLocaleString('default', { month: 'long' });
   const getYear = (date) => date.getFullYear();

   const dates = useMemo(() => {
      const startOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
      const endOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0);
      const startDate = new Date(startOfMonth);
      startDate.setDate(startOfMonth.getDate() - (startOfMonth.getDay()));

      const calendarDays = [];
      let currentDate = new Date(startDate);

      while (currentDate.getTime() <= endOfMonth.getTime() || calendarDays.length % 7 !== 0) {
         calendarDays.push(new Date(currentDate));
         currentDate.setDate(currentDate.getDate() + 1);
      }
      return calendarDays;
   }, [viewDate]);

   const handlePrevMonth = () => {
      setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
   };

   const handleNextMonth = () => {
      setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
   };

   const getFormattedDate = (date) => {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, '0');
      const d = String(date.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
   };

   return (
      <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 min-w-[320px]">
         <h3 className="text-xl font-semibold text-gray-800 mb-1">Calendar</h3>
         <p className="text-sm text-gray-500 mb-4">Select a date to view appointments</p>

         {/* Date Picker Input (Top) */}
         <div className="mb-6 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <label className="block text-xs font-medium text-gray-500 mb-1">Date</label>
            <div className="flex justify-between items-center">
               <input
                  type="text"
                  value={selectedDate ? getFormattedDate(new Date(selectedDate)) : 'MM/DD/YYYY'}
                  readOnly
                  className={`bg-transparent text-lg font-medium text-gray-800 focus:outline-none w-full ${selectedDate ? '' : 'text-gray-400'}`}
               />
               <IconCalendar className="w-5 h-5 text-gray-500" />
            </div>
         </div>

         {/* Calendar Header */}
         <div className="flex justify-between items-center mb-4">
            <button onClick={handlePrevMonth} className="p-1 rounded-full hover:bg-gray-100 transition">
               <IconChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex space-x-4 text-sm font-medium">
               <span className="text-gray-800">{getMonthName(viewDate)}</span>
               <span className="text-gray-600">{getYear(viewDate)}</span>
            </div>
            <button onClick={handleNextMonth} className="p-1 rounded-full hover:bg-gray-100 transition">
               <IconChevronRight className="w-5 h-5 text-gray-600" />
            </button>
         </div>

         {/* Calendar Grid */}
         <div className="grid grid-cols-7 gap-2 text-center text-xs">
            {daysOfWeek.map(day => (
               <div key={day} className="font-semibold text-gray-500">{day}</div>
            ))}

            {dates.map((date, index) => {
               const isToday = getFormattedDate(date) === getFormattedDate(new Date(todayDate));
               const isSelected = getFormattedDate(date) === getFormattedDate(new Date(selectedDate));
               const isInMonth = date.getMonth() === viewDate.getMonth();
               const hasAppointment = mockAppointments.some(appt => appt.date === getFormattedDate(date));

               let dayClass = 'text-gray-400';
               if (isInMonth) {
                  dayClass = 'text-gray-700 hover:bg-indigo-50 hover:text-[#233CAF] cursor-pointer';
               }

               if (isToday) {
                  dayClass += ' font-bold border-2 border-indigo-400 rounded-lg';
               }

               if (isSelected) {
                  dayClass = `${primaryDarkBlue} text-white font-bold rounded-lg shadow-md`;
               }

               return (
                  <div key={index} className="flex justify-center items-center">
                     <button
                        onClick={() => onDateSelect(getFormattedDate(date))}
                        className={`w-8 h-8 flex flex-col justify-center items-center transition ${dayClass}`}
                        disabled={!isInMonth}
                     >
                        <span className="text-sm">{date.getDate()}</span>
                        {hasAppointment && (
                           <span className={`w-1 h-1 rounded-full mt-0.5 ${isSelected ? 'bg-white' : 'bg-red-500'}`}></span>
                        )}
                     </button>
                  </div>
               );
            })}
         </div>
      </div>
   );
};


// --- APPOINTMENT LIST COMPONENTS ---
const AppointmentItem = ({ time, duration, name, initials, reason, status }) => {
   let statusClass;
   switch (status) {
      case 'Completed':
         statusClass = statusCompleted;
         break;
      case 'Confirmed':
         statusClass = statusConfirmed;
         break;
      case 'Pending':
         statusClass = statusPending;
         break;
      default:
         statusClass = 'bg-gray-100 text-gray-600';
   }

   return (
      <div className="flex items-start p-4 border-b border-gray-100 hover:bg-indigo-50 transition rounded-xl">
         {/* Time Block */}
         <div className="w-16 flex-shrink-0 text-right pr-4 border-r border-gray-200">
            <p className="text-lg font-semibold text-gray-800">{time}</p>
            <p className="text-xs text-gray-500">{duration}</p>
         </div>

         {/* Patient Details */}
         <div className="flex-1 ml-4 flex items-center justify-between">
            <div className="flex items-center">
               <div className="w-9 h-9 rounded-full flex items-center justify-center bg-indigo-100 text-[#233CAF] font-bold text-sm mr-3 flex-shrink-0">{initials}</div>
               <div>
                  <p className="text-base font-medium text-gray-800">{name}</p>
                  <p className="text-sm text-gray-500">{reason}</p>
               </div>
            </div>

            {/* Status and Action */}
            <div className="flex items-center space-x-3">
               <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusClass}`}>
                  {status}
               </span>
               <button className={`${primaryBlue} p-2 rounded-full hover:bg-indigo-50 transition`}>
                  <IconView className="w-4 h-4" />
               </button>
            </div>
         </div>
      </div>
   );
};

const ScheduleList = ({ title, appointments }) => {
   if (appointments.length === 0) {
      return (
         <div className="text-center p-8 text-gray-500 bg-white rounded-xl">
            <p className="text-lg font-medium mb-1">No appointments scheduled</p>
            <p className="text-sm">Enjoy the free time!</p>
         </div>
      );
   }

   return (
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
         <h4 className="text-lg font-semibold text-gray-800 p-4 border-b border-gray-100">{title}</h4>
         <div className="divide-y divide-gray-100">
            {appointments.map((appt, index) => (
               <AppointmentItem key={index} {...appt} />
            ))}
         </div>
      </div>
   );
};


// --- MAIN DOCTOR APPOINTMENT COMPONENT ---
const DoctorAppointment = () => {
   // State for the selected date on the calendar
   const [selectedDate, setSelectedDate] = useState(todayDate);
   const [scheduleTab, setScheduleTab] = useState('Today'); // 'Today' or 'Upcoming'

   const handleDateSelect = (date) => {
      setSelectedDate(date);
      setScheduleTab('Today'); // Switch back to 'Today' view on date select
   };

   // Filter appointments based on selected date and tab
   const filteredAppointments = useMemo(() => {
      if (scheduleTab === 'Today') {
         return mockAppointments
            .filter(appt => appt.date === selectedDate)
            .sort((a, b) => a.time.localeCompare(b.time));
      } else if (scheduleTab === 'Upcoming') {
         // Filter future appointments, excluding the current selected date
         return mockAppointments
            .filter(appt => appt.date > selectedDate)
            .sort((a, b) => {
               const dateCompare = a.date.localeCompare(b.date);
               return dateCompare === 0 ? a.time.localeCompare(b.time) : dateCompare;
            });
      }
      return [];
   }, [selectedDate, scheduleTab]);

   const displayDate = new Date(selectedDate).toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
   });

   return (
      <div className='bg-gray-50 min-h-screen'>
         {/* Page Header */}
         <div className="flex justify-between items-center mb-8">
            <div>
               <h1 className="text-2xl font-semibold text-gray-800">Appointments</h1>
               <p className="text-gray-500 text-sm">Manage your schedule and appointments</p>
            </div>
            <button className={`inline-flex items-center px-6 py-3 text-sm font-medium rounded-lg text-white ${primaryDarkBlue} hover:opacity-90 transition`}>
               <IconCalendar className="w-5 h-5 mr-2" />
               Schedule Appointment
            </button>
         </div>

         {/* Main Content Layout */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Column 1: Calendar */}
            <div className="lg:col-span-4">
               <Calendar
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
               />
            </div>

            {/* Column 2: Schedule List */}
            <div className="lg:col-span-8">
               <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  {/* Tab Navigation */}
                  <div className="flex space-x-6 mb-6 border-b border-gray-100">
                     <button
                        onClick={() => setScheduleTab('Today')}
                        className={`py-2 px-1 text-base font-medium border-b-2 transition ${scheduleTab === 'Today'
                           ? `text-[#233CAF] border-[#233CAF]`
                           : `text-gray-500 border-transparent hover:border-gray-300`
                           }`}
                     >
                        Today's Schedule
                     </button>
                     <button
                        onClick={() => setScheduleTab('Upcoming')}
                        className={`py-2 px-1 text-base font-medium border-b-2 transition ${scheduleTab === 'Upcoming'
                           ? `text-[#233CAF] border-[#233CAF]`
                           : `text-gray-500 border-transparent hover:border-gray-300`
                           }`}
                     >
                        Upcoming
                     </button>
                  </div>

                  {/* Schedule Content */}
                  <ScheduleList
                     title={scheduleTab === 'Today' ? `Appointments on ${displayDate}` : 'All Upcoming Appointments'}
                     appointments={filteredAppointments}
                  />
               </div>
            </div>

         </div>
      </div>
   );
};

export default DoctorAppointment;
