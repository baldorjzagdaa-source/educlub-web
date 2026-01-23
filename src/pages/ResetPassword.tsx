import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function ResetPassword() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [ready, setReady] = useState(false)
  const navigate = useNavigate()

  // 🔑 Recovery session тохируулах
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    const access_token = params.get("access_token")
    const refresh_token = params.get("refresh_token")

    if (!access_token || !refresh_token) {
      setError("Invalid or expired reset link")
      return
    }

    supabase.auth
      .setSession({
        access_token,
        refresh_token,
      })
      .then(({ error }) => {
        if (error) setError(error.message)
        else setReady(true)
      })
  }, [])

  // 🔐 Нууц үг шинэчлэх
  async function submit() {
    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError(error.message)
      return
    }

    navigate("/login")
  }

  if (!ready) return <p>Recovery session тохируулж байна...</p>

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h3>Шинэ нууц үг</h3>

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Шинэ нууц үг"
      />

      <button onClick={submit}>Нууц үг шинэчлэх</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  )
}
