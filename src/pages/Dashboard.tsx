import { useProfile } from "../hooks/useProfile"

export default function Dashboard() {
  const { profile, loading } = useProfile()

  if (loading) return <p>Loading profile...</p>

  return (
    <div style={{ padding: 24 }}>
      <h2>Dashboard</h2>

      <p><b>Email:</b> {profile.email}</p>
      <p><b>Role:</b> {profile.role}</p>
    </div>
  )
}
