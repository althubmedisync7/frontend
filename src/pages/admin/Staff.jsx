import React from 'react';
import { Form, Input, Select, Button, Row, Col } from 'antd';

const { Option } = Select;

const Staff = () => {
   const [form] = Form.useForm();

   const onFinish = (values) => {
      console.log('Staff Registration Success:', values);
   };

   const roles = ['Doctor', 'Nurse', 'Admin Assistant', 'Technician'];
   const departments = ['Pediatrics', 'Cardiology', 'General Practice', 'Radiology', 'Administration'];

   return (
      <div className="p-6">

         <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Register New Staff Member</h1>
            <p className="text-gray-500">Fill in the details below to add a new staff member to the system</p>
         </div>

         <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ padding: '20px' }}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
         >
            <Row gutter={24}>

               <Col span={24}>
                  <Form.Item
                     name="fullName"
                     label={<span className="text-sm font-medium text-gray-700">Full Name</span>}
                     rules={[{ required: true, message: 'Please enter the staff member\'s full name!' }]}
                  >
                     <Input size="large" placeholder="Enter your full name" className="rounded-lg" />
                  </Form.Item>
               </Col>

               <Col span={24}>
                  <Form.Item
                     name="email"
                     label={<span className="text-sm font-medium text-gray-700">Email Address</span>}
                     rules={[
                        { type: 'email', message: 'The input is not a valid E-mail!' },
                        { required: true, message: 'Please input the E-mail address!' },
                     ]}
                  >
                     <Input size="large" placeholder="Enter your email address" className="rounded-lg" />
                  </Form.Item>
               </Col>

               <Col span={24} md={12}>
                  <Form.Item
                     name="role"
                     label={<span className="text-sm font-medium text-gray-700">Role</span>}
                     rules={[{ required: true, message: 'Please select a role!' }]}
                  >
                     <Select size="large" placeholder="Select a role">
                        {roles.map(role => (
                           <Option key={role} value={role}>{role}</Option>
                        ))}
                     </Select>
                  </Form.Item>
               </Col>

               <Col span={24} md={12}>
                  <Form.Item
                     name="department"
                     label={<span className="text-sm font-medium text-gray-700">Department</span>}
                     rules={[{ required: true, message: 'Please select a department!' }]}
                  >
                     <Select size="large" placeholder="Select a department">
                        {departments.map(dept => (
                           <Option key={dept} value={dept}>{dept}</Option>
                        ))}
                     </Select>
                  </Form.Item>
               </Col>
            </Row>

            <Form.Item className="!mb-0 mt-6">
               <div className="flex justify-end pt-4">
                  <Button
                     type="primary"
                     htmlType="submit"
                     size="large"
                     className="w-full sm:w-auto px-8 py-3 rounded-lg text-white font-medium bg-[#40549c] hover:bg-[#324580] transition-colors shadow-md"
                  >
                     Register
                  </Button>
               </div>
            </Form.Item>
         </Form>
      </div>
   );
}

export default Staff;