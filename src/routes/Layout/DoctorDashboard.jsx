// src/routes/Layout/PatientDashboardLayout.jsx
import { Outlet, NavLink } from "react-router-dom";
import medLogo from "../../assets/public/auth-logo.png"; 
import logoWrite from "../../assets/public/logo-writeup.png";
import { CgProfile } from "react-icons/cg";
import { IoIosNotificationsOutline } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { FaRegCalendarCheck } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { LuLogOut } from "react-icons/lu";
import { User } from "react-feather";

export default function DoctorDashboardLayout() {
    

      
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64   shadow-sm flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-2 p-4 ">
          <img src={medLogo} alt="Logo" className="h-10 w-10" />
          <img src={logoWrite} alt="MediSync" className="h-8" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 text-sm font-medium">
          <NavLink
            to="/doctor"
            
            className={({ isActive }) =>
              ` flex gap-3 px-4 py-2 rounded-md ${
                isActive ? "bg-[#1E318A] text-white" : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <GoHome size={20} />
            Home
          </NavLink>
          <NavLink
            to="/doctor/patient"
            className={({ isActive }) =>
              `flex gap-3 px-4 py-2 rounded-md ${
                isActive ? "bg-[#1E318A] text-white" : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <User size={20} />
            Patients
          </NavLink>
          <NavLink
            to="/doctor/appointment"
            className={({ isActive }) =>
              `flex gap-3 px-4 py-2 rounded-md ${
                isActive ? "bg-[#1E318A] text-white" : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <FaRegCalendarCheck size={20} />
            Appointment
          </NavLink>
          <NavLink
            to="/doctor/profile"
            className={({ isActive }) =>
              `flex gap-3 px-4 py-2 rounded-md ${
                isActive ? "bg-[#1E318A] text-white" : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <CiSettings size={20} />
            Profile
          </NavLink>

          
        </nav>

        {/* Settings + Logout */}
        <div className="px-4 py-6 ">
          {/* <NavLink to="/patientboard/settings" className="flex gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
            <CiSettings size={20} />
            Settings
          </NavLink> */}
          <button className="flex gap-3 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
            <LuLogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="h-16   flex items-center justify-between px-6">
          <input
            type="text"
            placeholder="Search Diagnosis, Appointments, etc"
            className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A]"
          />
          <div className="flex items-center gap-4">
            <div ><IoIosNotificationsOutline size={20}/></div>
            
            <div ><CgProfile size={20} /></div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
