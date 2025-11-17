export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <form className="space-y-4">
          <div>
            <label className="font-medium">Email</label>
            <input type="email" className="w-full mt-1 px-4 py-2 border rounded-lg focus:border-blue-500" />
          </div>

          <div>
            <label className="font-medium">Password</label>
            <input type="password" className="w-full mt-1 px-4 py-2 border rounded-lg focus:border-blue-500" />
          </div>

          <a href="/forgot-password" className="text-blue-600 text-sm hover:underline">
            Forgot Password?
          </a>

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Signup</a>
        </p>

      </div>
    </div>
  );
}
