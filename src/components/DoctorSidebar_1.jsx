import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/public/dashboard-logo.png"


const IconHome = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
const IconUsers = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const IconCalendarCheck = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><path d="M9 16l2 2l4-4"></path></svg>;
const IconSettings = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 5.4 19a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 2-2h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V21z"></path></svg>;
const IconLogOut = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>;
const IconX = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;


const navItems = [
   { name: 'Home', icon: IconHome, href: '/home', active: true },
   { name: 'Patients', icon: IconUsers, href: 'patient-report' },
   { name: 'Appointments', icon: IconCalendarCheck, href: 'doctor-appointment' },
   { name: 'My Profile', icon: IconSettings, href: 'doctor-profile' },
];

const ConfirmLogoutModal = ({ isOpen, onClose, onConfirmLogout }) => {
   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
         <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300">

            <div className="p-6 border-b border-gray-100 flex justify-between items-start">
               <div className="flex items-center">
                  <div className="text-red-500 mr-3 p-2 bg-red-100 rounded-full">
                     <IconLogOut className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Confirm Logout</h3>
               </div>
               <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
                  <IconX className="w-6 h-6" />
               </button>
            </div>

            <div className="p-6">
               <p className="text-gray-700 mb-4">Are you sure you want to log out of your medical dashboard?</p>
               <p className="text-sm text-gray-500">You will need to sign in again to access your patient records, appointments, and other medical data.</p>
            </div>

            <div className="p-4 bg-gray-50 flex justify-end space-x-3 rounded-b-xl">
               <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition shadow-sm"
               >
                  Cancel
               </button>
               <button
                  onClick={onConfirmLogout}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition shadow-md"
               >
                  Log Out
               </button>
            </div>
         </div>
      </div>
   );
};

const DoctorSidebar = () => {
   const navigate = useNavigate();
   const [isModalOpen, setIsModalOpen] = useState(false);

   const sidebarBlue = 'bg-[#233CAF]';
   const highlightWhite = 'text-white';
   const inactiveText = 'text-gray-300';
   const activeBg = 'bg-white';
   const activeText = 'text-[#233CAF]';

   const handleLogoutClick = () => {
      setIsModalOpen(true);
   };

   const handleConfirmLogout = () => {
      setIsModalOpen(false);
      navigate('/');
   };

   return (
      <div className={`w-64 h-screen flex flex-col ${sidebarBlue} ${highlightWhite}`}>
         <div className="w-full h-[20%] pt-4 flex justify-center items-center">
            <img src={logo} alt="MediSync Logo" className='w-[80%] h-[50px] object-contain' />
         </div>

         <nav className="flex-grow mt-0">
            <ul className="space-y-2">
               {navItems.map((item) => {
                  const Icon = item.icon;
                  const linkClasses = item.active
                     ? `${activeBg} ${activeText} font-semibold`
                     : `hover:bg-gray-700/50 ${inactiveText}`;

                  return (
                     <li key={item.name}>
                        <button
                           onClick={() => navigate(item.href)}
                           className={`flex items-center w-full text-left px-6 py-3 transition-colors duration-200 ${linkClasses}`}
                        >
                           <Icon className="w-6 h-6 mr-4" />
                           <span>{item.name}</span>
                        </button>
                     </li>
                  );
               })}
            </ul>
         </nav>

         <div className="mt-auto p-6 border-t border-gray-700/50">
            <button
               onClick={handleLogoutClick}
               className={`flex items-center py-3 px-0 w-full text-left transition-colors duration-200 hover:text-white ${inactiveText}`}
            >
               <IconLogOut className="w-6 h-6 mr-4" />
               <span>Sign Out</span>
            </button>
         </div>

         <ConfirmLogoutModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirmLogout={handleConfirmLogout}
         />
      </div>
   );
};

export default DoctorSidebar;
