import * as locationRepo from '../dataAccess/locationRepo.js'

// Check same function
export const isExists = async (name, address) => {
  const existed = await locationRepo.findOne({ name })
  const exists = await locationRepo.findOne({ address })
  if (exists)
    throw new Error("Another department exists in this location.")
  if (existed)
    throw new Error("Location already existed.")
}

//  Add Location
export const addLocation = async (data) => {
  const { name, ...body } = data
  await isExists(name, body.address)
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
  const { name, address, ...body } = data
  await isExists(name, address)
  const updatedLocation = await locationRepo.update(id, { name, address, ...body })
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

