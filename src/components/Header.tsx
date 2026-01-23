import { NavLink, useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"
import { useAuth } from "../context/AuthContext"

export default function Header() {
  const { session } = useAuth()
  const navigate = useNavigate()

  async function logout() {
    await supabase.auth.signOut()
    navigate("/")
  }

  const baseClass =
    "px-4 py-2 rounded-md text-sm transition-colors"

  const activeClass =
    "text-blue-600 font-semibold border-b-2 border-blue-600"

  const inactiveClass =
    "text-gray-700 hover:text-blue-500"

  return (
    <header className="border-b p-4 flex justify-between items-center">
      <NavLink to="/" className="font-bold text-lg">
        EduClub
      </NavLink>

      <nav className="flex gap-4 items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${baseClass} ${
              isActive ? activeClass : inactiveClass
            }`
          }
        >
          Нүүр
        </NavLink>

        {!session ? (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `${baseClass} ${
                  isActive ? activeClass : inactiveClass
                }`
              }
            >
              Нэвтрэх
            </NavLink>

            <NavLink
              to="/register"
              className={({ isActive }) =>
                `${baseClass} ${
                  isActive ? activeClass : inactiveClass
                }`
              }
            >
              Бүртгүүлэх
            </NavLink>
          </>
        ) : (
          <button
            onClick={logout}
            className={`${baseClass} text-red-600 hover:text-red-700`}
          >
            Гарах
          </button>
        )}
      </nav>
    </header>
  )
}
