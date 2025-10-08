import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgLogOut } from "react-icons/cg"; 

function LogOut() {
  const [logOpen, setLogOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex gap-6 items-center w-1/2">
   
      <button
        className="flex gap-1 cursor-pointer"
        onClick={() => setLogOpen(true)}
      >
        <CgLogOut size={22} className="flex mt-1" /> Log Out 
      </button>

      {logOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50 transition-opacity duration-300 ease-out animate-fadeIn">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={ () => setLogOpen(false) }></div>
          <section className="bg-white dark:bg-darkGradient4 p-6 rounded-xl shadow-lg max-w-md w-full text-center transform transition-all duration-300 ease-out scale-95 animate-scaleIn">
            <h2 className="text-lg font-semibold mb-2 dark:text-white">
              Log Out
            </h2>
            <h3 className="mb-4 dark:text-white">Do you want to log out?</h3>

            <div className="flex justify-center gap-5">
              <button
                className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg dark:text-white cursor-pointer"
                onClick={() => setLogOpen(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-[#1E318A] text-white rounded-lg cursor-pointer"
                onClick={() => navigate("/")}
              >
                Log Out
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default LogOut;
