import React from 'react';
import {
   Calendar,
   Download,
   Plus,
   Search,
   CheckCircle,
   XCircle,
   AlertTriangle,
   Settings,
} from 'lucide-react';

// --- Data Stubs (Partial data provided for demonstration) ---
const statData = [
   { title: 'Dispensed Today', value: '15', change: '↓ 8% from yesterday', isPositive: false, icon: Calendar },
   { title: 'Dispensed this Week', value: '30', change: '↑ 12% from yesterday', isPositive: true, icon: Calendar },
   { title: 'Most Dispensed', value: '180', change: '↑ 30% this week', isPositive: true, icon: Calendar },
   { title: 'Patients Served', value: '10', change: '↓ 5% New Alert', isPositive: false, icon: AlertTriangle },
];

const prescriptionData = [
   { date: '12th/08/25', patientId: 'P-28597', patientName: 'Shalom Eze', medication: ['Omeprazole 20mg'], qty: '30 Tabs', dispensedBy: 'Ayomide Olamide', doctor: 'Dr Martins Joy', status: 'Completed' },
   { date: '13th/08/25', patientId: 'P-19634', patientName: 'Tobi Ajayi', medication: ['Paracetamol', '500mg'], qty: '60 Tabs', dispensedBy: 'Grace Adams', doctor: 'Dr Evans Hope', status: 'Completed' },
   { date: '13th/08/25', patientId: 'P-81902', patientName: 'Eddy Emmanuel', medication: ['Ampiclox 300mg'], qty: '40 Tabs', dispensedBy: 'Stella Moses', doctor: 'Dr Laura Anderson', status: 'Completed' },
   { date: '14th/08/25', patientId: 'P-73801', patientName: 'Chisom Uchenna', medication: ['Jawasil 200ml'], qty: '50 Tabs', dispensedBy: 'Chuks Uchenna', doctor: 'Dr Evans Hope', status: 'Pending' },
   { date: '14th/08/25', patientId: 'P-28597', patientName: 'Ella John', medication: ['Losartan 50mg'], qty: '20 Tabs', dispensedBy: 'Yusuf Bello', doctor: 'Dr Laura Anderson', status: 'Pending' },
   { date: '14th/08/25', patientId: 'P-28597', patientName: 'Peace Uche', medication: ['Omeprazole 20mg'], qty: '50 Tabs', dispensedBy: 'Ife Olamide', doctor: 'Dr Evans Hope', status: 'Pending' },
   { date: '14th/08/25', patientId: 'P-28597', patientName: 'Bello Fred', medication: ['Omeprazole 20mg'], qty: '50 Tabs', dispensedBy: 'Ife Olamide', doctor: 'Dr Evans Hope', status: 'Pending' },
   { date: '14th/08/25', patientId: 'P-28597', patientName: 'Festus Ike', medication: ['Omeprazole 20mg'], qty: '60 Tabs', dispensedBy: 'Ife Olamide', doctor: 'Dr Evans Hope', status: 'Completed' },
   { date: '14th/08/25', patientId: 'P-28597', patientName: 'Khadijah Yusuf', medication: ['Omeprazole 20mg'], qty: '30 Tabs', dispensedBy: 'Ife Olamide', doctor: 'Dr Evans Hope', status: 'Completed' },
   { date: '14th/08/25', patientId: 'P-28597', patientName: 'Uduak Eyo', medication: ['Omeprazole 20mg'], qty: '60 Tabs', dispensedBy: 'Ife Olamide', doctor: 'Dr Evans Hope', status: 'Completed' },
   { date: '14th/08/25', patientId: 'P-28597', patientName: 'Uduak Eyo', medication: ['Omeprazole 20mg'], qty: '60 Tabs', dispensedBy: 'Ife Olamide', doctor: 'Dr Evans Hope', status: 'Pending' },
   { date: '14th/08/25', patientId: 'P-28597', patientName: 'Uduak Eyo', medication: ['Omeprazole 20mg'], qty: '60 Tabs', dispensedBy: 'Ife Olamide', doctor: 'Dr Evans Hope', status: 'Pending' },
   { date: '14th/08/25', patientId: 'P-28597', patientName: 'Uduak Eyo', medication: ['Omeprazole 20mg'], qty: '60 Tabs', dispensedBy: 'Ife Olamide', doctor: 'Dr Evans Hope', status: 'Completed' },
   { date: '14th/08/25', patientId: 'P-28597', patientName: 'Uduak Eyo', medication: ['Omeprazole 20mg'], qty: '60 Tabs', dispensedBy: 'Ife Olamide', doctor: 'Dr Evans Hope', status: 'Pending' },
];

const StatCard = ({ title, value, change, isPositive, icon: Icon }) => {
   const changeColor = isPositive ? 'text-green-600' : 'text-red-600';

   return (
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 flex flex-col justify-between h-full">
         <div className="flex justify-between items-start">
            <p className="text-gray-600 text-sm font-medium">{title}</p>
            <div className="p-1 rounded-md text-gray-500">
               <Icon className="w-4 h-4" />
            </div>
         </div>
         <div className="mt-2">
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            <div className={`text-xs mt-1 ${changeColor}`}>
               <span className="ml-1">{change}</span>
            </div>
         </div>
      </div>
   );
};

const PendingPrescriptionTable = ({ data }) => {
   const getStatusIcon = (status) => {
      return status === 'Completed'
         ? <CheckCircle className="w-5 h-5 text-green-500" />
         : <XCircle className="w-5 h-5 text-red-500" />;
   };

   // Aggressive Column Widths to prioritize non-scrolling
   const columns = [
      { header: 'Date and Time', width: 'w-[12%]' },
      { header: 'Patient ID', width: 'w-[8%]' },
      { header: 'Patient Name', width: 'w-[12%]' },
      { header: 'Medications Dispensed', width: 'w-[20%]' },
      { header: 'Qty Dispensed', width: 'w-[8%]' },
      { header: 'Dispensed By', width: 'w-[12%]' },
      { header: 'Prescribing Doctor', width: 'w-[13%]' },
      { header: 'Status', width: 'w-[15%]' },
   ];

   return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mt-6">
         <h2 className="text-xl font-semibold mb-4 text-gray-800">Pending Prescription</h2>

         <div className="flex flex-col sm:flex-row justify-end sm:justify-between items-start sm:items-center mb-4 space-y-3 sm:space-y-0">
            <div className="relative w-full sm:max-w-xs order-2 sm:order-1">
               <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
               <input
                  type="text"
                  placeholder="Search prescriptions"
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
               />
            </div>
            <button className="flex items-center p-2 border border-gray-300 rounded-lg text-gray-600 bg-white hover:bg-gray-50 transition-colors order-1 sm:order-2">
               <Settings className="w-4 h-4 mr-1" />
               <span className="text-sm font-medium">Filter</span>
            </button>
         </div>

         {/* Removed the internal overflow-x-auto to force fitting if possible */}
         <div className="overflow-x-hidden">
            {/* min-w-full and table-fixed ensure the table tries to fit the container width */}
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
               <thead className="bg-gray-50">
                  <tr>
                     {columns.map((col) => (
                        <th
                           key={col.header}
                           // Reduced horizontal padding on table header (px-2)
                           className={`px-2 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider ${col.width}`}
                        >
                           {col.header}
                        </th>
                     ))}
                  </tr>
               </thead>
               <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((item, index) => (
                     <tr key={index} className="hover:bg-indigo-50/20 transition-colors">
                        {/* Text is allowed to wrap to avoid horizontal overflow, and padding is reduced */}
                        <td className="px-2 py-3 text-sm text-gray-600">{item.date}</td>
                        <td className="px-2 py-3 text-sm font-medium text-gray-800">{item.patientId}</td>
                        <td className="px-2 py-3 text-sm font-medium text-indigo-600">{item.patientName}</td>
                        <td className="px-2 py-3 text-sm text-gray-600">
                           {item.medication.join(', ')}
                        </td>
                        <td className="px-2 py-3 text-sm font-medium text-gray-800">{item.qty}</td>
                        <td className="px-2 py-3 text-sm text-gray-600">{item.dispensedBy}</td>
                        <td className="px-2 py-3 text-sm text-gray-600">{item.doctor}</td>
                        <td className="px-2 py-3 text-sm">
                           <div className="flex items-center justify-center">
                              {getStatusIcon(item.status)}
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
};

// --- Main Component ---
const PharmacyHome = () => {
   return (
      <div className="h-full">
         <header className="mb-6">
            <div className="flex justify-between items-start flex-wrap gap-4">
               <div>
                  <h1 className="text-xl sm:text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                  <p className="text-gray-500 mt-1">Welcome back, **Dr. Sharon**. What's happening today?</p>
               </div>

               <div className="flex flex-wrap justify-end gap-3">
                  <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm text-sm">
                     <Download className="w-4 h-4 mr-2" />
                     <span className="font-medium">Export</span>
                  </button>
                  <button className="flex items-center px-4 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-md text-sm">
                     <Plus className="w-4 h-4 mr-2" />
                     <span className="font-medium">New prescription</span>
                  </button>
               </div>
            </div>
         </header>

         <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
            {statData.map((stat, index) => (
               <StatCard key={index} {...stat} />
            ))}
         </section>

         <section>
            <PendingPrescriptionTable data={prescriptionData} />
         </section>
      </div>
   );
};

export default PharmacyHome;