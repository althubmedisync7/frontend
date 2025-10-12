import React, { useState } from 'react';
import logo from "../assets/public/auth-logo.png";
import authWriteup from "../assets/public/logo-writeup.png";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = "https://api.tnkma.com.ng";
const API_ENDPOINT = `${API_BASE_URL}/Admin/`;

const AdminSignup = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    hospitalName: '',
    address: '',
    city: '',
    state: '',
    country: '',
    specialization: '',
    department: '',
    yearsOfExperience: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    displayName: '',
    authorizedToApprove: '',
    password: '',
    adminVerificationCode: '',
    dateOfBirth: '',
    gender: 'N/A',
    agreeToPolicies: false,
    confirmDataHandling: false,
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: '',
      }));
    }
    if (apiError) {
      setApiError(null);
    }
  };

  const handleLogin = () => {
    navigate("/auth/admin-login");
  };

  const validateStep1 = () => {
    const validationErrors = {};
    if (!formData.hospitalName) validationErrors.hospitalName = 'Hospital/Organization Name is required.';
    if (!formData.address) validationErrors.address = 'Address is required.';
    if (!formData.city) validationErrors.city = 'City is required.';
    if (!formData.state) validationErrors.state = 'State is required.';
    if (!formData.country) validationErrors.country = 'Country is required.';
    if (!formData.specialization) validationErrors.specialization = 'Specialization is required.';
    if (!formData.department) validationErrors.department = 'Department is required.';
    if (!formData.yearsOfExperience) {
      validationErrors.yearsOfExperience = 'Years of Experience is required.';
    } else if (isNaN(formData.yearsOfExperience) || formData.yearsOfExperience < 0) {
      validationErrors.yearsOfExperience = 'Please enter a valid number.';
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const validateStep2 = () => {
    const validationErrors = {};
    if (!formData.fullName) validationErrors.fullName = 'Full Name is required.';
    if (!formData.email) {
      validationErrors.email = 'Email Address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = 'Email address is invalid.';
    }
    if (!formData.phoneNumber) validationErrors.phoneNumber = 'Phone Number is required.';
    if (!formData.displayName) validationErrors.displayName = 'Display Name is required.';
    if (!formData.authorizedToApprove) validationErrors.authorizedToApprove = 'This field is required.';
    if (!formData.dateOfBirth) validationErrors.dateOfBirth = 'Date of Birth is required.';
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const validateStep3 = () => {
    const validationErrors = {};
    if (!formData.password) {
      validationErrors.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      validationErrors.password = 'Password must be at least 8 characters.';
    }
    if (!formData.adminVerificationCode) validationErrors.adminVerificationCode = 'Admin Verification Code is required.';
    if (!formData.agreeToPolicies) validationErrors.agreeToPolicies = 'You must agree to the policies.';
    if (!formData.confirmDataHandling) validationErrors.confirmDataHandling = 'You must confirm your roles.';
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const buildRequestBody = () => {
    return {
      full_name: formData.fullName,
      date_of_birth: formData.dateOfBirth,
      gender: formData.gender,
      phone_number: formData.phoneNumber,
      address: {
        street: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
      },
      hospital: formData.hospitalName,
      years_of_experience: parseInt(formData.yearsOfExperience, 10),
      department: formData.department,
      job_title: formData.specialization,
      do_you_approve_new_staff_registration: formData.authorizedToApprove === 'yes',
      display_name: formData.displayName,
      admin_verification_code: formData.adminVerificationCode,
      user: {
        email: formData.email,
        password: formData.password,
      },
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);

    if (!validateStep3()) {
      return;
    }

    setIsLoading(true);

    try {
      const requestBody = buildRequestBody();
      console.log('Sending API Request Body:', requestBody);

      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Signup failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Admin Signup Success:', data);
      alert('Admin Signup complete! Redirecting to login...');
      navigate("/auth/admin-login");

    } catch (error) {
      console.error('Admin Signup API Error:', error);
      setApiError(error.message || 'An unexpected error occurred during sign up.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className='w-full space-y-6'>
              <div className='w-full'>
                <label htmlFor="hospitalName" className="block text-sm font-semibold text-gray-700 mb-1 text-left">Hospital/Organization Name <span className="text-red-500">*</span></label>
                <input
                  type="text" id="hospitalName" name="hospitalName" value={formData.hospitalName} onChange={handleChange}
                  placeholder="Name of affiliated hospital or organization"
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.hospitalName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.hospitalName && <p className="text-red-500 text-sm mt-1">{errors.hospitalName}</p>}
              </div>
              <div className='w-full'>
                <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-1 text-left">Address <span className="text-red-500">*</span></label>
                <input
                  type="text" id="address" name="address" value={formData.address} onChange={handleChange}
                  placeholder="Enter your work address"
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>
              <div className='flex flex-col md:flex-row gap-4 w-full'>
                <div className='w-full md:w-1/3'>
                  <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-1 text-left">City <span className="text-red-500">*</span></label>
                  <input
                    type="text" id="city" name="city" value={formData.city} onChange={handleChange}
                    placeholder="e.g Lekki"
                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>
                <div className='w-full md:w-1/3'>
                  <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-1 text-left">State <span className="text-red-500">*</span></label>
                  <input
                    type="text" id="state" name="state" value={formData.state} onChange={handleChange}
                    placeholder="e.g Lagos"
                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                </div>
                <div className='w-full md:w-1/3'>
                  <label htmlFor="country" className="block text-sm font-semibold text-gray-700 mb-1 text-left">Country <span className="text-red-500">*</span></label>
                  <input
                    type="text" id="country" name="country" value={formData.country} onChange={handleChange}
                    placeholder="e.g Nigeria"
                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                </div>
              </div>
              <div className='w-full'>
                <label htmlFor="specialization" className="block text-sm font-semibold text-gray-700 mb-1 text-left">Specialization <span className="text-red-500">*</span></label>
                <input
                  type="text" id="specialization" name="specialization" value={formData.specialization} onChange={handleChange}
                  placeholder="Enter your role"
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.specialization ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.specialization && <p className="text-red-500 text-sm mt-1">{errors.specialization}</p>}
              </div>
              <div className='w-full'>
                <label htmlFor="department" className="block text-sm font-semibold text-gray-700 mb-1 text-left">Department <span className="text-red-500">*</span></label>
                <input
                  type="text" id="department" name="department" value={formData.department} onChange={handleChange}
                  placeholder="e.g. Pediatrics"
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.department ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
              </div>
              <div className='w-full'>
                <label htmlFor="yearsOfExperience" className="block text-sm font-semibold text-gray-700 mb-1 text-left">Years of Experience <span className="text-red-500">*</span></label>
                <input
                  type="number" id="yearsOfExperience" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange}
                  placeholder="Enter a number"
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.yearsOfExperience ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.yearsOfExperience && <p className="text-red-500 text-sm mt-1">{errors.yearsOfExperience}</p>}
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className='w-full space-y-6'>
              <div className='w-full'>
                <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-1 text-left">Full Name <span className="text-red-500">*</span></label>
                <input
                  type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>

              <div className='w-full'>
                <label htmlFor="dateOfBirth" className="block text-sm font-semibold text-gray-700 mb-1 text-left">Date of Birth <span className="text-red-500">*</span></label>
                <input
                  type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
              </div>

              <div className='w-full'>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1 text-left">Email Address <span className="text-red-500">*</span></label>
                <input
                  type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                  placeholder="Enter your work email address"
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div className='w-full'>
                <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-1 text-left">Phone Number <span className="text-red-500">*</span></label>
                <input
                  type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}
                  placeholder="Enter your phone number"
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
              </div>
              <div className='w-full'>
                <label htmlFor="displayName" className="block text-sm font-semibold text-gray-700 mb-1 text-left">Display Name <span className="text-red-500">*</span></label>
                <input
                  type="text" id="displayName" name="displayName" value={formData.displayName} onChange={handleChange}
                  placeholder="For internal use only"
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.displayName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.displayName && <p className="text-red-500 text-sm mt-1">{errors.displayName}</p>}
              </div>
              <div className="w-full">
                <label
                  htmlFor="authorizedToApprove"
                  className="block text-sm font-semibold text-gray-700 mb-2 text-left"
                >
                  Do you approve new staff registration? <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <select
                    id="authorizedToApprove"
                    name="authorizedToApprove"
                    value={formData.authorizedToApprove}
                    onChange={handleChange}
                    className={`w-full appearance-none bg-white px-4 py-3 pr-10 border rounded-lg shadow-sm text-gray-700 
                      focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-all duration-200
                      ${errors.authorizedToApprove ? 'border-red-500' : 'border-gray-300'}
                    `}
                    required
                  >
                    <option value="" disabled>
                      Select your option
                    </option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>

                  <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
                    ▼
                  </span>
                </div>

                {errors.authorizedToApprove && (
                  <p className="text-red-500 text-sm mt-1">{errors.authorizedToApprove}</p>
                )}
              </div>

            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className='w-full space-y-6'>
              <div className='w-full'>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1 text-left">Password <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input
                    type="password" id="password" name="password" value={formData.password} onChange={handleChange}
                    placeholder="Create a password"
                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  <span className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer">
                    <i className="fas fa-eye"></i>
                  </span>
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                <p className="text-sm text-gray-500 mt-1">Password must be at least 8 characters and must include alphanumeric characters and numbers.</p>
              </div>
              <div className='w-full'>
                <label htmlFor="adminVerificationCode" className="block text-sm font-semibold text-gray-700 mb-1 text-left">Admin Verification Code <span className="text-red-500">*</span></label>
                <input
                  type="text" id="adminVerificationCode" name="adminVerificationCode" value={formData.adminVerificationCode} onChange={handleChange}
                  placeholder="To be provided by MediSync"
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.adminVerificationCode ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.adminVerificationCode && <p className="text-red-500 text-sm mt-1">{errors.adminVerificationCode}</p>}
              </div>
              <div className='space-y-4'>
                <div className='flex items-center gap-2.5'>
                  <input
                    type="checkbox" id="agreeToPolicies" name="agreeToPolicies" checked={formData.agreeToPolicies} onChange={handleChange}
                    className="accent-[#1E318A] h-4 w-4"
                  />
                  <label htmlFor="agreeToPolicies" className="text-[12px] font-semibold text-gray-700">I agree to the Terms of Service & Privacy Policy.</label>
                </div>
                {errors.agreeToPolicies && <p className="text-red-500 text-sm mt-1">{errors.agreeToPolicies}</p>}
                <div className='flex items-center gap-2.5'>
                  <input
                    type="checkbox" id="confirmDataHandling" name="confirmDataHandling" checked={formData.confirmDataHandling} onChange={handleChange}
                    className="accent-[#1E318A] h-4 w-4"
                  />
                  <label htmlFor="confirmDataHandling" className="text-[12px] font-semibold text-gray-700">I understand my roles includes handling sensitive patient data responsibly.</label>
                </div>
                {errors.confirmDataHandling && <p className="text-red-500 text-sm mt-1">{errors.confirmDataHandling}</p>}
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (step) {
      case 1:
        return "You have a few steps to go!";
      case 2:
        return "You have one more step to go!";
      case 3:
        return "You are almost there!";
      default:
        return "";
    }
  };

  const getSubtitle = () => {
    return "You are signing up as an Admin.";
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className='flex-1 flex justify-center items-center py-5 px-4'>
      <div className='w-full md:w-[90%] flex flex-col items-center gap-4'>
        <div className='w-full flex flex-col items-center gap-4 text-center'>
          <div className='w-full flex items-center h-[10%] relative'>
            <button
              className="absolute left-0 flex items-center text-gray-700 z-10"
            >
              <IoChevronBackCircleOutline className='text-[30px] cursor-pointer' onClick={handleBack} />
            </button>
            <div className='flex items-center gap-2.5 mx-auto'>
              <div className='w-[50px] h-[50px]'>
                <img src={logo} alt="" className='w-full h-full object-contain' />
              </div>
              <div className='w-[80px] h-[80px]'>
                <img src={authWriteup} alt="" className='w-full h-full object-contain' />
              </div>
            </div>
          </div>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-semibold text-[#333333] mt-8'>
            {getTitle()}
          </h2>
          <h4 className='text-sm sm:text-base font-[500]'>
            {getSubtitle()}
            <p className="mt-2 text-center text-gray-600">
              Manage test orders, upload results instantly, and ensure doctors and patients get accurate reports without delays.
            </p>
          </h4>
          <h4 className='text-sm sm:text-base font-[500]'>
            That’s not who you are? <span className='font-bold text-[#1E318A] cursor-pointer' onClick={handleGoBack}>Change your selection.</span>
          </h4>
        </div>
        <form className='w-full max-w-2xl mt-8' onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
          {renderStepContent()}
          {apiError && (
            <p className="text-red-500 text-sm font-semibold mt-4 p-2 bg-red-100 border border-red-500 rounded text-center">
              {apiError}
            </p>
          )}
          <div className='flex items-center gap-2.5 justify-center mt-8'>
            <div className={`w-[10px] h-[10px] rounded-full ${step === 1 ? 'bg-[#1E318A]' : 'bg-[#C1C1C1]'}`}></div>
            <div className={`w-[10px] h-[10px] rounded-full ${step === 2 ? 'bg-[#1E318A]' : 'bg-[#C1C1C1]'}`}></div>
            <div className={`w-[10px] h-[10px] rounded-full ${step === 3 ? 'bg-[#1E318A]' : 'bg-[#C1C1C1]'}`}></div>
          </div>
          <div className='mt-8'>
            <button
              type="submit"
              className="w-full py-3 text-lg font-semibold text-white bg-[#1E318A] rounded-md hover:bg-[#2941AB] transition-colors disabled:bg-gray-400"
              disabled={isLoading}
            >
              {isLoading ? 'Signing Up...' : step < 3 ? 'Next' : 'Sign Up'}
            </button>
          </div>
        </form>
        <p className='text-center mt-4 text-sm font-medium'>
          Already created an account? <span className='text-[#1E318A] font-bold cursor-pointer' onClick={handleLogin}>Log in</span>
        </p>
      </div>
    </div >
  );
};

export default AdminSignup;