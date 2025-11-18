import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StepIndicator from "../../components/StepIndicator";
import KYCUpload from "../../components/KYCUpload";
import ScreeningForm from "../../components/ScreeningForm";
import Footer from "../../components/footer";
import BottomNavbar from "../../components/BottomNavbar";

const LabourerVerification = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [verified, setVerified] = useState(false);

  const finishVerification = () => {
    localStorage.setItem("labourerVerified", "true");
    setVerified(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* ===== TOP NAVBAR ===== */}
      <div className="w-full sticky top-0 left-0 bg-white border-b shadow-sm z-50">
        <BottomNavbar />
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 p-6 pb-20 pt-15 overflow-y-auto">

        <h1 className="text-center text-3xl font-bold mb-10 tracking-tight">
          
        </h1>

        {/* Step progress indicator */}
        {!verified && (
          <div className="mb-8">
            <StepIndicator step={step} />
          </div>
        )}

        {/* ===== CONDITIONAL RENDERING FOR STEPS ===== */}
        {verified ? (
          <div className="bg-white p-10 rounded-2xl shadow-xl max-w-lg mx-auto text-center animate-fade border border-gray-200">

            {/* Success Icon */}
            <div className="flex justify-center mb-5">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h2 className="text-3xl font-semibold text-gray-800">Verification Completed 🎉</h2>

            <p className="text-gray-600 mt-3 leading-relaxed">
              Your verification is successful. You can now access job listings and build your profile further.
            </p>

            {/* Divider Line */}
            <div className="my-6 w-20 h-1 bg-green-500 rounded mx-auto"></div>

            {/* Buttons */}
            <div className="flex flex-col gap-4">
              <button
                onClick={() => navigate("/labour/dashboard")}
                className="bg-blue-600 text-white font-medium py-3 rounded-xl hover:bg-blue-700 transition duration-200 shadow-md"
              >
                Go to Dashboard
              </button>

              <button
                disabled
                className="border border-gray-400 text-gray-600 font-medium py-3 rounded-xl bg-gray-100 cursor-not-allowed"
              >
                Take Skill Test (Coming Soon)
              </button>
            </div>
          </div>
        ) : step === 1 ? (
          <KYCUpload onNext={() => setStep(2)} />
        ) : (
          <ScreeningForm onComplete={finishVerification} />
        )}
      </div>

      {/* ===== FULL WIDTH FOOTER ===== */}
      <Footer />
    </div>
  );
};

export default LabourerVerification;
