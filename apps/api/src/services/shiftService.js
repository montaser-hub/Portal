import * as shiftRepo from '../dataAccess/shiftRepo.js'

export const createShift = async (data) => {
  return await shiftRepo.create(data)
}

export const getShift = async (id) => {
  const shift = await shiftRepo.findById( id )
  if(!shift) throw new Error("Shift Not Found")
  return shift
}

export const getAllShifts = async () => {
  return await shiftRepo.findAll()
}

export const updateShift = async (id, data) => {
  const updatedhift = await shiftRepo.update( id, data )
  if(!updatedhift) throw new Error("Shift Not Found")
  return updatedhift
}

export const deleteShift = async (id) => {
  return await shiftRepo.deleteShift(id)
}