

import React, { useState } from "react";

export default function RescheduleModal({ appointment, onClose, onSave }) {
  const [date, setDate] = useState(appointment?.date || "");
  const [time, setTime] = useState(appointment?.time || "");
  const [type, setType] = useState(appointment?.type || "Physical");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...appointment,
      date,
      time,
      type,
    });
  };

  if (!appointment) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-lg sm:max-w-2xl lg:max-w-4xl mx-4 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl font-light cursor-pointer"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-6">Reschedule Appointment</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Doctor */}
          <div>
            <label className="block text-sm font-medium">Doctor's Name</label>
            <input
              type="text"
              value={appointment.doctor}
              disabled
              className="w-full border rounded p-2 bg-gray-100"
            />
          </div>

          {/* Specialty */}
          <div>
            <label className="block text-sm font-medium">Specialty</label>
            <input
              type="text"
              value={appointment.department}
              disabled
              className="w-full border rounded p-2 bg-gray-100"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium">Type of Visit</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="Physical">Physical</option>
              <option value="Virtual">Virtual</option>
            </select>
          </div>

          {/* Hospital */}
          <div>
            <label className="block text-sm font-medium">Hospital Name</label>
            <input
              type="text"
              value={appointment.hospital}
              disabled
              className="w-full border rounded p-2 bg-gray-100"
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 mt-6">
            <button
              type="submit"
              className="w-full bg-[#1E318A] text-white py-3 rounded-lg font-medium"
            >
              Save & Finish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
