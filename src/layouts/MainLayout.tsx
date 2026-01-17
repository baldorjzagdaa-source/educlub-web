import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      {/* Header энд байж болно */}

      <main>
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          © EduClub.mn
        </div>
      </footer>
    </>
  );
}
