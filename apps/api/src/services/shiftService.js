import * as shiftRepo from '../dataAccess/shiftRepo.js'
import * as scheduleRepo from '../dataAccess/scheduleRepo.js'
import AppError from '../utils/AppError.js'
import { getAllDocuments } from './queryService.js'

export const createShift = async (data) => {
  return await shiftRepo.create(data)
}

export const getShift = async (id) => {
  const shift = await shiftRepo.findById( id )
  if(!shift) throw new AppError("Shift Not Found", 404)
  return shift
}

export const getAllShifts = async (queryParams) => {
const searchableFields = ['shiftName', 'shiftType', 'departmentId', 'subDepartmentId'];
return await getAllDocuments( shiftRepo, queryParams, searchableFields);
}

export const updateShift = async (id, data) => {
  const updatedhift = await shiftRepo.update( id, data )
  if(!updatedhift) throw new AppError("Shift Not Found", 404)
  return updatedhift
}

export const deleteShift = async (id) => {
  const scheduleCountCheck = await scheduleRepo.countFiltered({ shiftId: id });
  if (scheduleCountCheck > 0) throw new AppError('shift has assigned schedules, cannot delete', 400);
  return await shiftRepo.deleteShift(id)
}
