import React from 'react'
import PharmacySidebar from '../../components/PharmacySidebar'
import PharmacyHeader from '../../components/PharmacyHeader'
import { Outlet } from 'react-router-dom'

const PhamarcyLayout = () => {
   return (
      // FIX: Use min-h-screen for flexibility and overflow-hidden to prevent body scroll
      <div className="flex h-screen overflow-hidden">
         {/* FIX: Use standard Tailwind width (w-64) */}
         <aside className="sticky top-0 left-0 bottom-0 w-64 h-screen flex-shrink-0">
            <PharmacySidebar />
         </aside>

         <div className="flex-1 flex flex-col overflow-hidden">
            <header className="h-20 bg-white shadow flex items-center px-6">
               <PharmacyHeader />
            </header>
            {/* FIX: Set main area to scroll vertically, but hide horizontal overflow */}
            <main className="flex-1 p-6 bg-gray-50 overflow-y-auto overflow-x-hidden">
               <Outlet />
            </main>
         </div>
      </div>
   )
}

export default PhamarcyLayout