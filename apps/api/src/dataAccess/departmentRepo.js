import Department from '../models/departmentModel.js';

export const create = (data) => {
  const results = Department.create(data);
  return results;
};
export const getAll = () => {
  const results = Department.find().populate({
    path: 'manager',
    select: 'firstName lastName nickname photo -_id',
  })
  .populate({ path: 'location', select: 'name -_id' });
  return results;
};

export const getOne = (id) => {
  const results = Department.findById(id).populate({
    path: 'manager',
    select: 'firstName lastName nickname photo -_id',
  });
  return results;
};
export const update = (id, data) => {
  const results = Department.findByIdAndUpdate(id, data, { new: true });
  return results;
};
export const Delete = (id) => {
  const results = Department.findByIdAndDelete(id);
  return results;
};
export const deleteAll = () => {
  const results = Department.deleteMany();
  return results;
};
