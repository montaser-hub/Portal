import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, User, LogOut, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS } from '../../common/colors';

function MobileNavbar({ navigation, currentPage, setCurrentPage, setMobileMenuOpen, unreadCount, currentUser, getUserInitials }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-40 flex flex-col"
      >
        <div className="flex flex-col items-start gap-2 p-4 border-b relative">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center h-10 w-10 rounded-full text-white font-semibold" style={{ backgroundColor: COLORS.primary }}>
              {getUserInitials(currentUser.name)}
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-sm">{currentUser.name}</span>
              <span className="text-xs text-gray-500">{currentUser.email}</span>
            </div>
          </div>
          <button className="absolute top-4 right-4" onClick={() => setMobileMenuOpen(false)}>
            <X className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        <div className="flex-1 flex flex-col gap-1 p-4 mt-2">
          {navigation.map(item => {
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
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
                  isActive ? 'bg-[#0F7B8A] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <Link
            to="/notifications"
            onClick={() => {
              setCurrentPage('notifications');
              setMobileMenuOpen(false);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
              currentPage === 'notifications' ? 'bg-[#0F7B8A] text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Bell className="h-5 w-5" />
            <span>Notifications {unreadCount > 0 && `(${unreadCount})`}</span>
          </Link>

          <Link
            to="/profile"
            onClick={() => {
              setCurrentPage('profile');
              setMobileMenuOpen(false);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
              currentPage === 'profile' ? 'bg-[#0F7B8A] text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <User className="h-5 w-5" /> Profile
          </Link>

          <Link
            to="/signout"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100"
          >
            <LogOut className="h-5 w-5" /> Sign Out
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default MobileNavbar;
