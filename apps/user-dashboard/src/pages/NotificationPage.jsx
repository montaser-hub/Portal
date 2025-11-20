import React from "react";
import {
  Bell,
  Calendar,
  RefreshCw,
  AlertTriangle,
  Megaphone,
  CheckCircle,
  Circle,
} from "lucide-react";
import { mockNotifications } from "../components/common/mockData";
import Text from "../components/common/Text";

export default function NotificationsPage() {
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case "Schedule Change":
        return <Calendar className="h-6 w-6 text-[#0F7B8A]" />;
      case "Swap Approved":
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case "Swap Rejected":
        return <RefreshCw className="h-6 w-6 text-red-500" />;
      case "Announcement":
        return <Megaphone className="h-6 w-6 text-[#0F7B8A]" />;
      case "Credential Expiring":
        return <AlertTriangle className="h-6 w-6 text-red-500" />;
      default:
        return <Bell className="h-6 w-6 text-[#0F7B8A]" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700 border-red-300";
      case "Medium":
        return "bg-[#0F7B8A]/10 text-[#0F7B8A] border-[#0F7B8A]/30";
      case "Low":
        return "bg-gray-100 text-gray-600 border-gray-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="p-8 space-y-6">
      {/* -------- Header -------- */}
      <div className="flex items-center justify-between">
        <div>
          <Text as="h1" content="Notifications" MyClass="text-2xl font-semibold text-gray-900" />
          <Text as="p" content="You have" MyClass="text-gray-500" />
          <Text as="p"  MyClass="text-gray-500 mt-1"
          content={unreadCount > 0? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`: "All caught up!"} />
        </div>

        <button
          type="button"
          className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-shadow shadow-sm hover:shadow-md"
        >
          <CheckCircle className="mr-2 h-4 w-4" />
          Mark All as Read
        </button>
      </div>

      {/* -------- Notifications List -------- */}
      <div className="space-y-4">
        {mockNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-5 border rounded-2xl shadow-sm transition-all hover:shadow-md ${
              !notification.read
                ? "bg-[#0F7B8A]/5 border-[#0F7B8A]/30"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`p-3 rounded-lg flex items-center justify-center ${
                  notification.priority === "High"
                    ? "bg-red-100"
                    : "bg-[#0F7B8A]/10"
                }`}
              >
                {getNotificationIcon(notification.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <Text as="h4" content={notification.title} MyClass="font-medium text-gray-600 " />
                    {!notification.read && (
                      <Circle className="h-2 w-2 fill-[#0F7B8A] text-[#0F7B8A]" />
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Text as="span" content={notification.priority}
                    MyClass={`text-xs font-medium px-2 py-0.5 rounded-full border ${getPriorityColor(notification.priority)}`} />
                    <Text as="span" content={formatTimestamp(notification.timestamp)}
                    MyClass="text-sm text-gray-500 whitespace-nowrap" />
                  </div>
                </div>
                <Text as="p" content={notification.message} MyClass="text-gray-600 text-sm" />
                <div className="flex items-center gap-2 mt-3">
                  <Text as="span" content={notification.type}
                  MyClass="text-xs font-medium px-2 py-0.5 rounded-full border bg-gray-100 text-gray-600 border-gray-200" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* -------- Empty State -------- */}
      {mockNotifications.length === 0 && (
        <div className="p-12 text-center border border-gray-200 rounded-2xl shadow-sm">
          <Bell className="h-12 w-12 mx-auto mb-3 text-gray-400 opacity-50" />
          <Text as="p" content="No notifications yet" MyClass="text-gray-500 text-sm" />
        </div>
      )}
    </div>
  );
}
