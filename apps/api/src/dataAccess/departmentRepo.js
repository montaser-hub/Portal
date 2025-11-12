import Department from '../models/departmentModel.js';

export const create = async(data) => {
  return await Department.create(data);
};
export const findAll = () => {
  return Department.find()
    .populate( {
    path: 'manager',
    select: 'firstName lastName nickname photo -_id',
  })
  .populate({ path: 'location', select: 'name -_id' });
};

export const getOne = async(id) => {
  return await Department.findById(id).populate({
    path: 'manager',
    select: 'firstName lastName nickname photo -_id',
  });
};
export const update = async (id, data) => {
  return await Department.findByIdAndUpdate(id, data, { new: true });
};
export const Delete = async(id) => {
  return await Department.findByIdAndDelete(id);
};

export const countAll = () => Department.countDocuments();

export const countFiltered = (filter) => Department.countDocuments(filter);
