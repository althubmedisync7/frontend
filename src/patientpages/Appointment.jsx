import { useState } from "react";
import {
  IoSearchOutline,
  IoAddSharp,
  IoChevronBackCircleOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import { Pasts } from "../data/PastAppointment";
import { Upcomings } from "../data/UpcomingAppointment";
import Add from "../assets/public/add-appointment-btn.svg";

import Pagination from "../components/Pagination";

// --- MODAL COMPONENT ---
function RescheduleModal({ appointment, onClose, onSave }) {
  const [date, setDate] = useState(appointment?.date || "");
  const [time, setTime] = useState(appointment?.time || "");
  const [type, setType] = useState(appointment?.type || "Physical");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...appointment,
      date,
      time,
      type,
    });
  };

  if (!appointment) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-lg sm:max-w-2xl lg:max-w-4xl mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl font-light cursor-pointer"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-6">Reschedule Appointment</h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Doctor */}
          <div>
            <label className="block text-sm font-medium">Doctor's Name</label>
            <input
              type="text"
              value={appointment.doctor}
              disabled
              className="w-full border rounded p-2 bg-gray-100"
            />
          </div>

          {/* Specialty */}
          <div>
            <label className="block text-sm font-medium">Specialty</label>
            <input
              type="text"
              value={appointment.department}
              disabled
              className="w-full border rounded p-2 bg-gray-100"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium">Type of Visit</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="Physical">Physical</option>
              <option value="Virtual">Virtual</option>
            </select>
          </div>

          {/* Hospital */}
          <div>
            <label className="block text-sm font-medium">Hospital Name</label>
            <input
              type="text"
              value={appointment.hospital}
              disabled
              className="w-full border rounded p-2 bg-gray-100"
            />
          </div>

          <div className="col-span-2 mt-6">
            <button
              type="submit"
              className="w-full bg-[#1E318A] text-white py-3 rounded-lg font-medium"
            >
              Save & Finish
            </button>
          </div>
        </form>
      </div>
    </div>
  ); 
}

// --- STATUS COMPONENT ---
const StatusPill = ({ status }) => {
  const baseClass =
    "px-2 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap";

  if (status === "pending") {
    return (
      <span className={`${baseClass} bg-[#FFBE78] text-[#4E371E]`}>
        Pending
      </span>
    );
  }
  if (status === "Confirmed") {
    return (
      <span className={`${baseClass} bg-[#B5E9D8] text-[#096647]`}>
        Confirmed
      </span>
    );
  }
  return (
    <span className={`${baseClass} bg-[#D8D8D8] text-gray-700`}>Complete</span>
  );
};

// --- DESKTOP TABLE ---


const DesktopTable = ({ appointments, isUpcoming, handleReschedule }) => (
  <div className="w-full mt-6 border rounded-lg bg-white shadow-sm">
    {/* horizontal scroll wrapper (keeps table responsive on smaller screens) */}
    <div className="overflow-x-auto">
  
      <div
        className="overflow-y-auto relative"
        style={{ maxHeight: "calc(100vh - 220px)" }}
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0 z-30">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Doctor's Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Hospital/Lab Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Specialty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Type of Visit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              {isUpcoming && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {appointments.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900">{item.date}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{item.time}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {item.doctor}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {item.hospital}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {item.department}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {item.type}
                </td>
                <td className="px-6 py-4 text-sm">
                  <StatusPill status={isUpcoming ? item.status : "Complete"} /> 
                </td>
                {isUpcoming && (
                  <td className="px-6 py-4 text-sm font-medium flex gap-2">
                    <button
                      onClick={() => handleReschedule(item)}
                      className="bg-[#1E318A] text-white px-3 py-2 rounded-lg font-semibold"
                    >
                      Reschedule
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);


// --- MAIN COMPONENT ---
export default function PatientAppointments() {
  const [appointments, setAppointments] = useState(Upcomings);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const handleback = () => {
    navigate(-1);
  };

  // const handleRescheduleClick = (appointment) => {
  //   if (window.innerWidth >= 1024) {
  //     setSelectedAppointment(appointment);
  //   } else {
  //     navigate("/patientboard/patientreschedule");
  //   }
  // }; 

  const handleRescheduleClick = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleSave = (updatedAppt) => {
    setAppointments((prev) =>
      prev.map((appt) => (appt.id === updatedAppt.id ? updatedAppt : appt))
    );
    setSelectedAppointment(null);
  };

  const handleAdd = () => {
    navigate("/patientboard/PatientAdd");
  };

  const filteredUpcoming = appointments.filter((upcoming) => {
    const searchableString =
      `${upcoming.date} ${upcoming.department} ${upcoming.doctor} ${upcoming.hospital} ${upcoming.type}`.toLowerCase();
    return searchableString.includes(searchQuery.toLowerCase());
  });

  const filteredPast = Pasts.filter((past) => {
    const searchableString =
      `${past.date} ${past.department} ${past.doctor} ${past.hospital} ${past.type}`.toLowerCase();
    return searchableString.includes(searchQuery.toLowerCase());
  });

  return (
    <>
      {/* --- MOBILE VIEW --- */}
      <main className="block lg:hidden p-4">
        <div className="flex flex-col">
          <div className="flex gap-6 items-center mb-5">
            <button 
              onClick={handleback}
              className="flex items-center text-gray-700"
            >
              <IoChevronBackCircleOutline className="text-[30px] cursor-pointer" />
            </button>
            <h2 className="text-2xl font-semibold">Appointments</h2>
          </div>
          <p className="mb-5 text-gray-600">
            View, schedule and manage all your appointments here
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Diagnosis, Appointments, etc"
            className="w-full pl-10 pr-4 py-4 border rounded-4xl focus:outline-none focus:ring-1 focus:ring-[#1E318A]"
          />
        </div>

        {/* Tabs */}
        <div className="flex border-b mb-4">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`flex-1 text-center py-4 px-4 font-medium rounded-t-lg ${
              activeTab === "upcoming"
                ? " bg-white border-b-2 border-[#1E318A] text-[#1E318A]"
                : "bg-gray-100 text-[#333333] border-b border-gray-300"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`flex-1 text-center py-4 px-4 font-medium rounded-t-lg ${
              activeTab === "past"
                ? " bg-white border-b-2 border-[#1E318A] text-[#1E318A]"
                : "bg-gray-100 text-[#333333] border-b border-gray-300"
            }`}
          >
            Past 
          </button>
        </div>

        {/* Upcoming Content */}
        {activeTab === "upcoming" && (
          <div className="flex flex-col items-center justify-center text-gray-500 mt-5 space-y-4 py-10">
            {filteredUpcoming.map((upcoming) => (
              <div
                key={upcoming.id}
                className="w-full border border-gray-300 rounded-lg p-3 shadow-sm"
              >
                <div className="flex flex-row justify-between items-start">
                  <div>
                    <p className="text-[#545454] text-xs">{upcoming.date}</p>
                    <p className="text-[#545454] text-xs">{upcoming.time}</p>
                  </div>
                  <StatusPill status={upcoming.status} />
                </div>
                <p className="text-[#6875B1] text-[10px] mt-2">
                  {upcoming.department}
                </p>
                <p className="text-[#333333] text-base font-medium">
                  {upcoming.doctor}
                </p>
                <p className="text-[#8A8A8A] text-[10px]">
                  {upcoming.hospital}
                </p>
                <p className="text-[#545454] text-[10px]">{upcoming.type}</p>

                <div className="flex flex-col gap-4 mt-5">
                  <button
                    className="bg-[#1E318A] text-white font-semibold p-3 rounded-lg"
                    onClick={() => handleRescheduleClick(upcoming)}
                  >
                    Reschedule
                  </button>
                  <button className="border-2 border-[#1E318A] p-3 rounded-lg text-[#1E318A]">
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Past Content */}
        {activeTab === "past" && (
          <div className="flex flex-col items-center justify-center text-gray-500 mt-5 space-y-4">
            {filteredPast.map((past) => (
              <div
                key={past.id}
                className="w-full border border-gray-300 rounded-lg p-3 shadow-sm"
              >
                <div className="flex flex-row justify-between items-start">
                  <div>
                    <p className="text-[#545454] text-xs">{past.date}</p>
                    <p className="text-[#545454] text-xs">{past.time}</p>
                  </div>
                  <StatusPill status={"Complete"} />
                </div>
                <p className="text-[#6875B1] text-[10px] mt-2">
                  {past.department}
                </p>
                <p className="text-[#333333] text-base font-medium">
                  {past.doctor}
                </p>
                <p className="text-[#8A8A8A] text-[10px]">{past.hospital}</p>
                <p className="text-[#545454] text-[10px]">{past.type}</p>
              </div>
            ))}
          </div>
        )}

        {/* Floating Add Button */}
        <div className="fixed bottom-20 right-4 z-50">
          <button className="transition">
            <img
              src={Add}
              alt="Add Appointment"
              className="w-18 h-18"
              onClick={handleAdd}
            />
          </button>
        </div>
      </main>

      {/* --- DESKTOP VIEW --- */}
      <main className="hidden lg:block p-6 mt-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-gray-800">Appointments</h2>
            <p className="mt-1 text-gray-600">
              View, schedule and manage all your appointments here
            </p>
          </div>
          <button
            className="flex items-center gap-3 bg-[#1E318A] text-white font-semibold p-3 rounded-lg h-12 cursor-pointer hover:bg-[#2941AB] transition-colors"
            onClick={handleAdd}
          >
            Add Appointment
            <IoAddSharp className="w-6 h-6" />
          </button>
        </div>
        {/* 
        <div className="relative mb-5">
          <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Diagnosis, Appointments, etc"
            className="w-full pl-10 pr-4 py-4 border rounded-4xl focus:outline-none focus:ring-1 focus:ring-[#1E318A]"
          />
        </div> */}

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6 max-w-md">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`flex-1 text-center py-4 px-4 font-medium rounded-t-lg ${
              activeTab === "upcoming"
                ? " bg-white border-b-2 border-[#1E318A] text-[#1E318A]"
                : "bg-gray-100 text-[#333333] border-b border-gray-300"
            }`}
          >
            Upcoming Appointments
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`flex-1 text-center py-4 px-4 font-medium rounded-t-lg ${
              activeTab === "past"
                ? " bg-white border-b-2 border-[#1E318A] text-[#1E318A]"
                : "bg-gray-100 text-[#333333] border-b border-gray-300"
            }`}
          >
            Past Appointments
          </button>
        </div>

        {/* {activeTab === "upcoming" && (
          <DesktopTable
            appointments={filteredUpcoming}
            isUpcoming={true}
            handleReschedule={handleRescheduleClick}
          />

        )} */}

        {activeTab === "upcoming" && (
          <>
            <DesktopTable
              appointments={filteredUpcoming.slice(
                (currentPage - 1) * resultsPerPage,
                currentPage * resultsPerPage
              )}
              isUpcoming={true}
              handleReschedule={handleRescheduleClick}
            />

            <Pagination
              currentPage={currentPage}
              totalResults={filteredUpcoming.length}
              resultsPerPage={resultsPerPage}
              onPageChange={setCurrentPage}
            />
          </>
        )}

        {/* {activeTab === "past" && (
          <DesktopTable
            appointments={filteredPast}
            isUpcoming={false}
            handleReschedule={handleRescheduleClick}
          />
        )} */}

        {activeTab === "past" && (
          <>
            <DesktopTable
              appointments={filteredPast.slice(
                (currentPage - 1) * resultsPerPage,
                currentPage * resultsPerPage
              )}
              isUpcoming={false}
              handleReschedule={handleRescheduleClick}
            />

            <Pagination
              currentPage={currentPage}
              totalResults={filteredPast.length}
              resultsPerPage={resultsPerPage}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </main>

      {/* --- RESCHEDULE MODAL --- */}
      {selectedAppointment && (
        <RescheduleModal
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
          onSave={handleSave}
        />
      )}
    </>
  );
}
