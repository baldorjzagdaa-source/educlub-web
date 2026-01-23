import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function Register() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    setSuccess(true)

    // ✅ auto redirect (email confirm OFF үед шууд орно)
    setTimeout(() => {
      navigate("/dashboard")
    }, 1500)
  }

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2>Бүртгүүлэх</h2>

      <form onSubmit={submit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />

        <input
          type="password"
          placeholder="Нууц үг"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: 10,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Бүртгэж байна..." : "Бүртгүүлэх"}
        </button>
      </form>

      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}

      {success && (
        <p style={{ color: "green", marginTop: 10 }}>
          ✔ Амжилттай бүртгэгдлээ. Нэвтэрч байна...
        </p>
      )}

      <div style={{ marginTop: 12, fontSize: 14 }}>
        Аль хэдийн бүртгэлтэй юу? <Link to="/login">Нэвтрэх</Link>
      </div>
    </div>
  )
}
