import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white shadow-md">
      
      {/* Logo */}
      <h1 className="text-xl font-bold">Dental App</h1>

      {/* Links */}
      <div className="flex gap-6 items-center">
        <Link to="/dashboard" className="hover:underline">
          Dashboard
        </Link>

        <Link to="/appointments" className="hover:underline">
          My Appointments
        </Link>

        <button
          onClick={logout}
          className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    </div>
  );
}