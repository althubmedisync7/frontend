import React, { useState } from 'react';
import logo from "../assets/public/auth-logo.png";
import authWriteup from "../assets/public/logo-writeup.png";
import { IoChevronBackCircleOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PatientSignup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    phoneNumber: '',
    homeAddress: '',
    city: '',
    state: '',
    country: '',
    emergencyContactName: '',
    emergencyContactRelationship: '',
    emergencyContactPhone: '',
    medicalNumber: '',
    password: '',
    agreeToHealthRecords: false,
    agreeToDataSharing: false,
  });
  console.log(formData)
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  const validateStep1 = () => {
    const validationErrors = {};
    if (!formData.fullName) validationErrors.fullName = 'Full Name is required.';
    if (!formData.dateOfBirth) validationErrors.dateOfBirth = 'Date of Birth is required.';
    if (!formData.gender) validationErrors.gender = 'Gender is required.';
    if (!formData.email) {
      validationErrors.email = 'Email Address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = 'Email address is invalid.';
    }
    if (!formData.phoneNumber) validationErrors.phoneNumber = 'Phone Number is required.';

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const validateStep2 = () => {
    const validationErrors = {};
    if (!formData.homeAddress) validationErrors.homeAddress = 'Home Address is required.';
    if (!formData.city) validationErrors.city = 'City is required.';
    if (!formData.state) validationErrors.state = 'State is required.';
    if (!formData.country) validationErrors.country = 'Country is required.';
    if (!formData.emergencyContactName) validationErrors.emergencyContactName = 'Emergency Contact Name is required.';
    if (!formData.emergencyContactRelationship) validationErrors.emergencyContactRelationship = 'Relationship is required.';
    if (!formData.emergencyContactPhone) validationErrors.emergencyContactPhone = 'Phone Number is required.';
    if (!formData.medicalNumber) validationErrors.medicalNumber = 'Medical/Record Number is required.';
    if (!formData.password) {
      validationErrors.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      validationErrors.password = 'Password must be at least 8 characters.';
    }
    if (!formData.agreeToHealthRecords) validationErrors.agreeToHealthRecords = 'You must agree to this to continue.';
    if (!formData.agreeToDataSharing) validationErrors.agreeToDataSharing = 'You must agree to this to continue.';

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
    }
  };

  const API_BASE_URL = "https://api.tnkma.com.ng"


  const encodeFormData = (data) => {
    const params = new URLSearchParams();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        params.append(key, data[key]);
      }
    }
    return params.toString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateStep2()) {
      const flatDataToSend = {
        full_name: formData.fullName,
        date_of_birth: formData.dateOfBirth,
        gender: formData.gender,
        phone_number: formData.phoneNumber,
        address_street: formData.homeAddress,
        address_city: formData.city,
        address_state: formData.state,
        address_country: formData.country,
        emergency_contact: formData.emergencyContactName,
        relationship: formData.emergencyContactRelationship,
        location: `${formData.city}, ${formData.state}, ${formData.country}`,
        emergency_phone_number: formData.emergencyContactPhone,
        medical_record_number: formData.medicalNumber,
        email: formData.email,
        password: formData.password
      };

      try {
        const encodedBody = encodeFormData(flatDataToSend);

        const response = await fetch(
          `${API_BASE_URL}/Patient/`,
          {
            method: 'POST',
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: encodedBody,
          }
        );

        if (!response.ok) {
          let errorData;
          try {
            errorData = await response.json();
          } catch (e) {
            errorData = await response.text();
          }
          throw new Error(JSON.stringify(errorData));
        }

        const responseData = await response.json();
        console.log(responseData);
        navigate("/auth/patient-login")

      } catch (error) {
        try {
          const errorDetails = JSON.parse(error.message);
          console.error("Error response data:", errorDetails);
        } catch (e) {
          console.error("Error:", error.message);
        }
      }
    }
  };



  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const navigate = useNavigate()
  const handleGoBack = () => {
    navigate(-1)
  }

  const handleLogin = () => {
    navigate("/auth/patient-login")
  }

  return (
    <div className='flex-1 flex justify-center items-center py-5 px-4'>
      <div className='w-full max-w-4xl flex flex-col items-center gap-4'>
        <div className='w-full flex flex-col items-center gap-4 text-center'>
          <div className='flex items-center justify-between w-full h-10 relative'>
            <button
              onClick={handleBack}
              className="absolute left-0 flex items-center text-gray-700 z-10"
            >
              <IoChevronBackCircleOutline className='text-[30px] cursor-pointer' />
            </button>
            <div className='flex items-center gap-2.5 mx-auto'>
              <div className='w-[40px] h-[40px] md:w-[50px] md:h-[50px]'>
                <img src={logo} alt="Logo" className='w-full h-full object-contain' />
              </div>
              <div className='w-[80px] h-[80px] sm:block'>
                <img src={authWriteup} alt="MediSync" className='w-full h-full object-contain' />
              </div>
            </div>
          </div>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-semibold text-[#333333] mt-8'>
            You have a few steps to go!
          </h2>
          <h4 className='text-sm sm:text-base font-[500]'>
            You are signing up as a patient.
          </h4>
          <h4 className='text-sm sm:text-base font-[500]'>
            That’s not who you are? <span className='font-bold text-[#1E318A] cursor-pointer' onClick={handleGoBack}>Change your selection.</span>
          </h4>
        </div>

        <div className='w-[95%]  mt-8'>
          {step === 1 && (
            <div className='w-full space-y-6'>
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-1 text-left">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g Rebecca Omobolanle Ajao"
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-semibold text-gray-700 mb-1 text-left">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  placeholder="DD/MM/YYYY"
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
              </div>
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
                                bg-white text-gray-800`
                    }
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

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1 text-left">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-1 text-left">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
              </div>

              <div className='flex items-center gap-2.5 justify-center mt-8'>
                <div className='w-[10px] h-[10px] bg-[#1E318A] rounded-full'></div>
                <div className='w-[10px] h-[10px] bg-[#C1C1C1] rounded-full'></div>
              </div>

              <div className='mt-8'>
                <button
                  type="submit"
                  onClick={handleNextStep}
                  className="w-full py-3 text-lg font-semibold text-white bg-[#1E318A] rounded-md hover:bg-[#2941AB] transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className='w-full space-y-6'>
              <div>
                <label htmlFor="homeAddress" className="block text-sm font-semibold text-gray-700 mb-1 text-left">
                  Home Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="homeAddress"
                  name="homeAddress"
                  value={formData.homeAddress}
                  onChange={handleChange}
                  placeholder="Enter your home address"
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.homeAddress ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                {errors.homeAddress && <p className="text-red-500 text-sm mt-1">{errors.homeAddress}</p>}
              </div>
              <div className='flex flex-col sm:flex-row gap-4'>
                <div className='w-full sm:w-1/2'>
                  <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-1 text-left">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g Lekki"
                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>
                <div className='w-full sm:w-1/2'>
                  <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-1 text-left">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="e.g Lagos"
                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                </div>
                <div className='w-full sm:w-1/2'>
                  <label htmlFor="country" className="block text-sm font-semibold text-gray-700 mb-1 text-left">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="e.g Nigeria"
                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="emergencyContactName" className="block text-sm font-semibold text-gray-700 mb-1 text-left">
                  Emergency Contact <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="emergencyContactName"
                  name="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={handleChange}
                  placeholder="Enter the name of your trusted person"
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.emergencyContactName ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                {errors.emergencyContactName && <p className="text-red-500 text-sm mt-1">{errors.emergencyContactName}</p>}
              </div>
              <div className='flex flex-col sm:flex-row gap-4'>
                <div className='w-full sm:w-1/2'>
                  <label htmlFor="emergencyContactRelationship" className="block text-sm font-semibold text-gray-700 mb-1 text-left">
                    Relationship <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="emergencyContactRelationship"
                    name="emergencyContactRelationship"
                    value={formData.emergencyContactRelationship}
                    onChange={handleChange}
                    placeholder="e.g. Mother"
                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.emergencyContactRelationship ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors.emergencyContactRelationship && <p className="text-red-500 text-sm mt-1">{errors.emergencyContactRelationship}</p>}
                </div>
                <div className='w-full sm:w-1/2'>
                  <label htmlFor="emergencyContactPhone" className="block text-sm font-semibold text-gray-700 mb-1 text-left">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="emergencyContactPhone"
                    name="emergencyContactPhone"
                    value={formData.emergencyContactPhone}
                    onChange={handleChange}
                    placeholder="Enter the number"
                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.emergencyContactPhone ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors.emergencyContactPhone && <p className="text-red-500 text-sm mt-1">{errors.emergencyContactPhone}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="medicalNumber" className="block text-sm font-semibold text-gray-700 mb-1 text-left">
                  Medical/Recent Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="medicalNumber"
                  name="medicalNumber"
                  value={formData.medicalNumber}
                  onChange={handleChange}
                  placeholder="Hospital name - Number"
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.medicalNumber ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                {errors.medicalNumber && <p className="text-red-500 text-sm mt-1">{errors.medicalNumber}</p>}
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1 text-left">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                <p className="text-sm text-gray-500 mt-1">Password must be at least 8 characters and must include alphanumeric characters and numbers.</p>
              </div>
              <div className='space-y-4'>
                <div className='flex items-center gap-2.5'>
                  <input
                    type="checkbox"
                    id="agreeToHealthRecords"
                    name="agreeToHealthRecords"
                    checked={formData.agreeToHealthRecords}
                    onChange={handleChange}
                    className="accent-[#1E318A] h-4 w-4"
                    required
                  />
                  <label htmlFor="agreeToHealthRecords" className="text-[12px] sm:text-sm font-semibold text-gray-700">I agree to allow my health records to be digitally stored and synced within MediSync.</label>
                  {errors.agreeToHealthRecords && <p className="text-red-500 text-sm mt-1">{errors.agreeToHealthRecords}</p>}
                </div>
                <div className='flex items-center gap-2.5'>
                  <input
                    type="checkbox"
                    id="agreeToDataSharing"
                    name="agreeToDataSharing"
                    checked={formData.agreeToDataSharing}
                    onChange={handleChange}
                    className="accent-[#1E318A] h-6 w-6"
                    required
                  />
                  <label htmlFor="agreeToDataSharing" className="text-[12px] sm:text-sm font-semibold text-gray-700">I understand that my data will only be shared with other hospitals or healthcare providers after I give approval for each individual request.</label>
                  {errors.agreeToDataSharing && <p className="text-red-500 text-sm mt-1">{errors.agreeToDataSharing}</p>}
                </div>
              </div>

              <div className='flex items-center gap-2.5 justify-center mt-8'>
                <div className='w-[10px] h-[10px] border-2 border-[#C1C1C1] rounded-full'></div>
                <div className='w-[10px] h-[10px] bg-[#1E318A] rounded-full'></div>
              </div>

              <div className='mt-8'>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full py-3 text-lg font-semibold text-white bg-[#1E318A] rounded-md hover:bg-[#2941AB] transition-colors"
                >
                  Finish Signup
                </button>
              </div>
            </div>
          )}
        </div>
        <p className='text-center mt-4 text-sm font-medium'>
          Already created an account? <span className='text-[#1E318A] font-bold cursor-pointer' onClick={handleLogin}>Log in</span>
        </p>
      </div>
    </div>
  );
};

export default PatientSignup;