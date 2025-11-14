import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  return isLoggedIn ? <Outlet /> : <Navigate to="/Login" replace />;
}
export function PublicRoute() {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  return isLoggedIn ? <Navigate to="/Dashboard" replace /> : <Outlet />;
}
