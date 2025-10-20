import React, { useState } from 'react';
import SetPrescriptionReminderModal from '../components/SetPrescriptionReminderModal';

const prescriptionsData = [
  { id: 1, date: '27/08/2025', doctor: 'Dr. Aisha Bello', hospital: 'Lagos University...', medications: ['Ampicillin - 250mg', 'Dexamethasone - 250mg', 'Paracetamol - 500mg'], entryType: "Doctor's Entry", hasReminder: true },
  { id: 2, date: '26/05/2025', doctor: 'Dr. Raymond Ishola', hospital: 'Kith Laboratory', medications: ['Ampicillin - 250mg'], entryType: "Doctor's Entry", hasReminder: false },
  { id: 3, date: '26/04/2025', doctor: 'Dr. Ola Johnson', hospital: 'Lagoon Hospital', medications: ['Ampicillin - 250mg', 'Dexamethasone - 250mg'], entryType: "Doctor's Entry", hasReminder: true },
  { id: 4, date: '25/03/2025', doctor: 'Dr. Keith James', hospital: 'Ikorodu General...', medications: ['Ampicillin - 250mg', 'Dexamethasone - 250mg', 'Paracetamol - 500mg'], entryType: "Doctor's Entry", hasReminder: true },
  { id: 5, date: '25/02/2025', doctor: 'Dr. Mariam Quadri', hospital: 'Lagos University...', medications: ['Ampicillin - 250mg', 'Dexamethasone - 250mg'], entryType: "Doctor's Entry", hasReminder: true },
  { id: 6, date: '25/01/2025', doctor: 'Dr. Joy Omotosho', hospital: 'Kith Laboratory', medications: ['Ampicillin - 250mg'], entryType: "Doctor's Entry", hasReminder: false },
  { id: 7, date: '10/09/2025', doctor: 'Self-Added', hospital: 'N/A', medications: ['Ibuprofen - 400mg'], entryType: 'Personal Entry', hasReminder: false },
];


const PrescriptionRow = ({ prescription, onSetReminder }) => {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-600">{prescription.date}</td>
      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-800 font-medium">{prescription.doctor}</td>
      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-600">{prescription.hospital}</td>
      <td className="px-6 py-3 text-sm text-gray-600">
        {prescription.medications.map((med, index) => (
          <div key={index} className="text-xs">{med}</div>
        ))}
      </td>
      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-600 flex items-center space-x-2">
        <button
          className="bg-blue-600 text-white font-medium text-xs px-3 py-3 rounded hover:bg-blue-700 transition-colors"
        >
          View Details
        </button>
        <button
          onClick={() => onSetReminder(prescription)}
          className={`font-medium text-xs px-3 py-3 rounded transition-colors ${prescription.hasReminder
            ? 'border border-gray-300 text-gray-700 hover:bg-gray-100'
            : 'border border-blue-600 text-blue-600 hover:bg-blue-50'
            }`}
        >
          {prescription.hasReminder ? 'Edit Reminder' : 'Set Reminder'}
        </button>
      </td>
    </tr>
  );
};

const PrescriptionsTable = ({ prescriptions, activeTab, onSetReminder }) => {
  const filteredPrescriptions = prescriptions.filter(p =>
    (activeTab === "Doctor's Entry" && p.entryType === "Doctor's Entry") ||
    (activeTab === 'Personal Entry' && p.entryType === 'Personal Entry')
  );

  return (
    <div className="">
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {['Date', "Doctor's Name", 'Hospital/Lab Name', 'Medications', 'Actions'].map((header) => (
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
          {filteredPrescriptions.map((p) => (
            <PrescriptionRow
              key={p.id}
              prescription={p}
              onSetReminder={onSetReminder}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default function PatientPrescriptions() {
  const [activeTab, setActiveTab] = useState("Doctor's Entry");
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  const handleSetReminderClick = (prescription) => {
    setSelectedPrescription(prescription);
    setIsReminderModalOpen(true);
  };

  const tabClass = (tabName) =>
    `py-3 px-6 text-sm font-medium transition-colors duration-200 ease-in-out ${activeTab === tabName
      ? 'border-b-4 border-blue-600 text-blue-700 bg-white'
      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
    }`;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Prescriptions</h1>
          <p className="text-sm text-gray-500">View, set reminders, and manage your prescriptions here.</p>
        </div>
        <button
          onClick={() => setIsReminderModalOpen(true)}
          className="flex items-center bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition duration-150"
        >
          Set Prescription Reminder <span className="ml-2 text-xl">+</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg">
        <div className="border-b border-gray-200 flex space-x-2 px-4 pt-2">
          <button className={tabClass("Doctor's Entry")} onClick={() => setActiveTab("Doctor's Entry")}>
            Doctor's Entry
          </button>
          <button className={tabClass('Personal Entry')} onClick={() => setActiveTab('Personal Entry')}>
            Personal Entry
          </button>
        </div>

        <div className="p-4">
          <PrescriptionsTable
            prescriptions={prescriptionsData}
            activeTab={activeTab}
            onSetReminder={handleSetReminderClick}
          />
        </div>

        <div className="border-t border-gray-200 px-6 py-4 flex justify-between items-center text-sm text-gray-600">
          <p>
            You have **{prescriptionsData.length} laboratory results** (Displaying 10 per page)
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

      <SetPrescriptionReminderModal
        isOpen={isReminderModalOpen}
        onClose={() => setIsReminderModalOpen(false)}
        initialPrescription={selectedPrescription}
      />
    </div>
  );
}