import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Filter, Pencil, Plus, Calendar, Clock, Building2 } from 'lucide-react';
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

// دالة مساعدة لتحويل بيانات الAPI
const mapScheduleDataFromAPI = (apiData) => {
  return {
    id: apiData.id || apiData._id,
    department: {
      name: apiData.department?.name || 'Unknown',
    },
    subDepartment: {
      id: apiData.subDepartment?.id || apiData.subDepartment?._id,
      name: apiData.subDepartment?.name || 'Unknown',
    },
    shift: {
      id: apiData.shift?.id || apiData.shift?._id,
      name: apiData.shift?.shiftName || 'Unknown',
    },
    date: apiData.date,
    status: apiData.status || STATUSES[0],
    shiftId: apiData.shiftId,
    subDepartmentId: apiData.subDepartmentId,
  };
};

export default function Schedules() {
  const dispatch = useDispatch();
  const {allSchedules,allSchedulesStatus} = useSelector((state) => state.schedule);
  const { shifts, status: shiftsStatus } = useSelector((state) => state.shift);
  const { subDepartments, status: subDepartmentsStatus } = useSelector((state) => state.subDepartment);
  const { user } = useSelector((state) => state.user);



  const [selectedShift, setSelectedShift] = useState("");
  const [selectedSubDept, setSelectedSubDept] = useState("");
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

  const schedules = useMemo( () => {
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
    if (schedule) {
      setCurrentData({
        ...schedule,
        shiftName: schedule.shift?.name || '',
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
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-700 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading schedules...</p>
        </div>
      </div>
    );
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
    <div className="p-6 bg-gray-50 min-h-screen">
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
            <p className="text-gray-500 text-lg">
              {allSchedulesStatus === 'loading'
                ? 'Loading schedules...'
                : 'No schedules found'}
            </p>
            {allSchedulesStatus !== 'loading' && (
              <button
                onClick={() => openModal()}
                className="mt-2 text-teal-600 hover:text-teal-700 font-medium"
              >
                Create your first schedule
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSchedules.map((schedule) => (
            <div
              key={schedule.id}
              className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-200 hover:border-teal-300"
            >
              {/* Date Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2 text-teal-600">
                  <Calendar size={18} />
                  <span className="font-semibold text-sm">
                    {formatDate(schedule.date)}
                  </span>
                </div>
                <button
                  onClick={() => openModal(schedule)}
                  className="p-2 hover:bg-teal-50 rounded-lg transition-colors"
                  title="Edit Schedule"
                >
                  <Pencil size={18} className="text-teal-600" />
                </button>
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

                {/* Shift */}
                <div className="flex items-start gap-3">
                  <Clock
                    size={18}
                    className="text-gray-400 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Shift</p>
                    <p className="text-sm font-medium text-gray-800">
                      {schedule.shift?.name || '-'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
