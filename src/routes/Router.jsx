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
import  Patient  from "../patient/Patient";
import PatientMoreInfo from "../patient/MoreInfo";
import PatientDashboardLayout from "./Layout/PatientDashboardLayout";
import Settings from "../patientpages/Settings";
import DoctorHome from "../doctor/Home";
import DoctorPatients from "../doctor/DoctorPatients";
import DoctorAppointment from "../doctor/DoctorAppointments";
import DoctorProfile from "../doctor/MyProfile";
import DoctorDashboardLayout from "./Layout/DoctorDashboard";


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
         { path: "prescriptions", element: <PatientPrescriptions /> },
         { path: "settings", element: <Settings /> },
         
         
      ],
   },

   {
      path: "/doctor",
      element: <DoctorDashboardLayout />,
      children: [
         
         { index: true, element: < DoctorHome/> },
         { path: "patient", element: < DoctorPatients/> },
         { path: "appointment", element: <DoctorAppointment /> },
         { path: "profile", element: < DoctorProfile/> },
         
         
         
      ],
   },

]);