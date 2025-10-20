import React, { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { AiOutlineCaretDown, AiOutlineFileText } from 'react-icons/ai';
import { Pagination, Dropdown, Menu, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

const ALL_RESULTS = [
  {
    id: 1, date: '27/08/2025', testName: 'Complete Blood Count (CBC)', labName: 'Lagos University...', status: 'Normal',
    details: {
      orderingDoctor: 'Dr. Akintola Bello', hospital: 'Lagos State Teaching Hospital',
      summary: 'Your blood count values are within the expected range. No immediate concerns detected.',
      findings: [
        { component: 'Hemoglobin', result: '13.8 g/dL', normalRange: '12-15 g/dL', interpretation: 'Normal' },
        { component: 'White Blood Cells', result: '6,200 /µL', normalRange: '4,000–10,000 /µL', interpretation: 'Normal' },
        { component: 'Platelets', result: '210,000 /µL', normalRange: '150,000–400,000 /µL', interpretation: 'Normal' },
        { component: 'Hematocrit', percent: '41%', normalRange: '36–46%', interpretation: 'Normal' },
        { component: 'RBC Count', result: '4.8 M/µL', normalRange: '4.2–5.4 M/µL', interpretation: 'Normal' },
      ],
      interpretationPoints: [
        'Your results are all within normal limits.',
        'No signs of anemia, infection, or abnormal clotting issues.',
        'Healthy red blood cell, white blood cell, and platelet levels.',
      ],
      doctorsNotes: "Patient's blood profile is stable. Recommend continuing balanced diet and regular exercise. Repeat CBC in six (6) months or earlier if symptoms (e.g., unusual fatigue, recurrent infections, or easy bruising) occur.",
      attachment: { fileName: 'CBC.pdf', size: '36KB' },
    }
  },
  { id: 2, date: '26/05/2025', testName: 'Blood Test', labName: 'Kith Laboratory', status: 'Abnormal' },
  { id: 3, date: '26/04/2025', testName: 'Blood Test', labName: 'Lagoon Hospital', status: 'Normal' },
  { id: 4, date: '25/03/2025', testName: 'Blood Test', labName: 'Ikorodu General...', status: 'Normal' },
  { id: 5, date: '25/02/2025', testName: 'Blood Test', labName: 'Lagos University...', status: 'Severe' },
  { id: 6, date: '25/01/2025', testName: 'Blood Test', labName: 'Kith Laboratory', status: 'Abnormal' },
  { id: 7, date: '20/01/2025', testName: 'Urine Test', labName: 'General Hospital', status: 'Normal' },
  { id: 8, date: '15/12/2024', testName: 'X-Ray Scan', labName: 'City Diagnostic', status: 'Normal' },
  { id: 9, date: '01/12/2024', testName: 'Blood Test', labName: 'Kith Laboratory', status: 'Severe' },
  { id: 10, date: '20/11/2024', testName: 'Blood Test', labName: 'Lagos University...', status: 'Abnormal' },
];


const StatusBadge = ({ status }) => {
  let classes = '';
  switch (status) {
    case 'Normal': classes = 'bg-teal-100 text-teal-700'; break;
    case 'Abnormal': classes = 'bg-orange-100 text-orange-700'; break;
    case 'Severe': classes = 'bg-red-100 text-red-700'; break;
    default: classes = 'bg-gray-100 text-gray-700';
  }
  return (
    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${classes}`}>
      {status}
    </span>
  );
};

const CardView = ({ results, navigate }) => (
  <div className="mt-6 space-y-4 md:hidden">
    {results.map((result) => (
      <div key={result.id} className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-base font-semibold text-gray-900">{result.testName}</h3>
          <StatusBadge status={result.status} />
        </div>

        <p className="text-sm text-gray-600 mb-1">
          <span className="font-medium">Date:</span> {result.date}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          <span className="font-medium">Lab:</span> {result.labName}
        </p>

        <div className="flex flex-col space-y-2">
          <button
            onClick={() => navigate(`/patientboard/results/${result.id}`)}
            className="w-full px-3 py-3 text-white bg-indigo-700 hover:bg-indigo-800 rounded-lg text-sm transition-colors"
          >
            View Result
          </button>
          <button
            className="w-full px-3 py-3 text-indigo-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg text-sm transition-colors"
          >
            Share
          </button>
        </div>
      </div>
    ))}
  </div>
);

const filterMenu = (
  <Menu
    onClick={(e) => console.log('Filter selected:', e.key)}
    items={[
      { key: 'blood', label: 'Blood Test' },
      { key: 'urine', label: 'Urine Test' },
      { key: 'xray', label: 'X-Ray Scan' },
    ]}
  />
);


const PatientResult = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const [selectedFilter, setSelectedFilter] = useState('All Filters');

  const totalResults = ALL_RESULTS;
  const hasResults = totalResults.length > 0;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  const currentResults = totalResults.slice(startIndex, endIndex);

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };


  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-20 text-gray-500">
      <AiOutlineFileText className="h-16 w-16 mb-4" />
      <p className="text-lg">There are no results found</p>
    </div>
  );

  const TableView = () => (
    <div className="mt-6 hidden md:block">
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-white border-b border-gray-200">
            <tr>
              {['Date', 'Test Name', 'Hospital/Lab Name', 'Status', 'Actions'].map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-semibold text-gray-700 tracking-wider whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentResults.map((result) => (
              <tr key={result.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{result.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{result.testName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{result.labName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={result.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
                  <button
                    onClick={() => navigate(`/patientboard/results/${result.id}`)}
                    className="px-4 py-2 text-white bg-indigo-700 hover:bg-indigo-800 rounded-lg text-sm transition-colors"
                  >
                    View Result
                  </button>
                  <button className="px-4 py-2 text-indigo-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg text-sm transition-colors">
                    Share
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
        <div className="flex items-center">
          You have <span className="font-bold mx-1">{totalResults.length}</span> laboratory results (Displaying <span className="font-bold mx-1">{currentResults.length}</span> per page)
        </div>

        <div className="flex items-center space-x-4">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalResults.length}
            onChange={handlePageChange}
            showLessItems={true}
            hideOnSinglePage={true}
            itemRender={(page, type, originalElement) => {
              if (type === 'prev') return '← Previous';
              if (type === 'next') return 'Next →';
              return originalElement;
            }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-start">

        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold text-gray-800">My Result</h1>
          <p className="text-gray-500 mt-1">Get updated with your test results.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[160px]">
            <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search Result"
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition duration-150"
            />
          </div>

          <Dropdown
            overlay={filterMenu}
            trigger={['click']}
            className="w-full sm:w-auto"
          >
            <button className="w-full sm:w-36 px-4 py-2 text-sm border border-gray-300 bg-white text-gray-700 rounded-lg focus:outline-none focus:border-indigo-500 transition duration-150">
              <Space className="w-full justify-between items-center">
                {selectedFilter}
                <AiOutlineCaretDown className="text-gray-500 h-4 w-4" />
              </Space>
            </button>
          </Dropdown>
        </div>
      </div>

      {hasResults ? (
        <>
          <CardView results={currentResults} navigate={navigate} />
          <TableView />
        </>
      ) : (
        <EmptyState />
      )}

      {hasResults && (
        <div className="mt-6 flex justify-center md:hidden">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalResults.length}
            onChange={handlePageChange}
            showLessItems={true}
            hideOnSinglePage={true}
            simple={true}
            itemRender={(page, type, originalElement) => {
              if (type === 'prev') return '← Previous';
              if (type === 'next') return 'Next →';
              return originalElement;
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PatientResult;