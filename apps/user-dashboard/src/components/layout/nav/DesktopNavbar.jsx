/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  User,
  LogOut,
  Cog
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Text from "../../common/Text";
import Badge from "../../common/Badge";
import { useAuth } from '../../../hooks/useAuth';
import NotificationDropdown from '../../pageComponents/notificationsPage/NotificationsDropdown';
import Button from "../../common/Button";

export default function DesktopNavbar({
  navigation,
  currentPage,
  setCurrentPage,
  unreadCount,
  userMenuOpen,
  setUserMenuOpen,
  profileImage,
  getUserInitials,
  currentUser,
}) {
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);
  const notifRef = useRef();
  const userRef = useRef();
  const { logout } = useAuth();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target))
        setNotifMenuOpen(false);
      if (userRef.current && !userRef.current.contains(event.target))
        setUserMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!currentUser) {
    return null;
  }

  return (
    <div className="hidden md:flex items-center flex-1">
      {/* Navigation Links */}
      <nav className="flex items-center gap-3 ml-12">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive =
            currentPage === item.id && item.id !== 'notifications';
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
                  ? 'bg-[#0F7B8A] text-white shadow-md'
                  : 'text-gray-700 hover:bg-[#E0F4F6] hover:text-black'
              }`}
            >
              <Icon className="h-4 w-4" />
              <Text as="span" content={item.label} />
            </Link>
          );
        })}

        {currentUser?.role === 'admin' || currentUser?.role === 'manager' ? (
          <a
            href="https://smartshift-6w6z.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-[#E0F4F6] hover:text-[#0F7B8A] transition duration-300"
          >
            <Cog className="h-6 w-6" />
            <Text as="span" content="Setting" className="text-1xl" />
          </a>
        ) : null}
      </nav>
      {/* Right Section */}
      <div className="flex items-center gap-6 ml-auto">
        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <div
            onClick={() => {
              setNotifMenuOpen(!notifMenuOpen);
              setUserMenuOpen(false);
            }}
            className={`relative cursor-pointer p-2 rounded-lg transition duration-300 ${
              notifMenuOpen || currentPage === 'notifications'
                ? 'bg-[#E0F4F6] text-teal-700'
                : 'text-gray-500 hover:bg-[#E0F4F6]'
            }`}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <div className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center rounded-full bg-[#0F7B8A] text-xs text-white">
                {unreadCount}
              </div>
            )}
          </div>

          <NotificationDropdown
            isOpen={notifMenuOpen}
            onClose={() => setNotifMenuOpen(false)}
          />
        </div>
        {/* User Menu */}
        <div ref={userRef} className="relative">
          <div
            className={`flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-[#E0F4F6] transition ${
              userMenuOpen ? 'bg-[#E0F4F6]' : ''
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
              />
            ) : (
              <div className="flex items-center justify-center h-8 w-8 rounded-full text-white font-semibold bg-gray-100">
                <User className="h-12 w-12 text-gray-300" />
              </div>
            )}
            <Text
              as="span"
              content={currentUser.firstName}
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
                    {getUserInitials(
                      currentUser.firstName + ' ' + currentUser.lastName
                    )}
                  </div>
                  <div className="flex flex-col">
                    <Text
                      as="span"
                      content={`${currentUser.firstName} ${currentUser.lastName}`}
                      MyClass="font-medium text-sm text-gray-500 flex justify-center"
                    />
                    <Badge
                      variant={
                        currentUser.role === 'admin'
                          ? 'primary'
                          : currentUser?.role === 'user'
                          ? 'secondary'
                          : 'opacityPrimary'
                      }
                    >
                      {currentUser?.role}
                    </Badge>
                    <Text
                      as="span"
                      content={currentUser.email}
                      MyClass="text-xs text-gray-500"
                    />
                  </div>
                </div>
                <Link
                  to="/Profile"
                  onClick={() => {
                    setCurrentPage('profile');
                    setUserMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 text-sm transition duration-300 ${
                    currentPage === 'profile'
                      ? 'bg-[#0F7B8A] text-white'
                      : 'text-gray-700 hover:bg-[#E0F4F6]'
                  }`}
                >
                  <User className="h-4 w-4" /> Profile
                </Link>
                <Button
                  onClick={() => {
                    setUserMenuOpen(false);
                    logout();
                  }}
                  className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm transition duration-300 text-gray-700 hover:bg-[#F6E0E0]"
                >
                  <LogOut className="h-4 w-4" /> Sign Out
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
