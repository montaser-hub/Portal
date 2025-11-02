import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import Navbar from "../components/layout/nav/Navbar";
import { Outlet } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";




function AppLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}


export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/Login" element={<LoginPage />} />


      <Route element={<AppLayout />}>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

