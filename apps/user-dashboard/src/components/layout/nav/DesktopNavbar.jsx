import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import   Text from '../../common/Text';
import Badge from '../../common/Badge';
function DesktopNavbar({ navigation, currentPage, setCurrentPage, unreadCount, userMenuOpen, setUserMenuOpen, currentUser, getUserInitials }) {
  return (
    <div className="hidden md:flex items-center flex-1">

      <nav className="flex items-center gap-4 ml-12">
        {navigation.map(item => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => {
                setCurrentPage(item.id);
                setUserMenuOpen(false);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition duration-300 ${
                isActive ? 'bg-[#0F7B8A] text-white shadow-md' : 'text-gray-700 hover:bg-[#E0F4F6] hover:text-black '
              }`}
            >
              <Icon className="h-4 w-4" />
              <Text as="span" content={item.label}/>
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-6 ml-auto">

        <Link
            to="/notifications"
            onClick={() => setCurrentPage('notifications')}
            className={`relative cursor-pointer p-2 rounded-lg transition duration-300 ${
              currentPage === 'notifications' ? 'bg-[#0F7B8A] text-white' : 'text-gray-700 hover:bg-[#E0F4F6]'
            }`}
        >
          <Bell className={`h-5 w-5 `} />
          {unreadCount > 0 && (
            <div className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center rounded-full bg-[#0F7B8A] text-xs text-white" >
              {unreadCount}
            </div>
          )}
        </Link>

        <div className="relative">
          <div
            className={`flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-[#E0F4F6] transition ${userMenuOpen ? 'bg-[#E0F4F6]' : 'hover:bg-[#E0F4F6]'}`}
            onClick={() => setUserMenuOpen(!userMenuOpen)}
          >
            <div className="flex items-center justify-center h-8 w-8 rounded-full text-white font-semibold bg-[#0F7B8A]" >
              {getUserInitials(currentUser.name)}
            </div>
            <Text as="span" content={currentUser.name.split(' ')[0]} MyClass="text-sm font-medium text-gray-600"/>
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
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#0F7B8A] text-white font-semibold" >
                    {getUserInitials(currentUser.name)}
                  </div>
                  <div className="flex flex-col">
                    <Text as="span" content={currentUser.name} MyClass="font-medium text-sm text-gray-500 flex justify-center" />
                    <Badge variant="outline">{currentUser.role}</Badge>
                    <Text as='span' content={currentUser.email} MyClass="text-xs text-gray-500" />
                  </div>
                </div>

                <Link
                  to="/profile"
                  onClick={() => {
                    setCurrentPage('profile');
                    setUserMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 text-sm transition duration-300 ${
                    currentPage === 'profile' ? 'bg-[#0F7B8A] text-white' : 'text-gray-700 hover:bg-[#E0F4F6]'
                  }`}
                >
                  <User className="h-4 w-4" /> Profile
                </Link>
                <Link
                  to="/"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm transition duration-300 text-gray-700 hover:bg-[#F6E0E0]"
                >
                  <LogOut className="h-4 w-4" /> Sign Out
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default DesktopNavbar;
