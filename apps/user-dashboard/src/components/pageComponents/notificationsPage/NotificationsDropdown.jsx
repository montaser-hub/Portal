import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Bell, CheckCircle, Calendar, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Text from "../../common/Text";

export default function NotificationDropdown({ isOpen, onClose }) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const notifications = [
    {
      id: 1,
      title: "Shift Swap Approved",
      message: "Your request to swap with John has been approved.",
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      time: "2h ago",
    },
    {
      id: 2,
      title: "New Schedule Update",
      message: "Your weekly schedule has been updated.",
      icon: <Calendar className="h-5 w-5 text-blue-600" />,
      time: "5h ago",
    },
    {
      id: 3,
      title: "Credential Expiring Soon",
      message: "Your certification will expire in 3 days.",
      icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
      time: "1d ago",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg py-3 z-30"
        >
          <div className="px-4 pb-2 border-b flex items-center gap-2">
            <Bell className="h-5 w-5 text-[#0F7B8A]" />
            <Text
            as="h4"
            content="Notifications"
            MyClass="font-semibold text-gray-700" />
          </div>

          <div className="max-h-64 overflow-y-auto">
            {notifications.slice(0, 2).map((n) => (
              <div
                key={n.id}
                className="flex items-start gap-3 px-4 py-3 hover:bg-[#E0F4F6] transition cursor-pointer"
                onClick={onClose}
              >
                <div className="mt-1">{n.icon}</div>
                <div className="flex-1">
                  <Text
                  as="p"
                  content={n.title}
                  MyClass="text-sm font-semibold text-gray-800" />
                  <Text
                  as="p"
                  content={n.message}
                  MyClass="text-xs text-gray-500 mt-1" />
                  <Text
                  as="span"
                  content={n.time}
                  MyClass="text-[11px] text-gray-400 mt-1 block" />
                </div>
              </div>
            ))}
          </div>

          <div className="px-4 pt-2 border-t">
            <Link
              to="/Notifications"
              onMouseDown={(e) => e.currentTarget.classList.add("bg-[#E0F4F6]")}
              onClick={() => setTimeout(() => onClose(), 150)}
              className="block text-center py-2 text-sm font-medium text-[#0F7B8A] hover:bg-[#E0F4F6] active:bg-[#E0F4F6] transition rounded-md"
            >
              Show All
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
