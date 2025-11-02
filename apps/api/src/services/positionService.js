import * as positionRepo from "../dataAccess/positionRepo.js"
import AppError from "../utils/AppError.js"
export const  createPosition = async (data) => {
    return await positionRepo.create(data)
}
export const getAllPositions = async () => {
    const results = await positionRepo.getAll()
    return results
}

export const getPositionById = async (id) => {
  const results = await positionRepo.getOne( id )
  if(!results){
      throw new AppError("Position not found", 404);
  }
  return results
}
export const updatePositionById = async (id, data) => {
    const results = await positionRepo.update(id, data)
    if(!results){
        throw new AppError("Position not found", 404);
    }
    return results
}
export const deletePositionById = async (id) => {
    const results = await positionRepo.remove(id)
    if(!results){
        throw new AppError("Position not found", 404);
    }
    return results
}




