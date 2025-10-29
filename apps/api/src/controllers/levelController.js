import * as LevelService from '../services/levelService.js';
import catchAsync from '../utils/catchAsync.js';

export const createLevel = catchAsync(async (req, res) => {
    const level = await LevelService.createLevel(req.body);
  return res.status(201).json({ message: 'Level created successfully', data: level });
});
export const getAllLevels = catchAsync(async (req, res) => {
    const levels = await LevelService.getAllLevels();
  return res.status(200).json({ message: 'Levels retrieved successfully', data: levels });
});
export const getLevelById = catchAsync(async (req, res) => {
    const id = req.params.id;
    const level = await LevelService.getLevelById(id);
  return res.status(200).json({ message: 'Level retrieved successfully', data: level });
}); 
export const updateLevelById = catchAsync(async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const updatedLevel = await LevelService.updateLevelById(id, data);
  return res.status(200).json({ message: 'Level updated successfully', data: updatedLevel });
});
export const deleteLevelById = catchAsync(async (req, res) => {
    const id = req.params.id;
    const deletedLevel = await LevelService.deleteLevelById(id);
  return res.status(200).json({ message: 'Level deleted successfully', data: deletedLevel });
});
