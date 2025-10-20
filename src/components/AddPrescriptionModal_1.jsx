import React from 'react';
import { X, Search, Calendar, Save, Plus } from 'lucide-react';
import { toast } from 'react-toastify';

const AddPrescriptionModal = ({ isOpen, onClose }) => {
   if (!isOpen) return null;

   const patientSummary = {
      name: 'Angelina Festus',
      id: 'P-19634',
      age: 45,
      gender: 'Female',
      bloodGroup: 'O+',
      genotype: 'AA',
      allergies: 'Penicillin',
      lastVisit: '2025-06-10',
      avatar: 'https://i.pravatar.cc/150?img=15'
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      toast.info('Prescription Submitted (Placeholder)');
      onClose();
   };

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 transition-opacity">

         <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full m-4 overflow-y-auto max-h-[90vh] overflow-hidden">

            <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
               <h2 className="text-2xl font-bold text-gray-900">New Prescription</h2>
               <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
               </button>
            </div>

            <div className="p-6 pb-4">
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                     type="text"
                     placeholder="Search Patient Name or ID"
                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
               </div>
            </div>

            <div className="p-6 pt-0">
               <h3 className="text-lg font-semibold text-gray-900 mb-3">Patient Summary</h3>
               <div className="bg-indigo-50 p-4 rounded-lg flex items-center space-x-4 border border-indigo-200">
                  <img
                     className="h-10 w-10 rounded-full object-cover"
                     src={patientSummary.avatar}
                     alt={patientSummary.name}
                  />
                  <div className="text-sm flex flex-wrap gap-x-4 gap-y-1">
                     <p className="font-semibold text-gray-900">Name: {patientSummary.name}</p>
                     <p className="text-gray-700">ID: {patientSummary.id}</p>
                     <p className="text-gray-700">Age: {patientSummary.age}</p>
                     <p className="text-gray-700">Gender: {patientSummary.gender}</p>
                     <p className="text-gray-700">Blood Group: {patientSummary.bloodGroup}</p>
                     <p className="text-gray-700">Genotype: {patientSummary.genotype}</p>
                     <p className="text-red-600 font-medium">Allergies: {patientSummary.allergies}</p>
                     <p className="text-gray-700">Last Visit: {patientSummary.lastVisit}</p>
                  </div>
               </div>
            </div>

            <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-6">

               <div className="border border-indigo-400 p-4 rounded-lg bg-indigo-50/50 space-y-4">
                  <h4 className="font-semibold text-gray-900">Doctor Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                     <input
                        type="text"
                        placeholder="Doctors Name"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        required
                     />
                     <input
                        type="text"
                        placeholder="Hospital Name"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        required
                     />
                  </div>
                  <h4 className="font-semibold text-gray-900 mt-4">Prescription Date</h4>
                  <div className="relative">
                     <input
                        type="text"
                        placeholder="DD/MM/YYYY"
                        onFocus={(e) => e.target.type = 'date'}
                        onBlur={(e) => e.target.type = 'text'}
                        className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 w-full"
                        required
                     />
                     <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
               </div>

               <div className="space-y-4 pt-2">
                  <h4 className="text-lg font-semibold text-gray-900">Add Drug</h4>
                  <div className="grid grid-cols-2 gap-4">
                     <input
                        type="text"
                        placeholder="Drug Name"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        required
                     />
                     <input
                        type="text"
                        placeholder="Dosage"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        required
                     />
                     <input
                        type="text"
                        placeholder="Route (e.g., Oral)"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        required
                     />
                     <input
                        type="text"
                        placeholder="Frequency (e.g., 2x Daily)"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        required
                     />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <select
                        className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                        defaultValue="1 Day"
                     >
                        <option>1 Day</option>
                        <option>3 Days</option>
                        <option>1 Week</option>
                        <option>1 Month</option>
                     </select>
                     <input
                        type="number"
                        placeholder="Quantity"
                        defaultValue="1"
                        min="1"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        required
                     />
                  </div>
                  <h4 className="font-semibold text-gray-900 mt-4">Additional Notes</h4>
                  <textarea
                     placeholder="Placeholder"
                     rows="3"
                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                     type="button"
                     className="flex items-center text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
                  >
                     <Plus className="w-4 h-4 mr-2" />
                     Add another drug
                  </button>
               </div>

               <div className="pt-6 flex justify-start space-x-3 border-t border-gray-200">
                  <button
                     type="button"
                     className="flex items-center px-5 py-2.5 rounded-lg text-gray-700 border border-gray-300 bg-white hover:bg-gray-50 transition-colors font-medium shadow-sm"
                  >
                     <Save className="w-5 h-5 mr-2" />
                     Save Draft
                  </button>
                  <button
                     type="submit"
                     className="px-5 py-2.5 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-md font-medium"
                  >
                     Submit Prescription
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default AddPrescriptionModal;