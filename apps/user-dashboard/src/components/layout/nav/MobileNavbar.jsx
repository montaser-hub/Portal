import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, User, LogOut } from 'lucide-react';

function MobileNavbar({ navigation, currentPage, setCurrentPage, setMobileMenuOpen, unreadCount }) {
  return (
    <nav className="mt-2 flex flex-col gap-1 bg-white border-t pt-2 pb-2 md:hidden">
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
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-left w-full ${
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
        onClick={() => setMobileMenuOpen(false)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-left w-full text-gray-700 hover:bg-gray-100"
      >
        <Bell className="h-5 w-5" />
        <span>Notifications {unreadCount > 0 && `(${unreadCount})`}</span>
      </Link>

      <Link
        to="/profile"
        onClick={() => setMobileMenuOpen(false)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-left w-full text-gray-700 hover:bg-gray-100"
      >
        <User className="h-5 w-5" /> Profile
      </Link>
      <Link
        to="/signout"
        onClick={() => setMobileMenuOpen(false)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-left w-full text-gray-700 hover:bg-gray-100"
      >
        <LogOut className="h-5 w-5" /> Sign Out
      </Link>
    </nav>
  );
}

export default MobileNavbar;
