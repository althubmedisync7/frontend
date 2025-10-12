import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Share, Stethoscope, Calendar, Phone, Droplet, User, Heart, Thermometer, BriefcaseMedical, CheckCircle, AlertTriangle } from 'lucide-react';

const tabs = [
   'Overview',
   'Medication History',
   'Active Prescriptions',
   'Allergies',
   'Doctors Notes', // Added functionality
   'Pharmacist Notes', // Added functionality
   'Consent Log', // Added functionality
];

// --- Data Stubs (Defined above: doctorsNotesData, pharmacistNotesData, consentLogData) ---
const doctorsNotesData = [
   { date: '15th/09/25', doctor: 'Dr Jane Uloka', note: 'Patient presented with mild fever and headache, prescribed simple analgesics. Advised to return if symptoms persist beyond 48 hours. No immediate concerns regarding chronic conditions.' },
   { date: '21st/08/25', doctor: 'Dr Martins Joy', note: 'Routine check-up. Blood pressure remains stable on current medication (Losartan 50mg). Emphasized compliance and schedule follow-up in 3 months.' },
   { date: '03rd/03/24', doctor: 'Dr Laura Anderson', note: 'Referred patient to a dermatologist for a chronic skin rash, possibly allergic reaction to environmental factors. Advised temporary cessation of Sulfa drugs.' },
];
const pharmacistNotesData = [
   { date: '10th/09/25', pharmacist: 'Ayomide Olamide', note: 'Counseled patient on the importance of completing the full course of Omeprazole therapy as prescribed. Confirmed understanding of the twice-daily dosage schedule.' },
   { date: '25th/08/25', pharmacist: 'Grace Adams', note: 'Dispensed Ampiclox. Patient reported difficulty swallowing large tablets; provided a liquid formulation option for the first 3 days to improve adherence.' },
];
const consentLogData = [
   { date: '01st/01/25', type: 'General Treatment Consent', status: 'Signed (Active)', reviewer: 'Admin Staff - Mercy', details: 'Full consent granted for treatment and prescription dispensing.' },
   { date: '12th/11/23', type: 'Data Sharing Consent (Research)', status: 'Refused', reviewer: 'Dr Martins Joy', details: 'Patient declined data sharing for research purposes.' },
];
const allergiesData = [
   { allergen: 'Penicillin', reaction: 'Hives, swelling of the throat', severity: 'Severe', status: 'Verified' },
   { allergen: 'Sulfa Drugs', reaction: 'Skin rash', severity: 'Moderate', status: 'Verified' },
   { allergen: 'Peanuts', reaction: 'Mild itching', severity: 'Low', status: 'Unverified' },
];
const activePrescriptionsData = [
   { date: '5th/09/25', drug: 'Omeprazole 20mg', dosage: '20mg', frequency: '3x Daily for 3 days', refills: 3, doctor: 'Dr Martina Joy' },
   { date: '5th/09/25', drug: 'Paracetamol 500mg', dosage: '500mg', frequency: 'Once daily for 5 days', refills: 2, doctor: 'Dr Evans Hope' },
];
const medicationHistoryData = [
   { date: '5th/08/25', medications: 'Omeprazole 20mg', frequency: '3x Daily for 3 days', dispensedBy: 'Dr Ayomide Olamide', doctor: 'Dr Martina Joy' },
   { date: '10th/08/25', medications: 'Paracetamol 500mg', frequency: '2x Daily for 3 days', dispensedBy: 'Dr Grace Adams', doctor: 'Dr Evans Hope' },
];
// --- End Data Stubs ---


// --- Utility Components (NotesSection, ConsentLogTable, etc. defined above for brevity) ---
const NotesSection = ({ data, title, authorLabel }) => {
   return (
      <div className="space-y-4">
         {data.map((note, index) => (
            <div key={index} className="bg-gray-50 p-4 border border-gray-200 rounded-lg shadow-sm">
               <div className="flex justify-between items-center border-b pb-2 mb-2">
                  <p className="text-xs text-gray-500 font-medium">{note.date}</p>
                  <p className="text-sm font-semibold text-indigo-600">{authorLabel}: {note[authorLabel.toLowerCase().split(' ')[0]]}</p>
               </div>
               <p className="text-sm text-gray-700 whitespace-pre-wrap">{note.note}</p>
            </div>
         ))}
         {data.length === 0 && (
            <div className="p-6 text-center text-gray-500 border rounded-lg bg-white">
               No **{title}** found for this patient.
            </div>
         )}
      </div>
   );
};
const ConsentLogTable = ({ data }) => {
   const columns = [
      { header: 'Date', width: 'w-[15%]' },
      { header: 'Consent Type', width: 'w-[30%]' },
      { header: 'Status', width: 'w-[15%]' },
      { header: 'Reviewed By', width: 'w-[20%]' },
      { header: 'Details', width: 'w-[20%]' },
   ];

   return (
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
         <table className="min-w-full divide-y divide-gray-200 table-fixed">
            <thead className="bg-gray-50">
               <tr>
                  {columns.map((col, index) => (
                     <th
                        key={index}
                        className={`px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider ${col.width}`}
                     >
                        {col.header}
                     </th>
                  ))}
               </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
               {data.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                     <td className="px-4 py-3 text-sm text-gray-600">{item.date}</td>
                     <td className="px-4 py-3 text-sm font-medium text-gray-800">{item.type}</td>
                     <td className={`px-4 py-3 text-sm font-semibold ${item.status === 'Signed (Active)' ? 'text-green-600' : 'text-red-600'}`}>{item.status}</td>
                     <td className="px-4 py-3 text-sm text-gray-600">{item.reviewer}</td>
                     <td className="px-4 py-3 text-sm text-gray-600">{item.details}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};
const AllergiesTable = ({ data }) => {
   // ... (AllergiesTable component structure remains the same)
   const columns = [
      { header: 'Allergen', width: 'w-[25%]' },
      { header: 'Reaction', width: 'w-[40%]' },
      { header: 'Severity', width: 'w-[15%]' },
      { header: 'Status', width: 'w-[20%]', align: 'text-center' },
   ];

   const getSeverityPill = (severity) => {
      let colorClass = 'bg-gray-100 text-gray-700';
      if (severity === 'Severe') {
         colorClass = 'bg-red-100 text-red-700';
      } else if (severity === 'Moderate') {
         colorClass = 'bg-yellow-100 text-yellow-700';
      }
      return <span className={`px-3 py-1 text-xs font-medium rounded-full ${colorClass}`}>{severity}</span>;
   };

   return (
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
         <div className="flex justify-between items-center bg-gray-50 p-4 border-b">
            <p className="text-sm font-semibold text-gray-700 flex items-center">
               <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
               Patient Allergy List
            </p>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
               + Add New Allergy
            </button>
         </div>
         <table className="min-w-full divide-y divide-gray-200 table-fixed">
            <thead className="bg-gray-50">
               <tr>
                  {columns.map((col, index) => (
                     <th
                        key={index}
                        className={`px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider ${col.width} ${col.align || ''}`}
                     >
                        {col.header}
                     </th>
                  ))}
               </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
               {data.map((item, index) => (
                  <tr key={index} className="hover:bg-indigo-50/20 transition-colors">
                     <td className="px-4 py-3 text-sm font-medium text-red-600">{item.allergen}</td>
                     <td className="px-4 py-3 text-sm text-gray-700">{item.reaction}</td>
                     <td className="px-4 py-3 text-sm">
                        {getSeverityPill(item.severity)}
                     </td>
                     <td className="px-4 py-3 text-center text-sm text-gray-600">{item.status}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};
const ActivePrescriptionsTable = ({ data }) => {
   // Component is reused in renderContent
   const handleDispense = (drugName) => {
      alert(`Dispensing ${drugName} now!`);
   };
   const columns = [
      { header: 'Date and Time', width: 'w-[15%]' },
      { header: 'Drug Name', width: 'w-[20%]' },
      { header: 'Dosage', width: 'w-[10%]' },
      { header: 'Frequency', width: 'w-[15%]' },
      { header: 'Refills Remaining', width: 'w-[10%]' },
      { header: 'Prescribing Doctor', width: 'w-[20%]' },
      { header: 'Action', width: 'w-[10%]', align: 'text-center' },
   ];

   return (
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
         <table className="min-w-full divide-y divide-gray-200 table-fixed">
            <thead className="bg-gray-50">
               <tr>
                  {columns.map((col, index) => (
                     <th
                        key={index}
                        className={`px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider ${col.width} ${col.align || ''}`}
                     >
                        {col.header}
                     </th>
                  ))}
               </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
               {data.map((item, index) => (
                  <tr key={index} className="hover:bg-indigo-50/20 transition-colors">
                     <td className="px-4 py-3 text-sm text-gray-600">{item.date}</td>
                     <td className="px-4 py-3 text-sm font-medium text-gray-800">{item.drug}</td>
                     <td className="px-4 py-3 text-sm text-gray-600">{item.dosage}</td>
                     <td className="px-4 py-3 text-sm text-gray-600">{item.frequency}</td>
                     <td className="px-4 py-3 text-sm text-gray-800 font-medium">{item.refills}</td>
                     <td className="px-4 py-3 text-sm text-gray-600">{item.doctor}</td>
                     <td className="px-4 py-3 text-center">
                        <button
                           onClick={() => handleDispense(item.drug)}
                           className="bg-indigo-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm whitespace-nowrap"
                        >
                           Dispense Now
                        </button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};
const MedicationHistoryTable = ({ data }) => {
   // ... (MedicationHistoryTable component structure remains the same)
   const columns = [
      { header: 'Date and Time', width: 'w-[15%]' },
      { header: 'Medications Dispensed', width: 'w-[25%]' },
      { header: 'Frequency', width: 'w-[15%]' },
      { header: 'Dispensed By', width: 'w-[25%]' },
      { header: 'Prescribing Doctor', width: 'w-[20%]' },
   ];

   return (
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
         <table className="min-w-full divide-y divide-gray-200 table-fixed">
            <thead className="bg-gray-50">
               <tr>
                  {columns.map((col, index) => (
                     <th
                        key={index}
                        className={`px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider ${col.width}`}
                     >
                        {col.header}
                     </th>
                  ))}
               </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
               {data.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                     <td className="px-4 py-3 text-sm text-gray-600">{item.date}</td>
                     <td className="px-4 py-3 text-sm font-medium text-gray-800">{item.medications}</td>
                     <td className="px-4 py-3 text-sm text-gray-600">{item.frequency}</td>
                     <td className="px-4 py-3 text-sm text-gray-600">{item.dispensedBy}</td>
                     <td className="px-4 py-3 text-sm text-gray-600">{item.doctor}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};
const DefaultTabContent = ({ tabName }) => (
   <div className="p-6 bg-gray-50 border rounded-lg">
      <p className="text-gray-600">Content for **{tabName}** will be developed soon.</p>
   </div>
);
// --- End Utility Components ---


const PatientDetail = () => {
   const location = useLocation();
   const passedPatientData = location.state?.patient;
   const [activeTab, setActiveTab] = useState('Doctors Notes'); // Setting default to show new content

   const defaultPatient = {
      name: 'Patient Not Found', age: '--', gender: '--', id: 'N/A',
      consentStatus: 'N/A', avatar: 'https://i.pravatar.cc/150?img=50',
      dob: '-', phone: '-', bloodGroup: '-', genotype: '-', primaryDoctor: '-'
   };

   const patient = passedPatientData || defaultPatient;

   const overviewDetails = [
      { label: 'Primary Doctor', value: patient.primaryDoctor || 'Dr Jane Uloka', icon: Stethoscope, isBlue: true },
      { label: 'Date of Birth', value: patient.dob || 'N/A', icon: Calendar },
      { label: 'Phone Number', value: patient.phone || 'N/A', icon: Phone },
      { label: 'Blood Group', value: patient.bloodGroup || 'N/A', icon: Droplet },
      { label: 'Genotype', value: patient.genotype || 'N/A', icon: User },
      { label: 'Height/Weight', value: '-', icon: BriefcaseMedical },
      { label: 'Blood Pressure', value: '-', icon: BriefcaseMedical },
      { label: 'Heart Rate', value: '-', icon: Heart },
      { label: 'Temperature', value: '-', icon: Thermometer },
   ];

   // Function to render content based on the active tab
   const renderContent = () => {
      switch (activeTab) {
         case 'Overview':
            return (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6">
                  {overviewDetails.map((item, index) => (
                     <div key={index} className="flex items-start space-x-3 text-sm">
                        <item.icon
                           className={`w-5 h-5 mt-1 ${item.isBlue ? 'text-blue-500' : 'text-gray-500'}`}
                        />
                        <div className="leading-relaxed">
                           <p className="text-gray-700 font-medium">{item.label}:</p>
                           <p
                              className={`text-gray-900 ${item.isBlue ? 'font-semibold text-blue-700' : ''}`}
                           >
                              {item.value}
                           </p>
                        </div>
                     </div>
                  ))}
               </div>
            );
         case 'Medication History':
            return <MedicationHistoryTable data={medicationHistoryData} />;

         case 'Active Prescriptions':
            return <ActivePrescriptionsTable data={activePrescriptionsData} />;

         case 'Allergies':
            return <AllergiesTable data={allergiesData} />;

         case 'Doctors Notes':
            // RENDER DOCTORS NOTES HERE
            return <NotesSection data={doctorsNotesData} title="Doctors Notes" authorLabel="Doctor" />;

         case 'Pharmacist Notes':
            // RENDER PHARMACIST NOTES HERE
            return <NotesSection data={pharmacistNotesData} title="Pharmacist Notes" authorLabel="Pharmacist" />;

         case 'Consent Log':
            // RENDER CONSENT LOG HERE
            return <ConsentLogTable data={consentLogData} />;

         default:
            return <DefaultTabContent tabName={activeTab} />;
      }
   };


   return (
      <div className="bg-gray-50 min-h-full">
         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">

            {/* --- Top Header and Share Button --- */}
            <header className="flex justify-between items-start mb-6 border-b border-gray-200 pb-4">
               <h1 className="text-3xl font-bold text-gray-900">Patient Detail</h1>
               <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm text-sm font-medium">
                  <Share className="w-4 h-4 mr-2" />
                  Share
               </button>
            </header>

            {/* --- Patient Summary Block (Uses dynamic data) --- */}
            <div className="flex items-start space-x-6">
               <img
                  className="h-24 w-24 rounded-full object-cover shadow-md flex-shrink-0"
                  src={patient.avatar}
                  alt={patient.name}
               />

               <div>
                  <h2 className="text-2xl font-bold text-gray-900">{patient.name}</h2>
                  <p className="text-gray-600">{patient.age} years</p>
                  <p className="text-gray-600">{patient.gender}</p>
                  <p className="text-gray-600">ID: {patient.id}</p>
                  <div className="mt-1 flex items-center text-sm">
                     <span className="text-gray-600 mr-2">Consent Status:</span>
                     <span className="flex items-center text-green-700 font-semibold">
                        {patient.consentStatus} {patient.consentStatus === 'Active' && <CheckCircle className="w-4 h-4 ml-1" />}
                     </span>
                  </div>
               </div>
            </div>

            {/* --- Navigation Tabs (Functional) --- */}
            <nav className="mt-8 border-b border-gray-200">
               <div className="flex space-x-4 overflow-x-auto pb-1">
                  {tabs.map((tabName) => (
                     <button
                        key={tabName}
                        onClick={() => setActiveTab(tabName)}
                        className={`whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors ${activeTab === tabName
                           ? 'border-b-2 border-indigo-600 text-indigo-600 font-semibold'
                           : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                           }`}
                     >
                        {tabName}
                     </button>
                  ))}
               </div>
            </nav>

            {/* --- Dynamic Content Area --- */}
            <div className="pt-6">
               {renderContent()}
            </div>

         </div>
      </div>
   );
};

export default PatientDetail;