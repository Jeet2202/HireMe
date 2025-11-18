import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StepIndicator from "../../components/StepIndicator";
import KYCUpload from "../../components/KYCUpload";
import ScreeningForm from "../../components/ScreeningForm";

const LabourerVerification = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [verified, setVerified] = useState(false);

  const finishVerification = () => {
    // Fake: save locally for future checks (optional)
    localStorage.setItem("labourerVerified", "true");
    setVerified(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-center text-3xl font-bold mb-10">
        Labourer Verification
      </h1>

      {/* Progress Indicator */}
      {!verified && <StepIndicator step={step} />}

      {/* SHOW SUCCESS SCREEN */}
      {verified ? (
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md mx-auto text-center animate-fade">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            🎉 Verification Completed!
          </h2>
          <p className="text-gray-600 mb-6">
            Your identity and professional details have been successfully verified.
          </p>

          <button
            onClick={() => navigate("/labour/dashboard")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </button>
        </div>
      ) : step === 1 ? (
        <KYCUpload onNext={() => setStep(2)} />
      ) : (
        <ScreeningForm onComplete={finishVerification} />
      )}
    </div>
  );
};

export default LabourerVerification;
