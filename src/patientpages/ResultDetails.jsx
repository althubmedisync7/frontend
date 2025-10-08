import React from 'react';
import {
  IoDownloadOutline,
  IoShareOutline,
  IoDocumentTextOutline,
} from 'react-icons/io5';
import { useParams, useNavigate } from 'react-router-dom';
import { IoCaretBackCircleOutline } from 'react-icons/io5';

const ALL_RESULTS = [
  {
    id: 1,
    date: 'August 27, 2025',
    testName: 'Complete Blood Count (CBC)',
    labName: 'Lagos University...',
    status: 'Normal',
    details: {
      orderingDoctor: 'Dr. Akintola Bello',
      hospital: 'Lagos State Teaching Hospital',
      summary:
        'Your blood count values are within the expected range. No immediate concerns detected.',
      findings: [
        {
          component: 'Hemoglobin',
          result: '13.8 g/dL',
          normalRange: '12-15 g/dL',
          interpretation: 'Normal',
        },
        {
          component: 'White Blood Cells',
          result: '6,200 /µL',
          normalRange: '4,000–10,000 /µL',
          interpretation: 'Normal',
        },
        {
          component: 'Platelets',
          result: '210,000 /µL',
          normalRange: '150,000–400,000 /µL',
          interpretation: 'Normal',
        },
        {
          component: 'Hematocrit',
          percent: '41%',
          normalRange: '36–46%',
          interpretation: 'Normal',
        },
        {
          component: 'RBC Count',
          result: '4.8 M/µL',
          normalRange: '4.2–5.4 M/µL',
          interpretation: 'Normal',
        },
      ],
      interpretationPoints: [
        'Your results are all within normal limits.',
        'No signs of anemia, infection, or abnormal clotting issues.',
        'Healthy red blood cell, white blood cell, and platelet levels.',
      ],
      doctorsNotes:
        "Patient's blood profile is stable. Recommend continuing balanced diet and regular exercise. Repeat CBC in six (6) months or earlier if symptoms (e.g., unusual fatigue, recurrent infections, or easy bruising) occur.",
      attachment: { fileName: 'CBC.pdf', size: '36KB' },
    },
  },
  {
    id: 2,
    date: 'May 26, 2025',
    testName: 'Lipid Panel',
    labName: 'Kith Laboratory',
    status: 'Abnormal',
    details: {
      orderingDoctor: 'Dr. Chioma Nnadi',
      hospital: 'Lagos Island Clinic',
      summary:
        'Elevated LDL cholesterol noted. Lifestyle modifications and follow-up are recommended.',
      findings: [
        {
          component: 'Total Cholesterol',
          result: '245 mg/dL',
          normalRange: '< 200 mg/dL',
          interpretation: 'High',
        },
        {
          component: 'LDL Cholesterol',
          result: '170 mg/dL',
          normalRange: '< 100 mg/dL',
          interpretation: 'Abnormal',
        },
        {
          component: 'HDL Cholesterol',
          result: '42 mg/dL',
          normalRange: '> 40 mg/dL',
          interpretation: 'Normal',
        },
        {
          component: 'Triglycerides',
          result: '135 mg/dL',
          normalRange: '< 150 mg/dL',
          interpretation: 'Normal',
        },
      ],
      interpretationPoints: [
        'LDL ("bad") cholesterol is elevated, increasing cardiac risk.',
        'HDL and Triglyceride levels are acceptable.',
        'Focus on reducing saturated fats and increasing soluble fiber intake.',
      ],
      doctorsNotes:
        'Patient educated on findings. Initiate low-fat diet and exercise plan. Re-evaluate lipids in 3 months. May consider statin therapy if no improvement.',
      attachment: { fileName: 'Lipid_Panel_0526.pdf', size: '55KB' },
    },
  },
  {
    id: 3,
    date: 'April 26, 2025',
    testName: 'Kidney Function Test',
    labName: 'Lagoon Hospital',
    status: 'Normal',
  },
  {
    id: 4,
    date: 'March 25, 2025',
    testName: 'Liver Function Test',
    labName: 'Ikorodu General...',
    status: 'Normal',
  },
  {
    id: 5,
    date: 'February 25, 2025',
    testName: 'Cardiac Enzymes',
    labName: 'Lagos University...',
    status: 'Severe',
    details: {
      orderingDoctor: 'Dr. Adekunle Hassan',
      hospital: 'Emergency Cardiology Unit',
      summary:
        'Significantly elevated Troponin levels indicate acute myocardial injury. Requires immediate intervention.',
      findings: [
        {
          component: 'Troponin T',
          result: '0.45 ng/mL',
          normalRange: '< 0.04 ng/mL',
          interpretation: 'Severe',
        },
        {
          component: 'CK-MB',
          result: '150 IU/L',
          normalRange: '< 25 IU/L',
          interpretation: 'High',
        },
        {
          component: 'Lactate Dehydrogenase',
          result: '220 U/L',
          normalRange: '140–280 U/L',
          interpretation: 'Normal',
        },
      ],
      interpretationPoints: [
        'Troponin T is critically high, confirming damage to heart muscle.',
        'Patient required immediate admission and ongoing monitoring.',
        'Further diagnostic imaging (angiogram) is pending.',
      ],
      doctorsNotes:
        'Patient stabilized post-PCI. Results discussed with family. Transferring to CCU for continued care. Diet must be strictly heart-healthy.',
      attachment: { fileName: 'Cardiac_Emergency.pdf', size: '120KB' },
    },
  },
  {
    id: 6,
    date: 'January 25, 2025',
    testName: 'Thyroid Panel',
    labName: 'Kith Laboratory',
    status: 'Abnormal',
  },
  {
    id: 7,
    date: 'January 20, 2025',
    testName: 'Urinalysis',
    labName: 'General Hospital',
    status: 'Normal',
  },
  {
    id: 8,
    date: 'December 15, 2024',
    testName: 'Chest X-Ray',
    labName: 'City Diagnostic',
    status: 'Normal',
  },
  {
    id: 9,
    date: 'December 01, 2024',
    testName: 'Blood Culture',
    labName: 'Kith Laboratory',
    status: 'Severe',
    details: {
      orderingDoctor: 'Dr. Emeka Obi',
      hospital: 'Infectious Disease Unit',
      summary:
        'Positive blood culture result indicating *Staphylococcus aureus* bacteremia. Urgent antibiotic modification required.',
      findings: [
        {
          component: 'Gram Stain',
          result: 'Gram-Positive Cocci in clusters',
          normalRange: 'No organisms seen',
          interpretation: 'Positive',
        },
        {
          component: 'Organism ID',
          result: 'Staphylococcus aureus',
          normalRange: 'No growth',
          interpretation: 'Severe',
        },
        {
          component: 'Sensitivity',
          result: 'MRSA Susceptible',
          normalRange: 'N/A',
          interpretation: 'Sensitive to Vancomycin',
        },
      ],
      interpretationPoints: [
        'Confirmation of bloodstream infection (sepsis).',
        'Immediate change from empirical to targeted intravenous antibiotic therapy.',
        'Need to identify and remove the source of infection.',
      ],
      doctorsNotes:
        'Consulted with Pharmacy. Started Vancomycin IV immediately. Monitor fever, blood pressure, and renal function closely. Culture repeated in 48 hours.',
      attachment: { fileName: 'Blood_Culture_Report.pdf', size: '88KB' },
    },
  },
  {
    id: 10,
    date: 'November 20, 2024',
    testName: 'Hormone Panel (Thyroid & Cortisol)',
    labName: 'Lagos University...',
    status: 'Abnormal',
    details: {
      orderingDoctor: 'Dr. Tunde Alake',
      hospital: 'Endocrinology Clinic, Lagos University...',
      summary:
        'Free T3 is slightly low, and morning cortisol is elevated, suggesting a potential endocrine imbalance. Further investigation is required.',
      findings: [
        {
          component: 'TSH (Thyroid Stimulating Hormone)',
          result: '3.5 mIU/L',
          normalRange: '0.5–4.5 mIU/L',
          interpretation: 'Normal',
        },
        {
          component: 'Free T4',
          result: '1.2 ng/dL',
          normalRange: '0.8–1.8 ng/dL',
          interpretation: 'Normal',
        },
        {
          component: 'Free T3',
          result: '1.9 pg/mL',
          normalRange: '2.3–4.2 pg/mL',
          interpretation: 'Low',
        },
        {
          component: 'Morning Cortisol',
          result: '25 µg/dL',
          normalRange: '6–23 µg/dL',
          interpretation: 'Abnormal',
        },
      ],
      interpretationPoints: [
        'While TSH and Free T4 are normal, the isolated low Free T3 suggests possible peripheral resistance or non-thyroidal illness.',
        'Elevated morning cortisol may indicate a state of chronic stress or hyperadrenal function (Cushing syndrome is unlikely at this level).',
        'These imbalances can contribute to symptoms like fatigue and mild weight gain.',
      ],
      doctorsNotes:
        'Discussed T3 and Cortisol results with the patient. Recommend stress management techniques and sleep hygiene improvement. Repeat Morning Cortisol and T3 in 6 weeks. No immediate medication needed.',
      attachment: { fileName: 'Hormone_Panel_1120.pdf', size: '45KB' },
    },
  },
];

const StatusBadge = ({ status }) => {
  let classes = '';
  switch (status) {
    case 'Normal':
      classes = 'bg-teal-100 text-teal-700';
      break;
    case 'Abnormal':
      classes = 'bg-orange-100 text-orange-700';
      break;
    case 'Severe':
      classes = 'bg-red-100 text-red-700';
      break;
    default:
      classes = 'bg-gray-100 text-gray-700';
  }
  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${classes}`}
    >
      {status}
    </span>
  );
};

const FindingsCardView = ({ findings }) => (
  <div className="md:hidden space-y-3">
    {findings.map((finding, index) => (
      <div
        key={index}
        className="bg-white p-4 border border-gray-200 rounded-xl shadow-sm"
      >
        <div className="flex justify-between items-center mb-2">
          <div className="text-base font-semibold text-gray-900">
            {finding.component}
          </div>
          <StatusBadge status={finding.interpretation} />
        </div>

        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Result:</span>
            <span className="font-medium text-gray-800">
              {finding.result || finding.percent}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Normal Range:</span>
            <span className="text-gray-700">{finding.normalRange}</span>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const ResultDetailPage = () => {
  const navigate = useNavigate();
  const { resultId } = useParams();

  const result = ALL_RESULTS.find(r => r.id === parseInt(resultId));

  if (!result || !result.details) {
    return (
      <div className="p-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Result Details Not Available
        </h2>
        <p className="text-gray-600 mt-2">
          Could not find detailed information for Result ID:{' '}
          <span className="font-mono">{resultId}</span>.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-6 flex items-center justify-center mx-auto px-4 py-2 text-indigo-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <IoCaretBackCircleOutline className="h-5 w-5 mr-2" />
          Go Back to Results
        </button>
      </div>
    );
  }

  const data = result.details;

  return (
    <div className="p-4 px-0 md:p-0 bg-gray-50 min-h-screen">
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-gray-100">
          <div className="w-full sm:w-auto mb-4 sm:mb-0">
            <div className="flex items-center gap-2 mb-1">
              <button
                onClick={() => navigate(-1)}
                className="p-1 text-gray-500 hover:text-gray-800 transition-colors"
              >
                <IoCaretBackCircleOutline className="h-6 w-6" />
              </button>
              <p className="text-sm text-gray-500">{result.date}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                {result.testName}
              </h1>
              <StatusBadge status={result.status} />
            </div>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Ordering Doctor:</span>{' '}
              {data.orderingDoctor}
            </p>
            <p className="text-sm text-gray-600 font-normal">{data.hospital}</p>
          </div>

          <div className="flex space-x-3 w-full sm:w-auto">
            <button className="flex items-center justify-center px-4 py-3 sm:py-2 text-white bg-indigo-700 hover:bg-indigo-800 rounded-lg text-sm font-medium transition-colors shadow-md w-1/2 sm:w-auto">
              <IoDownloadOutline className="h-5 w-5 mr-2" />
              Download
            </button>
            <button className="flex items-center justify-center px-4 py-3 sm:py-2 text-indigo-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors w-1/2 sm:w-auto">
              <IoShareOutline className="h-5 w-5 mr-2" />
              Share
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-8">
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Quick Summary
          </h2>
          <p className="text-gray-600">{data.summary}</p>
        </div>

        <div className="bg-[#f0f3ff] border border-indigo-200 rounded-xl p-4 sm:p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Key Findings
          </h3>

          <FindingsCardView findings={data.findings} />

          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-indigo-200 border border-[#F2F2F2] rounded-lg">
              <thead>
                <tr className="bg-indigo-100">
                  {[
                    'Component',
                    'Result',
                    'Normal Range',
                    'Interpretation',
                  ].map(header => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-sm font-medium text-indigo-800 whitespace-nowrap"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {data.findings.map((finding, index) => (
                  <tr
                    key={index}
                    className="hover:bg-indigo-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                      {finding.component}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                      {finding.result || finding.percent}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                      {finding.normalRange}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                      {finding.interpretation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Interpretation
          </h2>
          <ul className="space-y-3">
            {data.interpretationPoints.map((point, index) => (
              <li key={index} className="flex items-start text-gray-700">
                <div className="text-indigo-600 mr-3 mt-1">◆</div>
                <p>{point}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 sm:p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Doctor's Notes
          </h2>
          <p className="text-gray-600">{data.doctorsNotes}</p>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Attachments
          </h2>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-50 border border-gray-200 rounded-xl shadow-inner">
            <div className="flex items-center space-x-3 mb-4 sm:mb-0">
              <IoDocumentTextOutline className="h-6 w-6 text-indigo-600" />
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
                <span className="font-medium text-gray-800">
                  {data.attachment.fileName}
                </span>
                <span className="text-sm text-gray-500">
                  ({data.attachment.size})
                </span>
              </div>
            </div>
            <div className="flex space-x-2 w-full sm:w-auto">
              <button
                title="Download File"
                className="flex-1 sm:flex-none p-3 text-indigo-700 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <IoDownloadOutline className="h-5 w-5 mx-auto" />
              </button>
              <button
                title="Share File"
                className="flex-1 sm:flex-none p-3 text-indigo-700 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <IoShareOutline className="h-5 w-5 mx-auto" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDetailPage;
