import Text from '../../common/Text';
import { Clock, User2, CalendarDays, Repeat2, ArrowRight } from 'lucide-react';

export default function SwapRequestHistory({ requests = [] }) {
  if (!requests.length) {
    return (
      <div className="py-12 text-center text-gray-500">
        <Text as="p" content="No swap request history yet." />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {requests.map((req) => (
        <HistoryCard key={req.id} req={req} />
      ))}
    </div>
  );
}

/* ---------------------------- HISTORY CARD ---------------------------- */

function HistoryCard({ req }) {
  const showActions = canModify(req.fromSchedule) || canModify(req.toSchedule);

  return (
    <div
      className="
        bg-white rounded-2xl border border-[#0F7B8A]/20
        p-5 flex flex-col justify-between gap-4 shadow-sm
        transition hover:shadow-md
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="font-semibold text-gray-900 text-lg flex items-center gap-2">
          <Repeat2 size={18} className="text-[#0F7B8A]" /> #{req.id.slice(-5)}
        </div>
        <StatusChip status={req.status} />
      </div>

      {/* Swap Details */}
      <div className="flex flex-col md:flex-row gap-3 items-start">
        <ShiftCard schedule={req.fromSchedule} title="From Shift" />
        <div className="flex justify-center items-center mt-2 md:mt-0">
          <ArrowRight size={20} className="text-[#0F7B8A]/50" />
        </div>
        <ShiftCard schedule={req.toSchedule} title="To Shift" />
      </div>

      {/* Message */}
      {req.message && (
        <p className="text-gray-600 italic text-sm border-l-2 border-[#0F7B8A]/20 pl-2 mt-2">
          “{req.message}”
        </p>
      )}

      {/* Created At */}
      <div className="text-xs text-gray-400 flex items-center gap-1 mt-2">
        <Clock size={14} /> {new Date(req.createdAt).toLocaleString()}
      </div>

      {/* Actions */}
      {showActions && (
        <div className="flex flex-col sm:flex-row gap-2 mt-3">
          <button className="flex-1 px-4 py-2 rounded-lg font-medium text-white bg-[#0F7B8A] hover:bg-[#0d6b77] transition">
            Update
          </button>
          <button className="flex-1 px-4 py-2 rounded-lg font-medium text-[#0F7B8A] border border-[#0F7B8A]/20 hover:bg-[#0F7B8A]/20 hover:text-white transition">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------------------------- SHIFT CARD ---------------------------- */

function ShiftCard({ title, schedule }) {
  return (
    <div className="flex-1 p-3 rounded-xl border border-[#0F7B8A]/20 bg-gray-50">
      <h4 className="text-sm font-semibold text-gray-700 mb-2">{title}</h4>
      <Detail
        icon={<User2 size={14} />}
        label="Name"
        value={schedule.shiftId.shiftName}
      />
      <Detail
        icon={<Repeat2 size={14} />}
        label="Type"
        value={schedule.shiftId.shiftType}
      />
      <Detail
        icon={<Clock size={14} />}
        label="Time"
        value={`${schedule.shiftId.startTimeFormatted} → ${schedule.shiftId.endTimeFormatted}`}
      />
      <Detail
        icon={<User2 size={14} />}
        label="Sub-Department"
        value={schedule.subDepartmentId.name}
      />
      <Detail
        icon={<CalendarDays size={14} />}
        label="Date"
        value={new Date(schedule.date).toDateString()}
      />
    </div>
  );
}

/* ---------------------------- DETAIL ---------------------------- */

function Detail({ label, value, icon }) {
  return (
    <p className="text-gray-700 text-sm mb-1 flex items-center gap-2">
      {icon}
      <span className="font-semibold">{label}:</span> {value}
    </p>
  );
}

/* ---------------------------- STATUS CHIP ---------------------------- */

function StatusChip({ status }) {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    approved: 'bg-green-100 text-green-700 border-green-300',
    rejected: 'bg-red-100 text-red-700 border-red-300',
  };
  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full border ${colors[status]}`}
    >
      {status[0].toUpperCase() + status.slice(1)}
    </span>
  );
}

/* ---------------------------- UTILS ---------------------------- */

function canModify(schedule) {
  if (!schedule) return false;

  // convert date + startTime (minutes) to timestamp
  const [hours, minutes] = [
    Math.floor(schedule.shiftId.startTime / 60),
    schedule.shiftId.startTime % 60,
  ];
  const scheduleDate = new Date(schedule.date);
  scheduleDate.setHours(hours, minutes, 0, 0);

  return Date.now() < scheduleDate.getTime();
}
