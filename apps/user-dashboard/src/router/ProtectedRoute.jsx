import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const myToken = sessionStorage.getItem("token");
  return myToken ? <Outlet /> : <Navigate to="/Login" replace />;
}
export function PublicRoute() {
  const myToken = sessionStorage.getItem("token");
  return myToken ? <Navigate to="/Dashboard" replace /> : <Outlet />;
}
