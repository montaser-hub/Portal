import { Routes, Route, Outlet } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/Auth/LoginPage';
import Navbar from '../components/layout/nav/Navbar';
import Dashboard from '../pages/Dashboard';
import CalendarPage from '../pages/CalendarPage';
import MySchedules from '../pages/mySchedules';
import SwapRequestPage from '../pages/SwapRequestPage';
import Profile from '../pages/ProfilePage';
import NotFoundPage from '../pages/NotFoundPage';
import NotificationsPage from '../pages/NotificationPage';
import ForgotPasswordPage from '../pages/Auth/ForgotPasswordPage';
import ResetPasswordPage from '../pages/Auth/ResetPasswordPage';
import ProtectedRoute from './ProtectedRoute';
import SpinnerPage from '../pages/SpinnerPage.jsx';
import { PublicRoute } from './ProtectedRoute.jsx';
import Footer from '../components/layout/Footer';
import AIAssistant from '../pages/Assistant';

function AppLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <AIAssistant />
      <Footer />
    </>
  );
}

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
        <Route path="/ResetPassword" element={<ResetPasswordPage />} />
        <Route path="/Spinner" element={<SpinnerPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Calendar" element={<CalendarPage />} />
          <Route path="/myschedules" element={<MySchedules />} />
          <Route path="/SwapRequests" element={<SwapRequestPage />} />
          <Route path="/Notifications" element={<NotificationsPage />} />
          <Route path="/Profile" element={<Profile />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
