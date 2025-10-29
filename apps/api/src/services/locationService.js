import * as locationRepo from '../dataAccess/locationRepo.js'

// Check same location
export const isExists = async (name) => {
  const existed = await locationRepo.findOne({ name })
  if (existed)
    throw new Error("Location already existed.")
}

//  Add Location
export const addLocation = async (data) => {
  const { name, ...body } = data
  return await locationRepo.create({ name, ...body })
}

// Get Location By Id
export const getLocation = async (id) => {
  const location = await locationRepo.findById(id)
  if (!location) throw new Error("Location not found.")
  return location
}

// Get All Locations
export const getAllLocations = async () => {
  return await locationRepo.findAll()
}

// Update Location
export const updateLocation = async (id, data) => {
  const { name, ...body } = data
  const updatedLocation = await locationRepo.update(id, { name, ...body })
  if (!updatedLocation) throw new Error("Location not found.")
  return updatedLocation
}

// Delete Location
export const deleteLocation = async (id) => {
  const location = await locationRepo.findById(id)
  if (!location) throw new Error("Location not found.")
  return await locationRepo.removeById(id)
}

// Delete All Locations
export const deleteAllLocations = async () => {
  return await locationRepo.deleteAll()
}

