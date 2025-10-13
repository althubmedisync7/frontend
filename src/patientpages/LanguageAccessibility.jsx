import React, { useState } from 'react';

const CustomRadio = ({ label, name, checked, onChange }) => (
   <label className="flex items-center cursor-pointer mb-2">
      <input
         type="radio"
         name={name}
         value={label}
         checked={checked}
         onChange={onChange}
         className="form-radio size-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
      />
      <span className="ml-3 text-gray-700">{label}</span>
   </label>
);

const SizeButton = ({ label, isActive, onClick }) => (
   <button
      onClick={onClick}
      className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ease-in-out ${isActive
         ? 'bg-indigo-600 text-white shadow-md'
         : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
         }`}
   >
      {label}
   </button>
);


const LanguageAccessibilitySettings = () => {
   const [selectedLanguage, setSelectedLanguage] = useState('English');
   const [selectedTextSize, setSelectedTextSize] = useState('Small');

   const languages = ['English', 'Yoruba', 'Igbo', 'Hausa'];
   const textSizes = ['Small', 'Medium', 'Large'];

   const handleLanguageChange = (event) => {
      setSelectedLanguage(event.target.value);
   };

   const handleTextSizeChange = (size) => {
      setSelectedTextSize(size);
   };

   return (
      <div className="p-6 bg-white">
         <h2 className="text-xl font-semibold text-gray-800 mb-6">Language & Accessibility</h2>

         <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Language</h3>
            <p className="text-sm text-gray-600 mb-3">Select your preferred language</p>

            <div className="space-y-1 mb-6">
               {languages.map(lang => (
                  <CustomRadio
                     key={lang}
                     label={lang}
                     name="language"
                     checked={selectedLanguage === lang}
                     onChange={handleLanguageChange}
                  />
               ))}
            </div>

            <div className="flex items-center space-x-4 p-4 border border-gray-200 bg-gray-50 rounded-lg max-w-sm">
               <button className="px-3 py-1.5 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-md">
                  Preview
               </button>
               <span className="text-sm text-gray-700">Your next appointment is at 2pm</span>
            </div>
         </div>

         <hr className="my-8 border-t border-gray-200" />

         <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Text Size</h3>
            <p className="text-sm text-gray-600 mb-3">Select your preferred text size</p>

            <div className="flex space-x-2 mb-6">
               {textSizes.map(size => (
                  <SizeButton
                     key={size}
                     label={size}
                     isActive={selectedTextSize === size}
                     onClick={() => handleTextSizeChange(size)}
                  />
               ))}
            </div>

            <div className="p-4 border border-gray-200 bg-gray-50 rounded-lg max-w-sm">
               <div className="flex space-x-4 items-start">
                  <button className="px-3 py-1.5 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-md">
                     Preview
                  </button>
                  <div className={`text-gray-700 leading-tight`}>
                     <h4 className={selectedTextSize === 'Large' ? 'text-xl font-bold' : selectedTextSize === 'Medium' ? 'text-lg font-bold' : 'text-base font-bold'}>
                        Heading
                     </h4>
                     <p className={selectedTextSize === 'Large' ? 'text-lg' : selectedTextSize === 'Medium' ? 'text-base' : 'text-sm'}>
                        Subheading
                     </p>
                     <p className={selectedTextSize === 'Large' ? 'text-base' : selectedTextSize === 'Medium' ? 'text-sm' : 'text-xs'}>
                        Your next appointment is at 2pm
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default LanguageAccessibilitySettings;