import * as shiftRepo from '../dataAccess/shiftRepo.js'
import AppError from '../utils/AppError.js'

export const createShift = async (data) => {
  return await shiftRepo.create(data)
}

export const getShift = async (id) => {
  const shift = await shiftRepo.findById( id )
  if(!shift) throw new AppError("Shift Not Found", 404)
  return shift
}

export const getAllShifts = async () => {
  return await shiftRepo.findAll()
}

export const updateShift = async (id, data) => {
  const updatedhift = await shiftRepo.update( id, data )
  if(!updatedhift) throw new AppError("Shift Not Found", 404)
  return updatedhift
}

export const deleteShift = async (id) => {
  return await shiftRepo.deleteShift(id)
}
