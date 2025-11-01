import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Navbar from "../components/layout/nav/Navbar";
import CalendarPage from "../pages/CalendarPage";
import SwapRequestPage from "../pages/swapRequestPage";
import Profile from "../pages/ProfilePage";

export default function AppRouter() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/profile" element={<Profile />}  />
      </Routes>
    </>
  );
}
