import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import medLogo from '../assets/public/auth-logo.png';
import { FaStethoscope, FaUserShield, FaUserInjured, FaFlask, FaCapsules } from 'react-icons/fa';
import { useNavigate, useOutletContext } from 'react-router-dom';

const OnboardingPage = () => {
   const [selectedRole, setSelectedRole] = useState(null);
   const navigate = useNavigate();
   const { handleRoleChange } = useOutletContext();

   const roles = [
      { name: 'Doctor', description: 'Medical professionals.', icon: <FaStethoscope /> },
      { name: 'Admin', description: 'Hospital/clinic administrators.', icon: <FaUserShield /> },
      { name: 'Patient', description: 'Individual receiving care.', icon: <FaUserInjured /> },
      { name: 'Lab Tech', description: 'Medical professionals providing care.', icon: <FaFlask /> },
      { name: 'Pharmacist', description: 'Medical professionals providing care.', icon: <FaCapsules /> },
   ];

   const handleRoleSelect = (roleName) => {
      setSelectedRole(roleName);
      handleRoleChange(roleName);
   };

   const handleGetStarted = () => {
      if (selectedRole) {
         const path = `/auth/${selectedRole.toLowerCase().replace(" ", "")}-signup`;
         navigate(path);
      } else {
         alert('Please select a role to continue.');
      }
   };

   return (
      <div className='flex flex-col items-center justify-center h-full min-h-max md:min-h-max md:h-screen bg-white px-5 py-8 gap-3'>
         <div className='text-center flex justify-center flex-col items-center'>
            <div className='w-[35px] h-[35px] mb-3'>
               <img src={medLogo} alt="MediSync Logo" className='w-full h-full object-contain' />
            </div>
            <h1 className='text-xl md:text-2xl font-bold text-gray-800'>Welcome to MediSync!</h1>
            <p className='text-sm text-gray-600'>Select your role to start.</p>
         </div>
         <div className='flex flex-wrap justify-center gap-4 max-w-full md:max-w-4xl'>
            {roles.map((role) => (
               <div
                  key={role.name}
                  className={`
                            relative p-5 rounded-xl transition-all cursor-pointer w-full sm:w-[calc(50%-1rem)] lg:w-48 h-40 bg-[#F2F2F2]
                            ${selectedRole === role.name ? 'border-2 border-[#1E318A]' : ''}
                        `}
                  onClick={() => handleRoleSelect(role.name)}
               >
                  {selectedRole === role.name && (
                     <FaCheckCircle className='absolute top-3 right-3 text-[#1E318A] text-xl' />
                  )}
                  <div className='flex flex-col items-center text-center'>
                     <div className='text-4xl text-gray-700 mb-2'>{role.icon}</div>
                     <h2 className='text-lg font-semibold'>{role.name}</h2>
                     <p className='text-xs text-gray-500 mt-1'>{role.description}</p>
                  </div>
               </div>
            ))}
         </div>
         <div className='flex flex-col items-center mt-6 w-full md:w-[70%] lg:w-[80%]'>
            <button
               className={`w-full py-3 text-[18px] text-white font-semibold rounded-sm transition-colors
                        ${selectedRole ? 'bg-[#1E318A] hover:bg-[#2941AB]' : 'bg-[#2941AB] cursor-not-allowed'}`}
               onClick={handleGetStarted}
               disabled={!selectedRole}
            >
               Get Started
            </button>
            <p className='text-[12px] text-gray-500 mt-4 text-center'>
               By clicking Continue to join or sign in, you agree to MediSync <span className='text-[#1E318A] cursor-pointer font-bold'>User Agreement</span>, <span className='text-[#1E318A] cursor-pointer font-bold'>Privacy Policy</span>, and <span className='text-[#1E318A] cursor-pointer font-bold'>Cookie Policy</span>
            </p>
            <p className='text-sm mt-2'>
               Already have an account? <a href="#" className='text-[#1E318A] font-medium'>Log In</a>
            </p>
         </div>
      </div>
   );
};

export default OnboardingPage;