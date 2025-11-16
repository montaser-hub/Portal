import Schedule from '../models/scheduleModel.js';

export const create = async (data) => {
  return await Schedule.create(data);
};

export const update = async (id, data) => {
  return await Schedule.findByIdAndUpdate(id, data, { new: true });
};

export const findById = async (id) => {
  return await Schedule.findById(id)
    .populate('department','name')
    .populate('subDepartment','name')
    .populate('user', 'firstName lastName')
    .populate('shift', 'shiftName shiftType startTime endTime');
};

export const findAll = () => {
  return Schedule.find()
    .populate('department','name')
    .populate('subDepartment','name')
    .populate('user', 'firstName lastName')
    .populate('shift', 'shiftName shiftType startTime endTime');

};

export const deleteOne = async (id) => {
  return await Schedule.findByIdAndDelete(id);
};

export const countAll = () => Schedule.countDocuments();

export const countFiltered = (filter) => Schedule.countDocuments(filter);
