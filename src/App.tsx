import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Login from "./pages/Login"; // ⬅️ ШИНЭ
import Centers from "./pages/Centers";
import CenterDetail from "./pages/CenterDetail";
import Courses from "./pages/Courses";
import Club from "./pages/Club";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main layout pages */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/centers" element={<Centers />} />
          <Route path="/centers/:id" element={<CenterDetail />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/club" element={<Club />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Auth pages (no layout / no footer) */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
