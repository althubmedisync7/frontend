import React, { useEffect } from 'react'
import logo from "../assets/public/auth-logo.png";
import authText from "../assets/public/logo-writeup.png"
import { useNavigate } from 'react-router-dom';

const SplashScreen = () => {
   const navigate = useNavigate()
   useEffect(() => {
      console.log("Effect is running...");
      const timeout = setTimeout(() => {
         navigate("/auth");
      }, 5000);

      return () => {
         console.log("Cleanup function is running...");
         clearTimeout(timeout);
      };
   }, [navigate]);
   return (
      <div className='w-full h-screen flex justify-center items-center'>
         <div className='w-1/2 h-1/2 flex justify-center items-center gap-2.5'>
            <div className='w-[100px] h-[100px] overflow-hidden animate-slide-in-left'>
               <img src={logo} alt="Auth Logo" className='w-full h-full object-contain' />
            </div>

            <div className='w-[250px] h-[200px] overflow-hidden animate-slide-in-right'>
               <img src={authText} alt="Logo Writeup" className='w-full h-full object-contain' />
            </div>
         </div>
      </div>
   )
}

export default SplashScreen