import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Products from "../pages/Products";
import Order from "../pages/Order";
import Address from "../pages/Address";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function RequireAuth({ children }: { children: React.ReactElement }) {
  const token = typeof window !== "undefined" ? localStorage.getItem("pizzaria_token") : null;
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default function AppRoutes() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route path="/products" element={<RequireAuth><Products /></RequireAuth>} />
        <Route path="/order" element={<RequireAuth><Order /></RequireAuth>} />
        <Route path="/address" element={<RequireAuth><Address /></RequireAuth>} />

        {/* Root and fallback -> go to products (will redirect to login if not authenticated) */}
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="*" element={<Navigate to="/products" replace />} />
      </Routes>
      <Footer />
    </Router>
  );
}
