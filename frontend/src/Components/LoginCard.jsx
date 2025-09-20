import React, { useState } from "react";

// Component that handles the login form and logic
const LoginCard = () => {
  // State for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State for messages and UI
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // This function simulates a backend API call
  const mockApiLogin = (userEmail, userPassword) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userEmail === "test@example.com" && userPassword === "123456") {
          resolve({ success: true, message: "Login successful!" });
        } else {
          reject({ success: false, message: "Invalid email or password." });
        }
      }, 1500); // Simulate network delay
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    if (!email || !password) {
      setError("Both fields are required.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await mockApiLogin(email, password);
      setSuccessMessage(response.message);
      // Reset form fields on successful login
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 relative">
      {/* Background with low opacity image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1540189549336-e619195acb6b?q=80&w=1974&auto=format&fit=crop')",
        }}
      ></div>
      <div className="absolute inset-0 z-0 bg-black opacity-30"></div>

      {/* Login Card on top */}
      <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-2xl transition-all duration-300 hover:shadow-3xl relative z-10">
        <div className="text-center mb-8">
          <svg
            className="mx-auto w-12 h-12 text-blue-600 mb-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6a4.5 4.5 0 10-9 0v4.5m11.356-1.124a9 9 0 01-5.91 1.758m5.91-1.758a9 9 0 00-5.91-1.758m0 0a9 9 0 00-5.91 1.758M20.25 10.5a9 9 0 00-5.91-1.758m5.91 1.758v12h-12V10.5m0 0a9 9 0 00-5.91-1.758"
            />
          </svg>
          <h2 className="text-4xl font-light text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Sign in to your account</p>
        </div>

        {/* Conditional rendering for error and success messages */}
        {error && (
          <div
            className="relative mb-6 rounded-lg border border-red-400 bg-red-100 px-4 py-3 text-red-700"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {successMessage && (
          <div
            className="relative mb-6 rounded-lg border border-green-400 bg-green-100 px-4 py-3 text-green-700"
            role="alert"
          >
            <span className="block sm:inline">{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className={`w-full rounded-full py-3 font-semibold text-white transition duration-300 transform focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isLoading
                ? "cursor-not-allowed bg-gray-400"
                : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 active:scale-95"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginCard;
