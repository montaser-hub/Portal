import React, { useState, useEffect, useRef } from "react";
import { Calendar, Menu, House, RefreshCw } from "lucide-react";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import Text from "../../common/Text";
import { mockNotifications } from "../../common/mockData";
import { AnimatePresence } from "framer-motion";
import { getMe } from "../../../services/API-Services/UserService";
import Spinner from "../../common/Spinner2";
const navigation = [
  { id: "dashboard", label: "Dashboard", icon: House, path: "/Dashboard" },
  { id: "calendar", label: "My Calendar", icon: Calendar, path: "/Calendar" },
  { id: "swap", label: "Swap Requests", icon: RefreshCw, path: "/SwapRequests" },
];

function getUserInitials(name = "") {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
}

function Navbar() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const unreadCount = mockNotifications.filter((n) => !n.read).length;
  const dropdownRef = useRef(null);


useEffect(() => {
  getMe().then(userData => {setCurrentUser(userData);})
        .catch(error => {console.error("Failed to fetch user:", error);});
}, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userMenuOpen]);

  if (!currentUser) {
    return (
      <header className="bg-white border-b shadow-sm sticky top-0 z-20 flex items-center justify-center h-16">
        <Spinner />
      </header>
    );
  }

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-[#0F7B8A] flex items-center justify-center shadow-md">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <Text content="SmartShift" MyClass="text-xl font-bold text-[#0F7B8A]" />
              <Text as="p" content="Healthcare Scheduling" MyClass="text-xs text-gray-500" />
            </div>
          </div>

          {/* Navigation Section */}
          <div className="flex items-center gap-3 flex-1 justify-end" ref={dropdownRef}>
            <DesktopNavbar
              navigation={navigation}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              unreadCount={unreadCount}
              userMenuOpen={userMenuOpen}
              setUserMenuOpen={setUserMenuOpen}
              currentUser={currentUser}
              getUserInitials={getUserInitials}
              profileImage = {currentUser.photo}

            />

            {/* Mobile menu button */}
            <div
              className="md:hidden cursor-pointer p-2 border rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5 text-gray-700" />
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Mobile Navbar */}
      <AnimatePresence mode="wait">
        <MobileNavbar
          key="mobile-navbar"
          navigation={navigation}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          MobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          unreadCount={unreadCount}
          currentUser={currentUser}
          profileImage={currentUser.photo}
        />
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
