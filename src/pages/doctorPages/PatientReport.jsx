import React, { useState, useEffect } from 'react';

const primaryBlue = 'text-[#233CAF]';
const primaryDarkBlue = 'bg-[#233CAF]';
const statusActive = 'bg-green-100 text-green-700';
const statusInactive = 'bg-red-100 text-red-700';
const statusSevere = 'bg-red-500 text-white';
const statusModerate = 'bg-orange-100 text-orange-700';
const labStatusNormal = 'bg-green-100 text-green-700';
const labStatusAbnormal = 'bg-red-100 text-red-700';
const labStatusElevated = 'bg-red-100 text-red-700';



const IconSearch = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const IconFilter = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>;
const IconDownload = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>;
const IconPlus = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const IconLoader = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v2M22 6.5h-2M21.5 10v2M18 14.5l-1.5 1.5M14.5 18h-2M10 21.5v-2M6.5 22h-2M2 21.5v-2M3.5 14.5l1.5-1.5M2 10V8M2.5 6.5h2M2 3.5v2M6.5 2.5h2M10 2v2M14 2.5h2M17.5 3.5l-1.5 1.5M19 8l-1.5 1.5M16 12h-2M10 14h2M14 16h-2M10 18h2M6 17.5L7.5 16M4 14.5l1.5-1.5M4 10h-2M4.5 6.5h2M7 4.5l-1.5 1.5M10 4h2M14 2.5h2"></path></svg>;
const IconHeart = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>;
const IconThermometer = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v10"></path><path d="M10 5h4"></path><path d="M12 10a4 4 0 0 0 0 8v-1a2 2 0 0 1 0-4v-1"></path><path d="M12 22a4 4 0 0 0 4-4H8a4 4 0 0 0 4 4z"></path></svg>;
const IconScale = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 16.5V21H8V16.5"></path><path d="M16 16.5H8"></path><path d="M16 16.5V10H8V16.5"></path><path d="M18 3H6C4.9 3 4 3.9 4 5V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V5C20 3.9 19.1 3 18 3Z"></path></svg>;
const IconRuler = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8l-5-5z"></path><path d="M16 3v5h5"></path><path d="M12 17v-4h4"></path></svg>;
const IconGauge = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 14v4"></path><path d="M14 12v2"></path><path d="M16 10v2"></path><path d="M18 8v2"></path><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"></path><path d="M14.828 9.172l1.414-1.414"></path><path d="M9.172 9.172l-1.414-1.414"></path></svg>;
const IconClipboard = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="M15 2H9a1 1 0 0 0-1 1v1h8V3a1 1 0 0 0-1-1z"></path></svg>;
const IconCalendar = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;



const mockPatients = [
   {
      id: '#0001', initials: 'TE', name: 'ThankGod Etim', firstName: 'ThankGod', lastName: 'Etim', age: 30, gender: 'Male', dob: '12/08/1995',
      address: 'Close 2b, Lekki Estate, Isheri Olofin, Lagos.',
      contact: { phone: '+234 904 5780 340', email: 'etim@gmail.com' },
      emergencyContact: { name: 'Vanessa Etim', phone: '+234 804 9566 366', relation: 'Spouse', address: 'Same as patient' },
      insurance: { provider: 'Leadway Health Insurance', policy: 'LWH-1750-873-A' },
      lastVisit: '1/15/2025',
      condition: 'Hypertension',
      status: 'Active',
      nextAppointment: '10/25/2025',
      medicalHistory: {
         currentDiagnoses: [
            { name: 'Essential Hypertension', icd: 'I10', diagnosed: 'December 2024', status: 'Active' },
            { name: 'Type 2 Diabetes Mellitus', icd: 'E11.9', diagnosed: 'November 2024', status: 'Active' },
         ],
         pastMedicalHistory: [
            { name: 'Appendectomy', date: 'March 2020', complications: 'None', status: 'Resolved' },
            { name: 'Seasonal Allergies', date: 'Ongoing since childhood', complications: 'Well controlled', status: 'Chronic' },
         ],
         familyHistory: [
            { relation: 'Father (Age 65)', conditions: ['Diabetes', 'Hypertension'] },
            { relation: 'Mother (Age 60)', conditions: ['None'] },
            { relation: 'Sibling (Sister, Age 33)', conditions: ['No known conditions'] },
            { relation: 'Sibling (Brother, Age 25)', conditions: ['Anxiety'] },
         ]
      },
      medications: {
         currentPrescriptions: [
            { name: 'Lisinopril 10mg', dosage: 'Once daily', prescribed: '12/15/2024', status: 'Active' },
            { name: 'Metformin 500mg', dosage: 'Twice daily with meals', prescribed: '11/01/2024', status: 'Active' },
         ],
         allergies: [
            { substance: 'Penicillin', reaction: 'Hives, swelling (Severe)', severity: 'Severe' },
            { substance: 'Peanuts', reaction: 'Hives, swelling on the face (Moderate)', severity: 'Moderate' },
            { substance: 'Ibuprofen', reaction: 'Mild stomach upset (Mild)', severity: 'Mild' },
         ]
      },
      vitalSigns: [
         {
            date: '7/15/2025',
            bloodPressure: '120/80 mmHg',
            temperature: '98.6 F',
            pulse: '72 bpm',
            weight: '90 lbs',
            height: '5\'8"',
         },
         {
            date: '7/05/2025',
            bloodPressure: '125/82 mmHg',
            temperature: '98.4 F',
            pulse: '75 bpm',
            weight: '93 lbs',
            height: '5\'8"',
         },
         {
            date: '5/16/2025',
            bloodPressure: '128/85 mmHg',
            temperature: '98.9 F',
            pulse: '78 bpm',
            weight: '95 lbs',
            height: '5\'8"',
         },
      ],
      labResults: [
         {
            testName: 'Complete Blood Count',
            date: '7/15/2025',
            details: 'WBC: 12,900 | RBC: 4.5 | Hgb: 14.2',
            status: 'Normal',
            fullReport: 'The complete blood count test showed normal ranges for white blood cells, red blood cells, and hemoglobin, indicating no acute infection or anemia at this time.',
         },
         {
            testName: 'Lipid Panel',
            date: '7/15/2025',
            details: 'Total Chol: 230, LDL: 165, HDL: 45',
            status: 'Abnormal',
            fullReport: 'Lipid panel results show elevated total cholesterol and LDL (bad cholesterol), indicating dyslipidemia. HDL (good cholesterol) is within acceptable range. Lifestyle and medication adjustments may be required.',
         },
         {
            testName: 'HbA1c',
            date: '6/30/2025',
            details: '7.2%',
            status: 'Elevated',
            fullReport: 'Hemoglobin A1c (HbA1c) measured at 7.2%. This is above the target range for well-controlled diabetes, suggesting the need for tighter glycemic management.',
         },
         {
            testName: 'Comprehensive Metabolic Panel (CMP)',
            date: '5/16/2025',
            details: 'Glucose: 105 mg/dL | Creatinine: 0.9 mg/dL',
            status: 'Normal',
            fullReport: 'CMP results are largely unremarkable. Fasting glucose is slightly elevated but within pre-diabetic range. Kidney and liver function markers are normal.',
         }
      ],
      appointmentHistory: [
         {
            date: '1/15/2025',
            doctor: 'Dr. Adebayo',
            reason: 'Follow-up for blood pressure check and medication review.',
            status: 'Normal',
            notes: 'Blood pressure stable, continue current medications. Patient advised on dietary compliance.',
         },
         {
            date: '12/22/2024',
            doctor: 'Dr. Sofia',
            reason: 'Annual physical exam, referred by a cardiologist.',
            status: 'Elevated',
            notes: 'Patient presented with moderately elevated blood pressure readings. Ordered comprehensive lab work and referred to cardiology for specialist evaluation.',
         },
         {
            date: '1/8/2024',
            doctor: 'Dr. Okorocha',
            reason: 'New Patient consultation, diagnosed with hypertension.',
            status: 'Abnormal',
            notes: 'First visit. Comprehensive intake completed. Diagnosis of Essential Hypertension confirmed. Started on Lisinopril 10mg.',
         },
      ]
   },
   {
      id: '#0002', initials: 'AJ', name: 'Ade Jamiu', firstName: 'Ade', lastName: 'Jamiu', age: 23, gender: 'Male', dob: '05/10/2002',
      address: '15 Ikeja Road, Lagos.',
      contact: { phone: '+234 804 5750 700', email: 'ade@gmail.com' },
      emergencyContact: { name: 'Jamiu Senior', phone: '+234 804 5750 701', relation: 'Father', address: 'Same as patient' },
      insurance: { provider: 'AXA Mansard', policy: 'AXA-2201-901-B' },
      lastVisit: '6/15/2025', condition: 'Asthma', status: 'Active', nextAppointment: '01/10/2026',
      medicalHistory: { currentDiagnoses: [{ name: 'Asthma', status: 'Active' }], pastMedicalHistory: [], familyHistory: [] },
      medications: { currentPrescriptions: [{ name: 'Albuterol Inhaler', dosage: 'PRN', prescribed: '05/10/2002', status: 'Active' }], allergies: [] },
      vitalSigns: [{
         date: '6/15/2025',
         bloodPressure: '110/70 mmHg',
         temperature: '98.0 F',
         pulse: '65 bpm',
         weight: '145 lbs',
         height: '6\'0"',
      }],
      labResults: [{
         testName: 'Allergy Panel',
         date: '6/15/2025',
         details: 'Positive for dust mites, tree pollen.',
         status: 'Abnormal',
         fullReport: 'Confirmed sensitivity to common airborne allergens, consistent with patient’s asthma and seasonal symptoms.',
      }],
      appointmentHistory: [
         {
            date: '6/15/2025',
            doctor: 'Dr. Kalu',
            reason: 'Asthma annual review, refill prescription.',
            status: 'Normal',
            notes: 'Asthma symptoms well controlled with current regime. No recent exacerbations. Refill Albuterol.',
         }
      ]
   },
   { id: '#0003', initials: 'DW', name: 'Divine Wisdom', firstName: 'Divine', lastName: 'Wisdom', age: 25, gender: 'Female', dob: '01/01/2000', address: '45 Marina Street, Lagos Island.', contact: { phone: '+234 904 5780 667', email: 'divine@gmail.com' }, emergencyContact: { name: 'Wisdom Mom', phone: '+234 904 5780 668', relation: 'Mother', address: 'Unknown' }, insurance: { provider: 'Reliance HMO', policy: 'REL-3305-123-C' }, lastVisit: '6/16/2025', condition: 'Check-up', status: 'Inactive', nextAppointment: 'N/A', medicalHistory: { currentDiagnoses: [], pastMedicalHistory: [], familyHistory: [] }, medications: { currentPrescriptions: [], allergies: [] }, vitalSigns: [], labResults: [], appointmentHistory: [] },
   { id: '#0004', initials: 'PK', name: 'Patrick Kojo', age: 36, gender: 'Male', dob: '03/03/1989', firstName: 'Patrick', lastName: 'Kojo', address: '10 Abuja Lane, Lagos', contact: { phone: '+234 804 5750 700', email: 'patrick@gmail.com' }, emergencyContact: { name: 'Kojo Sister', phone: '+234 804 5750 702', relation: 'Sister', address: 'Another address' }, insurance: { provider: 'Hygeia HMO', policy: 'HYG-5502-456-D' }, lastVisit: '7/17/2025', condition: 'Asthma', status: 'Active', nextAppointment: '09/01/2026', medicalHistory: { currentDiagnoses: [], pastMedicalHistory: [], familyHistory: [] }, medications: { currentPrescriptions: [], allergies: [] }, vitalSigns: [], labResults: [], appointmentHistory: [] },
   { id: '#0005', initials: 'DG', name: 'Dolande Grace', age: 23, gender: 'Female', dob: '07/07/2002', firstName: 'Dolande', lastName: 'Grace', address: '7 Calabar Road, Lagos', contact: { phone: '+234 904 5750 728', email: 'dolande@gmail.com' }, emergencyContact: { name: 'Grace Uncle', phone: '+234 904 5750 729', relation: 'Uncle', address: 'Same as patient' }, insurance: { provider: 'AETNA', policy: 'AET-9904-789-E' }, lastVisit: '8/05/2025', condition: 'Migraine', status: 'Active', nextAppointment: 'N/A', medicalHistory: { currentDiagnoses: [], pastMedicalHistory: [], familyHistory: [] }, medications: { currentPrescriptions: [], allergies: [] }, vitalSigns: [], labResults: [], appointmentHistory: [] },
];


const DetailInput = ({ label, value }) => (
   <div className="mb-4">
      <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-800 min-h-[40px]">{value}</div>
   </div>
);

const CurrentStatusPill = ({ condition, status, lastVisit, nextAppointment }) => (
   <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Current Status</h3>
      <p className="text-sm text-gray-500 mb-4">Patient's current medical status</p>

      <div className="space-y-4 text-sm">
         <div className="flex justify-between items-center">
            <span className="text-gray-600">Primary Condition:</span>
            <span className="text-white bg-indigo-500 px-3 py-1 text-xs font-medium rounded-full">{condition}</span>
         </div>
         <div className="flex justify-between items-center">
            <span className="text-gray-600">Patient Status:</span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${status === 'Active' ? statusActive : statusInactive}`}>
               {status}
            </span>
         </div>
         <div className="flex justify-between items-center">
            <span className="text-gray-600">Last Visit:</span>
            <span className="text-gray-800 font-medium">{lastVisit}</span>
         </div>
         <div className="flex justify-between items-center">
            <span className="text-gray-600">Next Appointment:</span>
            <span className="text-gray-800 font-medium">{nextAppointment}</span>
         </div>
      </div>
   </div>
);


const OverviewContent = ({ patient }) => {
   const insuranceProvider = patient.insurance?.provider || 'N/A';
   const insurancePolicy = patient.insurance?.policy || 'N/A';
   const emergencyName = patient.emergencyContact?.name || 'N/A';
   const emergencyRelation = patient.emergencyContact?.relation || 'N/A';
   const emergencyPhone = patient.emergencyContact?.phone || 'N/A';
   const emergencyAddress = patient.emergencyContact?.address || 'N/A';

   return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
         <div className="lg:col-span-2 space-y-6">

            <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
               <h3 className="text-lg font-semibold text-gray-800 mb-1">Personal Information</h3>
               <p className="text-sm text-gray-500 mb-4">Basic patient details and contact information</p>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                  <DetailInput label="First Name" value={patient.firstName || 'N/A'} />
                  <DetailInput label="Last Name" value={patient.lastName || 'N/A'} />
                  <DetailInput label="Age" value={patient.age || 'N/A'} />
                  <DetailInput label="Gender" value={patient.gender || 'N/A'} />
                  <DetailInput label="Phone" value={patient.contact?.phone || 'N/A'} />
                  <DetailInput label="Email" value={patient.contact?.email || 'N/A'} />
               </div>

               <DetailInput label="Date of Birth" value={patient.dob || 'N/A'} />
               <DetailInput label="Address" value={patient.address || 'N/A'} />
            </div>

            <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
               <h3 className="text-lg font-semibold text-gray-800 mb-1">Insurance Information</h3>
               <p className="text-sm text-gray-500 mb-4">Health Insurance and coverage details</p>

               <DetailInput label="Insurance Provider" value={insuranceProvider} />
               <DetailInput label="Policy Number" value={insurancePolicy} />
            </div>
         </div>

         <div className="space-y-6">
            <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
               <h3 className="text-lg font-semibold text-gray-800 mb-1">Emergency Contact</h3>
               <p className="text-sm text-gray-500 mb-4">Primary emergency contact information</p>

               <DetailInput label="Contact Name" value={emergencyName} />
               <DetailInput label="Relationship" value={emergencyRelation} />
               <DetailInput label="Phone Number" value={emergencyPhone} />
               <DetailInput label="Address" value={emergencyAddress} />
            </div>

            <CurrentStatusPill
               condition={patient.condition || 'N/A'}
               status={patient.status || 'N/A'}
               lastVisit={patient.lastVisit || 'N/A'}
               nextAppointment={patient.nextAppointment || 'N/A'}
            />
         </div>
      </div>
   );
};


const DiagnosisItem = ({ name, icd, diagnosed, status }) => (
   <div className="flex justify-between items-start py-4 border-b border-gray-100 last:border-b-0">
      <div className="flex-1 min-w-0 pr-4">
         <p className="text-base font-semibold text-gray-800 truncate">{name}</p>
         <p className="text-sm text-gray-500 mt-1">
            {icd && `ICD-10: ${icd}`}
            {icd && diagnosed && ' | '}
            {diagnosed && `Diagnosed: ${diagnosed}`}
         </p>
      </div>
      <div className="flex-shrink-0">
         <span className={`px-3 py-1 rounded-full text-xs font-medium ${status === 'Active' ? statusActive : statusInactive} ${status === 'Chronic' ? 'bg-red-100 text-red-700' : ''} ${status === 'Resolved' ? 'bg-teal-100 text-teal-700' : ''}`}>
            {status}
         </span>
      </div>
   </div>
);

const HistoryItem = ({ name, date, complications, status }) => (
   <div className="flex justify-between items-start py-4 border-b border-gray-100 last:border-b-0">
      <div className="flex-1 min-w-0 pr-4">
         <p className="text-base font-semibold text-gray-800 truncate">{name}</p>
         <p className="text-sm text-gray-500 mt-1">
            Date: {date} | Complications: {complications}
         </p>
      </div>
      <div className="flex-shrink-0">
         <span className={`px-3 py-1 rounded-full text-xs font-medium ${status === 'Chronic' ? 'bg-red-100 text-red-700' : ''} ${status === 'Resolved' ? 'bg-teal-100 text-teal-700' : ''}`}>
            {status}
         </span>
      </div>
   </div>
);

const FamilyHistoryCard = ({ relation, conditions }) => (
   <div className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-100">
      <p className="text-sm font-semibold text-gray-800 mb-1">{relation}</p>
      <p className="text-xs text-gray-600">
         {conditions.join(', ') || 'No known conditions'}
      </p>
   </div>
);

const MedicalHistoryContent = ({ patient }) => {
   const mh = patient.medicalHistory;

   if (!mh) {
      return <div className="p-6 text-center text-gray-500">Medical history records are currently unavailable for this patient.</div>;
   }

   return (
      <div className="space-y-8 mt-8">
         <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Current Diagnoses</h3>
            <p className="text-sm text-gray-500 mb-4">Active or recently diagnosed medical conditions.</p>
            <div className="divide-y divide-gray-100">
               {mh.currentDiagnoses?.length > 0 ? (
                  mh.currentDiagnoses.map((d, index) => (
                     <DiagnosisItem key={index} {...d} />
                  ))
               ) : (
                  <p className="py-4 text-sm text-gray-500">No current active diagnoses recorded.</p>
               )}
            </div>
         </div>

         <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Past Medical History</h3>
            <p className="text-sm text-gray-500 mb-4">Resolved conditions, surgeries, and chronic but controlled issues.</p>
            <div className="divide-y divide-gray-100">
               {mh.pastMedicalHistory?.length > 0 ? (
                  mh.pastMedicalHistory.map((h, index) => (
                     <HistoryItem key={index} {...h} />
                  ))
               ) : (
                  <p className="py-4 text-sm text-gray-500">No past medical history or surgeries recorded.</p>
               )}
            </div>
         </div>

         <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Family Medical History</h3>
            <p className="text-sm text-gray-500 mb-4">Hereditary conditions affecting close family members.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {mh.familyHistory?.length > 0 ? (
                  mh.familyHistory.map((f, index) => (
                     <FamilyHistoryCard key={index} {...f} />
                  ))
               ) : (
                  <p className="py-4 text-sm text-gray-500 md:col-span-2">No family medical history recorded.</p>
               )}
            </div>
         </div>
      </div>
   );
};


const PrescriptionItem = ({ name, dosage, prescribed, status }) => (
   <div className="flex justify-between items-start py-4 border-b border-gray-100 last:border-b-0">
      <div className="flex-1 min-w-0 pr-4">
         <p className="text-base font-semibold text-gray-800 truncate">{name}</p>
         <p className="text-sm text-gray-500 mt-1">
            Dosage: {dosage} | Prescribed: {prescribed}
         </p>
      </div>
      <div className="flex-shrink-0">
         <span className={`px-3 py-1 rounded-full text-xs font-medium ${status === 'Active' ? statusActive : statusInactive}`}>
            {status}
         </span>
      </div>
   </div>
);

const AllergyItem = ({ substance, reaction, severity }) => {
   let severityClass = statusModerate;
   if (severity === 'Severe') {
      severityClass = statusSevere;
   } else if (severity === 'Mild') {
      severityClass = 'bg-yellow-100 text-yellow-700';
   }

   return (
      <div className="flex justify-between items-start py-4 border-b border-gray-100 last:border-b-0">
         <div className="flex-1 min-w-0 pr-4">
            <p className="text-base font-semibold text-gray-800 truncate">{substance}</p>
            <p className="text-sm text-gray-500 mt-1">
               Reaction: {reaction}
            </p>
         </div>
         <div className="flex-shrink-0">
            <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${severity === 'Severe' ? statusSevere : 'bg-red-500'} ${severity === 'Moderate' ? statusModerate : ''} ${severity === 'Mild' ? 'bg-yellow-100 text-yellow-700' : ''}`}>
               {severity === 'Severe' ? 'Severe' : severity}
            </span>
         </div>
      </div>
   );
};


const MedicationContent = ({ patient }) => {
   const med = patient.medications;

   if (!med) {
      return <div className="p-6 text-center text-gray-500">Medication records are currently unavailable for this patient.</div>;
   }

   return (
      <div className="space-y-8 mt-8">
         <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Current Medications</h3>
            <p className="text-sm text-gray-500 mb-4">Active prescriptions and dosages</p>
            <div className="divide-y divide-gray-100">
               {med.currentPrescriptions?.length > 0 ? (
                  med.currentPrescriptions.map((p, index) => (
                     <PrescriptionItem key={index} {...p} />
                  ))
               ) : (
                  <p className="py-4 text-sm text-gray-500">No active medications recorded.</p>
               )}
            </div>
         </div>

         <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Allergies & Reactions</h3>
            <p className="text-sm text-gray-500 mb-4">Known drug and food allergies</p>
            <div className="divide-y divide-gray-100">
               {med.allergies?.length > 0 ? (
                  med.allergies.map((a, index) => (
                     <AllergyItem key={index} {...a} />
                  ))
               ) : (
                  <p className="py-4 text-sm text-gray-500">No known allergies or adverse reactions recorded.</p>
               )}
            </div>
         </div>
      </div>
   );
};

const VitalSignPill = ({ icon: Icon, label, value }) => (
   <div className="flex flex-col items-start p-3 bg-gray-50 rounded-lg w-full">
      <div className="flex items-center text-gray-500 mb-1">
         <Icon className="w-4 h-4 mr-1.5 text-[#233CAF]" />
         <span className="text-xs font-medium uppercase">{label}</span>
      </div>
      <p className="text-base font-semibold text-gray-800">{value}</p>
   </div>
);

const VitalSignEntry = ({ date, bloodPressure, temperature, pulse, weight, height }) => (
   <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 mb-6">
      <h4 className={`text-lg font-semibold ${primaryBlue} mb-4 border-b border-gray-100 pb-2`}>
         {date}
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
         <VitalSignPill icon={IconGauge} label="Blood Pressure" value={bloodPressure} />
         <VitalSignPill icon={IconThermometer} label="Temperature" value={temperature} />
         <VitalSignPill icon={IconHeart} label="Pulse" value={pulse} />
         <VitalSignPill icon={IconScale} label="Weight" value={weight} />
         <VitalSignPill icon={IconRuler} label="Height" value={height} />
      </div>
   </div>
);


const VitalSignsContent = ({ patient }) => {
   const vitalSignsHistory = patient.vitalSigns;

   if (!vitalSignsHistory || vitalSignsHistory.length === 0) {
      return (
         <div className="p-6 text-center text-gray-500 mt-8">
            <p className="text-lg mb-2">No Vital Signs Recorded</p>
            <p className="text-sm">Please add a new entry to view the patient's vital sign history.</p>
         </div>
      );
   }

   return (
      <div className="mt-8">
         <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Vital Signs History</h3>
            <p className="text-sm text-gray-500">Recent vital signs and measurements</p>
         </div>
         {vitalSignsHistory.map((entry, index) => (
            <VitalSignEntry key={index} {...entry} />
         ))}
      </div>
   );
};



const LabResultCard = ({ testName, date, details, status, fullReport }) => {
   let statusClass;
   let statusText = status;
   switch (status) {
      case 'Normal':
         statusClass = labStatusNormal;
         break;
      case 'Abnormal':
         statusClass = labStatusAbnormal;
         break;
      case 'Elevated':
         statusClass = labStatusElevated;
         break;
      default:
         statusClass = 'bg-gray-100 text-gray-600';
         statusText = 'Pending';
   }

   const [isExpanded, setIsExpanded] = useState(false);

   return (
      <div className="bg-white rounded-xl shadow-md border border-gray-100 mb-6 transition-all duration-300">
         <div className="p-6 flex justify-between items-start border-b border-gray-100">
            <div className="flex-1 min-w-0 pr-4">
               <h4 className="text-lg font-semibold text-gray-800 mb-1">{testName}</h4>
               <p className="text-xs text-gray-500 mb-2">Date: {date}</p>
               <p className="text-sm text-gray-700 font-medium truncate">{details}</p>
            </div>
            <div className="flex-shrink-0 flex flex-col items-end space-y-2">
               <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusClass}`}>
                  {statusText}
               </span>
               <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className={`text-sm font-medium transition ${primaryBlue} hover:text-indigo-700`}
               >
                  {isExpanded ? 'Hide Details' : 'View Report'}
               </button>
            </div>
         </div>

         {isExpanded && fullReport && (
            <div className="p-6 pt-4 border-t border-gray-100">
               <h5 className="text-sm font-semibold text-gray-800 mb-2 flex items-center">
                  <IconClipboard className="w-4 h-4 mr-2 text-indigo-500" /> Clinical Summary:
               </h5>
               <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
                  {fullReport}
               </p>
            </div>
         )}
      </div>
   );
};


const LabResultsContent = ({ patient }) => {
   const labResults = patient.labResults;

   if (!labResults || labResults.length === 0) {
      return (
         <div className="p-6 text-center text-gray-500 mt-8">
            <p className="text-lg mb-2">No Lab Results Available</p>
            <p className="text-sm">Please upload or record lab results for this patient.</p>
         </div>
      );
   }

   return (
      <div className="mt-8">
         <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">Laboratory</h3>
            <p className="text-sm text-gray-500">Recent lab tests and results</p>
         </div>

         {labResults.map((result, index) => (
            <LabResultCard key={index} {...result} />
         ))}
      </div>
   );
};

const AppointmentCard = ({ date, doctor, reason, status, notes }) => {
   let statusClass;
   let statusText = status;
   switch (status) {
      case 'Normal':
         statusClass = labStatusNormal;
         break;
      case 'Abnormal':
         statusClass = labStatusAbnormal;
         break;
      case 'Elevated':
         statusClass = labStatusElevated;
         break;
      default:
         statusClass = 'bg-gray-100 text-gray-600';
         statusText = 'Completed';
   }

   return (
      <div className="bg-white rounded-xl shadow-md border border-gray-100 mb-6">
         <div className="p-6 flex justify-between items-start">
            <div className="flex-1 min-w-0 pr-4">
               <h4 className="text-lg font-semibold text-gray-800 mb-1">{date}</h4>
               <p className="text-sm text-gray-700 mb-2 font-medium"><span className={`${primaryBlue} font-semibold`}>{doctor}</span></p>
               <p className="text-sm text-gray-500">{reason}</p>

               {notes && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                     <h5 className="text-xs font-semibold text-gray-800 uppercase mb-1">Clinical Note Summary:</h5>
                     <p className="text-sm text-gray-700">{notes}</p>
                  </div>
               )}
            </div>
            <div className="flex-shrink-0">
               <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusClass}`}>
                  {statusText}
               </span>
            </div>
         </div>
      </div>
   );
};

const AppointmentsContent = ({ patient }) => {
   const appointmentHistory = patient.appointmentHistory;

   if (!appointmentHistory || appointmentHistory.length === 0) {
      return (
         <div className="p-6 text-center text-gray-500 mt-8">
            <p className="text-lg mb-2">No Appointment History</p>
            <p className="text-sm">There are no past appointments recorded for this patient.</p>
         </div>
      );
   }

   return (
      <div className="mt-8">
         <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">Appointment History</h3>
            <p className="text-sm text-gray-500">Past visits and appointment records</p>
         </div>

         {appointmentHistory.map((appt, index) => (
            <AppointmentCard key={index} {...appt} />
         ))}
      </div>
   );
};


const PatientDetail = ({ patient, onBack }) => {
   const tabs = ['Overview', 'Medical History', 'Medications', 'Vital Signs', 'Lab Results', 'Appointments'];
   const [activeTab, setActiveTab] = useState('Overview');

   const renderContent = () => {
      switch (activeTab) {
         case 'Overview':
            return <OverviewContent patient={patient} />;
         case 'Medical History':
            return <MedicalHistoryContent patient={patient} />;
         case 'Medications':
            return <MedicationContent patient={patient} />;
         case 'Vital Signs':
            return <VitalSignsContent patient={patient} />;
         case 'Lab Results':
            return <LabResultsContent patient={patient} />;
         case 'Appointments':
            return <AppointmentsContent patient={patient} />;
         default:
            return (
               <div className="p-12 bg-white rounded-xl shadow-md border border-gray-100 text-center mt-6">
                  <p className="text-lg text-gray-600">
                     **{activeTab}** View is currently under development.
                  </p>
               </div>
            );
      }
   };

   return (
      <div className="max-w-7xl mx-auto">
         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <button
               onClick={onBack}
               className={`inline-flex items-center mb-4 text-sm font-medium text-gray-500 hover:text-gray-700 transition`}
            >
               <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
               Back to Patient List
            </button>

            <div className="flex items-center pb-4 border-b border-gray-100">
               <div className="w-12 h-12 rounded-full flex items-center justify-center bg-indigo-100 text-[#233CAF] font-bold text-lg mr-4 flex-shrink-0">{patient.initials}</div>
               <div>
                  <h1 className="text-xl font-semibold text-gray-800">{patient.name}</h1>
                  <p className="text-sm text-gray-500">Patient ID: <span className="font-mono">{patient.id}</span></p>
               </div>
            </div>

            <div className="flex space-x-6 mt-4 overflow-x-auto whitespace-nowrap">
               {tabs.map(tab => (
                  <button
                     key={tab}
                     onClick={() => setActiveTab(tab)}
                     className={`py-2 px-1 text-sm font-medium border-b-2 transition ${activeTab === tab
                        ? `text-[#233CAF] border-[#233CAF]`
                        : `text-gray-500 border-transparent hover:border-gray-300`
                        }`}
                  >
                     {tab}
                  </button>
               ))}
            </div>
         </div>

         <div className="mt-6">
            {renderContent()}
         </div>
      </div>
   );
};

const PatientRow = ({ initials, name, age, gender, contact, lastVisit, condition, status, onView }) => (
   <div className="grid grid-cols-8 gap-4 items-center py-4 border-b border-gray-100 text-sm">
      <div className="col-span-2 flex items-center">
         <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 text-gray-600 font-semibold text-xs mr-3 flex-shrink-0">{initials}</div>
         <p className="font-medium text-gray-800 truncate">{name}</p>
      </div>
      <div className="text-gray-600">{`${age} years, ${gender}`}</div>
      <div className="col-span-2 text-gray-600 space-y-0.5">
         <p className="text-xs">{contact?.phone || 'N/A'}</p>
         <p className="text-xs truncate">{contact?.email || 'N/A'}</p>
      </div>
      <div className="text-gray-600">{lastVisit}</div>
      <div className="text-gray-600 truncate">{condition}</div>
      <div className="text-center">
         <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${status === 'Active' ? statusActive : statusInactive}`}>
            {status}
         </span>
      </div>
      <div className="text-center">
         <button
            onClick={onView}
            className={`${primaryBlue} text-xs font-medium hover:underline`}
         >
            View
         </button>
      </div>
   </div>
);

const FilledPatientList = ({ patients, onPatientView }) => (
   <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Patient List</h2>
      <p className="text-sm text-gray-500 mb-6">{patients.length} patients found</p>

      <div className="grid grid-cols-8 gap-4 pb-3 border-b border-gray-300 font-medium text-gray-500 text-xs uppercase tracking-wider">
         <div className="col-span-2">Patient</div>
         <div>Age/Gender</div>
         <div className="col-span-2">Contact</div>
         <div>Last Visit</div>
         <div>Condition</div>
         <div>Status</div>
         <div className="text-center">Actions</div>
      </div>

      <div className="divide-y divide-gray-100">
         {patients.map((patient, index) => (
            <PatientRow
               key={index}
               {...patient}
               onView={() => onPatientView(index)}
            />
         ))}
      </div>
   </div>
);

const EmptyPatientList = () => (
   <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 text-center">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">No Patients Yet</h2>
      <p className="text-gray-500 max-w-xl mx-auto mb-8 text-sm">
         Start building your patient database by adding your first patient.
      </p>
      <button className={`inline-flex items-center px-6 py-3 text-sm font-medium rounded-lg text-white ${primaryDarkBlue} hover:opacity-90 transition`}>
         <IconPlus className="w-5 h-5 mr-2" />
         Add Your First Patient
      </button>
   </div>
);

const PageHeader = () => (
   <div className="mb-6">
      <h1 className="text-2xl font-semibold text-gray-800">Patients</h1>
      <p className="text-gray-500 text-sm">Manage your patient database and medical records</p>
   </div>
);

const SearchBar = ({ hasData }) => (
   <div className={`flex items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 ${hasData ? 'justify-between' : 'justify-start'}`}>
      <div className="flex items-center w-full max-w-lg">
         <IconSearch className="w-5 h-5 text-gray-400 mr-3" />
         <input
            type="text"
            placeholder="Search patients by name or number"
            className="w-full bg-transparent focus:outline-none text-gray-700"
         />
      </div>

      {hasData && (
         <div className="flex space-x-3 ml-auto">
            <button className="flex items-center px-4 py-2 text-sm font-medium rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition">
               Filter <IconFilter className="w-4 h-4 ml-2" />
            </button>
            <button className="flex items-center px-4 py-2 text-sm font-medium rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition">
               Export <IconDownload className="w-4 h-4 ml-2" />
            </button>
         </div>
      )}
   </div>
);


const PatientReport = () => {
   const [patients, setPatients] = useState(null);
   const [isLoading, setIsLoading] = useState(true);
   const [viewingPatientIndex, setViewingPatientIndex] = useState(null);

   const fetchPatients = () => {
      setIsLoading(true);
      setTimeout(() => {
         setPatients(mockPatients);
         setIsLoading(false);
      }, 1200);
   };

   useEffect(() => {
      fetchPatients();
   }, []);

   const handleViewPatient = (index) => {
      setViewingPatientIndex(index);
   };

   const handleBackToList = () => {
      setViewingPatientIndex(null);
   };

   const hasData = patients && patients.length > 0;
   const isViewingDetail = viewingPatientIndex !== null && hasData;
   const currentPatient = isViewingDetail ? patients[viewingPatientIndex] : null;

   return (
      <div className='p-4 bg-gray-50 min-h-screen'>

         {isLoading && (
            <div className="flex justify-center items-center bg-white p-12 rounded-xl shadow-sm border border-gray-100 h-64">
               <IconLoader className="w-8 h-8 animate-spin text-[#233CAF] mr-3" />
               <p className="text-gray-600 text-lg">Loading Patient Data...</p>
            </div>
         )}

         {!isLoading && isViewingDetail && currentPatient && (
            <PatientDetail patient={currentPatient} onBack={handleBackToList} />
         )}

         {!isLoading && !isViewingDetail && (
            <>
               <PageHeader />
               <SearchBar hasData={hasData} />
               {hasData ? (
                  <FilledPatientList patients={patients} onPatientView={handleViewPatient} />
               ) : (
                  <EmptyPatientList />
               )}
            </>
         )}
      </div>
   );
};

export default PatientReport;
