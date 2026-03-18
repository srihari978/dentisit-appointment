import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/authApi";

export default function Login() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Login
        </h2>

        <input
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={login}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>

        {/* 🔥 SIGNUP LINK */}
        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}