import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Filter,
  Pencil,
  Plus,
  Calendar,
  Clock,
  Building2,
  Sun,
  Moon,
  AlertCircle,
  Heart,
} from 'lucide-react';
import ScheduleModal from '../modals/ScheduleModal';
import { STATUSES } from '../components/common/constants';
import {
  fetchSchedules,
  addSchedule,
  editSchedule,
} from '../features/schedule/scheduleThunks';
import { fetchShifts } from '../features/Shift/shiftThunks';
import { fetchSubDepartments } from '../features/subDepartment/subDepartmentThunks';
import { toast } from 'react-hot-toast';
import HeartbeatSpinner from '../components/common/Spinner2';

// Helper function to check if shift has started
const hasShiftStarted = (date, startTime) => {
  if (!date || startTime === undefined) return false;

  const scheduleDate = new Date(date);
  const now = new Date();

  const shiftStart = new Date(scheduleDate);
  shiftStart.setHours(Math.floor(startTime / 60), startTime % 60, 0, 0);

  return now >= shiftStart;
};

// Helper function to format time
const formatTime = (minutes) => {
  if (minutes === undefined || minutes === null) return '-';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${mins.toString().padStart(2, '0')} ${period}`;
};

// Helper function to get shift type badge styling
const getShiftTypeBadge = (shiftType) => {
  const badges = {
    Morning: { bg: 'bg-amber-100', text: 'text-amber-700', icon: Sun },
    Evening: { bg: 'bg-indigo-100', text: 'text-indigo-700', icon: Moon },
    Night: { bg: 'bg-purple-100', text: 'text-purple-700', icon: Moon },
    Weekend: { bg: 'bg-pink-100', text: 'text-pink-700', icon: Calendar },
  };
  return (
    badges[shiftType] || {
      bg: 'bg-gray-100',
      text: 'text-gray-700',
      icon: Clock,
    }
  );
};

// دالة مساعدة لتحويل بيانات الAPI
const mapScheduleDataFromAPI = (apiData) => {
  return {
    id: apiData.id || apiData._id,
    department: {
      id: apiData.department?.id || apiData.department?._id,
      name: apiData.department?.name || 'Unknown',
    },
    subDepartment: {
      id: apiData.subDepartment?.id || apiData.subDepartment?._id,
      name: apiData.subDepartment?.name || 'Unknown',
    },
    shift: {
      id: apiData.shift?.id || apiData.shift?._id,
      name: apiData.shift?.shiftName || 'Unknown',
      shiftName: apiData.shift?.shiftName || 'Unknown',
      shiftType: apiData.shift?.shiftType || 'Regular',
      startTime: apiData.shift?.startTime,
      endTime: apiData.shift?.endTime,
      startTimeFormatted:
        apiData.shift?.startTimeFormatted ||
        formatTime(apiData.shift?.startTime),
      endTimeFormatted:
        apiData.shift?.endTimeFormatted || formatTime(apiData.shift?.endTime),
      durationFormatted: apiData.shift?.durationFormatted || '-',
    },
    date: apiData.date,
    status: apiData.status || STATUSES[0],
    shiftId: apiData.shiftId || apiData.shift?.id || apiData.shift?._id,
    subDepartmentId:
      apiData.subDepartmentId ||
      apiData.subDepartment?.id ||
      apiData.subDepartment?._id,
  };
};

export default function Schedules() {
  const dispatch = useDispatch();
  const { allSchedules, allSchedulesStatus } = useSelector(
    (state) => state.schedule
  );
  const { shifts, status: shiftsStatus } = useSelector((state) => state.shift);
  const { subDepartments, status: subDepartmentsStatus } = useSelector(
    (state) => state.subDepartment
  );
  const { user } = useSelector((state) => state.user);
  const [selectedShift, setSelectedShift] = useState('');
  const [selectedSubDept, setSelectedSubDept] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentData, setCurrentData] = useState({});

  const initialData = {
    department: { name: user?.department?.name || 'Heart' },
    subDepartment: { id: '', name: '' },
    shift: { id: '', name: '' },
    date: '',
    status: STATUSES[0],
  };

  useEffect(() => {
    dispatch(fetchSchedules({}));
    dispatch(fetchShifts());

    if (user?.department?.id || user?.department?._id) {
      dispatch(fetchSubDepartments(user.department.id || user.department._id));
    }
  }, [dispatch, user]);

  const schedules = useMemo(() => {
    return (allSchedules || []).map(mapScheduleDataFromAPI);
  }, [allSchedules]);
  const filteredSchedules = useMemo(() => {
    return schedules.filter(
      (s) =>
        (!selectedShift || s.shift?.name === selectedShift) &&
        (!selectedSubDept || s.subDepartment?.name === selectedSubDept)
    );
  }, [schedules, selectedShift, selectedSubDept]);
  const shiftOptions = useMemo(() => {
    return (shifts || []).map((shift) => ({
      id: shift.id || shift._id,
      name: shift.shiftName,
    }));
  }, [shifts]);

  const subDepartmentOptions = useMemo(() => {
    return (subDepartments || []).map((sd) => ({
      id: sd.id || sd._id,
      name: sd.name,
    }));
  }, [subDepartments]);
  const openModal = (schedule = null) => {
    if (schedule && hasShiftStarted(schedule.date, schedule.shift?.startTime)) {
      alert('⚠️ Cannot edit - This shift has already started!');
      return;
    }

    if (schedule) {
      setCurrentData({
        ...schedule,
        shiftName: schedule.shift?.shiftName || '',
        subDepartmentName: schedule.subDepartment?.name || '',
      });
      setEditing(true);
    } else {
      setCurrentData({
        ...initialData,
        shiftName: '',
        subDepartmentName: '',
      });
      setEditing(false);
    }
    setIsModalOpen(true);
  };

  const saveSchedule = async () => {
    try {
      const scheduleData = {
        date: currentData.date,
        shiftId: currentData.shift?.id || currentData.shiftId,
        subDepartmentId:
          currentData.subDepartment?.id || currentData.subDepartmentId,
      };

      if (editing) {
        await dispatch(
          editSchedule({
            id: currentData.id,
            data: scheduleData,
          })
        ).unwrap();
      } else {
        await dispatch(addSchedule(scheduleData)).unwrap();
      }

      setIsModalOpen(false);
      dispatch(fetchSchedules({}));
    } catch (error) {
      const msg = error.response.data.message || 'Failed to save schedule';
      toast.error(msg);
    }
  };

  // Loading state
  if (allSchedulesStatus === 'loading' && schedules.length === 0) {
    return <HeartbeatSpinner />;
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 via-teal-50/20 to-blue-50/30 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">My Schedules</h1>
          <p className="text-gray-500 mt-1">Manage your work schedules</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-teal-600 text-white px-5 py-2.5 rounded-lg hover:bg-teal-700 transition shadow-sm"
          disabled={
            shiftsStatus === 'loading' || subDepartmentsStatus === 'loading'
          }
        >
          <Plus size={20} /> Create Schedule
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Building2 size={16} />
            Sub Department
          </label>
          <select
            value={selectedSubDept}
            onChange={(e) => setSelectedSubDept(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            disabled={subDepartmentsStatus === 'loading'}
          >
            <option value="">All Sub Departments</option>
            {subDepartmentOptions.map((sd) => (
              <option key={sd.id} value={sd.name}>
                {sd.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Clock size={16} />
            Shift
          </label>
          <select
            value={selectedShift}
            onChange={(e) => setSelectedShift(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            disabled={shiftsStatus === 'loading'}
          >
            <option value="">All Shifts</option>
            {shiftOptions.map((shift) => (
              <option key={shift.id} value={shift.name}>
                {shift.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Schedules Cards */}
      {filteredSchedules.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <div className="flex flex-col items-center gap-3">
            <Calendar size={48} className="text-gray-300" />
            <div className="flex flex-col items-center gap-3">
              <div className="bg-gray-100 p-4 rounded-full">
                <Calendar size={48} className="text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">
                {allSchedulesStatus === 'loading'
                  ? 'Loading schedules...'
                  : 'No schedules found'}
              </p>
              {allSchedulesStatus !== 'loading' && (
                <button
                  onClick={() => openModal()}
                  className="mt-2 text-teal-600 hover:text-teal-700 font-medium hover:underline"
                >
                  Create your first schedule
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSchedules.map((schedule, index) => {
            const shiftStarted = hasShiftStarted(
              schedule.date,
              schedule.shift?.startTime
            );
            const badgeStyle = getShiftTypeBadge(schedule.shift?.shiftType);
            const BadgeIcon = badgeStyle.icon;
            return (
              <div
                key={schedule.id}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-200 hover:border-teal-300"
              >
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-teal-600">
                    <Calendar size={18} />
                    <span className="font-semibold text-sm">
                      {formatDate(schedule.date)}
                    </span>
                  </div>
                  {!shiftStarted && (
                    <button
                      onClick={() => openModal(schedule)}
                      className="p-2 hover:bg-teal-50 rounded-lg transition-colors"
                      title="Edit Schedule"
                    >
                      <Pencil size={18} className="text-teal-600" />
                    </button>
                  )}
                </div>
                {/* Schedule Details */}
                <div className="space-y-3">
                  {/* Sub Department */}
                  <div className="flex items-start gap-3">
                    <Building2
                      size={18}
                      className="text-gray-400 mt-0.5 flex-shrink-0"
                    />
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">
                        Sub Department
                      </p>
                      <p className="text-sm font-medium text-gray-800">
                        {schedule.subDepartment?.name || '-'}
                      </p>
                    </div>
                  </div>
                  {/* Shift Name & Type Badge */}
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Shift</p>
                    <p className="text-sm font-medium text-gray-800">
                      {schedule.shift?.shiftName || '-'}
                    </p>
                    <span
                      className={`${badgeStyle.bg} ${
                        badgeStyle.text
                      } px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 border ${badgeStyle.bg.replace(
                        'bg-',
                        'border-'
                      )}${badgeStyle.text.replace('text-', '/20')}`}
                    >
                      <BadgeIcon size={12} />
                      {schedule.shift?.shiftType || 'Regular'}
                    </span>
                  </div>
                  {/* Time */}
                  <div className="flex items-start gap-3 bg-teal-50 p-3 rounded-xl border border-teal-200">
                    <div className="bg-teal-100 p-2 rounded-lg border border-teal-200">
                      <Clock size={16} className="text-teal-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">Shift Times</p>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-semibold text-gray-800">
                          {schedule.shift?.startTimeFormatted}
                        </span>
                        <span className="text-gray-400">→</span>
                        <span className="font-semibold text-gray-800">
                          {schedule.shift?.endTimeFormatted}
                        </span>
                      </div>
                      <p className="text-xs text-teal-600 mt-1 font-medium">
                        Duration: {schedule.shift?.durationFormatted}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      <ScheduleModal
        isOpen={isModalOpen}
        editing={editing}
        data={currentData}
        setData={setCurrentData}
        onClose={() => setIsModalOpen(false)}
        onSave={saveSchedule}
        STATUSES={STATUSES}
        shifts={shiftOptions}
        subDepartments={subDepartmentOptions}
        loading={
          shiftsStatus === 'loading' || subDepartmentsStatus === 'loading'
        }
      />
    </div>
  );
}
