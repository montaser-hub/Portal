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
  CalendarCheck,
  Timer,
  X,
} from 'lucide-react';
import ScheduleModal from '../modals/ScheduleModal';
import { STATUSES } from '../components/common/constants';
import {
  fetchUpcomingSchedules,
  addSchedule,
  editSchedule,
  removeSchedule,
} from '../features/schedule/scheduleThunks';
import { fetchShifts } from '../features/Shift/shiftThunks';
import { fetchSubDepartments } from '../features/subDepartment/subDepartmentThunks';
import { toast } from 'react-hot-toast';
import HeartbeatSpinner from '../components/common/Spinner2';
import CancelConfirmationModal from '../modals/Cancel';
import Pagination from '../components/common/paginaton';
import {
  hasShiftStarted,
  formatDate,
  formatTime,
} from '../components/common/dateHelpers';

const getShiftTypeBadge = (shiftType) => {
  const badges = {
    Morning: { bg: 'bg-amber-100', text: 'text-amber-700', icon: Sun },
    Evening: { bg: 'bg-indigo-100', text: 'text-indigo-500', icon: Moon },
    Night: { bg: 'bg-purple-100', text: 'text-purple-500', icon: Moon },
    Weekend: { bg: 'bg-red-100', text: 'text-red-400', icon: Calendar },
  };
  return (
    badges[shiftType] || {
      bg: 'bg-gray-100',
      text: 'text-gray-700',
      icon: Clock,
    }
  );
};

export default function Schedules() {
  const dispatch = useDispatch();

  // Redux state selectors
  const { upcomingSchedules, upcomingSchedulesMeta, upcomingSchedulesStatus } =
    useSelector((state) => state.schedule);
  const { shifts, shiftsStatus } = useSelector((state) => state.shift);
  const { subDepartments, subDepartmentsStatus } = useSelector(
    (state) => state.subDepartment
  );
  const { user } = useSelector((state) => state.user);

  // Filter states
  const [selectedShiftId, setSelectedShiftId] = useState('');
  const [selectedSubDeptId, setSelectedSubDeptId] = useState('');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentData, setCurrentData] = useState({});

  // Cancel modal states
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [scheduleToCancel, setScheduleToCancel] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const totalItems = upcomingSchedulesMeta?.totalFiltered || 0;
  const totalPages = itemsPerPage > 0 ? Math.ceil(totalItems / itemsPerPage) : 1;

  const initialData = {
    department: { name: user?.department?.name || 'Heart' },
    subDepartment: { id: '', name: '' },
    shift: { id: '', name: '' },
    date: '',
    status: STATUSES[0],
  };

  // Fetch reference data ONCE on mount with proper error handling
  useEffect(() => {
    if (user?.departmentId) {
      dispatch(fetchShifts({ departmentId: user.departmentId }))
        .unwrap()
        .catch((error) => {
          console.error('Failed to fetch shifts:', error);
          toast.error('Failed to load shifts');
        });

      dispatch(fetchSubDepartments({ departmentId: user.departmentId }))
        .unwrap()
        .catch((error) => {
          console.error('Failed to fetch sub-departments:', error);
          toast.error('Failed to load sub-departments');
        });
    }
  }, [dispatch, user]);

  // Fetch schedules with filters
  useEffect(() => {
    if (!user?._id) return;

      const filters = {
        userId: user._id,
        page: currentPage,
        limit: itemsPerPage,
      };

      if (selectedShiftId) filters.shiftId = selectedShiftId;
      if (selectedSubDeptId) filters.subDepartmentId = selectedSubDeptId;

      dispatch(fetchUpcomingSchedules(filters))
        .unwrap()
        .catch((error) => {
          console.error('Failed to fetch schedules:', error);
        });
  }, [
    dispatch,
    user?._id,
    currentPage,
    itemsPerPage,
    selectedShiftId,
    selectedSubDeptId,
  ]);

  // Memoized options
  const shiftOptions = useMemo(() => {
    if (!shifts || shifts.length === 0) return [];
    return shifts.map((shift) => ({
      id: shift?.id || shift?._id,
      shiftName: shift?.shiftName || '-',
      shiftType: shift?.shiftType || '-',
      startTime: shift?.startTime,
      endTime: shift?.endTime,
    }));
  }, [shifts]);

  const subDepartmentOptions = useMemo(() => {
    if (!subDepartments || subDepartments.length === 0) return [];
    return subDepartments.map((sd) => ({
      id: sd.id || sd._id,
      name: sd.name,
    }));
  }, [subDepartments]);

  const schedules = useMemo(() => {
    if (!upcomingSchedules || upcomingSchedules.length === 0) return [];
    return upcomingSchedules.map((schedule) => ({
      ...schedule,
      id: schedule.id || schedule._id,
    }));
  }, [upcomingSchedules]);

  // display info
  const displayInfo = useMemo(() => {
    const start = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
    const end = Math.min(start + schedules.length - 1, totalItems);

    return {
      start,
      end,
      totalFiltered: totalItems,
      currentItems:schedules.length,
    };
  }, [
    upcomingSchedulesMeta?.totalFiltered,
    currentPage,
    itemsPerPage,
    schedules.length,
  ]);

  // ============= HANDLERS =============

  const openModal = (schedule = null) => {
    if (schedule && hasShiftStarted(schedule.date, schedule.shift?.startTime)) {
      toast.error('⚠️ Cannot edit - This shift has already started!');
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

  const refreshSchedules = () => {
    const filters = {
      userId: user._id,
      page: currentPage,
      limit: itemsPerPage,
    };
    if (selectedShiftId) filters.shiftId = selectedShiftId;
    if (selectedSubDeptId) filters.subDepartmentId = selectedSubDeptId;

    dispatch(fetchUpcomingSchedules(filters));
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
          editSchedule({ id: currentData.id, data: scheduleData })
        ).unwrap();
        toast.success('Schedule updated successfully!');
      } else {
        await dispatch(addSchedule(scheduleData)).unwrap();
        toast.success('Schedule created successfully!');
      }

      setIsModalOpen(false);
      refreshSchedules();
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        'Failed to save schedule';
      toast.error(msg);
    }
  };

  const handleCancelClick = (schedule) => {
    if (hasShiftStarted(schedule.date, schedule.shift?.startTime)) {
      toast.error('⚠️ Cannot cancel - This shift has already started!');
      return;
    }
    setScheduleToCancel(schedule);
    setIsCancelModalOpen(true);
  };

  const handleConfirmCancel = async () => {
    if (!scheduleToCancel) return;
    setIsCancelling(true);

    try {
      await dispatch(removeSchedule(scheduleToCancel.id)).unwrap();
      toast.success('Schedule cancelled successfully!');
      setIsCancelModalOpen(false);
      setScheduleToCancel(null);
      refreshSchedules();
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        'Failed to cancel schedule';
      toast.error(msg);
    } finally {
      setIsCancelling(false);
    }
  };

  // ============= RENDER =============

  if (upcomingSchedulesStatus === 'loading' && schedules.length === 0) {
    return <HeartbeatSpinner />;
  }

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 via-teal-50/20 to-blue-50/30 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-600">My Schedules</h1>
          <p className="text-gray-500 mt-1">Manage your work schedules</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-teal-600 text-white px-5 py-2.5 rounded-lg hover:bg-teal-700 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={
            shiftsStatus === 'loading' || subDepartmentsStatus === 'loading'
          }
        >
          <Plus size={20} /> Create Schedule
        </button>
      </div>

      {/* Filters */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Filter size={20} className="text-gray-600" />
          <h3 className="text-sm font-semibold text-gray-700">
            Filter Schedules
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-5 ml-8">
          {/* Sub Department Filter */}
          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Building2 size={16} className="text-gray-400" />
              Sub Department
            </label>
            <select
              value={selectedSubDeptId}
              onChange={(e) => {
                setSelectedSubDeptId(e.target.value);
                setCurrentPage(1);
              }}
              disabled={subDepartmentsStatus === 'loading'}
              className="w-50 border border-gray-300 rounded-md px-2 py-1.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">All Sub Departments</option>
              {subDepartmentOptions.map((sd) => (
                <option key={sd.id} value={sd.id}>
                  {sd.name}
                </option>
              ))}
            </select>
          </div>

          {/* Shift Filter */}
          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <CalendarCheck size={16} className="text-gray-400" />
              Shift
            </label>
            <select
              value={selectedShiftId}
              onChange={(e) => {
                setSelectedShiftId(e.target.value);
                setCurrentPage(1);
              }}
              disabled={shiftsStatus === 'loading'}
              className="w-50 border border-gray-300 rounded-md px-2 py-1.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">All Shifts</option>
              {shiftOptions.map((shift) => (
                <option key={shift.id} value={shift.id}>
                  {shift.shiftType} - {shift.shiftName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Schedules Grid */}
      <div className="max-h-[600px] overflow-y-auto pr-2">
        {schedules.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="bg-gray-100 p-4 rounded-full">
                <Calendar size={48} className="text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">
                {upcomingSchedulesStatus === 'loading'
                  ? 'Loading schedules...'
                  : 'No schedules found'}
              </p>
              {upcomingSchedulesStatus !== 'loading' && (
                <button
                  onClick={() => openModal()}
                  className="mt-2 text-teal-600 hover:text-teal-700 font-medium hover:underline"
                >
                  Create your first schedule
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {schedules.map((schedule) => {
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
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-300">
                    <div className="flex items-center gap-2 text-teal-600">
                      <Calendar size={18} />
                      <span className="font-semibold text-sm">
                        {formatDate(schedule.date)}
                      </span>
                    </div>
                    {!shiftStarted && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openModal(schedule)}
                          className="p-2 hover:bg-teal-50 rounded-lg transition-colors"
                          title="Edit Schedule"
                        >
                          <Pencil size={18} className="text-teal-600" />
                        </button>
                        <button
                          onClick={() => handleCancelClick(schedule)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="Cancel Schedule"
                        >
                          <X size={18} className="text-red-400" />
                        </button>
                      </div>
                    )}
                  </div>

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
                        <p className="text-sm font-medium text-gray-600">
                          {schedule.subDepartment?.name || '-'}
                        </p>
                      </div>
                    </div>

                    {/* Shift */}
                    <div className="flex items-start gap-3">
                      <CalendarCheck
                        size={18}
                        className="text-gray-400 mt-0.5 flex-shrink-0"
                      />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-0.5">Shift</p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-800">
                            {schedule.shift?.shiftType || '-'}
                          </p>
                          <span
                            className={`inline-flex items-center gap-1 ${badgeStyle.bg} ${badgeStyle.text} px-2 py-1 rounded-full text-xs font-semibold`}
                          >
                            <BadgeIcon size={12} />
                            {schedule.shift?.shiftName || 'Regular'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Time */}
                    <div className="flex items-start gap-3 bg-teal-50 p-3 rounded-xl border border-teal-100">
                      <div className="bg-slate-100 p-2 rounded-lg border border-teal-200">
                        <Timer size={16} className="text-teal-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-1">
                          Shift Times
                        </p>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-semibold text-gray-600">
                            {formatTime(schedule.shift?.startTime)}
                          </span>
                          <span className="text-gray-400">→</span>
                          <span className="font-semibold text-gray-600">
                            {formatTime(schedule.shift?.endTime)}
                          </span>
                        </div>
                        <p className="text-xs text-teal-600 mt-1 font-medium">
                          Duration: {schedule.shift?.durationFormatted || '-'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        limit={itemsPerPage}
        onLimitChange={(newLimit) => {
          setItemsPerPage(newLimit);
          setCurrentPage(1);
        }}
        totalItems={displayInfo.totalFiltered}
        filteredItems={displayInfo.currentItems}
      />

      {/* Modals */}
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

      <CancelConfirmationModal
        isOpen={isCancelModalOpen}
        onClose={() => {
          setIsCancelModalOpen(false);
          setScheduleToCancel(null);
        }}
        onConfirm={handleConfirmCancel}
        schedule={scheduleToCancel}
        loading={isCancelling}
      />
    </div>
  );
}
