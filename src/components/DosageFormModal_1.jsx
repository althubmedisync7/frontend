import React, { useState } from 'react';


const RadioGroup = ({ label, name, options, selectedValue, handleChange }) => (
   <div className="flex flex-col mb-4">
      <p className="text-sm font-medium text-gray-700 mb-2">{label}</p>
      <div className="space-y-2">
         {options.map((option) => (
            <label key={option} className="flex items-center text-sm text-gray-600 cursor-pointer">
               <input
                  type="radio"
                  name={name}
                  value={option}
                  checked={selectedValue === option}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-gray-600 transition duration-150 ease-in-out"
               />
               <span className="ml-2">{option}</span>
            </label>
         ))}
      </div>
   </div>
);


export default function DosageFormModal({ isOpen, onClose, medicationName }) {
   const [dosageData, setDosageData] = useState({
      dosageType: 'Tablet',
      numTablets: '',
      frequency: 'Once daily',
      duration: '7 days',
   });

   if (!isOpen) return null;

   const handleChange = (e) => {
      const { name, value } = e.target;
      setDosageData(prev => ({ ...prev, [name]: value }));
   };

   const handleDone = (e) => {
      e.preventDefault();
      console.log(`Dosage Set for ${medicationName}:`, dosageData);
      onClose();
   };

   return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
         <div className="bg-white rounded-lg shadow-2xl max-w-sm w-full m-4">

            <div className="flex justify-end p-2">
               <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
               </button>
            </div>

            <div className="p-6 pt-0">
               <h2 className="text-xl font-semibold text-gray-800 mb-6 -mt-2">
                  Dosage
               </h2>

               <form onSubmit={handleDone}>

                  <div className="mb-6">
                     <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Dosage Type <span className="text-red-500">*</span>
                     </label>
                     <input
                        type="text"
                        name="dosageType"
                        value={dosageData.dosageType}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                     />
                     <input
                        type="number"
                        name="numTablets"
                        value={dosageData.numTablets}
                        onChange={handleChange}
                        placeholder="Enter number of tablets to take"
                        required
                        className="w-full mt-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                     />
                  </div>

                  <RadioGroup
                     label="Select number of times to take daily"
                     name="frequency"
                     options={['Once daily', 'Twice daily', 'Three times daily', 'Custom']}
                     selectedValue={dosageData.frequency}
                     handleChange={handleChange}
                  />

                  <RadioGroup
                     label="Duration"
                     name="duration"
                     options={['7 days', '2 weeks', 'Until Stopped', 'Custom']}
                     selectedValue={dosageData.duration}
                     handleChange={handleChange}
                  />


                  <button
                     type="submit"
                     className="w-full mt-6 py-3 bg-gray-300 text-gray-600 font-medium rounded-md hover:bg-gray-400 transition duration-150"
                  >
                     Done
                  </button>
               </form>
            </div>
         </div>
      </div>
   );
}