import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import OnboardingPage from "../auth/OnboardingPage";
import SplashScreen from "../auth/SplashScreen";
import OnboardingLayout from "./Layout/OnboardingLayout";
import DoctorSignup from "../auth/DoctorSignup";
import DoctorLogin from "../auth/DoctorLogin";
import PatientSignup from "../auth/PatientSignup";
import PatientLogin from "../auth/PatientLogin";
import AdminSignup from "../auth/AdminSignup";
import AdminLogin from "../auth/AdminLogin";
import LabTechSignup from "../auth/LabTechSignup";
import LabTechLogin from "../auth/LabTechLogin";
import PharmacistSignup from "../auth/PharmacistSignup";
import PharmacistLogin from "../auth/PharmacistLogin";
import PatientLayout from "./Layout/PatientLayout";
import PatientDashboard from "../patientpages/Dashboard";
import PatientAppointments from "../patientpages/Appointment";
import PatientResults from "../patientpages/Result";
import PatientPrescriptions from "../patientpages/Prescribtion";
import Patient from "../patient/Patient";
import PatientMoreInfo from "../patient/MoreInfo";
import PatientDashboardLayout from "./Layout/PatientDashboardLayout";
import Settings from "../patientpages/Settings";
import DoctorLayout from "./Layout/DoctorLayout";
import DoctorHome from "../pages/doctorPages/DoctorHome";
import PatientReport from "../pages/doctorPages/PatientReport";
import DoctorAppointment from "../pages/doctorPages/DoctorAppointment";
import DoctorProfile from "../pages/doctorPages/DoctorProfile";
import AdminHome from "../pages/admin/AdminHome";
import AdminLayout from "./Layout/AdminLayout";
import PatientData from "../pages/admin/PatientData";
// Corrected component name to PatientAppointment
import PatientAppointment from "../pages/admin/PatientAppoint";
import Staff from "../pages/admin/Staff";
// Corrected import name: PhamarcyLayout -> PharmacyLayout
import PharmacyLayout from "./Layout/PhamarcyLayout";
import PharmacyHome from "../pages/pharmacy/PharmacyHome";
import DispensingLog from "../pages/pharmacy/DispensingLog";
import PatientOverview from "../pages/pharmacy/PatientOverview";
import PatientDetail from "../pages/pharmacy/PatientDetail";
import Prescriptions from "../pages/pharmacy/Prescriptions";
import ResultDetailPage from '../patientpages/ResultDetailPage';


export const Element = createBrowserRouter([
   {
      path: "/",
      element: <SplashScreen />,
   },
   {
      path: "/auth",
      element: <OnboardingLayout />,
      children: [
         {
            index: true,
            element: <OnboardingPage />,
         },
         {
            path: "doctor-signup",
            element: <DoctorSignup />,
         },
         {
            path: "doctor-login",
            element: <DoctorLogin />,
         },
         {
            path: "patient-signup",
            element: <PatientSignup />,
         },
         {
            path: "patient-login",
            element: <PatientLogin />,
         },
         {
            path: "admin-signup",
            element: <AdminSignup />,
         },
         {
            path: "admin-login",
            element: <AdminLogin />,
         },
         {
            path: "labtech-signup",
            element: <LabTechSignup />,
         },
         {
            path: "labtech-login",
            element: <LabTechLogin />,
         },
         {
            path: "pharmacist-signup",
            element: <PharmacistSignup />,
         },
         {
            path: "pharmacist-login",
            element: <PharmacistLogin />,
         },
      ],
   },
   {
      path: "/admin",
      element: <AdminLayout />,
      children: [
         {
            index: true,
            element: <AdminHome />
         },
         {
            path: "patient-data",
            element: <PatientData />
         },
         {
            path: "patient-appointment",
            element: <PatientAppointment />
         },
         {
            path: "staff",
            element: <Staff />
         }
      ]
   },
   {
      path: "/doctor-board",
      element: <DoctorLayout />,
      children: [
         {
            index: true,
            element: <DoctorHome />
         },
         {
            path: "patient-report",
            element: <PatientReport />
         },
         {
            path: "doctor-appointment",
            element: <DoctorAppointment />
         },
         {
            path: "doctor-profile",
            element: <DoctorProfile />
         }
      ]
   },
   {
      path: "/pharmacy",
      element: <PharmacyLayout />,
      children: [
         {
            index: true,
            element: <PharmacyHome />
         },
         {
            path: "dispensing-log",
            element: <DispensingLog />
         },
         {
            path: "patients-overview",
            element: <PatientOverview />
         },
         {
            path: "patients-details/:patientId",
            element: <PatientDetail />
         },
         {
            path: "prescriptions",
            element: <Prescriptions />
         },
      ]
   },
   {
      path: "/patient",
      element: <PatientLayout />,
      children: [
         { index: true, element: <Patient /> },
         { path: "moreInfo", element: <PatientMoreInfo /> },
      ],
   },
   {
      path: "/patientboard",
      element: <PatientDashboardLayout />,
      children: [

         { index: true, element: <PatientDashboard /> },
         { path: "appointments", element: <PatientAppointments /> },
         { path: "results", element: <PatientResults /> },
         { path: "results/:resultId", element: <ResultDetailPage /> },
         { path: "prescriptions", element: <PatientPrescriptions /> },
         { path: "settings", element: <Settings /> },
      ],
   },
]);
