import React from 'react';
import { Column } from '@ant-design/plots'; // ✅ Added chart import

const KPICard = ({ title, value, change, changeText, icon }) => (
   <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 flex flex-col justify-between">
      <div className="flex justify-between items-start">
         <h3 className="text-sm font-medium text-gray-500">{title}</h3>
         <span className="text-xl text-gray-400">{icon}</span>
      </div>
      <div className="mt-1">
         <p className="text-2xl font-semibold text-gray-900">{value}</p>
         <div className={`text-xs mt-1 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change}% {changeText}
         </div>
      </div>
   </div>
);

const ActionButton = ({ text, icon, color }) => (
   <button
      className={`w-full flex items-center justify-center p-3 rounded-lg text-white font-medium transition-colors ${color}`}
   >
      <span className="w-5 h-5 mr-2">{icon}</span>
      {text}
   </button>
);

// ✅ New Chart Component
const PatientsByAgeChart = () => {
   const data = [
      { month: "Jan", type: "Male", value: 22 },
      { month: "Jan", type: "Female", value: 15 },
      { month: "Feb", type: "Male", value: 30 },
      { month: "Feb", type: "Female", value: 22 },
      { month: "Mar", type: "Male", value: 34 },
      { month: "Mar", type: "Female", value: 28 },
      { month: "Apr", type: "Male", value: 27 },
      { month: "Apr", type: "Female", value: 18 },
      { month: "May", type: "Male", value: 33 },
      { month: "May", type: "Female", value: 21 },
      { month: "Jun", type: "Male", value: 28 },
      { month: "Jun", type: "Female", value: 24 },
      { month: "Jul", type: "Male", value: 29 },
      { month: "Jul", type: "Female", value: 27 },
      { month: "Aug", type: "Male", value: 35 },
      { month: "Aug", type: "Female", value: 30 },
      { month: "Sep", type: "Male", value: 25 },
      { month: "Sep", type: "Female", value: 20 },
      { month: "Oct", type: "Male", value: 32 },
      { month: "Oct", type: "Female", value: 28 },
      { month: "Nov", type: "Male", value: 40 },
      { month: "Nov", type: "Female", value: 35 },
      { month: "Dec", type: "Male", value: 26 },
      { month: "Dec", type: "Female", value: 19 },
   ];

   const config = {
      data,
      isGroup: true,
      xField: 'month',
      yField: 'value',
      seriesField: 'type',
      color: ['#233CAF', '#4F67E1'],
      columnStyle: { radius: [4, 4, 0, 0] },
      legend: { position: 'top-left' },
      tooltip: { shared: true },
      interactions: [{ type: 'active-region' }],
   };

   return <Column {...config} />;
};

const AdminHome = () => {
   return (
      <div className="space-y-6">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard title="Patients Today" value="128" change={12} changeText="from yesterday" icon="👤" />
            <KPICard title="Appointment Today" value="48" change={-3} changeText="from yesterday" icon="📅" />
            <KPICard title="Revenue Summary" value="$25,500" change={2.5} changeText="today" icon="💰" />
            <KPICard title="Pending Lab Test" value="20" change={0} changeText="urgent results" icon="🔬" />
         </div>

         <div className="flex flex-col sm:flex-row gap-4">
            <ActionButton text="Register New Patient" icon="➕" color="bg-[#40549c] hover:bg-[#324580]" />
            <ActionButton text="Book Appointment" icon="🗓️" color="bg-[#40549c] hover:bg-[#324580]" />
            <ActionButton text="Manage Staff" icon="⚙️" color="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50" />
         </div>

         {/* ✅ Chart Panel (Replaced Placeholder with Chart) */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-96">
               <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold">Patients by age</h2>
                  <select className="text-sm border border-gray-300 rounded-md px-2 py-1">
                     <option>Months</option>
                     <option>Weeks</option>
                     <option>Days</option>
                  </select>
               </div>
               <div className="h-80">
                  <PatientsByAgeChart />
               </div>
            </div>

            {/* Notifications Panel */}
            <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
               <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Notifications Panel</h2>
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-800">View all</a>
               </div>
               <div className="space-y-3">
                  <Notification type="error" text="Unpaid bill for patient #1023 ($250)" />
                  <Notification type="warning" text="Low stock: Paracetamol" />
                  <Notification type="success" text="Appointment Reminder: M David at 2PM." />
               </div>
            </div>
         </div>

         {/* 4. Bottom Content Row */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
               <h2 className="text-lg font-semibold mb-4">Recent Activity Feed</h2>
               <ActivityFeed />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
               <h2 className="text-lg font-semibold mb-4">Upcoming Appointment</h2>
               <AppointmentList />
            </div>
         </div>

         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-4">Overdue Payment</h2>
            <OverdueTable />
         </div>
      </div>
   );
};

export default AdminHome;

// --- Helper Components ---
const Notification = ({ type, text }) => {
   const bgColor = type === 'error' ? 'bg-red-100' : type === 'warning' ? 'bg-yellow-100' : 'bg-green-100';
   const textColor = type === 'error' ? 'text-red-700' : type === 'warning' ? 'text-yellow-700' : 'text-green-700';
   return (
      <div className={`p-3 rounded-lg ${bgColor} ${textColor} flex items-center text-sm`}>
         <span className="w-4 h-4 mr-2">!</span>
         {text}
      </div>
   );
};

const ActivityFeed = () => (
   <div className="space-y-3 text-sm text-gray-600">
      <p className="flex items-start"><span className='mr-2'>✔</span> Grace Thomas registered by Nurse Tee - **10:00**</p>
      <p className="flex items-start"><span className='mr-2'>👨‍⚕️</span> Dr Smith completed 2 appointment - **11:30**</p>
   </div>
);

const AppointmentList = () => (
   <div className="space-y-4 text-sm">
      <div className="flex justify-between items-center">
         <div>
            <p className="font-semibold text-gray-800">James Amos</p>
            <p className="text-xs text-gray-500">Dr. Ola</p>
         </div>
         <span className="font-medium text-gray-700">10:00AM</span>
      </div>
   </div>
);

const OverdueTable = () => (
   <table className="min-w-full divide-y divide-gray-200 text-sm">
      <thead>
         <tr className="text-left text-gray-500 uppercase tracking-wider">
            <th className="py-2">Patient Name</th>
            <th className="py-2">Amount</th>
            <th className="py-2">Due Date</th>
         </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
         <tr>
            <td className="py-2 font-medium text-gray-800">Mike Rose</td>
            <td className="py-2 text-red-500 font-semibold">$150.00</td>
            <td className="py-2 text-gray-500">2 days ago</td>
         </tr>
      </tbody>
   </table>
);
