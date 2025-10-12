import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../../components/AdminHeader';
import AdminSidebar from '../../components/AdminSidebar';


const AdminLayout = () => {
   return (
      <div className="flex h-screen">
         <aside className="w-58 bg-gray-800 text-white">
            <AdminSidebar />
         </aside>
         <div className="flex-1 flex flex-col">
            <header className="h-21 bg-white shadow flex items-center px-4">
               <AdminHeader />
            </header>
            <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
               <Outlet />
            </main>
         </div>
      </div>
   );
};

export default AdminLayout;