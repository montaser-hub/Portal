import { Routes, Route } from "react-router-dom";
import Navbar from "../components/layout/nav/Navbar";
<<<<<<< HEAD
import Dashboard from "../pages/Dashboard";

=======
import Profile from "../pages/ProfilePage";
import CalendarPage from "../pages/CalendarPage";
import SwapRequestPage from "../pages/swapRequestPage";
>>>>>>> fef9012912953860093246955f55b695ee078672

export default function AppRouter() {
  return (
    <>
      <Navbar />
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Dashboard />} />
=======
        <Route path="/profile" element={<Profile />}  />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/swapRequests" element={<SwapRequestPage />} />
>>>>>>> fef9012912953860093246955f55b695ee078672
      </Routes>
    </>
  );
}
