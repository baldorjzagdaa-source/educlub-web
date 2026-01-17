import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabase";

export default function LogoutButton() {
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  return (
    <button
      onClick={handleLogout}
      className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm"
    >
      Logout
    </button>
  );
}
