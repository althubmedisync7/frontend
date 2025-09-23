import { useEffect, useState } from "react";
import { FaTint, FaDna, FaVenusMars } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi2";

export default function PatientDashboard() {
  const [patient, setPatient] = useState(null);
  const [greeting, setGreeting] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    bloodGroup: "",
    genotype: "",
    gender: "",
  });

  useEffect(() => {
    const storedPatient = localStorage.getItem("patientMoreInfo");
    if (storedPatient) {
      const parsed = JSON.parse(storedPatient);
      setPatient(parsed);
      setFormData(parsed); // preload form
    }

    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good morning");
    } else if (hour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);

  // Helper to calculate age from dob
  const calculateAge = (dob) => {
    if (!dob) return null;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Save changes
  const handleSave = () => {
    localStorage.setItem("patientMoreInfo", JSON.stringify(formData));
    setPatient(formData);
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      {/* Greeting */}
      <h1 className="text-xl font-bold mb-2">
        {greeting} {patient ? patient.fullName?.split(" ")[0] : "Guest"}!
      </h1>
      <p className="mb-4">Here’s what is happening with your health today.</p>

      {/* Basic Info Card */}
      <div className="bg-white shadow-md rounded-lg p-6 border">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-600">
            Basic Information
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
          >
            Edit
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Age */}
  <div className="flex items-center space-x-3  p-3">
    <HiOutlineUserGroup className="text-white bg-[#1E318A] p-2 rounded-full w-10 h-10" />
    <div>
      <p className="text-sm text-gray-500">Age</p>
      <p className="font-semibold">
        {patient?.dob ? `${calculateAge(patient.dob)} years` : "Nil"}
      </p>
    </div>
  </div>

  {/* Blood Group */}
  <div className="flex items-center space-x-3  p-5">
    <FaTint className="text-white bg-[#1E318A] p-2 rounded-full w-10 h-10" />
    <div>
      <p className="text-sm text-gray-500">Blood Group</p>
      <p className="font-semibold">{patient?.bloodGroup || "Nil"}</p>
    </div>
  </div>

  {/* Genotype */}
  <div className="flex items-center space-x-3  p-3">
    <FaDna className="text-white bg-[#1E318A] p-2 rounded-full w-10 h-10" />
    <div>
      <p className="text-sm text-gray-500">Genotype</p>
      <p className="font-semibold">{patient?.genotype || "Nil"}</p>
    </div>
  </div>

  {/* Gender */}
  <div className="flex items-center space-x-3  p-3">
    <FaVenusMars className="text-white bg-[#1E318A] p-2 rounded-full w-10 h-10" />
    <div>
      <p className="text-sm text-gray-500">Gender</p>
      <p className="font-semibold">{patient?.gender || "Nil"}</p>
    </div>
  </div>
</div>

      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Edit Basic Info</h2>
            <div className="space-y-3">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full border rounded p-2"
              />
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
              <input
                type="text"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                placeholder="Blood Group"
                className="w-full border rounded p-2"
              />
              <input
                type="text"
                name="genotype"
                value={formData.genotype}
                onChange={handleChange}
                placeholder="Genotype"
                className="w-full border rounded p-2"
              />
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                placeholder="Gender"
                className="w-full border rounded p-2"
              />
            </div>

            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
