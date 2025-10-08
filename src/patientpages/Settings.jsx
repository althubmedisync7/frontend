import React, { useState } from 'react';
import Profile from './Profile';
import AccountSecurity from './AccountAndSecurity';
import NotificationsAndReminders from './Notifications';


const Settings = () => {
  const [activeTab, setActiveTab] = useState('Profile');

  const tabs = ['Profile', 'Account & Security', 'Notifications', 'Privacy', 'Language & Accessibility', 'Help & Support'];

  const renderContent = () => {
    switch (activeTab) {
      case 'Profile':
        return <Profile />;
      case 'Account & Security':
        return <AccountSecurity />;

      case 'Notifications':
        return <NotificationsAndReminders />;
      
    }
  };
  return (
    <div className="bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-1">Settings</h1>
      <p className="text-sm text-gray-500 mb-6">Manage your account here</p>

      <div className="flex border-b border-gray-200 bg-white rounded-t-lg shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3 px-4 text-sm font-medium transition-colors duration-200 ${activeTab === tab
              ? 'border-b-2 border-indigo-600 text-indigo-600'
              : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 shadow-lg rounded-b-lg border-t-0">
        {renderContent()}
      </div>
    </div>
  );
};

export default Settings
