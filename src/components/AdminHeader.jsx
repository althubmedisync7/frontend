import React from 'react';
// You'll need to install react-icons for these icons: npm install react-icons
import { HiOutlineSearch } from 'react-icons/hi';
import { FiBell } from 'react-icons/fi';
import { BiChevronDown } from 'react-icons/bi';

const AdminHeader = () => {
   return (
      // Main container for the header. It should span the full width of the content area.
      <header className='w-full h-full bg-white  flex items-center justify-between px-6'>

         {/* Left/Center Section: Search Bar */}
         <div className='flex-grow max-w-2xl mr-8'>
            <div className='relative flex items-center bg-gray-100 rounded-lg h-12 px-4 shadow-inner/5'>
               <HiOutlineSearch className='w-5 h-5 text-gray-500 mr-3' />
               <input
                  type='text'
                  placeholder='Search diagnosis, patients or appointments'
                  className='w-full bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none'
               />
            </div>
         </div>

         {/* Right Section: Notifications and User Profile */}
         <div className='flex items-center space-x-6'>

            {/* Notification Icon */}
            <div className='relative cursor-pointer'>
               <FiBell className='w-6 h-6 text-gray-600' />
               {/* Notification Badge */}
               <div className='absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white'>
                  12
               </div>
            </div>

            {/* User Profile Dropdown */}
            <div className='flex items-center space-x-2 cursor-pointer'>
               {/* Profile Picture (Placeholder) */}
               <div className='w-8 h-8 rounded-full bg-gray-300 overflow-hidden'>
                  {/* You would typically use an <img> tag here */}
                  <img
                     src='https://via.placeholder.com/32/7F9CF5/FFFFFF?text=M'
                     alt='User Profile'
                     className='w-full h-full object-cover'
                  />
               </div>

               {/* User Name and Dropdown Icon */}
               <span className='flex items-center text-gray-800 font-medium'>
                  Mercy
                  <BiChevronDown className='w-5 h-5 ml-1' />
               </span>
            </div>
         </div>
      </header>
   );
};

export default AdminHeader;