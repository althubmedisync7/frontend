import React, { useState } from 'react';
// Assuming Ant Design is available, importing Modal and Button for the custom confirmation dialog
import { Modal, Button } from 'antd';
import logo from "../assets/public/blue-logo.png";
import { useNavigate } from 'react-router-dom';

// --- Helper Component for Navigation Items ---
// This component manages the visual state of each link.
const NavItem = ({ icon, text, path, isActive, onClick }) => {
   const baseClasses = 'flex items-center p-3 rounded-lg cursor-pointer transition-colors';
   const activeClasses = 'bg-[#40549c] text-white'; // Primary dark blue for active state
   const inactiveClasses = 'text-gray-600 hover:bg-gray-100';

   return (
      <div
         className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
         onClick={() => onClick(path, text)} // Call the handler on click
      >
         {/* The image uses different icons; we'll use emojis for simplicity, 
                but replace with Ant Design icons in a production app. */}
         <span className="w-5 h-5 mr-3">{icon}</span>
         <span className="font-medium text-sm">{text}</span>
      </div>
   );
};

// --- Main Pharmacy Sidebar Component ---
const PharmacySidebar = () => {
   const navigate = useNavigate();

   // STATE for Sidebar navigation
   // Note: 'home' is used here to match the visual presentation of the active item.
   const [activeItem, setActiveItem] = useState('/pharmacy');

   // STATE for Modal visibility
   const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

   // Handler to show the modal
   const showLogoutModal = () => {
      setIsLogoutModalVisible(true);
   };

   // Handler to close the modal
   const handleCancelLogout = () => {
      setIsLogoutModalVisible(false);
   };

   // Handler for actual logout action (Simulated)
   const handleConfirmLogout = () => {
      setIsLogoutModalVisible(false);
      console.log("Pharmacy User successfully logged out!");
      // navigate('/pharmacy/login'); 
   };

   // HANDLER: Function to update the active item on click or show modal
   const handleNavItemClick = (path, text) => {
      if (path === 'logout') {
         // Intercept 'Logout' click and show the modal
         showLogoutModal();
      } else {
         // Handle regular navigation
         navigate(path);
         setActiveItem(path);
      }
   };

   const mainNav = [
      { icon: '🏠', text: 'Home', path: '/pharmacy' }, // Using 'Home' instead of Dashboard
      { icon: '📋', text: 'Dispensing Logs', path: 'dispensing-log' },
      { icon: '👤', text: 'Patients', path: 'patients-overview' },
      { icon: '℞', text: 'Prescriptions', path: 'prescriptions' },
   ];

   const utilityNav = [
      { icon: '⚙️', text: 'Settings', path: 'settings' },
      { icon: '➡️', text: 'Logout', path: 'logout' },
   ];

   return (
      <div className="sticky top-0 left-0 flex flex-col w-64 h-screen bg-white border-r border-gray-200">

         {/* Logo Section */}
         <div className="p-2 border-b border-gray-200">
            <div className="w-full pt-4 flex justify-center items-center">
               {/* Placeholder for the logo image based on your existing pattern */}
               <img
                  src={logo}
                  alt="MediSync Logo"
                  className='w-[60%] h-[50px] object-contain'
               />
            </div>
         </div>

         {/* Navigation Links */}
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

            {/* Utility Links (Pushed to bottom using flex-grow on <nav>) */}
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

         {/* --- Custom Logout Confirmation Modal --- */}
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
               <p className="text-gray-700">Are you sure you want to log out of the MediSync Pharmacy panel?</p>
               <p className="mt-2 text-sm text-gray-500">You will need to sign in again to access the system.</p>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
               <Button
                  size="large"
                  onClick={handleCancelLogout}
                  className="border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
               >
                  Cancel
               </Button>
               <Button
                  size="large"
                  type="primary"
                  onClick={handleConfirmLogout}
                  className="bg-[#d9534f] hover:bg-[#c9302c] border-transparent rounded-lg font-semibold"
               >
                  Log Out
               </Button>
            </div>
         </Modal>
      </div>
   );
};

export default PharmacySidebar;
