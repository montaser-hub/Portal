import { useDispatch, useSelector } from 'react-redux';
import Text from "../components/common/Text";
import { getNotificationIcon, getPriorityColor, formatTimestamp } from "../utils/notificationUtil";
import {
  Bell,
  CheckCircle,
  Circle,
} from 'lucide-react';
import { useEffect } from "react";
import { loadNotifications, markAllRead } from '../features/notification/notificationSlice';
export default function NotificationsPage() {
  const unreadCount = useSelector((state) => state.notifications.list.filter((n) => !n.read).length);
  const notifications = useSelector((state) => state.notifications.list);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadNotifications());
  }, [dispatch]);
  const handleMarkAll = () => {
    dispatch(markAllRead());
  };

  return (
    <div className="p-8 space-y-6">
      {/* -------- Header -------- */}
      <div className="flex items-center justify-between">
        <div>
          <Text
            as="h1"
            content="Notifications"
            MyClass="text-2xl font-semibold text-teal-900"
          />
          <Text as="p" content="You have" MyClass="text-gray-500" />
          <Text
            as="p"
            MyClass="text-gray-500 mt-1"
            content={
              unreadCount > 0
                ? `${unreadCount} unread notification${
                    unreadCount > 1 ? 's' : ''
                  }`
                : 'All caught up!'
            }
          />
        </div>

        <button
          type="button"
          onClick={handleMarkAll}
          className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-shadow shadow-sm hover:shadow-md"
        >
          <CheckCircle className="mr-2 h-4 w-4" />
          Mark All as Read
        </button>
      </div>
      {Notification.permission !== 'granted' && (
        <button
          onClick={() => Notification.requestPermission()}
          className="px-4 py-2 border border-none underline text-teal-600 rounded-lg hover:bg-teal-50"
        >
          Enable Device Notifications
        </button>
      )}
      {/* -------- Notifications List -------- */}
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification?._id}
            className={`p-5 border rounded-2xl shadow-sm transition-all hover:shadow-md ${
              !notification.read
                ? 'bg-[#0F7B8A]/5 border-[#0F7B8A]/30'
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`p-3 rounded-lg flex items-center justify-center ${
                  notification.priority === 'High'
                    ? 'bg-red-100'
                    : 'bg-[#0F7B8A]/10'
                }`}
              >
                {getNotificationIcon(notification.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <Text
                      as="h4"
                      content={notification.title}
                      MyClass="font-medium text-gray-600 "
                    />
                    {!notification.read && (
                      <Circle className="h-2 w-2 fill-[#0F7B8A] text-[#0F7B8A]" />
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Text
                      as="span"
                      content={notification.priority}
                      MyClass={`text-xs font-medium px-2 py-0.5 rounded-full border ${getPriorityColor(
                        notification.priority
                      )}`}
                    />
                    <Text
                      as="span"
                      content={formatTimestamp(notification.createdAt)}
                      MyClass="text-sm text-gray-500 whitespace-nowrap"
                    />
                  </div>
                </div>
                <Text
                  as="p"
                  content={notification.message}
                  MyClass="text-gray-600 text-sm"
                />
                <div className="flex items-center gap-2 mt-3">
                  <Text
                    as="span"
                    content={notification.type}
                    MyClass="text-xs font-medium px-2 py-0.5 rounded-full border bg-gray-100 text-gray-600 border-gray-200"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* -------- Empty State -------- */}
      {notifications.length === 0 && (
        <div className="p-12 text-center border border-gray-200 rounded-2xl shadow-sm">
          <Bell className="h-12 w-12 mx-auto mb-3 text-gray-400 opacity-50" />
          <Text
            as="p"
            content="No notifications yet"
            MyClass="text-gray-500 text-sm"
          />
        </div>
      )}
    </div>
  );
}
