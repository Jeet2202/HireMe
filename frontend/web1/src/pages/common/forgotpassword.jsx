export default function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6">Reset Password</h2>

        <form className="space-y-4">
          <div>
            <label className="font-medium">Email</label>
            <input type="email" className="w-full mt-1 px-4 py-2 border rounded-lg focus:border-blue-500" />
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
            Send Reset Link
          </button>
        </form>

        <p className="text-center mt-4">
          Back to <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </p>

      </div>
    </div>
  );
}
