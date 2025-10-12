import React, { useState } from 'react';
// Icon imports
import { BsCalendarCheck, BsArrowUpRight, BsCheckCircle } from 'react-icons/bs';
import { FiUsers, FiFileText, FiActivity, FiBell } from 'react-icons/fi';
import { MdOutlineMoreVert } from 'react-icons/md';
import { BiChevronLeft, BiChevronRight, BiChevronDown } from 'react-icons/bi';
import { useSelector } from 'react-redux';

// Primary colors
const primaryBlue = 'text-[#233CAF]';
const primaryGreen = 'bg-[#38C6A5]';
const primaryDarkBlue = 'bg-[#233CAF]';

// ---------------------------------------------------------------------
// --- CORE HELPER COMPONENTS (Required for both states) ---
// ---------------------------------------------------------------------

// --- StatCard Component (FIXED: Moved up to resolve ReferenceError) ---
const StatCard = ({ title, value, icon: Icon, valueColor = primaryBlue, subText = null }) => (
  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-32">
    <div className="flex justify-between items-start">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      {Icon && <Icon className="w-5 h-5 text-gray-400" />}
    </div>
    <div className="flex flex-col">
      <p className={`text-3xl font-bold ${valueColor}`}>{value}</p>
      {/* Logic for Completion Rate bar */}
      {title === 'Completion Rate' && (
        <div className="mt-2 h-2 bg-gray-200 rounded-full">
          {/* Assuming value is like '68%' */}
          <div className={`${primaryDarkBlue} h-2 rounded-full`} style={{ width: value }}></div>
        </div>
      )}
      {subText && (
        <p className={`text-xs mt-1 ${title === 'Urgent Cases' ? 'text-red-500' : 'text-gray-500'}`}>{subText}</p>
      )}
    </div>
  </div>
);

// --- QuickActionsCard Component (USED IN FILLED STATE) ---
const QuickActionsCard = () => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-64">
    <h2 className="text-lg font-semibold text-gray-800">Quick Actions</h2>
    <p className="text-sm text-gray-500 mb-6">Frequently used actions for faster workflows</p>
    <div className="flex space-x-4">
      {/* Create Report Button */}
      <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition cursor-pointer w-1/2">
        <button className={`flex items-center justify-center w-12 h-12 rounded-full ${primaryDarkBlue} text-white mb-2`}>
          <FiFileText className="w-6 h-6" />
        </button>
        <p className="text-sm font-medium">Create Report</p>
      </div>
      {/* Quick Diagnosis Button */}
      <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition cursor-pointer w-1/2">
        <button className={`flex items-center justify-center w-12 h-12 rounded-full ${primaryGreen} text-white mb-2`}>
          <BsCheckCircle className="w-6 h-6" />
        </button>
        <p className="text-sm font-medium">Quick Diagnosis</p>
      </div>
    </div>
  </div>
);

// --- AppointmentStatusCard Component (USED IN FILLED STATE - Placeholder) ---
const AppointmentStatusCard = () => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-64 flex flex-col items-center justify-center">
    <p className="text-sm text-gray-500 mb-4">Sunday, Aug 24</p>
    <BsCalendarCheck className="w-10 h-10 text-gray-300 mb-2" />
    <p className="text-sm text-gray-500 mb-6">No appointments today</p>
    <button className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white ${primaryDarkBlue} hover:opacity-90 transition`}>
      <BsCalendarCheck className="w-4 h-4 mr-2" />
      Book Appointment
    </button>
  </div>
);

// --- TodaysScheduleCard Component (USED IN FILLED STATE) ---
const TodaysScheduleCard = () => {
  const appointments = [
    { time: '09:00', patient: 'Glenda Chase', status: 'Follow up' },
    { time: '09:40', patient: 'Ade Jamiu', status: 'New Patient' },
    { time: '10:20', patient: 'Patrick Kojo', status: 'Check-up' },
  ];
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-64">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Today's Schedule</h2>
      <p className="text-sm text-gray-500 mb-4">Upcoming appointments</p>
      <div className="space-y-3">
        {appointments.map((app, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="text-sm font-medium text-gray-700 w-12">{app.time}</div>
            <div className={`border-l-2 ${primaryBlue} pl-4`}>
              <p className="font-medium text-gray-800">{app.patient}</p>
              <p className="text-xs text-gray-500">{app.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- DoctorCalendar Component (USED IN FILLED STATE) ---
const DoctorCalendar = () => {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const dates = [
    ...Array(6).fill(null), 1, 2, 3, 4, 5, 6,
    7, 8, 9, 10, 11, 12, 13,
    14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27,
    28, { date: 29, isToday: true }, { date: 30, isActive: true }, 31, ...Array(6).fill(null)
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 w-full">
      {/* Date Input */}
      <div className="mb-6 flex items-center justify-between border border-gray-300 rounded-lg p-3">
        <div className="flex items-center text-sm font-medium text-gray-700">
          <span className="text-gray-500 mr-2">Date</span>
          08/28/2025
        </div>
        <BsCalendarCheck className="w-5 h-5 text-gray-500 cursor-pointer" />
      </div>

      {/* Calendar Controls */}
      <div className="flex justify-between items-center text-gray-700 text-sm font-medium mb-4">
        <div className="flex items-center space-x-2">
          <span className="cursor-pointer hover:text-[#233CAF]">Month</span>
          <BiChevronDown />
        </div>
        <div className="flex items-center space-x-2">
          <span className="cursor-pointer hover:text-[#233CAF]">Year</span>
          <BiChevronDown />
        </div>
        <div className="flex items-center space-x-2">
          <BiChevronLeft className="w-5 h-5 cursor-pointer hover:text-[#233CAF]" />
          <BiChevronRight className="w-5 h-5 cursor-pointer hover:text-[#233CAF]" />
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-y-2 text-center text-sm">
        {/* Day Headers */}
        {days.map(day => (
          <div key={day} className="font-semibold text-gray-500">{day}</div>
        ))}

        {/* Dates */}
        {dates.map((dateItem, index) => {
          if (dateItem === null) {
            return <div key={index}></div>;
          }

          const date = typeof dateItem === 'object' ? dateItem.date : dateItem;
          const isActive = typeof dateItem === 'object' && dateItem.isActive;
          const isToday = typeof dateItem === 'object' && dateItem.isToday;

          let dateClass = 'p-2 w-full h-8 flex items-center justify-center rounded-full transition cursor-pointer';

          if (isToday) {
            dateClass += ` border-2 ${primaryBlue} ${primaryBlue} font-bold`;
          }
          if (isActive) {
            dateClass = `p-2 w-full h-8 flex items-center justify-center rounded-full transition cursor-pointer ${primaryDarkBlue} text-white font-bold`;
          } else if (!isToday) {
            dateClass += ' text-gray-700 hover:bg-gray-100';
          }

          return (
            <div key={index} className="flex items-center justify-center">
              <div className={dateClass}>{date}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- RecentActivityCard Component (USED IN FILLED STATE) ---
const RecentActivityCard = () => {
  const activities = [
    { time: '20 mins ago', name: 'Michael Chen', action: 'completed appointment' },
    { time: '40 mins ago', name: 'Sarah Williams', action: 'scheduled follow up' },
    { time: '50 mins ago', name: 'Adegoke Seun', action: 'lab results received' },
    { time: '2 hours ago', name: 'Stella Marcus', action: 'rescheduled appointment' },
    { time: '5 hours ago', name: 'Maria Chukwu', action: 'marked as urgent' },
  ];
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Recent Activity</h2>
      <p className="text-sm text-gray-500 mb-4">Latest updates and actions</p>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start">
            <FiActivity className={`w-4 h-4 ${primaryBlue} mt-1 mr-3 flex-shrink-0`} />
            <div>
              <p className="text-xs text-gray-400">{activity.time}</p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">{activity.name}</span> {activity.action}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- NotificationsCard Component (USED IN FILLED STATE) ---
const NotificationsCard = () => {
  const notifications = [
    { time: '5 min ago', text: 'Lab results for Grace Adams require immediate attention' },
    { time: '40 min ago', text: 'Patient’s Orders super level test is ready.' },
    { time: '2 hours ago', text: 'You are yet to update Ibrahim Diagnosis chart.' },
  ];
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Notifications</h2>
      <p className="text-sm text-gray-500 mb-4">Recent alerts and reminders</p>
      <div className="space-y-4">
        {notifications.map((note, index) => (
          <div key={index} className="flex items-start">
            <FiBell className="w-4 h-4 text-red-500 mt-1 mr-3 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-400">{note.time}</p>
              <p className="text-sm text-gray-700">{note.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------
// --- EMPTY STATE COMPONENTS (Used when hasData is false) ---
// ---------------------------------------------------------------------

const WelcomeBanner = () => (
  <div className="bg-white p-10 rounded-xl shadow-sm mb-8 text-center border border-gray-100">
    <h2 className="text-3xl font-bold mb-3 text-gray-800">
      Welcome to **MediSync Dashboard**
    </h2>
    <p className="text-gray-500 max-w-2xl mx-auto text-base">
      You are all set to start managing your medical practice. Let's get you up and running with patients, appointments, and all the tools you need to provide excellent care.
    </p>
  </div>
);

const SetupActionCard = ({ icon: Icon, title, description, buttonText, buttonColor = primaryDarkBlue }) => (
  <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-start border border-gray-100">
    <div className={`text-2xl p-2 bg-red-100 text-red-500 rounded-lg mb-4`}>
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-lg font-semibold mb-1 text-gray-800">{title}</h3>
    <p className="text-sm text-gray-500 mb-4">{description}</p>
    <button className={`w-full mt-auto px-4 py-2 text-sm text-white font-medium rounded-lg ${buttonColor} hover:opacity-90 transition`}>
      {buttonText}
    </button>
  </div>
);

const ChecklistItem = ({ number, title, description }) => (
  <div className="flex items-start py-4 border-b border-gray-100 last:border-b-0">
    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 font-semibold mr-4 mt-1 text-sm">
      {number}
    </div>
    <div className="flex-grow">
      <h4 className="text-base font-semibold text-gray-800">{title}</h4>
      <p className="text-sm text-gray-500 mt-0.5">{description}</p>
    </div>
    <button className={`${primaryBlue} hover:text-indigo-800 text-sm font-medium`}>Start</button>
  </div>
);

const GettingStartedChecklist = () => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <h3 className="text-xl font-semibold mb-6 flex items-center text-gray-800">
      Getting Started Checklist
    </h3>
    <p className="text-gray-500 mb-6 text-sm">
      Complete these steps to set up your medical practice dashboard
    </p>
    <ChecklistItem
      number="1"
      title="Complete Your Profile"
      description="Add your medical credentials, specialization, and professional information"
    />
    <ChecklistItem
      number="2"
      title="Set Up Your Schedule"
      description="Configure your working hours and start booking appointments"
    />
  </div>
);


// ---------------------------------------------------------------------
// --- Main DoctorHome Component ---
// ---------------------------------------------------------------------

const DoctorHome = () => {
  const hasData = useSelector((state) => state.doctor.doctorToken)
  console.log(hasData)
  const todayDate = 'Sunday, 24th August, 2025';

  // --- Data Mocks based on state ---
  const statsData = hasData ? {
    patients: '130',
    appointments: '10',
    rate: '68%',
    urgent: '2',
    subPatients: '12 more in this week',
    subAppointments: '2 canceled this morning',
    subUrgent: '2 more cases this week',
    pendingTasksTitle: null,
  } : {
    patients: '0',
    appointments: '0',
    rate: null,
    urgent: '4', // Pending Tasks count in empty state
    subPatients: 'No patients yet',
    subAppointments: 'No appointments scheduled yet',
    subUrgent: 'Set up looks remaining',
    pendingTasksTitle: 'Pending Tasks',
  };

  // --- Helper function to render a StatCard based on the state ---
  const renderStatCard = (title, value, icon, valueColor, subText) => (
    <StatCard
      title={title}
      value={value}
      icon={icon}
      valueColor={valueColor}
      subText={subText}
    />
  );


  return (
    <div className='p-6 bg-gray-50 min-h-screen'>

      {/* Header / Welcome Section */}
      <div className='mb-8 flex justify-between items-start'>
        <div>
          <h1 className='text-3xl font-semibold text-gray-800'>Good morning, Dr Mercy</h1>
          <p className='text-gray-500'>Welcome to your workspace.</p>
        </div>
        <p className='text-sm text-gray-500'>Today's Date: <br /> **{todayDate}**</p>
      </div>
      {!hasData ? (
        /* --- FILLED STATE (image_fb5fdd.png) --- */
        <>
          {/* Top Stat Cards Grid */}
          <div className='grid grid-cols-4 gap-6 mb-8'>
            {renderStatCard("Total Patients", statsData.patients, FiUsers, primaryBlue, statsData.subPatients)}
            {renderStatCard("Today's Appointment", statsData.appointments, BsCalendarCheck, primaryBlue, statsData.subAppointments)}
            {/* Completion Rate with internal progress bar logic */}
            {renderStatCard("Completion Rate", statsData.rate, MdOutlineMoreVert, 'text-gray-700', null)}
            {renderStatCard("Urgent Cases", statsData.urgent, BsArrowUpRight, 'text-red-500', statsData.subUrgent)}
          </div>

          {/* Main Content Grid (3 Columns) */}
          <div className='grid grid-cols-3 gap-6'>
            {/* Column 1 (Quick Actions & Calendar) */}
            <div className='space-y-6'>
              <QuickActionsCard />
              <DoctorCalendar />
            </div>

            {/* Column 2 (Appointments Status & Recent Activity) */}
            <div className='space-y-6'>
              <AppointmentStatusCard />
              <RecentActivityCard />
            </div>

            {/* Column 3 (Schedule & Notifications) */}
            <div className='space-y-6'>
              <TodaysScheduleCard />
              <NotificationsCard />
            </div>
          </div>
        </>

      ) : (
        /* --- EMPTY STATE (image_fb5f29.png) --- */
        <>
          <WelcomeBanner />

          {/* Basic Stats Row (Zeroed out) */}
          <div className='grid grid-cols-4 gap-6 mb-8'>
            {renderStatCard("Total Patients", statsData.patients, FiUsers, primaryBlue, statsData.subPatients)}
            {renderStatCard("Today's Appointment", statsData.appointments, BsCalendarCheck, primaryBlue, statsData.subAppointments)}
            {/* Placeholder for the 3rd stat (Empty) */}
            <div></div>
            {/* Pending Tasks replaces Urgent Cases in the empty state UI */}
            {renderStatCard(statsData.pendingTasksTitle, statsData.urgent, MdOutlineMoreVert, 'text-red-500', statsData.subUrgent)}
          </div>

          {/* Schedule, Profile, Setup Actions */}
          <div className="grid grid-cols-3 gap-6 mb-10">
            <SetupActionCard
              icon={BsCalendarCheck}
              title="Schedule Appointments"
              description="Set up your appointment calendar"
              buttonText="Schedule Now"
            />
            <SetupActionCard
              icon={FiUsers}
              title="Complete Your Profile"
              description="Finish setting up your medical profile"
              buttonText="Complete Profile"
            />
            <SetupActionCard
              icon={MdOutlineMoreVert}
              title="Set Up Schedule"
              description="Configure your working hours"
              buttonText="Set Up"
            />
          </div>

          {/* Getting Started Checklist */}
          <GettingStartedChecklist />
        </>
      )}
    </div>
  );
};

export default DoctorHome;