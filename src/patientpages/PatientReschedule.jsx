import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import { IoChevronBackCircleOutline } from "react-icons/io5";

export default function Reschedule() {
  const { setUpcomingAppointments } = useOutletContext();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleback = () => {
    navigate(-1);
  };

  const [formData, setFormData] = useState({
    doctorName: "",
    speciality: "",
    date: "",
    time: "",
    type: "",
    hospital: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isFormComplete = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  const validate = () => {
    const validationErrors = {};
    if (!formData.doctorName.trim())
      validationErrors.doctorName = "Full Name is required";
    if (!formData.speciality)
      validationErrors.speciality = "Speciality is required";
    if (!formData.date) validationErrors.date = "Date is required";
    if (!formData.time) validationErrors.time = "Time is required";
    if (!formData.type) validationErrors.type = "Type of visit is required";
    if (!formData.hospital) validationErrors.hospital = "Hospital is required";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormComplete()) return;
    const newId = Date.now();

    if (validate()) {
      // Create a new appointment object
      const newAppointment = {
        id: newId,
        date: formData.date,
        time: formData.time,
        department: formData.speciality,
        doctor: formData.doctorName,
        hospital: formData.hospital,
        type: formData.type,
        status: "pending",
      };

      setUpcomingAppointments((prevAppointments) => [
        newAppointment,
        ...prevAppointments,
      ]);

      setFormData(" ");

      navigate("/patientboard/appointments");
    }
  }; // Determine button state

  const isReadyToSubmit = isFormComplete();
  const buttonClasses = isReadyToSubmit
    ? "bg-[#1E318A] hover:bg-[#2941AB]"
    : "bg-gray-400 cursor-not-allowed";

  return (
    <main className="p-4 lg:p-6 lg:w-[80%] lg:mx-auto">
      <div className="flex gap-6 items-center mt-5 mb-8 relative">
        <button
          onClick={handleback}
          className="flex items-center text-gray-700 z-10"
        >
          <IoChevronBackCircleOutline className="text-[30px] cursor-pointer" />
        </button>
        <h2 className="text-2xl font-semibold">Schedule Appointment</h2>
      </div>
      <form className="w-full space-y-10 mt-8" onSubmit={handleSubmit}>
        <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0">
          {/* Doctor's Name - LEFT COLUMN */} 
          <div>
            <label
              htmlFor="doctorName"
              className="block text-sm font-semibold text-gray-700 mb-1 text-left"
            >
              Full Name <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              id="doctorName"
              name="doctorName"
              value={formData.doctorName}
              onChange={handleChange}
              placeholder="Enter doctor's name"
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${
                errors.doctorName ? "border-red-500" : "border-gray-300"
              }`}
              required
            />

            {errors.doctorName && (
              <p className="text-red-500 text-sm mt-1">{errors.doctorName}</p>
            )}
          </div>
          {/* Speciality - RIGHT COLUMN */}
          <div>
            <label
              htmlFor="speciality"
              className="block text-sm font-semibold text-gray-700 mb-1 text-left"
            >
              Speciality <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              id="speciality"
              name="speciality"
              value={formData.speciality}
              onChange={handleChange}
              placeholder="e.g. dentistry"
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${
                errors.speciality ? "border-red-500" : "border-gray-300"
              }`}
              required
            />

            {errors.speciality && (
              <p className="text-red-500 text-sm mt-1">{errors.speciality}</p>
            )}
          </div>
          {/* Date - LEFT COLUMN */}
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-semibold text-gray-700 mb-1 text-left"
            >
              Date <span className="text-red-500">*</span>
            </label>

            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="DD/MM/YYYY"
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${
                errors.date ? "border-red-500" : "border-gray-300"
              }`}
              required
            />

            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date}</p>
            )}
          </div>
          {/* Time - RIGHT COLUMN */}
          <div>
            <label
              htmlFor="time"
              className="block text-sm font-semibold text-gray-700 mb-1 text-left"
            >
              Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              placeholder="HH:MM AM/PM"
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${
                errors.time ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {errors.time && (
              <p className="text-red-500 text-sm mt-1">{errors.time}</p>
            )}
          </div>
          {/* Type of Visit - LEFT COLUMN */}
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-semibold text-gray-700 mb-1 text-left"
            >
              Type of Visit <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`w-full appearance-none p-[10px] border rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${
                  errors.type ? "border-red-500" : "border-gray-300"
                } bg-white text-gray-800`}
                required
              >
                <option value="" disabled className="max-w-[20rem]">
                  Select your visit type
                </option>
                <option value="Physical">Physical</option>
                <option value="Online">Online</option>
              </select>

              <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
                ▼
              </span>
            </div>

            {errors.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type}</p>
            )}
          </div>
          {/* Hospital - RIGHT COLUMN */}
          <div>
            <label
              htmlFor="hospital"
              className="block text-sm font-semibold text-gray-700 mb-1 text-left"
            >
              Enter hospital name
              <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              id="hospital"
              name="hospital"
              value={formData.hospital} // Fix: Use formData.hospital
              onChange={handleChange}
              placeholder="e.g. Lagos University Teaching Hospital"
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${
                errors.hospital ? "border-red-500" : "border-gray-300"
              }`}
              required
            />

            {errors.hospital && (
              <p className="text-red-500 text-sm mt-1">{errors.hospital}</p>
            )}
          </div>
        </div>
        {/* Submit Button - Full Width */}
        <div className="mt-8">
          <button
            type="submit" // NEW: Apply conditional classes and disabled attribute
            className={`w-full py-3 text-lg font-semibold text-white rounded-md transition-colors ${buttonClasses}`}
            disabled={!isReadyToSubmit}
          >
            Save & Finish
          </button>
        </div>
      </form>
    </main>
  );
}
