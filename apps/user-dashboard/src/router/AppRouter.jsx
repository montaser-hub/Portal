import { Routes, Route, Outlet } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import Navbar from "../components/layout/nav/Navbar";
import Dashboard from "../pages/Dashboard";
import CalendarPage from "../pages/CalendarPage";
import SwapRequestPage from "../pages/swapRequestPage";
import Profile from "../pages/ProfilePage";
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
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/swapRequests" element={<SwapRequestPage />} />
        <Route path="/profile" element={<Profile />}  />
        <Route path="*" element={<NotFoundPage />} />
      </Route>


    </Routes>

  );
}

