import { Routes, Route, Outlet } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/Auth/LoginPage";
import Navbar from "../components/layout/nav/Navbar";
import Dashboard from "../pages/Dashboard";
import CalendarPage from "../pages/CalendarPage";
import SwapRequestPage from "../pages/swapRequestPage";
import Profile from "../pages/ProfilePage";
import NotFoundPage from "../pages/NotFoundPage";
import NotificationsPage from "../pages/NotificationPage";
import ForgotPasswordPage from "../pages/Auth/forgotPasswordPage";
import ResetPasswordPage from "../pages/Auth/ResetPasswordPage";
import ProtectedRoute from "./ProtectedRoute";
import SpinnerPage from "../pages/SpinnerPage.jsx";




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
      <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
      <Route path="/ResetPassword" element={<ResetPasswordPage />} />
      <Route path="/Spinner" element={<SpinnerPage />} />


      <Route element={<ProtectedRoute />}>
      <Route element={<AppLayout />}>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Calendar" element={<CalendarPage />} />
        <Route path="/SwapRequests" element={<SwapRequestPage />} />
        <Route path="/Notifications" element={<NotificationsPage />} />
        <Route path="/Profile" element={<Profile />}  />
      </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>

  );
}

