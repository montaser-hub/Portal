import SubDepartment from '../models/subdepartModel.js';


export const create = async (data) => {
  const results = await SubDepartment.create(data);
  return results;
};

export const getAll = () => {
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

// Get count of all records (useful for pagination)
export const countAll = () => SubDepartment.countDocuments();

//get count based on filters (for filtered total)
export const countFiltered = (filter) => SubDepartment.countDocuments(filter);
