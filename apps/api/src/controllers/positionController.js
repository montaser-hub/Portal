import * as positionService from '../services/positionService.js';
import catchAsync from '../utils/catchAsync.js';
export const addposition = catchAsync(async (req, res) => {
  const data = req.body;
  consle.log(data);
  const result = await positionService.createPosition(data);

  return res
    .status(201)
    .json({ message: 'Position created successfully', data: result });
});
export const getpositions = catchAsync(async (req, res) => {
  const result = await positionService.getAllPositions();
  return res
    .status(200)
    .json({ message: 'Positions retrieved successfully', data: result });
});
export const getpositionById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await positionService.getPositionById(id);
  return res
    .status(200)
    .json({ message: 'Position retrieved successfully', data: result });
});
export const updatepositionById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await positionService.updatePositionById(id, data);
  return res
    .status(200)
    .json({ message: 'Position updated successfully', data: result });
});
export const deletepositionById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await positionService.deletePositionById(id);
  return res
    .status(200)
    .json({ message: 'Position deleted successfully', data: result });
});
