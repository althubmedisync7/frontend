import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';

const faqData = [
   {
      category: "Account & Login",
      questions: [
         { q: "How do I create a new account on Medisync?", a: "Steps to create account..." },
         { q: "How do I reset my password?", a: "Steps to reset password..." },
         { q: "How do I update my personal information?", a: "Steps to update profile..." },
         { q: "Can I change the email address linked to my account?", a: "Yes, you can change your email..." },
      ],
   },
   {
      category: "Appointments",
      questions: [
         { q: "How do I view my upcoming appointments?", a: "View appointments on the dashboard..." },
         { q: "Can I reschedule or cancel an appointment?", a: "Yes, via the appointments page..." },
         { q: "How do I add my doctor-given appointment date?", a: "Use the 'Add Appointment' button..." },
      ],
   },
   {
      category: "Lab Results",
      questions: [
         { q: "How do I view my lab results?", a: "Lab results are in the 'Results' tab..." },
         { q: "What should I do if my lab result is not showing?", a: "Contact your clinic or support..." },
         { q: "Can I share my lab results with anyone?", a: "Yes, using the data sharing settings..." },
      ],
   },
   {
      category: "Medication Reminder",
      questions: [
         { q: "How do I set medication reminders?", a: "Set reminders in the 'Medications' tab..." },
         { q: "Can I edit or delete a medication reminder?", a: "Yes, manage reminders anytime..." },
         { q: "Will I get notification if I miss a dose?", a: "Yes, you will receive a missed dose alert..." },
      ],
   },
   {
      category: "Technical Support & Security",
      questions: [
         { q: "Why am I not receiving email or SMS notifications?", a: "Check your spam folder and notification settings..." },
         { q: "How secure is my health information on Medisync?", a: "We use industry-standard encryption..." },
         { q: "What should I do if I suspect unauthorized access to my account?", a: "Change your password and contact support immediately..." },
      ],
   },
   {
      category: "General Information",
      questions: [
         { q: "How do I contact support for further assistance?", a: "Use the contact details below." },
         { q: "Is Medisync free to use, or do I have to pay?", a: "Basic features are free; premium features require a subscription." },
      ],
   },
];

const AccordionItem = ({ question, answer }) => {
   const [isOpen, setIsOpen] = useState(false);

   const ChevronDown = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>;
   const ChevronUp = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" /></svg>;

   return (
      <div className="border-b border-gray-200">
         <button
            className="flex justify-between items-center w-full py-4 text-left text-gray-800 hover:text-indigo-600 transition-colors duration-150"
            onClick={() => setIsOpen(!isOpen)}
         >
            <span className="text-sm font-medium">{question}</span>
            {isOpen ? <ChevronUp /> : <ChevronDown />}
         </button>
         {isOpen && (
            <div className="pb-4 pt-1 text-sm text-gray-600">
               {answer}
            </div>
         )}
      </div>
   );
};

export const HelpSupportSettings = () => {
   const [isFullView, setIsFullView] = useState(false);

   const summarizedQuestions = [
      "How do I reset my password?",
      "How do I view my lab results?",
      "How do I add my doctor-given appointment date?",
      "How do I contact support if I need help?",
      "How do I set medication reminders?",
   ];

   const contactInfo = {
      email: "ourhelpemail@gmail.com",
      phone: "+2348100000000",
   };

   const renderFullFAQ = () => (
      <div className="p-6">
         <h3 className="text-lg font-semibold text-gray-800 mb-6">Frequently Asked Questions (FAQs)</h3>

         {faqData.map(section => (
            <div key={section.category} className="mb-6">
               <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">{section.category}</h4>
               {section.questions.map((item, index) => (
                  <AccordionItem key={index} question={item.q} answer={item.a} />
               ))}
            </div>
         ))}
      </div>
   );

   const renderSummarizedView = () => (
      <div className="p-4">
         <h3 className="text-lg font-semibold text-gray-800 mb-6">Frequently Asked Questions (FAQs)</h3>

         <div className="border border-gray-200 rounded-lg p-4 mb-8">
            {summarizedQuestions.map((q, index) => (
               <div key={index} className={`flex justify-between items-center py-2 text-sm ${index < summarizedQuestions.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <span className="text-gray-700">{q}</span>
                  <ChevronDownIcon className="w-4 h-4 text-gray-400" />
               </div>
            ))}
         </div>

         <button
            onClick={() => setIsFullView(true)}
            className="w-full py-2.5 text-white bg-indigo-700 hover:bg-indigo-800 rounded-lg font-semibold transition-colors duration-200 shadow-md mb-8"
         >
            View All
         </button>

         <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Support</h3>
         <div className="space-y-3 mb-8">
            <div className="flex items-start text-gray-700">
               <EnvelopeIcon className="w-5 h-5 text-gray-500 mr-3 mt-1" />
               <div>
                  <span className="font-medium text-sm">Email Support:</span><br className="sm:hidden" />
                  <a href={`mailto:${contactInfo.email}`} className="text-sm ml-1 text-blue-600 hover:underline">{contactInfo.email}</a>
               </div>
            </div>
            <div className="flex items-start text-gray-700">
               <PhoneIcon className="w-5 h-5 text-gray-500 mr-3 mt-1" />
               <div>
                  <span className="font-medium text-sm">Call Support:</span><br className="sm:hidden" />
                  <a href={`tel:${contactInfo.phone}`} className="text-sm ml-1 text-blue-600 hover:underline">{contactInfo.phone}</a>
               </div>
            </div>
         </div>

         <h3 className="text-lg font-semibold text-gray-800 mb-3">Legal Links</h3>
         <div className="space-y-1 text-sm">
            <a href="#" className="text-blue-600 hover:underline block">Terms & Conditions</a>
            <a href="#" className="text-blue-600 hover:underline block">Privacy Policy</a>
         </div>
      </div>
   );


   const Header = ({ title, showBack = false }) => (
      <div className="flex items-center p-4 bg-white border-b border-gray-200 sticky top-0 z-10">
         {showBack && (
            <span className="text-gray-600 mr-4 cursor-pointer" onClick={() => setIsFullView(false)}>
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" /></svg>
            </span>
         )}
         <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
      </div>
   );

   if (isFullView) {
      return (
         <div className="bg-white min-h-screen">
            <Header title="Help & Support" showBack={true} />
            {renderFullFAQ()}
         </div>
      );
   }

   return (
      <div className="bg-white min-h-screen">
         <div className="hidden md:block p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Help & Support</h2>
         </div>

         <div className="md:p-0 p-0">
            {renderSummarizedView()}
         </div>
      </div>
   );
};
