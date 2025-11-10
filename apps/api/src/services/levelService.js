import * as levelRepo from '../dataAccess/levelRepo.js';
import AppError from '../utils/AppError.js';
import { getAllDocuments } from './queryService.js';
export const createLevel = async (data) => {
  return await levelRepo.create(data);
}
export const getAllLevels = async (query) => {
  const searchableFields = [ "name" ]
  const result = await getAllDocuments(levelRepo, query, searchableFields);
 if(!result || result.length === 0) throw new AppError("Levels not found", 404);
  return result;
}
export const getLevelById = async (id) => {
    const result = await levelRepo.getOne(id);
    if(!result) throw new AppError("Level not found", 404);
  return result;
}
export const updateLevelById = async (id, data) => {
    const updatedLevel = await levelRepo.update(id, data);
    if (!updatedLevel) throw new AppError("Level Not Found", 404);
    return updatedLevel;
}
export const deleteLevelById = async (id) => {
    const deletedLevel = await levelRepo.remove(id);
    if (!deletedLevel) throw new AppError("Level Not Found", 404);
    return deletedLevel;
}
