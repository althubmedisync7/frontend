// src/routes/Layout/PatientDashboardLayout.jsx
import { Outlet, NavLink } from "react-router-dom";
import medLogo from "../../assets/public/auth-logo.png"; 
import logoWrite from "../../assets/public/logo-writeup.png";

export default function PatientDashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white  shadow-sm flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-2 p-4 border-b">
          <img src={medLogo} alt="Logo" className="h-10 w-10" />
          <img src={logoWrite} alt="MediSync" className="h-8" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 text-sm font-medium">
          <NavLink
            to="/patientboard"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md ${
                isActive ? "bg-[#1E318A] text-white" : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/patientboard/appointments"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md ${
                isActive ? "bg-[#1E318A] text-white" : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            Appointments
          </NavLink>
          <NavLink
            to="/patientboard/results"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md ${
                isActive ? "bg-[#1E318A] text-white" : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            My Results
          </NavLink>
          <NavLink
            to="/patientboard/prescriptions"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md ${
                isActive ? "bg-[#1E318A] text-white" : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            Prescriptions
          </NavLink>
        </nav>

        {/* Settings + Logout */}
        <div className="px-4 py-6 border-t">
          <NavLink to="/patientboard/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
            Settings
          </NavLink>
          <button className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded-md">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">
          <input
            type="text"
            placeholder="Search Diagnosis, Appointments, etc"
            className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A]"
          />
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Hello, Rebecca</span>
            <div className="h-8 w-8 rounded-full bg-gray-300"></div>
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
