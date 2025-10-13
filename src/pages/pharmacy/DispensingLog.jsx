import React from 'react';
import { Search, Filter, Download, CheckCircle, Clock } from 'lucide-react';

const dispensingLogData = [
   { date: '12th/08/25', time: '10:30 AM', patientName: 'Shalom Eze', patientId: 'P-28597', drug: 'Omeprazole 20mg', quantity: '30 Tabs', pharmacist: 'Ayomide Olamide', status: 'Completed' },
   { date: '13th/08/25', time: '11:45 AM', patientName: 'Tobi Ajayi', patientId: 'P-19634', drug: 'Paracetamol 500mg', quantity: '60 Tabs', pharmacist: 'Grace Adams', status: 'Completed' },
   { date: '13th/08/25', time: '02:15 PM', patientName: 'Eddy Emmanuel', patientId: 'P-81902', drug: 'Ampiclox 300mg', quantity: '40 Tabs', pharmacist: 'Stella Moses', status: 'Completed' },
   { date: '14th/08/25', time: '09:00 AM', patientName: 'Chisom Uchenna', patientId: 'P-73801', drug: 'Jawasil 200ml', quantity: '50 Tabs', pharmacist: 'Chuks Uchenna', status: 'Completed' },
   { date: '14th/08/25', time: '11:20 AM', patientName: 'Ella John', patientId: 'P-28597', drug: 'Losartan 50mg', quantity: '20 Tabs', pharmacist: 'Yusuf Bello', status: 'Completed' },
   { date: '14th/08/25', time: '03:50 PM', patientName: 'Peace Uche', patientId: 'P-28597', drug: 'Omeprazole 20mg', quantity: '50 Tabs', pharmacist: 'Ife Olamide', status: 'Completed' },
   { date: '15th/08/25', time: '10:10 AM', patientName: 'Festus Ike', patientId: 'P-28597', drug: 'Omeprazole 20mg', quantity: '50 Tabs', pharmacist: 'Ife Olamide', status: 'Completed' },
   { date: '15th/08/25', time: '01:00 PM', patientName: 'Uduak Eyo', patientId: 'P-28597', drug: 'Omeprazole 20mg', quantity: '60 Tabs', pharmacist: 'Ife Olamide', status: 'Completed' },
];

const StatusPill = ({ status }) => {
   return (
      <span className="flex items-center justify-center bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
         <CheckCircle className="w-4 h-4 mr-1" />
         {status}
      </span>
   );
};

const DispensingLog = () => {
   const columns = [
      { header: 'Date', width: 'w-[10%]' },
      { header: 'Time', width: 'w-[10%]' },
      { header: 'Patient Name', width: 'w-[18%]' },
      { header: 'Patient ID', width: 'w-[10%]' },
      { header: 'Medication Dispensed', width: 'w-[25%]' },
      { header: 'Quantity', width: 'w-[10%]' },
      { header: 'Dispensed By', width: 'w-[10%]' },
      { header: 'Status', width: 'w-[7%]', align: 'text-center' },
   ];

   return (
      <div className="bg-gray-50 min-h-screen p-0">

         <header className="mb-6 flex justify-between items-center border-b border-gray-200 pb-4">
            <div>
               <h1 className="text-3xl font-bold text-gray-900">Dispensing Logs</h1>
               <p className="text-gray-500 mt-1">Review the historical records of all completed drug dispensing transactions.</p>
            </div>

            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm text-sm font-medium">
               <Download className="w-4 h-4 mr-2" />
               Export Log
            </button>
         </header>

         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">

            <div className="flex justify-between items-center mb-6 space-x-4">
               <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                     type="text"
                     placeholder="Search by Patient Name, ID, or Drug"
                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
               </div>
               <button className="flex items-center p-2 border border-gray-300 rounded-lg text-gray-600 bg-white hover:bg-gray-50 transition-colors text-sm font-medium">
                  <Filter className="w-4 h-4" />
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
                     {dispensingLogData.map((log, index) => (
                        <tr key={index} className="hover:bg-indigo-50/20 transition-colors">
                           <td className="px-4 py-3 text-sm text-gray-600">{log.date}</td>
                           <td className="px-4 py-3 text-sm text-gray-600 font-medium flex items-center">
                              <Clock className="w-4 h-4 mr-1 text-indigo-500" />
                              {log.time}
                           </td>
                           <td className="px-4 py-3 text-sm font-medium text-indigo-600">{log.patientName}</td>
                           <td className="px-4 py-3 text-sm text-gray-600">{log.patientId}</td>
                           <td className="px-4 py-3 text-sm text-gray-800 font-medium">{log.drug}</td>
                           <td className="px-4 py-3 text-sm text-gray-600">{log.quantity}</td>
                           <td className="px-4 py-3 text-sm text-gray-600">{log.pharmacist}</td>
                           <td className="px-4 py-3 text-sm text-center">
                              <StatusPill status={log.status} />
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            <div className="mt-6 flex justify-center">
               <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors text-sm font-medium">
                  1  2  3  ...  Next
               </button>
            </div>
         </div>
      </div>
   );
};

export default DispensingLog;