import Schedule from '../models/scheduleModel.js';
import mongoose from 'mongoose';

export const create = async (data) => {
  return await Schedule.create(data);
};

export const update = async (id, data) => {
  return await Schedule.findByIdAndUpdate(id, data, { new: true });
};

export const findById = async (id) => {
  return await Schedule.findById(id)
    .populate('department', 'name')
    .populate('subDepartment', 'name')
    .populate('user', 'firstName lastName')
    .populate('shift', 'shiftName shiftType startTime endTime');
};

export const findAll = () => {
  return Schedule.find()
    .populate('department', 'name')
    .populate('subDepartment', 'name')
    .populate('user', 'firstName lastName')
    .populate('shift', 'shiftName shiftType startTime endTime');
};

export const nextSchedule = async ( userId ) => {
  return await Schedule.find({userId})
    .sort({ date: 1 }) // date first, earliest shift first
    .populate('department', 'name')
    .populate('subDepartment', 'name')
    .populate('user', 'firstName lastName')
    .populate({
      path: 'shift',
      select: 'shiftName shiftType startTime endTime',
    })
}

export const deleteOne = async (id) => {
  return await Schedule.findByIdAndDelete(id);
};

export const countAll = () => Schedule.countDocuments();

export const countFiltered = (filter) => Schedule.countDocuments(filter);

// التحقق من تكرار الـ schedule
export const findDuplicate = async (criteria) => {
  const { date, shiftId, subDepartmentId, userId, isActive } = criteria;

  const query = {
    date: new Date(date),
    shiftId,
    subDepartmentId,
    isActive
  };

  // لو في userId، نضيفه للـ query
  if (userId) {
    query.userId = userId;
  }

  return await Schedule.findOne(query);
};

// التحقق من تعارض الشفتات
export const checkShiftConflict = async ({ date, userId, shiftId, isActive, excludeId }) => {
  // نجيب الشفت الجديد اللي عايزين نضيفه
  const Shift = mongoose.model('Shift');
  const newShift = await Shift.findById(shiftId);

  if (!newShift) return false;

  // نحول الدقائق لـ hours و minutes
  const convertMinutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
  };

  const dateStr = new Date(date).toISOString().split('T')[0];

  const newShiftStartTime = convertMinutesToTime(newShift.startTime);
  const newShiftEndTime = convertMinutesToTime(newShift.endTime);

  const newShiftStart = new Date(`${dateStr}T${newShiftStartTime}`);
  const newShiftEnd = new Date(`${dateStr}T${newShiftEndTime}`);

  // نجيب كل الـ schedules للـ user في نفس اليوم
  const query = {
    date: new Date(date),
    userId,
    isActive,
  };

  if (excludeId) {
    query._id = { $ne: excludeId };
  }

  const existingSchedules = await Schedule.find(query).populate({
    path: 'shift',
    model: 'Shift'
  });

  // نتحقق من كل schedule موجود
  for (const schedule of existingSchedules) {
    // نجيب الشفت - لو الـ populate شغال هيكون موجود، لو لأ نجيبه يدوياً
    const existingShift = schedule.shift || await Shift.findById(schedule.shiftId);

    if (!existingShift) continue;

    const existingStartTime = convertMinutesToTime(existingShift.startTime);
    const existingEndTime = convertMinutesToTime(existingShift.endTime);

    const existingStart = new Date(`${dateStr}T${existingStartTime}`);
    const existingEnd = new Date(`${dateStr}T${existingEndTime}`);

    // فحص التعارض
    const hasOverlap = (
      (newShiftStart < existingEnd && newShiftEnd > existingStart)
    );

    if (hasOverlap) {
      return true;
    }
  }

  return false;
};

