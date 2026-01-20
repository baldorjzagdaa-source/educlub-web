import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Centers from "./pages/Centers";
import CenterDetail from "./pages/CenterDetail";
import Courses from "./pages/Courses";
import Club from "./pages/Club";
import Contact from "./pages/Contact";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ===== Main layout pages ===== */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/centers" element={<Centers />} />
          <Route path="/centers/:id" element={<CenterDetail />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/club" element={<Club />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* ===== Auth pages (no layout) ===== */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}
