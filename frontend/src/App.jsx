import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import BookAppointment from "./pages/BookAppointment";
import MyAppointments from "./pages/MyAppointments";
import ProtectedRoute from "./components/ProtectedRoute";

import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* User Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />

        <Route
          path="/book/:doctorId"
          element={<ProtectedRoute><BookAppointment /></ProtectedRoute>}
        />

        <Route
          path="/appointments"
          element={<ProtectedRoute><MyAppointments /></ProtectedRoute>}
        />

        {/* 🔐 Admin Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;