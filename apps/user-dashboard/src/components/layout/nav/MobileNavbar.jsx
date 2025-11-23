import React from "react";
import { Link } from "react-router-dom";
import { Bell, User, LogOut, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from '../../../hooks/useAuth';
import Text from "../../common/Text";
import Badge from "../../common/Badge";

export default function MobileNavbar({
  navigation,
  currentPage,
  setCurrentPage,
  MobileMenuOpen,
  setMobileMenuOpen,
  unreadCount,
  currentUser,
  profileImage,
}) {
  const { logout } = useAuth();
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setMobileMenuOpen]);

  return (
    <AnimatePresence>
      {MobileMenuOpen && (
        <motion.div
          key="mobile-navbar"
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-40 flex flex-col"
        >
          {/* User Info */}
          <div className="flex flex-col items-start gap-2 p-4 border-b relative">
            <div className="flex items-center gap-2">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover transition-opacity duration-200"
                />) : (
                <div className="flex items-center justify-center h-8 w-8 rounded-full text-white font-semibold bg-gray-100">
                  <User className="h-12 w-12 text-gray-300" />
                </div>
              )}
              <div className="flex flex-col">
                <Text
                  as="span"
                  content={`${currentUser.firstName} ${currentUser.lastName}`}
                  MyClass="font-medium text-sm text-gray-500 flex justify-center"
                />
                <Badge variant="outline">{currentUser.role}</Badge>
                <Text as="span" content={currentUser.email} MyClass="text-xs text-gray-500" />
              </div>
            </div>
            <button className="absolute top-4 right-4" onClick={() => setMobileMenuOpen(false)}>
              <X className="h-5 w-5 text-gray-700" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 flex flex-col gap-4 p-4 mt-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition duration-300 ${isActive ? "bg-[#0F7B8A] text-white" : "text-gray-700 hover:bg-[#E0F4F6]"
                    }`}
                >
                  <Icon className="h-5 w-5" />
                  <Text as="span" content={item.label} />
                </Link>
              );
            })}

            <Link
              to="/Notifications"
              onClick={() => {
                setCurrentPage("notifications");
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition duration-300 ${currentPage === "notifications"
                  ? "bg-[#0F7B8A] text-white"
                  : "text-gray-700 hover:bg-[#E0F4F6]"
                }`}
            >
              <Bell className="h-5 w-5" />
              <Text
                as="span"
                content={`Notifications ${unreadCount > 0 ? `(${unreadCount})` : ""}`}
              />
            </Link>

            <Link
              to="/Profile"
              onClick={() => {
                setCurrentPage("profile");
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition duration-300 ${currentPage === "profile" ? "bg-[#0F7B8A] text-white" : "text-gray-700 hover:bg-[#E0F4F6]"
                }`}
            >
              <User className="h-5 w-5" /> Profile
            </Link>

            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition duration-300 text-gray-700 hover:bg-[#F6E0E0]"
            >
              <LogOut className="h-5 w-5" /> Sign Out
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
