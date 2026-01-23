import { Navigate } from "react-router-dom"
import { useProfile } from "../hooks/useProfile"

export default function RoleRoute({
  allow,
  children,
}: {
  allow: Array<"admin" | "teacher" | "student">
  children: JSX.Element
}) {
  const { profile, loading } = useProfile()

  if (loading) return <p>Checking access...</p>

  if (!profile || !allow.includes(profile.role)) {
    return <Navigate to="/" replace />
  }

  return children
}
