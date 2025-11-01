import Level from '../models/levelModel.js';
export const create = async (data) => {
  const results = await Level.create(data);
  return results;
}
export const getAll = async () => {
  const results = await Level.find().populate({
    path: 'Position',
    select: '-_id name'
  });
  return results;
}
export const getOne = async (id) => {
  const results = await Level.findById(id).populate({
    path: 'Position',
    select: '-_id name'
  });
  
  return results;
}
export const update = async (id, data) => {
  const results = await Level.findByIdAndUpdate(id, data, { new: true });
  return results;
}               
export const remove = async (id) => {
  const results = await Level.findByIdAndDelete(id);
  return results;
}