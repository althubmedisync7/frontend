import React, { useState } from 'react';
import DosageFormModal from './DosageFormModal';

const medicationOptions = [
   { name: 'Ampicillin - 250mg', set: false },
   { name: 'Dexamethasone - 250mg', set: true },
   { name: 'Paracetamol - 500mg', set: false },
];

const MedicationSelectRow = ({ medication, onSelect }) => {
   return (
      <div
         onClick={() => onSelect(medication.name)}
         className={`p-3 border rounded-lg cursor-pointer transition duration-150 ease-in-out 
                        ${medication.set ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-300 hover:bg-gray-100'}`}
      >
         <div className="flex justify-between items-center text-sm font-medium text-gray-800">
            <span>{medication.name}</span>
            <span className={`text-xs px-2 py-1 rounded-full ${medication.set ? 'bg-green-200 text-green-800' : 'text-gray-500'}`}>
               {medication.set ? 'Reminder Set' : 'Click to Set'}
            </span>
         </div>
      </div>
   );
};

export default function SetPrescriptionReminderModal({ isOpen, onClose }) {
   const [isDosageModalOpen, setIsDosageModalOpen] = useState(false);
   const [selectedMedication, setSelectedMedication] = useState(null);

   if (!isOpen) return null;

   const handleMedicationSelect = (medicationName) => {
      setSelectedMedication(medicationName);
      setIsDosageModalOpen(true);
   };

   const handleSaveAndFinish = () => {
      console.log('Prescription Reminder setup complete.');
      onClose();
   };

   return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
         <div className="bg-white rounded-lg shadow-2xl max-w-sm w-full m-4">

            <div className="flex justify-end p-3">
               <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
               </button>
            </div>

            <h2 className="text-xl font-semibold text-center text-gray-800 mb-6 -mt-4">
               Set Prescription Reminder
            </h2>

            <div className="p-6 pt-0">
               <p className="text-sm font-medium text-gray-700 mb-4">
                  Medications
               </p>
               <p className="text-xs text-gray-500 mb-6 -mt-3">
                  Click on each medication to set a reminder.
               </p>

               <div className="space-y-4 mb-8">
                  {medicationOptions.map((med) => (
                     <MedicationSelectRow
                        key={med.name}
                        medication={med}
                        onSelect={handleMedicationSelect}
                     />
                  ))}
               </div>

               <button
                  onClick={handleSaveAndFinish}
                  className="w-full py-3 bg-gray-300 text-gray-600 font-medium rounded-md hover:bg-gray-400 transition duration-150"
               >
                  Save & Finish
               </button>
            </div>
         </div>

         <DosageFormModal
            isOpen={isDosageModalOpen}
            onClose={() => setIsDosageModalOpen(false)}
            medicationName={selectedMedication}
         />
      </div>
   );
}