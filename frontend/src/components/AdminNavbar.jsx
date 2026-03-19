import { useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin"); // remove admin session
    navigate("/admin-login"); // redirect to login
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white shadow-md">
      
      {/* Title */}
      <h1 className="text-xl font-bold tracking-wide">
        Admin Panel
      </h1>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
      >
        Logout
      </button>
    </div>
  );
}