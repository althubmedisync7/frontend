import React, { useState } from 'react';
import { IoChevronBackCircleOutline } from 'react-icons/io5';
import logo from "../assets/public/auth-logo.png";
import authWriteup from "../assets/public/logo-writeup.png";
import { useNavigate } from 'react-router-dom';

const LabTechSignup = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    department: '',
    authorizedToUpdate: '',
    displayName: '',
    hospitalName: '',
    address: '',
    city: '',
    state: '',
    country: '',
    specialization: '',
    medicalLicenseNumber: '',
    yearsOfExperience: '',
    professionalId: null,
    password: '',
    agreeToPolicies: false,
    confirmAccuracy: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : (type === 'file' ? files[0] : value),
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
    if (!formData.hospitalName) validationErrors.hospitalName = 'Hospital/Laboratory Name is required.';
    if (!formData.address) validationErrors.address = 'Address is required.';
    if (!formData.city) validationErrors.city = 'City is required.';
    if (!formData.state) validationErrors.state = 'State is required.';
    if (!formData.country) validationErrors.country = 'Country is required.';
    if (!formData.specialization) validationErrors.specialization = 'Specialization is required.';
    if (!formData.medicalLicenseNumber) validationErrors.medicalLicenseNumber = 'Medical License Number is required.';
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
    if (!formData.department) validationErrors.department = 'Department is required.';
    if (!formData.authorizedToUpdate) validationErrors.authorizedToUpdate = 'This field is required.';
    if (!formData.displayName) validationErrors.displayName = 'Display Name is required.';
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const validateStep3 = () => {
    const validationErrors = {};
    if (!formData.professionalId) validationErrors.professionalId = 'Professional ID is required.';
    if (!formData.password) {
      validationErrors.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      validationErrors.password = 'Password must be at least 8 characters.';
    }
    if (!formData.agreeToPolicies) validationErrors.agreeToPolicies = 'You must agree to the policies.';
    if (!formData.confirmAccuracy) validationErrors.confirmAccuracy = 'You must confirm the information is accurate.';
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
      console.log('Final Form Data:', formData);
      alert('Signup complete!');
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className='w-full space-y-6'>
              <div className='w-full'>
                <label htmlFor="hospitalName" className="block text-sm font-semibold text-gray-700 mb-1 text-left">Hospital/Laboratory Name <span className="text-red-500">*</span></label>
                <input
                  type="text" id="hospitalName" name="hospitalName" value={formData.hospitalName} onChange={handleChange}
                  placeholder="Name of affiliated hospital or laboratory"
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
                <label htmlFor="medicalLicenseNumber" className="block text-sm font-semibold text-gray-700 mb-1 text-left">Medical License Number <span className="text-red-500">*</span></label>
                <input
                  type="text" id="medicalLicenseNumber" name="medicalLicenseNumber" value={formData.medicalLicenseNumber} onChange={handleChange}
                  placeholder="Enter your license number"
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.medicalLicenseNumber ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.medicalLicenseNumber && <p className="text-red-500 text-sm mt-1">{errors.medicalLicenseNumber}</p>}
              </div>
              <div className='w-full'>
                <label htmlFor="yearsOfExperience" className="block text-sm font-semibold text-gray-700 mb-1 text-left">Years of Experience</label>
                <input
                  type="text" id="yearsOfExperience" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange}
                  placeholder="Enter your years of experience"
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors border-gray-300"
                />
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
              <div className="w-full">
                <label
                  htmlFor="department"
                  className="block text-sm font-semibold text-gray-700 mb-2 text-left"
                >
                  Which department do you work for? <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className={`w-full appearance-none bg-white px-4 py-3 pr-10 border rounded-lg shadow-sm text-gray-700 
                      focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-all duration-200
                      ${errors.department ? 'border-red-500' : 'border-gray-300'}
                    `}
                    required
                  >
                    <option value="" disabled>
                      Select your department
                    </option>
                    <option value="pathology">Pathology</option>
                    <option value="radiology">Radiology</option>
                    <option value="cardiology">Cardiology</option>
                  </select>

                  <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
                    ▼
                  </span>
                </div>

                {errors.department && (
                  <p className="text-red-500 text-sm mt-1">{errors.department}</p>
                )}
              </div>

              <div className="w-full">
                <label
                  htmlFor="authorizedToUpdate"
                  className="block text-sm font-semibold text-gray-700 mb-2 text-left"
                >
                  Are you authorized to update patient's test results? <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <select
                    id="authorizedToUpdate"
                    name="authorizedToUpdate"
                    value={formData.authorizedToUpdate}
                    onChange={handleChange}
                    className={`w-full appearance-none bg-white px-4 py-3 pr-10 border rounded-lg shadow-sm text-gray-700 
                      focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-all duration-200
                      ${errors.authorizedToUpdate ? 'border-red-500' : 'border-gray-300'}
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

                {errors.authorizedToUpdate && (
                  <p className="text-red-500 text-sm mt-1">{errors.authorizedToUpdate}</p>
                )}
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
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className='w-full space-y-6'>
              <div className='w-full'>
                <label htmlFor="professionalId" className="block text-sm font-semibold text-gray-700 mb-1 text-left">Upload Professional ID <span className="text-red-500">*</span></label>
                <div className={`border-2 border-dashed rounded-md p-6 text-center ${errors.professionalId ? 'border-red-500' : 'border-gray-300'}`}>
                  <input
                    type="file" id="professionalId" name="professionalId" onChange={handleChange}
                    className="hidden"
                  />
                  <label htmlFor="professionalId" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <span className="text-3xl text-gray-400">📄</span>
                      <p className="mt-2 text-sm text-gray-600">Drag & drop or <span className="text-[#1E318A] font-medium">Choose File</span> to upload</p>
                      <p className="text-xs text-gray-400">Minimum file size: 10KB</p>
                    </div>
                  </label>
                  {formData.professionalId && <p className="text-sm mt-2 text-gray-500">{formData.professionalId.name}</p>}
                </div>
                {errors.professionalId && <p className="text-red-500 text-sm mt-1">{errors.professionalId}</p>}
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
              <div className='space-y-4'>
                <div className='flex items-center gap-2.5'>
                  <input
                    type="checkbox" id="agreeToPolicies" name="agreeToPolicies" checked={formData.agreeToPolicies} onChange={handleChange}
                    className="accent-[#1E318A] h-4 w-4"
                  />
                  <label htmlFor="agreeToPolicies" className="text-[12px] font-semibold text-gray-700">Do you agree to comply with MediSync’s data privacy and handling policies?</label>
                </div>
                {errors.agreeToPolicies && <p className="text-red-500 text-sm mt-1">{errors.agreeToPolicies}</p>}
                <div className='flex items-center gap-2.5'>
                  <input
                    type="checkbox" id="confirmAccuracy" name="confirmAccuracy" checked={formData.confirmAccuracy} onChange={handleChange}
                    className="accent-[#1E318A] h-4 w-4"
                  />
                  <label htmlFor="confirmAccuracy" className="text-[12px] font-semibold text-gray-700">I confirm that all information provided is accurate and up to date.</label>
                </div>
                {errors.confirmAccuracy && <p className="text-red-500 text-sm mt-1">{errors.confirmAccuracy}</p>}
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
    return "You are signing up as a Lab Technician.";
  };

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleLogin = () => {
    navigate("/auth/labtech-login")
  }

  return (
    <div className='flex-1 flex justify-center items-center py-5 px-4'>
      <div className='w-full md:w-[90%] flex flex-col items-center gap-4'>
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

export default LabTechSignup;
