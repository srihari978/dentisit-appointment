import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/authApi";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const register = async () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await API.post("/auth/register", {
        username: form.username,
        email: form.email,
        password: form.password
      });

      alert("Registered successfully");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Register
        </h2>

        <input
          placeholder="Username"
          className="w-full mb-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
        />

        <button
          onClick={register}
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
        >
          Register
        </button>

        {/* 🔥 LOGIN NAV LINK */}
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}