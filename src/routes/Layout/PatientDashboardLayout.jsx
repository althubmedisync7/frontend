// src/routes/Layout/PatientDashboardLayout.jsx
import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import medLogo from "../../assets/public/auth-logo.png";
import logoWrite from "../../assets/public/logo-writeup.png";
import { IoSearchOutline } from "react-icons/io5";

import { Upcomings as initialUpcomings } from "../../data/UpcomingAppointment";

import {
  IoHomeOutline,
  IoHome,
  IoDocumentTextOutline,
  IoDocumentText,
  IoPersonOutline,
  IoPerson,
  IoSettingsOutline,
  IoSettings,
} from "react-icons/io5";

const tabs = [
  {
    id: "home",
    path: "/patientboard",
    label: "Home",
    filled: <IoHome size={22} />,
    outline: <IoHomeOutline size={22} />,
  },
  {
    id: "appointments",
    path: "/patientboard/appointments",
    label: "Appointments",
    filled: <IoDocumentText size={22} />,
    outline: <IoDocumentTextOutline size={22} />,
  },
  {
    id: "results",
    path: "/patientboard/results",
    label: "Results",
    filled: <IoDocumentText size={22} />,
    outline: <IoDocumentTextOutline size={22} />,
  },
  {
    id: "prescription",
    path: "/patientboard/prescriptions",
    label: "Precription",
    filled: <IoPerson size={22} />,
    outline: <IoPersonOutline size={22} />,
  },
  {
    id: "settings",
    path: "/patientboard/settings",
    label: "Settings",
    filled: <IoSettings size={22} />,
    outline: <IoSettingsOutline size={22} />,
  },
];

export default function PatientDashboardLayout() {
  const [upcomingAppointments, setUpcomingAppointments] =
    useState(initialUpcomings);

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-white">
      {/* Desktop Sidebar (hidden on mobile) */}
      <aside className="hidden lg:flex flex-col w-64 bg-white shadow-sm">
        <div className="flex items-center gap-2 p-4 border-b">
          <img src={medLogo} alt="Logo" className="h-10 w-10" />
          <img src={logoWrite} alt="MediSync" className="h-8" />
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2 text-sm font-medium">
          <NavLink
            to="/patientboard"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md ${
                isActive
                  ? "bg-[#1E318A] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/patientboard/appointments"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md ${
                isActive
                  ? "bg-[#1E318A] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            Appointments
          </NavLink>
          <NavLink
            to="/patientboard/results"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md ${
                isActive
                  ? "bg-[#1E318A] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            My Results
          </NavLink>
          <NavLink
            to="/patientboard/prescriptions"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md ${
                isActive
                  ? "bg-[#1E318A] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            Prescriptions
          </NavLink>
        </nav>
        <div className="px-4 py-6 border-t">
          <NavLink
            to="/patientboard/settings"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Settings
          </NavLink>
          <button className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded-md">
            Logout
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col mt-[9px] overflow-y-auto">
        {/* Top bar (hidden on mobile) */}
        <header className="hidden fixed w-[70rem] h-16 bg-white border-b lg:flex items-center justify-between px-6">
          <div className="relative w-1/2">
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Diagnosis, Appointments, etc"
              className="w-full pl-10 pr-4 py-4  border rounded-4xl focus:outline-none focus:ring-1 focus:ring-[#1E318A]"
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-600">Hello, Rebecca</span>
            <div className="h-8 w-8 rounded-full bg-gray-300"></div>
          </div>
        </header>

        {/* This is the single Outlet for all child routes */}
        <main className="flex-1 p-6">
          <Outlet context={{ upcomingAppointments, setUpcomingAppointments }} />
        </main>
      </div>

      {/* Mobile Navigation (hidden on desktop) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md lg:hidden">
        <ul className="flex justify-around items-center py-2">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <NavLink
                to={tab.path}
                className={({ isActive }) =>
                  `flex flex-col items-center px-4 py-1 rounded-2xl transition cursor-pointer ${
                    isActive
                      ? "bg-[#1E318A] text-white"
                      : "text-gray-500 hover:text-blue-600"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive ? tab.filled : tab.outline}
                    <span className="text-xs mt-1">{tab.label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
