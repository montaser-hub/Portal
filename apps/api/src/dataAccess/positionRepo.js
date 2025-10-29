import Position from '../models/positionModel.js';
export const create = async (data) => {
  const results = await Position.create(data);
  return results;
};
export const getAll = async () => {
  const results = await Position.find();
  return results;
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
