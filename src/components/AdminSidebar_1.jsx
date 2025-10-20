import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import logo from "../assets/public/blue-logo.png";
import { useNavigate } from 'react-router-dom';

const NavItem = ({ icon, text, path, isActive, onClick }) => {
   const baseClasses = 'flex items-center p-3 rounded-lg cursor-pointer transition-colors';
   const activeClasses = 'bg-[#40549c] text-white';
   const inactiveClasses = 'text-gray-600 hover:bg-gray-100';

   return (
      <div
         className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
         onClick={() => onClick(path, text)}
      >
         <span className="w-5 h-5 mr-3">{icon}</span>
         <span className="font-medium text-sm">{text}</span>
      </div>
   );
};

const AdminSidebar = () => {
   const navigate = useNavigate();

   const [activeItem, setActiveItem] = useState('dashboard');

   const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

   const showLogoutModal = () => {
      setIsLogoutModalVisible(true);
   };

   const handleCancelLogout = () => {
      setIsLogoutModalVisible(false);
   };

   const handleConfirmLogout = () => {
      setIsLogoutModalVisible(false);
      navigate('/');
   };

   const handleNavItemClick = (path, text) => {
      if (path === 'logout') {
         showLogoutModal();
      } else {
         navigate(path);
         setActiveItem(path);
      }
   };

   const mainNav = [
      { icon: '📦', text: 'Dashboard', path: '/admin' },
      { icon: '👤', text: 'Patients', path: 'patient-data' },
      { icon: '📅', text: 'Appointment', path: 'patient-appointment' },
      { icon: '👥', text: 'Staff', path: 'staff' },
      { icon: '🧾', text: 'Billing', path: 'billing' },
      { icon: '📈', text: 'Reports', path: 'reports' },
   ];

   const utilityNav = [
      { icon: '⚙️', text: 'Settings', path: 'settings' },
      { icon: '➡️', text: 'Logout', path: 'logout' },
   ];

   return (
      <div className="flex flex-col w-64 h-screen bg-white border-r border-gray-200">

         <div className="p-2 border-b border-gray-200">
            <div className="w-full pt-4 flex justify-center items-center">
               <img
                  src={logo}
                  alt="MediSync Logo"
                  className='w-[60%] h-[50px] object-contain'
               />
            </div>
         </div>

         <nav className="p-4 flex flex-col flex-grow">
            <div className="space-y-1">
               {mainNav.map((item) => (
                  <NavItem
                     key={item.path}
                     icon={item.icon}
                     text={item.text}
                     path={item.path}
                     isActive={item.path === activeItem}
                     onClick={handleNavItemClick}
                  />
               ))}
            </div>

            <div className="mt-auto pt-4 space-y-1">
               <hr className='mb-4 border-gray-200' />
               {utilityNav.map((item) => (
                  <NavItem
                     key={item.path}
                     icon={item.icon}
                     text={item.text}
                     path={item.path}
                     isActive={item.path === activeItem}
                     onClick={handleNavItemClick}
                  />
               ))}
            </div>
         </nav>

         <Modal
            title={
               <div className="flex items-center">
                  <span className="text-xl font-bold text-[#40549c]">Confirm Logout</span>
               </div>
            }
            open={isLogoutModalVisible}
            onCancel={handleCancelLogout}
            footer={null}
            centered
            maskClosable={false}
         >
            <div className="py-4">
               <p className="text-gray-700">Are you sure you want to log out of the MediSync administration panel?</p>
               <p className="mt-2 text-sm text-gray-500">You will need to sign in again to access your dashboard.</p>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
               <Button
                  size="large"
                  onClick={handleCancelLogout}
                  style={{ backgroundColor: "#40549c", color: "white" }}
                  className="border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
               >
                  Cancel
               </Button>
               <Button
                  size="large"
                  type="primary"
                  onClick={handleConfirmLogout}
                  style={{ backgroundColor: "red" }}
                  className="bg-[#d9534f] hover:bg-[#c9302c] border-transparent rounded-lg font-semibold"
               >
                  Log Out
               </Button>
            </div>
         </Modal>
      </div>
   );
};

export default AdminSidebar;
