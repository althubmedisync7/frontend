import React, { useState } from 'react';
import AuthSideBar from '../../components/AuthSideBar';
import { Outlet } from 'react-router-dom';
import onboardingImage from "../../assets/public/onboarding-background.png";
import doctorImage from "../../assets/public/doctor-background.png";
import patientImage from "../../assets/public/patient-background.png";
import adminImage from "../../assets/public/admin-background.png";
import labtechImage from "../../assets/public/labtech-background.png";
import pharmacistImage from "../../assets/public/pharmacist-background.png";

const backgroundImages = {
   Doctor: doctorImage,
   Patient: patientImage,
   Admin: adminImage,
   'Lab Tech': labtechImage,
   Pharmacist: pharmacistImage,
   default: onboardingImage,
};

const OnboardingLayout = () => {
   const [selectedRole, setSelectedRole] = useState(null);

   const handleRoleChange = (roleName) => {
      setSelectedRole(roleName);
   };

   const currentBackgroundImage = selectedRole ? backgroundImages[selectedRole] : backgroundImages.default;

   return (
      <div className='flex flex-col md:flex-row h-screen'>
         <div className="flex-1 w-full md:w-1/2 h-full bg-white overflow-y-auto scrollbar-hide">
            <Outlet context={{ handleRoleChange }} />
         </div>
         <div className="hidden md:block md:w-1/2 h-full bg-gray-100 overflow-y-hidden">
            <AuthSideBar bgImage={currentBackgroundImage} />
         </div>
      </div>
   );
};

export default OnboardingLayout;