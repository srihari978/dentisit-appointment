import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex justify-between p-4 bg-blue-600 text-white">
      <h2>Dentist App</h2>
      <div>
        <Link to="/dashboard" className="mr-4">Home</Link>
        <Link to="/appointments" className="mr-4">Appointments</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}