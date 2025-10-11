import { useState, useEffect } from 'react';
import { Camera, User, Plus } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Toggle from '../components/Toggle';
import { supabase } from '../lib/supabase';

export default function Profile() {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    medicalLicense: '',
    specialty: '',
    photoUrl: null,
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    appointmentReminders: true,
    urgentAlerts: true,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [completedSections, setCompletedSections] = useState(0);

  useEffect(() => {
    loadProfileData();
  }, []);

  useEffect(() => {
    calculateProgress();
  }, [profile]);

  const loadProfileData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data: profileData } = await supabase
          .from('doctor_profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        const { data: notificationData } = await supabase
          .from('doctor_notifications')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (profileData) {
          setProfile({
            firstName: profileData.first_name || '',
            lastName: profileData.last_name || '',
            email: profileData.email || '',
            phoneNumber: profileData.phone_number || '',
            medicalLicense: profileData.medical_license || '',
            specialty: profileData.specialty || '',
            photoUrl: profileData.profile_photo_url || null,
          });
        }

        if (notificationData) {
          setNotifications({
            emailNotifications: notificationData.email_notifications,
            appointmentReminders: notificationData.appointment_reminders,
            urgentAlerts: notificationData.urgent_alerts,
          });
        }
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateProgress = () => {
    let completed = 0;
    if (profile.firstName && profile.lastName) completed++;
    if (profile.email) completed++;
    if (profile.phoneNumber) completed++;
    if (profile.medicalLicense && profile.specialty) completed++;
    setCompletedSections(completed);
  };

  const handleInputChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleNotificationChange = (field, value) => {
    setNotifications({ ...notifications, [field]: value });
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, photoUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { error: profileError } = await supabase
          .from('doctor_profiles')
          .upsert({
            user_id: user.id,
            first_name: profile.firstName,
            last_name: profile.lastName,
            email: profile.email,
            phone_number: profile.phoneNumber,
            medical_license: profile.medicalLicense,
            specialty: profile.specialty,
            profile_photo_url: profile.photoUrl,
          });

        const { error: notificationError } = await supabase
          .from('doctor_notifications')
          .upsert({
            user_id: user.id,
            email_notifications: notifications.emailNotifications,
            appointment_reminders: notifications.appointmentReminders,
            urgent_alerts: notifications.urgentAlerts,
          });

        if (!profileError && !notificationError) {
          alert('Profile saved successfully!');
        }
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const hasProfileData = profile.firstName && profile.lastName;

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 ml-44">
        <Header />

        <main className="p-6 md:p-8 overflow-y-auto h-[calc(100vh-80px)]">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {hasProfileData ? 'Settings' : 'Complete Your Profile'}
            </h1>
            <p className="text-gray-600 mt-1">
              {hasProfileData
                ? 'Manage your account and application preferences'
                : 'Set up your medical practice profile to get started'}
            </p>
          </div>

          {!hasProfileData && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border border-blue-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Setup Progress</h3>
                  <p className="text-sm text-gray-600">Complete all sections to activate your practice dashboard</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-[#2D3F9F]">{completedSections}/4</div>
                  <p className="text-xs text-gray-600">Sections Complete</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-[#2D3F9F] h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(completedSections / 4) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <User className="text-gray-900" size={24} />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                <p className="text-sm text-gray-600">Update your personal information and profile details</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8 pb-8 border-b border-gray-100">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  {profile.photoUrl ? (
                    <img src={profile.photoUrl} alt="Profile" className="w-full h-full object-cover" />
                  ) : hasProfileData ? (
                    <Camera className="text-gray-400" size={32} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Plus className="text-gray-900" size={40} strokeWidth={1.5} />
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  id="photo-upload"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>

              <div className="flex-1">
                {hasProfileData ? (
                  <>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Dr {profile.firstName} {profile.lastName}, D
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">Bachelor of Surgery (MBBS/MBChB)</p>
                    <label
                      htmlFor="photo-upload"
                      className="inline-block bg-[#2D3F9F] text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-blue-800 transition-colors"
                    >
                      Change Photo
                    </label>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Dr Benjamin Mercy, D</h3>
                    <p className="text-gray-600 text-sm mb-3">Bachelor of Surgery (MBBS/MBChB)</p>
                    <label
                      htmlFor="photo-upload"
                      className="inline-block bg-[#2D3F9F] text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-blue-800 transition-colors"
                    >
                      Select Photo
                    </label>
                  </>
                )}
                <p className="text-xs text-gray-500 mt-2">Upload a professional photo for your profile</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">First Name</label>
                <input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="your first name"
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Last Name</label>
                <input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="your last name"
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="enter your official email"
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={profile.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  placeholder="+234"
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Medical License Number</label>
                <input
                  type="text"
                  value={profile.medicalLicense}
                  onChange={(e) => handleInputChange('medicalLicense', e.target.value)}
                  placeholder="enter your number"
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Specialty</label>
                <select
                  value={profile.specialty}
                  onChange={(e) => handleInputChange('specialty', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border border-transparent appearance-none cursor-pointer"
                >
                  <option value="">Select profession</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="General Surgery">General Surgery</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleSaveProfile}
              disabled={isSaving}
              className="mt-8 bg-[#2D3F9F] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : 'Save Profile Information'}
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-gray-900 rounded flex items-center justify-center ">
                <span className="text-white text-xs">🔔</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
                <p className="text-sm text-gray-600">Configure how you receive notifications</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Email Notifications</h3>
                  <p className="text-sm text-gray-600">Receive notifications via email</p>
                </div>
                <Toggle
                  enabled={notifications.emailNotifications}
                  onChange={(value) => handleNotificationChange('emailNotifications', value)}
                />
              </div>

              <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Appointment Reminders</h3>
                  <p className="text-sm text-gray-600">Get reminded about upcoming appointments</p>
                </div>
                <Toggle
                  enabled={notifications.appointmentReminders}
                  onChange={(value) => handleNotificationChange('appointmentReminders', value)}
                />
              </div>

              <div className="flex items-center justify-between py-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Urgent Alerts</h3>
                  <p className="text-sm text-gray-600">Receive alerts for urgent matters</p>
                </div>
                <Toggle
                  enabled={notifications.urgentAlerts}
                  onChange={(value) => handleNotificationChange('urgentAlerts', value)}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
