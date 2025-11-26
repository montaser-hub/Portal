import {
  Bell,
  Calendar,
  RefreshCw,
  AlertTriangle,
  Megaphone,
  CheckCircle,
  Circle,
  Repeat,
  UserCheck,
  KeyRound,
} from 'lucide-react';
import { format } from 'date-fns';
export const getNotificationIcon = (type) => {
  switch (type) {
    case 'Profile Updated':
      return <UserCheck className="h-6 w-6 text-[#0F7B8A]" />;
    case 'Password Changed':
      return <KeyRound className="h-6 w-6 text-[#0F7B8A]" />;
    case 'Swap Request':
      return <Repeat className="h-6 w-6 text-blue-600" />;
    case 'Swap Updated':
      return <Repeat className="h-6 w-6 text-[#0F7B8A]" />;
    case 'Swap approved':
      return <CheckCircle className="h-6 w-6 text-green-600" />;
    case 'Swap rejected':
      return <RefreshCw className="h-6 w-6 text-red-500" />;
    case 'Announcement':
      return <Megaphone className="h-6 w-6 text-[#0F7B8A]" />;
    case 'Credential Expiring':
      return <AlertTriangle className="h-6 w-6 text-red-500" />;
    default:
      return <Bell className="h-6 w-6 text-[#0F7B8A]" />;
  }
};

export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'High':
      return 'bg-red-100 text-red-700 border-red-300';
    case 'Medium':
      return 'bg-[#0F7B8A]/10 text-[#0F7B8A] border-[#0F7B8A]/30';
    case 'Low':
      return 'bg-gray-100 text-gray-600 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-600 border-gray-200';
  }
};

export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};
