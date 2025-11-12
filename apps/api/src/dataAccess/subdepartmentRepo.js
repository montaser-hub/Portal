import SubDepartment from '../models/subdepartModel.js';


export const create = async (data) => {
  const results = await SubDepartment.create(data);
  return results;
};

export const findAll = () => {
  return SubDepartment.find()
    .populate('department', 'name')
    .populate( 'subManager', 'firstName lastName role');
};

export const getOne = async (id) => {
  return await SubDepartment.findById( id )
    .populate( 'department', 'name' )
    .populate( 'subManager', 'firstName lastName role');
};

export const findByIdAndUpdate = async (id, data) => {
  const results = await SubDepartment.findByIdAndUpdate(id, data, {
    new: true,
  });
  return results;
};

export const Delete = async (id) => {
  const results = await SubDepartment.findByIdAndDelete(id);
  return results;
};

export const countAll = () => SubDepartment.countDocuments();

export const countFiltered = (filter) => SubDepartment.countDocuments(filter);
