import React, { useState } from 'react';
import RescheduleAppointmentForm from '../components/RescheduleAppointmentForm';
import ScheduleReminderForm from '../components/ScheduleReminderForm';

const appointmentData = [
  { id: 1, date: '29/08/2025', time: '10:00 AM', doctor: 'Dr. Olabode Mariam', hospital: 'Lagos University...', specialty: 'Dermatology', type: 'Physical', status: 'Confirmed', upcoming: true },
  { id: 2, date: '29/08/2025', time: '3:00 PM', doctor: 'Dr. Bright Morgan', hospital: 'Kith Laboratory', specialty: 'Dentistry', type: 'Physical', status: 'Confirmed', upcoming: true },
  { id: 3, date: '28/08/2025', time: '12:00 PM', doctor: 'Dr. Shola Morgan', hospital: 'Lagoon Hospital', specialty: 'Cardiology', type: 'Physical', status: 'Cancelled', upcoming: true },
  { id: 4, date: '28/08/2025', time: '10:00 AM', doctor: 'Dr. Fashola Davids', hospital: 'Ikorodu General...', specialty: 'Pediatrics', type: 'Physical', status: 'Pending', upcoming: true },
  { id: 5, date: '27/08/2025', time: '10:00 AM', doctor: 'Dr. Hannah Williams', hospital: 'Lagos University...', specialty: 'Radiology', type: 'Physical', status: 'Pending', upcoming: true },
  { id: 6, date: '26/08/2025', time: '10:00 AM', doctor: 'Dr. Bisola Aiyeola', hospital: 'Kith Laboratory', specialty: 'Oncology', type: 'Physical', status: 'Confirmed', upcoming: true },
  { id: 7, date: '26/08/2025', time: '10:00 AM', doctor: 'Dr. Bright Morgan', hospital: 'Kith Laboratory', specialty: 'Dentistry', type: 'Physical', status: 'Cancelled', upcoming: true },
  { id: 8, date: '25/08/2025', time: '10:00 AM', doctor: 'Dr. Adebisi Nicholas', hospital: 'Lagos University...', specialty: 'Neurology', type: 'Physical', status: 'Pending', upcoming: true },
  { id: 9, date: '25/08/2025', time: '2:30 PM', doctor: 'Dr. Olabode Mariam', hospital: 'Lagos University...', specialty: 'Dermatology', type: 'Physical', status: 'Cancelled', upcoming: true },
  { id: 10, date: '25/08/2025', time: '10:00 AM', doctor: 'Dr. Bisola Aiyeola', hospital: 'Kith Laboratory', specialty: 'Oncology', type: 'Video Call', status: 'Cancelled', upcoming: true },
  { id: 11, date: '01/08/2025', time: '11:00 AM', doctor: 'Dr. Jane Doe', hospital: 'City General', specialty: 'General Practice', type: 'Physical', status: 'Completed', upcoming: false },
  { id: 12, date: '05/08/2025', time: '9:00 AM', doctor: 'Dr. John Smith', hospital: 'St. Jude Clinic', specialty: 'Pediatrics', type: 'Video Call', status: 'Missed', upcoming: false },
];


const AppointmentRow = ({ appointment, onReschedule }) => {
  let statusClasses = '';
  switch (appointment.status) {
    case 'Confirmed':
      statusClasses = 'bg-green-100 text-green-700';
      break;
    case 'Cancelled':
    case 'Missed':
      statusClasses = 'bg-red-100 text-red-700';
      break;
    case 'Pending':
      statusClasses = 'bg-yellow-100 text-yellow-700';
      break;
    case 'Completed':
      statusClasses = 'bg-gray-200 text-gray-800';
      break;
    default:
      statusClasses = 'bg-gray-100 text-gray-700';
  }

  const canReschedule = appointment.upcoming && appointment.status !== 'Cancelled' && appointment.status !== 'Completed';

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-600">{appointment.date}</td>
      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-600">{appointment.time}</td>
      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-800 font-medium">{appointment.doctor}</td>
      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-600">{appointment.hospital}</td>
      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-600">{appointment.specialty}</td>
      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-600">{appointment.type}</td>
      <td className="px-6 py-3 whitespace-nowrap">
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusClasses}`}>
          {appointment.status}
        </span>
      </td>
      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-600">
        {canReschedule ? (
          <button
            onClick={() => onReschedule(appointment)}
            className="text-blue-600 hover:text-blue-800 font-medium text-xs border border-blue-200 px-3 py-1 rounded transition-colors"
          >
            Reschedule
          </button>
        ) : (
          <span className="text-gray-400 text-xs">N/A</span>
        )}
      </td>
    </tr>
  );
};

const AppointmentsTable = ({ appointments, onReschedule }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {['Date', 'Time', "Doctor's Name", 'Hospital/Lab Name', 'Specialty', 'Type of Visit', 'Status', 'Actions'].map((header) => (
            <th
              key={header}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {appointments.map((appt) => (
          <AppointmentRow
            key={appt.id}
            appointment={appt}
            onReschedule={onReschedule}
          />
        ))}
      </tbody>
    </table>
  </div>
);


export default function PatientAppointments() {
  const [activeTab, setActiveTab] = useState('Upcoming');

  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);

  const [appointmentToReschedule, setAppointmentToReschedule] = useState(null);

  const handleRescheduleClick = (appointment) => {
    setAppointmentToReschedule(appointment);
    setIsRescheduleModalOpen(true);
  };

  const filteredAppointments = appointmentData.filter(appt =>
    activeTab === 'Upcoming' ? appt.upcoming : !appt.upcoming
  );

  const totalUpcoming = appointmentData.filter(appt => appt.upcoming).length;

  const tabClass = (tabName) =>
    `py-3 px-6 text-sm font-medium transition-colors duration-200 ease-in-out ${activeTab === tabName
      ? 'border-b-4 border-blue-600 text-blue-700 bg-white'
      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
    }`;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Appointments</h1>
          <p className="text-sm text-gray-500">View, schedule, and manage your medical appointments here.</p>
        </div>
        <button
          onClick={() => setIsReminderModalOpen(true)}
          className="flex items-center bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition duration-150"
        >
          Set Appointment Reminder <span className="ml-2 text-xl">+</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg">
        <div className="border-b border-gray-200 flex space-x-2 px-4 pt-2">
          <button className={tabClass('Upcoming')} onClick={() => setActiveTab('Upcoming')}>
            Upcoming Appointments
          </button>
          <button className={tabClass('Past')} onClick={() => setActiveTab('Past')}>
            Past Appointments
          </button>
        </div>

        <div className="p-4">
          <AppointmentsTable
            appointments={filteredAppointments.slice(0, 10)}
            onReschedule={handleRescheduleClick}
          />
        </div>

        <div className="border-t border-gray-200 px-6 py-4 flex justify-between items-center text-sm text-gray-600">
          <p>
            You have **{totalUpcoming} upcoming appointments** (Displaying 10 per page)
          </p>

          <div className="flex items-center space-x-2">
            <button className="text-gray-400 disabled:opacity-50" disabled>← Previous</button>
            <span className="px-3 py-1 bg-blue-500 text-white rounded-md">1</span>
            <span className="px-3 py-1 hover:bg-gray-100 rounded-md cursor-pointer">2</span>
            <span>...</span>
            <button className="text-blue-600">Next →</button>
          </div>
        </div>
      </div>

      <RescheduleAppointmentForm
        isOpen={isRescheduleModalOpen}
        onClose={() => setIsRescheduleModalOpen(false)}
        initialData={appointmentToReschedule}
      />

      <ScheduleReminderForm
        isOpen={isReminderModalOpen}
        onClose={() => setIsReminderModalOpen(false)}
      />
    </div>
  );
}