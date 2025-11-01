import { Routes, Route } from "react-router-dom";
import Navbar from "../components/layout/nav/Navbar";
import Dashboard from "../pages/Dashboard";


export default function AppRouter() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </>
  );
}
