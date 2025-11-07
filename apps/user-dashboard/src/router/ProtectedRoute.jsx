import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const myToken = localStorage.getItem("token");
  return myToken ? <Outlet /> : <Navigate to="/Login" replace />;
}
