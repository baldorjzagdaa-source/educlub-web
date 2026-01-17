import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout() {
  const location = useLocation();

  // Footer нуух замууд
  const hideFooterRoutes = ["/login", "/admin"];
  const hideFooter = hideFooterRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      {!hideFooter && <Footer />}
    </div>
  );
}
