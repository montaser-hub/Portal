import Shift from "../models/shiftModel.js";

export const create = async (data) => {
  return await Shift.create(data);
};

export const findById = async(id) => {
  return await Shift.findById(id)
    .populate('department', 'name')
    .populate('subDepartment', 'name');
};

export const update = async (id, data) => {
  const shift = await Shift.findByIdAndUpdate(id, data, { new: true });
  return shift;
};

export const deleteShift = async (id) => {
  const shift = await Shift.findByIdAndDelete(id);
  return shift;
};

export const findAll = () => {
  return Shift.find()
    .populate('department', 'name')
    .populate('subDepartment', 'name');
};

export const countAll = () => Shift.countDocuments();

export const countFiltered = (filter) => Shift.countDocuments(filter);
