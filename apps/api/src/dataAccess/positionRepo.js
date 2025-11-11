import Position from '../models/positionModel.js';
export const create = async (data) => {
  const results = await Position.create(data);
  return results;
};
export const findAll = () => {
  return Position.find();
};
export const getOne = async (id) => {
  const results = await Position.findById(id);
  return results;
};
export const update = async (id, data) => {
  const results = await Position.findByIdAndUpdate(id, data, { new: true });
  return results;
};
export const remove = async (id) => {
  const results = await Position.findByIdAndDelete(id);
  return results;
}

// Get count of all records (useful for pagination)
export const countAll = () => Position.countDocuments();

// Optionally, get count based on filters (for filtered total)
export const countFiltered = (filter) => Position.countDocuments(filter);
