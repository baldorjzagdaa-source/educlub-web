import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Centers from "./pages/Centers";
import CenterDetail from "./pages/CenterDetail";
import Courses from "./pages/Courses";
import Club from "./pages/Club";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/centers" element={<Centers />} />
          <Route path="/centers/:id" element={<CenterDetail />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/club" element={<Club />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Auth (no footer later) */}
        <Route path="/login" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}
