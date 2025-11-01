import { Routes, Route } from "react-router-dom";
import Navbar from "../components/layout/nav/Navbar";
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
