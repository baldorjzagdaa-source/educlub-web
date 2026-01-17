import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AdminGuard from "./components/AdminGuard";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Centers from "./pages/Centers";
import CenterDetail from "./pages/CenterDetail";
import Courses from "./pages/Courses";
import Club from "./pages/Club";
import Contact from "./pages/Contact";

import AdminCenters from "./pages/AdminCenters";
import AdminAddCenter from "./pages/AdminAddCenter";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public pages */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/centers" element={<Centers />} />
          <Route path="/centers/:id" element={<CenterDetail />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/club" element={<Club />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Auth */}
        <Route path="/login" element={<Auth />} />

        {/* Admin protected */}
        <Route
          path="/admin"
          element={
            <AdminGuard>
              <AdminCenters />
            </AdminGuard>
          }
        />
        <Route
          path="/admin/add"
          element={
            <AdminGuard>
              <AdminAddCenter />
            </AdminGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
