import React, { useState } from 'react';

const FormInput = ({ label, name, placeholder, type = "text", required = true, icon = null, formData, handleChange }) => (
   <div className="flex flex-col">
      <label htmlFor={name} className="text-sm font-medium text-gray-700 mb-1">
         {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative">
         <input
            type={type}
            id={name}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            placeholder={placeholder}
            required={required}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
         />
         {icon && <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">{icon}</span>}
      </div>
   </div>
);

export default function ScheduleReminderForm({ isOpen, onClose }) {
   if (!isOpen) return null;

   const [formData, setFormData] = useState({
      fullName: '',
      specialty: '',
      date: '',
      time: '8:00 AM',
      typeOfVisit: 'Physical',
      hospitalName: '',
      appointmentStatus: '',
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      console.log('New Reminder Submitted:', formData);
      onClose();
   };

   return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
         <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full m-4">

            <div className="flex justify-end p-3">
               <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
               </button>
            </div>

            <h2 className="text-xl font-semibold text-center text-gray-800 mb-6 -mt-4">
               Schedule Appointment Reminder
            </h2>

            <form onSubmit={handleSubmit} className="p-6 pt-0">
               <div className="grid grid-cols-2 gap-6">

                  <FormInput label="Full Name" name="fullName" placeholder="Enter doctor's name" formData={formData} handleChange={handleChange} />
                  <FormInput label="Specialty" name="specialty" placeholder="e.g dentistry" formData={formData} handleChange={handleChange} />

                  <FormInput
                     label="Date" name="date" placeholder="DD/MM/YYYY"
                     formData={formData} handleChange={handleChange}
                     icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>}
                  />
                  <FormInput
                     label="Time" name="time" placeholder="8:00 AM"
                     formData={formData} handleChange={handleChange}
                     icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
                  />

                  <div className="flex flex-col">
                     <label htmlFor="typeOfVisit" className="text-sm font-medium text-gray-700 mb-1">
                        Type of Visit <span className="text-red-500">*</span>
                     </label>
                     <div className="relative">
                        <select
                           id="typeOfVisit"
                           name="typeOfVisit"
                           value={formData.typeOfVisit}
                           onChange={handleChange}
                           required
                           className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none"
                        >
                           <option>Physical</option>
                           <option>Video Call</option>
                           <option>Phone Call</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                           <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                     </div>
                  </div>
                  <FormInput label="Hospital Name" name="hospitalName" placeholder="Enter hospital name" formData={formData} handleChange={handleChange} />

                  <div className="flex flex-col col-span-2 sm:col-span-1">
                     <label htmlFor="appointmentStatus" className="text-sm font-medium text-gray-700 mb-1">
                        Appointment Status <span className="text-red-500">*</span>
                     </label>
                     <div className="relative">
                        <select
                           id="appointmentStatus"
                           name="appointmentStatus"
                           value={formData.appointmentStatus}
                           onChange={handleChange}
                           required
                           className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none"
                        >
                           <option value="">Select your choice</option>
                           <option>Pending</option>
                           <option>Confirmed</option>
                           <option>Cancelled</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                           <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                     </div>
                  </div>
               </div>

               <button
                  type="submit"
                  className="w-full mt-8 py-3 bg-gray-300 text-gray-600 font-medium rounded-md hover:bg-gray-400 transition duration-150"
               >
                  Save & Finish
               </button>
            </form>
         </div>
      </div>
   );
};