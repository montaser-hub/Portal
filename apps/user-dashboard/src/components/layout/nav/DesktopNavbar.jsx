
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, User, LogOut } from 'lucide-react';
function DesktopNavbar({ navigation, currentPage, setCurrentPage, unreadCount, userMenuOpen, setUserMenuOpen, currentUser, getUserInitials }) {
  return (
    <>
      <nav className="hidden md:flex items-start gap-4">
        {navigation.map(item => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => setCurrentPage(item.id)}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition ${
                isActive
                  ? 'bg-[#0F7B8A] text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:flex cursor-pointer p-2 rounded-lg hover:bg-gray-100">
          <Bell className="h-5 w-5 text-gray-600" />
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-[#E74C3C] text-xs text-white">
              {unreadCount}
            </div>
          )}
        </div>

        <div className="relative">
          <div
            className="hidden md:flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-gray-100"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
          >
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#0F7B8A] text-white font-semibold">
              {getUserInitials(currentUser.name)}
            </div>
            <span className="text-sm font-medium">{currentUser.name.split(' ')[0]}</span>
          </div>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2 z-30">
              <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <User className="h-4 w-4" /> Profile
              </Link>
              <Link to="/signout" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <LogOut className="h-4 w-4" /> Sign Out
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DesktopNavbar;
