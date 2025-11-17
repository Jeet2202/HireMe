export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>

        <form className="space-y-4">
          <div>
            <label className="font-medium">Full Name</label>
            <input type="text" className="w-full mt-1 px-4 py-2 border rounded-lg focus:border-blue-500" />
          </div>

          <div>
            <label className="font-medium">Email</label>
            <input type="email" className="w-full mt-1 px-4 py-2 border rounded-lg focus:border-blue-500" />
          </div>

          <div>
            <label className="font-medium">Phone</label>
            <input type="tel" className="w-full mt-1 px-4 py-2 border rounded-lg focus:border-blue-500" />
          </div>

          <div>
            <label className="font-medium">Password</label>
            <input type="password" className="w-full mt-1 px-4 py-2 border rounded-lg focus:border-blue-500" />
          </div>

          <div>
            <label className="font-medium">Register As</label>
            <select className="w-full mt-1 px-4 py-2 border rounded-lg focus:border-blue-500">
              <option>Labourer</option>
              <option>Contractor</option>
            </select>
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
            Sign Up
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </p>

      </div>
    </div>
  );
}
