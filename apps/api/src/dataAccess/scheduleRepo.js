import Schedule from '../models/scheduleModel.js';

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
    .populate('shift', 'shiftName shiftType startTime endTime startTimeFormatted endTimeFormatted');
};

export const findAll = () => {
  return Schedule.find()
    .populate('department', 'name')
    .populate('subDepartment', 'name')
    .populate('user', 'firstName lastName')
    .populate('shift', 'shiftName shiftType startTime endTime startTimeFormatted endTimeFormatted');
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

// البحث عن schedule بشروط معينة
export const findOne = async (query) => {
  return await Schedule.findOne(query);
};

// البحث عن schedules متعددة بشروط معينة
export const findMany = async (query) => {
  return await Schedule.find(query).populate({
    path: 'shift',
    model: 'Shift',
    select: 'startTime endTime shiftName shiftType'
  });
};
