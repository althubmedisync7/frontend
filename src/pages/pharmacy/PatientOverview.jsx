import React from 'react';
import { Link } from 'react-router-dom';
import { Download, Plus, Settings } from 'lucide-react';

const patientData = [
   { id: 'P-28597', name: 'Shalom Eze', email: 'sharoneze@gmail.com', age: 27, gender: 'Female', consentStatus: 'Active', dob: '12th November 1998', phone: '09157622884', bloodGroup: 'O+', genotype: 'AA', primaryDoctor: 'Dr Jane Uloka', activePrescriptions: 5, lastDispenseDay: 'August 19, 2025', lastDispenseDate: 'August 19, 2025', consent: 'Active', avatar: 'https://i.pravatar.cc/150?img=1' },
   { id: 'P-19634', name: 'Eddy Emmanuel', email: 'eddyemmanuel@gmail.com', age: 45, gender: 'Male', consentStatus: 'Active', activePrescriptions: 2, lastDispenseDay: 'August 21, 2025', lastDispenseDate: 'August 21, 2025', consent: 'Active', avatar: 'https://i.pravatar.cc/150?img=2' },
   { id: 'P-73801', name: 'Tobi Ajayi', email: 'tobiajayi@gmail.com', age: 33, gender: 'Male', consentStatus: 'Required', activePrescriptions: 10, lastDispenseDay: 'August 21, 2025', lastDispenseDate: 'August 21, 2025', consent: 'Required', avatar: 'https://i.pravatar.cc/150?img=3' },
   { id: 'P-81902', name: 'Chisom Uchenna', email: 'chisomuchenna@gmail.com', age: 50, gender: 'Female', consentStatus: 'Active', activePrescriptions: 2, lastDispenseDay: 'August 22, 2025', lastDispenseDate: 'August 22, 2025', consent: 'Active', avatar: 'https://i.pravatar.cc/150?img=4' },
   { id: 'P-11002', name: 'Ella John', email: 'ellajohn@gmail.com', age: 22, gender: 'Female', consentStatus: 'Active', activePrescriptions: 1, lastDispenseDay: 'August 22, 2025', lastDispenseDate: 'August 22, 2025', consent: 'Active', avatar: 'https://i.pravatar.cc/150?img=5' },
   { id: 'P-30401', name: 'Peggy Viola', email: 'peggy@gmail.com', age: 60, gender: 'Female', consentStatus: 'Active', activePrescriptions: 8, lastDispenseDay: 'August 23, 2025', lastDispenseDate: 'August 23, 2025', consent: 'Active', avatar: 'https://i.pravatar.cc/150?img=6' },
   { id: 'P-40502', name: 'Jennifer Adams', email: 'jennifer@gmail.com', age: 38, gender: 'Female', consentStatus: 'Active', activePrescriptions: 5, lastDispenseDay: 'August 23, 2025', lastDispenseDate: 'August 23, 2025', consent: 'Active', avatar: 'https://i.pravatar.cc/150?img=7' },
   { id: 'P-50603', name: 'Shalom Eze', email: 'shallomeze@gmail.com', age: 29, gender: 'Female', consentStatus: 'Required', activePrescriptions: 4, lastDispenseDay: 'August 19, 2025', lastDispenseDate: 'August 19, 2025', consent: 'Required', avatar: 'https://i.pravatar.cc/150?img=8' },
   { id: 'P-60704', name: 'Shalom Eze', email: 'shallomeze@gmail.com', age: 25, gender: 'Female', consentStatus: 'Active', activePrescriptions: 4, lastDispenseDay: 'August 19, 2025', lastDispenseDate: 'August 19, 2025', consent: 'Active', avatar: 'https://i.pravatar.cc/150?img=9' },
   { id: 'P-70805', name: 'Shalom Eze', email: 'shallomeze@gmail.com', age: 31, gender: 'Female', consentStatus: 'Required', activePrescriptions: 4, lastDispenseDay: 'August 19, 2025', lastDispenseDate: 'August 19, 2025', consent: 'Required', avatar: 'https://i.pravatar.cc/150?img=10' },
];

const ConsentPill = ({ status }) => {
   const baseClasses = 'px-3 py-1 rounded-full text-xs font-semibold';
   const colorClasses = status === 'Active'
      ? 'bg-green-100 text-green-700'
      : 'bg-red-100 text-red-700';

   return (
      <span className={`${baseClasses} ${colorClasses} w-full text-center`}>
         {status}
      </span>
   );
};

const PatientOverview = () => {

   const columns = [
      { header: 'Patients Name', width: 'w-[20%]' },
      { header: 'Email', width: 'w-[20%]' },
      { header: 'Active Prescriptions', width: 'w-[15%]', align: 'text-center' },
      { header: 'Last dispense day', width: 'w-[15%]' },
      { header: 'Last dispense date', width: 'w-[15%]' },
      { header: 'Consent status', width: 'w-[15%]', align: 'text-center' },
   ];

   return (
      <div className="bg-gray-50 h-full">
         <header className="mb-6 flex justify-between items-center">
            <div>
               <h1 className="text-3xl font-bold text-gray-900">Patients Overview</h1>
               <p className="text-gray-500 mt-1">Welcome back, **Dr. Sharon**. What's happening today?</p>
            </div>

            <div className="flex space-x-3">
               <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm text-sm font-medium">
                  <Download className="w-4 h-4 mr-2" />
                  Export
               </button>
               <button className="flex items-center px-4 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-md text-sm font-medium">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Patient
               </button>
            </div>
         </header>

         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">

            <div className="flex justify-between items-center mb-4">
               <button className="flex items-center p-2 border border-gray-300 rounded-lg text-gray-600 bg-white hover:bg-gray-50 transition-colors text-sm font-medium">
                  Filter by active prescriptions
                  <Settings className="w-4 h-4 ml-2" />
               </button>
            </div>

            <div className="overflow-x-auto">
               <table className="min-w-full divide-y divide-gray-200 table-fixed">
                  <thead className="bg-gray-50">
                     <tr>
                        {columns.map((col, index) => (
                           <th
                              key={index}
                              className={`px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap ${col.width} ${col.align || 'text-left'}`}
                           >
                              {col.header}
                           </th>
                        ))}
                     </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                     {patientData.map((patient) => (
                        <tr key={patient.id} className="hover:bg-indigo-50/20 transition-colors">
                           <td className="px-4 py-3 text-sm font-medium text-gray-900 flex items-center space-x-3">
                              <img
                                 className="h-8 w-8 rounded-full flex-shrink-0"
                                 src={patient.avatar}
                                 alt={patient.name}
                              />
                              <div>
                                 <Link
                                    to={`/pharmacy/patients-details/${patient.id}`}
                                    state={{ patient }}
                                    className="text-indigo-600 font-medium hover:underline"
                                 >
                                    {patient.name}
                                 </Link>
                                 <p className="text-xs text-gray-500">ID: {patient.id}</p>
                              </div>
                           </td>

                           <td className="px-4 py-3 text-sm text-gray-600 truncate">{patient.email}</td>
                           <td className={`px-4 py-3 text-sm font-medium text-gray-800 ${columns[2].align}`}>{patient.activePrescriptions}</td>
                           <td className="px-4 py-3 text-sm text-gray-600">{patient.lastDispenseDay}</td>
                           <td className="px-4 py-3 text-sm text-gray-600">{patient.lastDispenseDate}</td>
                           <td className="px-4 py-3 text-sm">
                              <div className="flex justify-center">
                                 <ConsentPill status={patient.consent} />
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
               <div>
                  Total Patients: **21,360**
               </div>
               <div className="flex space-x-2 items-center">
                  <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors">
                     ← Previous
                  </button>
                  <span className="px-3 py-1 bg-indigo-600 text-white rounded-lg">1</span>
                  <span className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">2</span>
                  <span className="text-gray-400">...</span>
                  <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                     Next →
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default PatientOverview;