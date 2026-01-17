import { useState } from "react";
import { supabase } from "../utils/supabase";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      navigate("/admin");
    }
  }

  async function signUp() {
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert("Бүртгэл амжилттай. Одоо нэвтэрнэ үү.");
    }
  }

  return (
    <div className="container mx-auto px-4 py-20 max-w-md">
      <h1 className="text-2xl font-bold mb-6">
        🔐 Нэвтрэх / Бүртгүүлэх
      </h1>

      <form
        onSubmit={signIn}
        className="space-y-4 bg-white p-6 border rounded-xl"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-4 py-2"
          required
        />

        <input
          type="password"
          placeholder="Нууц үг"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded px-4 py-2"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Нэвтрэх
        </button>

        <button
          type="button"
          onClick={signUp}
          disabled={loading}
          className="w-full border py-2 rounded"
        >
          Бүртгүүлэх
        </button>
      </form>
    </div>
  );
}
