import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, User, LogOut, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function MobileNavbar({ navigation, currentPage, setCurrentPage, setMobileMenuOpen, unreadCount, currentUser, getUserInitials }) {
  React.useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setMobileMenuOpen(false);
    }
  };
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, [setMobileMenuOpen]);

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
            <div className="flex items-center justify-center h-10 w-10 rounded-full text-white font-semibold bg-[#0F7B8A]">
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

        <div className="flex-1 flex flex-col gap-4 p-4 mt-2">
          {navigation.map(item => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => {
                  setCurrentPage(item.id);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition duration-300 ${
                  isActive ? 'bg-[#0F7B8A] text-white' : 'text-gray-700 hover:bg-[#E0F4F6]'
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
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
              currentPage === 'notifications' ? 'bg-[#0F7B8A] text-white' : 'text-gray-700 hover:bg-[#E0F4F6]'
            }`}
          >
            <Bell className="h-5 w-5" />
            <span>Notifications {unreadCount > 0 && `(${unreadCount})`}</span>
          </Link>

          <Link
            to="/profile"
            onClick={() => {
              setCurrentPage('profile');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
              currentPage === 'profile' ? 'bg-[#0F7B8A] text-white' : 'text-gray-700 hover:bg-[#E0F4F6]'
            }`}
          >
            <User className="h-5 w-5" /> Profile
          </Link>

          <Link
            to="/"

            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-gray-700 hover:bg-[#E0F4F6]"
          >
            <LogOut className="h-5 w-5" /> Sign Out
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default MobileNavbar;
