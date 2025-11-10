
/* eslint-disable react-hooks/exhaustive-deps */import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  User,
  LogOut,
  Calendar,
  CheckCircle,
  RefreshCw,
  Megaphone,
  AlertTriangle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Text from "../../common/Text";
import Badge from "../../common/Badge";
import { getMe } from "../../../services/API-Services/UserService";
import { logout } from "../../../services/API-Services/AuthService";

const mockNotifications = [
  {
    id: 1,
    title: "New message from Support Team",
    message: "Please check your inbox.",
    type: "Announcement",
    read: false,
  },
  {
    id: 2,
    title: "Password changed successfully",
    message: "Your password was updated.",
    type: "Credential Expiring",
    read: true,
  },
  {
    id: 3,
    title: "Schedule updated",
    message: "Your schedule has been changed.",
    type: "Schedule Change",
    read: false,
  },
  {
    id: 4,
    title: "Swap Approved",
    message: "Your swap request was approved.",
    type: "Swap Approved",
    read: false,
  },
];

function getNotificationIcon(type) {
  switch (type) {
    case "Schedule Change":
      return <Calendar className="h-5 w-5 text-[#0F7B8A]" />;
    case "Swap Approved":
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    case "Swap Rejected":
      return <RefreshCw className="h-5 w-5 text-red-500" />;
    case "Announcement":
      return <Megaphone className="h-5 w-5 text-[#0F7B8A]" />;
    case "Credential Expiring":
      return <AlertTriangle className="h-5 w-5 text-red-500" />;
    default:
      return <Bell className="h-5 w-5 text-[#0F7B8A]" />;
  }
}

export default function DesktopNavbar({
  navigation,
  currentPage,
  setCurrentPage,
  unreadCount,
  userMenuOpen,
  setUserMenuOpen,
  profileImage,
  getUserInitials,
}) {
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null); // ✅ حفظ بيانات المستخدم القادمة من getMe
  const notifRef = useRef();
  const userRef = useRef();

  // ✅ تحميل بيانات المستخدم عند بداية التشغيل
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getMe();
        setUserData(data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUserData();
  }, []);

  // ✅ إغلاق القوائم عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target))
        setNotifMenuOpen(false);
      if (userRef.current && !userRef.current.contains(event.target))
        setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ عند عدم تحميل بيانات المستخدم بعد
  if (!userData) {
    return null;
  }

  return (
    <div className="hidden md:flex items-center   justify-between w-full px-4">
      {/* Navigation Links */}
      <nav className="flex items-center gap-4 ml-12">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id && item.id !== "notifications";
          return (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => {
                setCurrentPage(item.id);
                setUserMenuOpen(false);
                setNotifMenuOpen(false);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition duration-300 ${
                isActive
                  ? "bg-[#0F7B8A] text-white shadow-md"
                  : "text-gray-700 hover:bg-[#E0F4F6] hover:text-black"
              }`}
            >
              <Icon className="h-4 w-4" />
              <Text as="span" content={item.label} />
            </Link>
          );
        })}
      </nav>

      {/* Right Section */}
      <div className="flex items-center gap-6 ">
        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <div
            onClick={() => {
              setNotifMenuOpen(!notifMenuOpen);
              setUserMenuOpen(false);
            }}
            className={`relative cursor-pointer p-2 rounded-lg transition duration-300 ${
              notifMenuOpen || currentPage === "notifications"
                ? "bg-[#E0F4F6] text-gray-700"
                : "text-gray-700 hover:bg-[#E0F4F6]"
            }`}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <div className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center rounded-full bg-[#0F7B8A] text-xs text-white">
                {unreadCount}
              </div>
            )}
          </div>

          <AnimatePresence>
            {notifMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg py-2 z-30"
              >
                {mockNotifications.length > 0 ? (
                  mockNotifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => setNotifMenuOpen(false)}
                      className="px-4 py-2 border-b last:border-none hover:bg-[#E0F4F6] cursor-pointer transition flex items-center gap-2"
                    >
                      <div>{getNotificationIcon(n.type)}</div>
                      <div className="flex-1">
                        <Text
                          as="h4"
                          content={n.title}
                          MyClass="font-medium text-sm text-gray-800"
                        />
                        <Text
                          as="p"
                          content={n.message}
                          MyClass="text-xs text-gray-500 mt-1"
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-4 text-center text-gray-500 text-sm">
                    No new notifications
                  </div>
                )}
                <div className="mt-2">
                  <Link
                    to="/Notifications"
                    onClick={() => {
                      setCurrentPage("notifications");
                      setNotifMenuOpen(false);
                    }}
                    className="block text-center text-[#0F7B8A] py-2 font-medium text-sm hover:bg-[#E0F4F6] rounded-none"
                  >
                    Show all
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Menu */}
        <div ref={userRef} className="relative">
          <div
            className={`flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-[#E0F4F6] transition ${
              userMenuOpen ? "bg-[#E0F4F6]" : ""
            }`}
            onClick={() => {
              setUserMenuOpen(!userMenuOpen);
              setNotifMenuOpen(false);
            }}
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover transition-opacity duration-200"
              />):(
            <div className="flex items-center justify-center h-8 w-8 rounded-full text-white font-semibold bg-gray-100">
                <User className="h-12 w-12 text-gray-300" />
            </div>
              )}
            <Text
              as="span"
              content={userData.firstName}
              MyClass="text-sm font-medium text-gray-600"
            />
          </div>

          <AnimatePresence>
            {userMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg py-2 z-30"
              >
                <div className="flex items-center gap-2 px-4 py-2 border-b mb-3">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#0F7B8A] text-white font-semibold">
                    {getUserInitials(userData.firstName + " " + userData.lastName)}
                  </div>
                  <div className="flex flex-col">
                    <Text
                      as="span"
                      content={`${userData.firstName} ${userData.lastName}`}
                      MyClass="font-medium text-sm text-gray-500 flex justify-center"
                    />
                    <Badge variant="outline">{userData.role}</Badge>
                    <Text
                      as="span"
                      content={userData.email}
                      MyClass="text-xs text-gray-500"
                    />
                  </div>
                </div>

                <Link
                  to="/Profile"
                  onClick={() => {
                    setCurrentPage("profile");
                    setUserMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 text-sm transition duration-300 ${
                    currentPage === "profile"
                      ? "bg-[#0F7B8A] text-white"
                      : "text-gray-700 hover:bg-[#E0F4F6]"
                  }`}
                >
                  <User className="h-4 w-4" /> Profile
                </Link>

                {/* ✅ زر تسجيل الخروج الحقيقي */}
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    logout();
                  }}
                  className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm transition duration-300 text-gray-700 hover:bg-[#F6E0E0]"
                >
                  <LogOut className="h-4 w-4" /> Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
