import React, { useState, useEffect } from 'react';
import PrivacyDataSharing from './PrivacyDataSharing';
import LanguageAccessibilitySettings from './LanguageAccessibility';
import HelpSupportSettings from './HelpSupportSettings';


const ProfileSettings = () => (<div className="p-4 text-gray-700"><h3 className="text-lg font-semibold mb-2">Profile Settings</h3><p>Manage your personal profile information here.</p></div>);
const AccountSecuritySettings = () => (<div className="p-4 text-gray-700"><h3 className="text-lg font-semibold mb-2">Account & Security</h3><p>Update your password, manage two-factor authentication, and view account history.</p></div>);
const NotificationsSettings = () => (<div className="p-4 text-gray-700"><h3 className="text-lg font-semibold mb-2">Notifications</h3><p>Configure your email, push, and SMS notification preferences.</p></div>);

const Icon = ({ children }) => <span className="w-6 h-6 mr-4 text-gray-500">{children}</span>;

const MobileMenuLink = ({ icon, label, onClick, isLogout = false }) => {
  const baseClasses = "flex justify-between items-center w-full py-4 px-6 transition-colors duration-150 cursor-pointer";
  const hoverClasses = isLogout ? "bg-red-50 hover:bg-red-100" : "hover:bg-gray-100";
  const textClasses = isLogout ? "text-red-600 font-medium" : "text-gray-800";
  const arrowClasses = isLogout ? "text-red-400" : "text-gray-400";

  return (
    <div
      className={`${baseClasses} ${hoverClasses} ${isLogout ? 'mt-4 border-t border-gray-200' : ''}`}
      onClick={() => onClick(label)}
    >
      <div className="flex items-center">
        <Icon>{icon}</Icon>
        <span className={`${textClasses} text-base`}>{label}</span>
      </div>
      <span className={arrowClasses}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" /></svg>
      </span>
    </div>
  );
};


const Settings = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const [isMenuVisible, setIsMenuVisible] = useState(true);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const tabs = ['Profile', 'Account & Security', 'Notifications', 'Privacy', 'Language & Accessibility', 'Help & Support'];

  const renderContent = () => {
    switch (activeTab) {
      case 'Profile':
        return <ProfileSettings />;
      case 'Account & Security':
        return <AccountSecuritySettings />;
      case 'Notifications':
        return <NotificationsSettings />;
      case 'Privacy':
        return <PrivacyDataSharing />;
      case 'Language & Accessibility':
        return <LanguageAccessibilitySettings />;
      case 'Help & Support':
        return <HelpSupportSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  const MobileMenu = () => {
    const iconPlaceholders = {
      profile: '👤', security: '🔒', notifications: '🔔', privacy: '🛡️',
      language: '🌐', support: 'ⓘ', logout: '➡️', back: '⬅️',
    };

    const handleMenuClick = (label) => {
      if (label === 'Logout') {
        alert('Logging out...');
        return;
      }

      setActiveTab(label);
      setIsMenuVisible(false);
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="pt-8 pb-4  bg-white border-b border-gray-200">
          <div className="flex items-center">
            <span className="text-gray-600 mr-4 cursor-pointer opacity-0">⬅️</span>
            <h1 className="text-lg font-semibold text-gray-900">Settings</h1>
          </div>
          <p className="text-sm text-gray-500 ml-10">Manage your account here</p>
        </div>

        <div className="bg-white rounded-b-lg overflow-hidden">
          {tabs.map(tab => (
            <MobileMenuLink key={tab} icon={iconPlaceholders[tab.split(' ')[0].toLowerCase()]} label={tab} onClick={handleMenuClick} />
          ))}
        </div>

        <div className="bg-white mt-4">
          <MobileMenuLink icon={iconPlaceholders.logout} label="Logout" isLogout={true} onClick={handleMenuClick} />
        </div>
      </div>
    );
  };

  const MobileContentScreen = () => (
    <div className="bg-white min-h-screen">
      <div className="flex items-center p-4 bg-white border-b border-gray-200">
        <span
          className="text-gray-600 mr-4 cursor-pointer"
          onClick={() => { setActiveTab(''); setIsMenuVisible(true); }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" /></svg>
        </span>
        <h1 className="text-lg font-semibold text-gray-900">{activeTab}</h1>
      </div>
      {renderContent()}
    </div>
  );


  if (isMobile) {
    if (isMenuVisible) {
      return <MobileMenu />;
    } else {
      return <MobileContentScreen />;
    }
  }

  return (
    <div className=" bg-gray-50 min-h-screen">
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

export default Settings;