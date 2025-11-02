import { Routes, Route } from "react-router-dom";
import Navbar from "../components/layout/nav/Navbar";
import Profile from "../pages/ProfilePage";
import CalendarPage from "../pages/CalendarPage";
import SwapRequestPage from "../pages/swapRequestPage";

export default function AppRouter() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/profile" element={<Profile />}  />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/swapRequests" element={<SwapRequestPage />} />
      </Routes>
    </>
  );
}
