import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../utils/supabase";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(null);

    const { data, error: loginError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (loginError || !data.user) {
      setError("Имэйл эсвэл нууц үг буруу");
      setLoading(false);
      return;
    }

    navigate("/", { replace: true });
    setLoading(false);
  }

  // 🔵 GOOGLE LOGIN
  async function handleGoogleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://educclub.mn",
      },
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Нэвтрэх</h1>

        {error && (
          <p className="text-red-600 text-sm mb-3 text-center">{error}</p>
        )}

        <input
          type="email"
          placeholder="Имэйл"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded mb-3"
        />

        <input
          type="password"
          placeholder="Нууц үг"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded mb-2"
        />

        {/* 🔹 Нууц үг сэргээх */}
        <p className="text-sm text-right mb-4">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Нууц үг мартсан уу?
          </Link>
        </p>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-3"
        >
          {loading ? "Нэвтэрч байна..." : "Нэвтрэх"}
        </button>

        {/* 🔵 GOOGLE BUTTON */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full border py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-50"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Google-ээр нэвтрэх
        </button>

        <p className="text-sm text-center mt-4">
          Шинэ хэрэглэгч үү?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Бүртгүүлэх
          </Link>
        </p>
      </form>
    </div>
  );
}
