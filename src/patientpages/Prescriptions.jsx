import { useState } from "react";
import {
  IoChevronBackCircleOutline,
  IoSearchOutline,
  IoAddSharp,
} from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import Add from "../assets/public/add-appointment-btn.svg";
import { useNavigate } from "react-router-dom";

import { DoctorEntries } from "../data/DoctorEntry";
import { Personal } from "../data/PersonalEntry";

import Pagination from "../components/Pagination";


const DesktopTable = ({
  entries,
  isDoctor,
  handleAction,
  setSelectedEntry,
  setShowModal,
}) => (
  <div className="w-full mt-6 border rounded-lg bg-white shadow-sm">
 
    <div className="overflow-x-auto">
      {/* Scrollale element */}
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
              {isDoctor && (
                <>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Doctor's Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Hospital
                  </th>
                </>
              )}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Medication(s)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {entries.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900">{item.date}</td>

                {isDoctor && (
                  <>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {item.doctor}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.hospital}
                    </td>
                  </>
                )}

                <td className="px-6 py-4 text-sm text-gray-500">
                  {Array.isArray(item.medication)
                    ? item.medication
                        .map((m) =>
                          typeof m === "string"
                            ? m
                            : `${m.name} - ${m.dosage || ""}`
                        )
                        .join(", ")
                    : item.medication}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                  <button
                    onClick={() => handleAction("view", item, isDoctor)}
                    className="bg-[#1E318A] text-white px-3 py-2 rounded-lg cursor-pointer"
                  >
                    View Details
                  </button>

                  {isDoctor ? (
                    <button
                      onClick={() => {
                        if (setSelectedEntry) setSelectedEntry(item);
                        if (setShowModal) setShowModal(true);
                      }}
                      className="border border-[#1E318A] text-[#1E318A] px-3 py-2 rounded-lg"
                    >
                      Set Reminder
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAction("edit", item, isDoctor)}
                      className="border border-[#1E318A] text-[#1E318A] px-3 py-2 rounded-lg"
                    >
                      Edit Reminder
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default function PatientPrescriptions() {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;
  const [activeTab, setActiveTab] = useState("doctor");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false); // Modal 1
  const [selectedDrug, setSelectedDrug] = useState(null); // For Modal 2
  const [completedReminders, setCompletedReminders] = useState({}); // Track which meds are set
  const [selectedEntry, setSelectedEntry] = useState(null);

  const handleBack = () => navigate(-1);

  const handleAction = (type, item, isDoctor) => {
    if (type === "view") {
      navigate(
        `/patientboard/prescriptions/${isDoctor ? "doctor" : "personal"}/${
          item.id
        }`
      );
    } else if (type === "set") { 
      setShowModal(true);
    } else if (type === "edit") {
      console.log("Editing reminder for:", item);
    }
  };

  const filteredDoctor = DoctorEntries.filter((entry) =>
    `${entry.date} ${entry.doctor} ${entry.hospital} ${entry.medication
      .map((m) => m.name)
      .join(" ")}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const filteredPersonal = Personal.filter((entry) =>
    `${entry.medication} ${entry.dosage} ${entry.duration}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleDrugClick = (drug) => {
    setSelectedDrug(drug);
  };

  const handleReminderDone = () => {
    setCompletedReminders((prev) => ({ ...prev, [selectedDrug]: true }));
    setSelectedDrug(null); // close drug-specific modal
  };

  const handleSaveFinish = () => {
    setShowModal(false);
    alert("Reminder set!");
  };

  return (
    <>
      <div>
        <div className={`${showModal || selectedDrug ? "filter blur-sm" : ""}`}>
          {/* MOBILE VIEW */}
          <main className="block lg:hidden p-4">
            <div className="flex gap-6 items-center mb-5">
              <button
                onClick={handleBack}
                className="flex items-center text-gray-700"
              >
                <IoChevronBackCircleOutline className="text-[30px] cursor-pointer" />
              </button>
              <h2 className="text-2xl font-semibold">Prescriptions</h2>
            </div>

            <p className="mb-5 text-gray-600">
              View, set reminders and manage all your prescriptions here
            </p>

            {/* search */}
            <div className="relative mb-5">
              <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Prescriptions, Doctors, etc"
                className="w-full pl-10 pr-4 py-4 border rounded-4xl focus:outline-none focus:ring-1 focus:ring-[#1E318A]"
              />
            </div>

            {/* Tabs */}
            <div className="flex border-b mb-4">
              <button
                onClick={() => setActiveTab("doctor")}
                className={`flex-1 text-center py-4 font-medium ${
                  activeTab === "doctor"
                    ? "bg-white border-b-2 border-[#1E318A] text-[#1E318A]"
                    : "bg-gray-100 text-[#333333] border-b border-gray-300"
                }`}
              >
                Doctor’s Entry
              </button>
              <button
                onClick={() => setActiveTab("personal")}
                className={`flex-1 text-center py-4 font-medium ${
                  activeTab === "personal"
                    ? "bg-white border-b-2 border-[#1E318A] text-[#1E318A]"
                    : "bg-gray-100 text-[#333333] border-b border-gray-300"
                }`}
              >
                Personal Entry
              </button>
            </div>

            {/* Doctor’s Entries */}
            {activeTab === "doctor" && (
              <div className="flex flex-col gap-4 mt-5">
                {filteredDoctor.map((entry) => (
                  <div
                    key={entry.id}
                    className="border border-gray-300 rounded-lg p-3 shadow-sm"
                  >
                    <p className="text-[#545454] text-xs">{entry.date}</p>
                    <p className="text-[#333333] font-medium">{entry.doctor}</p>
                    <p className="text-[#8A8A8A] text-[10px]">
                      {entry.hospital}
                    </p>
                    <p className="text-[#545454] text-sm mt-2">
                      {entry.medication
                        .map((m) => `${m.name} - ${m.dosage}`)
                        .join(", ")}
                    </p>
                    <div className="flex gap-2 mt-4">
                      <button
                        className="bg-[#1E318A] text-white font-semibold p-2 rounded-lg flex-1 cursor-pointer"
                        onClick={() => handleAction("view", entry, true)}
                      >
                        View Details
                      </button>
                      <button
                        className="border border-[#1E318A] text-[#1E318A] p-2 rounded-lg flex-1 cursor-pointer"
                        onClick={() => {
                          setSelectedEntry(entry);
                          setShowModal(true);
                        }}
                      >
                        Set Reminder
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Personal Entries */}
            {activeTab === "personal" && (
              <div className="flex flex-col gap-4 mt-5">
                {filteredPersonal.map((entry) => (
                  <div
                    key={entry.id}
                    className="border border-gray-300 rounded-lg p-3 shadow-sm"
                  >
                    <p className="text-[#333333] font-medium">
                      {entry.medication}
                    </p>
                    <p className="text-[#8A8A8A] text-sm">
                      Dosage: {entry.dosage}
                    </p>
                    <p className="text-[#545454] text-sm">
                      Duration: {entry.duration}
                    </p>
                    <div className="flex gap-2 mt-4">
                      <button
                        className="bg-[#1E318A] text-white font-semibold p-2 rounded-lg flex-1 cursor-pointer"
                        onClick={() => handleAction("view", entry, false)}
                      >
                        View Details
                      </button>
                      <button
                        className="border border-[#1E318A] text-[#1E318A] p-2 rounded-lg flex-1 cursor-pointer"
                        onClick={() => handleAction("edit", entry)}
                      >
                        Edit Reminder
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* floating add btn */}
            <div className="fixed bottom-20 right-4 z-50">
              <button>
                <img src={Add} alt="Add Prescription" className="w-18 h-18" />
              </button>
            </div>
          </main>

          {/* DESKTOP VIEW */}
          <main className="hidden lg:block p-6 mt-10">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Prescriptions
                </h2>
                <p className="mt-1 text-gray-600">
                  View, set reminders and manage all your prescriptions here
                </p>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-3 bg-[#1E318A] text-white font-semibold p-3 rounded-lg h-12 hover:bg-[#2941AB] transition"
              >
                Set Prescription Reminder
                <IoAddSharp className="w-6 h-6" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6 max-w-md">
              <button
                onClick={() => setActiveTab("doctor")}
                className={`flex-1 text-center py-4 font-medium ${
                  activeTab === "doctor"
                    ? "bg-white border-b-2 border-[#1E318A] text-[#1E318A]"
                    : "bg-gray-100 text-[#333333] border-b border-gray-300"
                }`}
              >
                Doctor’s Entry
              </button>
              <button
                onClick={() => setActiveTab("personal")}
                className={`flex-1 text-center py-4 font-medium ${
                  activeTab === "personal"
                    ? "bg-white border-b-2 border-[#1E318A] text-[#1E318A]"
                    : "bg-gray-100 text-[#333333] border-b border-gray-300"
                }`}
              >
                Personal Entry
              </button>
            </div>
            {activeTab === "doctor" && (
              <>
                <DesktopTable
                  entries={filteredDoctor.slice(
                    (currentPage - 1) * resultsPerPage,
                    currentPage * resultsPerPage
                  )}
                  isDoctor={true}
                  handleAction={handleAction}
                  setSelectedEntry={setSelectedEntry}
                  setShowModal={setShowModal}
                />

                <Pagination
                  currentPage={currentPage}
                  totalResults={filteredDoctor.length}
                  resultsPerPage={resultsPerPage}
                  onPageChange={setCurrentPage}
                />
              </>
            )}

            {activeTab === "personal" && (
              <>
                <DesktopTable
                  entries={filteredPersonal.slice(
                    (currentPage - 1) * resultsPerPage,
                    currentPage * resultsPerPage
                  )}
                  isDoctor={false}
                  handleAction={handleAction}
                  setSelectedEntry={setSelectedEntry}
                  setShowModal={setShowModal}
                />

                <Pagination
                  currentPage={currentPage}
                  totalResults={filteredPersonal.length}
                  resultsPerPage={resultsPerPage}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </main>
        </div>
        {/* MODAL 1 - Medicine List */}
        {showModal && !selectedDrug && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-[90%] md:w-[450px] p-6 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">
                  Set Prescription Reminder
                </h2>
                <IoClose
                  className="cursor-pointer"
                  size={22}
                  onClick={() => setShowModal(false)}
                />
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Click on each medication to set a reminder.
              </p>

              <div className="flex flex-col gap-3">
                {selectedEntry?.medication?.map((m, idx) => {
                  const label =
                    typeof m === "string" ? m : `${m.name} - ${m.dosage}`;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleDrugClick(label)}
                      className={`flex justify-between items-center w-full px-4 py-3 rounded-md border ${
                        completedReminders[label]
                          ? "bg-[#E6F0FF] border-[#1E318A]"
                          : "bg-gray-100"
                      }`}
                    >
                      <span>{label}</span>
                      <span className="text-gray-500">▼</span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleSaveFinish}
                className="w-full mt-6 bg-[#1E318A] text-white py-2 rounded-md"
              >
                Save & Finish
              </button>
            </div>
          </div>
        )}
        {/* MODAL 2 - Reminder Setup */}
        {selectedDrug && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-[90%] md:w-[450px] p-6 shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Dosage</h2> 
              <input
                type="text"
                placeholder="Enter number of tablets to take"
                className="w-full border rounded px-3 py-2 mb-4"
              />

              <div className="mb-4">
                <p className="font-medium mb-2">
                  Select number of times to take daily
                </p>
                <div className="space-y-2 text-sm text-gray-700">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="times" /> Once daily
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="times" /> Twice daily
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="times" /> Three times daily
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="times" /> Custom
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <p className="font-medium mb-2">Duration</p>
                <div className="space-y-2 text-sm text-gray-700">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="duration" /> 7 days
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="duration" /> 2 weeks
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="duration" /> Until stopped
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="duration" /> Custom
                  </label>
                </div>
              </div>

              <button
                onClick={handleReminderDone}
                className="w-full bg-[#1E318A] text-white py-2 rounded-md"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
