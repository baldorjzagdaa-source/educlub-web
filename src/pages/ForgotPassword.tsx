import { useState } from "react";
import { supabase } from "../utils/supabase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://educlub.mn/#/reset-password",
    });

    if (error) {
      setMessage("Алдаа гарлаа");
    } else {
      setMessage("Имэйл илгээгдлээ");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "100px auto" }}>
      <h2>Нууц үг сэргээх</h2>
      <form onSubmit={handleReset}>
        <input
          type="email"
          placeholder="Имэйл"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Илгээх</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
