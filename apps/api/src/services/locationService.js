import * as locationRepo from '../dataAccess/locationRepo.js'
import AppError from '../utils/AppError.js'
import { getAllDocuments } from "./queryService.js"

// Check same location
export const isExists = async (name) => {
  const existed = await locationRepo.findOne({ name })
  if (existed)
    throw new AppError("Location already existed.", 400);
}

//  Add Location
export const addLocation = async (data) => {
  const { name, ...body } = data
  return await locationRepo.create({ name, ...body })
}

// Get Location By Id
export const getLocation = async (id) => {
  const location = await locationRepo.findById(id)
  if (!location) throw new AppError("Location not found.", 404)
  return location
}

// Get All Locations
export const getAllLocations = async (query) => {
  const searchableFields = ["name", "street", "city", "state", "country", "postalCode"];
  return await getAllDocuments(locationRepo, query, searchableFields)
}

// Update Location
export const updateLocation = async (id, data) => {
  const { name, ...body } = data
  const updatedLocation = await locationRepo.update(id, { name, ...body })
  if (!updatedLocation) throw new AppError("Location not found.", 404)
  return updatedLocation
}

// Delete Location
export const deleteLocation = async (id) => {
  const location = await locationRepo.findById(id)
  if (!location) throw new AppError("Location not found.", 404)
  return await locationRepo.removeById(id)
}

