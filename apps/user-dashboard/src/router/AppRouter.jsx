import { Routes, Route } from "react-router-dom";
import Navbar from "../components/layout/nav/Navbar";
import CalendarPage from "../pages/CalendarPage";
export default function AppRouter() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </>
  );
}
