// src/pages/PrescriptionDetails.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DoctorEntries } from "../data/DoctorEntry";
import { Personal } from "../data/PersonalEntry";
import {
  IoChevronBackCircleOutline,
  IoChevronDown,
  IoChevronUp,
  IoShareOutline,
} from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";

export default function PrescriptionDetails() {
  const { source, id } = useParams();
  const entryId = parseInt(id);

  const data = source === "doctor" ? DoctorEntries : Personal;
  const prescription = data.find((item) => item.id === entryId);
  const navigate = useNavigate();

  const [openIndex, setOpenIndex] = useState(null);

  if (!prescription) {
    return (
      <div className="p-6">
        <button onClick={() => navigate(-1)} className="mb-4">
          <IoChevronBackCircleOutline size={28} className="cursor-pointer" />
        </button>
        <p className="text-red-500">Prescription not found!</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto md:my-10">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <button onClick={() => navigate(-1)} className="mb-2">
            <IoChevronBackCircleOutline size={28} className="cursor-pointer" />
          </button>
          <h1 className="text-2xl font-semibold mt-6">Prescription Details</h1>
          {prescription.date && (
            <p className="text-sm text-gray-500">{prescription.date}</p>
          )}
          {prescription.doctor && (
            <p className="text-sm text-gray-500">
              Prescribed by: {prescription.doctor}
            </p>
          )}
          {prescription.hospital && (
            <p className="text-sm text-gray-500">{prescription.hospital}</p>
          )}
        </div>

        <div className="flex gap-2">
          <button className="bg-[#1E318A] text-white px-4 py-2 rounded flex items-center">
            Download <IoShareOutline className="ml-2" />
          </button>
          <button className="border px-4 py-2 rounded flex items-center">
            Delete <MdDeleteOutline className="ml-2" />
          </button>
        </div>
      </div>

      {/* Mobile View - Dropdown Medications */}
      <div className="lg:hidden">
        <h2 className="text-lg font-medium mb-4 mt-6">Medications</h2>
        <div className="bg-gray-50 rounded-lg p-4">
          {Array.isArray(prescription.medication) ? (
            prescription.medication.map((m, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={i} className="border-b last:border-none">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex justify-between items-center py-3 font-semibold text-left"
                  >
                    {typeof m === "string"
                      ? m
                      : `${m.name}${m.dosage ? ` - ${m.dosage}` : ""}`}
                    {isOpen ? (
                      <IoChevronUp className="text-gray-600" />
                    ) : (
                      <IoChevronDown className="text-gray-600" />
                    )}
                  </button>

                  {isOpen && typeof m !== "string" && (
                    <div className="pb-4 pl-1 space-y-2 text-sm">
                      {m.dosage && (
                        <p className="text-[#4B5AA1]">
                          Dosage:{" "}
                          <span className="text-black">{m.dosage}</span>
                        </p>
                      )}
                      {m.duration && (
                        <p className="text-[#4B5AA1]">
                          Duration:{" "}
                          <span className="text-black">{m.duration}</span>
                        </p>
                      )}
                      {m.instructions && (
                        <p className="text-[#4B5AA1]">
                          Instructions:{" "}
                          <span className="text-black">{m.instructions}</span>
                        </p>
                      )}
                      {m.sideEffect && (
                        <p className="text-[#4B5AA1]">
                          Side Effect:{" "}
                          <span className="text-black">{m.sideEffect}</span>
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p>No medication info available.</p>
          )}
        </div>
      </div>

      {/* Desktop View - Full Medications List */}
      <div className="hidden lg:block">
        <h2 className="text-lg font-medium mb-4 mt-6">Medications</h2>
        {Array.isArray(prescription.medication) ? (
          prescription.medication.map((m, i) => (
            <div key={i} className="mb-6">
              {typeof m === "string" ? (
                <p className="font-semibold">{m}</p>
              ) : (
                <>
                  <p className="font-semibold">
                    {m.name} {m.dosage && `- ${m.dosage}`}
                  </p>
                  {m.duration && (
                    <p className="text-sm text-[#4B5AA1]">
                      Duration:{" "}
                      <span className="text-black">{m.duration}</span>
                    </p>
                  )}
                  {m.instructions && (
                    <p className="text-sm text-[#4B5AA1]">
                      Instructions:{" "}
                      <span className="text-black">{m.instructions}</span>
                    </p>
                  )}
                  {m.sideEffect && (
                    <p className="text-sm text-[#4B5AA1]">
                      Side Effect:{" "}
                      <span className="text-black">{m.sideEffect}</span>
                    </p>
                  )}
                </>
              )}
            </div>
          ))
        ) : (
          <p>No medication info available.</p>
        )}
      </div>

      {/* Doctor's Notes */}
      {prescription.note && (
        <div className="mt-8">
          <h2 className="text-lg font-medium mb-2">Doctor’s Notes</h2>
          <p className="text-sm text-gray-700">{prescription.note}</p>
        </div>
      )}
    </div>
  );
}
