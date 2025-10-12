import React, { useState } from 'react';
import logo from "../assets/public/auth-logo.png";
import authWriteup from "../assets/public/logo-writeup.png";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    let validationErrors = {};
    if (!formData.email) {
      validationErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = 'Email address is invalid.';
    }
    if (!formData.password) {
      validationErrors.password = 'Password is required.';
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const toQueryString = (data) => {
    const params = new URLSearchParams();
    params.append('username', data.email);
    params.append('password', data.password);
    return params.toString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {

      const API_BASE_URL = "https://api.tnkma.com.ng";
      const LOGIN_ENDPOINT = `${API_BASE_URL}/login`;

      const requestBody = toQueryString(formData);

      try {
        const response = await fetch(LOGIN_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: requestBody,
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Admin Login successful!', data);
          alert('Admin login successful! Redirecting...');

          navigate('/admin');

        } else {
          const errorData = await response.json();
          console.error('Login failed:', errorData);
          alert(`Login failed: ${errorData.detail || 'Invalid username or password.'}`);
        }
      } catch (error) {
        console.error('Network Error:', error);
        alert('A network error occurred. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className='flex-1 flex justify-center items-center py-5 px-4'>
      <div className='w-full md:w-[60%] lg:w-[90%] flex flex-col items-center gap-4'>
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
        <div className='w-full text-center mt-8'>
          <h2 className='text-3xl sm:text-4xl font-semibold text-[#333333]'>Welcome back! (Admin)</h2>
          <p className='text-sm sm:text-base font-normal text-gray-700 mt-2'>Log in to your admin account via:</p>
        </div>

        <div className='w-full  space-y-4 mt-8'>
          <button className='w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-md text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors'>
            <FcGoogle className='text-[30px]' />
            Sign in with Google
          </button>
          <button className='w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-md text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors'>
            <FaApple className='text-[30px] text-black' />
            Sign in with Apple
          </button>
        </div>

        <div className='w-full  flex items-center justify-center my-4'>
          <hr className='flex-grow border-t border-gray-300' />
          <span className='px-2 text-sm text-gray-500'>or continue with email</span>
          <hr className='flex-grow border-t border-gray-300' />
        </div>

        <form className='w-full  space-y-6' onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1 text-left">
              Email address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your work email address"
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              disabled={isLoading}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1 text-left">
              Password <span className="text-red-500">*</span>
            </label>
            <div className='relative'>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E318A] transition-colors ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                disabled={isLoading}
              />
              <span className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer">
                <i className="fas fa-eye"></i>
              </span>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            <p className='text-xs text-gray-500 mt-1'>Password must be at least 8 characters and must include lower/upper case letters & numbers.</p>
          </div>

          <p className='text-sm text-right text-[#1E318A] font-bold cursor-pointer'>Forgot password?</p>

          <div className='mt-8'>
            <button
              type="submit"
              className="w-full py-3 text-lg font-semibold text-white bg-[#1E318A] rounded-md hover:bg-[#2941AB] transition-colors disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Authenticating...' : 'Login'}
            </button>
          </div>
        </form>

        <p className='text-center mt-4 text-sm font-medium'>
          New to Medisync? <span className='text-[#1E318A] font-bold cursor-pointer'>Create an account</span>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
