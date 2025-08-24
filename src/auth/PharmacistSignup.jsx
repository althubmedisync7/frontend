import React, { useState } from 'react';
import logo from "../assets/public/auth-logo.png";
import authWriteup from "../assets/public/logo-writeup.png";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const PharmacistSignup = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    pharmacyName: '',
    hospitalName: '',
    hospitalID: '',
    address: '',
    city: '',
    state: '',
    country: '',
    departmentType: '',
    keyContactPerson: '',
    position: '',
    emailAddress: '',
    phoneNumber: '',
    numberOfStaff: '',
    dispensingScope: '',
    displayName: '',
    password: '',
    verificationCode: '',
    agreeToPolicies: false,
    confirmRegulations: false,
  });
  const [errors, setErrors] = useState({});

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
  };

  const validateStep1 = () => {
    const validationErrors = {};
    if (!formData.pharmacyName) validationErrors.pharmacyName = 'Pharmacy Name is required.';
    if (!formData.hospitalName) validationErrors.hospitalName = 'Hospital Name is required.';
    if (!formData.hospitalID) validationErrors.hospitalID = 'Hospital ID is required.';
    if (!formData.address) validationErrors.address = 'Address is required.';
    if (!formData.city) validationErrors.city = 'City is required.';
    if (!formData.state) validationErrors.state = 'State is required.';
    if (!formData.country) validationErrors.country = 'Country is required.';
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const validateStep2 = () => {
    const validationErrors = {};
    if (!formData.departmentType) validationErrors.departmentType = 'Department Type is required.';
    if (!formData.keyContactPerson) validationErrors.keyContactPerson = 'Key Contact Person is required.';
    if (!formData.position) validationErrors.position = 'Position is required.';
    if (!formData.emailAddress) {
      validationErrors.emailAddress = 'Email Address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      validationErrors.emailAddress = 'Email address is invalid.';
    }
    if (!formData.phoneNumber) validationErrors.phoneNumber = 'Phone Number is required.';
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const validateStep3 = () => {
    const validationErrors = {};
    if (!formData.numberOfStaff) validationErrors.numberOfStaff = 'Number of Staff is required.';
    if (!formData.dispensingScope) validationErrors.dispensingScope = 'Dispensing Scope is required.';
    if (!formData.displayName) validationErrors.displayName = 'Display Name is required.';
    if (!formData.password) {
      validationErrors.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      validationErrors.password = 'Password must be at least 8 characters.';
    }
    if (!formData.verificationCode) validationErrors.verificationCode = 'Verification Code is required.';
    if (!formData.confirmRegulations) validationErrors.confirmRegulations = 'You must confirm the regulations.';
    if (!formData.agreeToPolicies) validationErrors.agreeToPolicies = 'You must agree to the policies.';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep3()) {
      console.log('Final Pharmacist Form Data:', formData);
      alert('Pharmacist Signup complete!');
    }
  };

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleLogin = () => {
    navigate("/auth/pharmacist-login")
  }
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className='w-full flex flex-col items-center gap-4 text-center'>
              <h2 className='text-2xl sm:text-3xl md:text-4xl font-semibold text-[#333333] '>
                You have a few steps to go!
              </h2>
              <h4 className='text-sm sm:text-base font-[500]'>
                Manage test orders, upload results instantly, and ensure doctors and patients get accurate reports without delays.
                <p>That’s not who you are? <span className='font-bold text-[#1E318A] cursor-pointer' onClick={handleGoBack}>Change your selection.</span></p>
              </h4>
            </div>
            <div className='w-full space-y-6 mt-8'>
              <div className='w-full'>
                <label htmlFor="pharmacyName" className="block text-sm font-semibold text-gray-700 mb-1 text-left">Pharmacy Name <span className="text-red-500">*</span></label>
                <input
                  type="text" id="pharmacyName" name="pharmacyName" value={formData.pharmacyName} onChange={handleChange}
                  placeholder="As registered in the hospital"
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.pharmacyName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.pharmacyName && <p className="text-red-500 text-sm mt-1">{errors.pharmacyName}</p>}
              </div>
              <div className='w-full'>
                <label htmlFor="hospitalName" className="block text-sm font-semibold text-gray-700 mb-1 text-left">Hospital Name <span className="text-red-500">*</span></label>
                <input
                  type="text" id="hospitalName" name="hospitalName" value={formData.hospitalName} onChange={handleChange}
                  placeholder="Name of affiliated hospital/clinic"
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.hospitalName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.hospitalName && <p className="text-red-500 text-sm mt-1">{errors.hospitalName}</p>}
              </div>
              <div className='w-full'>
                <label htmlFor="hospitalID" className="block text-sm font-semibold text-gray-700 mb-1 text-left">Hospital ID <span className="text-red-500">*</span></label>
                <input
                  type="text" id="hospitalID" name="hospitalID" value={formData.hospitalID} onChange={handleChange}
                  placeholder="Facility Registration Number"
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.hospitalID ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.hospitalID && <p className="text-red-500 text-sm mt-1">{errors.hospitalID}</p>}
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
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className='w-full flex flex-col items-center gap-4 text-center'>
              <h2 className='text-2xl sm:text-3xl md:text-4xl font-semibold text-[#333333] mt-8'>
                You have one more step to go!
              </h2>
              <h4 className='text-sm sm:text-base font-[500]'>
                Manage test orders, upload results instantly, and ensure doctors and patients get accurate reports without delays.
                <p>That’s not who you are? <span className='font-bold text-[#1E318A]'>Change your selection.</span></p>
              </h4>
            </div>
            <div className='w-full space-y-6 mt-8'>
              <div className="w-full">
                <label
                  htmlFor="departmentType"
                  className="block text-sm font-semibold text-gray-700 mb-2 text-left"
                >
                  Department Type <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <select
                    id="departmentType"
                    name="departmentType"
                    value={formData.departmentType}
                    onChange={handleChange}
                    className={`w-full appearance-none bg-white px-4 py-3 pr-10 border rounded-lg shadow-sm text-gray-700 
                      focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-all duration-200
                      ${errors.departmentType ? 'border-red-500' : 'border-gray-300'}
                    `}
                    required
                  >
                    <option value="" disabled>
                      Select your department type
                    </option>
                    <option value="in-house">In-house</option>
                    <option value="contracted">Contracted</option>
                  </select>

                  <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
                    ▼
                  </span>
                </div>

                {errors.departmentType && (
                  <p className="text-red-500 text-sm mt-1">{errors.departmentType}</p>
                )}
              </div>

              <div className='w-full'>
                <label htmlFor="keyContactPerson" className="block text-sm font-semibold text-gray-700 mb-1 text-left">Key Contact Person <span className="text-red-500">*</span></label>
                <input
                  type="text" id="keyContactPerson" name="keyContactPerson" value={formData.keyContactPerson} onChange={handleChange}
                  placeholder="Enter full name"
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.keyContactPerson ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.keyContactPerson && <p className="text-red-500 text-sm mt-1">{errors.keyContactPerson}</p>}
              </div>
              <div className="w-full">
                <label
                  htmlFor="position"
                  className="block text-sm font-semibold text-gray-700 mb-2 text-left"
                >
                  Position <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <select
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className={`w-full appearance-none bg-white px-4 py-3 pr-10 border rounded-lg shadow-sm text-gray-700 
                      focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-all duration-200
                      ${errors.position ? 'border-red-500' : 'border-gray-300'}
                    `}
                    required
                  >
                    <option value="" disabled>
                      Select position
                    </option>
                    <option value="Head of Pharmacy">Head of Pharmacy</option>
                    <option value="Pharmacist in Charge">Pharmacist in Charge</option>
                    <option value="Senior Pharmacist">Senior Pharmacist</option>
                    <option value="Other">Other</option>
                  </select>
                  <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
                    ▼
                  </span>
                </div>

                {errors.position && (
                  <p className="text-red-500 text-sm mt-1">{errors.position}</p>
                )}
              </div>

              <div className='w-full'>
                <label htmlFor="emailAddress" className="block text-sm font-semibold text-gray-700 mb-1 text-left">Email Address <span className="text-red-500">*</span></label>
                <input
                  type="email" id="emailAddress" name="emailAddress" value={formData.emailAddress} onChange={handleChange}
                  placeholder="Enter your official email address"
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.emailAddress ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.emailAddress && <p className="text-red-500 text-sm mt-1">{errors.emailAddress}</p>}
              </div>
              <div className='w-full'>
                <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-1 text-left">Phone Number <span className="text-red-500">*</span></label>
                <input
                  type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}
                  placeholder="Enter phone number"
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className='w-full flex flex-col items-center gap-4 text-center'>
              <h2 className='text-2xl sm:text-3xl md:text-4xl font-semibold text-[#333333] mt-8'>
                You are almost there!
              </h2>
              <h4 className='text-sm sm:text-base font-[500]'>
                You are signing up as a Pharmacist.
                <p>That’s not who you are? <span className='font-bold text-[#1E318A]'>Change your selection.</span></p>
              </h4>
            </div>
            <div className='w-full space-y-6 mt-8'>
              <div className="w-full">
                <label
                  htmlFor="numberOfStaff"
                  className="block text-sm font-semibold text-gray-700 mb-2 text-left"
                >
                  Number of Staff <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <select
                    id="numberOfStaff"
                    name="numberOfStaff"
                    value={formData.numberOfStaff}
                    onChange={handleChange}
                    className={`w-full appearance-none bg-white px-4 py-3 pr-10 border rounded-lg shadow-sm text-gray-700 
                      focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-all duration-200
                      ${errors.numberOfStaff ? 'border-red-500' : 'border-gray-300'}
                    `}
                    required
                  >
                    <option value="" disabled>
                      Select number of staff
                    </option>
                    <option value="1-5">1-5</option>
                    <option value="6-10">6-10</option>
                    <option value="11-20">11-20</option>
                    <option value="21+">21+</option>
                  </select>

                  <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
                    ▼
                  </span>
                </div>

                {errors.numberOfStaff && (
                  <p className="text-red-500 text-sm mt-1">{errors.numberOfStaff}</p>
                )}
              </div>

              <div className="w-full">
                <label
                  htmlFor="dispensingScope"
                  className="block text-sm font-semibold text-gray-700 mb-2 text-left"
                >
                  Dispensing Scope <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <select
                    id="dispensingScope"
                    name="dispensingScope"
                    value={formData.dispensingScope}
                    onChange={handleChange}
                    className={`w-full appearance-none bg-white px-4 py-3 pr-10 border rounded-lg shadow-sm text-gray-700 
                      focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-all duration-200
                      ${errors.dispensingScope ? 'border-red-500' : 'border-gray-300'}
                    `}
                    required
                  >
                    <option value="" disabled>
                      Select dispensing scope
                    </option>
                    <option value="In-Patient">In-Patient</option>
                    <option value="Out-Patient">Out-Patient</option>
                    <option value="Both">Both</option>
                  </select>

                  <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
                    ▼
                  </span>
                </div>

                {errors.dispensingScope && (
                  <p className="text-red-500 text-sm mt-1">{errors.dispensingScope}</p>
                )}
              </div>

              <div className='w-full'>
                <label htmlFor="displayName" className="block text-sm font-semibold text-gray-700 mb-1 text-left">Display Name <span className="text-red-500">*</span></label>
                <input
                  type="text" id="displayName" name="displayName" value={formData.displayName} onChange={handleChange}
                  placeholder="Department Account Username"
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.displayName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.displayName && <p className="text-red-500 text-sm mt-1">{errors.displayName}</p>}
              </div>
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
                <label htmlFor="verificationCode" className="block text-sm font-semibold text-gray-700 mb-1 text-left">Verification code <span className="text-red-500">*</span></label>
                <input
                  type="text" id="verificationCode" name="verificationCode" value={formData.verificationCode} onChange={handleChange}
                  placeholder="To be provided by MediSync"
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.verificationCode ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.verificationCode && <p className="text-red-500 text-sm mt-1">{errors.verificationCode}</p>}
              </div>
              <div className='space-y-4'>
                <div className='flex items-center gap-2.5'>
                  <input
                    type="checkbox" id="confirmRegulations" name="confirmRegulations" checked={formData.confirmRegulations} onChange={handleChange}
                    className="accent-[#1E318A] h-4 w-4"
                  />
                  <label htmlFor="confirmRegulations" className="text-[12px] font-semibold text-gray-700">I confirm that all dispensing activities comply with national pharmacy regulations.</label>
                </div>
                {errors.confirmRegulations && <p className="text-red-500 text-sm mt-1">{errors.confirmRegulations}</p>}
                <div className='flex items-center gap-2.5'>
                  <input
                    type="checkbox" id="agreeToPolicies" name="agreeToPolicies" checked={formData.agreeToPolicies} onChange={handleChange}
                    className="accent-[#1E318A] h-4 w-4"
                  />
                  <label htmlFor="agreeToPolicies" className="text-[12px] font-semibold text-gray-700">I agree to MediSync's Terms of Service & Data Privacy Policy.</label>
                </div>
                {errors.agreeToPolicies && <p className="text-red-500 text-sm mt-1">{errors.agreeToPolicies}</p>}
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className='flex-1 flex justify-center items-center py-5'>
      <div className='w-[90%] md:w-[60%] lg:w-[90%] flex flex-col items-center gap-4'>
        <div className='w-full flex items-center h-[10%] relative'>
          <button
            onClick={handleBack}
            className="absolute left-0 flex items-center text-gray-700 z-10"
          >
            <IoChevronBackCircleOutline className='text-[30px] cursor-pointer' />
          </button>
          <div className='flex items-center gap-2.5 mx-auto'>
            <div className='w-[50px] h-[50px]'>
              <img src={logo} alt="" className='w-full h-full object-contain' />
            </div>
            <div className='w-[80px] h-[50px]'>
              <img src={authWriteup} alt="" className='w-full h-full object-contain' />
            </div>
          </div>
        </div>
        <form className='w-full max-w-2xl ' onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
          {renderStepContent()}
          <div className='flex items-center gap-2.5 justify-center mt-8'>
            <div className={`w-[10px] h-[10px] rounded-full ${step === 1 ? 'bg-[#1E318A]' : 'bg-[#C1C1C1]'}`}></div>
            <div className={`w-[10px] h-[10px] rounded-full ${step === 2 ? 'bg-[#1E318A]' : 'bg-[#C1C1C1]'}`}></div>
            <div className={`w-[10px] h-[10px] rounded-full ${step === 3 ? 'bg-[#1E318A]' : 'bg-[#C1C1C1]'}`}></div>
          </div>
          <div className='mt-8'>
            <button
              type="submit"
              className="w-full py-3 text-lg font-semibold text-white bg-[#1E318A] rounded-md hover:bg-[#2941AB] transition-colors"
            >
              {step < 3 ? 'Next' : 'Sign Up'}
            </button>
          </div>
        </form>
        <p className='text-center mt-4 text-sm font-medium'>
          Already created an account? <span className='text-[#1E318A] font-bold cursor-pointer' onClick={handleLogin}>Log in</span>
        </p>
      </div>
    </div>
  );
};

export default PharmacistSignup;