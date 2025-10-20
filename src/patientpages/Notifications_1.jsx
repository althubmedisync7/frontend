import { useState, useEffect } from "react";

export default function NotificationsAndReminders() {
  const [settings, setSettings] = useState({
    medicationReminder: true,
    appointmentReminder: true,
    pushNotification: false,
    healthTips: "daily",
  });

  useEffect(() => {
    const saved = localStorage.getItem("notificationSettings");
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notificationSettings", JSON.stringify(settings));
  }, [settings]);

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleHealthTipsChange = (value) => {
    setSettings((prev) => ({ ...prev, healthTips: value }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md  max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Notifications & Reminders
      </h2>

      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-3">Reminders</h3>

        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-700">Medications Reminder</span>
          <button
            onClick={() => handleToggle("medicationReminder")}
            className={`relative w-12 h-6 rounded-full transition-colors ${settings.medicationReminder ? "bg-blue-900" : "bg-gray-300"
              }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 h-5 w-5 bg-white rounded-full transition-transform ${settings.medicationReminder ? "translate-x-6" : ""
                }`}
            ></span>
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-700">Appointments Reminder</span>
          <button
            onClick={() => handleToggle("appointmentReminder")}
            className={`relative w-12 h-6 rounded-full transition-colors ${settings.appointmentReminder ? "bg-blue-900" : "bg-gray-300"
              }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 h-5 w-5 bg-white rounded-full transition-transform ${settings.appointmentReminder ? "translate-x-6" : ""
                }`}
            ></span>
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-3">
          Push Notifications
        </h3>

        <div className="flex items-center justify-between">
          <span className="text-gray-700">
            Receive real-time alerts on your device
          </span>
          <button
            onClick={() => handleToggle("pushNotification")}
            className={`relative w-12 h-6 rounded-full transition-colors ${settings.pushNotification ? "bg-blue-900" : "bg-gray-300"
              }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 h-5 w-5 bg-white rounded-full transition-transform ${settings.pushNotification ? "translate-x-6" : ""
                }`}
            ></span>
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-3">
          Health Tips Alert
        </h3>
        <p className="text-gray-600 mb-3">
          How often do you want to receive health tips alert?
        </p>

        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="healthTips"
              value="daily"
              checked={settings.healthTips === "daily"}
              onChange={() => handleHealthTipsChange("daily")}
              className="text-blue-900 focus:ring-blue-900"
            />
            Daily
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="healthTips"
              value="weekly"
              checked={settings.healthTips === "weekly"}
              onChange={() => handleHealthTipsChange("weekly")}
              className="text-blue-900 focus:ring-blue-900"
            />
            Weekly
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="healthTips"
              value="off"
              checked={settings.healthTips === "off"}
              onChange={() => handleHealthTipsChange("off")}
              className="text-blue-900 focus:ring-blue-900"
            />
            Off
          </label>
        </div>
      </div>
    </div>
  );
}
