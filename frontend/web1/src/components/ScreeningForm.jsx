import { useState } from "react";

const ScreeningForm = ({ onComplete }) => {
  const [form, setForm] = useState({
    experience: "",
    category: "",
    tools: [],
    location: "",
  });

  const [toolInput, setToolInput] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addTool = (e) => {
    e.preventDefault();
    if (toolInput.trim() !== "") {
      setForm({ ...form, tools: [...form.tools, toolInput] });
      setToolInput("");
    }
  };

  const removeTool = (tool) => {
    setForm({ ...form, tools: form.tools.filter((t) => t !== tool) });
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto border border-gray-200">
      
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Professional Screening
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Experience */}
        <div>
          <label className="text-gray-700 font-medium">Years of Experience</label>
          <input
            type="number"
            name="experience"
            placeholder="Eg: 3"
            className="w-full border mt-2 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition outline-none"
            onChange={handleChange}
          />
        </div>

        {/* Category */}
        <div>
          <label className="text-gray-700 font-medium">Category</label>
          <select
            name="category"
            className="w-full border mt-2 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition outline-none"
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option>Electrician</option>
            <option>Plumber</option>
            <option>Carpenter</option>
            <option>Mason</option>
            <option>Painter</option>
          </select>
        </div>

        {/* Location */}
        <div className="md:col-span-2">
          <label className="text-gray-700 font-medium">Work Location</label>
          <input
            name="location"
            placeholder="City / State"
            className="w-full border mt-2 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition outline-none"
            onChange={handleChange}
          />
        </div>

        {/* Tools */}
        <div className="md:col-span-2">
          <label className="text-gray-700 font-medium">Tools You Use</label>
          
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Eg: Drill Machine"
              value={toolInput}
              onChange={(e) => setToolInput(e.target.value)}
              className="flex-1 border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              onClick={addTool}
              className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Add
            </button>
          </div>

          {/* Tools shown as tags */}
          <div className="flex flex-wrap mt-3 gap-2">
            {form.tools.map((tool, index) => (
              <span
                key={index}
                className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2"
              >
                {tool}
                <button
                  onClick={() => removeTool(tool)}
                  className="text-red-500 font-bold hover:text-red-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={() => onComplete(form)}
        className="mt-8 w-full bg-blue-600 text-white py-3 rounded-lg text-lg hover:bg-blue-700 transition"
      >
        Submit and Verify
      </button>
    </div>
  );
};

export default ScreeningForm;
