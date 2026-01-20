import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../utils/supabase";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(null);

    // 1️⃣ Login
    const { data, error: loginError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (loginError || !data.user) {
      setError(loginError?.message || "Нэвтрэхэд алдаа гарлаа");
      setLoading(false);
      return;
    }

    // 2️⃣ Role авах (profiles.id = auth.users.id)
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .maybeSingle();

    // 3️⃣ Redirect логик
    if (!profile || profileError) {
      // profile байхгүй → энгийн хэрэглэгч
      navigate("/", { replace: true });
    } else if (profile.role === "admin") {
      navigate("/admin", { replace: true });
    } else {
      navigate("/", { replace: true });
    }

    setLoading(false);
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
          className="w-full border px-3 py-2 rounded mb-4"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Нэвтэрч байна..." : "Нэвтрэх"}
        </button>

        {/* ✅ БҮРТГҮҮЛЭХ ЛИНК */}
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
