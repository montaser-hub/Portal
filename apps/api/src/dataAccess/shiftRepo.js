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

// Get count of all records (useful for pagination)
export const countAll = () => Shift.countDocuments();

// Optionally, get count based on filters (for filtered total)
export const countFiltered = (filter) => Shift.countDocuments(filter);
