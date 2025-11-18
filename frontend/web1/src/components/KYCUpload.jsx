import { useState } from "react";

const KYCUpload = ({ onNext }) => {
  const [file, setFile] = useState(null);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Upload UIDAI XML File</h2>
      <p className="text-gray-600 text-sm mb-4">
        Upload the UIDAI e-KYC XML file generated from the official portal. 
        Make sure it is not older than 3 days.
      </p>

      <label className="block border-dashed border-2 p-6 rounded-lg cursor-pointer text-center">
        <input
          type="file"
          accept=".xml"
          className="hidden"
          onChange={(e) => setFile(e.target.files[0])}
        />
        {file ? (
          <span className="font-semibold text-green-600">{file.name}</span>
        ) : (
          "Click to upload XML file"
        )}
      </label>

      {/* Help Section */}
      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold">Need Help?</h3>
        <p className="text-sm text-gray-600">
          Watch this quick guide to generate your UIDAI XML.
        </p>
        <iframe
          className="mt-3 rounded-lg"
          width="100%"
          height="200"
          src="https://www.youtube.com/embed/ahxAhQQZfIM"
          title="UIDAI Help"
        ></iframe>
      </div>

      <button
        onClick={() => file && onNext()}
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        disabled={!file}
      >
        Verify & Continue
      </button>
    </div>
  );
};

export default KYCUpload;
