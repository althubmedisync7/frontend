import React from 'react';
import { Form, Input, DatePicker, Button, Row, Col } from 'antd';
import dayjs from 'dayjs';

const PatientData = () => {
   const [form] = Form.useForm();

   const onFinish = (values) => {
      console.log('Patient Registration Success:', values);
   };


   const validateFullName = (_, value) => {
      if (!value) {
         return Promise.reject(new Error('Please enter the patient\'s full name!'));
      }
      if (value.trim().split(/\s+/).length < 2) {
         return Promise.reject(new Error('Please include at least a first and last name.'));
      }
      return Promise.resolve();
   };

   const validateContactNumber = (_, value) => {
      const phoneRegex = /^\d{10}$/;

      if (!value) {
         return Promise.reject(new Error('Please enter a contact number!'));
      }

      if (!phoneRegex.test(value)) {
         return Promise.reject(new Error('Contact number must be 10 digits (no dashes or spaces).'));
      }

      return Promise.resolve();
   };

   const validateAge = (_, value) => {
      if (!value) {
         return Promise.reject(new Error('Please select the date of birth!'));
      }

      const today = dayjs();
      const minAgeDate = today.subtract(18, 'year');

      if (value.isAfter(minAgeDate)) {
         return Promise.reject(new Error('Patient must be at least 18 years old.'));
      }

      return Promise.resolve();
   };

   const disabledFutureDate = (current) => {
      return current && current > dayjs().endOf('day');
   };


   return (
      <div className="p-6">

         <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Register New Patient</h1>
            <p className="text-gray-500">Fill in the details to add new patients to the system</p>
         </div>

         <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ remember: true }}
            className="space-y-6"
         >

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
               <h2 className="text-xl font-semibold mb-6 border-b pb-3 text-gray-800">Personal Information</h2>

               <Row gutter={24}>

                  <Col span={24} md={12}>
                     <Form.Item
                        name="fullName"
                        label={<span className="text-sm font-medium text-gray-700">Full Name</span>}
                        rules={[{ validator: validateFullName }]}
                     >
                        <Input size="large" placeholder="Enter your full name (e.g., John Smith)" className="rounded-lg" />
                     </Form.Item>
                  </Col>

                  <Col span={24} md={12}>
                     <Form.Item
                        name="dateOfBirth"
                        label={<span className="text-sm font-medium text-gray-700">Date of Birth</span>}
                        rules={[{ validator: validateAge }]}
                     >
                        <DatePicker
                           size="large"
                           style={{ width: '100%', height: '48px' }}
                           placeholder="Select Date of Birth"
                           format="YYYY-MM-DD"
                           disabledDate={disabledFutureDate}
                           className="rounded-lg"
                        />
                     </Form.Item>
                  </Col>

                  <Col span={24} md={12}>
                     <Form.Item
                        name="contactNumber"
                        label={<span className="text-sm font-medium text-gray-700">Contact Number</span>}
                        rules={[{ validator: validateContactNumber }]}
                     >
                        <Input size="large" placeholder="Enter contact number (10 digits)" className="rounded-lg" />
                     </Form.Item>
                  </Col>

                  <Col span={24} md={12}>
                     <Form.Item
                        name="email"
                        label={<span className="text-sm font-medium text-gray-700">Email Address</span>}
                        rules={[
                           { required: true, message: 'Please input your E-mail!' },
                           { type: 'email', message: 'The input is not a valid E-mail format!' },
                        ]}
                     >
                        <Input size="large" placeholder="Enter your email address" className="rounded-lg" />
                     </Form.Item>
                  </Col>

                  <Col span={24} md={24}>
                     <Form.Item
                        name="address"
                        label={<span className="text-sm font-medium text-gray-700">Address</span>}
                        rules={[{ required: true, message: 'Please enter the patient\'s address!' }]}
                     >
                        <Input size="large" placeholder="Enter your address" className="rounded-lg" />
                     </Form.Item>
                  </Col>
               </Row>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
               <h2 className="text-xl font-semibold mb-6 border-b pb-3 text-gray-800">Emergency Contact</h2>

               <Row gutter={24}>
                  <Col span={24} md={12}>
                     <Form.Item
                        name="emergencyContactName"
                        label={<span className="text-sm font-medium text-gray-700">Contact Name</span>}
                        rules={[{ required: true, message: 'Please enter the emergency contact name!' }]}
                     >
                        <Input size="large" placeholder="Enter contact name" className="rounded-lg" />
                     </Form.Item>
                  </Col>

                  <Col span={24} md={12}>
                     <Form.Item
                        name="emergencyContactNumber"
                        label={<span className="text-sm font-medium text-gray-700">Contact Number</span>}
                        rules={[{ required: true, message: 'Please enter the emergency contact number!' }]}
                     >
                        <Input size="large" placeholder="Enter contact number" className="rounded-lg" />
                     </Form.Item>
                  </Col>
               </Row>
            </div>

            <Form.Item className="!mb-0">
               <div className="flex justify-end pt-4 space-x-4">
                  <Button
                     onClick={() => form.resetFields()}
                     size="large"
                     className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                     Cancel
                  </Button>

                  <Button
                     type="primary"
                     htmlType="submit"
                     size="large"
                     className="px-6 py-3 rounded-lg text-white font-medium bg-[#40549c] hover:bg-[#324580] transition-colors shadow-md"
                  >
                     Register Patient
                  </Button>
               </div>
            </Form.Item>
         </Form>
      </div>
   );
}

export default PatientData;