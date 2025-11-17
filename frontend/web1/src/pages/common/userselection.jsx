import { Link } from "react-router-dom";

export default function UserSelection() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-lg w-full text-center">

        <h2 className="text-3xl font-bold mb-6">Select User Type</h2>

        <div className="grid grid-cols-1 gap-6">

          <Link to="/signup" className="p-6 border rounded-xl hover:shadow-lg transition">
            <i className="fas fa-user-hard-hat text-3xl text-blue-600 mb-3"></i>
            <h3 className="text-xl font-semibold">Labourer</h3>
          </Link>

          <Link to="/signup" className="p-6 border rounded-xl hover:shadow-lg transition">
            <i className="fas fa-helmet-safety text-3xl text-orange-600 mb-3"></i>
            <h3 className="text-xl font-semibold">Contractor</h3>
          </Link>

        </div>
      </div>

    </div>
  );
}
