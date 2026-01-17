import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="layout">
      <main>
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer-content">
          © EduClub.mn
        </div>
      </footer>
    </div>
  );
}
