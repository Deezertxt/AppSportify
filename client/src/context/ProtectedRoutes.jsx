import { useAuth } from "./authContext";
import { Navigate } from "react-router-dom";

export function ProtectedRoutes({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null; // O una pantalla de carga si es necesario
  if (!user) return <Navigate to="/" />; // Redirige si no hay usuario

  return <>{children}</>;
}
