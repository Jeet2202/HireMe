import React from "react";

const StepIndicator = ({ step }) => {
  const steps = [
    { id: 1, label: "UIDAI KYC Verification" },
    { id: 2, label: "Professional Screening" },
  ];

  return (
    <div className="flex items-center justify-center space-x-8 mb-10">
      {steps.map((s) => (
        <div key={s.id} className="flex flex-col items-center">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-semibold ${
              step === s.id ? "bg-blue-600" : "bg-gray-400"
            }`}
          >
            {s.id}
          </div>
          <p className="mt-2 text-sm text-gray-700">{s.label}</p>
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
