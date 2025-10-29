import Location from '../models/LocationModel.js'

// Create Location
export const create = async (data) => {
  return await Location.create(data)
}

// Find Location
export const findOne = async (query) => {
  return await Location.findOne(query)
}

// Get Location By Id
export const findById = async (id) => {
  return await Location.findById(id)
}

// Get All Locations
export const findAll = async () => {
  return await Location.find()
}

// Update Location
export const update = async (id, data) => {
  return await Location.findByIdAndUpdate(id, data, { new: true })
}

// Delete Location
export const removeById = async (id) => {
  return await Location.findByIdAndDelete(id)
}

// Delete All Locations
export const deleteAll = async () => {
  return await Location.deleteMany()
}

