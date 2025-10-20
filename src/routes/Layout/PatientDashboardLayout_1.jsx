import { Outlet, NavLink, useNavigate } from "react-router-dom";
import medLogo from "../../assets/public/auth-logo.png";
import logoWrite from "../../assets/public/logo-writeup.png";
import { CgProfile } from "react-icons/cg";
import { IoIosNotificationsOutline } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { FaRegCalendarCheck } from "react-icons/fa";
import { LuClipboardList } from "react-icons/lu";
import { BsPrescription } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { LuLogOut } from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";
import { clearPatientData } from "../../global/PatientSlice";

export default function PatientDashboardLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const patient = useSelector((state) => state.patient.patientData.entity);

  const desktopLinkClass = (isActive) =>
    `flex gap-3 px-4 py-2 rounded-md justify-start group ${isActive ? "bg-[#1E318A] text-white" : "text-gray-700 hover:bg-gray-100"
    }`;

  const mobileLinkClass = (isActive) =>
    `flex flex-col items-center justify-center p-2 pt-3 w-full h-full text-center text-xs transition-colors ${isActive
      ? "text-[#1E318A] border-t-2 border-[#1E318A]"
      : "text-gray-500 hover:text-[#1E318A]"
    }`;

  const handleLogout = () => {
    dispatch(clearPatientData());
    navigate("/auth/patient-login");
  };

  const displayName =
    patient?.full_name ||
    patient?.user?.full_name ||
    patient?.user?.email ||
    "Patient";

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="shadow-sm flex-col hidden md:hidden lg:flex lg:w-64 transition-all duration-300 bg-white">
        <div className="flex items-center gap-2 p-4 justify-start">
          <img src={medLogo} alt="Logo" className="h-10 w-10" />
          <img src={logoWrite} alt="MediSync" className="h-8" />
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 text-sm font-medium">
          <NavLink to="/patientboard" end className={({ isActive }) => desktopLinkClass(isActive)}>
            <GoHome size={20} /> Dashboard
          </NavLink>
          <NavLink to="/patientboard/appointments" className={({ isActive }) => desktopLinkClass(isActive)}>
            <FaRegCalendarCheck size={20} /> Appointments
          </NavLink>
          <NavLink to="/patientboard/results" className={({ isActive }) => desktopLinkClass(isActive)}>
            <LuClipboardList size={20} /> My Results
          </NavLink>
          <NavLink to="/patientboard/prescriptions" className={({ isActive }) => desktopLinkClass(isActive)}>
            <BsPrescription size={20} /> Prescriptions
          </NavLink>
        </nav>

        <div className="px-4 py-6 border-t border-gray-100">
          <NavLink to="/patientboard/settings" className={desktopLinkClass(false)}>
            <CiSettings size={20} /> Settings
          </NavLink>
          <button
            onClick={handleLogout}
            className="flex gap-3 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            <LuLogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-x-hidden pb-16 lg:pb-0">
        <header className="h-16 hidden sm:flex items-center justify-between px-4 sm:px-6 shadow-sm bg-white">
          <input
            type="text"
            placeholder="Search Diagnosis, Appointments, etc"
            className="w-full lg:w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A]"
          />

          <div className="flex items-center gap-4 ml-auto">
            <IoIosNotificationsOutline size={24} className="text-gray-600 hover:text-gray-800" />

            <div className="flex items-center gap-2">
              <CgProfile size={24} className="text-gray-600 hover:text-gray-800" />
              <span className="text-sm font-medium text-gray-700">
                {displayName}
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      <nav className="fixed bottom-0 left-0 w-full h-16 bg-white border-t border-gray-200 flex justify-around items-center z-40 lg:hidden">
        <NavLink to="/patientboard" end className={({ isActive }) => mobileLinkClass(isActive)}>
          <GoHome size={24} />
        </NavLink>
        <NavLink to="/patientboard/appointments" className={({ isActive }) => mobileLinkClass(isActive)}>
          <FaRegCalendarCheck size={24} />
        </NavLink>
        <NavLink to="/patientboard/results" className={({ isActive }) => mobileLinkClass(isActive)}>
          <LuClipboardList size={24} />
        </NavLink>
        <NavLink to="/patientboard/prescriptions" className={({ isActive }) => mobileLinkClass(isActive)}>
          <BsPrescription size={24} />
        </NavLink>
        <NavLink to="/patientboard/settings" className={({ isActive }) => mobileLinkClass(isActive)}>
          <CiSettings size={24} />
        </NavLink>
      </nav>
    </div>
  );
}
