import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const params = new URLSearchParams(hash.replace("#", ""));
    const access_token = params.get("access_token");
    const type = params.get("type");

    if (type === "recovery" && access_token) {
      supabase.auth.setSession({
        access_token,
        refresh_token: access_token,
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password.length < 6) {
      setError("Нууц үг хамгийн багадаа 6 тэмдэгт байна");
      return;
    }

    if (password !== confirm) {
      setError("Нууц үг таарахгүй байна");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) setError(error.message);
    else setSuccess("Нууц үг амжилттай шинэчлэгдлээ");
  };

  return (
    <div style={{ maxWidth: 420, margin: "100px auto" }}>
      <h2>Шинэ нууц үг</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Шинэ нууц үг"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Шинэ нууц үг (дахин)"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          style={{ marginTop: 10 }}
        />

        <button type="submit" style={{ marginTop: 15 }}>
          Нууц үг шинэчлэх
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}
