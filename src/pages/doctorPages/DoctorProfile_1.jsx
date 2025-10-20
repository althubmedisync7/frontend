import React, { useState } from 'react';

const primaryBlue = 'text-[#233CAF]';
const primaryDarkBlue = 'bg-[#233CAF]';

const IconUser = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const IconLock = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;
const IconBell = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>;
const IconCamera = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>;
const IconUpload = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>;


const ToggleSwitch = ({ label, description, checked, onChange }) => (
   <div className="flex justify-between items-center py-4 border-b border-gray-100 last:border-b-0">
      <div>
         <p className="text-base font-medium text-gray-800">{label}</p>
         <p className="text-sm text-gray-500">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
         <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="sr-only peer"
         />
         <div
            className={`w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-[#233CAF] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${checked ? primaryDarkBlue : ''
               }`}
         ></div>
      </label>
   </div>
);

const FormInput = ({ label, name, value, onChange, type = 'text', readOnly = false }) => (
   <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 sr-only">{label}</label>
      <input
         type={type}
         id={name}
         name={name}
         value={value}
         onChange={onChange}
         readOnly={readOnly}
         placeholder={label}
         className={`mt-1 p-3 block w-full rounded-lg border-none shadow-sm bg-gray-50 focus:ring-2 focus:ring-[#233CAF] focus:border-[#233CAF] sm:text-sm transition ${readOnly ? 'text-gray-600' : 'text-gray-800'}`}
      />
   </div>
);


const DoctorProfile = () => {
   const [profile, setProfile] = useState({
      firstName: 'Mercy',
      lastName: 'Benjamin',
      email: 'dr.mercy@medisync.com',
      phone: '+234 803 9789 381',
      license: 'MD - 12345678',
      specialty: 'Dermatology',
      title: 'Director in Surgery, DMU Specialist'
   });

   const [notifications, setNotifications] = useState({
      email: true,
      reminders: true,
      urgent: true,
      marketing: false,
   });

   const handleProfileChange = (e) => {
      setProfile({ ...profile, [e.target.name]: e.target.value });
   };

   const handleNotificationChange = (key) => {
      setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
   };

   return (
      <div className='bg-gray-50 min-h-screen'>
         <header className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-800">Settings</h1>
            <p className="text-gray-500 text-sm">Manage your account and application preferences</p>
         </header>

         <div className="w-full mx-auto space-y-8">

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
               <h2 className={`flex items-center text-xl font-semibold mb-6 ${primaryBlue}`}>
                  <IconUser className="w-5 h-5 mr-2" />
                  Profile Information
               </h2>
               <p className="text-sm text-gray-500 mb-6">Update your personal information and profile details.</p>

               <div className="flex items-center space-x-6 mb-8">
                  <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 border-4 border-white shadow-lg overflow-hidden">
                     <span className="text-2xl font-bold text-[#233CAF]">DB</span>
                  </div>

                  <div>
                     <p className="text-lg font-bold text-gray-800">Dr Benjamin Mercy. D</p>
                     <p className="text-sm text-gray-600 mb-2">{profile.title}</p>
                     <button className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full text-white bg-pink-500 hover:bg-pink-600 transition`}>
                        <IconUpload className="w-4 h-4 mr-1" />
                        Change Photo
                     </button>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                  <FormInput label="First Name" name="firstName" value={profile.firstName} onChange={handleProfileChange} />
                  <FormInput label="Last Name" name="lastName" value={profile.lastName} onChange={handleProfileChange} />
                  <FormInput label="Email" name="email" value={profile.email} onChange={handleProfileChange} readOnly={true} />
                  <FormInput label="Phone Number" name="phone" value={profile.phone} onChange={handleProfileChange} />
                  <FormInput label="Medical License" name="license" value={profile.license} onChange={handleProfileChange} />
                  <FormInput label="Specialty" name="specialty" value={profile.specialty} onChange={handleProfileChange} />
               </div>

               <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
                  <button className={`px-6 py-2 text-sm font-medium rounded-lg text-white ${primaryDarkBlue} hover:opacity-90 transition shadow-md`}>
                     Save Changes
                  </button>
               </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
               <h2 className={`flex items-center text-xl font-semibold mb-6 ${primaryBlue}`}>
                  <IconBell className="w-5 h-5 mr-2" />
                  Notifications
               </h2>
               <p className="text-sm text-gray-500 mb-6">Configure how you receive notifications.</p>

               <ToggleSwitch
                  label="Email Notifications"
                  description="Receive notifications via email."
                  checked={notifications.email}
                  onChange={() => handleNotificationChange('email')}
               />
               <ToggleSwitch
                  label="Appointment Reminders"
                  description="Get reminded about upcoming appointments."
                  checked={notifications.reminders}
                  onChange={() => handleNotificationChange('reminders')}
               />
               <ToggleSwitch
                  label="Urgent Alerts"
                  description="Receive notifications for urgent matters."
                  checked={notifications.urgent}
                  onChange={() => handleNotificationChange('urgent')}
               />
               <ToggleSwitch
                  label="Marketing Communications"
                  description="Receive updates about new features."
                  checked={notifications.marketing}
                  onChange={() => handleNotificationChange('marketing')}
               />
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
               <h2 className={`flex items-center text-xl font-semibold mb-6 ${primaryBlue}`}>
                  <IconLock className="w-5 h-5 mr-2" />
                  Security & Privacy
               </h2>
               <p className="text-sm text-gray-500 mb-6">Manage your account security and privacy settings.</p>

               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2">
                  <div>
                     <p className="text-base font-medium text-gray-800">Change Password</p>
                     <p className="text-sm text-gray-500">Update your account password for security.</p>
                  </div>
                  <button className={`mt-2 sm:mt-0 px-4 py-2 text-sm rounded-lg ${primaryBlue} border border-indigo-200 hover:bg-indigo-50 transition`}>
                     Update Password
                  </button>
               </div>

               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 border-t border-gray-100 mt-4">
                  <div>
                     <p className="text-base font-medium text-red-700">Deactivate Account</p>
                     <p className="text-sm text-gray-500">Permanently remove your profile and data.</p>
                  </div>
                  <button className={`mt-2 sm:mt-0 px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition`}>
                     Deactivate
                  </button>
               </div>
            </div>

         </div>
      </div>
   );
};

export default DoctorProfile;
