import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  IoChevronBackCircleOutline,
  IoSearchOutline,
  IoAddSharp,
} from "react-icons/io5";
import Add from "../assets/public/add-appointment-btn.svg";
import { useNavigate } from "react-router-dom";


import { Pasts } from "../data/PastAppointment";


import PatientReschedule from "./PatientReschedule";


const StatusPill = ({ status }) => {
 
  const baseClass =
    "px-2 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap"; // Status Logic:

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

// --- DESKTOP TABLE LAYOUT COMPONENT ---
const DesktopTable = ({ appointments, isUpcoming, handleReschedule }) => (
  
  <div className="overflow-x-auto overflow-y-auto h-[70vh] w-full mt-6 border rounded-lg bg-white shadow-sm">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50 sticky top-0 z-10">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Date
          </th>

          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Time
          </th>

          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Doctor's Name
          </th>

          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Hospital/Lab Name
          </th>

          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Specialty
          </th>

          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Type of Visit
          </th>

          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>

          {isUpcoming && (
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          )}
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200">
        {appointments.map((item) => (
          <tr key={item.id} className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {item.date}
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {item.time}
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {item.doctor}
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {item.hospital}
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {item.department}
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {item.type}
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-sm">
              

              <StatusPill status={isUpcoming ? item.status : "Complete"} />
            </td>

            {isUpcoming && (
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={handleReschedule}
                  className="bg-[#1E318A] text-white font-semibold p-3 rounded-lg"
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
);
// ---------------------------------------------

export default function PatientAppointments() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { upcomingAppointments } = useOutletContext();
  const navigate = useNavigate();

  const handleback = () => {
    navigate(-1);
  };

  const handleRescheduleClick = () => {
    // Check if the current view is desktop (using Tailwind's 'lg' breakpoint)
    if (window.innerWidth >= 1024) {
      setIsModalOpen(true);
    } else {
      navigate("/patientboard/patientreschedule");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchQuery, setSearchQuery] = useState(""); 

  const filteredUpcoming = upcomingAppointments.filter((upcoming) => {
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
      {/* MOBILE VIEW */}
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

        <div>
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
          {/* Upcoming Content (Mobile Cards) */}
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
                      onClick={handleRescheduleClick}
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
          {/* Past Content (Mobile Cards) */}
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
        </div>

        <div className="fixed bottom-20 right-4 z-50">
          <button onClick={handleRescheduleClick} className=" transition">
            <img src={Add} alt="Add Appointment" className="w-18 h-18" />
          </button>
        </div>
      </main>
      {/* DESKTOP VIEW (hidden lg:block) */}
      <main className="hidden lg:block p-6 mt-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-gray-800">Appointments</h2>

            <p className="mt-1 text-gray-600">
              View, schedule and manage all your appointments here
            </p>
          </div>

          <button
            onClick={handleRescheduleClick}
            className="flex items-center gap-3 bg-[#1E318A] text-white font-semibold p-3 rounded-lg h-12 cursor-pointer hover:bg-[#2941AB] transition-colors"
          >
            Add Appointment
            <IoAddSharp className="w-6 h-6" />
          </button>
        </div>
        {/* Desktop Tabs */}
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
        {/* Content Area - Desktop Table */}
        {activeTab === "upcoming" && (
          <DesktopTable
            appointments={filteredUpcoming}
            isUpcoming={true}
            handleReschedule={handleRescheduleClick}
          />
        )}
        
        {activeTab === "past" && (
          <DesktopTable
            appointments={filteredPast}
            isUpcoming={false}
            handleReschedule={handleRescheduleClick}
          />
        )}
      </main>
      {/* --- MODAL/POP-UP CONTAINER (Desktop Only) --- */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center **backdrop-blur-sm**" // <--- ADDED backdrop-blur-sm
        >
          <div className="bg-white p-6 rounded-lg shadow-2xl max-w-4xl w-full mx-4 lg:mx-0 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl font-light cursor-pointer"
            >
              &times;
            </button>

           
            <PatientReschedule onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </>
  );
}
