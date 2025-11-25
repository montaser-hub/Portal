import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getNotificationIcon, formatTimestamp } from "../../../utils/notificationUtil";
import { motion, AnimatePresence } from "framer-motion";
import Text from "../../common/Text";
import { useDispatch, useSelector } from "react-redux";
import { loadNotifications } from "../../../features/notification/notificationSlice";
import { Bell } from 'lucide-react';
export default function NotificationDropdown({ isOpen, onClose }) {
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const { list: notifications } = useSelector((state) => state.notifications);

  useEffect(() => {
    if (isOpen) {
      dispatch(loadNotifications());
    }
  }, [isOpen, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

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
              MyClass="font-semibold text-gray-700"
            />
          </div>

          <div className="max-h-64 overflow-y-auto">
            {notifications.slice(0, 2).map((n) => (
              <div
                key={n._id}
                className="flex items-start gap-3 px-4 py-3 hover:bg-[#E0F4F6] transition cursor-pointer"
                onClick={onClose}
              >
                <div className="mt-1">{getNotificationIcon(n.type)}</div>
                <div className="flex-1">
                  <Text
                    as="p"
                    content={n.title}
                    MyClass="text-sm font-semibold text-gray-800"
                  />
                  <Text
                    as="p"
                    content={n.message}
                    MyClass="text-xs text-gray-500 mt-1"
                  />
                  <Text
                    as="span"
                    content={formatTimestamp(n.createdAt)}
                    MyClass="text-[11px] text-gray-400 mt-1 block"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="px-4 pt-2 border-t flex justify-between items-center gap-2">
            {Notification.permission !== 'granted' && (
              <button
                onClick={() => Notification.requestPermission()}
                className="text-sm text-teal-600 hover:bg-blue-50 py-2 px-3 rounded-md whitespace-nowrap"
              >
                Enable Notifications
              </button>
            )}

            <Link
              to="/Notifications"
              onMouseDown={(e) => e.currentTarget.classList.add('bg-[#E0F4F6]')}
              onClick={() => setTimeout(() => onClose(), 150)}
              className="text-sm font-medium text-[#0F7B8A] hover:bg-[#E0F4F6] active:bg-[#E0F7F6] py-2 px-3 rounded-md whitespace-nowrap"
            >
              Show All
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
