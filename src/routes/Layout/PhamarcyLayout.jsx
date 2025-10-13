import React from 'react'
import PharmacySidebar from '../../components/PharmacySidebar'
import PharmacyHeader from '../../components/PharmacyHeader'
import { Outlet } from 'react-router-dom'

const PhamarcyLayout = () => {
   return (
      <div className="flex h-screen overflow-hidden">
         <aside className="sticky top-0 left-0 bottom-0 w-64 h-screen flex-shrink-0">
            <PharmacySidebar />
         </aside>

         <div className="flex-1 flex flex-col overflow-hidden">
            <header className="h-20 bg-white shadow flex items-center px-6">
               <PharmacyHeader />
            </header>
            <main className="flex-1 p-6 bg-gray-50 overflow-y-auto overflow-x-hidden">
               <Outlet />
            </main>
         </div>
      </div>
   )
}

export default PhamarcyLayout