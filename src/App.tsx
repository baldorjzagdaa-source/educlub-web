import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Centers from "./pages/Centers";
import CenterDetail from "./pages/CenterDetail";
import AdminAddCenter from "./pages/AdminAddCenter";
import AdminCenters from "./pages/AdminCenters";
import Auth from "./pages/Auth";
import AdminGuard from "./components/AdminGuard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/centers" element={<Centers />} />
          <Route path="/centers/:id" element={<CenterDetail />} />
          <Route path="/auth" element={<Auth />} />

          {/* Admin pages */}
          <Route
            path="/admin"
            element={
              <AdminGuard>
                <AdminAddCenter />
              </AdminGuard>
            }
          />

          <Route
            path="/admin/centers"
            element={
              <AdminGuard>
                <AdminCenters />
              </AdminGuard>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
