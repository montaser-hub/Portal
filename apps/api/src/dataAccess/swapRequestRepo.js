import SwapRequest from '../models/swapRequestModel.js'

// Create SwapRequest
export const create = async (data) => {
  return await SwapRequest.create(data)
}

// Find SwapRequest
export const findOne = async (query) => {
  return await SwapRequest.findOne(query)
}

// Get SwapRequest By Id
export const findById = async (id) => {
  return await SwapRequest.findById(id)
}

// Get All SwapRequests
export const findAll = async () => {
  return await SwapRequest.find()
}

// Update SwapRequest
export const update = async (id, data) => {
  return await SwapRequest.findByIdAndUpdate(id, data, { new: true })
}

// Delete SwapRequest
export const removeById = async (id) => {
  return await SwapRequest.findByIdAndDelete(id)
}

// Delete All SwapRequests
export const deleteAll = async () => {
  return await SwapRequest.deleteMany()
}

