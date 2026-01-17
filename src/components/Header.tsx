import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState<any>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    // initial session
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    // listen auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    navigate("/");
  }

  function handleSearch(value: string) {
    setQuery(value);
    navigate(value ? `/centers?q=${encodeURIComponent(value)}` : "/centers");
  }

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-md text-sm font-medium transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <NavLink to="/" className="text-xl font-bold text-blue-600">
          EduClub
        </NavLink>

        {/* Search (Centers дээр) */}
        {location.pathname.startsWith("/centers") && (
          <input
            type="text"
            placeholder="Сургалтын төв хайх..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="hidden md:block w-full max-w-md border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          />
        )}

        {/* Right menu */}
        <nav className="flex items-center gap-2">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/centers" className={linkClass}>
            Centers
          </NavLink>

          {user ? (
            <>
              <NavLink to="/admin" className={linkClass}>
                Admin
              </NavLink>

              <button
                onClick={logout}
                className="px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"   // 🔴 ЭНД ЗАСАГДСАН
              className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
