import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../utils/supabase";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    // 1️⃣ Supabase auth signup
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError || !data.user) {
      setError(signUpError?.message || "Бүртгүүлэхэд алдаа гарлаа");
      setLoading(false);
      return;
    }

    // 2️⃣ profiles table → default role = student
    const { error: profileError } = await supabase.from("profiles").insert({
      user_id: data.user.id,
      email: email,
      role: "student",
    });

    if (profileError) {
      setError("Profile үүсгэхэд алдаа гарлаа");
      setLoading(false);
      return;
    }

    setSuccess("Бүртгэл амжилттай! Нэвтрэх хуудас руу шилжинэ…");

    setTimeout(() => {
      navigate("/login");
    }, 1500);

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Бүртгүүлэх</h1>

        {error && (
          <p className="text-red-600 text-sm mb-3 text-center">{error}</p>
        )}

        {success && (
          <p className="text-green-600 text-sm mb-3 text-center">{success}</p>
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
          placeholder="Нууц үг (6+ тэмдэг)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="w-full border px-3 py-2 rounded mb-4"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Бүртгэж байна..." : "Бүртгүүлэх"}
        </button>

        <p className="text-sm text-center mt-4">
          Аль хэдийн бүртгэлтэй юу?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Нэвтрэх
          </Link>
        </p>
      </form>
    </div>
  );
}
