import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((_e, session) => {
        setUser(session?.user ?? null);
      });

    return () => subscription.unsubscribe();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    navigate("/");
  }

  const linkClass = "px-4 py-2 rounded-md text-sm";

  return (
    <header className="border-b p-4 flex justify-between">
      <NavLink to="/">EduClub</NavLink>

      <nav className="flex gap-2">
        <NavLink to="/" className={linkClass}>Home</NavLink>

        {user ? (
          <>
            <button onClick={logout} className={linkClass}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={linkClass}>Login</NavLink>
            <NavLink to="/register" className={linkClass}>Register</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
