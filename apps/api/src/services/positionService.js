import { query } from "express"
import * as positionRepo from "../dataAccess/positionRepo.js"
import AppError from "../utils/AppError.js"
import { getAllDocuments } from "./queryService.js"

export const  createPosition = async (data) => {
    return await positionRepo.create(data)
}
export const getAllPositions = async ( query ) => {
  const searchableFields = [ "name" ]
  return await getAllDocuments( positionRepo, query, searchableFields )
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




