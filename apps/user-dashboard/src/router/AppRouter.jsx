import { Routes, Route } from "react-router-dom";
import Navbar from "../components/layout/nav/Navbar";
import SwapRequestPage from "../pages/swapRequestPage";

export default function AppRouter() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/swapRequests" element={<SwapRequestPage />} />
      </Routes>
    </>
  );
}
