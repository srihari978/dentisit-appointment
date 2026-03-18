import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function AdminLogin() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // 🔐 Hardcoded Admin Check
    if (
      form.email === "srihari@gmail.com" &&
      form.password === "1234"
    ) {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
    } else {
      setError("Invalid admin credentials");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 shadow-lg rounded-2xl w-[350px]"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Admin Login
        </h2>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Admin Email"
          className="w-full border p-2 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          required
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Login as Admin
        </button>

        {/* 🔁 Back to User Login */}
        <p className="text-center mt-4 text-sm">
          User login?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Go to Login
          </Link>
        </p>
      </form>
    </div>
  );
}