import React, { useState } from 'react';
import { Form, Select, DatePicker, TimePicker, Input, Button, Row, Col, Table, Tag, Space, Calendar } from 'antd';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;
const { TextArea } = Input;

const appointmentData = [
  {
    key: '1',
    patient: 'Winnie Watson',
    gender: 'Female',
    doctor: 'Dr. Billie Coby',
    date: '2025-04-19',
    time: '10:00 AM',
    status: 'Scheduled',
    imageUrl: 'https://i.pravatar.cc/150?img=1',
  },
  {
    key: '2',
    patient: 'Clarence Russell',
    gender: 'Female',
    doctor: 'Dr. Sarah Collins',
    date: '2025-04-21',
    time: '12:00 PM',
    status: 'Confirmed',
    imageUrl: 'https://i.pravatar.cc/150?img=2',
  },
  {
    key: '3',
    patient: 'Esther Adewale',
    gender: 'Male',
    doctor: 'Dr. Michael Tunnex',
    date: '2025-04-23',
    time: '1:30 PM',
    status: 'Cancelled',
    imageUrl: 'https://i.pravatar.cc/150?img=3',
  },
  {
    key: '4',
    patient: 'Precious James',
    gender: 'Female',
    doctor: 'Dr. Cecilia Billie',
    date: '2025-04-26',
    time: '2:30 PM',
    status: 'Completed',
    imageUrl: 'https://i.pravatar.cc/150?img=4',
  },
];

const PatientAppointment = () => {
  const [form] = Form.useForm();
  const [calendarValue, setCalendarValue] = useState(dayjs());

  const onFinish = (values) => {
    console.log('Appointment Booking Details:', values);
  };

  const patients = [{ id: 1, name: 'Whitney Watson' },];
  const doctors = [{ id: 101, name: 'Dr. Billie Coby' }];
  const disabledPastDate = (current) => current && current < dayjs().startOf('day');

  const columns = [
    { title: 'Patient', dataIndex: 'patient', key: 'patient', render: (text, record) => (<Space>...</Space>) },
    { title: 'Gender', dataIndex: 'gender', key: 'gender', width: 100 },
    { title: 'Appoint for (Doctor)', dataIndex: 'doctor', key: 'doctor' },
    { title: 'Date', dataIndex: 'date', key: 'date', sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(), render: (date) => dayjs(date).format('DD MMM YYYY') },
    { title: 'Time', dataIndex: 'time', key: 'time', width: 100 },
    { title: 'Status', key: 'status', dataIndex: 'status', render: (status) => (<Tag color="...">...</Tag>) },
    { title: 'Action', key: 'action', width: 100, render: (_, record) => (<Space>...</Space>) },
  ];

  const onCalendarSelect = (newValue) => {
    setCalendarValue(newValue);
    console.log('Selected date:', newValue.format('YYYY-MM-DD'));
  };

  return (
    <div className="p-6">

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Book Appointment</h1>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ padding: "20px" }}
        className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-8"
      >
        <Row gutter={24}>
          <Col span={24} md={12}>
            <Form.Item name="patient" label={<span className="text-sm font-medium text-gray-700">Select Patient</span>} rules={[{ required: true, message: 'Please select a patient!' }]}>
              <Select size="large" placeholder="Select Patient">
                {patients.map(p => (<Option key={p.id} value={p.id}>{p.name}</Option>))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item name="doctor" label={<span className="text-sm font-medium text-gray-700">Assign Doctor</span>} rules={[{ required: true, message: 'Please assign a doctor!' }]}>
              <Select size="large" placeholder="Assign Doctor">
                {doctors.map(d => (<Option key={d.id} value={d.id}>{d.name}</Option>))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item name="appointmentDate" label={<span className="text-sm font-medium text-gray-700">Date</span>} rules={[{ required: true, message: 'Please select an appointment date!' }]}>
              <DatePicker size="large" style={{ width: '100%', height: '48px' }} placeholder="mm/dd/yyyy" format="MM/DD/YYYY" disabledDate={disabledPastDate} />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item name="appointmentTime" label={<span className="text-sm font-medium text-gray-700">Time</span>} rules={[{ required: true, message: 'Please select a time!' }]}>
              <TimePicker size="large" style={{ width: '100%', height: '48px' }} placeholder="--:--" format="h:mm A" use12Hours minuteStep={15} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="notes" label={<span className="text-sm font-medium text-gray-700">Notes</span>}>
              <TextArea rows={4} placeholder="Notes" className="rounded-lg" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item className="!mb-0">
          <div className="flex justify-end pt-4">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full sm:w-auto px-8 py-3 rounded-lg text-white font-medium bg-[#40549c] hover:bg-[#324580] transition-colors shadow-md"
            >
              Book Appointment
            </Button>
          </div>
        </Form.Item>
      </Form>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900">Appointment List</h2>

        <Row gutter={24} className="mt-4">
          <Col span={24} lg={16}>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 h-full">
              <Table
                columns={columns}
                dataSource={appointmentData}
                pagination={{ pageSize: 5 }}
              />
            </div>
          </Col>

          <Col span={24} lg={8}>
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
              <Calendar
                fullscreen={false}
                value={calendarValue}
                onSelect={onCalendarSelect}
                headerRender={({ value, onChange }) => {
                  return (
                    <div style={{ padding: 8 }}>
                      <Row gutter={8} justify="space-between" align="middle">
                        <Col>
                          <span className="text-lg font-semibold">{value.format('MM/DD/YYYY')}</span>
                        </Col>
                        <Col>
                          <Button size="small" onClick={() => onChange(value.subtract(1, 'month'))}>{'<'}</Button>
                          <span className="mx-2 font-medium">{value.format('MMMM YYYY')}</span>
                          <Button size="small" onClick={() => onChange(value.add(1, 'month'))}>{'>'}</Button>
                        </Col>
                      </Row>
                    </div>
                  );
                }}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PatientAppointment;