import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Calendar, Search, Filter, Plus, Download, Bell, Settings, Home, ClipboardList, Users, Stethoscope, CheckCircle, X } from 'lucide-react';
import AddPrescriptionModal from '../../components/AddPrescriptionModal';

const summaryCardsData = [
   { title: 'Dispensed Today', value: 15, change: 8, unit: '% from yesterday', isDown: true, icon: ClipboardList },
   { title: 'Dispensed this Week', value: 30, change: 12, unit: '% from yesterday', isDown: false, icon: ClipboardList },
   { title: 'Most Dispensed', value: 180, change: 30, unit: '% this week', isDown: false, icon: Stethoscope },
   { title: 'Patients Served', value: 10, change: 5, unit: '% New Alert', isDown: true, icon: Users },
];

const pendingPrescriptionsData = [
   { date: '12th/08/25', patientId: 'P-28597', patientName: 'Shalom Eze', medications: 'Omeprazole 20mg', qty: '30 Tabs', dispensedBy: 'Ayomide Olamide', doctor: 'Dr Martins Joy', status: 'Approved' },
   { date: '13th/08/25', patientId: 'P-19634', patientName: 'Tobi Ajayi', medications: 'Paracetamol 500mg', qty: '60 Tabs', dispensedBy: 'Grace Adams', doctor: 'Dr Evans Hope', status: 'Approved' },
   { date: '13th/08/25', patientId: 'P-81902', patientName: 'Eddy Emmanuel', medications: 'Ampiclox 300mg', qty: '40 Tabs', dispensedBy: 'Stella Moses', doctor: 'Dr Laura Anderson', status: 'Approved' },
   { date: '14th/08/25', patientId: 'P-73801', patientName: 'Chisom Uchenna', medications: 'Jawasil 200ml', qty: '50 Tabs', dispensedBy: 'Chuks Uchenna', doctor: 'Dr Evans Hope', status: 'Rejected' },
   { date: '14th/08/25', patientId: 'P-28597', patientName: 'Ella John', medications: 'Losartan 50mg', qty: '20 Tabs', dispensedBy: 'Yusuf Bello', doctor: 'Dr Laura Anderson', status: 'Approved' },
   { date: '14th/08/25', patientId: 'P-28597', patientName: 'Peace Uche', medications: 'Omeprazole 20mg', qty: '50 Tabs', dispensedBy: 'Ife Olamide', doctor: 'Dr Evans Hope', status: 'Rejected' },
];


const SummaryCard = ({ title, value, change, unit, isDown }) => {
   const changeColor = isDown ? 'text-red-500' : 'text-green-500';
   const arrow = isDown ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />;

   return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col justify-between">
         <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
            <Calendar className="w-5 h-5 text-gray-400" />
         </div>
         <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
         <div className="flex items-center mt-3">
            <span className={`flex items-center text-xs font-medium ${changeColor}`}>
               {arrow}
               {Math.abs(change)}{unit.split(' ')[0]}
            </span>
            <span className="text-xs text-gray-500 ml-1">{unit.substring(unit.indexOf(' '))}</span>
         </div>
      </div>
   );
};

const StatusPill = ({ status }) => {
   let classes = 'px-3 py-1 rounded-full text-xs font-semibold flex items-center justify-center';
   let icon = null;
   if (status === 'Approved') {
      classes += ' bg-green-100 text-green-700';
      icon = <CheckCircle className="w-4 h-4 text-green-600" />;
   } else if (status === 'Rejected') {
      classes += ' bg-red-100 text-red-700';
      icon = <X className="w-4 h-4 text-red-600" />;
   } else {
      classes += ' bg-yellow-100 text-yellow-700';
   }
   return (
      <div className="flex justify-center">
         {status === 'Approved' ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
         ) : (
            <X className="w-5 h-5 text-red-600" />
         )}
      </div>
   );
};

const Prescriptions = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);

   const columns = [
      { header: 'Date and Time', width: 'w-[12%]' },
      { header: 'Patient ID', width: 'w-[10%]' },
      { header: 'Patient Name', width: 'w-[15%]' },
      { header: 'Medications Dispensed', width: 'w-[20%]' },
      { header: 'Qty Dispensed', width: 'w-[10%]' },
      { header: 'Dispensed By', width: 'w-[13%]' },
      { header: 'Prescribing Doctor', width: 'w-[13%]' },
      { header: 'Status', width: 'w-[7%]', align: 'text-center' },
   ];

   return (
      <div className="bg-gray-50 min-h-screen p-6">
         <header className="mb-6 flex justify-between items-center">
            <div>
               <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
               <p className="text-gray-500 mt-1">Welcome back, **Dr. Sharon**. What's happening today?</p>
            </div>

            <div className="flex space-x-3">
               <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm text-sm font-medium">
                  <Download className="w-4 h-4 mr-2" />
                  Export
               </button>
               <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center px-4 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-md text-sm font-medium"
               >
                  <Plus className="w-4 h-4 mr-2" />
                  New prescription
               </button>
            </div>
         </header>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {summaryCardsData.map((card, index) => (
               <SummaryCard key={index} {...card} />
            ))}
         </div>

         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Pending Prescription</h2>

            <div className="flex justify-between items-center mb-4 space-x-4">
               <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                     type="text"
                     placeholder="Search prescriptions"
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
                     {pendingPrescriptionsData.map((prescription, index) => (
                        <tr key={index} className="hover:bg-indigo-50/20 transition-colors">
                           <td className="px-4 py-3 text-sm text-gray-600">{prescription.date}</td>
                           <td className="px-4 py-3 text-sm font-medium text-indigo-600">{prescription.patientId}</td>
                           <td className="px-4 py-3 text-sm font-medium text-indigo-600">{prescription.patientName}</td>
                           <td className="px-4 py-3 text-sm text-gray-800 font-medium">{prescription.medications}</td>
                           <td className="px-4 py-3 text-sm text-gray-600">{prescription.qty}</td>
                           <td className="px-4 py-3 text-sm text-gray-600">{prescription.dispensedBy}</td>
                           <td className="px-4 py-3 text-sm text-gray-600">{prescription.doctor}</td>
                           <td className="px-4 py-3 text-sm text-center">
                              <StatusPill status={prescription.status} />
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            <div className="mt-6 flex justify-end">
               <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors text-sm">
                  View All
               </button>
            </div>
         </div>

         <AddPrescriptionModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
         />

      </div>
   );
};

export default Prescriptions;