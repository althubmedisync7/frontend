import { useState, useEffect } from "react";

export default function PersonalDetails() {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    bloodGroup: "",
    genotype: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "",
    emergencyName: "",
    emergencyRelationship: "",
    emergencyPhone: "",
    emergencyEmail: "",
    emergencyAddress: "",
    emergencyCity: "",
    emergencyState: "",
    emergencyCountry: "",
    profileImage: null,
  });

  useEffect(() => {
    // Get saved personal details
    const savedData = localStorage.getItem("personalDetails");
    // Get signup data (if available)
    const signupData = localStorage.getItem("patientSignupInfo");

    if (savedData || signupData) {
      const parsedSaved = savedData ? JSON.parse(savedData) : {};
      const parsedSignup = signupData ? JSON.parse(signupData) : {};

      // Merge both — signup fills missing personal info fields
      setFormData((prev) => ({
        ...prev,
        ...parsedSignup,
        ...parsedSaved,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          [name]: reader.result,
        }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("personalDetails", JSON.stringify(formData));
    alert("Personal details saved successfully!");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border">
      <h2 className="text-lg font-semibold text-black mb-4">
        Personal Information
      </h2>
      <h2 className="text-lg font-semibold text-gray-600 mb-4">
        Personal Details
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile & Basic Info Layout */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center gap-5">
            <img
              src={formData.profileImage || "/profileImage.png"}
              alt="Profile"
              className="w-30 h-30 rounded-full object-cover border"
            />
            <label className="cursor-pointer bg-white text-blue-900 px-10 py-2 border border-blue-900 rounded-lg">
              Change
              <input
                type="file"
                name="profileImage"
                accept="image/*"
                className="hidden"
                onChange={handleChange}
              />
            </label>
          </div>

          {/* Name, DOB, Blood Group beside the image */}
          <div className="flex-1 gap-5">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 w-full"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">DOB</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 w-full"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Blood Group
              </label>
              <input
                type="text"
                name="bloodGroup"
                placeholder="O+"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 w-full"
              />
            </div>
          </div>
        </div>

        {/* Genotype & Gender */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Genotype</label>
            <input
              type="text"
              name="genotype"
              placeholder="AA"
              value={formData.genotype}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Gender</label>
            <input
              type="text"
              name="gender"
              placeholder="Female"
              value={formData.gender}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 w-full"
            />
          </div>
        </div>

        {/* Contact Details */}
        <div>
          <h3 className="font-medium text-gray-700 mb-2">Contact Details</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 w-full"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 w-full"
            />
            <input
              type="text"
              name="address"
              placeholder="Home Address"
              value={formData.address}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 w-full md:col-span-2"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 w-full"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 w-full"
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 w-full"
            />
          </div>
        </div>

        {/* Emergency Contact */}
        <div>
          <h3 className="font-medium text-gray-700 mb-2">Emergency Contact</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="emergencyName"
              placeholder="Name"
              value={formData.emergencyName}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 w-full"
            />
            <input
              type="text"
              name="emergencyRelationship"
              placeholder="Relationship"
              value={formData.emergencyRelationship}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 w-full"
            />
            <input
              type="text"
              name="emergencyPhone"
              placeholder="Phone Number"
              value={formData.emergencyPhone}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 w-full"
            />
            <input
              type="email"
              name="emergencyEmail"
              placeholder="Email Address"
              value={formData.emergencyEmail}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 w-full"
            />
            <input
              type="text"
              name="emergencyAddress"
              placeholder="Home Address"
              value={formData.emergencyAddress}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 w-full md:col-span-2"
            />
            <input
              type="text"
              name="emergencyCity"
              placeholder="City"
              value={formData.emergencyCity}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 w-full"
            />
            <input
              type="text"
              name="emergencyState"
              placeholder="State"
              value={formData.emergencyState}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 w-full"
            />
            <input
              type="text"
              name="emergencyCountry"
              placeholder="Country"
              value={formData.emergencyCountry}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 w-full"
            />
          </div>
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-800"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
