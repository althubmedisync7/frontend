import React, { useState, useEffect } from 'react';
import { Table, Select, Input, Modal, Button, Row, Col } from 'antd';
import { SearchOutlined, ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

const { Option } = Select;

const data = [
   { key: '1', date: '25/08/2025', doctorName: 'Dr. Joy Omotosho', hospitalName: 'Kith Hospital', access: 'View Only' },
   { key: '2', date: '25/07/2025', doctorName: 'Dr. Keith James', hospitalName: 'Lagos University Teaching Hospital', access: 'Full Access' },
   { key: '3', date: '25/06/2025', doctorName: 'Dr. Mariam Quadri', hospitalName: 'Kith Hospital', access: 'Full Access' },
   { key: '4', date: '25/05/2025', doctorName: 'Dr. Raymond Jackson', hospitalName: 'Lagos University Teaching Hospital', access: 'Full Access' },
   { key: '5', date: '25/04/2025', doctorName: 'Dr. Bilewa Modupe', hospitalName: 'Lagos University Teaching Hospital', access: 'Full Access' },
];


const ToggleSwitch = ({ checked }) => (
   <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" defaultChecked={checked} className="sr-only peer" />
      <div className="w-10 h-6 bg-gray-200 rounded-full peer-checked:bg-indigo-500 transition-colors duration-200 ease-in-out"></div>
      <div className="absolute left-0.5 top-0.5 size-5 bg-white rounded-full transition-transform duration-200 ease-in-out transform peer-checked:translate-x-4 peer-checked:bg-white shadow"></div>
   </label>
);

const DeleteAccountModal = ({ isVisible, onClose, onDelete }) => (
   <Modal
      centered
      title={<div className="text-xl font-semibold text-gray-900 text-center w-full pt-4">Delete My Account</div>}
      open={isVisible}
      onCancel={onClose}
      footer={null}
      width={400}
      maskStyle={{ background: 'rgba(0, 0, 0, 0.6)' }}
      closable={false}
   >
      <div className="text-gray-700 mt-4 mb-8 px-4">
         <p className="text-center">
            Are you sure you want to delete your account? Once deleted, All files will be lost.
         </p>
      </div>
      <div className="flex justify-between space-x-4 pb-4">
         <Button
            key="delete"
            onClick={onDelete}
            className="w-full font-semibold text-white border-none rounded-md transition duration-150"
            style={{ backgroundColor: '#ED1C24', boxShadow: 'none', height: "40px", color: "white" }}
         >
            Delete
         </Button>
         <Button
            key="cancel"
            onClick={onClose}
            className="w-full font-semibold text-white border-none rounded-md transition duration-150"
            style={{ backgroundColor: '#213B89', boxShadow: 'none', height: "40px", color: "white" }}
         >
            Cancel
         </Button>
      </div>
   </Modal>
);

const MobileAccessCard = ({ date, access, doctorName, hospitalName }) => (
   <div className="bg-white p-4 shadow-sm border border-gray-200 rounded-lg mb-3">
      <div className="flex justify-between items-center mb-2">
         <span className="text-gray-900 font-semibold">{date}</span>
         <ToggleSwitch checked={true} />
      </div>

      <div className="flex items-center mb-2">
         <Select
            defaultValue={access}
            bordered={false}
            className="p-0 text-lg font-bold text-gray-800"
            style={{ width: 'auto' }}
            dropdownStyle={{ minWidth: '150px' }}
         >
            <Option value="Full Access">Full Access</Option>
            <Option value="View Only">View Only</Option>
            <Option value="Revoked">Revoked</Option>
         </Select>
      </div>

      <p className="text-sm text-gray-600">{doctorName}</p>
      <p className="text-sm text-gray-600">{hospitalName}</p>
   </div>
);


const PrivacyDataSharing = () => {
   const [isModalVisible, setIsModalVisible] = useState(false);
   const [isMobile, setIsMobile] = useState(false); // Default to false

   // Effect to detect mobile view based on screen size
   useEffect(() => {
      const checkMobile = () => {
         setIsMobile(window.innerWidth < 768);
      };
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
   }, []);

   const showModal = (e) => {
      e.preventDefault();
      setIsModalVisible(true);
   };

   const handleCancel = () => {
      setIsModalVisible(false);
   };

   const handleDeleteAccount = () => {
      console.log("Account Deletion Confirmed!");
      setIsModalVisible(false);
   };


   const columns = [
      { title: 'Date', dataIndex: 'date', key: 'date', className: 'font-normal text-gray-700 px-6 py-3', width: '15%' },
      { title: "Doctor's Name", dataIndex: 'doctorName', key: 'doctorName', className: 'font-normal text-gray-700 px-6 py-3', width: '25%' },
      { title: 'Hospital/Lab Name', dataIndex: 'hospitalName', key: 'hospitalName', className: 'font-normal text-gray-700 px-6 py-3', width: '30%' },
      {
         title: 'Access',
         dataIndex: 'access',
         key: 'access',
         width: '15%',
         render: (text) => (
            <Select defaultValue={text} style={{ width: 120 }} bordered={false} className="font-normal text-gray-700">
               <Option value="Full Access">Full Access</Option>
               <Option value="View Only">View Only</Option>
               <Option value="Revoked">Revoked</Option>
            </Select>
         ),
      },
      {
         title: 'Access Control',
         key: 'accessControl',
         width: '15%',
         render: () => (<div className="flex justify-center"><ToggleSwitch checked={true} /></div>),
      },
   ];


   if (isMobile) {
      return (
         <div className="w-full bg-gray-50 min-h-screen pt-12">
            <div className="fixed top-0 left-0 right-0 z-10 bg-white border-b border-gray-200">
               <div className="flex items-center p-4">
                  <ArrowLeftOutlined className="text-xl text-gray-600 mr-4" />
                  <h1 className="text-lg font-semibold text-gray-900">Privacy</h1>
               </div>
            </div>

            <div className="p-4 pt-0">
               <h2 className="text-lg font-medium text-gray-800 mb-4 mt-2">
                  Data Sharing Permission
               </h2>

               {data.map(item => (
                  <MobileAccessCard
                     key={item.key}
                     date={item.date}
                     access={item.access}
                     doctorName={item.doctorName}
                     hospitalName={item.hospitalName}
                  />
               ))}

               <div className="mt-8 pt-6 border-t border-gray-200 bg-white p-4 rounded-lg">
                  <h2 className="text-base font-medium mb-1 text-gray-800">
                     Delete My Account
                  </h2>
                  <a href="#" onClick={showModal} className="text-red-600 hover:text-red-700 text-sm font-medium">
                     Delete my account
                  </a>
               </div>
            </div>

            <DeleteAccountModal
               isVisible={isModalVisible}
               onClose={handleCancel}
               onDelete={handleDeleteAccount}
            />
         </div>
      );
   }


   return (
      <div className="w-full mx-auto bg-white rounded-lg p-6">
         <h1 className="text-2xl font-semibold mb-6 text-gray-900">Privacy & Data Sharing</h1>

         <Row justify="space-between" align="middle" className="mb-4">
            <Col>
               <h2 className="text-xl font-medium text-gray-800">Data Sharing Permission</h2>
            </Col>
            <Col className="w-full sm:w-64 max-w-xs">
               <Input
                  placeholder="Search History"
                  prefix={<SearchOutlined className="text-gray-400" />}
                  className="border-gray-300 rounded-md"
               />
            </Col>
         </Row>

         <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            className="shadow-sm border border-gray-200 rounded-lg overflow-hidden"
            rowClassName="hover:bg-gray-50 transition duration-150 ease-in-out"
         />

         <div className="flex justify-between items-center mt-4 text-sm">
            <p className="text-gray-500">
               You have granted access to <span className="font-semibold text-gray-700">6</span> personnel (Displaying
               <Select defaultValue={5} style={{ width: 60, height: 24 }} className="font-normal text-gray-700 mx-1">
                  <Option value={5}>5</Option><Option value={10}>10</Option>
               </Select>
               per page)
            </p>

            <div className="flex space-x-4 text-gray-500">
               <button className="flex items-center hover:text-indigo-600 disabled:opacity-50" disabled><ArrowLeftOutlined className="mr-1" />Previous</button>
               <button className="flex items-center hover:text-indigo-600">Next<ArrowRightOutlined className="ml-1" /></button>
            </div>
         </div>

         <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-xl font-medium mb-1 text-gray-800">Delete My Account</h2>
            <a href="#" onClick={showModal} className="text-red-600 hover:text-red-700 text-sm">Delete my account</a>
         </div>

         <DeleteAccountModal isVisible={isModalVisible} onClose={handleCancel} onDelete={handleDeleteAccount} />
      </div>
   );
}

export default PrivacyDataSharing;