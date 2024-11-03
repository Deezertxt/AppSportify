import { useAuth } from "./authContext";
import { Navigate } from "react-router-dom";

export function ProtectedRoutes({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null;
  if(!user) return <Navigate to="/" />;

  return<> {children} </>;
}