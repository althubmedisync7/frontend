import React from "react";
import { Outlet } from "react-router-dom";
import DoctorSidebar from "../../components/DoctorSidebar";
import DoctorHeader from "../../components/DoctorHeader";

const DoctorLayout = () => {
   return (
      <div className="flex h-screen">
         <aside className="w-58 bg-gray-800 text-white">
            <DoctorSidebar />
         </aside>
         <div className="flex-1 flex flex-col">
            <header className="h-20 bg-white shadow flex items-center px-4">
               <DoctorHeader />
            </header>
            <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
               <Outlet />
            </main>
         </div>
      </div>
   );
};

export default DoctorLayout;
