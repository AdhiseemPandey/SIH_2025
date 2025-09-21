import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ handleLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const mockApiLogin = (userEmail, userPassword) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userEmail === "test@example.com" && userPassword === "123456") {
          resolve({ success: true });
        } else {
          reject({ message: "Invalid email or password." });
        }
      }, 1000);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await mockApiLogin(email, password);
      handleLogin();      // Update the global state in App.jsx
      navigate('/posts'); // Redirect to the dashboard
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 relative bg-gray-100">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1540189549336-e619195acb6b?q=80&w=1974&auto=format&fit=crop')",
        }}
      ></div>

      <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-light text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Sign in to your account</p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-100 p-4 text-center text-red-700" role="alert">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="test@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="123456"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />
          </div>
          <button
            type="submit"
            className={`w-full rounded-full py-3 font-semibold text-white transition ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600"}`}
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;