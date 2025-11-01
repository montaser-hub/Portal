import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Menu, House, RefreshCw } from 'lucide-react';
import Text from '../../common/Text';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';

const currentUser = {
  name: 'Ahmed Al Saud',
  role: 'Manager',
  email: 'ahmed.al.saud@healthco.com'
};

const mockNotifications = [
  { id: 1, title: 'New Shift Approved', read: false },
  { id: 2, title: 'Swap Request Received', read: false },
];

const navigation = [
  { id: 'dashboard', label: 'Dashboard', icon: House, path: '/' },
  { id: 'calendar', label: 'My Calendar', icon: Calendar, path: '/calendar' },
  { id: 'swap', label: 'Swap Requests', icon: RefreshCw, path: '/swapRequests' },
];

function getUserInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
}

function Navbar() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const unreadCount = mockNotifications.filter(n => !n.read).length;
  const dropdownRef = useRef(null);

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-[#0F7B8A] flex items-center justify-center shadow-md">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <Text as="h2" content="SmartShift" MyClass="text-xl font-bold text-[#0F7B8A]" />
              <Text as="p" content="Healthcare Scheduling" MyClass="text-xs text-gray-500" />
            </div>
          </div>

          {/* Desktop + Mobile Navbar */}
          <div className="flex items-center gap-3">
            <DesktopNavbar
              navigation={navigation}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              unreadCount={unreadCount}
              userMenuOpen={userMenuOpen}
              setUserMenuOpen={setUserMenuOpen}
              currentUser={currentUser}
              getUserInitials={getUserInitials}
            />

            <div className="md:hidden cursor-pointer p-2 border rounded-lg" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="h-5 w-5 text-gray-700" />
            </div>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <MobileNavbar
          navigation={navigation}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setMobileMenuOpen={setMobileMenuOpen}
          unreadCount={unreadCount}
          currentUser={currentUser}
          getUserInitials={getUserInitials}
        />
      )}
    </header>
  );
}

export default Navbar;
