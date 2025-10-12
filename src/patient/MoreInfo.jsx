import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MoreInfo() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    genotype: "",
    bloodGroup: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validation function
  const validate = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.genotype) newErrors.genotype = "Genotype is required";
    if (!formData.bloodGroup) newErrors.bloodGroup = "Blood Group is required";
    return newErrors;
  };

  const handleNext = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Save to localStorage
    localStorage.setItem("patientMoreInfo", JSON.stringify(formData));
    navigate("/patientboard");
  };

  return (
    <div className="px-5">
      {/* Progress bar */}
      <div className="h-1 py-5">
        <div className="mb-4 flex justify-between items-center">
          <p className="text-[#1E318A]">1/1</p>
        </div>
        <div className="h-1 bg-[#1E318A] w-full mb-10"></div>
      </div>

      <h2 className="text-xl font-semibold mt-10 mb-4">Basic Information</h2>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-semibold text-gray-700 mb-1 text-left"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${
              errors.fullName ? "border-red-500" : "border-gray-300"
            }`}
            required
            placeholder="Rebecca Omobolanle Ajao"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label
            htmlFor="dob"
            className="block text-sm font-semibold text-gray-700 mb-1 text-left"
          >
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${
              errors.dob ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {errors.dob && (
            <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-semibold text-gray-700 mb-1 text-left"
          >
            Gender <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full appearance-none p-[10px] border rounded-md pr-10 
                focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors 
                ${errors.gender ? "border-red-500" : "border-gray-300"}
                bg-white text-gray-800`}
              required
            >
              <option value="" disabled>
                Select your gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
              ▼
            </span>
          </div>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
          )}
        </div>

        {/* Genotype */}
        <div className="relative">
          <label
            htmlFor="genotype"
            className="block text-sm font-semibold text-gray-700 mb-1 text-left"
          >
            Genotype <span className="text-red-500">*</span>
          </label>
          <select
            id="genotype"
            name="genotype"
            value={formData.genotype}
            onChange={handleChange}
            className={`w-full appearance-none p-[10px] border rounded-md pr-10 
              focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors 
              ${errors.genotype ? "border-red-500" : "border-gray-300"}
              bg-white text-gray-800`}
            required
          >
            <option value="">Select genotype</option>
            <option value="AA">AA</option>
            <option value="AS">AS</option>
            <option value="SS">SS</option>
            <option value="AC">AC</option>
          </select>
          <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
            ▼
          </span>
          {errors.genotype && (
            <p className="text-red-500 text-sm mt-1">{errors.genotype}</p>
          )}
        </div>

        {/* Blood Group */}
        <div className="relative">
          <label
            htmlFor="bloodGroup"
            className="block text-sm font-semibold text-gray-700 mb-1 text-left"
          >
            Blood Group <span className="text-red-500">*</span>
          </label>
          <select
            id="bloodGroup"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className={`w-full appearance-none p-[10px] border rounded-md pr-10 
              focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors 
              ${errors.bloodGroup ? "border-red-500" : "border-gray-300"}
              bg-white text-gray-800`}
            required
          >
            <option value="">Select blood group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
          <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
            ▼
          </span>
          {errors.bloodGroup && (
            <p className="text-red-500 text-sm mt-1">{errors.bloodGroup}</p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-8">
        <button
          className="border border-gray-400 px-4 py-2 rounded text-[#1E318A]"
          onClick={() => navigate("/patient")}
        >
          Back
        </button>

        <div className="flex gap-4">
          <button
            className="text-[#1E318A]"
            onClick={() => navigate("/patientboard")}
          >
            Skip for now
          </button>
          <button
            className={`px-4 py-2 rounded text-white ${
              Object.keys(validate()).length > 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-900"
            }`}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
