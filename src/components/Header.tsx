import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"
import { useAuth } from "../context/AuthContext"

export default function Header() {
  const { session } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const isHome = location.pathname === "/"

  async function logout() {
    await supabase.auth.signOut()
    navigate("/")
  }

  const linkClass = "px-4 py-2 rounded-md text-sm"

  return (
    <header className="border-b p-4 flex justify-between items-center">
      <NavLink to="/" className="font-bold">
        EduClub
      </NavLink>

      <nav className="flex gap-2 items-center">
        <NavLink to="/" className={linkClass}>
          Нүүр
        </NavLink>

        {session ? (
          <button onClick={logout} className={linkClass}>
            Гарах
          </button>
        ) : (
          <>
            <NavLink to="/login" className={linkClass}>
              Нэвтрэх
            </NavLink>

            {/* ❌ НҮҮР ХУУДСАНД БҮРТГҮҮЛЭХИЙГ НУУНА */}
            {!isHome && (
              <NavLink to="/register" className={linkClass}>
                Бүртгүүлэх
              </NavLink>
            )}
          </>
        )}
      </nav>
    </header>
  )
}
