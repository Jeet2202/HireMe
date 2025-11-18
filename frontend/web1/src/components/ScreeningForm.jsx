import { useState } from "react";

const ScreeningForm = ({ onComplete }) => {
  const [form, setForm] = useState({
    experience: "",
    category: "",
    tools: "",
    location: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Professional Screening</h2>

      <div className="space-y-4">
        <input
          name="experience"
          placeholder="Years of experience"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <select
          name="category"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          <option>Electrician</option>
          <option>Plumber</option>
          <option>Carpenter</option>
        </select>

        <input
          name="tools"
          placeholder="Tools used (comma separated)"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          name="location"
          placeholder="Working City / State"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />
      </div>

      <button
        onClick={() => onComplete(form)}
        className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
      >
        Submit & Verify
      </button>
    </div>
  );
};

export default ScreeningForm;
