import React, { useState } from 'react';
import logo from "../assets/public/auth-logo.png";
import authWriteup from "../assets/public/logo-writeup.png";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Spin } from 'antd';
import { toast } from 'react-toastify';
function DoctorSignup() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    hospital: '',
    specialization: '',
    license: '',
    experience: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  const handleLogin = () => {
    navigate("/auth/doctor-login");
  };

  const validateStep1 = () => {
    let validationErrors = {};
    if (!formData.hospital) validationErrors.hospital = 'Hospital/Clinic Name is required.';
    if (!formData.specialization) validationErrors.specialization = 'Specialization is required.';
    if (!formData.license) validationErrors.license = 'Medical License Number is required.';
    if (!formData.experience) validationErrors.experience = 'Years of Experience is required.';
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const validateStep2 = () => {
    let validationErrors = {};
    if (!formData.fullName) validationErrors.fullName = 'Full Name is required.';
    if (!formData.email) validationErrors.email = 'Email Address is required.';
    if (!formData.phoneNumber) validationErrors.phoneNumber = 'Phone Number is required.';
    if (!formData.password) validationErrors.password = 'Password is required.';
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleStep1Submit = () => {
    if (validateStep1()) setStep(2);
  };

  const handleStep2Submit = async () => {
    if (!validateStep2()) return;

    const payload = {
      hospital_name: formData.hospital,
      specialization: formData.specialization,
      medical_license_number: formData.license,
      years_of_experience: Number(formData.experience),
      full_name: formData.fullName,
      phone_number: formData.phoneNumber,
      user: {
        email: formData.email,
        password: formData.password,
      },
    };

    try {
      setLoading(true);
      const response = await axios.post("https://api.tnkma.com.ng/Doctor/", payload);
      console.log("Response:", response.data);
      toast.success("Signup successful!");
      navigate("/auth/doctor-login");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error("Signup failed. Please check your input and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className='flex-1 flex justify-center items-center py-5 px-4'>
      <div className='w-full md:w-full lg:w-[90%] flex flex-col items-center gap-4'>
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
            <div className='w-[80px] h-[80px]'>
              <img src={authWriteup} alt="" className='w-full h-full object-contain' />
            </div>
          </div>
        </div>

        <div className='w-full text-center mt-8'>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-semibold text-[#333333]'>You have a few steps to go!</h2>
          <h4 className='text-sm sm:text-base font-[500] mt-2'>You are signing up as a doctor.</h4>
          <h4 className='text-sm sm:text-base font-[500] mt-1'>
            That’s not who you are?{' '}
            <span className='font-bold text-[#1E318A] cursor-pointer' onClick={handleGoBack}>Change your selection.</span>
          </h4>
        </div>

        {step === 1 && (
          <div className='w-full space-y-6 mt-8'>
            <div>
              <label htmlFor="hospital" className="block text-sm font-semibold text-gray-700 mb-1 text-left">
                Hospital/Clinic Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="hospital"
                name="hospital"
                value={formData.hospital}
                onChange={handleChange}
                placeholder="Name of affiliated hospital or clinic"
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.hospital ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {errors.hospital && <p className="text-red-500 text-sm mt-1">{errors.hospital}</p>}
            </div>

            <div>
              <label htmlFor="specialization" className="block text-sm font-semibold text-gray-700 mb-1 text-left">
                Specialization <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                placeholder="e.g. cardiologist, general practitioner etc"
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.specialization ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {errors.specialization && <p className="text-red-500 text-sm mt-1">{errors.specialization}</p>}
            </div>

            <div>
              <label htmlFor="license" className="block text-sm font-semibold text-gray-700 mb-1 text-left">
                Medical License Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="license"
                name="license"
                value={formData.license}
                onChange={handleChange}
                placeholder="Enter your license number"
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.license ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {errors.license && <p className="text-red-500 text-sm mt-1">{errors.license}</p>}
            </div>

            <div>
              <label htmlFor="experience" className="block text-sm font-semibold text-gray-700 mb-1 text-left">
                Years of Experience <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Enter your years of experience"
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.experience ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
            </div>

            <div className='flex items-center gap-2.5 justify-center mt-8'>
              <div className='w-[10px] h-[10px] bg-[#1E318A] rounded-full'></div>
              <div className='w-[10px] h-[10px] bg-[#C1C1C1] rounded-full'></div>
            </div>
            <div className='mt-8'>
              <button
                type="button"
                onClick={handleStep1Submit}
                className="w-full py-3 text-lg font-semibold text-white bg-[#1E318A] rounded-md hover:bg-[#2941AB] transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className='w-full space-y-6 mt-8'>
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
                placeholder="Enter your full name"
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
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
                placeholder="Enter a strong password"
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div className='flex items-center gap-2.5 justify-center mt-8'>
              <div className='w-[10px] h-[10px] border-1 border-[#C1C1C1] rounded-full'></div>
              <div className='w-[10px] h-[10px] bg-[#1E318A] rounded-full'></div>
            </div>

            <div className='mt-8'>
              <button
                type="button"
                onClick={handleStep2Submit}
                disabled={loading}
                className="w-full py-3 text-lg font-semibold text-white bg-[#1E318A] rounded-md hover:bg-[#2941AB] transition-colors flex items-center justify-center"
              >
                {loading ? <Spin size="small" /> : 'Submit'}
              </button>
            </div>
          </div>
        )}
        <p className='text-center mt-4 text-sm font-medium'>
          Already created an account?{' '}
          <span className='text-[#1E318A] font-bold' onClick={handleLogin}>
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}

export default DoctorSignup;
