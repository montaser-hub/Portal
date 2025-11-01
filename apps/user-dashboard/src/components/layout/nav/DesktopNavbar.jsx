import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function DesktopNavbar({ navigation, currentPage, setCurrentPage, unreadCount, userMenuOpen, setUserMenuOpen, currentUser, getUserInitials }) {
  return (
    <div className="hidden md:flex items-center gap-6 ml-6 relative">
      {/* Navigation Links بجانب اللوجو */}
      <nav className="flex items-center gap-4">
        {navigation.map(item => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => setCurrentPage(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                isActive ? 'bg-[#0F7B8A] text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Notifications */}
      <div
        className={`relative cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition ml-auto ${
          currentPage === 'notifications' ? 'bg-[#0F7B8A] text-white' : ''
        }`}
        onClick={() => setCurrentPage('notifications')}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {unreadCount}
          </div>
        )}
      </div>

      {/* User Dropdown */}
      <div className="relative ml-4">
        <div
          className={`flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-gray-100 transition`}
          onClick={() => setUserMenuOpen(!userMenuOpen)}
        >
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#0F7B8A] text-white font-semibold">
            {getUserInitials(currentUser.name)}
          </div>
          <span className="text-sm font-medium">{currentUser.name.split(' ')[0]}</span>
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
              {/* Header Dropdown: دائرة أول حرفين + اسم + إيميل */}
              <div className="flex items-center gap-2 px-4 py-2 border-b">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#0F7B8A] text-white font-semibold">
                  {getUserInitials(currentUser.name)}
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{currentUser.name}</span>
                  <span className="text-xs text-gray-500">{currentUser.email}</span>
                </div>
              </div>

              {/* روابط Profile و Sign Out */}
              <Link
                to="/profile"
                onClick={() => {
                  setCurrentPage('profile');
                  setUserMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-4 py-2 text-sm ${
                  currentPage === 'profile' ? 'bg-[#0F7B8A] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <User className="h-4 w-4" /> Profile
              </Link>
              <Link
                to="/signout"
                onClick={() => setUserMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <LogOut className="h-4 w-4" /> Sign Out
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default DesktopNavbar;
