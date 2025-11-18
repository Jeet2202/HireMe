import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/footer";

const ContractorVerification = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [verified, setVerified] = useState(false);

  const handleVerify = () => {
    if (!file) return;
    localStorage.setItem("contractorVerified", "true");
    setVerified(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* TOP NAVBAR */}
      <div className="w-full sticky top-0 left-0 bg-white border-b shadow-sm z-50">
        <TopNavbar />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6 pb-20 overflow-y-auto">
        <h1 className="text-center text-3xl font-bold mb-10 tracking-tight">
          
        </h1>

        {!verified ? (
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-xl mx-auto border border-gray-200">

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Upload Aadhaar XML File
            </h2>
            
            <p className="text-gray-600 text-sm mb-4">
              Upload your Aadhaar e-KYC XML file from the UIDAI portal. Make sure it's not older than 3 days.
            </p>

            {/* File Upload Box */}
            <label className="block border-2 border-dashed p-6 rounded-lg cursor-pointer text-center hover:bg-gray-50 transition">
              <input
                type="file"
                accept=".xml"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />
              {file ? (
                <span className="text-green-600 font-semibold">{file.name}</span>
              ) : (
                <span className="text-gray-500">Click to upload XML file</span>
              )}
            </label>

            {/* Help Section */}
            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800">Need Help?</h3>
              <p className="text-gray-600 text-sm">
                Watch this short guide on how to download Aadhaar XML.
              </p>

              <iframe
                className="mt-3 rounded-lg w-full"
                height="200"
                src="https://www.youtube.com/embed/ahxAhQQZfIM"
                title="UIDAI Help"
              ></iframe>
            </div>

            {/* Verify Button */}
            <button
              onClick={handleVerify}
              disabled={!file}
              className={`w-full mt-6 py-3 rounded-lg text-white font-semibold transition ${
                file ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Verify
            </button>
          </div>
        ) : (
          /* SUCCESS SCREEN */
          <div className="bg-white p-10 rounded-2xl shadow-xl max-w-lg mx-auto text-center animate-fade border border-gray-200">

            <div className="flex justify-center mb-5">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
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

            <h2 className="text-3xl font-semibold text-gray-800">Verification Successful 🎉</h2>

            <p className="text-gray-600 mt-3">
              Your Aadhaar verification is complete. Welcome to the platform!
            </p>

            <div className="my-6 w-20 h-1 bg-green-500 rounded mx-auto"></div>

            <button
              onClick={() => navigate("/contractor-dashboard")}
              className="bg-blue-600 text-white font-medium py-3 rounded-xl hover:bg-blue-700 transition duration-200 shadow-md"
            >
              Go To Dashboard
            </button>

          </div>
        )}
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default ContractorVerification;
