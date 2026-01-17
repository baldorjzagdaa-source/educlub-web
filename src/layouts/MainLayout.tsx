import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <>
      <Header />

      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>

      <footer className="border-t p-4 text-sm text-center text-gray-500">
        © EduClub.mn
      </footer>
    </>
  );
}
