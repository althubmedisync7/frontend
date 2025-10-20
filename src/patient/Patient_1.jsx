import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Patient() {
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPatient = localStorage.getItem("patient");
    if (storedPatient) {
      setPatient(JSON.parse(storedPatient));
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center px-5 py-40 text-center">
      <h1 className="text-2xl font-bold mb-2">
        {patient ? `Welcome ${patient.fullName.split(" ")[0]}!` : "Welcome!"}
      </h1>

      <p className="text-gray-600 mb-6 max-w-md">
        Let’s complete your health profile, so your medical information can be
        available at your disposal!
      </p>

      <button
        className="bg-blue-900 text-white font-medium py-3 px-6 rounded w-full max-w-xs cursor-pointer"
        onClick={() => navigate("/patient/moreInfo")}
      >
        Continue
      </button>
    </div>
  );
}
