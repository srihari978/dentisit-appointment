import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        localStorage.setItem("admin", "true");
        navigate("/admin");
      } else {
        alert("Invalid admin login");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <>
    

      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-200">
        
        {/* Card */}
        <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
          
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
            Admin Login
          </h2>

          {/* Email */}
          <input
            type="email"
            placeholder="Enter email"
            className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Enter password"
            className="w-full mb-6 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Button */}
          <button
            onClick={login}
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>

          {/* Hint */}
          <p className="text-center text-sm text-gray-500 mt-4">
            Only authorized admin can access
          </p>
        </div>
      </div>
    </>
  );
}