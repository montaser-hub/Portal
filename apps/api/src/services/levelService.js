import * as levelRepo from '../dataAccess/levelRepo.js';

export const createLevel = async (data) => {
    if (!data.name || data.name.trim() === '') {
        throw new Error('Level name is required');
    }
  const result = await levelRepo.create(data);
  return result;
}
export const getAllLevels = async () => {
  const result = await levelRepo.getAll();
 if(!result) throw new Error("Levels not found");
  return result;
}
export const getLevelById = async (id) => {
    const result = await levelRepo.getOne(id);  
    if(!result) throw new Error("Level not found");
  return result;
}
export const updateLevelById = async (id, data) => {
    const updatedLevel = await levelRepo.update(id, data);
    if (!updatedLevel) throw new Error("Level Not Found");
    return updatedLevel;
}
export const deleteLevelById = async (id) => {
    const deletedLevel = await levelRepo.remove(id);
    if (!deletedLevel) throw new Error("Level Not Found");
    return deletedLevel;
}
