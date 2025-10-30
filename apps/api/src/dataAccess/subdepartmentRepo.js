import SubDepartment from '../models/subdepartModel.js';


export const create = async (data) => {
  const results = await SubDepartment.create(data);
  return results;
};


export const getAll = async () => {
  const results = await SubDepartment.find();
  return results;
};

export const getOne = async (id) => {
  const results = await SubDepartment.findById(id);
  return results;
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

export const deleteAll = async () => {
  await SubDepartment.deleteMany();
};
